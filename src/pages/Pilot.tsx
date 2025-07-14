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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Globe,
  Smartphone,
  Wifi,
  Shield,
  Users,
  Heart,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Download,
  Settings,
  Signal,
  Database,
  Languages,
  Target,
  TrendingUp,
  Award,
  Handshake,
} from "lucide-react";

const Pilot = () => {
  const pilotRegions = [
    {
      name: "Eastern Sudan",
      country: "Sudan",
      population: "2.4M",
      conflictRisk: "High",
      infrastructure: "Limited",
      connectivity: "2G/3G",
      languages: ["Arabic", "Beja", "Tigre"],
      challenges: ["Water scarcity", "Border tensions", "Economic hardship"],
      status: "Active Pilot",
      deployment: "Phase 2",
      users: "12,847",
      peaceCoinEarned: "34,567 PC",
    },
    {
      name: "Kashmir Valley",
      country: "India/Pakistan",
      population: "7.1M",
      conflictRisk: "Critical",
      infrastructure: "Moderate",
      connectivity: "3G/4G",
      languages: ["Kashmiri", "Urdu", "Hindi"],
      challenges: [
        "Territorial disputes",
        "Communication barriers",
        "Trust deficit",
      ],
      status: "Planning",
      deployment: "Phase 1",
      users: "0",
      peaceCoinEarned: "0 PC",
    },
    {
      name: "Sahel Region",
      country: "Mali/Burkina Faso/Niger",
      population: "15.2M",
      conflictRisk: "High",
      infrastructure: "Very Limited",
      connectivity: "2G/Satellite",
      languages: ["French", "Hausa", "Fulfulde", "Bambara"],
      challenges: [
        "Climate migration",
        "Resource competition",
        "Security threats",
      ],
      status: "Assessment",
      deployment: "Pre-Phase",
      users: "0",
      peaceCoinEarned: "0 PC",
    },
    {
      name: "Donetsk Region",
      country: "Ukraine",
      population: "4.2M",
      conflictRisk: "Critical",
      infrastructure: "Damaged",
      connectivity: "Intermittent",
      languages: ["Ukrainian", "Russian"],
      challenges: ["Active conflict", "Infrastructure damage", "Displacement"],
      status: "Proposed",
      deployment: "Future",
      users: "0",
      peaceCoinEarned: "0 PC",
    },
  ];

  const deploymentFeatures = [
    {
      feature: "Offline-First Architecture",
      description: "Works without internet connection, syncs when available",
      technical: "Progressive Web App with local SQLite storage",
      status: "Implemented",
    },
    {
      feature: "Mobile-Optimized UI",
      description: "Designed for smartphones and tablets with low-end specs",
      technical: "Lightweight React Native app under 10MB",
      status: "Implemented",
    },
    {
      feature: "Multilingual Support",
      description: "Real-time translation and local language interfaces",
      technical: "AI-powered translation with offline dictionaries",
      status: "Active",
    },
    {
      feature: "Cultural Adaptation Engine",
      description: "Adapts content and processes to local customs",
      technical: "Community-trained AI models with cultural advisors",
      status: "Beta",
    },
    {
      feature: "Anonymous Safety Beacons",
      description: "Emergency communication without revealing identity",
      technical: "Encrypted mesh networking with zero-knowledge proofs",
      status: "Testing",
    },
    {
      feature: "Low-Trust Environment Protocols",
      description: "Functions even when institutions are compromised",
      technical: "Blockchain verification with peer consensus",
      status: "Development",
    },
  ];

  const deploymentMetrics = [
    { metric: "Regions Assessed", value: "23", trend: "+4 this quarter" },
    { metric: "Active Pilots", value: "1", trend: "Sudan operational" },
    { metric: "Users Onboarded", value: "12,847", trend: "+89% growth" },
    { metric: "Conflicts Detected", value: "34", trend: "12 prevented" },
  ];

  const technicalRequirements = [
    {
      category: "Connectivity",
      minimum: "2G data connection",
      recommended: "3G/4G or WiFi",
      fallback: "SMS gateway backup",
    },
    {
      category: "Device",
      minimum: "Android 6.0, 2GB RAM",
      recommended: "Android 8.0+, 4GB RAM",
      fallback: "Feature phone SMS",
    },
    {
      category: "Power",
      minimum: "Solar charging station",
      recommended: "Reliable electricity",
      fallback: "Hand-crank chargers",
    },
    {
      category: "Language",
      minimum: "Local language interface",
      recommended: "Native speaker support",
      fallback: "Visual/symbol interface",
    },
  ];

  const implementationPhases = [
    {
      phase: "Phase 0: Assessment",
      duration: "2-3 months",
      activities: [
        "Community needs analysis",
        "Cultural sensitivity mapping",
        "Technical infrastructure audit",
        "Local partnership establishment",
      ],
      deliverables: "Deployment feasibility report",
    },
    {
      phase: "Phase 1: Foundation",
      duration: "3-4 months",
      activities: [
        "Core team training",
        "Basic infrastructure setup",
        "Community leader engagement",
        "Pilot user recruitment",
      ],
      deliverables: "Basic system deployment",
    },
    {
      phase: "Phase 2: Expansion",
      duration: "6-8 months",
      activities: [
        "Feature rollout",
        "User base growth",
        "Conflict monitoring activation",
        "Resource sharing initiation",
      ],
      deliverables: "Full feature availability",
    },
    {
      phase: "Phase 3: Integration",
      duration: "12+ months",
      activities: [
        "Cross-border connectivity",
        "Advanced AI features",
        "Economic integration",
        "Sustainability planning",
      ],
      deliverables: "Self-sustaining ecosystem",
    },
  ];

  const successStories = [
    {
      region: "Eastern Sudan Pilot",
      achievement: "Water Dispute Resolution",
      description:
        "Successfully mediated water rights conflict between 3 villages using PAXIS mobile interface",
      impact: "2,400 people gained access to shared water resources",
      timeline: "2 weeks",
      peaceCoins: "5,000 PC distributed",
    },
    {
      region: "Eastern Sudan Pilot",
      achievement: "Community Dialogue Network",
      description:
        "Established digital peace circle connecting 12 communities across ethnic lines",
      impact: "67% reduction in inter-community tensions",
      timeline: "3 months",
      peaceCoins: "12,000 PC earned collectively",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Pilot Region Deployment</h1>
          <p className="text-muted-foreground">
            Deploying PAXIS peace infrastructure in conflict-vulnerable regions
            worldwide
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {deploymentMetrics.map((metric, index) => (
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

        <Tabs defaultValue="regions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
            <TabsTrigger value="propose">Propose Region</TabsTrigger>
          </TabsList>

          <TabsContent value="regions" className="space-y-6">
            <div className="space-y-6">
              {pilotRegions.map((region, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{region.name}</CardTitle>
                        <CardDescription>
                          {region.country} • {region.population} population
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant={
                            region.status === "Active Pilot"
                              ? "default"
                              : region.status === "Planning"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {region.status}
                        </Badge>
                        <Badge
                          variant={
                            region.conflictRisk === "Critical"
                              ? "destructive"
                              : region.conflictRisk === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {region.conflictRisk} Risk
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Languages Supported
                          </Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {region.languages.map((lang, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            Key Challenges
                          </Label>
                          <div className="mt-1 space-y-1">
                            {region.challenges.map((challenge, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm"
                              >
                                <AlertTriangle className="h-3 w-3 text-orange-500" />
                                {challenge}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Infrastructure:
                            </span>
                            <div className="font-medium">
                              {region.infrastructure}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Connectivity:
                            </span>
                            <div className="font-medium">
                              {region.connectivity}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-center p-4 rounded-lg bg-primary/10">
                          <div className="text-lg font-bold text-primary">
                            {region.deployment}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Deployment Phase
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-accent">
                              {region.users}
                            </div>
                            <div className="text-muted-foreground">Users</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-green-600">
                              {region.peaceCoinEarned}
                            </div>
                            <div className="text-muted-foreground">
                              PC Earned
                            </div>
                          </div>
                        </div>

                        <Button
                          className="w-full"
                          variant={
                            region.status === "Active Pilot"
                              ? "default"
                              : "outline"
                          }
                          disabled={region.status === "Proposed"}
                        >
                          {region.status === "Active Pilot"
                            ? "View Dashboard"
                            : region.status === "Planning"
                              ? "Join Planning"
                              : region.status === "Assessment"
                                ? "View Assessment"
                                : "Coming Soon"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Pilot-Optimized Features
                </CardTitle>
                <CardDescription>
                  Lightweight, culturally-adaptive features for
                  conflict-vulnerable regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deploymentFeatures.map((feature, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{feature.feature}</h3>
                        <Badge
                          variant={
                            feature.status === "Implemented"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {feature.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {feature.description}
                      </p>
                      <div className="text-xs">
                        <span className="text-muted-foreground">
                          Technical:{" "}
                        </span>
                        <span>{feature.technical}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Technical Requirements
                </CardTitle>
                <CardDescription>
                  Minimum specifications for PAXIS deployment in challenging
                  environments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {technicalRequirements.map((req, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="font-medium">{req.category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 rounded-lg border">
                          <div className="text-sm font-medium text-orange-600 mb-1">
                            Minimum
                          </div>
                          <div className="text-sm">{req.minimum}</div>
                        </div>
                        <div className="p-3 rounded-lg border">
                          <div className="text-sm font-medium text-green-600 mb-1">
                            Recommended
                          </div>
                          <div className="text-sm">{req.recommended}</div>
                        </div>
                        <div className="p-3 rounded-lg border">
                          <div className="text-sm font-medium text-blue-600 mb-1">
                            Fallback
                          </div>
                          <div className="text-sm">{req.fallback}</div>
                        </div>
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
                    <Signal className="h-5 w-5" />
                    Connectivity Solutions
                  </CardTitle>
                  <CardDescription>
                    Multiple connectivity options for different scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Mesh Networking</div>
                        <div className="text-sm text-muted-foreground">
                          Device-to-device communication
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Satellite Backup</div>
                        <div className="text-sm text-muted-foreground">
                          Emergency communication
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">SMS Gateway</div>
                        <div className="text-sm text-muted-foreground">
                          Basic feature phones
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
                    <Database className="h-5 w-5" />
                    Offline Capabilities
                  </CardTitle>
                  <CardDescription>
                    Full functionality without internet connection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Offline Data Storage</span>
                        <span className="font-semibold text-primary">100%</span>
                      </div>
                      <Progress value={100} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Local AI Processing</span>
                        <span className="font-semibold text-accent">85%</span>
                      </div>
                      <Progress value={85} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">P2P Sync</span>
                        <span className="font-semibold text-green-600">
                          90%
                        </span>
                      </div>
                      <Progress value={90} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Implementation Phases
                </CardTitle>
                <CardDescription>
                  Structured deployment approach for sustainable peace
                  infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {implementationPhases.map((phase, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{phase.phase}</h3>
                        <Badge variant="outline">{phase.duration}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Activities
                          </h4>
                          <ul className="text-sm space-y-1">
                            {phase.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-600" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Deliverables
                          </h4>
                          <div className="text-sm text-primary font-medium">
                            {phase.deliverables}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Pilot Success Stories
                </CardTitle>
                <CardDescription>
                  Real impact from PAXIS deployments in challenging environments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {successStories.map((story, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{story.achievement}</h3>
                        <Badge variant="outline">{story.region}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {story.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <div className="font-medium text-primary">
                            {story.impact}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Timeline:
                          </span>
                          <div className="font-medium">{story.timeline}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            PeaceCoins:
                          </span>
                          <div className="font-medium text-green-600">
                            {story.peaceCoins}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="propose" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Propose New Pilot Region
                </CardTitle>
                <CardDescription>
                  Submit a region for PAXIS pilot deployment assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="region-name">Region Name</Label>
                    <Input
                      id="region-name"
                      placeholder="e.g., Western Sahara"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country/Territory</Label>
                    <Input
                      id="country"
                      placeholder="e.g., Morocco/Western Sahara"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="population">Population</Label>
                    <Input id="population" placeholder="e.g., 500,000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="risk-level">Conflict Risk Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Primary Languages</Label>
                  <Input
                    id="languages"
                    placeholder="e.g., Arabic, Hassaniya, French"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Key Challenges</Label>
                  <Textarea
                    id="challenges"
                    placeholder="Describe the main conflict drivers, resource issues, or social tensions..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="infrastructure">Infrastructure Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-limited">
                          Very Limited
                        </SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="connectivity">Connectivity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select connectivity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No connectivity</SelectItem>
                        <SelectItem value="2g">2G/SMS only</SelectItem>
                        <SelectItem value="3g">3G available</SelectItem>
                        <SelectItem value="4g">4G/LTE</SelectItem>
                        <SelectItem value="wifi">
                          WiFi infrastructure
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justification">Why This Region?</Label>
                  <Textarea
                    id="justification"
                    placeholder="Explain why this region would benefit from PAXIS deployment and your connection to the area..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="local-contacts">Local Contacts</Label>
                  <Input
                    id="local-contacts"
                    placeholder="Community leaders, NGOs, or organizations that could assist"
                  />
                </div>

                <Button className="w-full peace-gradient">
                  Submit Pilot Proposal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Pilot;
