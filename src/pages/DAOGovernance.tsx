import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Award,
  TrendingUp,
  Activity,
  Brain,
  Zap,
  Shield,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Clock,
  DollarSign,
  Target,
  Coins,
  Vote,
  Settings,
  Gavel,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Send,
  Calculator,
  Network,
  BarChart3,
  PieChart,
  TrendingDown,
  Globe,
  Scale,
  Crown,
  Megaphone,
} from "lucide-react";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

interface Proposal {
  id: string;
  title: string;
  description: string;
  category:
    | "funding"
    | "policy"
    | "technical"
    | "partnership"
    | "governance"
    | "emergency";
  type: "grant" | "referendum" | "improvement" | "delegation" | "treasury";
  status:
    | "draft"
    | "active"
    | "voting"
    | "passed"
    | "rejected"
    | "executed"
    | "expired";
  priority: "low" | "medium" | "high" | "critical";

  // Proposer
  proposer: {
    id: string;
    name: string;
    reputation: number;
    avatar?: string;
  };

  // Voting mechanics
  votingSystem: "simple" | "quadratic" | "ranked_choice" | "liquid_democracy";
  quorumRequired: number;
  passingThreshold: number; // percentage

  // Timeline
  createdAt: string;
  votingStartsAt: string;
  votingEndsAt: string;
  executionDeadline?: string;

  // Voting data
  votes: {
    for: number;
    against: number;
    abstain: number;
    totalVoters: number;
    quadraticPower: number; // Total quadratic voting power used
  };

  // Financial
  requestedAmount?: number;
  currency: "USD" | "PeaceCoin" | "ETH";
  budgetBreakdown?: BudgetItem[];

  // AI Analysis
  aiAnalysis: {
    riskScore: number; // 0-100
    feasibilityScore: number;
    alignmentScore: number; // with PAXIS mission
    recommendations: string[];
    concerns: string[];
    similarProposals: string[];
  };

  // Discussion
  commentsCount: number;
  lastActivity: string;

  // Execution
  milestones?: Milestone[];
  executionProgress?: number;

  // Trust metrics
  trustVotes: {
    trusted: number;
    untrusted: number;
  };

  metadata: {
    tags: string[];
    regions: string[];
    stakeholders: string[];
    impact: "local" | "regional" | "global";
    urgency: number; // 1-10
  };
}

interface BudgetItem {
  category: string;
  amount: number;
  description: string;
  timeline: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in_progress" | "completed" | "overdue";
  budget: number;
}

interface VoteRecord {
  proposalId: string;
  voter: string;
  choice: "for" | "against" | "abstain";
  quadraticWeight: number;
  timestamp: string;
  reason?: string;
}

export default function DAOGovernance() {
  const { user } = usePaxisAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null,
  );
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showVoteDialog, setShowVoteDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "cards" | "calendar">(
    "cards",
  );
  const [votingPower, setVotingPower] = useState(100); // User's available voting power

  // Mock data for demonstration
  useEffect(() => {
    const mockProposals: Proposal[] = [
      {
        id: "1",
        title: "Expand AI Early Warning System to Southeast Asia",
        description:
          "Proposal to allocate 500,000 PeaceCoins for expanding our conflict prediction AI system to cover Vietnam, Cambodia, and Laos. This will enhance regional stability monitoring and prevent potential conflicts.",
        category: "funding",
        type: "grant",
        status: "voting",
        priority: "high",
        proposer: {
          id: "tech_peace_alex",
          name: "Alex Chen",
          reputation: 87,
          avatar: "https://i.pravatar.cc/150?img=2",
        },
        votingSystem: "quadratic",
        quorumRequired: 500, // minimum voters
        passingThreshold: 60,
        createdAt: "2024-01-15",
        votingStartsAt: "2024-01-18",
        votingEndsAt: "2024-01-25",
        executionDeadline: "2024-03-01",
        votes: {
          for: 342,
          against: 89,
          abstain: 23,
          totalVoters: 454,
          quadraticPower: 1247,
        },
        requestedAmount: 500000,
        currency: "PeaceCoin",
        budgetBreakdown: [
          {
            category: "Development",
            amount: 300000,
            description: "AI model training and development",
            timeline: "3 months",
          },
          {
            category: "Infrastructure",
            amount: 150000,
            description: "Cloud computing and data storage",
            timeline: "12 months",
          },
          {
            category: "Team",
            amount: 50000,
            description: "Local partnerships and training",
            timeline: "6 months",
          },
        ],
        aiAnalysis: {
          riskScore: 25,
          feasibilityScore: 85,
          alignmentScore: 92,
          recommendations: [
            "Consider phased rollout starting with Vietnam",
            "Establish local partnerships for data collection",
            "Include cultural sensitivity training for AI models",
          ],
          concerns: [
            "Data privacy regulations vary by country",
            "Local language processing capabilities needed",
          ],
          similarProposals: [
            "Horn of Africa Early Warning",
            "Pacific Island Monitoring",
          ],
        },
        commentsCount: 47,
        lastActivity: "2024-01-21",
        milestones: [
          {
            id: "m1",
            title: "Partnership Agreements",
            description: "Establish MOUs with regional governments",
            dueDate: "2024-02-15",
            status: "pending",
            budget: 10000,
          },
          {
            id: "m2",
            title: "AI Model Adaptation",
            description: "Adapt existing models for regional context",
            dueDate: "2024-04-01",
            status: "pending",
            budget: 200000,
          },
        ],
        trustVotes: {
          trusted: 89,
          untrusted: 12,
        },
        metadata: {
          tags: [
            "ai",
            "early-warning",
            "southeast-asia",
            "conflict-prevention",
          ],
          regions: ["Southeast Asia"],
          stakeholders: ["Local Governments", "NGOs", "Research Institutions"],
          impact: "regional",
          urgency: 7,
        },
      },
      {
        id: "2",
        title: "Establish Peace Education VR Labs in Colombian Schools",
        description:
          "Create immersive VR peace education programs in 50 Colombian schools to promote reconciliation and conflict resolution skills among youth.",
        category: "policy",
        type: "improvement",
        status: "active",
        priority: "medium",
        proposer: {
          id: "grassroots_maria",
          name: "Maria Santos",
          reputation: 91,
          avatar: "https://i.pravatar.cc/150?img=3",
        },
        votingSystem: "quadratic",
        quorumRequired: 300,
        passingThreshold: 55,
        createdAt: "2024-01-10",
        votingStartsAt: "2024-01-20",
        votingEndsAt: "2024-01-27",
        votes: {
          for: 0,
          against: 0,
          abstain: 0,
          totalVoters: 0,
          quadraticPower: 0,
        },
        requestedAmount: 250000,
        currency: "USD",
        budgetBreakdown: [
          {
            category: "VR Equipment",
            amount: 150000,
            description: "50 VR headsets and supporting hardware",
            timeline: "2 months",
          },
          {
            category: "Content Development",
            amount: 75000,
            description: "Culturally-appropriate VR experiences",
            timeline: "4 months",
          },
          {
            category: "Training",
            amount: 25000,
            description: "Teacher training and ongoing support",
            timeline: "6 months",
          },
        ],
        aiAnalysis: {
          riskScore: 35,
          feasibilityScore: 78,
          alignmentScore: 94,
          recommendations: [
            "Partner with local peace organizations",
            "Include parent and community engagement",
            "Develop metrics for measuring empathy development",
          ],
          concerns: [
            "Technology adoption challenges in rural areas",
            "Need for ongoing technical support",
          ],
          similarProposals: [
            "VR Empathy Nigeria",
            "Digital Peace Education Kenya",
          ],
        },
        commentsCount: 23,
        lastActivity: "2024-01-19",
        trustVotes: {
          trusted: 67,
          untrusted: 8,
        },
        metadata: {
          tags: ["education", "vr", "colombia", "youth", "reconciliation"],
          regions: ["South America"],
          stakeholders: ["Schools", "Teachers", "Students", "Parents"],
          impact: "local",
          urgency: 5,
        },
      },
      {
        id: "3",
        title: "Emergency Response Fund for Climate Conflict Prevention",
        description:
          "Establish a rapid response fund to address climate-induced conflicts before they escalate. Initial funding of 1M PeaceCoins with transparent allocation criteria.",
        category: "emergency",
        type: "treasury",
        status: "passed",
        priority: "critical",
        proposer: {
          id: "peace_architect_sarah",
          name: "Dr. Sarah Williams",
          reputation: 94,
          avatar: "https://i.pravatar.cc/150?img=1",
        },
        votingSystem: "quadratic",
        quorumRequired: 750,
        passingThreshold: 70,
        createdAt: "2024-01-05",
        votingStartsAt: "2024-01-08",
        votingEndsAt: "2024-01-15",
        executionDeadline: "2024-02-01",
        votes: {
          for: 892,
          against: 156,
          abstain: 67,
          totalVoters: 1115,
          quadraticPower: 2847,
        },
        requestedAmount: 1000000,
        currency: "PeaceCoin",
        budgetBreakdown: [
          {
            category: "Emergency Grants",
            amount: 700000,
            description: "Direct funding for urgent interventions",
            timeline: "12 months",
          },
          {
            category: "Rapid Assessment",
            amount: 200000,
            description: "Quick deployment teams and analysis",
            timeline: "6 months",
          },
          {
            category: "Administration",
            amount: 100000,
            description: "Fund management and oversight",
            timeline: "12 months",
          },
        ],
        aiAnalysis: {
          riskScore: 20,
          feasibilityScore: 92,
          alignmentScore: 98,
          recommendations: [
            "Establish clear allocation criteria",
            "Create rapid assessment protocols",
            "Partner with climate monitoring organizations",
          ],
          concerns: [
            "Need for rapid decision-making processes",
            "Risk of fund misallocation under pressure",
          ],
          similarProposals: [
            "Drought Response Africa",
            "Flood Mediation Bangladesh",
          ],
        },
        commentsCount: 156,
        lastActivity: "2024-01-20",
        executionProgress: 15,
        milestones: [
          {
            id: "m3",
            title: "Fund Structure",
            description: "Establish legal and governance structure",
            dueDate: "2024-01-25",
            status: "in_progress",
            budget: 50000,
          },
          {
            id: "m4",
            title: "Criteria Framework",
            description: "Define allocation criteria and processes",
            dueDate: "2024-02-01",
            status: "pending",
            budget: 25000,
          },
        ],
        trustVotes: {
          trusted: 234,
          untrusted: 18,
        },
        metadata: {
          tags: ["emergency", "climate", "prevention", "treasury"],
          regions: ["Global"],
          stakeholders: [
            "Climate Organizations",
            "Emergency Responders",
            "Local Communities",
          ],
          impact: "global",
          urgency: 9,
        },
      },
    ];
    setProposals(mockProposals);
  }, []);

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || proposal.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || proposal.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateProposal = (formData: any) => {
    const newProposal: Proposal = {
      id: Date.now().toString(),
      ...formData,
      proposer: {
        id: user?.id || "unknown",
        name: user?.name || "Unknown User",
        reputation: 50,
      },
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
      votes: {
        for: 0,
        against: 0,
        abstain: 0,
        totalVoters: 0,
        quadraticPower: 0,
      },
      commentsCount: 0,
      lastActivity: new Date().toISOString().split("T")[0],
      trustVotes: {
        trusted: 0,
        untrusted: 0,
      },
      aiAnalysis: {
        riskScore: 50,
        feasibilityScore: 70,
        alignmentScore: 80,
        recommendations: ["AI analysis will be available after review"],
        concerns: ["Pending comprehensive review"],
        similarProposals: [],
      },
    };
    setProposals([...proposals, newProposal]);
    setShowCreateDialog(false);
  };

  const handleVote = (
    proposalId: string,
    choice: "for" | "against" | "abstain",
    weight: number,
  ) => {
    // Calculate quadratic cost
    const quadraticCost = Math.pow(weight, 2);

    if (quadraticCost > votingPower) {
      alert("Insufficient voting power for this weight");
      return;
    }

    // Update proposal votes
    setProposals(
      proposals.map((proposal) => {
        if (proposal.id === proposalId) {
          const newVotes = { ...proposal.votes };
          newVotes[choice] += weight;
          newVotes.totalVoters += 1;
          newVotes.quadraticPower += quadraticCost;

          return {
            ...proposal,
            votes: newVotes,
            lastActivity: new Date().toISOString().split("T")[0],
          };
        }
        return proposal;
      }),
    );

    // Deduct voting power
    setVotingPower(votingPower - quadraticCost);
    setShowVoteDialog(false);
    setSelectedProposal(null);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-gray-100 text-gray-800",
      active: "bg-blue-100 text-blue-800",
      voting: "bg-purple-100 text-purple-800",
      passed: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      executed: "bg-emerald-100 text-emerald-800",
      expired: "bg-orange-100 text-orange-800",
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800",
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const calculateQuadraticCost = (weight: number) => Math.pow(weight, 2);

  const getVotingProgress = (proposal: Proposal) => {
    const totalVotes =
      proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
    return Math.min((totalVotes / proposal.quorumRequired) * 100, 100);
  };

  const getPassingProgress = (proposal: Proposal) => {
    const totalVotes = proposal.votes.for + proposal.votes.against;
    if (totalVotes === 0) return 0;
    return (proposal.votes.for / totalVotes) * 100;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                DAO Governance
              </h1>
              <p className="text-muted-foreground">
                Participate in peace-focused democratic decision making
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  Your Voting Power
                </div>
                <div className="text-2xl font-bold text-primary">
                  {votingPower}
                </div>
              </div>
              <Dialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
              >
                <DialogTrigger asChild>
                  <Button className="peace-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    New Proposal
                  </Button>
                </DialogTrigger>
                <ProposalForm
                  onSubmit={handleCreateProposal}
                  onCancel={() => setShowCreateDialog(false)}
                />
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {proposals.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Proposals</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {proposals.filter((p) => p.status === "voting").length}
              </div>
              <p className="text-sm text-muted-foreground">Active Votes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {proposals.filter((p) => p.status === "passed").length}
              </div>
              <p className="text-sm text-muted-foreground">Passed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">2.5M</div>
              <p className="text-sm text-muted-foreground">Treasury (PC)</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search proposals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="funding">Funding</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="governance">Governance</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="voting">Voting</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="executed">Executed</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                Cards
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("calendar")}
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Proposals Display */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onView={(proposal) => setSelectedProposal(proposal)}
                onVote={(proposal) => {
                  setSelectedProposal(proposal);
                  setShowVoteDialog(true);
                }}
              />
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proposal</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Voting Progress</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProposals.map((proposal) => (
                    <TableRow key={proposal.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium line-clamp-1">
                            {proposal.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            by {proposal.proposer.name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {proposal.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {proposal.votes.totalVoters}/
                            {proposal.quorumRequired} voters
                          </div>
                          <Progress
                            value={getVotingProgress(proposal)}
                            className="h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="text-sm font-medium">
                            {proposal.aiAnalysis.alignmentScore}/100
                          </div>
                          <Brain className="h-4 w-4 mx-auto text-purple-600" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedProposal(proposal)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {proposal.status === "voting" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedProposal(proposal);
                                setShowVoteDialog(true);
                              }}
                            >
                              <Vote className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {viewMode === "calendar" && (
          <Card>
            <CardContent className="p-6">
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    Governance Calendar
                  </h3>
                  <p className="text-muted-foreground">
                    Timeline view of voting periods and execution deadlines
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Proposal Details Modal */}
      <Dialog
        open={!!selectedProposal && !showVoteDialog}
        onOpenChange={() => setSelectedProposal(null)}
      >
        {selectedProposal && (
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <ProposalDetails proposal={selectedProposal} />
          </DialogContent>
        )}
      </Dialog>

      {/* Voting Modal */}
      <Dialog open={showVoteDialog} onOpenChange={setShowVoteDialog}>
        {selectedProposal && (
          <VotingInterface
            proposal={selectedProposal}
            votingPower={votingPower}
            onVote={handleVote}
            onCancel={() => {
              setShowVoteDialog(false);
              setSelectedProposal(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}

// Proposal Card Component
function ProposalCard({
  proposal,
  onView,
  onVote,
}: {
  proposal: Proposal;
  onView: (proposal: Proposal) => void;
  onVote: (proposal: Proposal) => void;
}) {
  const votingProgress = getVotingProgress(proposal);
  const passingProgress = getPassingProgress(proposal);
  const daysLeft = Math.ceil(
    (new Date(proposal.votingEndsAt).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg line-clamp-2">
              {proposal.title}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getStatusColor(proposal.status)}`}>
                {proposal.status}
              </Badge>
              <Badge
                className={`text-xs ${getPriorityColor(proposal.priority)}`}
              >
                {proposal.priority}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">
                {proposal.category}
              </Badge>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-right">
            {proposal.status === "voting" && daysLeft > 0 && (
              <div>{daysLeft} days left</div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {proposal.description}
        </p>

        {/* Proposer */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">by</span>
          <span className="font-medium">{proposal.proposer.name}</span>
          <Badge variant="outline" className="text-xs">
            Rep: {proposal.proposer.reputation}
          </Badge>
        </div>

        {/* Voting Progress */}
        {proposal.status === "voting" && (
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Quorum Progress</span>
                <span>
                  {proposal.votes.totalVoters}/{proposal.quorumRequired}
                </span>
              </div>
              <Progress value={votingProgress} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Support</span>
                <span>{Math.round(passingProgress)}%</span>
              </div>
              <Progress value={passingProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="font-semibold text-green-700">
                  {proposal.votes.for}
                </div>
                <div className="text-green-600">For</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded">
                <div className="font-semibold text-red-700">
                  {proposal.votes.against}
                </div>
                <div className="text-red-600">Against</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-semibold text-gray-700">
                  {proposal.votes.abstain}
                </div>
                <div className="text-gray-600">Abstain</div>
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis Preview */}
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">AI Analysis</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {proposal.aiAnalysis.alignmentScore}/100 alignment
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold">
                {proposal.aiAnalysis.riskScore}
              </div>
              <div className="text-muted-foreground">Risk</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">
                {proposal.aiAnalysis.feasibilityScore}
              </div>
              <div className="text-muted-foreground">Feasibility</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">
                {proposal.aiAnalysis.alignmentScore}
              </div>
              <div className="text-muted-foreground">Mission</div>
            </div>
          </div>
        </div>

        {/* Budget */}
        {proposal.requestedAmount && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Requested:</span>
            <span className="font-medium">
              {proposal.requestedAmount.toLocaleString()} {proposal.currency}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onView(proposal)}
            >
              <Eye className="h-4 w-4 mr-1" />
              Details
            </Button>
            <Button size="sm" variant="outline">
              <MessageSquare className="h-4 w-4 mr-1" />
              {proposal.commentsCount}
            </Button>
          </div>
          {proposal.status === "voting" && (
            <Button
              size="sm"
              className="peace-gradient"
              onClick={() => onVote(proposal)}
            >
              <Vote className="h-4 w-4 mr-1" />
              Vote
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Proposal Details Component
function ProposalDetails({ proposal }: { proposal: Proposal }) {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-2xl">{proposal.title}</DialogTitle>
            <DialogDescription>
              Proposed by {proposal.proposer.name} • {proposal.category} •{" "}
              {new Date(proposal.createdAt).toLocaleDateString()}
            </DialogDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(proposal.status)}>
              {proposal.status}
            </Badge>
            <Badge className={getPriorityColor(proposal.priority)}>
              {proposal.priority}
            </Badge>
          </div>
        </div>
      </DialogHeader>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="voting">Voting</TabsTrigger>
          <TabsTrigger value="ai">AI Analysis</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{proposal.description}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2 capitalize">{proposal.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Impact:</span>
                    <span className="ml-2 capitalize">
                      {proposal.metadata.impact}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Urgency:</span>
                    <span className="ml-2">{proposal.metadata.urgency}/10</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Voting System:
                    </span>
                    <span className="ml-2 capitalize">
                      {proposal.votingSystem.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>
                    {new Date(proposal.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Voting Starts:</span>
                  <span>
                    {new Date(proposal.votingStartsAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Voting Ends:</span>
                  <span>
                    {new Date(proposal.votingEndsAt).toLocaleDateString()}
                  </span>
                </div>
                {proposal.executionDeadline && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Execution By:</span>
                    <span>
                      {new Date(
                        proposal.executionDeadline,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tags & Stakeholders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {proposal.metadata.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Stakeholders</h4>
                <div className="flex flex-wrap gap-1">
                  {proposal.metadata.stakeholders.map((stakeholder, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {stakeholder}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Voting Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>For</span>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={
                          (proposal.votes.for /
                            (proposal.votes.for +
                              proposal.votes.against +
                              proposal.votes.abstain || 1)) *
                          100
                        }
                        className="w-20 h-2"
                      />
                      <span className="font-medium">{proposal.votes.for}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Against</span>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={
                          (proposal.votes.against /
                            (proposal.votes.for +
                              proposal.votes.against +
                              proposal.votes.abstain || 1)) *
                          100
                        }
                        className="w-20 h-2"
                      />
                      <span className="font-medium">
                        {proposal.votes.against}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Abstain</span>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={
                          (proposal.votes.abstain /
                            (proposal.votes.for +
                              proposal.votes.against +
                              proposal.votes.abstain || 1)) *
                          100
                        }
                        className="w-20 h-2"
                      />
                      <span className="font-medium">
                        {proposal.votes.abstain}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voting Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Quorum Required:
                  </span>
                  <span className="font-medium">{proposal.quorumRequired}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Passing Threshold:
                  </span>
                  <span className="font-medium">
                    {proposal.passingThreshold}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Voters:</span>
                  <span className="font-medium">
                    {proposal.votes.totalVoters}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Quadratic Power Used:
                  </span>
                  <span className="font-medium">
                    {proposal.votes.quadraticPower}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quadratic Voting Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Quadratic voting allows you to express the intensity of your
                preferences. The cost of your vote increases quadratically with
                the weight you assign.
              </p>
              <div className="bg-muted p-3 rounded text-sm">
                <div className="font-medium mb-2">Cost Formula: Weight²</div>
                <div className="space-y-1">
                  <div>1 vote = 1 power</div>
                  <div>2 votes = 4 power</div>
                  <div>3 votes = 9 power</div>
                  <div>4 votes = 16 power</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-600">
                  {proposal.aiAnalysis.riskScore}
                </div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Lower is better
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {proposal.aiAnalysis.feasibilityScore}
                </div>
                <p className="text-sm text-muted-foreground">Feasibility</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Implementation likelihood
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {proposal.aiAnalysis.alignmentScore}
                </div>
                <p className="text-sm text-muted-foreground">
                  Mission Alignment
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PAXIS goals compatibility
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proposal.aiAnalysis.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-green-50 rounded"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Concerns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proposal.aiAnalysis.concerns.map((concern, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-yellow-50 rounded"
                  >
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{concern}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          {proposal.budgetBreakdown && (
            <Card>
              <CardHeader>
                <CardTitle>Budget Breakdown</CardTitle>
                <CardDescription>
                  Total: {proposal.requestedAmount?.toLocaleString()}{" "}
                  {proposal.currency}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposal.budgetBreakdown.map((item, index) => (
                    <div key={index} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{item.category}</h4>
                        <span className="font-bold">
                          {item.amount.toLocaleString()} {proposal.currency}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {item.description}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {item.timeline}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          {proposal.milestones && (
            <div className="space-y-4">
              {proposal.milestones.map((milestone, index) => (
                <Card key={milestone.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{milestone.title}</h3>
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {milestone.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Due Date:
                            </span>
                            <span className="ml-2">
                              {new Date(milestone.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Budget:
                            </span>
                            <span className="ml-2">
                              {milestone.budget.toLocaleString()}{" "}
                              {proposal.currency}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="discussion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Discussion ({proposal.commentsCount} comments)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Discussion interface would be implemented here with real-time
                comments, threading, and AI moderation features.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Voting Interface Component
function VotingInterface({
  proposal,
  votingPower,
  onVote,
  onCancel,
}: {
  proposal: Proposal;
  votingPower: number;
  onVote: (
    proposalId: string,
    choice: "for" | "against" | "abstain",
    weight: number,
  ) => void;
  onCancel: () => void;
}) {
  const [choice, setChoice] = useState<"for" | "against" | "abstain">("for");
  const [weight, setWeight] = useState([1]);
  const [reason, setReason] = useState("");

  const quadraticCost = calculateQuadraticCost(weight[0]);
  const canVote = quadraticCost <= votingPower;

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Cast Your Vote</DialogTitle>
        <DialogDescription>
          Use quadratic voting to express the intensity of your preference
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{proposal.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {proposal.description}
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">Your Choice</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Button
                variant={choice === "for" ? "default" : "outline"}
                className={
                  choice === "for" ? "bg-green-600 hover:bg-green-700" : ""
                }
                onClick={() => setChoice("for")}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                For
              </Button>
              <Button
                variant={choice === "against" ? "default" : "outline"}
                className={
                  choice === "against" ? "bg-red-600 hover:bg-red-700" : ""
                }
                onClick={() => setChoice("against")}
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                Against
              </Button>
              <Button
                variant={choice === "abstain" ? "default" : "outline"}
                className={
                  choice === "abstain" ? "bg-gray-600 hover:bg-gray-700" : ""
                }
                onClick={() => setChoice("abstain")}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Abstain
              </Button>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium">
              Vote Weight: {weight[0]}
            </Label>
            <div className="mt-2">
              <Slider
                value={weight}
                onValueChange={setWeight}
                max={Math.floor(Math.sqrt(votingPower))}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>1</span>
              <span>{Math.floor(Math.sqrt(votingPower))}</span>
            </div>
          </div>

          <Card className={`p-4 ${canVote ? "bg-green-50" : "bg-red-50"}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Quadratic Cost</div>
                <div className="text-sm text-muted-foreground">
                  {weight[0]} vote(s) = {quadraticCost} power
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">Remaining Power</div>
                <div
                  className={`text-sm ${canVote ? "text-green-600" : "text-red-600"}`}
                >
                  {votingPower - quadraticCost}
                </div>
              </div>
            </div>
          </Card>

          <div>
            <Label htmlFor="reason">Reason (Optional)</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Share your reasoning for this vote..."
              className="mt-1"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="peace-gradient"
            disabled={!canVote}
            onClick={() => onVote(proposal.id, choice, weight[0])}
          >
            <Vote className="h-4 w-4 mr-2" />
            Cast Vote
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

// Proposal Form Component
function ProposalForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "funding",
    type: "grant",
    priority: "medium",
    votingSystem: "quadratic",
    quorumRequired: 100,
    passingThreshold: 60,
    votingDuration: 7, // days
    requestedAmount: 0,
    currency: "PeaceCoin",
    tags: "",
    regions: "",
    stakeholders: "",
    impact: "local",
    urgency: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      votingStartsAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // Tomorrow
      votingEndsAt: new Date(
        Date.now() + (formData.votingDuration + 1) * 24 * 60 * 60 * 1000,
      )
        .toISOString()
        .split("T")[0],
      metadata: {
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        regions: formData.regions
          .split(",")
          .map((r) => r.trim())
          .filter((r) => r),
        stakeholders: formData.stakeholders
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        impact: formData.impact,
        urgency: formData.urgency,
      },
    };
    onSubmit(submitData);
  };

  return (
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Create New Proposal</DialogTitle>
        <DialogDescription>
          Submit a proposal for DAO consideration and voting
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Proposal Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="funding">Funding</SelectItem>
                <SelectItem value="policy">Policy</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
                <SelectItem value="governance">Governance</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grant">Grant</SelectItem>
                <SelectItem value="referendum">Referendum</SelectItem>
                <SelectItem value="improvement">Improvement</SelectItem>
                <SelectItem value="delegation">Delegation</SelectItem>
                <SelectItem value="treasury">Treasury</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData({ ...formData, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="requestedAmount">Requested Amount (Optional)</Label>
            <Input
              id="requestedAmount"
              type="number"
              value={formData.requestedAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  requestedAmount: parseInt(e.target.value) || 0,
                })
              }
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={formData.currency}
              onValueChange={(value) =>
                setFormData({ ...formData, currency: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PeaceCoin">PeaceCoin</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="ETH">ETH</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quorumRequired">Quorum Required</Label>
            <Input
              id="quorumRequired"
              type="number"
              value={formData.quorumRequired}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quorumRequired: parseInt(e.target.value) || 100,
                })
              }
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="passingThreshold">Passing Threshold (%)</Label>
            <Input
              id="passingThreshold"
              type="number"
              value={formData.passingThreshold}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passingThreshold: parseInt(e.target.value) || 60,
                })
              }
              min="1"
              max="100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="votingDuration">Voting Duration (days)</Label>
            <Input
              id="votingDuration"
              type="number"
              value={formData.votingDuration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  votingDuration: parseInt(e.target.value) || 7,
                })
              }
              min="1"
              max="30"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="e.g., ai, water, conflict-prevention"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="regions">Regions (comma-separated)</Label>
            <Input
              id="regions"
              value={formData.regions}
              onChange={(e) =>
                setFormData({ ...formData, regions: e.target.value })
              }
              placeholder="e.g., Southeast Asia, Africa"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stakeholders">Stakeholders (comma-separated)</Label>
            <Input
              id="stakeholders"
              value={formData.stakeholders}
              onChange={(e) =>
                setFormData({ ...formData, stakeholders: e.target.value })
              }
              placeholder="e.g., NGOs, Local Governments"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="impact">Impact Level</Label>
            <Select
              value={formData.impact}
              onValueChange={(value) =>
                setFormData({ ...formData, impact: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="regional">Regional</SelectItem>
                <SelectItem value="global">Global</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency (1-10): {formData.urgency}</Label>
            <Slider
              value={[formData.urgency]}
              onValueChange={(value) =>
                setFormData({ ...formData, urgency: value[0] })
              }
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="peace-gradient">
            Submit Proposal
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}

// Helper functions
function getVotingProgress(proposal: Proposal) {
  const totalVotes =
    proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
  return Math.min((totalVotes / proposal.quorumRequired) * 100, 100);
}

function getPassingProgress(proposal: Proposal) {
  const totalVotes = proposal.votes.for + proposal.votes.against;
  if (totalVotes === 0) return 0;
  return (proposal.votes.for / totalVotes) * 100;
}

function getStatusColor(status: string) {
  const colors = {
    draft: "bg-gray-100 text-gray-800",
    active: "bg-blue-100 text-blue-800",
    voting: "bg-purple-100 text-purple-800",
    passed: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    executed: "bg-emerald-100 text-emerald-800",
    expired: "bg-orange-100 text-orange-800",
  };
  return colors[status as keyof typeof colors] || colors.draft;
}

function getPriorityColor(priority: string) {
  const colors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  };
  return colors[priority as keyof typeof colors] || colors.medium;
}

function calculateQuadraticCost(weight: number) {
  return Math.pow(weight, 2);
}
