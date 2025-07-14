import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  usePaxisAuth,
  UserArchetype,
  getArchetypeDisplayName,
} from "@/contexts/PaxisAuthContext";
import {
  Shield,
  Users,
  Zap,
  Globe,
  Heart,
  Brain,
  Palette,
  Rocket,
  GraduationCap,
  Home,
  DollarSign,
  Bot,
  AlertCircle,
  Loader2,
  Mail,
  Lock,
} from "lucide-react";

const archetypeIcons = {
  peace_architect: Shield,
  tech_diplomat: Zap,
  grassroots_peacebuilder: Users,
  conflict_analyst: Brain,
  artist_culture_weaver: Palette,
  peacepreneur: Rocket,
  youth_peacemaker: GraduationCap,
  refugee_displaced: Home,
  funder_validator: DollarSign,
  ai_peace_agent: Bot,
};

const archetypeDescriptions = {
  peace_architect:
    "Design systemic solutions for peace treaties, borders, and disarmament",
  tech_diplomat: "Build peace infrastructure through open-source software",
  grassroots_peacebuilder: "Mediate locally and empower nonviolent change",
  conflict_analyst:
    "Map conflict patterns, predict risks, and advise interventions",
  artist_culture_weaver:
    "Heal trauma, preserve culture, and tell better futures",
  peacepreneur:
    "Create scalable solutions around water, food, trust, and security",
  youth_peacemaker: "Learn, engage, and innovate peace from mobile or VR",
  refugee_displaced: "Reconnect, rebuild identity, and access resources",
  funder_validator: "Invest in scalable peace solutions",
  ai_peace_agent: "Co-create peace by augmenting human efforts",
};

const demoCredentials = [
  {
    email: "diplomat@un.org",
    archetype: "Peace Architect",
    role: "UN Diplomat",
  },
  {
    email: "dev@peacetech.org",
    archetype: "Tech Diplomat",
    role: "Peace Engineer",
  },
  {
    email: "maria@communityhealing.ke",
    archetype: "Grassroots Peacebuilder",
    role: "Community Leader",
  },
];

export default function PaxisLogin() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    archetype: "" as UserArchetype | "",
    organization: "",
    location: "",
  });
  const [error, setError] = useState("");
  const { login, register, isLoading } = usePaxisAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginData.email || !loginData.password) {
      setError("Please enter both email and password");
      return;
    }

    const success = await login(loginData.email, loginData.password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.archetype
    ) {
      setError("Please fill in all required fields");
      return;
    }

    const success = await register(registerData);
    if (success) {
      navigate("/onboarding");
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  const fillDemoCredentials = (email: string) => {
    setLoginData({ email, password: "peace123" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-4">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to PAXIS
          </h1>
          <p className="text-xl text-gray-600">The Peace Technology Platform</p>
          <p className="text-gray-500 mt-2">
            Building positive peace through technology, community, and
            innovation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Auth Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Join the Peace Movement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Create Account</TabsTrigger>
                  </TabsList>

                  {/* Login Tab */}
                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="your@email.com"
                            value={loginData.email}
                            onChange={(e) =>
                              setLoginData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className="pl-10"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) =>
                              setLoginData((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            className="pl-10"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Shield className="w-4 h-4 mr-2" />
                        )}
                        {isLoading ? "Signing In..." : "Sign In to PAXIS"}
                      </Button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-sm text-gray-900 mb-3">
                        Demo Accounts:
                      </h3>
                      <div className="space-y-2">
                        {demoCredentials.map((cred, index) => (
                          <button
                            key={index}
                            onClick={() => fillDemoCredentials(cred.email)}
                            className="w-full text-left p-2 rounded border hover:bg-gray-100 transition-colors"
                          >
                            <div className="text-sm font-medium">
                              {cred.role}
                            </div>
                            <div className="text-xs text-gray-500">
                              {cred.email} • password: peace123
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Register Tab */}
                  <TabsContent value="register" className="space-y-4">
                    <form onSubmit={handleRegister} className="space-y-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Full Name *</Label>
                          <Input
                            id="register-name"
                            placeholder="Your name"
                            value={registerData.name}
                            onChange={(e) =>
                              setRegisterData((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-email">
                            Email Address *
                          </Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="your@email.com"
                            value={registerData.email}
                            onChange={(e) =>
                              setRegisterData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password *</Label>
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create a strong password"
                          value={registerData.password}
                          onChange={(e) =>
                            setRegisterData((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-archetype">
                          Your Role in Peace *
                        </Label>
                        <Select
                          value={registerData.archetype}
                          onValueChange={(value) =>
                            setRegisterData((prev) => ({
                              ...prev,
                              archetype: value as UserArchetype,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your primary role" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(archetypeDescriptions).map(
                              ([key, description]) => {
                                const Icon =
                                  archetypeIcons[key as UserArchetype];
                                return (
                                  <SelectItem key={key} value={key}>
                                    <div className="flex items-center space-x-2">
                                      <Icon className="w-4 h-4" />
                                      <span>
                                        {getArchetypeDisplayName(
                                          key as UserArchetype,
                                        )}
                                      </span>
                                    </div>
                                  </SelectItem>
                                );
                              },
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-organization">
                            Organization
                          </Label>
                          <Input
                            id="register-organization"
                            placeholder="Your organization"
                            value={registerData.organization}
                            onChange={(e) =>
                              setRegisterData((prev) => ({
                                ...prev,
                                organization: e.target.value,
                              }))
                            }
                            disabled={isLoading}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="register-location">Location</Label>
                          <Input
                            id="register-location"
                            placeholder="City, Country"
                            value={registerData.location}
                            onChange={(e) =>
                              setRegisterData((prev) => ({
                                ...prev,
                                location: e.target.value,
                              }))
                            }
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Heart className="w-4 h-4 mr-2" />
                        )}
                        {isLoading ? "Creating Account..." : "Join PAXIS"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* User Archetypes Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Peace Builder Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(archetypeDescriptions)
                  .slice(0, 5)
                  .map(([key, description]) => {
                    const Icon = archetypeIcons[key as UserArchetype];
                    return (
                      <div key={key} className="flex items-start space-x-3">
                        <div className="bg-gradient-to-r from-blue-100 to-green-100 p-2 rounded-lg">
                          <Icon className="w-4 h-4 text-blue-700" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {getArchetypeDisplayName(key as UserArchetype)}
                          </div>
                          <div className="text-xs text-gray-600">
                            {description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <div className="text-center pt-2">
                  <Link
                    to="/archetypes"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View all 10 peace builder types →
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Why PAXIS?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Earn PeaceCoins for positive actions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Connect with global peace builders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Access cutting-edge peace tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Participate in peace governance</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            PAXIS Platform v1.0.0 • Open Source • Decentralized • Peace-Focused
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/help" className="hover:underline">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
