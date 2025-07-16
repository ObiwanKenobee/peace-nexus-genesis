import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MetricCard,
  TrendChart,
  ComparisonChart,
  ProgressTracker,
} from "@/components/ui/data-visualization";
import {
  Building2,
  Network,
  Users,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Database,
  Zap,
  MessageSquare,
  Calendar,
  FileText,
  Share2,
  Settings,
  Eye,
  Download,
  Upload,
  Sync,
  Bell,
  Target,
  BarChart3,
  TrendingUp,
  Activity,
  Link,
  Phone,
  Mail,
  ExternalLink,
  MapPin,
  DollarSign,
  Users2,
  Flag,
  Briefcase,
} from "lucide-react";

interface Agency {
  id: string;
  name: string;
  fullName: string;
  type: "UN" | "Regional" | "Government" | "NGO" | "Military";
  logo?: string;
  status: "active" | "inactive" | "maintenance" | "critical";
  lastSync: string;
  dataHealth: number;
  apiEndpoint: string;
  region: string;
  personnel: number;
  budget: string;
  activeProjects: number;
  contactPerson: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  capabilities: string[];
  sharedData: {
    conflicts: number;
    projects: number;
    personnel: number;
    intelligence: number;
  };
}

interface SharedOperation {
  id: string;
  title: string;
  type: "peacekeeping" | "humanitarian" | "reconstruction" | "monitoring";
  agencies: string[];
  region: string;
  status: "planning" | "active" | "completed" | "suspended";
  startDate: string;
  endDate?: string;
  budget: string;
  personnel: number;
  progress: number;
  priority: "low" | "medium" | "high" | "critical";
  description: string;
  nextMilestone: string;
}

interface DataExchange {
  id: string;
  sourceAgency: string;
  targetAgency: string;
  dataType: "intelligence" | "logistics" | "personnel" | "financial";
  status: "pending" | "approved" | "syncing" | "completed" | "failed";
  timestamp: string;
  size: string;
  description: string;
  classification: "public" | "restricted" | "confidential" | "secret";
}

const mockAgencies: Agency[] = [
  {
    id: "un-dpko",
    name: "UN DPKO",
    fullName: "United Nations Department of Peacekeeping Operations",
    type: "UN",
    logo: "🇺🇳",
    status: "active",
    lastSync: "2 minutes ago",
    dataHealth: 98,
    apiEndpoint: "https://api.un.org/dpko/v2",
    region: "Global",
    personnel: 125000,
    budget: "$6.8B",
    activeProjects: 15,
    contactPerson: {
      name: "Sarah Chen",
      role: "Deputy Director",
      email: "s.chen@un.org",
      phone: "+1-212-963-1234",
    },
    capabilities: ["Peacekeeping", "Mediation", "Logistics", "Intelligence"],
    sharedData: {
      conflicts: 24,
      projects: 15,
      personnel: 98500,
      intelligence: 156,
    },
  },
  {
    id: "au-psc",
    name: "AU PSC",
    fullName: "African Union Peace and Security Council",
    type: "Regional",
    logo: "🌍",
    status: "active",
    lastSync: "15 minutes ago",
    dataHealth: 94,
    apiEndpoint: "https://api.au.int/psc/v1",
    region: "Africa",
    personnel: 12500,
    budget: "$450M",
    activeProjects: 8,
    contactPerson: {
      name: "Dr. Amara Diallo",
      role: "Commissioner for Peace and Security",
      email: "a.diallo@au.int",
      phone: "+251-11-551-7700",
    },
    capabilities: ["Regional Mediation", "Early Warning", "Deployment"],
    sharedData: {
      conflicts: 12,
      projects: 8,
      personnel: 8500,
      intelligence: 89,
    },
  },
  {
    id: "eu-eeas",
    name: "EU EEAS",
    fullName: "European Union External Action Service",
    type: "Regional",
    logo: "🇪🇺",
    status: "active",
    lastSync: "1 hour ago",
    dataHealth: 87,
    apiEndpoint: "https://api.eeas.europa.eu/v3",
    region: "Europe/Global",
    personnel: 8500,
    budget: "$2.1B",
    activeProjects: 12,
    contactPerson: {
      name: "Ambassador Maria Kovač",
      role: "Managing Director",
      email: "m.kovac@eeas.europa.eu",
      phone: "+32-2-584-1111",
    },
    capabilities: ["Diplomatic Mediation", "Funding", "Technical Assistance"],
    sharedData: {
      conflicts: 8,
      projects: 12,
      personnel: 6800,
      intelligence: 67,
    },
  },
  {
    id: "asean-apsc",
    name: "ASEAN APSC",
    fullName: "ASEAN Political-Security Community",
    type: "Regional",
    logo: "🌏",
    status: "maintenance",
    lastSync: "3 hours ago",
    dataHealth: 76,
    apiEndpoint: "https://api.asean.org/apsc/v1",
    region: "Southeast Asia",
    personnel: 3200,
    budget: "$180M",
    activeProjects: 5,
    contactPerson: {
      name: "Dr. Thanawat Suksuwan",
      role: "Executive Director",
      email: "t.suksuwan@asean.org",
      phone: "+62-21-724-3372",
    },
    capabilities: [
      "Conflict Prevention",
      "Confidence Building",
      "Norm Setting",
    ],
    sharedData: {
      conflicts: 3,
      projects: 5,
      personnel: 1800,
      intelligence: 34,
    },
  },
];

const mockOperations: SharedOperation[] = [
  {
    id: "minusma-2024",
    title: "MINUSMA Transition Support",
    type: "peacekeeping",
    agencies: ["un-dpko", "au-psc", "eu-eeas"],
    region: "Mali",
    status: "active",
    startDate: "2024-01-15",
    budget: "$1.2B",
    personnel: 15000,
    progress: 67,
    priority: "high",
    description: "Support transition of peacekeeping operations in Mali",
    nextMilestone: "Phase 2 personnel transfer - Dec 20",
  },
  {
    id: "sudan-mediation",
    title: "Sudan Peace Process Mediation",
    type: "humanitarian",
    agencies: ["un-dpko", "au-psc"],
    region: "Sudan",
    status: "active",
    startDate: "2024-03-01",
    budget: "$85M",
    personnel: 450,
    progress: 78,
    priority: "critical",
    description: "Multi-party mediation for sustainable peace in Sudan",
    nextMilestone: "Treaty signing ceremony - Dec 25",
  },
  {
    id: "ukraine-reconstruction",
    title: "Ukraine Infrastructure Reconstruction",
    type: "reconstruction",
    agencies: ["eu-eeas", "un-dpko"],
    region: "Ukraine",
    status: "planning",
    startDate: "2024-12-01",
    budget: "$5.8B",
    personnel: 2500,
    progress: 15,
    priority: "high",
    description: "Coordinated reconstruction of critical infrastructure",
    nextMilestone: "Funding allocation - Dec 30",
  },
];

const mockDataExchanges: DataExchange[] = [
  {
    id: "intel-share-001",
    sourceAgency: "un-dpko",
    targetAgency: "au-psc",
    dataType: "intelligence",
    status: "completed",
    timestamp: "2024-12-12 14:30",
    size: "2.3 MB",
    description: "Conflict early warning indicators for Sahel region",
    classification: "restricted",
  },
  {
    id: "personnel-sync-002",
    sourceAgency: "au-psc",
    targetAgency: "un-dpko",
    dataType: "personnel",
    status: "syncing",
    timestamp: "2024-12-12 15:45",
    size: "850 KB",
    description: "Peacekeeping personnel deployment status",
    classification: "confidential",
  },
  {
    id: "logistics-update-003",
    sourceAgency: "eu-eeas",
    targetAgency: "un-dpko",
    dataType: "logistics",
    status: "pending",
    timestamp: "2024-12-12 16:20",
    size: "1.1 MB",
    description: "Supply chain and equipment tracking data",
    classification: "restricted",
  },
];

interface InterAgencyDashboardProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const InterAgencyDashboard: React.FC<InterAgencyDashboardProps> = ({
  isOpen = true,
  onClose,
}) => {
  const [selectedAgency, setSelectedAgency] = useState<string>("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [syncStatus, setSyncStatus] = useState<
    "idle" | "syncing" | "completed"
  >("idle");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const handleSync = async () => {
    setSyncStatus("syncing");
    // Simulate sync process
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setSyncStatus("completed");
    setTimeout(() => setSyncStatus("idle"), 2000);
  };

  const getStatusColor = (status: Agency["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOperationPriorityColor = (priority: SharedOperation["priority"]) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const agencyMetrics = [
    {
      title: "Connected Agencies",
      value: mockAgencies
        .filter((a) => a.status === "active")
        .length.toString(),
      change: 15.5,
      trend: "up" as const,
      subtitle: `${mockAgencies.length} total agencies`,
      icon: <Building2 className="h-5 w-5" />,
    },
    {
      title: "Data Health Score",
      value: "94%",
      change: 3.2,
      trend: "up" as const,
      subtitle: "Average across all agencies",
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "Active Operations",
      value: mockOperations
        .filter((o) => o.status === "active")
        .length.toString(),
      change: 12.8,
      trend: "up" as const,
      subtitle: "Multi-agency coordination",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Real-time Sync",
      value: "98.5%",
      change: 1.2,
      trend: "up" as const,
      subtitle: "System uptime",
      icon: <Sync className="h-5 w-5" />,
    },
  ];

  // Mock trend data
  const syncTrendData = [
    { date: "Dec 8", uptime: 97.2, dataExchanges: 45, errors: 3 },
    { date: "Dec 9", uptime: 98.1, dataExchanges: 52, errors: 2 },
    { date: "Dec 10", uptime: 96.8, dataExchanges: 48, errors: 4 },
    { date: "Dec 11", uptime: 99.2, dataExchanges: 67, errors: 1 },
    { date: "Dec 12", uptime: 98.5, dataExchanges: 71, errors: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="peace-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                <Network className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">
                  Inter-Agency Command Center
                </CardTitle>
                <p className="text-muted-foreground">
                  Real-time coordination and data sharing across global peace
                  organizations
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="px-3 py-1">
                {mockAgencies.filter((a) => a.status === "active").length}{" "}
                Active
              </Badge>
              <Button
                onClick={handleSync}
                disabled={syncStatus === "syncing"}
                className="peace-gradient"
              >
                {syncStatus === "syncing" ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : syncStatus === "completed" ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Synced
                  </>
                ) : (
                  <>
                    <Sync className="mr-2 h-4 w-4" />
                    Sync All
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {agencyMetrics.map((metric, index) => (
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

      {/* Main Content Tabs */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Agency Network Status */}
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Agency Network Status</CardTitle>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search agencies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48"
                  />
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAgencies.map((agency) => (
                  <Card key={agency.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{agency.logo}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold">{agency.name}</h3>
                              <Badge className={getStatusColor(agency.status)}>
                                {agency.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {agency.fullName}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">
                                  Personnel:
                                </span>
                                <div className="font-medium">
                                  {agency.personnel.toLocaleString()}
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Budget:
                                </span>
                                <div className="font-medium">
                                  {agency.budget}
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Projects:
                                </span>
                                <div className="font-medium">
                                  {agency.activeProjects}
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  Data Health:
                                </span>
                                <div className="font-medium">
                                  {agency.dataHealth}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-right text-sm">
                            <div className="font-medium">Last Sync</div>
                            <div className="text-muted-foreground">
                              {agency.lastSync}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
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

          {/* System Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TrendChart
              data={syncTrendData}
              title="System Uptime"
              dataKey="uptime"
              type="line"
              height={200}
              color="#10b981"
            />
            <TrendChart
              data={syncTrendData}
              title="Data Exchanges"
              dataKey="dataExchanges"
              type="area"
              height={200}
              color="#3b82f6"
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Active Operations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {mockOperations
                    .filter((op) => op.status === "active")
                    .map((operation) => (
                      <div key={operation.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">
                            {operation.title}
                          </h4>
                          <Badge
                            className={getOperationPriorityColor(
                              operation.priority,
                            )}
                          >
                            {operation.priority}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs text-muted-foreground">
                            <MapPin className="inline h-3 w-3 mr-1" />
                            {operation.region} • {operation.agencies.length}{" "}
                            agencies
                          </div>
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={operation.progress}
                              className="flex-1 h-1"
                            />
                            <span className="text-xs font-medium">
                              {operation.progress}%
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Next: {operation.nextMilestone}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Data Exchange Monitor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Real-time Data Exchange</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDataExchanges.slice(0, 5).map((exchange) => (
                  <div key={exchange.id} className="p-2 border rounded">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs font-medium">
                        {
                          mockAgencies.find(
                            (a) => a.id === exchange.sourceAgency,
                          )?.name
                        }{" "}
                        →{" "}
                        {
                          mockAgencies.find(
                            (a) => a.id === exchange.targetAgency,
                          )?.name
                        }
                      </div>
                      <Badge
                        variant={
                          exchange.status === "completed"
                            ? "default"
                            : exchange.status === "syncing"
                              ? "secondary"
                              : exchange.status === "failed"
                                ? "destructive"
                                : "outline"
                        }
                        className="text-xs"
                      >
                        {exchange.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {exchange.dataType} • {exchange.size} •{" "}
                      {exchange.classification}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Emergency Communication
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Joint Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="mr-2 h-4 w-4" />
                Share Intelligence
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Export Coordination Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Operations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Multi-Agency Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockOperations.map((operation) => (
              <div key={operation.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{operation.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>
                        <MapPin className="inline h-3 w-3 mr-1" />
                        {operation.region}
                      </span>
                      <span>
                        <Calendar className="inline h-3 w-3 mr-1" />
                        {operation.startDate}
                      </span>
                      <span>
                        <DollarSign className="inline h-3 w-3 mr-1" />
                        {operation.budget}
                      </span>
                      <span>
                        <Users2 className="inline h-3 w-3 mr-1" />
                        {operation.personnel} personnel
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={getOperationPriorityColor(operation.priority)}
                    >
                      {operation.priority}
                    </Badge>
                    <Badge variant="outline">{operation.status}</Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {operation.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Agencies:
                    </span>
                    <div className="flex space-x-1">
                      {operation.agencies.map((agencyId) => {
                        const agency = mockAgencies.find(
                          (a) => a.id === agencyId,
                        );
                        return (
                          <Badge
                            key={agencyId}
                            variant="secondary"
                            className="text-xs"
                          >
                            {agency?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Progress: </span>
                      <span className="font-medium">{operation.progress}%</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterAgencyDashboard;
