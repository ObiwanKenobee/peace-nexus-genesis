import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import PaymentModal from "@/components/payment/PaymentModal";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  Globe,
  Heart,
  Users,
  Building,
  Rocket,
  TreePine,
  Check,
  Star,
  Coins,
  Shield,
  Zap,
  Brain,
  ArrowRight,
  Infinity,
  RefreshCw,
  Lock,
  Eye,
  PiggyBank,
  Clock,
} from "lucide-react";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "PeaceCoin">("USD");

  const tiers = [
    {
      id: "free",
      name: "Peace for All",
      subtitle: "For citizens, students, refugees, and grassroots peace actors",
      price: { USD: 0, PeaceCoin: 0 },
      icon: Heart,
      color: "from-green-500 to-blue-500",
      popular: false,
      features: [
        "Create a profile & participate in public missions",
        "Access global Peace Knowledgebase",
        "Use PeaceGPT-Lite (basic queries)",
        "Earn & display basic Soulbound Peace Credentials",
        "Join community DAO discussions",
        "Limited PeaceCoin faucet (on verified impact)",
      ],
      cta: "Start Free",
      description:
        "Zero cost, but value-added through action-based incentives. Peace is participatory.",
    },
    {
      id: "pro",
      name: "Build Peace",
      subtitle:
        "For NGO operators, local councils, educators, journalists, and peace developers",
      price: { USD: isAnnual ? 144 : 16, PeaceCoin: isAnnual ? 7200 : 800 },
      icon: Users,
      color: "from-blue-500 to-purple-500",
      popular: true,
      features: [
        "Launch & manage peace projects",
        "Real-time dashboards & alerts",
        "AI-assisted reporting, summaries, and impact calculators",
        "Regional impact heatmaps + analytics",
        "Access to PAXIS developer tools + API",
        "Access to gamified empathy tools (VR, AR, RPG quests)",
        "Voting rights in DAO proposals",
      ],
      cta: "Start Building",
      description:
        "PeaceCoins earned from actions can offset cost. This keeps liquidity inside the ecosystem.",
    },
    {
      id: "enterprise",
      name: "Guardians of Peace",
      subtitle:
        "For governments, think tanks, humanitarian orgs, and universities",
      price: {
        USD: isAnnual ? 6000 : 599,
        PeaceCoin: isAnnual ? 300000 : 29950,
      },
      icon: Building,
      color: "from-purple-500 to-pink-500",
      popular: false,
      features: [
        "LLM-enhanced diplomacy simulators",
        "Full knowledge graph + conflict prediction engine",
        "Smart Treaty Builder (legal-AI stack)",
        "Data pipelines (import/export to local gov infra)",
        "API integration with UN, ECOWAS, AU, ASEAN, etc.",
        "On-chain audit logs + compliance engine",
        "Deploy your own PeaceDAO within ecosystem",
      ],
      cta: "Contact Sales",
      description:
        "Also comes with governance influence, visibility, and custom branding.",
    },
    {
      id: "peacepreneurs",
      name: "Peacepreneurs",
      subtitle:
        "For solarpunk innovators, water access inventors, education warriors",
      price: { USD: isAnnual ? 468 : 49, PeaceCoin: isAnnual ? 23400 : 2450 },
      icon: Rocket,
      color: "from-orange-500 to-red-500",
      popular: false,
      features: [
        "Startup DAO launchpad",
        "Tech + peace mentorship",
        "Access to PeaceFi grants + pitch competitions",
        "PeaceCoin liquidity boosts & earn-to-impact bridges",
        "Equity-based in-kind exchange options",
        "Impact measurement and reporting tools",
      ],
      cta: "Launch Impact",
      description:
        "The peace economy doesn't extract from innovators — it accelerates them.",
    },
  ];

  const addOns = [
    {
      name: "PeaceGPT Pro",
      price: { USD: 12, PeaceCoin: 600 },
      description:
        "Advanced AI support, regional language support, deep conflict analytics",
      icon: Brain,
    },
    {
      name: "Culture Decks",
      price: { USD: 10, PeaceCoin: 500 },
      description: "VR/AR empathy decks from various indigenous cultures",
      icon: TreePine,
      perDeck: true,
    },
    {
      name: "Dev Toolbox",
      price: { USD: 0, PeaceCoin: 0 },
      description: "PeaceInfra SDKs, APIs, simulation libraries",
      icon: Zap,
      freeForOSS: true,
    },
    {
      name: "Verified PeaceVault",
      price: { USD: 2, PeaceCoin: 50 },
      description: "Secure identity vault for credentials & peace NFTs",
      icon: Shield,
      stakeOption: true,
    },
  ];

  const safeguards = [
    "No fees for trauma victims or refugees",
    "No tracking or monetization of user data",
    "DAO votes on enterprise pricing thresholds",
    "Sovereign wallets – users own their data, not PAXIS",
  ];

  const formatPrice = (price: number, currencyType: "USD" | "PeaceCoin") => {
    if (currencyType === "USD") {
      return `$${price.toLocaleString()}`;
    } else {
      return `${price.toLocaleString()} PC`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <div className="peace-gradient w-8 h-8 rounded-full flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="hidden font-bold sm:inline-block text-xl">
                PAXIS
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="transition-smooth hover:text-primary"
              >
                Dashboard
              </Link>
              <Link
                to="/peacecoin"
                className="transition-smooth hover:text-primary"
              >
                PeaceCoin
              </Link>
              <Link
                to="/pricing"
                className="transition-smooth hover:text-primary font-medium"
              >
                Pricing
              </Link>
            </nav>
            <Button
              className="peace-gradient peace-glow transition-smooth hover:scale-105"
              asChild
            >
              <Link to="/login">Join PAXIS</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-full p-3 mr-4">
              <Infinity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              The Infinite Loop of{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Sustainable Peace
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Pricing feeds system health. Money → tools → impact → data →
            insights → money. Choose your path in the regenerative peace
            economy.
          </p>

          {/* Pricing Controls */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-3">
              <span className={!isAnnual ? "font-medium" : "text-gray-500"}>
                Monthly
              </span>
              <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
              <span className={isAnnual ? "font-medium" : "text-gray-500"}>
                Annual
              </span>
              {isAnnual && (
                <Badge className="bg-green-100 text-green-800">Save 25%</Badge>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant={currency === "USD" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrency("USD")}
              >
                💲 USD
              </Button>
              <Button
                variant={currency === "PeaceCoin" ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrency("PeaceCoin")}
              >
                <Coins className="w-4 h-4 mr-1" />
                PeaceCoin
              </Button>
            </div>
          </div>
        </div>

        {/* Main Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const price = tier.price[currency];
            const priceDisplay =
              price === 0
                ? "Free"
                : `${formatPrice(price, currency)}${tier.id !== "enterprise" ? (isAnnual ? "/year" : "/month") : isAnnual ? "/year" : "/month"}`;

            return (
              <Card
                key={tier.id}
                className={`relative overflow-hidden ${tier.popular ? "ring-2 ring-blue-500 shadow-xl" : "shadow-lg"} hover:shadow-xl transition-shadow`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <CardHeader className={`${tier.popular ? "pt-12" : "pt-6"}`}>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tier.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{tier.name}</CardTitle>
                  <p className="text-sm text-gray-600">{tier.subtitle}</p>
                  <div className="mt-4">
                    <div className="text-3xl font-bold">{priceDisplay}</div>
                    {tier.id === "enterprise" && (
                      <p className="text-sm text-gray-500">
                        Custom pricing available
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${tier.popular ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" : ""}`}
                    variant={tier.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to={tier.id === "free" ? "/login" : "/login"}>
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  <p className="text-xs text-gray-500 mt-3">
                    {tier.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom & Cultural Tiers */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <TreePine className="w-8 h-8 text-green-600" />
              <div>
                <CardTitle className="text-2xl">
                  Custom & Cultural Tiers
                </CardTitle>
                <p className="text-gray-600">
                  For tribal leaders, village networks, borderland cultures, and
                  forgotten zones
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium">Barter Systems</h3>
                <p className="text-sm text-gray-600">
                  Trade goods and services
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium">Time-based Value</h3>
                <p className="text-sm text-gray-600">
                  3 hours teaching earns access
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium">Knowledge Contributions</h3>
                <p className="text-sm text-gray-600">
                  Cultural knowledgebase additions
                </p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-medium">Governance Agreements</h3>
                <p className="text-sm text-gray-600">
                  Community co-design pricing
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600 italic">
                "You don't sell peace to people who've kept it for millennia."
              </p>
              <Button variant="outline" className="mt-4">
                Design Your Community Tier
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add-ons */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Optional Add-Ons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon) => {
              const Icon = addon.icon;
              const price = addon.price[currency];

              return (
                <Card
                  key={addon.name}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{addon.name}</CardTitle>
                        <div className="text-lg font-bold">
                          {addon.freeForOSS
                            ? "Free to OSS"
                            : addon.stakeOption
                              ? `${formatPrice(price, currency)}/month or stake ${currency === "USD" ? "50 PC" : "2500 PC"}`
                              : `${formatPrice(price, currency)}${addon.perDeck ? "/deck" : "/month"}`}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{addon.description}</p>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      {addon.freeForOSS ? "Contribute" : "Add to Plan"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sustainability Loop */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-green-50">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center">
              <Infinity className="w-8 h-8 mr-3 text-blue-600" />
              Infinite Sustainability Loop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
                <span className="font-medium">User Actions</span>
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">PeaceCoin Earned</span>
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">Access/Perks</span>
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">Better Impact</span>
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">More Data + Value</span>
              </div>
              <div className="mt-4 text-center">
                <ArrowRight className="w-6 h-6 mx-auto text-gray-400 rotate-90" />
              </div>
              <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-md">
                <span className="font-medium">Fund More Peace Actions</span>
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">Fund DAO Treasury</span>
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">Institutional Subscriptions</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Anti-Extractive Safeguards */}
        <Card className="mb-16 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Shield className="w-8 h-8 mr-3 text-green-600" />
              Anti-Extractive Safeguards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safeguards.map((safeguard, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{safeguard}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Sustainable Peace?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the regenerative peace economy and help create positive loops
            that benefit everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              asChild
            >
              <Link to="/login">
                <Heart className="w-5 h-5 mr-2" />
                Start Your Peace Journey
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/archetypes">
                <Users className="w-5 h-5 mr-2" />
                Explore User Types
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
