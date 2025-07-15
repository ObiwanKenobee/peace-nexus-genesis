import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  Rocket,
  DollarSign,
  TrendingUp,
  Globe,
  Target,
  Users,
  BarChart3,
  Lightbulb,
  Package,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Plus,
  Eye,
  Download,
  Zap,
  Coins,
  Factory,
  Truck,
  LogOut,
} from "lucide-react";

const enterpriseMetrics = [
  { title: "Revenue Impact", value: "$2.4M", change: "+23%", trend: "up" },
  { title: "Peace ROI", value: "340%", change: "+45%", trend: "up" },
  { title: "Communities Served", value: "156", change: "+28", trend: "up" },
  { title: "Supply Chain Score", value: "94%", change: "+12%", trend: "up" },
];

const activeSocialEnterprises = [
  {
    id: 1,
    name: "Sahel Water Collective",
    category: "Water Security",
    stage: "Scale-Up",
    valuation: "$1.2M",
    communitiesServed: 45,
    peaceImpact: 89,
    nextMilestone: "Series A Funding",
    region: "Mali, Burkina Faso",
    sustainabilityScore: 92,
    conflictReduction: 67,
  },
  {
    id: 2,
    name: "Youth Skills Bridge",
    category: "Employment",
    stage: "Growth",
    valuation: "$800K",
    communitiesServed: 23,
    peaceImpact: 78,
    nextMilestone: "Market Expansion",
    region: "Northern Nigeria",
    sustainabilityScore: 85,
    conflictReduction: 54,
  },
  {
    id: 3,
    name: "Climate Resilience Farms",
    category: "Agriculture",
    stage: "Pilot",
    valuation: "$450K",
    communitiesServed: 12,
    peaceImpact: 91,
    nextMilestone: "Impact Validation",
    region: "Horn of Africa",
    sustainabilityScore: 88,
    conflictReduction: 73,
  },
];

const supplyChainProjects = [
  {
    id: 1,
    product: "Conflict-Free Cacao",
    supplier: "Ivory Coast Cooperative",
    transparency: 96,
    traceability: "Blockchain Verified",
    impact: "Direct trade with 340 farmers",
    certification: "Fair Trade Plus",
    peaceContribution: 85,
  },
  {
    id: 2,
    product: "Renewable Energy Kits",
    supplier: "Solar Villages Network",
    transparency: 92,
    traceability: "IoT Monitored",
    impact: "Clean energy for 45 villages",
    certification: "B-Corp Certified",
    peaceContribution: 78,
  },
  {
    id: 3,
    product: "Artisan Textiles",
    supplier: "Women's Peace Collective",
    transparency: 89,
    traceability: "NFC Tag Authenticated",
    impact: "Economic empowerment for 120 women",
    certification: "Peace Trade Verified",
    peaceContribution: 94,
  },
];

const impactReports = [
  {
    id: 1,
    title: "Q4 2024 Peace Impact Assessment",
    communities: 89,
    beneficiaries: 24560,
    conflictReduction: 34,
    economicImpact: "$1.8M",
    downloadCount: 234,
    publishDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Supply Chain Transparency Report 2024",
    suppliers: 156,
    countries: 12,
    transparencyScore: 92,
    certifications: 23,
    downloadCount: 189,
    publishDate: "2024-01-10",
  },
];

const fundingOpportunities = [
  {
    id: 1,
    fund: "Global Peace Innovation Fund",
    amount: "$2M - $5M",
    focus: "Conflict Prevention Tech",
    deadline: "March 15, 2024",
    matchScore: 94,
    requirements: ["Proven impact", "Scalable model", "Tech innovation"],
  },
  {
    id: 2,
    fund: "Sustainable Development Capital",
    amount: "$500K - $2M",
    focus: "Climate & Peace Nexus",
    deadline: "February 28, 2024",
    matchScore: 87,
    requirements: ["SDG alignment", "Climate focus", "Community impact"],
  },
  {
    id: 3,
    fund: "Innovation for Humanity",
    amount: "$1M - $3M",
    focus: "Social Enterprise Scale",
    deadline: "April 10, 2024",
    matchScore: 91,
    requirements: ["Social impact", "Revenue model", "Team experience"],
  },
];

export default function PeacepreneurDashboard() {
  const { user, earnPeaceCoin, logout } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleLogout = () => {
    logout();
  };

  const handleNewVenture = () => {
    earnPeaceCoin(100, "Launched new social enterprise initiative");
  };

  const handleSupplyChainAudit = () => {
    earnPeaceCoin(75, "Completed supply chain transparency audit");
  };

  const handleImpactReport = () => {
    earnPeaceCoin(150, "Generated comprehensive impact report");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Peacepreneur Innovation Hub
            </h1>
            <p className="text-gray-600">
              Scaling sustainable peace solutions • {user?.name} •{" "}
              {user?.organization}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-orange-100 to-green-100 text-orange-800">
              Level {user?.level} Impact Entrepreneur
            </Badge>
            <div className="text-right">
              <div className="text-sm font-medium">
                {user?.peaceCoinBalance} PeaceCoins
              </div>
              <div className="text-xs text-gray-500">
                Impact Score: {user?.contributionScore}
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
        {/* Key Enterprise Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {enterpriseMetrics.map((metric, index) => (
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
                  <Rocket className="w-8 h-8 text-orange-600" />
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
            <TabsTrigger value="ventures">Social Ventures</TabsTrigger>
            <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
            <TabsTrigger value="impact">Impact Reports</TabsTrigger>
            <TabsTrigger value="funding">Funding Hub</TabsTrigger>
            <TabsTrigger value="commons">Commons Exchange</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Ventures Performance */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Factory className="w-5 h-5" />
                    <span>Active Social Ventures</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeSocialEnterprises.slice(0, 3).map((venture) => (
                      <div
                        key={venture.id}
                        className="p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-green-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium">{venture.name}</div>
                            <div className="text-sm text-gray-600">
                              {venture.category} • {venture.region}
                            </div>
                          </div>
                          <Badge variant="outline">{venture.stage}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Valuation: {venture.valuation}</div>
                          <div>Communities: {venture.communitiesServed}</div>
                          <div>Peace Impact: {venture.peaceImpact}%</div>
                          <div>Conflict ↓: {venture.conflictReduction}%</div>
                        </div>
                        <div className="mt-2">
                          <div className="text-xs text-gray-500 mb-1">
                            Next: {venture.nextMilestone}
                          </div>
                          <Progress
                            value={venture.peaceImpact}
                            className="h-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Innovation Pipeline */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5" />
                    <span>Innovation Pipeline</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">
                            AI-Powered Conflict Early Warning
                          </div>
                          <div className="text-xs text-gray-500">
                            Tech Development • 67% complete
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">R&D</Badge>
                      </div>
                      <Progress value={67} className="h-1 mt-2" />
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">
                            Blockchain Resource Distribution
                          </div>
                          <div className="text-xs text-gray-500">
                            Pilot Testing • 34% complete
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          Pilot
                        </Badge>
                      </div>
                      <Progress value={34} className="h-1 mt-2" />
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">
                            VR Cross-Cultural Training Platform
                          </div>
                          <div className="text-xs text-gray-500">
                            Market Research • 89% complete
                          </div>
                        </div>
                        <Badge className="bg-purple-100 text-purple-800">
                          Research
                        </Badge>
                      </div>
                      <Progress value={89} className="h-1 mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Enterprise Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-orange-600 to-green-600 hover:from-orange-700 hover:to-green-700"
                    onClick={handleNewVenture}
                  >
                    <Plus className="w-6 h-6" />
                    <span>Launch New Venture</span>
                    <span className="text-xs text-orange-100">
                      Earn 100 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleSupplyChainAudit}
                  >
                    <Truck className="w-6 h-6" />
                    <span>Supply Chain Audit</span>
                    <span className="text-xs text-gray-500">
                      Earn 75 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleImpactReport}
                  >
                    <BarChart3 className="w-6 h-6" />
                    <span>Generate Impact Report</span>
                    <span className="text-xs text-gray-500">
                      Earn 150 PeaceCoins
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Ventures Tab */}
          <TabsContent value="ventures" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Social Enterprise Portfolio
              </h2>
              <Button onClick={handleNewVenture}>
                <Plus className="w-4 h-4 mr-2" />
                Launch New Venture
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {activeSocialEnterprises.map((venture) => (
                <Card key={venture.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {venture.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {venture.category} • {venture.region}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {venture.valuation}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {venture.communitiesServed} communities
                          </span>
                          <span className="flex items-center">
                            <Target className="w-4 h-4 mr-1" />
                            {venture.peaceImpact}% peace impact
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          venture.stage === "Scale-Up"
                            ? "bg-green-100 text-green-800"
                            : venture.stage === "Growth"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {venture.stage}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">
                          Sustainability Score
                        </div>
                        <Progress
                          value={venture.sustainabilityScore}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {venture.sustainabilityScore}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Peace Impact
                        </div>
                        <Progress
                          value={venture.peaceImpact}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {venture.peaceImpact}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Conflict Reduction
                        </div>
                        <Progress
                          value={venture.conflictReduction}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {venture.conflictReduction}%
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium">Next Milestone</div>
                      <div className="text-sm text-gray-600">
                        {venture.nextMilestone}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm">
                        <Zap className="w-4 h-4 mr-2" />
                        Scale Strategy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Supply Chain Tab */}
          <TabsContent value="supply-chain" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Open-Source Supply Chain
              </h2>
              <Button onClick={handleSupplyChainAudit}>
                <Truck className="w-4 h-4 mr-2" />
                New Audit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supplyChainProjects.map((project) => (
                <Card key={project.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">{project.product}</h3>
                        <p className="text-sm text-gray-600">
                          {project.supplier}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Transparency</span>
                          <span>{project.transparency}%</span>
                        </div>
                        <Progress
                          value={project.transparency}
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Traceability:</span>
                          <Badge variant="outline" className="text-xs">
                            {project.traceability}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Certification:</span>
                          <Badge variant="secondary" className="text-xs">
                            {project.certification}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-2 bg-green-50 rounded text-xs">
                        <strong>Impact:</strong> {project.impact}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Track
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-3 h-3 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Impact Reports Tab */}
          <TabsContent value="impact" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Impact Reporting Dashboard
              </h2>
              <Button onClick={handleImpactReport}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {impactReports.map((report) => (
                <Card key={report.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {report.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Published on {report.publishDate} •{" "}
                          {report.downloadCount} downloads
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      {report.communities && (
                        <div>
                          <div className="text-2xl font-bold text-orange-600">
                            {report.communities}
                          </div>
                          <div className="text-xs text-gray-600">
                            Communities
                          </div>
                        </div>
                      )}
                      {report.beneficiaries && (
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            {report.beneficiaries.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">
                            Beneficiaries
                          </div>
                        </div>
                      )}
                      {report.conflictReduction && (
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            {report.conflictReduction}%
                          </div>
                          <div className="text-xs text-gray-600">
                            Conflict Reduction
                          </div>
                        </div>
                      )}
                      {report.economicImpact && (
                        <div>
                          <div className="text-2xl font-bold text-purple-600">
                            {report.economicImpact}
                          </div>
                          <div className="text-xs text-gray-600">
                            Economic Impact
                          </div>
                        </div>
                      )}
                      {report.suppliers && (
                        <div>
                          <div className="text-2xl font-bold text-orange-600">
                            {report.suppliers}
                          </div>
                          <div className="text-xs text-gray-600">Suppliers</div>
                        </div>
                      )}
                      {report.countries && (
                        <div>
                          <div className="text-2xl font-bold text-green-600">
                            {report.countries}
                          </div>
                          <div className="text-xs text-gray-600">Countries</div>
                        </div>
                      )}
                      {report.transparencyScore && (
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            {report.transparencyScore}%
                          </div>
                          <div className="text-xs text-gray-600">
                            Transparency
                          </div>
                        </div>
                      )}
                      {report.certifications && (
                        <div>
                          <div className="text-2xl font-bold text-purple-600">
                            {report.certifications}
                          </div>
                          <div className="text-xs text-gray-600">
                            Certifications
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Funding Tab */}
          <TabsContent value="funding" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>AI-Matched Funding Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {fundingOpportunities.map((fund) => (
                    <div
                      key={fund.id}
                      className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{fund.fund}</h3>
                          <p className="text-sm text-gray-600">{fund.focus}</p>
                          <div className="flex items-center space-x-4 text-sm mt-1">
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {fund.amount}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {fund.deadline}
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {fund.matchScore}% match
                        </Badge>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm font-medium mb-1">
                          Requirements:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {fund.requirements.map((req, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm">Apply</Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commons Exchange Tab */}
          <TabsContent value="commons" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="w-5 h-5" />
                  <span>PeaceCoin Earning Engine</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Active Earning Streams</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">
                              Impact Verification
                            </div>
                            <div className="text-xs text-gray-500">
                              125 PC per verified impact
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">
                              Supply Chain Transparency
                            </div>
                            <div className="text-xs text-gray-500">
                              75 PC per audit completed
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">
                              Community Engagement
                            </div>
                            <div className="text-xs text-gray-500">
                              50 PC per engagement
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">DAO Governance Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Proposals Submitted</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Votes Cast</span>
                        <span className="font-medium">67</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Community Score</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Impact Validations</span>
                        <span className="font-medium">23</span>
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
