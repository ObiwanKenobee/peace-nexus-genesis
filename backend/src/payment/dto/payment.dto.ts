import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsUUID,
} from "class-validator";

export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  PEACECOIN = "peacecoin",
}

export enum PaymentCurrency {
  USD = "USD",
  PEACECOIN = "PeaceCoin",
}

export enum TierType {
  FREE = "free",
  PRO = "pro",
  ENTERPRISE = "enterprise",
  PEACEPRENEURS = "peacepreneurs",
}

export class CreatePaymentDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentCurrency)
  currency: PaymentCurrency;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsEnum(TierType)
  tier: TierType;

  @IsOptional()
  @IsString()
  description?: string;
}

export class ProcessPaymentDto {
  @IsUUID()
  paymentId: string;

  @IsOptional()
  @IsString()
  paymentMethodId?: string; // For credit card payments

  @IsOptional()
  @IsString()
  walletAddress?: string; // For PeaceCoin payments

  @IsEnum(TierType)
  tier: TierType;

  @IsBoolean()
  isSubscription: boolean;

  @IsOptional()
  @IsString()
  billingAddress?: string;
}

export class SubscriptionDto {
  @IsUUID()
  userId: string;

  @IsEnum(TierType)
  tier: TierType;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsOptional()
  @IsString()
  paymentMethodId?: string;

  @IsOptional()
  @IsString()
  walletAddress?: string;
}

export class CancelSubscriptionDto {
  @IsUUID()
  subscriptionId: string;

  @IsOptional()
  @IsString()
  reason?: string;
}

export class PaymentIntentDto {
  @IsNumber()
  amount: number;

  @IsEnum(PaymentCurrency)
  currency: PaymentCurrency;

  @IsEnum(TierType)
  tier: TierType;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsBoolean()
  isSubscription?: boolean;
}

export class PeaceCoinPaymentDto {
  @IsString()
  walletAddress: string;

  @IsNumber()
  amount: number;

  @IsEnum(TierType)
  tier: TierType;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsBoolean()
  isSubscription?: boolean;
}
