import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePayment } from "@/hooks/usePayment";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  CreditCard,
  Coins,
  Lock,
  AlertCircle,
  CheckCircle,
  Loader2,
  Shield,
  Wallet,
} from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: {
    id: string;
    name: string;
    price: { USD: number; PeaceCoin: number };
    features: string[];
  };
  isAnnual?: boolean;
}

export default function PaymentModal({
  isOpen,
  onClose,
  tier,
  isAnnual = false,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    "credit_card" | "peacecoin"
  >("credit_card");
  const [isSubscription, setIsSubscription] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "payment" | "processing" | "success"
  >("payment");

  const {
    isProcessing,
    error,
    createPaymentIntent,
    processCreditCardPayment,
    processPeaceCoinPayment,
    validateWallet,
    getTierPricing,
    clearError,
  } = usePayment();

  const { user } = usePaxisAuth();

  const amount = getTierPricing(
    tier.id,
    paymentMethod === "credit_card" ? "USD" : "PeaceCoin",
    isAnnual,
  );
  const currency = paymentMethod === "credit_card" ? "USD" : "PeaceCoin";

  const handlePayment = async () => {
    if (!user) return;

    setProcessing(true);
    setCurrentStep("processing");
    clearError();

    try {
      if (paymentMethod === "credit_card") {
        await handleCreditCardPayment();
      } else {
        await handlePeaceCoinPayment();
      }
    } catch (err) {
      setCurrentStep("payment");
    } finally {
      setProcessing(false);
    }
  };

  const handleCreditCardPayment = async () => {
    // Validate card details
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      throw new Error("Please fill in all card details");
    }

    // Create payment intent
    const intent = await createPaymentIntent(
      amount,
      "USD",
      tier.id,
      isSubscription,
    );
    if (!intent) {
      throw new Error("Failed to create payment intent");
    }

    // Simulate card processing (in real app, use Stripe Elements)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Process payment
    const result = await processCreditCardPayment(
      intent.paymentId,
      "pm_mock_card_" + Math.random().toString(36).substr(2, 9),
      tier.id,
      isSubscription,
    );

    if (result.success) {
      setSuccess(true);
      setCurrentStep("success");
      // Update user context or refresh user data
    } else {
      throw new Error(result.error || "Payment failed");
    }
  };

  const handlePeaceCoinPayment = async () => {
    // Validate wallet address
    if (!validateWallet(walletAddress)) {
      throw new Error("Invalid wallet address");
    }

    // Process PeaceCoin payment
    const result = await processPeaceCoinPayment({
      walletAddress,
      amount,
      tier: tier.id,
      isSubscription,
    });

    if (result.success) {
      setSuccess(true);
      setCurrentStep("success");
      // Update user context or refresh user data
    } else {
      throw new Error(result.error || "PeaceCoin payment failed");
    }
  };

  const resetModal = () => {
    setCurrentStep("payment");
    setSuccess(false);
    setProcessing(false);
    setWalletAddress("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCardholderName("");
    clearError();
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span>Upgrade to {tier.name}</span>
          </DialogTitle>
        </DialogHeader>

        {currentStep === "payment" && (
          <div className="space-y-6">
            {/* Tier Summary */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{tier.name}</h3>
                <Badge className="bg-blue-100 text-blue-800">
                  {currency === "USD" ? `$${amount}` : `${amount} PC`}
                  {isSubscription
                    ? isAnnual
                      ? "/year"
                      : "/month"
                    : " one-time"}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {tier.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="subscription-toggle">Subscription</Label>
                <p className="text-sm text-gray-500">
                  {isSubscription ? "Recurring payment" : "One-time payment"}
                </p>
              </div>
              <Switch
                id="subscription-toggle"
                checked={isSubscription}
                onCheckedChange={setIsSubscription}
              />
            </div>

            {/* Payment Method Selection */}
            <Tabs
              value={paymentMethod}
              onValueChange={(value) =>
                setPaymentMethod(value as "credit_card" | "peacecoin")
              }
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="credit_card"
                  className="flex items-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </TabsTrigger>
                <TabsTrigger
                  value="peacecoin"
                  className="flex items-center space-x-2"
                >
                  <Coins className="w-4 h-4" />
                  <span>PeaceCoin</span>
                </TabsTrigger>
              </TabsList>

              {/* Credit Card Form */}
              <TabsContent value="credit_card" className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="cardholder-name">Cardholder Name</Label>
                    <Input
                      id="cardholder-name"
                      placeholder="John Doe"
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                        type="password"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* PeaceCoin Form */}
              <TabsContent value="peacecoin" className="space-y-4">
                <div>
                  <Label htmlFor="wallet-address">Wallet Address</Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="wallet-address"
                      placeholder="0x..."
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {walletAddress && !validateWallet(walletAddress) && (
                    <p className="text-sm text-red-500 mt-1">
                      Invalid wallet address
                    </p>
                  )}
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                    <div className="text-sm text-orange-800">
                      <p className="font-medium">PeaceCoin Payment</p>
                      <p>
                        You'll need {amount} PeaceCoins in your wallet to
                        complete this transaction.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Error Display */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={
                  isProcessing ||
                  (paymentMethod === "peacecoin" &&
                    !validateWallet(walletAddress))
                }
                className="flex-1"
              >
                <Lock className="w-4 h-4 mr-2" />
                Pay {currency === "USD" ? `$${amount}` : `${amount} PC`}
              </Button>
            </div>
          </div>
        )}

        {currentStep === "processing" && (
          <div className="py-8 text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-gray-600">
              {paymentMethod === "credit_card"
                ? "Verifying your card details..."
                : "Confirming blockchain transaction..."}
            </p>
          </div>
        )}

        {currentStep === "success" && (
          <div className="py-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Welcome to {tier.name}! Your account has been upgraded.
            </p>
            <Button onClick={handleClose} className="w-full">
              Continue to Dashboard
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
