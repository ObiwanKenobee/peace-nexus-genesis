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
  Brain,
  MessageSquare,
  Users,
  Scale,
  Clock,
  CheckCircle,
  AlertTriangle,
  MapPin,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  Video,
  FileText,
  Send,
} from "lucide-react";

const Mediation = () => {
  const activeMediation = [
    {
      id: "MED-2024-001",
      title: "Water Rights Dispute - Ethiopia/Sudan",
      parties: ["Ethiopian Agricultural Collective", "Sudanese Farmers Union"],
      status: "Active Session",
      aiMediator: "PeaceBot Alpha-7",
      priority: "High",
      progress: 67,
      startDate: "2024-01-15",
      estimatedResolution: "2024-01-22",
      language: "English, Arabic, Amharic",
    },
    {
      id: "MED-2024-002",
      title: "Maritime Boundary - Philippines/Vietnam",
      parties: [
        "Philippine Fishing Association",
        "Vietnamese Maritime Council",
      ],
      status: "Analysis Phase",
      aiMediator: "PeaceBot Beta-3",
      priority: "Medium",
      progress: 23,
      startDate: "2024-01-18",
      estimatedResolution: "2024-01-28",
      language: "English, Tagalog, Vietnamese",
    },
    {
      id: "MED-2024-003",
      title: "Trade Route Conflict - India/Pakistan",
      parties: ["Kashmir Trade Council", "Punjab Business Alliance"],
      status: "Settlement Review",
      aiMediator: "PeaceBot Gamma-2",
      priority: "High",
      progress: 89,
      startDate: "2024-01-10",
      estimatedResolution: "2024-01-20",
      language: "English, Hindi, Urdu",
    },
  ];

  const mediationTools = [
    {
      name: "Sentiment Analysis",
      description:
        "Real-time emotional tone monitoring and de-escalation suggestions",
      icon: Brain,
      status: "Active",
      accuracy: "94%",
    },
    {
      name: "Historical Pattern Matching",
      description:
        "AI analysis of similar past conflicts and successful resolutions",
      icon: Target,
      status: "Active",
      accuracy: "87%",
    },
    {
      name: "Cultural Context Engine",
      description:
        "Indigenous governance models and cultural sensitivity analysis",
      icon: Users,
      status: "Active",
      accuracy: "91%",
    },
    {
      name: "Treaty Generator",
      description: "AI-assisted creation of fair and enforceable agreements",
      icon: FileText,
      status: "Active",
      accuracy: "96%",
    },
  ];

  const successMetrics = [
    { metric: "Mediation Success Rate", value: "89%", trend: "+5%" },
    { metric: "Average Resolution Time", value: "12 days", trend: "-8%" },
    { metric: "Treaty Compliance", value: "96%", trend: "+3%" },
    { metric: "Participant Satisfaction", value: "4.7/5", trend: "+0.2%" },
  ];

  const recentSuccesses = [
    {
      title: "Indonesia-Malaysia Forest Agreement",
      description: "Sustainable logging rights resolved through AI mediation",
      participants: "2 nations, 4 communities",
      duration: "8 days",
      peaceCoins: "15,000 PC",
      date: "Jan 12, 2024",
    },
    {
      title: "Kenya-Tanzania Water Sharing Pact",
      description: "Cross-border water management protocol established",
      participants: "2 nations, 12 communities",
      duration: "15 days",
      peaceCoins: "22,500 PC",
      date: "Jan 8, 2024",
    },
    {
      title: "Arctic Research Cooperation",
      description: "Multi-nation scientific collaboration framework",
      participants: "8 nations, 15 institutions",
      duration: "21 days",
      peaceCoins: "45,000 PC",
      date: "Dec 28, 2023",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            AI-Powered Mediation Center
          </h1>
          <p className="text-muted-foreground">
            Intelligent conflict resolution using AI, cultural wisdom, and
            community-driven protocols
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {successMetrics.map((metric, index) => (
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

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="active">Active Cases</TabsTrigger>
            <TabsTrigger value="tools">AI Tools</TabsTrigger>
            <TabsTrigger value="start">Start Mediation</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
            <TabsTrigger value="training">AI Training</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="space-y-6">
              {activeMediation.map((mediation, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {mediation.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Case ID: {mediation.id}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          mediation.priority === "High"
                            ? "destructive"
                            : "default"
                        }
                      >
                        {mediation.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Participating Parties
                          </Label>
                          <div className="mt-1 space-y-1">
                            {mediation.parties.map((party, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm"
                              >
                                <Users className="h-4 w-4 text-muted-foreground" />
                                {party}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">
                              AI Mediator
                            </Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Brain className="h-4 w-4 text-accent" />
                              <span className="text-sm">
                                {mediation.aiMediator}
                              </span>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">
                              Languages
                            </Label>
                            <div className="text-sm text-muted-foreground mt-1">
                              {mediation.language}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <Label className="text-sm font-medium">
                              Progress
                            </Label>
                            <span className="text-sm font-medium">
                              {mediation.progress}%
                            </span>
                          </div>
                          <Progress value={mediation.progress} />
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Started:
                            </span>
                            <span>{mediation.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Est. Resolution:
                            </span>
                            <span>{mediation.estimatedResolution}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Video className="h-4 w-4 mr-2" />
                            Join Session
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mediationTools.map((tool, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <tool.icon className="h-5 w-5 text-primary" />
                      {tool.name}
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-3">
                      <Badge
                        variant={
                          tool.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {tool.status}
                      </Badge>
                      <div className="text-sm">
                        <span className="text-muted-foreground">
                          Accuracy:{" "}
                        </span>
                        <span className="font-medium text-primary">
                          {tool.accuracy}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Configure Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="start" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Initiate New Mediation
                  </CardTitle>
                  <CardDescription>
                    Submit a conflict for AI-assisted resolution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="conflict-title">Conflict Title</Label>
                    <Input
                      id="conflict-title"
                      placeholder="Brief description of the dispute"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="conflict-description">
                      Detailed Description
                    </Label>
                    <Textarea
                      id="conflict-description"
                      placeholder="Provide comprehensive background, key issues, and affected parties..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="conflict-type">Conflict Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resource">
                            Resource Dispute
                          </SelectItem>
                          <SelectItem value="territorial">
                            Territorial
                          </SelectItem>
                          <SelectItem value="trade">Trade/Economic</SelectItem>
                          <SelectItem value="cultural">
                            Cultural/Religious
                          </SelectItem>
                          <SelectItem value="environmental">
                            Environmental
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
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
                    <Label htmlFor="parties">Involved Parties</Label>
                    <Input
                      id="parties"
                      placeholder="List all parties, organizations, or communities involved"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Geographic Location</Label>
                    <Input
                      id="location"
                      placeholder="Region, country, or specific area affected"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="languages">Preferred Languages</Label>
                    <Input
                      id="languages"
                      placeholder="Languages needed for mediation"
                    />
                  </div>

                  <Button className="w-full peace-gradient">
                    <Send className="h-4 w-4 mr-2" />
                    Submit for Mediation
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Mediation Process
                  </CardTitle>
                  <CardDescription>
                    How PAXIS AI-powered mediation works
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <div>
                        <div className="font-medium">Conflict Analysis</div>
                        <div className="text-sm text-muted-foreground">
                          AI analyzes context, parties, and historical
                          precedents
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <div>
                        <div className="font-medium">Mediator Assignment</div>
                        <div className="text-sm text-muted-foreground">
                          AI mediator with relevant expertise is selected
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div>
                        <div className="font-medium">Virtual Mediation</div>
                        <div className="text-sm text-muted-foreground">
                          Secure, multilingual video sessions with real-time
                          guidance
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        4
                      </div>
                      <div>
                        <div className="font-medium">Solution Crafting</div>
                        <div className="text-sm text-muted-foreground">
                          AI assists in creating fair, enforceable agreements
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
                        5
                      </div>
                      <div>
                        <div className="font-medium">Implementation</div>
                        <div className="text-sm text-muted-foreground">
                          Blockchain-verified agreements with PeaceCoin rewards
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="success" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Success Stories
                </CardTitle>
                <CardDescription>
                  Conflicts successfully resolved through AI mediation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSuccesses.map((success, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{success.title}</h3>
                        <Badge variant="secondary">{success.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {success.description}
                      </p>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">
                            Participants:
                          </span>
                          <div className="font-medium">
                            {success.participants}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <div className="font-medium">{success.duration}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            PeaceCoins:
                          </span>
                          <div className="font-medium text-primary">
                            {success.peaceCoins}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-accent" />
                          <span className="text-accent font-medium">
                            Resolved
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    AI Training Data
                  </CardTitle>
                  <CardDescription>
                    Contribute to improving AI mediation capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">
                          Peace Treaties Database
                        </div>
                        <div className="text-sm text-muted-foreground">
                          2,847 historical treaties
                        </div>
                      </div>
                      <Badge variant="default">Complete</Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">
                          Indigenous Governance Models
                        </div>
                        <div className="text-sm text-muted-foreground">
                          456 traditional systems
                        </div>
                      </div>
                      <Badge variant="secondary">Ongoing</Badge>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">
                          Successful Mediation Cases
                        </div>
                        <div className="text-sm text-muted-foreground">
                          1,234 resolved conflicts
                        </div>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>

                    <Button className="w-full" variant="outline">
                      Contribute Training Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    AI Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Continuous improvement in mediation effectiveness
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">
                          Cultural Sensitivity Score
                        </span>
                        <span className="font-semibold text-primary">94%</span>
                      </div>
                      <Progress value={94} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">
                          Solution Acceptance Rate
                        </span>
                        <span className="font-semibold text-accent">89%</span>
                      </div>
                      <Progress value={89} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Time to Resolution</span>
                        <span className="font-semibold text-green-600">
                          -23%
                        </span>
                      </div>
                      <Progress value={77} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Long-term Compliance</span>
                        <span className="font-semibold text-primary">96%</span>
                      </div>
                      <Progress value={96} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Mediation;
