import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  DollarSign,
  TrendingUp,
  Shield,
  BarChart3,
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  Globe,
  Award,
  Eye,
  Download,
  Plus,
  Vote,
  FileText,
  Calculator,
  Banknote,
  PieChart,
  Activity,
  Briefcase,
  LogOut,
} from "lucide-react";

const portfolioMetrics = [
  { title: "Portfolio Value", value: "$45.8M", change: "+18%", trend: "up" },
  { title: "Peace ROI", value: "286%", change: "+34%", trend: "up" },
  { title: "Active Investments", value: "67", change: "+12", trend: "up" },
  { title: "Due Diligence Score", value: "94%", change: "+6%", trend: "up" },
];

const activeInvestments = [
  {
    id: 1,
    company: "Sahel Water Collective",
    sector: "Water Security",
    stage: "Series A",
    investment: "$2.4M",
    valuation: "$12M",
    peaceImpact: 89,
    riskScore: 23,
    expectedROI: 340,
    communities: 245,
    milestones: ["Product Launch", "Market Expansion", "Impact Validation"],
    currentMilestone: 2,
    geography: "West Africa",
    timeline: "18 months",
  },
  {
    id: 2,
    company: "Climate Resilience Farms",
    sector: "Agriculture Tech",
    stage: "Seed",
    investment: "$890K",
    valuation: "$4.5M",
    peaceImpact: 76,
    riskScore: 34,
    expectedROI: 280,
    communities: 89,
    milestones: ["MVP", "Pilot Testing", "Scale Strategy"],
    currentMilestone: 1,
    geography: "Horn of Africa",
    timeline: "24 months",
  },
  {
    id: 3,
    company: "Youth Bridge Employment",
    sector: "EdTech",
    stage: "Growth",
    investment: "$1.8M",
    valuation: "$8.9M",
    peaceImpact: 92,
    riskScore: 18,
    expectedROI: 420,
    communities: 156,
    milestones: ["Platform Launch", "Scale-Up", "International Expansion"],
    currentMilestone: 3,
    geography: "Middle East",
    timeline: "12 months",
  },
];

const daoProposals = [
  {
    id: 1,
    title: "Peace Innovation Fund - Q2 Allocation",
    description: "Allocate $5M for conflict prevention technology startups",
    amount: "$5,000,000",
    votes: 234,
    approval: 87,
    yourVote: null,
    deadline: "3 days",
    category: "Funding",
    submitter: "Peace Innovation Committee",
    requiredStake: "10K PC",
  },
  {
    id: 2,
    title: "Enhanced Due Diligence Framework",
    description:
      "Implement AI-powered risk assessment for peace impact investments",
    amount: "$750,000",
    votes: 189,
    approval: 94,
    yourVote: "approve",
    deadline: "1 week",
    category: "Governance",
    submitter: "Risk Assessment Working Group",
    requiredStake: "5K PC",
  },
  {
    id: 3,
    title: "Community Validator Network Expansion",
    description: "Onboard 50 new community validators across conflict regions",
    amount: "$1,200,000",
    votes: 156,
    approval: 76,
    yourVote: null,
    deadline: "5 days",
    category: "Network Growth",
    submitter: "Validator Council",
    requiredStake: "7.5K PC",
  },
];

const impactReports = [
  {
    id: 1,
    company: "Sahel Water Collective",
    quarter: "Q4 2024",
    peaceImpact: 89,
    communitiesServed: 245,
    conflictReduction: 34,
    economicImpact: "$2.1M",
    sustainability: 87,
    nextMilestones: ["Series B Prep", "New Market Entry"],
    validated: true,
    validator: "Community Impact Assessment Network",
  },
  {
    id: 2,
    company: "Youth Bridge Employment",
    quarter: "Q4 2024",
    peaceImpact: 92,
    communitiesServed: 156,
    conflictReduction: 28,
    economicImpact: "$1.6M",
    sustainability: 94,
    nextMilestones: ["Platform 2.0", "Government Partnerships"],
    validated: true,
    validator: "Independent Impact Auditors",
  },
];

const riskAssessments = [
  {
    investment: "Sahel Water Collective",
    overallRisk: "Low",
    riskScore: 23,
    factors: {
      political: 25,
      economic: 20,
      operational: 15,
      environmental: 30,
      social: 18,
    },
    mitigation: [
      "Local government partnerships established",
      "Diversified funding sources",
      "Strong community buy-in",
    ],
    lastUpdated: "2 days ago",
  },
  {
    investment: "Climate Resilience Farms",
    overallRisk: "Medium",
    riskScore: 34,
    factors: {
      political: 40,
      economic: 35,
      operational: 25,
      environmental: 45,
      social: 20,
    },
    mitigation: [
      "Climate adaptation technology proven",
      "Multiple revenue streams",
      "Insurance coverage secured",
    ],
    lastUpdated: "1 week ago",
  },
];

const smartContracts = [
  {
    id: 1,
    name: "Milestone-Based Release Fund",
    description: "Automated funding release based on verified milestones",
    totalValue: "$12.5M",
    activeContracts: 23,
    successRate: 96,
    avgReleaseTime: "2.3 days",
    status: "Active",
  },
  {
    id: 2,
    name: "Impact Verification Oracle",
    description: "Decentralized impact measurement and verification",
    totalValue: "$8.9M",
    activeContracts: 18,
    successRate: 94,
    avgReleaseTime: "1.8 days",
    status: "Active",
  },
  {
    id: 3,
    name: "Risk-Adjusted Returns Pool",
    description: "Dynamic returns based on peace impact and risk metrics",
    totalValue: "$15.2M",
    activeContracts: 31,
    successRate: 92,
    avgReleaseTime: "3.1 days",
    status: "Beta",
  },
];

export default function FunderValidatorDashboard() {
  const { user, earnPeaceCoin, logout } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleLogout = () => {
    logout();
  };

  const handleNewInvestment = () => {
    earnPeaceCoin(200, "Launched new peace impact investment");
  };

  const handleDAOVote = () => {
    earnPeaceCoin(100, "Participated in DAO governance vote");
  };

  const handleValidateImpact = () => {
    earnPeaceCoin(150, "Validated impact report");
  };

  const handleDueDiligence = () => {
    earnPeaceCoin(125, "Completed enhanced due diligence assessment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Peace Investment Command Center
            </h1>
            <p className="text-gray-600">
              Funding scalable peace solutions • {user?.name} •{" "}
              {user?.organization}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
              Level {user?.level} Impact Investor
            </Badge>
            <div className="text-right">
              <div className="text-sm font-medium">
                {user?.peaceCoinBalance} PeaceCoins
              </div>
              <div className="text-xs text-gray-500">
                Validator Score: {user?.contributionScore}
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
        {/* Key Portfolio Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {portfolioMetrics.map((metric, index) => (
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
                  <DollarSign className="w-8 h-8 text-blue-600" />
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
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="dao-governance">DAO Governance</TabsTrigger>
            <TabsTrigger value="impact-validation">Impact Reports</TabsTrigger>
            <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
            <TabsTrigger value="smart-contracts">Smart Contracts</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Performance */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5" />
                    <span>Portfolio Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          $45.8M
                        </div>
                        <div className="text-xs text-gray-600">
                          Total Portfolio Value
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          286%
                        </div>
                        <div className="text-xs text-gray-600">
                          Average Peace ROI
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          67
                        </div>
                        <div className="text-xs text-gray-600">
                          Active Investments
                        </div>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          890
                        </div>
                        <div className="text-xs text-gray-600">
                          Communities Impacted
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="text-sm font-medium mb-2">
                        Top Performing Sectors
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Water Security</span>
                          <span className="font-medium">+34% ROI</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>EdTech</span>
                          <span className="font-medium">+28% ROI</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>AgTech</span>
                          <span className="font-medium">+22% ROI</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent DAO Activity */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Vote className="w-5 h-5" />
                    <span>DAO Governance Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {daoProposals.slice(0, 2).map((proposal) => (
                      <div
                        key={proposal.id}
                        className="p-3 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium text-sm">
                              {proposal.title}
                            </div>
                            <div className="text-xs text-gray-600">
                              {proposal.amount}
                            </div>
                          </div>
                          <Badge variant="outline">{proposal.category}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>
                              {proposal.votes} votes • {proposal.approval}%
                              approval
                            </span>
                            <span>{proposal.deadline} left</span>
                          </div>
                          <Progress value={proposal.approval} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Investment Actions */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Investment Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={handleNewInvestment}
                  >
                    <Plus className="w-6 h-6" />
                    <span>New Investment</span>
                    <span className="text-xs text-blue-100">
                      200 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleDAOVote}
                  >
                    <Vote className="w-6 h-6" />
                    <span>DAO Vote</span>
                    <span className="text-xs text-gray-500">
                      100 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleValidateImpact}
                  >
                    <Shield className="w-6 h-6" />
                    <span>Validate Impact</span>
                    <span className="text-xs text-gray-500">
                      150 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleDueDiligence}
                  >
                    <Calculator className="w-6 h-6" />
                    <span>Due Diligence</span>
                    <span className="text-xs text-gray-500">
                      125 PeaceCoins
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Peace Investment Portfolio
              </h2>
              <Button onClick={handleNewInvestment}>
                <Plus className="w-4 h-4 mr-2" />
                New Investment
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {activeInvestments.map((investment) => (
                <Card key={investment.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {investment.company}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {investment.sector} • {investment.geography}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {investment.investment} invested
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {investment.communities} communities
                          </span>
                          <span className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {investment.expectedROI}% expected ROI
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          investment.stage === "Series A"
                            ? "bg-blue-100 text-blue-800"
                            : investment.stage === "Growth"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {investment.stage}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">
                          Peace Impact Score
                        </div>
                        <Progress
                          value={investment.peaceImpact}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {investment.peaceImpact}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Risk Score</div>
                        <Progress
                          value={100 - investment.riskScore}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {investment.riskScore}% risk (Lower is better)
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Milestone Progress
                        </div>
                        <Progress
                          value={
                            (investment.currentMilestone /
                              investment.milestones.length) *
                            100
                          }
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {investment.currentMilestone}/
                          {investment.milestones.length} completed
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium">
                        Current Milestone
                      </div>
                      <div className="text-sm text-gray-600">
                        {investment.milestones[investment.currentMilestone - 1]}{" "}
                        • {investment.timeline} timeline
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Performance
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* DAO Governance Tab */}
          <TabsContent value="dao-governance" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">DAO Proposal Voting</h2>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Proposal
                </Button>
                <Button onClick={handleDAOVote}>
                  <Vote className="w-4 h-4 mr-2" />
                  Vote on Proposals
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {daoProposals.map((proposal) => (
                <Card key={proposal.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {proposal.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {proposal.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {proposal.amount}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {proposal.votes} votes
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {proposal.deadline} left
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            proposal.category === "Funding"
                              ? "bg-green-100 text-green-800"
                              : proposal.category === "Governance"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                          }
                        >
                          {proposal.category}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          by {proposal.submitter}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Approval Rate</span>
                        <span>{proposal.approval}%</span>
                      </div>
                      <Progress value={proposal.approval} className="h-3" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Required Stake: {proposal.requiredStake}
                      </div>
                      <div className="flex space-x-2">
                        {proposal.yourVote ? (
                          <Badge className="bg-green-100 text-green-800">
                            Voted: {proposal.yourVote}
                          </Badge>
                        ) : (
                          <>
                            <Button size="sm" onClick={handleDAOVote}>
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleDAOVote}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Impact Validation Tab */}
          <TabsContent value="impact-validation" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Impact Report Validation
              </h2>
              <Button onClick={handleValidateImpact}>
                <Shield className="w-4 h-4 mr-2" />
                Validate Report
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {impactReports.map((report) => (
                <Card key={report.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {report.company} - {report.quarter}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Validated by {report.validator}
                        </p>
                      </div>
                      <Badge
                        className={
                          report.validated
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {report.validated ? "Validated" : "Pending"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mb-4">
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          {report.peaceImpact}%
                        </div>
                        <div className="text-xs text-gray-600">
                          Peace Impact
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          {report.communitiesServed}
                        </div>
                        <div className="text-xs text-gray-600">Communities</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">
                          {report.conflictReduction}%
                        </div>
                        <div className="text-xs text-gray-600">
                          Conflict Reduction
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-orange-600">
                          {report.economicImpact}
                        </div>
                        <div className="text-xs text-gray-600">
                          Economic Impact
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-teal-600">
                          {report.sustainability}%
                        </div>
                        <div className="text-xs text-gray-600">
                          Sustainability
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium">Next Milestones</div>
                      <div className="text-sm text-gray-600">
                        {report.nextMilestones.join(" • ")}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Report
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      {!report.validated && (
                        <Button size="sm" onClick={handleValidateImpact}>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Validate
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Risk Analysis Tab */}
          <TabsContent value="risk-analysis" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Decentralized Due Diligence
              </h2>
              <Button onClick={handleDueDiligence}>
                <Calculator className="w-4 h-4 mr-2" />
                New Assessment
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {riskAssessments.map((assessment, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {assessment.investment}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Last updated: {assessment.lastUpdated}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          assessment.overallRisk === "Low"
                            ? "bg-green-100 text-green-800"
                            : assessment.overallRisk === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {assessment.overallRisk} Risk ({assessment.riskScore}
                        /100)
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                      {Object.entries(assessment.factors).map(
                        ([factor, score]) => (
                          <div key={factor}>
                            <div className="text-sm text-gray-600 capitalize">
                              {factor}
                            </div>
                            <Progress
                              value={100 - score}
                              className="h-2 mt-1"
                            />
                            <div className="text-xs text-gray-500 mt-1">
                              {score}/100
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-sm font-medium mb-2">
                        Risk Mitigation Strategies
                      </div>
                      <ul className="text-sm space-y-1">
                        {assessment.mitigation.map((strategy, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-600" />
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Smart Contracts Tab */}
          <TabsContent value="smart-contracts" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Smart Fund Release Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {smartContracts.map((contract) => (
                    <Card key={contract.id}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-medium">{contract.name}</h3>
                            <p className="text-sm text-gray-600">
                              {contract.description}
                            </p>
                            <Badge variant="outline" className="mt-2">
                              {contract.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">
                                Total Value:
                              </span>
                              <div className="font-medium">
                                {contract.totalValue}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">Active:</span>
                              <div className="font-medium">
                                {contract.activeContracts}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                Success Rate:
                              </span>
                              <div className="font-medium">
                                {contract.successRate}%
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                Avg Release:
                              </span>
                              <div className="font-medium">
                                {contract.avgReleaseTime}
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              Monitor
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <Activity className="w-3 h-3 mr-1" />
                              Analytics
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
