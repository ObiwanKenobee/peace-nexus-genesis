import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  MetricCard,
  TrendChart,
  ConflictHeatmap,
  ProgressTracker,
  ComparisonChart,
} from "@/components/ui/data-visualization";
import {
  Shield,
  MapPin,
  Users,
  FileText,
  BarChart3,
  Globe,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Gavel,
  Edit,
  Eye,
  ArrowRight,
  Plus,
  LogOut,
  Settings,
  Download,
  Share2,
  Save,
  Play,
  Pause,
  RefreshCw,
  Database,
  Network,
  Scale,
  Target,
  Zap,
  Brain,
  GitCompare,
  Building2,
  Flag,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Lock,
  Unlock,
  MessageSquare,
  PenTool,
  Layers,
  History,
  ExternalLink,
  Bell,
  Briefcase,
  Award,
  Crown,
  Handshake,
} from "lucide-react";

// Enhanced data structures for enterprise features
const globalConflictData = [
  {
    region: "South Sudan",
    riskLevel: "High" as const,
    status: "Active Mediation",
    lastUpdate: "2 hours ago",
    incidents: 15,
    resolved: 12,
    coordinates: [31.3069, 7.8627] as [number, number],
    agencies: ["UN", "IGAD", "AU"],
    treatyStatus: "Framework Agreement Signed",
    smartContractActive: true,
  },
  {
    region: "Yemen",
    riskLevel: "Critical" as const,
    status: "Ceasefire Negotiations",
    lastUpdate: "45 minutes ago",
    incidents: 42,
    resolved: 18,
    coordinates: [48.5164, 15.5527] as [number, number],
    agencies: ["UN", "GCC", "EU"],
    treatyStatus: "Under Negotiation",
    smartContractActive: false,
  },
  {
    region: "Myanmar",
    riskLevel: "Medium" as const,
    status: "Monitoring",
    lastUpdate: "1 day ago",
    incidents: 8,
    resolved: 6,
    coordinates: [95.9563, 21.9162] as [number, number],
    agencies: ["UN", "ASEAN"],
    treatyStatus: "Draft Phase",
    smartContractActive: false,
  },
  {
    region: "Ukraine-Russia Border",
    riskLevel: "High" as const,
    status: "Peace Framework Development",
    lastUpdate: "30 minutes ago",
    incidents: 28,
    resolved: 15,
    coordinates: [32.0617, 49.2331] as [number, number],
    agencies: ["UN", "EU", "NATO", "OSCE"],
    treatyStatus: "Multi-party Negotiations",
    smartContractActive: true,
  },
];

const treatyTemplates = [
  {
    id: "ceasefire-basic",
    name: "Basic Ceasefire Agreement",
    category: "Ceasefire",
    description: "Standard template for immediate cessation of hostilities",
    sections: [
      "Parties",
      "Definitions",
      "Ceasefire Terms",
      "Monitoring",
      "Violations",
    ],
    estimatedTime: "2-4 hours",
    complexity: "Low",
    aiAssisted: true,
  },
  {
    id: "border-demarcation",
    name: "Border Demarcation Treaty",
    category: "Territorial",
    description: "Comprehensive framework for territorial dispute resolution",
    sections: [
      "Territory",
      "Demarcation",
      "Rights",
      "Resources",
      "Enforcement",
    ],
    estimatedTime: "1-2 weeks",
    complexity: "High",
    aiAssisted: true,
  },
  {
    id: "disarmament-protocol",
    name: "Disarmament Protocol",
    category: "Disarmament",
    description: "Systematic approach to weapons reduction and monitoring",
    sections: [
      "Inventory",
      "Timeline",
      "Verification",
      "Disposal",
      "Compliance",
    ],
    estimatedTime: "3-5 days",
    complexity: "Medium",
    aiAssisted: true,
  },
];

const aiScenarios = [
  {
    id: 1,
    title: "Sudan Comprehensive Peace Simulation",
    scenario: "Multi-party disarmament with resource sharing",
    confidence: 89,
    outcomes: {
      success: 78,
      partial: 15,
      failure: 7,
    },
    keyFactors: [
      "Economic incentives",
      "International guarantees",
      "Tribal leadership",
    ],
    lastRun: "2 hours ago",
    status: "Completed",
    recommendations: [
      "Prioritize economic development zones",
      "Establish joint security committees",
      "Create youth employment programs",
    ],
  },
  {
    id: 2,
    title: "Yemen Maritime Corridor Agreement",
    scenario: "Port access and shipping lane security",
    confidence: 76,
    outcomes: {
      success: 65,
      partial: 25,
      failure: 10,
    },
    keyFactors: [
      "Saudi cooperation",
      "Iranian influence",
      "Economic necessity",
    ],
    lastRun: "6 hours ago",
    status: "Completed",
    recommendations: [
      "Implement neutral monitoring",
      "Establish revenue sharing",
      "Create emergency protocols",
    ],
  },
  {
    id: 3,
    title: "Myanmar Democratic Transition",
    scenario: "Power-sharing with military integration",
    confidence: 62,
    outcomes: {
      success: 45,
      partial: 35,
      failure: 20,
    },
    keyFactors: [
      "Military cooperation",
      "Ethnic minorities",
      "International pressure",
    ],
    lastRun: "Running",
    status: "In Progress",
    recommendations: [
      "Gradual transition timeline",
      "Constitutional guarantees",
      "International oversight",
    ],
  },
];

const interAgencyData = [
  {
    agency: "United Nations",
    status: "Active",
    activeProjects: 12,
    budget: "$45.2M",
    personnel: 1250,
    lastSync: "2 minutes ago",
    priority: "High",
    dataHealth: 98,
  },
  {
    agency: "African Union",
    status: "Active",
    activeProjects: 8,
    budget: "$12.8M",
    personnel: 340,
    lastSync: "15 minutes ago",
    priority: "High",
    dataHealth: 94,
  },
  {
    agency: "European Union",
    status: "Syncing",
    activeProjects: 6,
    budget: "$28.5M",
    personnel: 180,
    lastSync: "1 hour ago",
    priority: "Medium",
    dataHealth: 87,
  },
  {
    agency: "ASEAN",
    status: "Active",
    activeProjects: 4,
    budget: "$8.2M",
    personnel: 95,
    lastSync: "30 minutes ago",
    priority: "Medium",
    dataHealth: 91,
  },
];

const governanceMetrics = [
  {
    title: "Active Peace Processes",
    value: "24",
    change: 12.5,
    trend: "up" as const,
    subtitle: "Across 15 regions",
    icon: <Handshake className="h-5 w-5" />,
  },
  {
    title: "Smart Contracts Deployed",
    value: "18",
    change: 33.3,
    trend: "up" as const,
    subtitle: "8 active, 10 completed",
    icon: <Lock className="h-5 w-5" />,
  },
  {
    title: "Inter-Agency Coordination",
    value: "95%",
    change: 8.2,
    trend: "up" as const,
    subtitle: "Real-time data sync",
    icon: <Network className="h-5 w-5" />,
  },
  {
    title: "Resolution Success Rate",
    value: "78%",
    change: 15.7,
    trend: "up" as const,
    subtitle: "12-month average",
    icon: <Award className="h-5 w-5" />,
  },
];

export default function PeaceArchitectDashboard() {
  const { user, earnPeaceCoin, logout } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("command");
  const [selectedTreaty, setSelectedTreaty] = useState<string | null>(null);
  const [isCreatingTreaty, setIsCreatingTreaty] = useState(false);
  const [activeTreatyEditor, setActiveTreatyEditor] = useState<string | null>(
    null,
  );
  const [simulationRunning, setSimulationRunning] = useState<number | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
  };

  const handleStartTreaty = () => {
    setIsCreatingTreaty(true);
    earnPeaceCoin(100, "Initiated new peace treaty framework");
  };

  const handleRunSimulation = (scenarioId: number) => {
    setSimulationRunning(scenarioId);
    earnPeaceCoin(75, "Executed AI peace scenario simulation");

    // Simulate completion after 3 seconds
    setTimeout(() => {
      setSimulationRunning(null);
    }, 3000);
  };

  const handleDeploySmartContract = () => {
    earnPeaceCoin(150, "Deployed smart contract for peace agreement");
  };

  // Mock trend data for charts
  const peaceTrendData = [
    { date: "2024-01", conflicts: 42, resolved: 28, treaties: 3 },
    { date: "2024-02", conflicts: 38, resolved: 32, treaties: 5 },
    { date: "2024-03", conflicts: 45, resolved: 35, treaties: 4 },
    { date: "2024-04", conflicts: 39, resolved: 38, treaties: 7 },
    { date: "2024-05", conflicts: 33, resolved: 31, treaties: 6 },
    { date: "2024-06", conflicts: 29, resolved: 28, treaties: 8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enterprise Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="peace-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Peace Architect Command Center
                </h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Welcome, {user?.name}</span>
                  <Badge variant="outline">{user?.organization}</Badge>
                  <Badge className="peace-gradient text-white">
                    Level {user?.level} Diplomat
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Card className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="font-bold text-lg">
                      {user?.peaceCoinBalance}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      PeaceCoins
                    </div>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="text-right">
                    <div className="font-bold text-lg">
                      {user?.contributionScore}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Impact Score
                    </div>
                  </div>
                </div>
              </Card>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="peace-gradient-hover"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Diplomatic Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="mr-2 h-4 w-4" />
                    Security Clearance
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Database className="mr-2 h-4 w-4" />
                    Access Logs
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Secure Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise Dashboard Content */}
      <div className="p-6">
        {/* Executive KPI Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {governanceMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              trend={metric.trend}
              subtitle={metric.subtitle}
              icon={metric.icon}
              color="primary"
            />
          ))}
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 h-12">
            <TabsTrigger
              value="command"
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>Command</span>
            </TabsTrigger>
            <TabsTrigger
              value="treaties"
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Treaties</span>
            </TabsTrigger>
            <TabsTrigger
              value="conflicts"
              className="flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4" />
              <span>Conflicts</span>
            </TabsTrigger>
            <TabsTrigger
              value="scenarios"
              className="flex items-center space-x-2"
            >
              <Brain className="h-4 w-4" />
              <span>AI Scenarios</span>
            </TabsTrigger>
            <TabsTrigger
              value="agencies"
              className="flex items-center space-x-2"
            >
              <Building2 className="h-4 w-4" />
              <span>Agencies</span>
            </TabsTrigger>
            <TabsTrigger
              value="governance"
              className="flex items-center space-x-2"
            >
              <Gavel className="h-4 w-4" />
              <span>DAO</span>
            </TabsTrigger>
          </TabsList>

          {/* Command Center Tab */}
          <TabsContent value="command" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Global Conflict Overview */}
              <div className="xl:col-span-2">
                <ConflictHeatmap
                  data={globalConflictData}
                  title="Global Conflict Monitoring System"
                />
              </div>

              {/* Quick Actions Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={handleStartTreaty}
                    className="w-full peace-gradient peace-glow"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Draft New Treaty
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedTab("scenarios")}
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    Run AI Simulation
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedTab("agencies")}
                  >
                    <Network className="mr-2 h-4 w-4" />
                    Sync Agencies
                  </Button>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Emergency Protocols</h4>
                    <Button variant="destructive" size="sm" className="w-full">
                      <AlertTriangle className="mr-2 h-3 w-3" />
                      Activate Crisis Response
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Peace Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrendChart
                data={peaceTrendData}
                title="Peace Process Trends"
                dataKey="resolved"
                type="area"
                height={300}
                color="#10b981"
              />

              <ComparisonChart
                data={peaceTrendData}
                title="Conflict Resolution Metrics"
                categories={[
                  {
                    key: "conflicts",
                    name: "Total Conflicts",
                    color: "#ef4444",
                  },
                  { key: "resolved", name: "Resolved", color: "#10b981" },
                  {
                    key: "treaties",
                    name: "Treaties Signed",
                    color: "#3b82f6",
                  },
                ]}
                height={300}
              />
            </div>
          </TabsContent>

          {/* Peace Treaties Management */}
          <TabsContent value="treaties" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Peace Treaty Framework</h2>
                <p className="text-muted-foreground">
                  Advanced treaty drafting with AI assistance and smart contract
                  deployment
                </p>
              </div>

              <Dialog
                open={isCreatingTreaty}
                onOpenChange={setIsCreatingTreaty}
              >
                <DialogTrigger asChild>
                  <Button className="peace-gradient peace-glow">
                    <Plus className="mr-2 h-4 w-4" />
                    New Treaty Framework
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Peace Treaty</DialogTitle>
                    <DialogDescription>
                      Select a template and customize for your specific conflict
                      resolution needs
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {treatyTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all hover:scale-105 ${
                          selectedTreaty === template.id
                            ? "ring-2 ring-primary border-primary"
                            : ""
                        }`}
                        onClick={() => setSelectedTreaty(template.id)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {template.name}
                            </CardTitle>
                            <Badge
                              variant={
                                template.aiAssisted ? "default" : "secondary"
                              }
                            >
                              {template.aiAssisted ? "AI Assisted" : "Manual"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Complexity:</span>
                              <Badge variant="outline">
                                {template.complexity}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Est. Time:</span>
                              <span className="font-medium">
                                {template.estimatedTime}
                              </span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-sm font-medium">
                                Sections:
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {template.sections.map((section) => (
                                  <Badge
                                    key={section}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {section}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {selectedTreaty && (
                    <div className="mt-6 p-4 border rounded-lg bg-secondary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Ready to Begin</h3>
                          <p className="text-sm text-muted-foreground">
                            Start drafting with the selected template
                          </p>
                        </div>
                        <Button
                          className="peace-gradient"
                          onClick={() => {
                            setActiveTreatyEditor(selectedTreaty);
                            setIsCreatingTreaty(false);
                            earnPeaceCoin(100, "Started new treaty framework");
                          }}
                        >
                          <PenTool className="mr-2 h-4 w-4" />
                          Start Drafting
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>

            {/* Active Treaties Grid */}
            <div className="grid grid-cols-1 gap-6">
              {globalConflictData
                .filter((conflict) => conflict.treatyStatus !== "No Treaty")
                .map((conflict) => (
                  <Card key={conflict.region} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <Flag className="h-5 w-5" />
                            <span>{conflict.region} Peace Framework</span>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Agencies: {conflict.agencies.join(", ")}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {conflict.treatyStatus}
                          </Badge>
                          {conflict.smartContractActive && (
                            <Badge className="bg-green-100 text-green-800">
                              <Lock className="mr-1 h-3 w-3" />
                              Smart Contract
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Risk Level:
                            </span>
                            <div
                              className={`font-medium ${
                                conflict.riskLevel === "Critical"
                                  ? "text-red-600"
                                  : conflict.riskLevel === "High"
                                    ? "text-orange-600"
                                    : "text-yellow-600"
                              }`}
                            >
                              {conflict.riskLevel}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Resolution Rate:
                            </span>
                            <div className="font-medium">
                              {Math.round(
                                (conflict.resolved / conflict.incidents) * 100,
                              )}
                              %
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Last Update:
                            </span>
                            <div className="font-medium">
                              {conflict.lastUpdate}
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-3 w-3" />
                            Review Draft
                          </Button>
                          <Button variant="outline" size="sm">
                            <GitCompare className="mr-2 h-3 w-3" />
                            Treaty Diff
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-3 w-3" />
                            Collaborative Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDeploySmartContract}
                            disabled={conflict.smartContractActive}
                          >
                            <Gavel className="mr-2 h-3 w-3" />
                            {conflict.smartContractActive
                              ? "Contract Active"
                              : "Deploy Contract"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Conflict Mapping & Analysis */}
          <TabsContent value="conflicts" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Global Conflict Intelligence
                </h2>
                <p className="text-muted-foreground">
                  Real-time conflict monitoring with predictive analytics
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search regions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Enhanced Conflict Heatmap */}
            <Card className="p-6">
              <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Globe className="w-16 h-16 text-primary mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Interactive Global Conflict Map
                    </h3>
                    <p className="text-muted-foreground">
                      Real-time satellite data integration with AI-powered risk
                      assessment
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Critical Risk Zones</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Monitoring Areas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Stabilized Regions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Treaty Zones</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Detailed Conflict Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Early Warning Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        indicator: "Economic Stress Index",
                        value: 73,
                        trend: "up",
                        region: "Sahel Region",
                      },
                      {
                        indicator: "Social Media Sentiment",
                        value: 45,
                        trend: "down",
                        region: "Myanmar",
                      },
                      {
                        indicator: "Migration Patterns",
                        value: 89,
                        trend: "up",
                        region: "Central America",
                      },
                      {
                        indicator: "Resource Competition",
                        value: 67,
                        trend: "neutral",
                        region: "Horn of Africa",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div>
                          <div className="font-medium text-sm">
                            {item.indicator}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.region}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={item.value} className="w-16 h-2" />
                          <span className="text-sm font-medium w-8">
                            {item.value}
                          </span>
                          {item.trend === "up" && (
                            <TrendingUp className="h-3 w-3 text-red-500" />
                          )}
                          {item.trend === "down" && (
                            <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
                          )}
                          {item.trend === "neutral" && (
                            <ArrowRight className="h-3 w-3 text-gray-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        category: "Political Instability",
                        score: 8.2,
                        color: "red",
                      },
                      {
                        category: "Economic Factors",
                        score: 6.5,
                        color: "orange",
                      },
                      {
                        category: "Social Tensions",
                        score: 7.1,
                        color: "yellow",
                      },
                      {
                        category: "External Influences",
                        score: 5.8,
                        color: "blue",
                      },
                    ].map((risk, index) => (
                      <div key={index} className="p-3 rounded-lg border">
                        <div className="text-sm font-medium mb-2">
                          {risk.category}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-secondary rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-${risk.color}-500`}
                              style={{ width: `${risk.score * 10}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold">
                            {risk.score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Scenario Simulations */}
          <TabsContent value="scenarios" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">AI Peace Scenario Engine</h2>
                <p className="text-muted-foreground">
                  Advanced predictive modeling for peace process outcomes
                </p>
              </div>
              <Button className="peace-gradient peace-glow">
                <Brain className="mr-2 h-4 w-4" />
                New Simulation
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {aiScenarios.map((scenario) => (
                <Card key={scenario.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="h-5 w-5" />
                          <span>{scenario.title}</span>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {scenario.scenario}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {scenario.confidence}% Confidence
                        </Badge>
                        <Badge
                          variant={
                            scenario.status === "Completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {scenario.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Outcome Predictions */}
                      <div>
                        <h4 className="font-medium mb-3">Predicted Outcomes</h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                            <div className="text-2xl font-bold text-green-600">
                              {scenario.outcomes.success}%
                            </div>
                            <div className="text-sm text-green-700 dark:text-green-300">
                              Success
                            </div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                            <div className="text-2xl font-bold text-yellow-600">
                              {scenario.outcomes.partial}%
                            </div>
                            <div className="text-sm text-yellow-700 dark:text-yellow-300">
                              Partial
                            </div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                            <div className="text-2xl font-bold text-red-600">
                              {scenario.outcomes.failure}%
                            </div>
                            <div className="text-sm text-red-700 dark:text-red-300">
                              Failure
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Key Factors */}
                      <div>
                        <h4 className="font-medium mb-3">
                          Critical Success Factors
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {scenario.keyFactors.map((factor, index) => (
                            <Badge key={index} variant="outline">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* AI Recommendations */}
                      <div>
                        <h4 className="font-medium mb-3">AI Recommendations</h4>
                        <ul className="space-y-2">
                          {scenario.recommendations.map((rec, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRunSimulation(scenario.id)}
                          disabled={simulationRunning === scenario.id}
                        >
                          {simulationRunning === scenario.id ? (
                            <>
                              <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
                              Running...
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-3 w-3" />
                              Re-run Simulation
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-3 w-3" />
                          Detailed Analysis
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="mr-2 h-3 w-3" />
                          Share Results
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          Export Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Inter-Agency Coordination */}
          <TabsContent value="agencies" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Inter-Agency Command Dashboard
                </h2>
                <p className="text-muted-foreground">
                  Real-time coordination with international organizations
                </p>
              </div>
              <Button className="peace-gradient peace-glow">
                <Network className="mr-2 h-4 w-4" />
                Sync All Agencies
              </Button>
            </div>

            {/* Agency Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interAgencyData.map((agency) => (
                <Card key={agency.agency} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="peace-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {agency.agency}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Last sync: {agency.lastSync}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            agency.status === "Active" ? "default" : "secondary"
                          }
                          className={
                            agency.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {agency.status}
                        </Badge>
                        <Badge variant="outline">
                          {agency.priority} Priority
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Active Projects:
                          </span>
                          <div className="font-bold text-lg">
                            {agency.activeProjects}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Budget:</span>
                          <div className="font-bold text-lg">
                            {agency.budget}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Personnel:
                          </span>
                          <div className="font-bold text-lg">
                            {agency.personnel}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Data Health:
                          </span>
                          <div className="font-bold text-lg">
                            {agency.dataHealth}%
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Data Synchronization</span>
                          <span>{agency.dataHealth}%</span>
                        </div>
                        <Progress value={agency.dataHealth} className="h-2" />
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-2 h-3 w-3" />
                          View Projects
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <RefreshCw className="mr-2 h-3 w-3" />
                          Force Sync
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Collaborative Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Collaborative Command Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <MessageSquare className="h-6 w-6" />
                    <span>Secure Messaging</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Calendar className="h-6 w-6" />
                    <span>Joint Operations</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Database className="h-6 w-6" />
                    <span>Shared Intelligence</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DAO Governance */}
          <TabsContent value="governance" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Global Peace DAO</h2>
                <p className="text-muted-foreground">
                  Decentralized governance for global peace initiatives
                </p>
              </div>
              <Button className="peace-gradient peace-glow">
                <Plus className="mr-2 h-4 w-4" />
                Create Proposal
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Governance Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Governance Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Proposals Created
                      </span>
                      <span className="font-bold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Votes Cast
                      </span>
                      <span className="font-bold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Governance Score
                      </span>
                      <span className="font-bold">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Diplomatic Weight
                      </span>
                      <span className="font-bold">2,450 votes</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium">Recent Achievements</h4>
                    <div className="space-y-1">
                      <Badge
                        variant="secondary"
                        className="w-full justify-start"
                      >
                        🏆 Treaty Architect of the Month
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="w-full justify-start"
                      >
                        🎯 100% Voting Participation
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="w-full justify-start"
                      >
                        🤝 Multi-Agency Coordinator
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Proposals */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Governance Proposals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Enhanced AI Conflict Prediction Model",
                          description:
                            "Deploy advanced ML algorithms for 48-hour conflict prediction",
                          votes: { yes: 89, no: 11, total: 1420 },
                          timeLeft: "2 days",
                          category: "Technology",
                        },
                        {
                          title:
                            "Increase PeaceCoin Rewards for Treaty Completion",
                          description:
                            "Boost incentives for successful peace treaty implementations",
                          votes: { yes: 76, no: 24, total: 2100 },
                          timeLeft: "5 days",
                          category: "Economics",
                        },
                        {
                          title: "Establish Emergency Response Protocol",
                          description:
                            "Create rapid deployment framework for crisis situations",
                          votes: { yes: 95, no: 5, total: 890 },
                          timeLeft: "1 day",
                          category: "Operations",
                        },
                      ].map((proposal, index) => (
                        <Card
                          key={index}
                          className="border-l-4 border-l-primary"
                        >
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium">
                                    {proposal.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {proposal.description}
                                  </p>
                                </div>
                                <Badge variant="outline">
                                  {proposal.category}
                                </Badge>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Support: {proposal.votes.yes}%</span>
                                  <span>
                                    {proposal.votes.total} votes •{" "}
                                    {proposal.timeLeft} left
                                  </span>
                                </div>
                                <div className="flex space-x-1 h-2">
                                  <div
                                    className="bg-green-500 rounded-l"
                                    style={{ width: `${proposal.votes.yes}%` }}
                                  />
                                  <div
                                    className="bg-red-500 rounded-r"
                                    style={{ width: `${proposal.votes.no}%` }}
                                  />
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <CheckCircle className="mr-2 h-3 w-3" />
                                  Support
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1"
                                >
                                  <X className="mr-2 h-3 w-3" />
                                  Oppose
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
