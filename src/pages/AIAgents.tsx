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
  Languages,
  Shield,
  Target,
  Zap,
  Bot,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Heart,
  Scale,
  Mic,
  Volume2,
  FileText,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Lightbulb,
  Search,
  Headphones,
  Camera,
  Monitor,
  Database,
  Network,
  Cpu,
  BarChart,
  Activity,
  Wifi,
} from "lucide-react";

const AIAgents = () => {
  const aiAgents = [
    {
      id: 1,
      name: "PeaceBot Alpha-7",
      specialization: "Conflict Mediation",
      description:
        "Advanced AI mediator trained on 10,000+ successful peace negotiations",
      status: "Active",
      successRate: 89,
      languages: 47,
      avgResponseTime: "0.3s",
      sessionsCompleted: 2847,
      trainingData:
        "Historical treaties, mediation transcripts, cultural wisdom",
      capabilities: [
        "Sentiment Analysis",
        "Cultural Context",
        "Bias Detection",
        "Solution Generation",
      ],
      currentLoad: 23,
      maxCapacity: 50,
      lastUpdate: "2024-01-15",
    },
    {
      id: 2,
      name: "TranslatePeace Beta-3",
      specialization: "Real-time Translation",
      description:
        "Multi-lingual AI providing nuanced translation for peace communications",
      status: "Active",
      successRate: 96,
      languages: 127,
      avgResponseTime: "0.1s",
      sessionsCompleted: 15634,
      trainingData: "Diplomatic documents, cultural texts, peace literature",
      capabilities: [
        "Context-Aware Translation",
        "Cultural Nuance",
        "Emotion Preservation",
        "Dialect Recognition",
      ],
      currentLoad: 67,
      maxCapacity: 100,
      lastUpdate: "2024-01-14",
    },
    {
      id: 3,
      name: "ConflictSense Gamma-2",
      specialization: "Early Warning System",
      description:
        "Predictive AI monitoring global tensions and conflict signals",
      status: "Active",
      successRate: 94,
      languages: 23,
      avgResponseTime: "Real-time",
      sessionsCompleted: 8923,
      trainingData:
        "News feeds, social media, satellite data, economic indicators",
      capabilities: [
        "Pattern Recognition",
        "Risk Assessment",
        "Early Warning",
        "Escalation Prediction",
      ],
      currentLoad: 45,
      maxCapacity: 75,
      lastUpdate: "2024-01-15",
    },
    {
      id: 4,
      name: "CulturalBridge Delta-1",
      specialization: "Cultural Understanding",
      description:
        "AI expert in cross-cultural communication and indigenous wisdom",
      status: "Active",
      successRate: 91,
      languages: 89,
      avgResponseTime: "0.5s",
      sessionsCompleted: 4521,
      trainingData:
        "Traditional knowledge, cultural practices, indigenous governance",
      capabilities: [
        "Cultural Sensitivity",
        "Traditional Wisdom",
        "Protocol Guidance",
        "Respectful Communication",
      ],
      currentLoad: 12,
      maxCapacity: 30,
      lastUpdate: "2024-01-13",
    },
    {
      id: 5,
      name: "TraumaSupport Epsilon-5",
      specialization: "Trauma-Informed Care",
      description:
        "Specialized AI for supporting trauma survivors in peace processes",
      status: "Active",
      successRate: 97,
      languages: 34,
      avgResponseTime: "0.4s",
      sessionsCompleted: 1876,
      trainingData:
        "Trauma therapy research, healing practices, survivor stories",
      capabilities: [
        "Trauma Detection",
        "Safe Space Creation",
        "Healing Support",
        "Crisis Intervention",
      ],
      currentLoad: 8,
      maxCapacity: 25,
      lastUpdate: "2024-01-12",
    },
    {
      id: 6,
      name: "ResourceOptimizer Zeta-4",
      specialization: "Resource Allocation",
      description:
        "AI coordinator for efficient and fair resource distribution",
      status: "Active",
      successRate: 88,
      languages: 15,
      avgResponseTime: "0.2s",
      sessionsCompleted: 6742,
      trainingData: "Supply chain data, logistics models, equity frameworks",
      capabilities: [
        "Optimization Algorithms",
        "Fairness Metrics",
        "Logistics Coordination",
        "Scarcity Management",
      ],
      currentLoad: 34,
      maxCapacity: 60,
      lastUpdate: "2024-01-14",
    },
  ];

  const aiMetrics = [
    { metric: "Active AI Agents", value: "6", trend: "Specialized systems" },
    { metric: "Average Success Rate", value: "92.5%", trend: "+2.1%" },
    { metric: "Languages Supported", value: "127", trend: "Real-time" },
    { metric: "Sessions This Month", value: "38.6K", trend: "+15%" },
  ];

  const translationServices = [
    {
      service: "Diplomatic Translation",
      description: "High-stakes translation for official peace negotiations",
      accuracy: 98.7,
      avgLatency: "0.15s",
      languages: 89,
      features: [
        "Formal Register",
        "Cultural Protocol",
        "Legal Precision",
        "Confidential",
      ],
    },
    {
      service: "Community Mediation",
      description: "Translation for local community conflict resolution",
      accuracy: 96.2,
      avgLatency: "0.12s",
      languages: 127,
      features: [
        "Colloquial Speech",
        "Regional Dialects",
        "Emotional Nuance",
        "Cultural Context",
      ],
    },
    {
      service: "Educational Content",
      description: "Translation of peace education materials and curricula",
      accuracy: 95.8,
      avgLatency: "0.08s",
      languages: 105,
      features: [
        "Pedagogical Adaptation",
        "Age-Appropriate",
        "Cultural Sensitivity",
        "Interactive",
      ],
    },
    {
      service: "Emergency Response",
      description: "Rapid translation for crisis and emergency situations",
      accuracy: 94.1,
      avgLatency: "0.05s",
      languages: 67,
      features: [
        "Crisis Vocabulary",
        "Urgent Priority",
        "Clear Instructions",
        "Life-Critical",
      ],
    },
  ];

  const conflictSignals = [
    {
      region: "Eastern Mediterranean",
      threatLevel: "Medium",
      confidence: 76,
      signals: [
        "Economic indicators",
        "Social media sentiment",
        "Resource scarcity",
      ],
      trend: "Stable",
      lastUpdate: "2 hours ago",
      recommendations: [
        "Increase diplomatic engagement",
        "Monitor water resources",
        "Deploy cultural mediators",
      ],
    },
    {
      region: "West Africa",
      threatLevel: "Low",
      confidence: 23,
      signals: ["Seasonal migration patterns", "Drought conditions"],
      trend: "Improving",
      lastUpdate: "4 hours ago",
      recommendations: ["Continue monitoring", "Support agriculture programs"],
    },
    {
      region: "South Asia",
      threatLevel: "High",
      confidence: 89,
      signals: ["Border tensions", "Political rhetoric", "Military movements"],
      trend: "Escalating",
      lastUpdate: "30 minutes ago",
      recommendations: [
        "Immediate diplomatic intervention",
        "Activate peace mediators",
        "Deploy AI mediator Alpha-7",
      ],
    },
  ];

  const aiTraining = [
    {
      model: "Conflict Prediction Model",
      version: "v3.2.1",
      trainingData: "2.4M conflict records",
      lastTrained: "Jan 10, 2024",
      accuracy: 94.2,
      status: "Production",
      improvements: "+2.3% accuracy from v3.2.0",
    },
    {
      model: "Cultural Sensitivity Engine",
      version: "v2.1.5",
      trainingData: "850K cultural documents",
      lastTrained: "Jan 8, 2024",
      accuracy: 91.7,
      status: "Production",
      improvements: "Added 12 new cultural frameworks",
    },
    {
      model: "Translation Quality Assessor",
      version: "v4.0.2",
      trainingData: "15M translation pairs",
      lastTrained: "Jan 12, 2024",
      accuracy: 96.8,
      status: "Production",
      improvements: "Enhanced emotion preservation",
    },
    {
      model: "Bias Detection Network",
      version: "v1.9.3",
      trainingData: "3.7M bias examples",
      lastTrained: "Jan 9, 2024",
      accuracy: 88.9,
      status: "Testing",
      improvements: "Expanded intersectional bias detection",
    },
  ];

  const usageDashboard = [
    {
      agent: "PeaceBot Alpha-7",
      requests: 1247,
      successfulSessions: 1109,
      avgSessionLength: "47 min",
      peaceCoinsGenerated: 23450,
      userSatisfaction: 4.8,
    },
    {
      agent: "TranslatePeace Beta-3",
      requests: 8934,
      successfulSessions: 8567,
      avgSessionLength: "12 min",
      peaceCoinsGenerated: 15670,
      userSatisfaction: 4.9,
    },
    {
      agent: "ConflictSense Gamma-2",
      requests: 2845,
      successfulSessions: 2674,
      avgSessionLength: "Continuous",
      peaceCoinsGenerated: 8920,
      userSatisfaction: 4.6,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Peace Agents</h1>
          <p className="text-muted-foreground">
            Intelligent AI systems for conflict resolution, translation, early
            warning, and peace-building support
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {aiMetrics.map((metric, index) => (
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

        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="translation">Translation</TabsTrigger>
            <TabsTrigger value="conflict">Conflict Monitoring</TabsTrigger>
            <TabsTrigger value="training">AI Training</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiAgents.map((agent) => (
                <Card key={agent.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Brain className="h-5 w-5 text-primary" />
                          {agent.name}
                        </CardTitle>
                        <CardDescription>
                          {agent.specialization}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          agent.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {agent.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {agent.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Success Rate:
                          </span>
                          <div className="font-medium text-primary">
                            {agent.successRate}%
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Languages:
                          </span>
                          <div className="font-medium">{agent.languages}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Response Time:
                          </span>
                          <div className="font-medium">
                            {agent.avgResponseTime}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Sessions:
                          </span>
                          <div className="font-medium">
                            {agent.sessionsCompleted.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm">Current Load</span>
                          <span className="text-sm font-medium">
                            {agent.currentLoad}/{agent.maxCapacity}
                          </span>
                        </div>
                        <Progress
                          value={(agent.currentLoad / agent.maxCapacity) * 100}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Capabilities:
                        </Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {agent.capabilities.map((capability, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Interact
                        </Button>
                        <Button variant="outline" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <BarChart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="translation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  AI Translation Services
                </CardTitle>
                <CardDescription>
                  Specialized translation AI for different peace-building
                  contexts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {translationServices.map((service, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <h3 className="font-medium mb-2">{service.service}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">
                            Accuracy:
                          </span>
                          <div className="font-medium text-primary">
                            {service.accuracy}%
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Latency:
                          </span>
                          <div className="font-medium">
                            {service.avgLatency}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">
                            Languages:
                          </span>
                          <div className="font-medium">
                            {service.languages} supported
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label className="text-sm font-medium">Features:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {service.features.map((feature, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Play className="h-4 w-4 mr-2" />
                        Test Translation
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5" />
                    Real-time Translation Test
                  </CardTitle>
                  <CardDescription>
                    Test AI translation capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="source-lang">From Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="sw">Swahili</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="target-lang">To Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="ar">Arabic</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="hi">Hindi</SelectItem>
                          <SelectItem value="sw">Swahili</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source-text">Text to Translate</Label>
                    <Textarea
                      id="source-text"
                      placeholder="Enter text for translation..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Languages className="h-4 w-4 mr-2" />
                      Translate
                    </Button>
                    <Button variant="outline" size="icon">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-3 rounded-lg bg-secondary/30">
                    <Label className="text-sm font-medium">
                      Translation Result:
                    </Label>
                    <div className="mt-2 text-sm">
                      Translation will appear here...
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Translation Statistics
                  </CardTitle>
                  <CardDescription>
                    Recent translation performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Overall Accuracy</span>
                        <span className="font-semibold text-primary">
                          96.2%
                        </span>
                      </div>
                      <Progress value={96.2} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Cultural Sensitivity</span>
                        <span className="font-semibold text-accent">94.7%</span>
                      </div>
                      <Progress value={94.7} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Emotion Preservation</span>
                        <span className="font-semibold text-green-600">
                          91.3%
                        </span>
                      </div>
                      <Progress value={91.3} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          127
                        </div>
                        <div className="text-muted-foreground">Languages</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">
                          0.12s
                        </div>
                        <div className="text-muted-foreground">
                          Avg Response
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conflict" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Global Conflict Monitoring
                </CardTitle>
                <CardDescription>
                  AI-powered early warning system for potential conflicts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conflictSignals.map((signal, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{signal.region}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              signal.threatLevel === "High"
                                ? "destructive"
                                : signal.threatLevel === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {signal.threatLevel} Threat
                          </Badge>
                          <Badge variant="outline">
                            {signal.confidence}% confidence
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Signals Detected:
                          </Label>
                          <div className="mt-1 space-y-1">
                            {signal.signals.map((sig, idx) => (
                              <div
                                key={idx}
                                className="text-sm text-muted-foreground"
                              >
                                • {sig}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Trend:</Label>
                          <div
                            className={`text-sm font-medium mt-1 ${
                              signal.trend === "Escalating"
                                ? "text-red-600"
                                : signal.trend === "Stable"
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {signal.trend}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Updated: {signal.lastUpdate}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">
                            AI Recommendations:
                          </Label>
                          <div className="mt-1 space-y-1">
                            {signal.recommendations.map((rec, idx) => (
                              <div
                                key={idx}
                                className="text-sm text-muted-foreground"
                              >
                                • {rec}
                              </div>
                            ))}
                          </div>
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
                    <Target className="h-5 w-5" />
                    Prediction Accuracy
                  </CardTitle>
                  <CardDescription>
                    AI conflict prediction performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">7-Day Prediction</span>
                        <span className="font-semibold text-primary">
                          94.2%
                        </span>
                      </div>
                      <Progress value={94.2} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">30-Day Prediction</span>
                        <span className="font-semibold text-accent">87.6%</span>
                      </div>
                      <Progress value={87.6} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">90-Day Prediction</span>
                        <span className="font-semibold text-orange-600">
                          72.1%
                        </span>
                      </div>
                      <Progress value={72.1} />
                    </div>

                    <div className="text-sm space-y-1 pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          False Positives:
                        </span>
                        <span className="font-medium">3.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Conflicts Prevented:
                        </span>
                        <span className="font-medium text-green-600">847</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Monitoring Coverage
                  </CardTitle>
                  <CardDescription>
                    Global monitoring network status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">News Sources</div>
                        <div className="text-sm text-muted-foreground">
                          15,247 sources monitored
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Social Media</div>
                        <div className="text-sm text-muted-foreground">
                          Real-time sentiment analysis
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Economic Indicators</div>
                        <div className="text-sm text-muted-foreground">
                          67 countries tracked
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Satellite Data</div>
                        <div className="text-sm text-muted-foreground">
                          Environmental changes
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  AI Model Training Status
                </CardTitle>
                <CardDescription>
                  Continuous improvement of AI peace-building capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiTraining.map((model, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{model.model}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              model.status === "Production"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {model.status}
                          </Badge>
                          <Badge variant="outline">{model.version}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">
                            Training Data:
                          </span>
                          <div className="font-medium">
                            {model.trainingData}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Last Trained:
                          </span>
                          <div className="font-medium">{model.lastTrained}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Accuracy:
                          </span>
                          <div className="font-medium text-primary">
                            {model.accuracy}%
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Improvements:
                          </span>
                          <div className="font-medium text-accent">
                            {model.improvements}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          View Training Logs
                        </Button>
                        <Button variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline">
                          <BarChart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  AI Usage Analytics
                </CardTitle>
                <CardDescription>
                  Performance metrics and usage statistics for AI agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {usageDashboard.map((usage, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <h3 className="font-medium mb-3">{usage.agent}</h3>

                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Requests:
                          </span>
                          <div className="font-medium">
                            {usage.requests.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Successful:
                          </span>
                          <div className="font-medium text-green-600">
                            {usage.successfulSessions.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Avg Session:
                          </span>
                          <div className="font-medium">
                            {usage.avgSessionLength}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            PC Generated:
                          </span>
                          <div className="font-medium text-primary">
                            {usage.peaceCoinsGenerated.toLocaleString()} PC
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Satisfaction:
                          </span>
                          <div className="font-medium text-accent">
                            {usage.userSatisfaction}/5.0
                          </div>
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
                    <TrendingUp className="h-5 w-5" />
                    Performance Trends
                  </CardTitle>
                  <CardDescription>
                    AI agent performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Success Rate Trend</span>
                        <span className="font-semibold text-green-600">
                          +2.3%
                        </span>
                      </div>
                      <Progress value={92} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Response Time</span>
                        <span className="font-semibold text-primary">
                          -15ms
                        </span>
                      </div>
                      <Progress value={85} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">User Satisfaction</span>
                        <span className="font-semibold text-accent">+0.2</span>
                      </div>
                      <Progress value={96} />
                    </div>

                    <div className="text-sm space-y-1 pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          This Month:
                        </span>
                        <span className="font-medium">38.6K sessions</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Growth:</span>
                        <span className="font-medium text-green-600">+15%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Impact Metrics
                  </CardTitle>
                  <CardDescription>
                    Real-world impact of AI peace agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 rounded-lg bg-primary/10">
                      <div className="text-2xl font-bold text-primary">847</div>
                      <div className="text-sm text-muted-foreground">
                        Conflicts Prevented
                      </div>
                    </div>

                    <div className="text-center p-4 rounded-lg bg-accent/10">
                      <div className="text-2xl font-bold text-accent">2.4M</div>
                      <div className="text-sm text-muted-foreground">
                        People Helped
                      </div>
                    </div>

                    <div className="text-center p-4 rounded-lg bg-green-100">
                      <div className="text-2xl font-bold text-green-600">
                        127
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Languages Bridged
                      </div>
                    </div>

                    <div className="text-center p-4 rounded-lg bg-purple-100">
                      <div className="text-2xl font-bold text-purple-600">
                        94.2%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Peace Success Rate
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    AI Agent Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure AI agent behavior and parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="response-speed">
                      Response Speed Priority
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="accuracy">Accuracy First</SelectItem>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="speed">Speed First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cultural-sensitivity">
                      Cultural Sensitivity Level
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maximum">
                          Maximum Sensitivity
                        </SelectItem>
                        <SelectItem value="high">High Sensitivity</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bias-detection">
                      Bias Detection Threshold
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strict">Strict (95%)</SelectItem>
                        <SelectItem value="normal">Normal (85%)</SelectItem>
                        <SelectItem value="lenient">Lenient (75%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Auto-Escalation Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="auto-escalate" />
                        <Label htmlFor="auto-escalate" className="text-sm">
                          Enable auto-escalation to human mediators
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="crisis-alert" />
                        <Label htmlFor="crisis-alert" className="text-sm">
                          Send crisis alerts for high-risk situations
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Save Configuration</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Safety & Ethics Controls
                  </CardTitle>
                  <CardDescription>
                    Ethical guardrails and safety measures
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">
                        No-Surveillance Guarantee
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI cannot be used for mass surveillance
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Trauma Protection</div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Personal stories are anonymized and protected
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Anti-Weaponization</div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Cannot be used for manipulation or escalation
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">Cultural Consent</div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Respects indigenous and local customs
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Review Ethics Framework
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIAgents;
