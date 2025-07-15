import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreatePaymentDto,
  ProcessPaymentDto,
  SubscriptionDto,
} from "./dto/payment.dto";
import { Payment } from "./entities/payment.entity";
import { Subscription } from "./entities/subscription.entity";
import { User } from "../users/entities/user.entity";

// Mock Stripe-like payment processor
interface PaymentProcessor {
  createPaymentIntent(
    amount: number,
    currency: string,
    metadata?: any,
  ): Promise<{ id: string; client_secret: string }>;
  confirmPayment(paymentIntentId: string): Promise<{ status: string }>;
  createSubscription(
    customerId: string,
    priceId: string,
  ): Promise<{ id: string; status: string }>;
  cancelSubscription(subscriptionId: string): Promise<{ status: string }>;
}

// Mock PeaceCoin blockchain service
interface PeaceCoinService {
  validateWallet(walletAddress: string): Promise<boolean>;
  getBalance(walletAddress: string): Promise<number>;
  transferPeaceCoins(
    from: string,
    to: string,
    amount: number,
  ): Promise<{ txHash: string; status: string }>;
}

@Injectable()
export class PaymentService {
  private paymentProcessor: PaymentProcessor;
  private peaceCoinService: PeaceCoinService;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    // Initialize mock services
    this.paymentProcessor = this.createMockPaymentProcessor();
    this.peaceCoinService = this.createMockPeaceCoinService();
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { userId, amount, currency, method, tier } = createPaymentDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("User not found");
    }

    const payment = this.paymentRepository.create({
      user,
      amount,
      currency,
      method,
      tier,
      status: "pending",
    });

    return await this.paymentRepository.save(payment);
  }

  async processPayment(
    processPaymentDto: ProcessPaymentDto,
  ): Promise<{ success: boolean; paymentId: string; subscriptionId?: string }> {
    const { paymentId, paymentMethodId, walletAddress, tier, isSubscription } =
      processPaymentDto;

    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
      relations: ["user"],
    });

    if (!payment) {
      throw new BadRequestException("Payment not found");
    }

    try {
      if (payment.method === "credit_card") {
        return await this.processCreditCardPayment(
          payment,
          paymentMethodId,
          tier,
          isSubscription,
        );
      } else if (payment.method === "peacecoin") {
        return await this.processPeaceCoinPayment(
          payment,
          walletAddress,
          tier,
          isSubscription,
        );
      } else {
        throw new BadRequestException("Invalid payment method");
      }
    } catch (error) {
      payment.status = "failed";
      payment.errorMessage = error.message;
      await this.paymentRepository.save(payment);
      throw new InternalServerErrorException("Payment processing failed");
    }
  }

  private async processCreditCardPayment(
    payment: Payment,
    paymentMethodId: string,
    tier: string,
    isSubscription: boolean,
  ): Promise<{ success: boolean; paymentId: string; subscriptionId?: string }> {
    if (isSubscription) {
      // Create subscription
      const subscription = await this.paymentProcessor.createSubscription(
        payment.user.id,
        this.getTierPriceId(tier),
      );

      // Save subscription
      const newSubscription = this.subscriptionRepository.create({
        user: payment.user,
        tier,
        status: subscription.status,
        externalId: subscription.id,
        amount: payment.amount,
        currency: payment.currency,
      });

      await this.subscriptionRepository.save(newSubscription);

      payment.status = "completed";
      payment.subscriptionId = newSubscription.id;
      await this.paymentRepository.save(payment);

      // Update user tier
      await this.updateUserTier(payment.user.id, tier);

      return {
        success: true,
        paymentId: payment.id,
        subscriptionId: newSubscription.id,
      };
    } else {
      // One-time payment
      const paymentIntent = await this.paymentProcessor.createPaymentIntent(
        payment.amount * 100, // Convert to cents
        payment.currency,
        { userId: payment.user.id, tier },
      );

      const confirmation = await this.paymentProcessor.confirmPayment(
        paymentIntent.id,
      );

      payment.status =
        confirmation.status === "succeeded" ? "completed" : "failed";
      payment.externalId = paymentIntent.id;
      await this.paymentRepository.save(payment);

      if (confirmation.status === "succeeded") {
        await this.updateUserTier(payment.user.id, tier);
      }

      return {
        success: confirmation.status === "succeeded",
        paymentId: payment.id,
      };
    }
  }

  private async processPeaceCoinPayment(
    payment: Payment,
    walletAddress: string,
    tier: string,
    isSubscription: boolean,
  ): Promise<{ success: boolean; paymentId: string; subscriptionId?: string }> {
    // Validate wallet and balance
    const isValidWallet =
      await this.peaceCoinService.validateWallet(walletAddress);
    if (!isValidWallet) {
      throw new BadRequestException("Invalid wallet address");
    }

    const balance = await this.peaceCoinService.getBalance(walletAddress);
    if (balance < payment.amount) {
      throw new BadRequestException("Insufficient PeaceCoin balance");
    }

    // Transfer PeaceCoins to PAXIS treasury
    const transfer = await this.peaceCoinService.transferPeaceCoins(
      walletAddress,
      process.env.PAXIS_TREASURY_WALLET,
      payment.amount,
    );

    if (transfer.status === "success") {
      payment.status = "completed";
      payment.externalId = transfer.txHash;
      await this.paymentRepository.save(payment);

      if (isSubscription) {
        // Create PeaceCoin subscription record
        const subscription = this.subscriptionRepository.create({
          user: payment.user,
          tier,
          status: "active",
          amount: payment.amount,
          currency: "PeaceCoin",
          walletAddress,
        });

        await this.subscriptionRepository.save(subscription);
        payment.subscriptionId = subscription.id;
        await this.paymentRepository.save(payment);

        await this.updateUserTier(payment.user.id, tier);

        return {
          success: true,
          paymentId: payment.id,
          subscriptionId: subscription.id,
        };
      } else {
        await this.updateUserTier(payment.user.id, tier);
        return { success: true, paymentId: payment.id };
      }
    } else {
      throw new BadRequestException("PeaceCoin transfer failed");
    }
  }

  async createSubscription(
    subscriptionDto: SubscriptionDto,
  ): Promise<Subscription> {
    const { userId, tier, paymentMethod } = subscriptionDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("User not found");
    }

    const subscription = this.subscriptionRepository.create({
      user,
      tier,
      status: "pending",
      amount: this.getTierAmount(tier),
      currency: paymentMethod === "peacecoin" ? "PeaceCoin" : "USD",
    });

    return await this.subscriptionRepository.save(subscription);
  }

  async cancelSubscription(
    subscriptionId: string,
  ): Promise<{ success: boolean }> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
      relations: ["user"],
    });

    if (!subscription) {
      throw new BadRequestException("Subscription not found");
    }

    if (subscription.externalId) {
      await this.paymentProcessor.cancelSubscription(subscription.externalId);
    }

    subscription.status = "cancelled";
    subscription.cancelledAt = new Date();
    await this.subscriptionRepository.save(subscription);

    // Downgrade user to free tier
    await this.updateUserTier(subscription.user.id, "free");

    return { success: true };
  }

  async getUserPayments(userId: string): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" },
    });
  }

  async getUserSubscriptions(userId: string): Promise<Subscription[]> {
    return await this.subscriptionRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" },
    });
  }

  private async updateUserTier(userId: string, tier: string): Promise<void> {
    await this.userRepository.update(userId, {
      tier,
      tierUpdatedAt: new Date(),
    });
  }

  private getTierAmount(tier: string): number {
    const pricing = {
      free: 0,
      pro: 16,
      enterprise: 599,
      peacepreneurs: 49,
    };
    return pricing[tier] || 0;
  }

  private getTierPriceId(tier: string): string {
    const priceIds = {
      pro: "price_pro_monthly",
      enterprise: "price_enterprise_monthly",
      peacepreneurs: "price_peacepreneurs_monthly",
    };
    return priceIds[tier] || "";
  }

  // Mock implementations
  private createMockPaymentProcessor(): PaymentProcessor {
    return {
      async createPaymentIntent(
        amount: number,
        currency: string,
        metadata?: any,
      ) {
        return {
          id: "pi_" + Math.random().toString(36).substr(2, 9),
          client_secret: "pi_secret_" + Math.random().toString(36).substr(2, 9),
        };
      },

      async confirmPayment(paymentIntentId: string) {
        // Simulate 95% success rate
        return { status: Math.random() > 0.05 ? "succeeded" : "failed" };
      },

      async createSubscription(customerId: string, priceId: string) {
        return {
          id: "sub_" + Math.random().toString(36).substr(2, 9),
          status: "active",
        };
      },

      async cancelSubscription(subscriptionId: string) {
        return { status: "cancelled" };
      },
    };
  }

  private createMockPeaceCoinService(): PeaceCoinService {
    return {
      async validateWallet(walletAddress: string) {
        return walletAddress.length === 42 && walletAddress.startsWith("0x");
      },

      async getBalance(walletAddress: string) {
        // Mock balance based on wallet address
        return parseInt(walletAddress.slice(-4), 16) % 10000;
      },

      async transferPeaceCoins(from: string, to: string, amount: number) {
        return {
          txHash: "0x" + Math.random().toString(16).substr(2, 64),
          status: "success",
        };
      },
    };
  }
}
