import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  MetricCard,
  TrendChart,
  ComparisonChart,
  ProgressTracker,
} from "@/components/ui/data-visualization";
import {
  Code,
  Github,
  Wallet,
  Zap,
  GitBranch,
  Shield,
  Box,
  DollarSign,
  Users,
  TrendingUp,
  Star,
  GitFork,
  Eye,
  Download,
  Play,
  Plus,
  ExternalLink,
  LogOut,
  Settings,
  Terminal,
  Database,
  Cloud,
  Globe,
  Lock,
  Unlock,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  Share2,
  Upload,
  FileText,
  Layers,
  Network,
  Cpu,
  HardDrive,
  Activity,
  Gauge,
  Target,
  BookOpen,
  Award,
  Crown,
  GitCommit,
  GitPullRequest,
  GitMerge,
  Bug,
  Lightbulb,
  Rocket,
  Building2,
  Key,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Link,
  Hash,
  Copy,
  MoreHorizontal,
  Filter,
  Search,
  Bell,
  User,
  Briefcase,
} from "lucide-react";

// Enhanced data structures for tech diplomats
interface Repository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  pullRequests: number;
  lastCommit: string;
  status: "active" | "stable" | "beta" | "archived";
  peaceBounty: number;
  contributors: number;
  tags: string[];
  deploymentStatus: "deployed" | "staging" | "development" | "failed";
  coverage: number;
}

interface IssueBounty {
  id: string;
  title: string;
  description: string;
  repository: string;
  type: "feature" | "bug" | "security" | "documentation" | "optimization";
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  reward: number;
  deadline: string;
  applicants: number;
  tags: string[];
  skills: string[];
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "in-progress" | "completed" | "closed";
  assignee?: string;
  estimatedHours: number;
}

interface Web3Integration {
  id: string;
  name: string;
  type: "wallet" | "storage" | "identity" | "oracle" | "bridge";
  status: "connected" | "disconnected" | "syncing" | "error";
  network: string;
  balance?: string;
  address: string;
  lastSync: string;
  features: string[];
  gasUsed24h?: number;
  transactions24h?: number;
}

interface APIEndpoint {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  description: string;
  calls24h: number;
  avgResponseTime: number;
  successRate: number;
  lastError?: string;
  rateLimit: number;
  authRequired: boolean;
}

interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  type: "feature" | "protocol" | "economic" | "governance";
  sourceRepo: string;
  prNumber?: number;
  author: string;
  status:
    | "draft"
    | "review"
    | "voting"
    | "approved"
    | "rejected"
    | "implemented";
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  deadline: string;
  codeChanges: {
    additions: number;
    deletions: number;
    files: number;
  };
}

const mockRepositories: Repository[] = [
  {
    id: "peace-protocol",
    name: "peace-protocol",
    fullName: "paxis-org/peace-protocol",
    description:
      "Core smart contracts for automated peace agreements and ceasefire monitoring",
    language: "Solidity",
    stars: 1247,
    forks: 298,
    issues: 23,
    pullRequests: 8,
    lastCommit: "2 hours ago",
    status: "active",
    peaceBounty: 2500,
    contributors: 42,
    tags: ["smart-contracts", "peace", "ethereum", "polygon"],
    deploymentStatus: "deployed",
    coverage: 94,
  },
  {
    id: "conflict-ai-ml",
    name: "conflict-ai-ml",
    fullName: "paxis-org/conflict-ai-ml",
    description:
      "Machine learning models for conflict prediction and early warning systems",
    language: "Python",
    stars: 934,
    forks: 187,
    issues: 15,
    pullRequests: 12,
    lastCommit: "4 hours ago",
    status: "stable",
    peaceBounty: 1800,
    contributors: 28,
    tags: ["machine-learning", "ai", "tensorflow", "conflict-prediction"],
    deploymentStatus: "deployed",
    coverage: 87,
  },
  {
    id: "paxis-sdk-js",
    name: "paxis-sdk-js",
    fullName: "paxis-org/paxis-sdk-js",
    description:
      "JavaScript/TypeScript SDK for building peace-focused applications",
    language: "TypeScript",
    stars: 756,
    forks: 143,
    issues: 8,
    pullRequests: 5,
    lastCommit: "1 day ago",
    status: "beta",
    peaceBounty: 1200,
    contributors: 18,
    tags: ["sdk", "javascript", "react", "web3"],
    deploymentStatus: "staging",
    coverage: 91,
  },
  {
    id: "refugee-identity-zk",
    name: "refugee-identity-zk",
    fullName: "paxis-org/refugee-identity-zk",
    description:
      "Zero-knowledge proof system for privacy-preserving refugee identification",
    language: "Rust",
    stars: 523,
    forks: 89,
    issues: 18,
    pullRequests: 7,
    lastCommit: "3 days ago",
    status: "beta",
    peaceBounty: 3000,
    contributors: 15,
    tags: ["zero-knowledge", "privacy", "identity", "rust"],
    deploymentStatus: "development",
    coverage: 78,
  },
];

const mockBounties: IssueBounty[] = [
  {
    id: "bounty-001",
    title: "Implement Multi-Signature Peace Treaty Validation",
    description:
      "Build smart contract functionality for validating peace treaties with multiple stakeholder signatures, including UN, government, and civil society representatives.",
    repository: "peace-protocol",
    type: "feature",
    difficulty: "advanced",
    reward: 850,
    deadline: "2024-12-25",
    applicants: 12,
    tags: ["smart-contracts", "multi-sig", "governance"],
    skills: ["Solidity", "Web3", "Cryptography"],
    priority: "high",
    status: "open",
    estimatedHours: 40,
  },
  {
    id: "bounty-002",
    title: "Real-time Conflict Risk Assessment API",
    description:
      "Develop ML-powered API endpoint that provides real-time conflict risk scores based on multiple data sources including social media, economic indicators, and historical patterns.",
    repository: "conflict-ai-ml",
    type: "feature",
    difficulty: "expert",
    reward: 1200,
    deadline: "2024-12-30",
    applicants: 8,
    tags: ["machine-learning", "api", "real-time"],
    skills: ["Python", "TensorFlow", "REST APIs", "Data Science"],
    priority: "critical",
    status: "in-progress",
    assignee: "dr-maria-santos",
    estimatedHours: 60,
  },
  {
    id: "bounty-003",
    title: "Mobile SDK for Offline Peace Mediation",
    description:
      "Create React Native SDK components that work offline for peace mediation applications in areas with limited internet connectivity.",
    repository: "paxis-sdk-js",
    type: "feature",
    difficulty: "intermediate",
    reward: 650,
    deadline: "2024-12-28",
    applicants: 15,
    tags: ["mobile", "offline", "react-native"],
    skills: ["React Native", "SQLite", "Offline-first"],
    priority: "medium",
    status: "open",
    estimatedHours: 35,
  },
  {
    id: "bounty-004",
    title: "Zero-Knowledge Proof Optimization",
    description:
      "Optimize ZK proof generation for refugee identity verification to reduce computation time by 50% while maintaining security guarantees.",
    repository: "refugee-identity-zk",
    type: "optimization",
    difficulty: "expert",
    reward: 1500,
    deadline: "2025-01-05",
    applicants: 6,
    tags: ["zero-knowledge", "optimization", "cryptography"],
    skills: ["Rust", "Cryptography", "Mathematics"],
    priority: "high",
    status: "open",
    estimatedHours: 80,
  },
];

const mockWeb3Integrations: Web3Integration[] = [
  {
    id: "metamask",
    name: "MetaMask",
    type: "wallet",
    status: "connected",
    network: "Polygon Mainnet",
    balance: "0.45 ETH",
    address: "0x742d35Cc6634C0532925a3b8D3Ac34b3cc66",
    lastSync: "2 minutes ago",
    features: ["Signing", "Balance", "Transactions"],
    gasUsed24h: 0.0023,
    transactions24h: 8,
  },
  {
    id: "ceramic",
    name: "Ceramic Network",
    type: "storage",
    status: "connected",
    network: "IPFS/Ceramic",
    address: "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
    lastSync: "5 minutes ago",
    features: ["Data Streams", "Identity", "Decentralized Storage"],
  },
  {
    id: "worldcoin",
    name: "Worldcoin",
    type: "identity",
    status: "connected",
    network: "World ID",
    address: "world_id_0x1234...5678",
    lastSync: "1 hour ago",
    features: ["Proof of Personhood", "Identity Verification"],
  },
  {
    id: "chainlink",
    name: "Chainlink Oracles",
    type: "oracle",
    status: "syncing",
    network: "Multi-chain",
    address: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    lastSync: "10 minutes ago",
    features: ["Price Feeds", "Conflict Data", "Weather Data"],
  },
];

const mockAPIEndpoints: APIEndpoint[] = [
  {
    path: "/api/v1/conflicts/monitor",
    method: "GET",
    description: "Real-time conflict monitoring data",
    calls24h: 24847,
    avgResponseTime: 156,
    successRate: 99.8,
    rateLimit: 1000,
    authRequired: true,
  },
  {
    path: "/api/v1/peacecoin/balance",
    method: "GET",
    description: "User PeaceCoin balance and transactions",
    calls24h: 18293,
    avgResponseTime: 89,
    successRate: 99.9,
    rateLimit: 500,
    authRequired: true,
  },
  {
    path: "/api/v1/governance/proposals",
    method: "POST",
    description: "Submit governance proposals",
    calls24h: 156,
    avgResponseTime: 234,
    successRate: 98.7,
    rateLimit: 10,
    authRequired: true,
  },
  {
    path: "/api/v1/mediation/sessions",
    method: "POST",
    description: "Create mediation sessions",
    calls24h: 456,
    avgResponseTime: 187,
    successRate: 99.2,
    rateLimit: 50,
    authRequired: true,
  },
];

const mockGovernanceProposals: GovernanceProposal[] = [
  {
    id: "prop-001",
    title: "Upgrade Conflict Prediction Algorithm to v3.0",
    description:
      "Implement new ML model with 95% accuracy for conflict prediction, reducing false positives by 40%",
    type: "protocol",
    sourceRepo: "conflict-ai-ml",
    prNumber: 245,
    author: "dr-alex-chen",
    status: "voting",
    votes: { yes: 1247, no: 156, abstain: 89 },
    deadline: "2024-12-20",
    codeChanges: { additions: 2341, deletions: 567, files: 23 },
  },
  {
    id: "prop-002",
    title: "Increase PeaceCoin Bounty Rewards by 25%",
    description:
      "Boost developer incentives for building peace infrastructure by increasing bounty rewards",
    type: "economic",
    sourceRepo: "paxis-governance",
    author: "community-council",
    status: "approved",
    votes: { yes: 2134, no: 234, abstain: 156 },
    deadline: "2024-12-18",
    codeChanges: { additions: 45, deletions: 12, files: 3 },
  },
];

export default function TechDiplomatDashboard() {
  const { user, earnPeaceCoin, logout } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("command");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [isCreatingBounty, setIsCreatingBounty] = useState(false);
  const [bountyForm, setBountyForm] = useState({
    title: "",
    description: "",
    repository: "",
    type: "feature",
    difficulty: "intermediate",
    reward: 500,
    tags: [],
  });

  const handleLogout = () => {
    logout();
  };

  const handleCreateBounty = () => {
    setIsCreatingBounty(true);
    earnPeaceCoin(100, "Created new development bounty");
  };

  const handleDeployContract = () => {
    earnPeaceCoin(200, "Deployed smart contract to peace protocol");
  };

  const handleSubmitProposal = () => {
    earnPeaceCoin(150, "Submitted governance proposal via GitOps");
  };

  // Mock data for charts
  const developmentTrendData = [
    { date: "Dec 8", commits: 45, issues: 12, prs: 8, bounties: 15 },
    { date: "Dec 9", commits: 52, issues: 8, prs: 12, bounties: 18 },
    { date: "Dec 10", commits: 38, issues: 15, prs: 6, bounties: 22 },
    { date: "Dec 11", commits: 67, issues: 9, prs: 15, bounties: 19 },
    { date: "Dec 12", commits: 71, issues: 6, prs: 11, bounties: 25 },
  ];

  const techMetrics = [
    {
      title: "Active Repositories",
      value: mockRepositories.length.toString(),
      change: 15.2,
      trend: "up" as const,
      subtitle: "Open source peace tools",
      icon: <Github className="h-5 w-5" />,
    },
    {
      title: "API Calls Today",
      value: "43.2K",
      change: 8.7,
      trend: "up" as const,
      subtitle: "PAXIS SDK usage",
      icon: <Terminal className="h-5 w-5" />,
    },
    {
      title: "Peace Bounties",
      value: mockBounties.filter((b) => b.status === "open").length.toString(),
      change: 22.3,
      trend: "up" as const,
      subtitle: `${mockBounties.reduce((sum, b) => sum + b.reward, 0)} PC total`,
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Community Score",
      value: "96%",
      change: 3.1,
      trend: "up" as const,
      subtitle: "Developer satisfaction",
      icon: <Award className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enterprise Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="peace-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Tech Diplomat Development Hub
                </h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Building Peace Infrastructure • {user?.name}</span>
                  <Badge variant="outline">{user?.organization}</Badge>
                  <Badge className="peace-gradient text-white">
                    Level {user?.level} Engineer
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
                      Dev Score
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
                    Tools
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Developer Tools</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Terminal className="mr-2 h-4 w-4" />
                    API Console
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Integration
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Database className="mr-2 h-4 w-4" />
                    Database Access
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {techMetrics.map((metric, index) => (
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
              <Terminal className="h-4 w-4" />
              <span>Command</span>
            </TabsTrigger>
            <TabsTrigger
              value="repositories"
              className="flex items-center space-x-2"
            >
              <Github className="h-4 w-4" />
              <span>Repos</span>
            </TabsTrigger>
            <TabsTrigger
              value="bounties"
              className="flex items-center space-x-2"
            >
              <DollarSign className="h-4 w-4" />
              <span>Bounties</span>
            </TabsTrigger>
            <TabsTrigger value="web3" className="flex items-center space-x-2">
              <Wallet className="h-4 w-4" />
              <span>Web3</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>API</span>
            </TabsTrigger>
            <TabsTrigger
              value="governance"
              className="flex items-center space-x-2"
            >
              <GitPullRequest className="h-4 w-4" />
              <span>GitOps</span>
            </TabsTrigger>
          </TabsList>

          {/* Command Center Tab */}
          <TabsContent value="command" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Development Activity */}
              <div className="xl:col-span-2 space-y-6">
                <TrendChart
                  data={developmentTrendData}
                  title="Development Activity (Last 5 Days)"
                  dataKey="commits"
                  type="line"
                  height={300}
                  color="#10b981"
                />

                <ComparisonChart
                  data={developmentTrendData}
                  title="Engineering Metrics"
                  categories={[
                    { key: "commits", name: "Commits", color: "#10b981" },
                    { key: "prs", name: "Pull Requests", color: "#3b82f6" },
                    { key: "bounties", name: "Bounties", color: "#f59e0b" },
                  ]}
                  height={250}
                />
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Rocket className="h-5 w-5" />
                      <span>Quick Deploy</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={handleDeployContract}
                      className="w-full peace-gradient peace-glow"
                    >
                      <Box className="mr-2 h-4 w-4" />
                      Deploy Smart Contract
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Terminal className="mr-2 h-4 w-4" />
                      Run CI/CD Pipeline
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Database className="mr-2 h-4 w-4" />
                      Update API Docs
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>System Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        service: "PAXIS API",
                        status: "Operational",
                        uptime: "99.9%",
                      },
                      {
                        service: "Smart Contracts",
                        status: "Operational",
                        uptime: "100%",
                      },
                      {
                        service: "ML Models",
                        status: "Operational",
                        uptime: "99.7%",
                      },
                      {
                        service: "Web3 Gateway",
                        status: "Degraded",
                        uptime: "97.2%",
                      },
                    ].map((service) => (
                      <div
                        key={service.service}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium text-sm">
                            {service.service}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {service.uptime} uptime
                          </div>
                        </div>
                        <Badge
                          variant={
                            service.status === "Operational"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            service.status === "Operational"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                        >
                          {service.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Repositories Tab */}
          <TabsContent value="repositories" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Peace Infrastructure Repositories
                </h2>
                <p className="text-muted-foreground">
                  Open source tools for building peaceful, collaborative systems
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  New Repo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockRepositories.map((repo) => (
                <Card
                  key={repo.id}
                  className="overflow-hidden hover:shadow-lg transition-all"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{repo.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {repo.description}
                        </p>
                      </div>
                      <Badge
                        variant={
                          repo.status === "active"
                            ? "default"
                            : repo.status === "stable"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          repo.status === "active"
                            ? "bg-green-100 text-green-800"
                            : repo.status === "stable"
                              ? "bg-blue-100 text-blue-800"
                              : ""
                        }
                      >
                        {repo.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{repo.stars} stars</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GitFork className="h-4 w-4 text-gray-500" />
                          <span>{repo.forks} forks</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Bug className="h-4 w-4 text-red-500" />
                          <span>{repo.issues} issues</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GitPullRequest className="h-4 w-4 text-blue-500" />
                          <span>{repo.pullRequests} PRs</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Test Coverage:</span>
                          <span className="font-medium">{repo.coverage}%</span>
                        </div>
                        <Progress value={repo.coverage} className="h-2" />
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {repo.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {repo.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{repo.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <DollarSign className="h-3 w-3" />
                          <span>{repo.peaceBounty} PC bounty pool</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bounties Tab */}
          <TabsContent value="bounties" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Peace Development Bounties
                </h2>
                <p className="text-muted-foreground">
                  Earn PeaceCoins by building tools for global peace
                  infrastructure
                </p>
              </div>

              <Dialog
                open={isCreatingBounty}
                onOpenChange={setIsCreatingBounty}
              >
                <DialogTrigger asChild>
                  <Button className="peace-gradient peace-glow">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Bounty
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Development Bounty</DialogTitle>
                    <DialogDescription>
                      Set up a bounty to incentivize development of peace
                      infrastructure
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="bounty-title">Title</Label>
                      <Input
                        id="bounty-title"
                        placeholder="e.g., Implement Zero-Knowledge Identity Proof"
                        value={bountyForm.title}
                        onChange={(e) =>
                          setBountyForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bounty-description">Description</Label>
                      <Textarea
                        id="bounty-description"
                        placeholder="Detailed description of the task, requirements, and acceptance criteria..."
                        value={bountyForm.description}
                        onChange={(e) =>
                          setBountyForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="h-24"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bounty-repo">Repository</Label>
                        <Select
                          value={bountyForm.repository}
                          onValueChange={(value) =>
                            setBountyForm((prev) => ({
                              ...prev,
                              repository: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select repository" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockRepositories.map((repo) => (
                              <SelectItem key={repo.id} value={repo.id}>
                                {repo.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bounty-reward">
                          Reward (PeaceCoins)
                        </Label>
                        <Input
                          id="bounty-reward"
                          type="number"
                          value={bountyForm.reward}
                          onChange={(e) =>
                            setBountyForm((prev) => ({
                              ...prev,
                              reward: parseInt(e.target.value),
                            }))
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreatingBounty(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="peace-gradient"
                        onClick={() => {
                          handleCreateBounty();
                          setIsCreatingBounty(false);
                        }}
                      >
                        Create Bounty
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {mockBounties.map((bounty) => (
                <Card key={bounty.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">
                            {bounty.title}
                          </h3>
                          <Badge
                            variant={
                              bounty.priority === "critical"
                                ? "destructive"
                                : bounty.priority === "high"
                                  ? "default"
                                  : bounty.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                            }
                          >
                            {bounty.priority}
                          </Badge>
                          <Badge variant="outline">{bounty.status}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">
                          {bounty.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {bounty.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Repository:
                            </span>
                            <div className="font-medium">
                              {bounty.repository}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Difficulty:
                            </span>
                            <div className="font-medium capitalize">
                              {bounty.difficulty}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Applicants:
                            </span>
                            <div className="font-medium">
                              {bounty.applicants}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Est. Hours:
                            </span>
                            <div className="font-medium">
                              {bounty.estimatedHours}h
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right ml-6">
                        <div className="text-3xl font-bold text-green-600">
                          {bounty.reward}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          PeaceCoins
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Due: {bounty.deadline}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        disabled={bounty.status !== "open"}
                        className={
                          bounty.status === "open" ? "peace-gradient" : ""
                        }
                      >
                        {bounty.status === "open"
                          ? "Apply"
                          : bounty.status === "in-progress"
                            ? "In Progress"
                            : "Completed"}
                      </Button>
                      <Button variant="outline">
                        <Eye className="mr-2 h-3 w-3" />
                        Details
                      </Button>
                      <Button variant="outline">
                        <Github className="mr-2 h-3 w-3" />
                        View Issue
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Web3 Integration Tab */}
          <TabsContent value="web3" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Web3 Infrastructure</h2>
                <p className="text-muted-foreground">
                  Blockchain integrations for decentralized peace protocols
                </p>
              </div>
              <Button className="peace-gradient">
                <Plus className="mr-2 h-4 w-4" />
                Add Integration
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockWeb3Integrations.map((integration) => (
                <Card key={integration.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="peace-gradient w-10 h-10 rounded-lg flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {integration.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground capitalize">
                            {integration.type} • {integration.network}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          integration.status === "connected"
                            ? "default"
                            : integration.status === "syncing"
                              ? "secondary"
                              : "destructive"
                        }
                        className={
                          integration.status === "connected"
                            ? "bg-green-100 text-green-800"
                            : integration.status === "syncing"
                              ? "bg-blue-100 text-blue-800"
                              : ""
                        }
                      >
                        {integration.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {integration.balance && (
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Balance:
                          </span>
                          <div className="font-medium text-lg">
                            {integration.balance}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="text-sm text-muted-foreground">
                          Address:
                        </span>
                        <div className="font-mono text-sm flex items-center space-x-2">
                          <span>{integration.address.slice(0, 20)}...</span>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {(integration.gasUsed24h ||
                        integration.transactions24h) && (
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {integration.gasUsed24h && (
                            <div>
                              <span className="text-muted-foreground">
                                Gas (24h):
                              </span>
                              <div className="font-medium">
                                {integration.gasUsed24h} ETH
                              </div>
                            </div>
                          )}
                          {integration.transactions24h && (
                            <div>
                              <span className="text-muted-foreground">
                                Transactions:
                              </span>
                              <div className="font-medium">
                                {integration.transactions24h}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div>
                        <span className="text-sm text-muted-foreground">
                          Features:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {integration.features.map((feature) => (
                            <Badge
                              key={feature}
                              variant="outline"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="mr-2 h-3 w-3" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* API Management Tab */}
          <TabsContent value="api" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">PAXIS API Management</h2>
                <p className="text-muted-foreground">
                  Monitor and manage API endpoints for peace infrastructure
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  API Docs
                </Button>
                <Button className="peace-gradient">
                  <Key className="mr-2 h-4 w-4" />
                  Generate Key
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {mockAPIEndpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            endpoint.method === "GET"
                              ? "secondary"
                              : endpoint.method === "POST"
                                ? "default"
                                : endpoint.method === "PUT"
                                  ? "outline"
                                  : endpoint.method === "DELETE"
                                    ? "destructive"
                                    : "outline"
                          }
                          className="font-mono"
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="bg-muted px-2 py-1 rounded text-sm">
                          {endpoint.path}
                        </code>
                        {endpoint.authRequired && (
                          <Badge variant="outline" className="text-xs">
                            <Lock className="mr-1 h-3 w-3" />
                            Auth Required
                          </Badge>
                        )}
                      </div>
                      <Badge
                        variant={
                          endpoint.successRate > 99 ? "default" : "destructive"
                        }
                        className={
                          endpoint.successRate > 99
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                      >
                        {endpoint.successRate}% uptime
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4">
                      {endpoint.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Calls (24h):
                        </span>
                        <div className="font-medium">
                          {endpoint.calls24h.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Avg Response:
                        </span>
                        <div className="font-medium">
                          {endpoint.avgResponseTime}ms
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Rate Limit:
                        </span>
                        <div className="font-medium">
                          {endpoint.rateLimit}/min
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Success Rate:
                        </span>
                        <div className="font-medium">
                          {endpoint.successRate}%
                        </div>
                      </div>
                    </div>

                    {endpoint.lastError && (
                      <Alert className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Last error: {endpoint.lastError}
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Governance GitOps Tab */}
          <TabsContent value="governance" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Governance GitOps</h2>
                <p className="text-muted-foreground">
                  Submit governance proposals directly from GitHub pull requests
                </p>
              </div>
              <Button onClick={handleSubmitProposal} className="peace-gradient">
                <GitPullRequest className="mr-2 h-4 w-4" />
                Submit Proposal
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {mockGovernanceProposals.map((proposal) => (
                <Card key={proposal.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">
                            {proposal.title}
                          </h3>
                          <Badge variant="outline" className="capitalize">
                            {proposal.type}
                          </Badge>
                          <Badge
                            variant={
                              proposal.status === "approved"
                                ? "default"
                                : proposal.status === "voting"
                                  ? "secondary"
                                  : proposal.status === "rejected"
                                    ? "destructive"
                                    : "outline"
                            }
                            className={
                              proposal.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : proposal.status === "voting"
                                  ? "bg-blue-100 text-blue-800"
                                  : ""
                            }
                          >
                            {proposal.status}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {proposal.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-muted-foreground">
                              Repository:
                            </span>
                            <div className="font-medium">
                              {proposal.sourceRepo}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Author:
                            </span>
                            <div className="font-medium">{proposal.author}</div>
                          </div>
                          {proposal.prNumber && (
                            <div>
                              <span className="text-muted-foreground">
                                PR Number:
                              </span>
                              <div className="font-medium">
                                #{proposal.prNumber}
                              </div>
                            </div>
                          )}
                          <div>
                            <span className="text-muted-foreground">
                              Deadline:
                            </span>
                            <div className="font-medium">
                              {proposal.deadline}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Files Changed:
                            </span>
                            <div className="font-medium">
                              {proposal.codeChanges.files}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Additions:
                            </span>
                            <div className="font-medium text-green-600">
                              +{proposal.codeChanges.additions}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Deletions:
                            </span>
                            <div className="font-medium text-red-600">
                              -{proposal.codeChanges.deletions}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {proposal.status === "voting" && (
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Voting Progress</span>
                          <span>
                            {proposal.votes.yes +
                              proposal.votes.no +
                              proposal.votes.abstain}{" "}
                            total votes
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 text-sm">
                              Yes ({proposal.votes.yes})
                            </div>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{
                                  width: `${(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain)) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 text-sm">
                              No ({proposal.votes.no})
                            </div>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className="bg-red-500 h-2 rounded-full"
                                style={{
                                  width: `${(proposal.votes.no / (proposal.votes.yes + proposal.votes.no + proposal.votes.abstain)) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      {proposal.status === "voting" && (
                        <>
                          <Button className="peace-gradient">
                            <CheckCircle className="mr-2 h-3 w-3" />
                            Vote Yes
                          </Button>
                          <Button variant="destructive">
                            <X className="mr-2 h-3 w-3" />
                            Vote No
                          </Button>
                        </>
                      )}
                      <Button variant="outline">
                        <Github className="mr-2 h-3 w-3" />
                        View PR
                      </Button>
                      <Button variant="outline">
                        <Eye className="mr-2 h-3 w-3" />
                        Details
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
