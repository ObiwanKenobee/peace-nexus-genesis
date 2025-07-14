import { useState } from "react";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

export interface PaymentMethod {
  id: string;
  type: "credit_card" | "peacecoin";
  name: string;
  icon: string;
}

export interface PaymentIntent {
  paymentId: string;
  amount: number;
  currency: "USD" | "PeaceCoin";
  clientSecret?: string;
}

export interface PeaceCoinPayment {
  walletAddress: string;
  amount: number;
  tier: string;
  isSubscription?: boolean;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  subscriptionId?: string;
  error?: string;
}

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://api.paxis.global"
    : "http://localhost:3001";

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = usePaxisAuth();

  const createPaymentIntent = async (
    amount: number,
    currency: "USD" | "PeaceCoin",
    tier: string,
    isSubscription = false,
  ): Promise<PaymentIntent | null> => {
    if (!user) {
      setError("User not authenticated");
      return null;
    }

    try {
      setIsProcessing(true);
      setError(null);

      const response = await fetch(`${API_BASE}/payment/intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("paxis_token")}`,
        },
        body: JSON.stringify({
          amount,
          currency,
          tier,
          userId: user.id,
          isSubscription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Payment intent creation failed",
      );
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const processCreditCardPayment = async (
    paymentId: string,
    paymentMethodId: string,
    tier: string,
    isSubscription = false,
  ): Promise<PaymentResult> => {
    try {
      setIsProcessing(true);
      setError(null);

      const response = await fetch(`${API_BASE}/payment/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("paxis_token")}`,
        },
        body: JSON.stringify({
          paymentId,
          paymentMethodId,
          tier,
          isSubscription,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment processing failed");
      }

      const data = await response.json();
      return { success: true, ...data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Payment processing failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  };

  const processPeaceCoinPayment = async (
    payment: PeaceCoinPayment,
  ): Promise<PaymentResult> => {
    if (!user) {
      const error = "User not authenticated";
      setError(error);
      return { success: false, error };
    }

    try {
      setIsProcessing(true);
      setError(null);

      const response = await fetch(`${API_BASE}/payment/peacecoin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("paxis_token")}`,
        },
        body: JSON.stringify({
          ...payment,
          userId: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("PeaceCoin payment failed");
      }

      const data = await response.json();
      return { success: true, ...data };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "PeaceCoin payment failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  };

  const validateWallet = (walletAddress: string): boolean => {
    // Basic Ethereum wallet validation
    return walletAddress.length === 42 && walletAddress.startsWith("0x");
  };

  const getTierPricing = (
    tier: string,
    currency: "USD" | "PeaceCoin",
    isAnnual = false,
  ) => {
    const pricing = {
      free: { USD: 0, PeaceCoin: 0 },
      pro: { USD: isAnnual ? 144 : 16, PeaceCoin: isAnnual ? 7200 : 800 },
      enterprise: {
        USD: isAnnual ? 6000 : 599,
        PeaceCoin: isAnnual ? 300000 : 29950,
      },
      peacepreneurs: {
        USD: isAnnual ? 468 : 49,
        PeaceCoin: isAnnual ? 23400 : 2450,
      },
    };

    return pricing[tier as keyof typeof pricing]?.[currency] || 0;
  };

  const getUserPayments = async () => {
    if (!user) return [];

    try {
      const response = await fetch(
        `${API_BASE}/payment/user/${user.id}/payments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("paxis_token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch payments");
      return [];
    }
  };

  const getUserSubscriptions = async () => {
    if (!user) return [];

    try {
      const response = await fetch(
        `${API_BASE}/payment/user/${user.id}/subscriptions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("paxis_token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch subscriptions");
      }

      return await response.json();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch subscriptions",
      );
      return [];
    }
  };

  const cancelSubscription = async (
    subscriptionId: string,
  ): Promise<boolean> => {
    try {
      setIsProcessing(true);
      setError(null);

      const response = await fetch(
        `${API_BASE}/payment/subscription/${subscriptionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("paxis_token")}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to cancel subscription",
      );
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    createPaymentIntent,
    processCreditCardPayment,
    processPeaceCoinPayment,
    validateWallet,
    getTierPricing,
    getUserPayments,
    getUserSubscriptions,
    cancelSubscription,
    clearError: () => setError(null),
  };
};

export default usePayment;
