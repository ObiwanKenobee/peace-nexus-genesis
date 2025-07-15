import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  Bot,
  Brain,
  Zap,
  Network,
  Globe,
  Users,
  MessageSquare,
  Shield,
  Activity,
  BarChart3,
  Settings,
  Database,
  Cpu,
  Router,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Languages,
  Mic,
  FileText,
  Link,
  LogOut,
} from "lucide-react";

const aiMetrics = [
  { title: "Active Negotiations", value: "47", change: "+12", trend: "up" },
  {
    title: "Bias Detection Rate",
    value: "98.7%",
    change: "+2.1%",
    trend: "up",
  },
  {
    title: "Cross-Cultural Sessions",
    value: "234",
    change: "+89",
    trend: "up",
  },
  { title: "Peace Interventions", value: "156", change: "+34", trend: "up" },
];

const activeNegotiations = [
  {
    id: 1,
    title: "Water Rights Dispute - Nile Basin",
    parties: ["Egypt", "Ethiopia", "Sudan"],
    stage: "Mediation",
    aiConfidence: 87,
    biasScore: 12,
    progress: 65,
    duration: "18 days",
    nextSession: "2024-01-22 14:00 UTC",
    culturalContext: "High",
    riskLevel: "Medium",
    mediationChain: [
      "Historical precedent analysis",
      "Resource distribution modeling",
      "Cultural sensitivity mapping",
    ],
  },
  {
    id: 2,
    title: "Land Reform Negotiations - Colombia",
    parties: ["Government", "FARC-EP", "Landowner Coalition"],
    stage: "Fact-Finding",
    aiConfidence: 73,
    biasScore: 8,
    progress: 42,
    duration: "31 days",
    nextSession: "2024-01-21 16:30 UTC",
    culturalContext: "Critical",
    riskLevel: "High",
    mediationChain: [
      "Victim testimony analysis",
      "Economic impact assessment",
      "Reconciliation pathway mapping",
    ],
  },
  {
    id: 3,
    title: "Trade Route Security - Red Sea",
    parties: ["Saudi Arabia", "Yemen", "International Shipping"],
    stage: "Solution Design",
    aiConfidence: 91,
    biasScore: 5,
    progress: 78,
    duration: "12 days",
    nextSession: "2024-01-20 10:00 UTC",
    culturalContext: "Moderate",
    riskLevel: "Low",
    mediationChain: [
      "Maritime law analysis",
      "Economic benefit modeling",
      "Security protocol design",
    ],
  },
];

const federatedNetwork = [
  {
    node: "African Peace AI Network",
    location: "Addis Ababa, Ethiopia",
    languages: ["Amharic", "Swahili", "Arabic", "English"],
    specialization: "Tribal Conflict Resolution",
    status: "Active",
    uptime: 99.7,
    negotiations: 23,
    culturalModels: 45,
  },
  {
    node: "Middle East Mediation Hub",
    location: "Dubai, UAE",
    languages: ["Arabic", "Hebrew", "Persian", "Kurdish"],
    specialization: "Religious Dialogue",
    status: "Active",
    uptime: 98.9,
    negotiations: 18,
    culturalModels: 38,
  },
  {
    node: "Latin America Reconciliation AI",
    location: "Bogotá, Colombia",
    languages: ["Spanish", "Portuguese", "Quechua", "Guaraní"],
    specialization: "Post-Conflict Transitional Justice",
    status: "Maintenance",
    uptime: 97.2,
    negotiations: 31,
    culturalModels: 52,
  },
  {
    node: "Southeast Asia Dialogue Network",
    location: "Singapore",
    languages: ["Mandarin", "Malay", "Thai", "Vietnamese"],
    specialization: "Maritime Disputes",
    status: "Active",
    uptime: 99.4,
    negotiations: 15,
    culturalModels: 29,
  },
];

const biasDetection = [
  {
    session: "Water Rights Mediation #47",
    timestamp: "2024-01-21 09:15:32",
    biasType: "Cultural Privilege",
    severity: "Medium",
    description: "Detected Western-centric water management assumptions",
    intervention: "Introduced indigenous water stewardship perspectives",
    resolved: true,
    participantFeedback: 4.2,
  },
  {
    session: "Land Reform Discussion #23",
    timestamp: "2024-01-21 07:42:18",
    biasType: "Economic Bias",
    severity: "High",
    description:
      "Overemphasis on market-based solutions ignoring communal ownership",
    intervention: "Balanced with traditional land tenure models",
    resolved: true,
    participantFeedback: 4.7,
  },
  {
    session: "Trade Security Planning #12",
    timestamp: "2024-01-20 22:30:45",
    biasType: "Gender Exclusion",
    severity: "Low",
    description: "Security discussions lacking women's perspectives",
    intervention: "Highlighted women's roles in maritime communities",
    resolved: true,
    participantFeedback: 4.0,
  },
];

const diplomacyChains = [
  {
    id: 1,
    name: "Historical Precedent Analysis Chain",
    description: "Analyzes 500+ years of successful peace agreements",
    accuracy: 94.3,
    languages: 23,
    culturalContexts: 67,
    lastUpdate: "2 hours ago",
    memoryBlocks: 2340,
    status: "Optimized",
  },
  {
    id: 2,
    name: "Cultural Sensitivity Mapping Chain",
    description: "Real-time cultural context and communication adaptation",
    accuracy: 91.7,
    languages: 45,
    culturalContexts: 123,
    lastUpdate: "15 minutes ago",
    memoryBlocks: 3567,
    status: "Learning",
  },
  {
    id: 3,
    name: "Bias Detection & Mitigation Chain",
    description:
      "Identifies and corrects cultural, gender, and economic biases",
    accuracy: 96.8,
    languages: 34,
    culturalContexts: 89,
    lastUpdate: "5 minutes ago",
    memoryBlocks: 1890,
    status: "Active",
  },
  {
    id: 4,
    name: "Reconciliation Pathway Generation Chain",
    description: "Generates culturally-appropriate reconciliation strategies",
    accuracy: 88.9,
    languages: 28,
    culturalContexts: 78,
    lastUpdate: "1 hour ago",
    memoryBlocks: 2456,
    status: "Training",
  },
];

const realTimeAnalytics = [
  {
    metric: "Global Conflict Sentiment",
    value: "Improving",
    trend: "+12%",
    description: "AI-analyzed social media, news, and communication patterns",
    regions: ["West Africa", "Central Asia", "Southeast Europe"],
    confidence: 89,
  },
  {
    metric: "Mediation Success Probability",
    value: "High",
    trend: "+8%",
    description: "Predicted success rates for ongoing negotiations",
    regions: ["Nile Basin", "Kashmir", "Caucasus"],
    confidence: 94,
  },
  {
    metric: "Cultural Bridge Effectiveness",
    value: "Strong",
    trend: "+15%",
    description: "Cross-cultural understanding and communication quality",
    regions: ["Middle East", "Balkans", "Horn of Africa"],
    confidence: 92,
  },
];

const llmTraining = [
  {
    model: "PeaceGPT-Diplomat v3.2",
    status: "Production",
    trainingData: "2.3M diplomatic documents",
    languages: 67,
    specialization: "International Mediation",
    accuracy: 96.4,
    lastTraining: "1 week ago",
    nextUpdate: "2 weeks",
  },
  {
    model: "CulturalBridge-LLM v2.8",
    status: "Fine-tuning",
    trainingData: "890K cultural context examples",
    languages: 45,
    specialization: "Cross-Cultural Communication",
    accuracy: 93.7,
    lastTraining: "3 days ago",
    nextUpdate: "1 week",
  },
  {
    model: "BiasGuard-AI v1.9",
    status: "Testing",
    trainingData: "567K bias detection cases",
    languages: 34,
    specialization: "Bias Detection & Mitigation",
    accuracy: 98.1,
    lastTraining: "1 day ago",
    nextUpdate: "3 days",
  },
];

export default function AIPeaceAgentDashboard() {
  const { user, earnPeaceCoin, logout } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleLogout = () => {
    logout();
  };

  const handleStartNegotiation = () => {
    earnPeaceCoin(300, "Initiated AI-mediated peace negotiation");
  };

  const handleBiasDetection = () => {
    earnPeaceCoin(200, "Detected and mitigated cultural bias in dialogue");
  };

  const handleTrainModel = () => {
    earnPeaceCoin(250, "Updated AI model with new diplomatic patterns");
  };

  const handleNetworkSync = () => {
    earnPeaceCoin(150, "Synchronized with federated peace AI network");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              AI Peace Agent Command Center
            </h1>
            <p className="text-gray-600">
              Augmenting human peace efforts through AI • {user?.name} •{" "}
              {user?.organization}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800">
              Level {user?.level} AI Specialist
            </Badge>
            <div className="text-right">
              <div className="text-sm font-medium">
                {user?.peaceCoinBalance} PeaceCoins
              </div>
              <div className="text-xs text-gray-500">
                AI Network Score: {user?.contributionScore}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key AI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {aiMetrics.map((metric, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p
                      className={`text-sm flex items-center ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {metric.change}
                    </p>
                  </div>
                  <Bot className="w-8 h-8 text-cyan-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="negotiations">AI Negotiations</TabsTrigger>
            <TabsTrigger value="federated-network">
              Federated Network
            </TabsTrigger>
            <TabsTrigger value="bias-detection">Bias Detection</TabsTrigger>
            <TabsTrigger value="diplomacy-chains">Diplomacy Chains</TabsTrigger>
            <TabsTrigger value="model-training">Model Training</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Real-Time Analytics */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Real-Time Peace Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {realTimeAnalytics.map((analytics, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium">
                              {analytics.metric}
                            </div>
                            <div className="text-sm text-gray-600">
                              {analytics.description}
                            </div>
                          </div>
                          <Badge variant="outline">{analytics.value}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Trend: {analytics.trend}</div>
                          <div>Confidence: {analytics.confidence}%</div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Active Regions: {analytics.regions.join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active AI Mediations */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Active AI Mediations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeNegotiations.slice(0, 2).map((negotiation) => (
                      <div
                        key={negotiation.id}
                        className="p-3 border rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium text-sm">
                              {negotiation.title}
                            </div>
                            <div className="text-xs text-gray-600">
                              {negotiation.parties.join(" • ")}
                            </div>
                          </div>
                          <Badge variant="outline">{negotiation.stage}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                          <div>AI Confidence: {negotiation.aiConfidence}%</div>
                          <div>Bias Score: {negotiation.biasScore}/100</div>
                          <div>Duration: {negotiation.duration}</div>
                        </div>
                        <Progress
                          value={negotiation.progress}
                          className="h-2"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {negotiation.progress}% complete • Next:{" "}
                          {negotiation.nextSession}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Network Status */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="w-5 h-5" />
                  <span>Federated AI Network Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {federatedNetwork.map((node, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-sm">{node.node}</div>
                        <Badge
                          variant="outline"
                          className={
                            node.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {node.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {node.location}
                      </div>
                      <div className="text-xs">
                        <div>Uptime: {node.uptime}%</div>
                        <div>Active: {node.negotiations} negotiations</div>
                        <div>Languages: {node.languages.length}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick AI Actions */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>AI Peace Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                    onClick={handleStartNegotiation}
                  >
                    <Bot className="w-6 h-6" />
                    <span>Start AI Negotiation</span>
                    <span className="text-xs text-cyan-100">
                      300 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleBiasDetection}
                  >
                    <Shield className="w-6 h-6" />
                    <span>Bias Detection</span>
                    <span className="text-xs text-gray-500">
                      200 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleTrainModel}
                  >
                    <Brain className="w-6 h-6" />
                    <span>Train Model</span>
                    <span className="text-xs text-gray-500">
                      250 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleNetworkSync}
                  >
                    <Network className="w-6 h-6" />
                    <span>Network Sync</span>
                    <span className="text-xs text-gray-500">
                      150 PeaceCoins
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Negotiations Tab */}
          <TabsContent value="negotiations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                AI-Mediated Peace Negotiations
              </h2>
              <Button onClick={handleStartNegotiation}>
                <Bot className="w-4 h-4 mr-2" />
                Start New Negotiation
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {activeNegotiations.map((negotiation) => (
                <Card
                  key={negotiation.id}
                  className="bg-white/80 backdrop-blur"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {negotiation.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Parties: {negotiation.parties.join(" • ")}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {negotiation.duration} active
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {negotiation.parties.length} parties
                          </span>
                          <span className="flex items-center">
                            <Brain className="w-4 h-4 mr-1" />
                            {negotiation.aiConfidence}% AI confidence
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          negotiation.stage === "Mediation"
                            ? "bg-blue-100 text-blue-800"
                            : negotiation.stage === "Solution Design"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {negotiation.stage}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Progress</div>
                        <Progress
                          value={negotiation.progress}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {negotiation.progress}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Bias Score</div>
                        <Progress
                          value={100 - negotiation.biasScore}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {negotiation.biasScore}/100 (Lower is better)
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Cultural Context
                        </div>
                        <Badge variant="outline" className="mt-1">
                          {negotiation.culturalContext}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          Risk: {negotiation.riskLevel}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium mb-2">
                        AI Mediation Chain Process
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {negotiation.mediationChain.map((step, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {index + 1}. {step}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium">Next Session</div>
                      <div className="text-sm text-gray-600">
                        {negotiation.nextSession}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Monitor Session
                      </Button>
                      <Button variant="outline" size="sm">
                        <Shield className="w-4 h-4 mr-2" />
                        Bias Check
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Federated Network Tab */}
          <TabsContent value="federated-network" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Federated AI Peace Network
              </h2>
              <Button onClick={handleNetworkSync}>
                <Network className="w-4 h-4 mr-2" />
                Sync Network
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {federatedNetwork.map((node, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{node.node}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {node.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          Specialization: {node.specialization}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          node.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {node.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">
                          Network Uptime
                        </div>
                        <Progress value={node.uptime} className="h-2 mt-1" />
                        <div className="text-xs text-gray-500 mt-1">
                          {node.uptime}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Active Negotiations
                        </div>
                        <div className="text-lg font-bold text-cyan-600">
                          {node.negotiations}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">
                          Languages Supported
                        </div>
                        <div className="text-lg font-bold">
                          {node.languages.length}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Cultural Models
                        </div>
                        <div className="text-lg font-bold">
                          {node.culturalModels}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">
                        Supported Languages
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {node.languages.map((language, langIndex) => (
                          <Badge
                            key={langIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Link className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Monitor
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bias Detection Tab */}
          <TabsContent value="bias-detection" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Real-Time Bias Detection & Mitigation
              </h2>
              <Button onClick={handleBiasDetection}>
                <Shield className="w-4 h-4 mr-2" />
                Run Bias Scan
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {biasDetection.map((detection, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {detection.session}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {detection.timestamp}
                        </p>
                        <p className="text-sm">
                          <strong>Bias Type:</strong> {detection.biasType}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            detection.severity === "High"
                              ? "bg-red-100 text-red-800"
                              : detection.severity === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {detection.severity} Severity
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          Feedback: {detection.participantFeedback}/5.0
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-lg mb-3">
                      <div className="text-sm font-medium">Detected Issue</div>
                      <div className="text-sm text-gray-600">
                        {detection.description}
                      </div>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium">AI Intervention</div>
                      <div className="text-sm text-gray-600">
                        {detection.intervention}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {detection.resolved ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                        )}
                        <span className="text-sm">
                          {detection.resolved ? "Resolved" : "In Progress"}
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Diplomacy Chains Tab */}
          <TabsContent value="diplomacy-chains" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Memory-Linked Diplomacy Chains
              </h2>
              <Button>
                <Brain className="w-4 h-4 mr-2" />
                Create New Chain
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diplomacyChains.map((chain) => (
                <Card key={chain.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{chain.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {chain.description}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          chain.status === "Optimized"
                            ? "bg-green-100 text-green-800"
                            : chain.status === "Active"
                              ? "bg-blue-100 text-blue-800"
                              : chain.status === "Learning"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-purple-100 text-purple-800"
                        }
                      >
                        {chain.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Accuracy</div>
                        <Progress value={chain.accuracy} className="h-2 mt-1" />
                        <div className="text-xs text-gray-500 mt-1">
                          {chain.accuracy}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Memory Blocks
                        </div>
                        <div className="text-lg font-bold text-cyan-600">
                          {chain.memoryBlocks.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Languages</div>
                        <div className="text-lg font-bold">
                          {chain.languages}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Cultural Contexts
                        </div>
                        <div className="text-lg font-bold">
                          {chain.culturalContexts}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                      Last updated: {chain.lastUpdate}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4 mr-2" />
                        Execute
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Model Training Tab */}
          <TabsContent value="model-training" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Custom LLM Training for Peace
              </h2>
              <Button onClick={handleTrainModel}>
                <Brain className="w-4 h-4 mr-2" />
                Start Training
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {llmTraining.map((model, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{model.model}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Specialization: {model.specialization}
                        </p>
                        <p className="text-sm text-gray-600">
                          Training Data: {model.trainingData}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          model.status === "Production"
                            ? "bg-green-100 text-green-800"
                            : model.status === "Fine-tuning"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {model.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">
                          Model Accuracy
                        </div>
                        <Progress value={model.accuracy} className="h-2 mt-1" />
                        <div className="text-xs text-gray-500 mt-1">
                          {model.accuracy}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Languages Supported
                        </div>
                        <div className="text-lg font-bold text-cyan-600">
                          {model.languages}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Last Training
                        </div>
                        <div className="text-sm">{model.lastTraining}</div>
                        <div className="text-xs text-gray-500">
                          Next: {model.nextUpdate}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleTrainModel}>
                        <Brain className="w-4 h-4 mr-2" />
                        Update Model
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Performance
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Weights
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
