import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Shield,
  Eye,
  Lock,
  Users,
  Database,
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const Privacy = () => {
  const lastUpdated = "December 2024";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          details: [
            "Name, email address, and profile information you provide",
            "Professional background and organizational affiliations",
            "Skills, interests, and peace-building experience",
            "Location and timezone preferences",
            "Communication preferences and language settings",
          ],
        },
        {
          subtitle: "Platform Activity",
          details: [
            "Peace projects you create, support, or participate in",
            "DAO governance participation and voting records",
            "PeaceCoin transactions and earning activities",
            "Knowledge base contributions and research activities",
            "VR lab sessions and empathy training participation",
          ],
        },
        {
          subtitle: "Technical Data",
          details: [
            "Device information and browser type",
            "IP address and general location data",
            "Usage patterns and feature interactions",
            "Performance metrics and error logs",
            "Security and authentication data",
          ],
        },
      ],
    },
    {
      id: "data-usage",
      title: "How We Use Your Information",
      icon: Users,
      content: [
        {
          subtitle: "Platform Operations",
          details: [
            "Providing personalized peace-building dashboard and tools",
            "Connecting you with relevant projects and collaborators",
            "Facilitating conflict resolution and mediation activities",
            "Processing PeaceCoin transactions and rewards",
            "Enabling DAO governance participation and voting",
          ],
        },
        {
          subtitle: "Safety & Security",
          details: [
            "Detecting and preventing conflicts before escalation",
            "Monitoring for security threats and protecting user data",
            "Verifying identities for high-trust activities",
            "Ensuring platform integrity and preventing abuse",
            "Complying with international peace and security requirements",
          ],
        },
        {
          subtitle: "Improvement & Research",
          details: [
            "Analyzing patterns to improve conflict prediction algorithms",
            "Developing better mediation and peace-building tools",
            "Creating aggregated insights for global peace research",
            "Enhancing AI agents and automated peace systems",
            "Publishing anonymized peace impact reports",
          ],
        },
      ],
    },
    {
      id: "data-sharing",
      title: "Information Sharing",
      icon: Shield,
      content: [
        {
          subtitle: "Public Information",
          details: [
            "Profile information you choose to make public",
            "Peace project contributions and achievements",
            "Public DAO governance votes and proposals",
            "Knowledge base contributions and research",
            "Voluntary participation in peace impact studies",
          ],
        },
        {
          subtitle: "Authorized Partners",
          details: [
            "UN agencies and international peace organizations",
            "Academic institutions conducting peace research",
            "Verified NGOs working on conflict resolution",
            "Government agencies for conflict early warning",
            "Humanitarian organizations for crisis response",
          ],
        },
        {
          subtitle: "Legal Requirements",
          details: [
            "Compliance with international sanctions and regulations",
            "Response to lawful requests from authorities",
            "Protection of PAXIS and user rights and safety",
            "Prevention of fraud, abuse, and illegal activities",
            "Emergency situations involving imminent harm",
          ],
        },
      ],
    },
    {
      id: "data-protection",
      title: "Data Protection & Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          details: [
            "End-to-end encryption for sensitive communications",
            "Multi-factor authentication for account access",
            "Regular security audits and penetration testing",
            "Blockchain-based integrity for critical data",
            "Secure data centers with 24/7 monitoring",
          ],
        },
        {
          subtitle: "Privacy by Design",
          details: [
            "Minimal data collection necessary for functionality",
            "User control over data sharing and visibility",
            "Automatic data anonymization for research",
            "Regular deletion of unnecessary historical data",
            "Transparent logging of all data access",
          ],
        },
        {
          subtitle: "International Standards",
          details: [
            "GDPR compliance for European users",
            "SOC 2 Type II certification for security",
            "ISO 27001 information security management",
            "UN Global Compact principles adherence",
            "Regional data protection law compliance",
          ],
        },
      ],
    },
    {
      id: "user-rights",
      title: "Your Rights & Controls",
      icon: Eye,
      content: [
        {
          subtitle: "Access & Control",
          details: [
            "View, download, or delete your personal data",
            "Control visibility of your profile and activities",
            "Opt out of non-essential data processing",
            "Request data portability to other platforms",
            "Update or correct your information anytime",
          ],
        },
        {
          subtitle: "Communication Preferences",
          details: [
            "Choose which notifications you receive",
            "Set frequency of peace alerts and updates",
            "Opt out of research participation invitations",
            "Control marketing and promotional communications",
            "Manage contact from partner organizations",
          ],
        },
        {
          subtitle: "Data Retention",
          details: [
            "Account data retained while account is active",
            "PeaceCoin transaction history maintained for auditing",
            "Public contributions may remain for historical value",
            "Deleted data removed within 30 days",
            "Some data retained for legal and safety purposes",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="peace-gradient w-8 h-8 rounded-full flex items-center justify-center">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">PAXIS</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-secondary/30 py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <FileText className="mr-2 h-4 w-4" />
              Legal Documentation
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground mb-6">
              How PAXIS protects your privacy while building global peace
              infrastructure
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-purple-500" />
                <span>Globally Accessible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="peace-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    Our Commitment to Privacy
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Last updated: {lastUpdated}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                At PAXIS, we believe that privacy is a fundamental human right
                and essential for building trust in our global peace
                infrastructure. This Privacy Policy explains how we collect,
                use, protect, and share your information when you use the PAXIS
                platform.
              </p>
              <p>
                As a platform dedicated to transforming conflict into
                cooperation, we handle your data with the same care and respect
                we apply to peace-building itself. We are committed to
                transparency, user control, and the highest standards of data
                protection.
              </p>
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-200">
                      Important Note
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      Some features of PAXIS require data sharing for conflict
                      prevention and peace-building effectiveness. We always
                      seek your explicit consent for such activities and provide
                      clear opt-out mechanisms.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={section.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="peace-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h4 className="font-semibold text-lg mb-3 text-primary">
                        {subsection.subtitle}
                      </h4>
                      <ul className="space-y-2">
                        {subsection.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start space-x-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-xl">
                Questions About Privacy?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have questions about this Privacy Policy or how we handle
                your data, please contact our Data Protection Team:
              </p>
              <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
                <div>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:privacy@paxis.global"
                    className="text-primary hover:underline"
                  >
                    privacy@paxis.global
                  </a>
                </div>
                <div>
                  <strong>Data Protection Officer:</strong>{" "}
                  <a
                    href="mailto:dpo@paxis.global"
                    className="text-primary hover:underline"
                  >
                    dpo@paxis.global
                  </a>
                </div>
                <div>
                  <strong>Address:</strong> PAXIS Global Foundation, 123 Peace
                  Avenue, Geneva, Switzerland
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                We will respond to your privacy inquiries within 72 hours and
                provide substantive responses within 30 days.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="peace-gradient peace-glow transition-smooth hover:scale-105"
                asChild
              >
                <Link to="/dashboard">
                  <Shield className="mr-2 h-4 w-4" />
                  Manage Privacy Settings
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/terms">
                  <FileText className="mr-2 h-4 w-4" />
                  Terms of Service
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              By using PAXIS, you acknowledge that you have read and understood
              this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
