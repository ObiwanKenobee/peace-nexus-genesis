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
  Vote,
  Users,
  Gavel,
  Calendar,
  TrendingUp,
  Shield,
  Globe,
  Zap,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  UserCheck,
  Send,
  PlusCircle,
  BarChart,
  Award,
  Target,
  Coins,
} from "lucide-react";

const Governance = () => {
  const activeProposals = [
    {
      id: "PROP-2024-001",
      title: "Universal Basic Energy Access Protocol",
      description:
        "Establish minimum energy allocation guarantee for all verified community nodes in the PAXIS network",
      category: "Resource Commons",
      proposer: "European Energy Collective",
      status: "Active Voting",
      votesFor: 18947,
      votesAgainst: 3241,
      votesAbstain: 892,
      totalVotes: 23080,
      quorum: 25000,
      timeLeft: "2 days, 14 hours",
      support: 82.1,
      requiredMajority: 75,
      peaceCoinsStaked: "2.4M PC",
      councilEndorsement: true,
    },
    {
      id: "PROP-2024-002",
      title: "Emergency Resource Reallocation AI",
      description:
        "Deploy autonomous AI system for rapid resource redistribution during humanitarian crises",
      category: "AI Governance",
      proposer: "Global Crisis Response DAO",
      status: "Council Review",
      votesFor: 15623,
      votesAgainst: 2847,
      votesAbstain: 1203,
      totalVotes: 19673,
      quorum: 25000,
      timeLeft: "5 days, 8 hours",
      support: 79.4,
      requiredMajority: 80,
      peaceCoinsStaked: "1.8M PC",
      councilEndorsement: false,
    },
    {
      id: "PROP-2024-003",
      title: "Expand VR Empathy Labs to Schools",
      description:
        "Fund integration of PAXIS VR empathy education in global educational institutions",
      category: "Education",
      proposer: "Peace Education Alliance",
      status: "Draft",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      totalVotes: 0,
      quorum: 25000,
      timeLeft: "Not yet opened",
      support: 0,
      requiredMajority: 65,
      peaceCoinsStaked: "500K PC",
      councilEndorsement: null,
    },
  ];

  const councilMembers = [
    {
      type: "Citizens Council",
      representatives: 47,
      regions: "Global",
      votingPower: "35%",
      term: "12 months",
      nextElection: "Sep 2024",
      status: "Active",
    },
    {
      type: "NGO Alliance",
      representatives: 23,
      regions: "International",
      votingPower: "25%",
      term: "12 months",
      nextElection: "Nov 2024",
      status: "Active",
    },
    {
      type: "Indigenous Councils",
      representatives: 15,
      regions: "Traditional Territories",
      votingPower: "20%",
      term: "Traditional",
      nextElection: "Ongoing",
      status: "Active",
    },
    {
      type: "Nation Delegates",
      representatives: 89,
      regions: "194 Countries",
      votingPower: "15%",
      term: "24 months",
      nextElection: "Mar 2025",
      status: "Active",
    },
    {
      type: "Youth Council",
      representatives: 12,
      regions: "Global",
      votingPower: "5%",
      term: "6 months",
      nextElection: "Feb 2024",
      status: "Active",
    },
  ];

  const governanceMetrics = [
    { metric: "Total DAO Members", value: "247,883", trend: "+12%" },
    { metric: "Active Voters", value: "89,432", trend: "+8%" },
    { metric: "Proposals This Quarter", value: "47", trend: "+23%" },
    { metric: "Passed Proposals", value: "34", trend: "+15%" },
  ];

  const recentDecisions = [
    {
      title: "PeaceCoin Mining Rewards Update",
      result: "Passed",
      votes: "45,678",
      support: "87%",
      date: "Jan 15, 2024",
      category: "Tokenomics",
    },
    {
      title: "AI Mediation Training Expansion",
      result: "Passed",
      votes: "38,912",
      support: "91%",
      date: "Jan 10, 2024",
      category: "AI Development",
    },
    {
      title: "Cross-Border Water Rights Framework",
      result: "Failed",
      votes: "29,384",
      support: "58%",
      date: "Jan 5, 2024",
      category: "Policy",
    },
    {
      title: "Conflict Prevention AI Ethics",
      result: "Passed",
      votes: "52,134",
      support: "94%",
      date: "Dec 28, 2023",
      category: "Ethics",
    },
  ];

  const delegationOptions = [
    {
      delegate: "Dr. Maria Santos",
      expertise: "Environmental Law",
      reputation: 98,
      votingRecord: "234 votes",
      alignment: "95% with your preferences",
      followers: "1,247",
    },
    {
      delegate: "Prof. Kwame Asante",
      expertise: "Cultural Mediation",
      reputation: 96,
      votingRecord: "189 votes",
      alignment: "89% with your preferences",
      followers: "892",
    },
    {
      delegate: "Elder Sarah Crow Feather",
      expertise: "Indigenous Governance",
      reputation: 99,
      votingRecord: "156 votes",
      alignment: "92% with your preferences",
      followers: "2,134",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">PAXIS DAO Governance</h1>
          <p className="text-muted-foreground">
            Decentralized decision-making for global peace infrastructure
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {governanceMetrics.map((metric, index) => (
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

        <Tabs defaultValue="proposals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="council">Council</TabsTrigger>
            <TabsTrigger value="voting">My Voting</TabsTrigger>
            <TabsTrigger value="delegation">Delegation</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="proposals" className="space-y-6">
            <div className="space-y-6">
              {activeProposals.map((proposal, index) => (
                <Card key={index} className="relative">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">
                            {proposal.title}
                          </CardTitle>
                          <Badge
                            variant={
                              proposal.status === "Active Voting"
                                ? "default"
                                : proposal.status === "Council Review"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {proposal.status}
                          </Badge>
                        </div>
                        <CardDescription>
                          {proposal.description}
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>ID: {proposal.id}</span>
                          <span>•</span>
                          <span>By: {proposal.proposer}</span>
                          <span>•</span>
                          <Badge variant="outline">{proposal.category}</Badge>
                        </div>
                      </div>
                      {proposal.councilEndorsement === true && (
                        <Badge variant="default" className="bg-green-600">
                          Council Endorsed
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-4">
                        {proposal.status === "Active Voting" && (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">
                                Voting Progress
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {proposal.totalVotes.toLocaleString()} /{" "}
                                {proposal.quorum.toLocaleString()} votes
                              </span>
                            </div>
                            <Progress
                              value={
                                (proposal.totalVotes / proposal.quorum) * 100
                              }
                              className="mb-2"
                            />
                            <div className="text-xs text-muted-foreground">
                              Quorum:{" "}
                              {(
                                (proposal.totalVotes / proposal.quorum) *
                                100
                              ).toFixed(1)}
                              %
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Support</span>
                            <span className="text-sm font-medium">
                              {proposal.support}%
                            </span>
                          </div>
                          <Progress value={proposal.support} className="mb-2" />
                          <div className="text-xs text-muted-foreground">
                            Required: {proposal.requiredMajority}%
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">
                              {proposal.votesFor.toLocaleString()}
                            </div>
                            <div className="text-muted-foreground">For</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-red-600">
                              {proposal.votesAgainst.toLocaleString()}
                            </div>
                            <div className="text-muted-foreground">Against</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-600">
                              {proposal.votesAbstain.toLocaleString()}
                            </div>
                            <div className="text-muted-foreground">Abstain</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-sm">
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">
                              Time Remaining:
                            </span>
                            <span className="font-medium">
                              {proposal.timeLeft}
                            </span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-muted-foreground">
                              PC Staked:
                            </span>
                            <span className="font-medium">
                              {proposal.peaceCoinsStaked}
                            </span>
                          </div>
                        </div>

                        {proposal.status === "Active Voting" && (
                          <div className="space-y-2">
                            <Button className="w-full" variant="default">
                              <Vote className="h-4 w-4 mr-2" />
                              Vote For
                            </Button>
                            <Button className="w-full" variant="destructive">
                              <Vote className="h-4 w-4 mr-2" />
                              Vote Against
                            </Button>
                            <Button className="w-full" variant="outline">
                              Abstain
                            </Button>
                          </div>
                        )}

                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="council" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Peace Council Composition
                </CardTitle>
                <CardDescription>
                  Diverse representation across global communities and
                  organizations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {councilMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{member.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {member.representatives} representatives •{" "}
                            {member.regions}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Term: {member.term} • Next Election:{" "}
                            {member.nextElection}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-primary text-lg">
                          {member.votingPower}
                        </div>
                        <Badge
                          variant={
                            member.status === "Active" ? "default" : "secondary"
                          }
                        >
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Your Voting Record
                  </CardTitle>
                  <CardDescription>
                    Track your participation and voting history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Participation Rate</span>
                        <span className="font-semibold text-primary">87%</span>
                      </div>
                      <Progress value={87} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          23
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Votes Cast
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">
                          847
                        </div>
                        <div className="text-sm text-muted-foreground">
                          PC Earned
                        </div>
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">
                          Voting Power:
                        </span>
                        <span className="font-medium">2,450 PC</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">
                          Reputation Score:
                        </span>
                        <span className="font-medium">94/100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Voting History
                  </CardTitle>
                  <CardDescription>
                    Your votes on recent proposals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentDecisions.map((decision, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div>
                          <div className="font-medium text-sm">
                            {decision.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {decision.date} • {decision.category}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              decision.result === "Passed"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {decision.result}
                          </Badge>
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="delegation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Delegate Your Vote
                </CardTitle>
                <CardDescription>
                  Choose trusted experts to vote on your behalf when you're
                  unavailable
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {delegationOptions.map((delegate, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{delegate.delegate}</h3>
                          <p className="text-sm text-muted-foreground">
                            {delegate.expertise}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Rep: {delegate.reputation}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">
                            Voting Record:
                          </span>
                          <div className="font-medium">
                            {delegate.votingRecord}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Followers:
                          </span>
                          <div className="font-medium">
                            {delegate.followers}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="text-sm text-muted-foreground">
                          Alignment:{" "}
                        </span>
                        <span className="text-sm font-medium text-primary">
                          {delegate.alignment}
                        </span>
                      </div>

                      <Button variant="outline" className="w-full">
                        Delegate to {delegate.delegate.split(" ")[1]}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  Create New Proposal
                </CardTitle>
                <CardDescription>
                  Submit a proposal for community consideration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="proposal-title">Proposal Title</Label>
                  <Input
                    id="proposal-title"
                    placeholder="Brief, descriptive title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proposal-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="governance">Governance</SelectItem>
                      <SelectItem value="resources">
                        Resource Commons
                      </SelectItem>
                      <SelectItem value="ai">AI Development</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="tokenomics">Tokenomics</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proposal-description">Description</Label>
                  <Textarea
                    id="proposal-description"
                    placeholder="Detailed explanation of the proposal, its benefits, and implementation plan..."
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="voting-period">Voting Period (days)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="21">21 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stake-amount">Stake Amount (PC)</Label>
                    <Input
                      id="stake-amount"
                      placeholder="Minimum 1,000 PC"
                      type="number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="implementation">Implementation Details</Label>
                  <Textarea
                    id="implementation"
                    placeholder="How will this proposal be implemented? Timeline, resources needed, etc."
                    rows={4}
                  />
                </div>

                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Proposal Requirements</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Minimum 1,000 PC stake required</li>
                    <li>• Must align with PAXIS peace mission</li>
                    <li>• Clear implementation plan needed</li>
                    <li>• Community feedback period before voting</li>
                  </ul>
                </div>

                <Button className="w-full peace-gradient">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Proposal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Governance Health
                  </CardTitle>
                  <CardDescription>
                    Key metrics for DAO performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Voter Turnout</span>
                        <span className="font-semibold text-primary">76%</span>
                      </div>
                      <Progress value={76} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Proposal Success Rate</span>
                        <span className="font-semibold text-accent">72%</span>
                      </div>
                      <Progress value={72} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Community Engagement</span>
                        <span className="font-semibold text-green-600">
                          89%
                        </span>
                      </div>
                      <Progress value={89} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Delegate Satisfaction</span>
                        <span className="font-semibold text-primary">94%</span>
                      </div>
                      <Progress value={94} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Top Contributors
                  </CardTitle>
                  <CardDescription>
                    Most active DAO participants this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Dr. Elena Rodriguez</div>
                        <div className="text-sm text-muted-foreground">
                          15 proposals, 94% participation
                        </div>
                      </div>
                      <Badge className="peace-gradient text-white border-none">
                        1,240 PC
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Prof. Wei Chen</div>
                        <div className="text-sm text-muted-foreground">
                          8 proposals, 100% participation
                        </div>
                      </div>
                      <Badge className="peace-gradient text-white border-none">
                        890 PC
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Ubuntu Collective</div>
                        <div className="text-sm text-muted-foreground">
                          12 proposals, 87% participation
                        </div>
                      </div>
                      <Badge className="peace-gradient text-white border-none">
                        756 PC
                      </Badge>
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

export default Governance;
