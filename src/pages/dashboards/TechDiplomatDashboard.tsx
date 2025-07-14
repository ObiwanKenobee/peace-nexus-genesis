import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
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
} from "lucide-react";

const sdkMetrics = [
  { title: "API Calls Today", value: "24.8K", change: "+12%", trend: "up" },
  { title: "Active Integrations", value: "156", change: "+8", trend: "up" },
  { title: "Peace Tools Built", value: "89", change: "+5", trend: "up" },
  { title: "Community Score", value: "94%", change: "+2%", trend: "up" },
];

const activeBounties = [
  {
    id: 1,
    title: "Zero-Knowledge Proof Module for Refugee Identity",
    reward: 500,
    difficulty: "Advanced",
    applicants: 12,
    deadline: "2 weeks",
    tags: ["ZK-Proofs", "Identity", "Privacy"],
  },
  {
    id: 2,
    title: "Conflict Early Warning API Integration",
    reward: 300,
    difficulty: "Intermediate",
    applicants: 8,
    deadline: "1 week",
    tags: ["API", "Machine Learning", "Data"],
  },
  {
    id: 3,
    title: "Mobile dApp for Offline Peace Mediation",
    reward: 800,
    difficulty: "Expert",
    applicants: 6,
    deadline: "3 weeks",
    tags: ["Mobile", "Offline-First", "React Native"],
  },
];

const githubProjects = [
  {
    name: "peace-protocol",
    description: "Core smart contracts for peace agreements",
    stars: 234,
    forks: 67,
    language: "Solidity",
    status: "Active Development",
  },
  {
    name: "conflict-ai-detector",
    description: "ML models for early conflict detection",
    stars: 189,
    forks: 43,
    language: "Python",
    status: "Stable",
  },
  {
    name: "paxis-sdk",
    description: "JavaScript SDK for peace applications",
    stars: 156,
    forks: 89,
    language: "TypeScript",
    status: "Beta",
  },
];

const recentCommits = [
  {
    project: "peace-protocol",
    message: "Add multi-party signature validation",
    time: "2 hours ago",
    author: "alex-dev",
  },
  {
    project: "paxis-sdk",
    message: "Implement conflict resolution hooks",
    time: "4 hours ago",
    author: "maria-code",
  },
  {
    project: "conflict-ai-detector",
    message: "Improve prediction accuracy by 12%",
    time: "1 day ago",
    author: "dr-smith",
  },
];

const web3Integrations = [
  {
    name: "MetaMask",
    status: "Connected",
    balance: "0.45 ETH",
    network: "Polygon",
  },
  {
    name: "WalletConnect",
    status: "Connected",
    balance: "1,200 MATIC",
    network: "Polygon",
  },
  { name: "Ceramic Network", status: "Active", streams: 23, network: "IPFS" },
];

export default function TechDiplomatDashboard() {
  const { user, earnPeaceCoin } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleCreateBounty = () => {
    earnPeaceCoin(100, "Created new development bounty");
  };

  const handleDeployContract = () => {
    earnPeaceCoin(200, "Deployed smart contract to peace protocol");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tech Diplomat Workspace
            </h1>
            <p className="text-gray-600">
              Building peace infrastructure • {user?.name} •{" "}
              {user?.organization}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-100 text-green-800">
              Level {user?.level} Developer
            </Badge>
            <div className="text-right">
              <div className="text-sm font-medium">
                {user?.peaceCoinBalance} PeaceCoins
              </div>
              <div className="text-xs text-gray-500">
                Open Source Score: {user?.contributionScore}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {sdkMetrics.map((metric, index) => (
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
                  <Code className="w-8 h-8 text-green-600" />
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
            <TabsTrigger value="bounties">Issue Bounties</TabsTrigger>
            <TabsTrigger value="github">GitHub Projects</TabsTrigger>
            <TabsTrigger value="web3">Web3 & Wallets</TabsTrigger>
            <TabsTrigger value="sdk">PAXIS SDK</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Development Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GitBranch className="w-5 h-5" />
                    <span>Recent Commits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCommits.map((commit, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 border rounded-lg"
                      >
                        <div className="bg-green-100 p-1 rounded">
                          <Github className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {commit.message}
                          </div>
                          <div className="text-xs text-gray-500">
                            {commit.project} • by {commit.author} •{" "}
                            {commit.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Web3 Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5" />
                    <span>Web3 Connections</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {web3Integrations.map((integration, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-sm">
                            {integration.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {integration.balance && `${integration.balance} • `}
                            {integration.network}
                            {integration.streams &&
                              ` • ${integration.streams} streams`}
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {integration.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Development Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    onClick={handleCreateBounty}
                  >
                    <DollarSign className="w-6 h-6" />
                    <span>Create Issue Bounty</span>
                    <span className="text-xs text-gray-500">
                      Earn 100 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleDeployContract}
                  >
                    <Box className="w-6 h-6" />
                    <span>Deploy Smart Contract</span>
                    <span className="text-xs text-gray-500">
                      Earn 200 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                  >
                    <Play className="w-6 h-6" />
                    <span>Run Integration Test</span>
                    <span className="text-xs text-gray-500">
                      Verify peace tools
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bounties Tab */}
          <TabsContent value="bounties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Peace Development Bounties
              </h2>
              <Button onClick={handleCreateBounty}>
                <Plus className="w-4 h-4 mr-2" />
                Create Bounty
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {activeBounties.map((bounty) => (
                <Card key={bounty.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          {bounty.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {bounty.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {bounty.applicants} applicants
                          </span>
                          <span>Deadline: {bounty.deadline}</span>
                          <Badge
                            variant={
                              bounty.difficulty === "Expert"
                                ? "destructive"
                                : bounty.difficulty === "Advanced"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {bounty.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {bounty.reward} PC
                        </div>
                        <div className="text-sm text-gray-500">PeaceCoins</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">Apply</Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* GitHub Tab */}
          <TabsContent value="github" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Peace Tech Repositories</h2>
              <Button variant="outline">
                <Github className="w-4 h-4 mr-2" />
                Connect GitHub
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {githubProjects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{project.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {project.description}
                        </p>
                      </div>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {project.stars}
                      </span>
                      <span className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {project.forks}
                      </span>
                      <span>{project.language}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Clone
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Web3 Tab */}
          <TabsContent value="web3" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Smart Contract Deployment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium">Peace Protocol v2.1</div>
                      <div className="text-sm text-gray-600">
                        Multi-signature peace agreements
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          Gas estimate: 0.045 ETH
                        </span>
                        <Button size="sm">Deploy</Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium">Conflict Oracle v1.3</div>
                      <div className="text-sm text-gray-600">
                        Real-time conflict data feeds
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          Gas estimate: 0.032 ETH
                        </span>
                        <Button size="sm" variant="outline">
                          Deploy
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Zero-Knowledge Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium">Refugee Identity Proof</div>
                      <div className="text-sm text-gray-600">
                        Privacy-preserving identity verification
                      </div>
                      <div className="mt-2">
                        <Progress value={75} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">
                          75% complete
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="font-medium">Conflict Witness ZK</div>
                      <div className="text-sm text-gray-600">
                        Anonymous conflict reporting
                      </div>
                      <div className="mt-2">
                        <Progress value={45} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">
                          45% complete
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SDK Tab */}
          <TabsContent value="sdk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PAXIS SDK Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">API Endpoints</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>/api/conflicts</span>
                        <span className="text-green-600">24.8K calls</span>
                      </div>
                      <div className="flex justify-between">
                        <span>/api/peacecoin</span>
                        <span className="text-green-600">18.2K calls</span>
                      </div>
                      <div className="flex justify-between">
                        <span>/api/mediation</span>
                        <span className="text-green-600">12.5K calls</span>
                      </div>
                      <div className="flex justify-between">
                        <span>/api/governance</span>
                        <span className="text-green-600">8.9K calls</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Integration Status</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">React Components</span>
                        <Badge variant="secondary">Stable</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Vue Components</span>
                        <Badge variant="outline">Beta</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Mobile SDK</span>
                        <Badge variant="outline">Alpha</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Python SDK</span>
                        <Badge variant="secondary">Stable</Badge>
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
