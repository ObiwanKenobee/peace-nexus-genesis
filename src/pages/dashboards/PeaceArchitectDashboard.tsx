import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
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
} from "lucide-react";

const conflictHotspots = [
  {
    id: 1,
    region: "South Sudan",
    riskLevel: "High",
    status: "Active Mediation",
    lastUpdate: "2 hours ago",
  },
  {
    id: 2,
    region: "Yemen",
    riskLevel: "Critical",
    status: "Ceasefire Negotiations",
    lastUpdate: "45 minutes ago",
  },
  {
    id: 3,
    region: "Myanmar",
    riskLevel: "Medium",
    status: "Monitoring",
    lastUpdate: "1 day ago",
  },
  {
    id: 4,
    region: "Ukraine",
    riskLevel: "High",
    status: "Peace Talks",
    lastUpdate: "30 minutes ago",
  },
];

const activeTreaties = [
  {
    id: 1,
    title: "Sudan Peace Framework",
    status: "In Review",
    progress: 75,
    parties: ["Sudan Government", "SPLM-N", "UN"],
  },
  {
    id: 2,
    title: "Yemen Ceasefire Agreement",
    status: "Active Negotiations",
    progress: 45,
    parties: ["Saudi Arabia", "Houthis", "UN"],
  },
  {
    id: 3,
    title: "Ethiopia Border Resolution",
    status: "Draft",
    progress: 30,
    parties: ["Ethiopia", "Eritrea", "AU"],
  },
];

const policySimulations = [
  {
    id: 1,
    title: "Disarmament Scenario - Horn of Africa",
    accuracy: 89,
    lastRun: "1 hour ago",
    status: "Completed",
  },
  {
    id: 2,
    title: "Border Demarcation - Kashmir Region",
    accuracy: 76,
    lastRun: "3 hours ago",
    status: "Running",
  },
  {
    id: 3,
    title: "Resource Sharing - Nile Basin",
    accuracy: 92,
    lastRun: "1 day ago",
    status: "Completed",
  },
];

const governanceMetrics = [
  { title: "Active Peace Processes", value: "24", change: "+3", trend: "up" },
  { title: "Smart Contracts Deployed", value: "8", change: "+2", trend: "up" },
  { title: "Stakeholder Engagement", value: "89%", change: "+5%", trend: "up" },
  {
    title: "Resolution Success Rate",
    value: "67%",
    change: "+12%",
    trend: "up",
  },
];

export default function PeaceArchitectDashboard() {
  const { user, earnPeaceCoin, logout } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleLogout = () => {
    logout();
  };

  const handleNewTreaty = () => {
    earnPeaceCoin(50, "Started new peace treaty draft");
  };

  const handleRunSimulation = () => {
    earnPeaceCoin(25, "Executed AI scenario simulation");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Peace Architect Command Center
            </h1>
            <p className="text-gray-600">
              Welcome back, {user?.name} • {user?.organization}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-100 text-blue-800">
              Level {user?.level} Architect
            </Badge>
            <div className="text-right">
              <div className="text-sm font-medium">
                {user?.peaceCoinBalance} PeaceCoins
              </div>
              <div className="text-xs text-gray-500">
                Score: {user?.contributionScore}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {governanceMetrics.map((metric, index) => (
            <Card key={index}>
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
                  <Shield className="w-8 h-8 text-blue-600" />
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="treaties">Peace Treaties</TabsTrigger>
            <TabsTrigger value="conflicts">Conflict Mapping</TabsTrigger>
            <TabsTrigger value="simulations">AI Scenarios</TabsTrigger>
            <TabsTrigger value="governance">DAO Governance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Conflict Hotspots */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Global Conflict Hotspots</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conflictHotspots.map((conflict) => (
                      <div
                        key={conflict.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{conflict.region}</div>
                          <div className="text-sm text-gray-500">
                            {conflict.status}
                          </div>
                          <div className="text-xs text-gray-400">
                            {conflict.lastUpdate}
                          </div>
                        </div>
                        <Badge
                          variant={
                            conflict.riskLevel === "Critical"
                              ? "destructive"
                              : conflict.riskLevel === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {conflict.riskLevel}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Recent Peace Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">
                          Sudan peace framework approved
                        </div>
                        <div className="text-xs text-gray-500">2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">
                          Yemen ceasefire status update needed
                        </div>
                        <div className="text-xs text-gray-500">4 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">
                          New stakeholder joined Myanmar mediation
                        </div>
                        <div className="text-xs text-gray-500">1 day ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Treaties Tab */}
          <TabsContent value="treaties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Active Peace Treaties</h2>
              <Button onClick={handleNewTreaty}>
                <Plus className="w-4 h-4 mr-2" />
                New Treaty Draft
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {activeTreaties.map((treaty) => (
                <Card key={treaty.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {treaty.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Parties: {treaty.parties.join(", ")}
                        </p>
                      </div>
                      <Badge variant="outline">{treaty.status}</Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{treaty.progress}%</span>
                        </div>
                        <Progress value={treaty.progress} className="h-2" />
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Gavel className="w-4 h-4 mr-2" />
                          Deploy Smart Contract
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Conflicts Tab */}
          <TabsContent value="conflicts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Conflict Heat Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Interactive conflict heat map would be rendered here
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Real-time data from conflict monitoring systems
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Simulations Tab */}
          <TabsContent value="simulations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">AI Policy Simulations</h2>
              <Button onClick={handleRunSimulation}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Run New Simulation
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {policySimulations.map((sim) => (
                <Card key={sim.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{sim.title}</h3>
                        <div className="text-sm text-gray-500">
                          Accuracy: {sim.accuracy}% • Last run: {sim.lastRun}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            sim.status === "Completed" ? "secondary" : "default"
                          }
                        >
                          {sim.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Governance Tab */}
          <TabsContent value="governance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>DAO Governance Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Active Proposals</h3>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium text-sm">
                          Increase PeaceCoin rewards for mediation
                        </div>
                        <div className="text-xs text-gray-500">
                          Ends in 2 days • 67% approval
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium text-sm">
                          New conflict prediction AI model
                        </div>
                        <div className="text-xs text-gray-500">
                          Ends in 5 days • 89% approval
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Your Governance Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Proposals Created</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Votes Cast</span>
                        <span className="font-medium">89</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Governance Score</span>
                        <span className="font-medium">94%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
