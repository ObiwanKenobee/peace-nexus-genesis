import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Shield, Zap, Users, Brain, Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AdminAccess from "@/components/AdminAccess";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

const Index = () => {
  const { user } = usePaxisAuth();
  const navigate = useNavigate();

  const handleProtectedNavigation = (path: string) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };
  const features = [
    {
      icon: Shield,
      title: "Conflict Early Warning",
      description:
        "AI-powered monitoring system that detects potential conflicts before they escalate",
      color: "text-primary",
    },
    {
      icon: Brain,
      title: "AI-Guided Resolution",
      description:
        "Intelligent mediation tools trained on successful peace negotiations",
      color: "text-accent",
    },
    {
      icon: Globe,
      title: "Resource Commons",
      description:
        "Decentralized sharing of energy, water, and food resources globally",
      color: "text-primary",
    },
    {
      icon: Heart,
      title: "Empathy Education",
      description:
        "VR labs and cultural exchange programs building understanding across divides",
      color: "text-accent",
    },
    {
      icon: Users,
      title: "DAO Governance",
      description:
        "Community-governed decision making with verified global participation",
      color: "text-primary",
    },
    {
      icon: Zap,
      title: "PeaceCoin Protocol",
      description:
        "Blockchain-based incentives for peaceful actions and cooperation",
      color: "text-accent",
    },
  ];

  const stats = [
    { value: "194", label: "Countries Connected" },
    { value: "2.4M", label: "Peace Actions Verified" },
    { value: "847", label: "Conflicts Prevented" },
    { value: "99.7%", label: "Trust Score" },
  ];

  return (
    <div className="min-h-screen bg-background">
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
              <button
                onClick={() => handleProtectedNavigation("/dashboard")}
                className="transition-smooth hover:text-primary cursor-pointer"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleProtectedNavigation("/organizations")}
                className="transition-smooth hover:text-primary cursor-pointer"
              >
                Organizations
              </button>
              <button
                onClick={() => handleProtectedNavigation("/peace-projects")}
                className="transition-smooth hover:text-primary cursor-pointer"
              >
                Projects
              </button>
              <button
                onClick={() => handleProtectedNavigation("/peace-network")}
                className="transition-smooth hover:text-primary cursor-pointer"
              >
                Network
              </button>
              <button
                onClick={() => handleProtectedNavigation("/dao-governance")}
                className="transition-smooth hover:text-primary cursor-pointer"
              >
                DAO
              </button>
              <button
                onClick={() => handleProtectedNavigation("/knowledge")}
                className="transition-smooth hover:text-primary cursor-pointer"
              >
                Knowledge
              </button>
              <Link
                to="/pricing"
                className="transition-smooth hover:text-primary"
              >
                Pricing
              </Link>
            </nav>
            <Button className="peace-gradient peace-glow transition-smooth hover:scale-105">
              Join DAO
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="outline" className="mb-4">
              🌍 Global Peace Infrastructure
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
              Replacing <span className="text-gradient">Conflict</span> with{" "}
              <span className="text-gradient">Cooperation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              PAXIS is a decentralized ecosystem that transforms military
              deterrence into peaceful cooperation using AI, blockchain, and
              shared intelligence for global harmony.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="peace-gradient peace-glow transition-smooth hover:scale-105"
                onClick={() => handleProtectedNavigation("/dashboard")}
              >
                Explore Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="transition-smooth hover:scale-105"
              >
                Read Whitepaper
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 peace-gradient opacity-5"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Peace Infrastructure Components
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive ecosystem of tools and protocols designed to
              prevent conflicts, share resources, and build lasting peace
              through technology and community governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="transition-smooth hover:scale-105 hover:shadow-lg border-border/50"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="peace-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8">
              "Peace is no longer the absence of war — it's the presence of
              shared intelligence, harmony, and dignity. PAXIS transforms this
              vision into reality through decentralized, co-owned, regenerative
              systems that prioritize cooperation over conflict."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="peace-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Trust Infrastructure</h3>
                <p className="text-sm text-muted-foreground">
                  Building transparent, verifiable systems for global
                  cooperation
                </p>
              </div>
              <div className="text-center">
                <div className="peace-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Empathy Networks</h3>
                <p className="text-sm text-muted-foreground">
                  Connecting cultures through understanding and shared
                  experiences
                </p>
              </div>
              <div className="text-center">
                <div className="peace-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Resource Harmony</h3>
                <p className="text-sm text-muted-foreground">
                  Equitable distribution of planetary resources through smart
                  protocols
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-6">Join the Peace Movement</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Become part of a global community working towards a more peaceful,
              cooperative, and sustainable future for all humanity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="peace-gradient peace-glow transition-smooth hover:scale-105"
                onClick={() => handleProtectedNavigation("/governance")}
              >
                Join DAO
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="transition-smooth hover:scale-105"
                onClick={() => handleProtectedNavigation("/education")}
              >
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="peace-gradient w-8 h-8 rounded-full flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">PAXIS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building the future of global peace through technology and
                community.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => handleProtectedNavigation("/dashboard")}
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleProtectedNavigation("/commons")}
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    Resource Commons
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleProtectedNavigation("/mediation")}
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    Mediation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleProtectedNavigation("/education")}
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    Education
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleProtectedNavigation("/peacecoin")}
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    PeaceCoin
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => handleProtectedNavigation("/governance")}
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    DAO Governance
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Peace Council
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contributors
                  </a>
                </li>
                <li>
                  <Link
                    to="/security"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Whitepaper
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Research
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>
              &copy; 2024 PAXIS. Building peace through technology. Open source
              and community governed.
            </p>
          </div>
        </div>
      </footer>

      {/* Admin Access */}
      <AdminAccess />
    </div>
  );
};

export default Index;
