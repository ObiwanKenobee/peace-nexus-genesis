import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Scale,
  Shield,
  Users,
  Coins,
  FileText,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Gavel,
  Heart,
} from "lucide-react";

const Terms = () => {
  const effectiveDate = "December 2024";

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing or using the PAXIS platform, you agree to be bound by these Terms of Service and our Privacy Policy.",
        "These terms constitute a legally binding agreement between you and PAXIS Global Foundation.",
        "If you do not agree with any part of these terms, you may not access or use the PAXIS platform.",
        "We may update these terms from time to time, and continued use constitutes acceptance of any changes.",
        "Users under 18 must have parental consent to use PAXIS services.",
      ],
    },
    {
      id: "platform-purpose",
      title: "Platform Purpose & Mission",
      icon: Heart,
      content: [
        "PAXIS is a decentralized ecosystem designed to transform military deterrence into peaceful cooperation.",
        "Our mission is to prevent conflicts, facilitate mediation, and build sustainable peace through technology.",
        "The platform provides tools for conflict early warning, resource sharing, and community governance.",
        "Users participate in a global network dedicated to replacing conflict with cooperation and mutual understanding.",
        "All platform activities should align with principles of peace, non-violence, and human dignity.",
      ],
    },
    {
      id: "user-responsibilities",
      title: "User Responsibilities",
      icon: Users,
      content: [
        "Users must provide accurate and truthful information in their profiles and activities.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "Users must respect the rights, dignity, and safety of all other platform participants.",
        "Prohibited activities include violence promotion, hate speech, harassment, or illegal activities.",
        "Users should report suspicious activities, potential conflicts, or platform abuse immediately.",
        "Professional users must disclose organizational affiliations and potential conflicts of interest.",
        "Participation in DAO governance requires responsible and informed decision-making.",
      ],
    },
    {
      id: "peacecoin-terms",
      title: "PeaceCoin & Digital Assets",
      icon: Coins,
      content: [
        "PeaceCoin is a utility token designed to incentivize peaceful actions and cooperation.",
        "Tokens are earned through verified peace-building activities, conflict resolution, and community contributions.",
        "PeaceCoin has no guaranteed monetary value and should not be considered an investment.",
        "The platform reserves the right to adjust token economics for ecosystem sustainability.",
        "Users are responsible for understanding tax implications of token transactions in their jurisdiction.",
        "Fraudulent activities to earn tokens may result in account suspension and token forfeiture.",
        "Token transfers must comply with applicable financial regulations and sanctions.",
      ],
    },
    {
      id: "content-ip",
      title: "Content & Intellectual Property",
      icon: FileText,
      content: [
        "Users retain ownership of original content they create on the platform.",
        "By posting content, users grant PAXIS a license to display, distribute, and use content for platform purposes.",
        "Users must respect intellectual property rights of others and may not post copyrighted material without permission.",
        "PAXIS respects intellectual property rights and will respond to valid DMCA takedown notices.",
        "Peace research, conflict data, and analytical insights may be shared for humanitarian purposes.",
        "Users contributing to the knowledge base agree to make contributions available under Creative Commons licensing.",
        "AI-generated content and analyses are provided for informational purposes and require human verification.",
      ],
    },
    {
      id: "dao-governance",
      title: "DAO Governance & Voting",
      icon: Gavel,
      content: [
        "DAO governance allows community participation in platform development and policy decisions.",
        "Voting power may be based on contribution scores, token holdings, or reputation metrics.",
        "All governance participants must act in good faith and in the best interests of global peace.",
        "Proposal submission requires minimum contribution thresholds to prevent spam and abuse.",
        "Governance decisions are binding and will be implemented according to approved timelines.",
        "Users may delegate voting power to trusted community members or organizations.",
        "Emergency governance procedures may bypass normal voting for urgent security or safety issues.",
      ],
    },
    {
      id: "data-security",
      title: "Data Security & Privacy",
      icon: Shield,
      content: [
        "PAXIS implements industry-standard security measures to protect user data and platform integrity.",
        "Users are responsible for protecting their own devices and internet connections when accessing the platform.",
        "Sensitive conflict data may be encrypted and access-controlled to prevent misuse.",
        "Platform monitoring may occur to detect threats, abuse, or potential conflicts requiring intervention.",
        "Users consent to data processing necessary for conflict prevention and peace-building activities.",
        "Emergency situations may require expedited data sharing with humanitarian organizations or authorities.",
        "All data handling practices are detailed in our Privacy Policy, which forms part of these terms.",
      ],
    },
    {
      id: "prohibited-conduct",
      title: "Prohibited Conduct",
      icon: AlertTriangle,
      content: [
        "Violence promotion, terrorist activities, or content that incites hatred or discrimination.",
        "Harassment, bullying, doxxing, or threatening behavior toward any users or groups.",
        "Spreading misinformation about conflicts, peace processes, or humanitarian situations.",
        "Attempting to manipulate conflict data, governance votes, or PeaceCoin distribution systems.",
        "Using the platform for money laundering, sanctions evasion, or other illegal financial activities.",
        "Impersonating organizations, officials, or other users to deceive or defraud others.",
        "Interfering with platform security, attempting unauthorized access, or distributing malware.",
        "Commercial spam, unauthorized advertising, or activities unrelated to peace-building.",
      ],
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: Scale,
      content: [
        "PAXIS is provided 'as is' without warranties of any kind, express or implied.",
        "We do not guarantee platform availability, accuracy of information, or successful conflict resolution.",
        "PAXIS is not liable for damages arising from platform use, including but not limited to loss of data or funds.",
        "Users acknowledge that peace-building involves inherent risks and uncertain outcomes.",
        "Our liability is limited to the maximum extent permitted by applicable law.",
        "Users are responsible for their own safety when participating in conflict zones or sensitive activities.",
        "Third-party services integrated with PAXIS are subject to their own terms and conditions.",
      ],
    },
    {
      id: "dispute-resolution",
      title: "Dispute Resolution",
      icon: Scale,
      content: [
        "Disputes between users should first be addressed through platform mediation tools.",
        "Formal complaints may be submitted to our conflict resolution team for investigation.",
        "Legal disputes will be governed by Swiss law and subject to jurisdiction of Swiss courts.",
        "Users agree to attempt mediation before pursuing litigation for platform-related disputes.",
        "Emergency situations requiring immediate intervention may bypass normal dispute resolution procedures.",
        "Decisions by the PAXIS governance council on platform matters are final and binding.",
        "Class action lawsuits are waived in favor of individual arbitration proceedings.",
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
              <Gavel className="mr-2 h-4 w-4" />
              Legal Framework
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground mb-6">
              The legal foundation for building peace through technology and
              cooperation
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Fair & Transparent</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>User-Protective</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>Peace-Focused</span>
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
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Legal Agreement</CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Effective Date: {effectiveDate}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Welcome to PAXIS, a revolutionary platform dedicated to
                transforming global conflict into cooperation through
                technology, community governance, and shared intelligence. These
                Terms of Service govern your use of the PAXIS platform and all
                related services.
              </p>
              <p>
                By joining PAXIS, you become part of a global movement working
                toward a more peaceful, cooperative, and sustainable future.
                These terms ensure that our platform remains safe, effective,
                and aligned with our peace-building mission.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">
                      Global Peace Mission
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      These terms are designed to support our mission of
                      building sustainable peace while protecting the rights and
                      safety of all participants in the PAXIS ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={section.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="peace-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-xl">
                      {index + 1}. {section.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact & Legal Information */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Legal Entity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>Organization:</strong> PAXIS Global Foundation
                </div>
                <div>
                  <strong>Jurisdiction:</strong> Geneva, Switzerland
                </div>
                <div>
                  <strong>Registration:</strong> CHE-123.456.789
                </div>
                <div>
                  <strong>Legal Email:</strong>{" "}
                  <a
                    href="mailto:legal@paxis.global"
                    className="text-primary hover:underline"
                  >
                    legal@paxis.global
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Platform Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <strong>General Support:</strong>{" "}
                  <a
                    href="mailto:support@paxis.global"
                    className="text-primary hover:underline"
                  >
                    support@paxis.global
                  </a>
                </div>
                <div>
                  <strong>Dispute Resolution:</strong>{" "}
                  <a
                    href="mailto:disputes@paxis.global"
                    className="text-primary hover:underline"
                  >
                    disputes@paxis.global
                  </a>
                </div>
                <div>
                  <strong>Emergency Contact:</strong>{" "}
                  <a
                    href="mailto:emergency@paxis.global"
                    className="text-primary hover:underline"
                  >
                    emergency@paxis.global
                  </a>
                </div>
                <div>
                  <strong>Response Time:</strong> 24-48 hours
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Notice */}
          <Card className="mt-12 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                    Important Legal Notice
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 mb-3">
                    PAXIS operates in complex geopolitical environments and
                    deals with sensitive conflict-related information. Users
                    acknowledge the inherent risks involved in peace-building
                    activities and agree to exercise appropriate caution.
                  </p>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    These terms may be updated to reflect changes in law,
                    platform features, or peace-building best practices. Users
                    will be notified of significant changes.
                  </p>
                </div>
              </div>
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
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Accept & Continue
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/privacy">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy Policy
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              By clicking "Accept & Continue," you acknowledge that you have
              read, understood, and agree to be bound by these Terms of Service
              and our Privacy Policy. Together, let's build a more peaceful
              world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
