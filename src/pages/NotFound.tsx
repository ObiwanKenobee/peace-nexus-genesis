import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Home,
  ArrowLeft,
  Search,
  Heart,
  Shield,
  TreePine,
  Users,
} from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const quickLinks = [
    {
      icon: Home,
      title: "Home",
      description: "Return to the main landing page",
      path: "/",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "Dashboard",
      description: "Access your peace dashboard",
      path: "/dashboard",
      color: "text-accent",
    },
    {
      icon: Users,
      title: "Peace Network",
      description: "Connect with peacebuilders worldwide",
      path: "/peace-network",
      color: "text-primary",
    },
    {
      icon: TreePine,
      title: "Wildlife Peace",
      description: "Sacred covenant with creation",
      path: "/wildlife-peace",
      color: "text-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="peace-gradient w-8 h-8 rounded-full flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">PAXIS</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Hero Section */}
          <div className="mb-16">
            <Badge variant="outline" className="mb-4">
              🕊️ Path Not Found
            </Badge>

            <div className="relative mb-8">
              <div className="peace-gradient w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 peace-glow">
                <span className="text-6xl font-bold text-white">404</span>
              </div>
              <div className="absolute inset-0 peace-gradient opacity-10 rounded-full blur-3xl"></div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              <span className="text-gradient">Peace Path</span> Not Found
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The page you're looking for seems to have taken a different route
              towards peace. Let's help you find your way back to building a
              more harmonious world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="peace-gradient peace-glow transition-smooth hover:scale-105"
                asChild
              >
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Return Home
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="transition-smooth hover:scale-105"
                asChild
              >
                <Link to="/dashboard">
                  <Shield className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Find Your Peace Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Card
                  key={index}
                  className="transition-smooth hover:scale-105 hover:shadow-lg border-border/50 group"
                >
                  <CardHeader className="pb-2">
                    <div className="peace-gradient w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:peace-glow transition-all">
                      <link.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {link.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="w-full transition-smooth hover:bg-primary/10"
                      asChild
                    >
                      <Link to={link.path}>
                        Explore
                        <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Peace Message */}
          <div className="bg-secondary/30 rounded-2xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-primary mr-2" />
              <h3 className="text-2xl font-bold">Building Peace Together</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              "Every path leads to peace when we walk it with intention,
              compassion, and unity. Let's continue building a world where
              cooperation replaces conflict."
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>PAXIS Global Peace Infrastructure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="peace-gradient w-6 h-6 rounded-full flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">PAXIS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Building the future of global peace through technology and
              community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
