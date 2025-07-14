import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  FileText,
  Users,
  Zap,
  Brain,
  Globe,
  Key,
  Server,
  Database,
  Wifi,
  Monitor,
  UserX,
  Settings,
  Clock,
  Target,
  Gavel,
  Heart,
  Scale,
} from "lucide-react";

const Security = () => {
  const securityMetrics = [
    { metric: "System Security Score", value: "98.7%", trend: "+0.3%" },
    { metric: "Active Threats Blocked", value: "0", trend: "24h" },
    { metric: "Privacy Compliance", value: "100%", trend: "GDPR/CCPA" },
    { metric: "Encryption Status", value: "AES-256", trend: "Active" },
  ];

  const ethicsFramework = [
    {
      principle: "Non-Surveillance Commitment",
      description:
        "AI systems cannot be used for mass surveillance or privacy violation",
      status: "Enforced",
      compliance: 100,
      lastAudit: "Jan 15, 2024",
    },
    {
      principle: "Trauma Story Protection",
      description:
        "Personal conflict stories are anonymized and consent-protected",
      status: "Enforced",
      compliance: 100,
      lastAudit: "Jan 12, 2024",
    },
    {
      principle: "Zero Weaponization Policy",
      description: "Sentiment AI cannot be used for manipulation or escalation",
      status: "Enforced",
      compliance: 100,
      lastAudit: "Jan 10, 2024",
    },
    {
      principle: "Localized Consent Framework",
      description:
        "Cultural consent protocols respect indigenous and local customs",
      status: "Active",
      compliance: 94,
      lastAudit: "Jan 8, 2024",
    },
    {
      principle: "AI Constitutional Layers",
      description: "Hard-coded prevention of manipulation or escalation bias",
      status: "Enforced",
      compliance: 100,
      lastAudit: "Jan 15, 2024",
    },
  ];

  const securityLayers = [
    {
      layer: "Blockchain Integrity",
      description: "Immutable audit trails for all peace actions and decisions",
      status: "Active",
      coverage: "100%",
      lastCheck: "2 minutes ago",
    },
    {
      layer: "Zero-Knowledge Proofs",
      description: "Verify actions without revealing sensitive information",
      status: "Active",
      coverage: "98%",
      lastCheck: "5 minutes ago",
    },
    {
      layer: "Encrypted Communication",
      description: "End-to-end encryption for all mediation and sensitive data",
      status: "Active",
      coverage: "100%",
      lastCheck: "1 minute ago",
    },
    {
      layer: "Multi-Signature Validation",
      description: "Multiple independent parties must verify critical actions",
      status: "Active",
      coverage: "100%",
      lastCheck: "3 minutes ago",
    },
    {
      layer: "Decentralized Identity",
      description:
        "Self-sovereign identity for participants without central control",
      status: "Active",
      coverage: "96%",
      lastCheck: "4 minutes ago",
    },
  ];

  const privacyControls = [
    {
      control: "Data Minimization",
      description: "Collect only necessary data for peace operations",
      implementation: "Automated deletion of unnecessary data after 90 days",
      status: "Active",
    },
    {
      control: "Consent Management",
      description: "Granular consent for all data usage",
      implementation: "Blockchain-based consent records with easy withdrawal",
      status: "Active",
    },
    {
      control: "Anonymization Engine",
      description: "Strip identifying information from conflict stories",
      implementation: "AI-powered anonymization with manual review",
      status: "Active",
    },
    {
      control: "Geographic Boundaries",
      description: "Respect jurisdictional privacy laws",
      implementation: "Automatic compliance detection and adjustment",
      status: "Active",
    },
  ];

  const threatMonitoring = [
    {
      threat: "Coordinated Misinformation",
      risk: "Medium",
      description: "Attempts to spread false narratives about peace processes",
      mitigation: "AI detection + community fact-checking",
      status: "Monitored",
    },
    {
      threat: "Economic Manipulation",
      risk: "Low",
      description:
        "Attempts to manipulate PeaceCoin for profit rather than peace",
      mitigation: "Economic security protocols + staking requirements",
      status: "Protected",
    },
    {
      threat: "Cultural Appropriation",
      risk: "Medium",
      description: "Misuse of indigenous or traditional knowledge",
      mitigation: "Indigenous council oversight + consent protocols",
      status: "Monitored",
    },
    {
      threat: "State Actor Interference",
      risk: "High",
      description: "Attempts by hostile nations to compromise peace processes",
      mitigation: "Decentralization + cryptographic protection",
      status: "Protected",
    },
  ];

  const auditTrail = [
    {
      action: "AI Model Update",
      description: "Updated conflict prediction model with new training data",
      timestamp: "2024-01-15 14:30:00",
      operator: "AI Ethics Committee",
      verification: "Multi-signature approved",
      impact: "Improved accuracy by 2.3%",
    },
    {
      action: "Privacy Policy Update",
      description: "Enhanced data protection for vulnerable communities",
      timestamp: "2024-01-12 09:15:00",
      operator: "Privacy Council",
      verification: "Community vote passed (94%)",
      impact: "Stronger protection protocols",
    },
    {
      action: "Security Patch",
      description: "Applied encryption upgrade to mediation channels",
      timestamp: "2024-01-10 22:45:00",
      operator: "Security Team",
      verification: "Automated deployment",
      impact: "Enhanced communication security",
    },
  ];

  const complianceStatus = [
    {
      framework: "GDPR (EU)",
      status: "Compliant",
      lastAudit: "Dec 2023",
      score: 98,
    },
    {
      framework: "CCPA (California)",
      status: "Compliant",
      lastAudit: "Nov 2023",
      score: 96,
    },
    {
      framework: "PIPEDA (Canada)",
      status: "Compliant",
      lastAudit: "Jan 2024",
      score: 97,
    },
    {
      framework: "UN Privacy Guidelines",
      status: "Compliant",
      lastAudit: "Jan 2024",
      score: 99,
    },
    {
      framework: "Indigenous Data Sovereignty",
      status: "In Progress",
      lastAudit: "Ongoing",
      score: 89,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Security & Ethics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive protection and ethical governance for the PAXIS peace
            ecosystem
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {securityMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.metric}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {metric.value}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {metric.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="ethics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="ethics">Ethics</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="threats">Threats</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="audits">Audits</TabsTrigger>
          </TabsList>

          <TabsContent value="ethics" className="space-y-6">
            <Alert>
              <Heart className="h-4 w-4" />
              <AlertDescription>
                PAXIS operates under a comprehensive ethics framework designed
                to prevent misuse and protect vulnerable communities.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Digital Peace Ethics Framework
                </CardTitle>
                <CardDescription>
                  Core ethical principles governing all PAXIS operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ethicsFramework.map((principle, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{principle.principle}</h3>
                        <Badge
                          variant={
                            principle.status === "Enforced"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {principle.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {principle.description}
                      </p>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Compliance</span>
                        <span className="text-sm font-medium">
                          {principle.compliance}%
                        </span>
                      </div>
                      <Progress value={principle.compliance} className="mb-2" />
                      <div className="text-xs text-muted-foreground">
                        Last audit: {principle.lastAudit}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Multi-Layer Security Architecture
                </CardTitle>
                <CardDescription>
                  Comprehensive security measures protecting the peace
                  infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityLayers.map((layer, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{layer.layer}</div>
                          <div className="text-sm text-muted-foreground">
                            {layer.description}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Last check: {layer.lastCheck}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            layer.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {layer.status}
                        </Badge>
                        <div className="text-sm font-medium text-primary">
                          {layer.coverage}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Privacy Protection Controls
                </CardTitle>
                <CardDescription>
                  Advanced privacy safeguards for sensitive peace-building data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {privacyControls.map((control, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{control.control}</h3>
                        <Badge variant="default">{control.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {control.description}
                      </p>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Implementation:{" "}
                        </span>
                        <span>{control.implementation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Protection Status
                </CardTitle>
                <CardDescription>
                  Current privacy protection metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Data Encryption</span>
                        <span className="font-semibold text-primary">100%</span>
                      </div>
                      <Progress value={100} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Anonymization Rate</span>
                        <span className="font-semibold text-accent">98.7%</span>
                      </div>
                      <Progress value={98.7} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Consent Coverage</span>
                        <span className="font-semibold text-green-600">
                          99.9%
                        </span>
                      </div>
                      <Progress value={99.9} />
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Encrypted Records:
                      </span>
                      <span className="font-medium">2.4M+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Anonymous Stories:
                      </span>
                      <span className="font-medium">156K+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Data Requests:
                      </span>
                      <span className="font-medium">847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Deletions Honored:
                      </span>
                      <span className="font-medium">100%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Threat Monitoring & Mitigation
                </CardTitle>
                <CardDescription>
                  Active monitoring of potential risks to the peace ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threatMonitoring.map((threat, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{threat.threat}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              threat.risk === "High"
                                ? "destructive"
                                : threat.risk === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {threat.risk} Risk
                          </Badge>
                          <Badge variant="outline">{threat.status}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {threat.description}
                      </p>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Mitigation:{" "}
                        </span>
                        <span>{threat.mitigation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Active Monitoring
                  </CardTitle>
                  <CardDescription>
                    Real-time threat detection systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">AI Behavior Monitor</div>
                        <div className="text-sm text-muted-foreground">
                          Detects bias or manipulation
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">
                          Network Security Scanner
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Continuous vulnerability assessment
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">
                          Content Integrity Checker
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Verifies authentic peace content
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Incident Response
                  </CardTitle>
                  <CardDescription>
                    Automated and manual response protocols
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Response Time</span>
                        <span className="font-semibold text-primary">
                          &lt; 5 min
                        </span>
                      </div>
                      <Progress value={95} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Threat Resolution</span>
                        <span className="font-semibold text-accent">98.7%</span>
                      </div>
                      <Progress value={98.7} />
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Incidents This Month:
                        </span>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          False Positives:
                        </span>
                        <span className="font-medium">0.3%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Regulatory Compliance Status
                </CardTitle>
                <CardDescription>
                  Adherence to global privacy and security regulations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceStatus.map((framework, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div>
                        <div className="font-medium">{framework.framework}</div>
                        <div className="text-sm text-muted-foreground">
                          Last audit: {framework.lastAudit}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            framework.status === "Compliant"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {framework.status}
                        </Badge>
                        <div className="text-sm font-medium text-primary mt-1">
                          Score: {framework.score}/100
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Audit Trail
                </CardTitle>
                <CardDescription>
                  Transparent record of all security and ethical decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditTrail.map((audit, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{audit.action}</h3>
                        <Badge variant="outline" className="text-xs">
                          {audit.timestamp}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {audit.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">
                            Operator:
                          </span>
                          <div className="font-medium">{audit.operator}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Verification:
                          </span>
                          <div className="font-medium">
                            {audit.verification}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <div className="font-medium text-primary">
                            {audit.impact}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4" variant="outline">
                  View Full Audit Log
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Security;
