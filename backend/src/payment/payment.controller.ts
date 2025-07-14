import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { PaymentService } from "./payment.service";
import {
  CreatePaymentDto,
  ProcessPaymentDto,
  SubscriptionDto,
  CancelSubscriptionDto,
  PaymentIntentDto,
  PeaceCoinPaymentDto,
} from "./dto/payment.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("payment")
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post("create")
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.createPayment(createPaymentDto);
  }

  @Post("process")
  async processPayment(@Body() processPaymentDto: ProcessPaymentDto) {
    return await this.paymentService.processPayment(processPaymentDto);
  }

  @Post("intent")
  async createPaymentIntent(@Body() paymentIntentDto: PaymentIntentDto) {
    // Create payment record and return client secret for frontend
    const payment = await this.paymentService.createPayment({
      userId: paymentIntentDto.userId,
      amount: paymentIntentDto.amount,
      currency: paymentIntentDto.currency,
      method: "credit_card" as any,
      tier: paymentIntentDto.tier,
    });

    return {
      paymentId: payment.id,
      amount: paymentIntentDto.amount,
      currency: paymentIntentDto.currency,
      // In real implementation, this would be from Stripe
      clientSecret: "pi_secret_" + Math.random().toString(36).substr(2, 9),
    };
  }

  @Post("peacecoin")
  async processPeaceCoinPayment(
    @Body() peaceCoinPaymentDto: PeaceCoinPaymentDto,
  ) {
    // Create PeaceCoin payment record
    const payment = await this.paymentService.createPayment({
      userId: peaceCoinPaymentDto.userId,
      amount: peaceCoinPaymentDto.amount,
      currency: "PeaceCoin" as any,
      method: "peacecoin" as any,
      tier: peaceCoinPaymentDto.tier,
    });

    // Process the payment
    return await this.paymentService.processPayment({
      paymentId: payment.id,
      walletAddress: peaceCoinPaymentDto.walletAddress,
      tier: peaceCoinPaymentDto.tier,
      isSubscription: peaceCoinPaymentDto.isSubscription || false,
    });
  }

  @Post("subscription")
  async createSubscription(@Body() subscriptionDto: SubscriptionDto) {
    return await this.paymentService.createSubscription(subscriptionDto);
  }

  @Delete("subscription/:id")
  async cancelSubscription(@Param("id") id: string) {
    return await this.paymentService.cancelSubscription(id);
  }

  @Get("user/:userId/payments")
  async getUserPayments(@Param("userId") userId: string) {
    return await this.paymentService.getUserPayments(userId);
  }

  @Get("user/:userId/subscriptions")
  async getUserSubscriptions(@Param("userId") userId: string) {
    return await this.paymentService.getUserSubscriptions(userId);
  }

  @Get("tiers")
  async getAvailableTiers() {
    return {
      tiers: [
        {
          id: "free",
          name: "Peace for All",
          price: { USD: 0, PeaceCoin: 0 },
          features: [
            "Create a profile & participate in public missions",
            "Access global Peace Knowledgebase",
            "Use PeaceGPT-Lite (basic queries)",
            "Earn & display basic Soulbound Peace Credentials",
            "Join community DAO discussions",
            "Limited PeaceCoin faucet (on verified impact)",
          ],
        },
        {
          id: "pro",
          name: "Build Peace",
          price: { USD: 16, PeaceCoin: 800 },
          features: [
            "Launch & manage peace projects",
            "Real-time dashboards & alerts",
            "AI-assisted reporting, summaries, and impact calculators",
            "Regional impact heatmaps + analytics",
            "Access to PAXIS developer tools + API",
            "Access to gamified empathy tools (VR, AR, RPG quests)",
            "Voting rights in DAO proposals",
          ],
        },
        {
          id: "enterprise",
          name: "Guardians of Peace",
          price: { USD: 599, PeaceCoin: 29950 },
          features: [
            "LLM-enhanced diplomacy simulators",
            "Full knowledge graph + conflict prediction engine",
            "Smart Treaty Builder (legal-AI stack)",
            "Data pipelines (import/export to local gov infra)",
            "API integration with UN, ECOWAS, AU, ASEAN, etc.",
            "On-chain audit logs + compliance engine",
            "Deploy your own PeaceDAO within ecosystem",
          ],
        },
        {
          id: "peacepreneurs",
          name: "Peacepreneurs",
          price: { USD: 49, PeaceCoin: 2450 },
          features: [
            "Startup DAO launchpad",
            "Tech + peace mentorship",
            "Access to PeaceFi grants + pitch competitions",
            "PeaceCoin liquidity boosts & earn-to-impact bridges",
          ],
        },
      ],
    };
  }

  @Post("webhook/stripe")
  async handleStripeWebhook(@Body() body: any, @Req() req: any) {
    // Handle Stripe webhook events
    const event = body;

    switch (event.type) {
      case "payment_intent.succeeded":
        // Handle successful payment
        break;
      case "payment_intent.payment_failed":
        // Handle failed payment
        break;
      case "invoice.payment_succeeded":
        // Handle successful subscription payment
        break;
      case "customer.subscription.deleted":
        // Handle subscription cancellation
        break;
    }

    return { received: true };
  }
}
