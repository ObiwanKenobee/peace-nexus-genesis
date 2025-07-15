import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  Palette,
  Video,
  Music,
  Camera,
  Globe,
  Users,
  Heart,
  Star,
  Eye,
  Download,
  Share,
  Mic,
  Film,
  Headphones,
  Brush,
  Sparkles,
  Award,
  Zap,
  Calendar,
  MapPin,
  TrendingUp,
  Play,
  Plus,
  Upload,
  Archive,
  BookOpen,
  LogOut,
} from "lucide-react";

const creativeMetrics = [
  { title: "Global Reach", value: "2.8M", change: "+34%", trend: "up" },
  { title: "Cultural Projects", value: "156", change: "+23", trend: "up" },
  { title: "Cross-Cultural Impact", value: "89%", change: "+12%", trend: "up" },
  { title: "Peace Narratives", value: "342", change: "+67", trend: "up" },
];

const activeProjects = [
  {
    id: 1,
    title: "Memory Bridges: Syria-Jordan Archive",
    type: "Digital Heritage",
    medium: "VR Exhibition",
    status: "Production",
    progress: 78,
    collaborators: 24,
    regions: ["Syria", "Jordan", "Lebanon"],
    impact: "Preserving 500+ displaced family stories",
    funding: "$125K",
    audience: 15600,
    culturalScore: 94,
  },
  {
    id: 2,
    title: "Ubuntu Stories: African Peace Wisdom",
    type: "Multimedia Archive",
    medium: "Interactive Web Experience",
    status: "Post-Production",
    progress: 92,
    collaborators: 18,
    regions: ["South Africa", "Kenya", "Ghana"],
    impact: "Documenting 200+ elder wisdom traditions",
    funding: "$89K",
    audience: 8900,
    culturalScore: 87,
  },
  {
    id: 3,
    title: "Future Harmony: Youth Vision 2050",
    type: "Community Art",
    medium: "Augmented Reality Murals",
    status: "Installation",
    progress: 45,
    collaborators: 32,
    regions: ["Colombia", "El Salvador", "Mexico"],
    impact: "Engaging 1000+ youth in peace visioning",
    funding: "$67K",
    audience: 12300,
    culturalScore: 91,
  },
];

const nftCollections = [
  {
    id: 1,
    name: "Voices of Resilience",
    description: "Audio-visual stories from conflict survivors",
    pieces: 25,
    totalSales: "45.8 ETH",
    owners: 189,
    royalties: "12.3 ETH",
    impactFund: "85% to community programs",
    floorPrice: "0.8 ETH",
    category: "Documentary NFTs",
  },
  {
    id: 2,
    name: "Cultural DNA: Heritage Preservation",
    description: "Digital preservation of endangered traditions",
    pieces: 42,
    totalSales: "67.2 ETH",
    owners: 234,
    royalties: "18.9 ETH",
    impactFund: "90% to cultural preservation",
    floorPrice: "1.2 ETH",
    category: "Heritage NFTs",
  },
  {
    id: 3,
    name: "Peace Futures: AI-Human Collaboration",
    description: "AI-assisted peace narrative generation",
    pieces: 18,
    totalSales: "29.4 ETH",
    owners: 98,
    royalties: "8.1 ETH",
    impactFund: "80% to peace education",
    floorPrice: "1.5 ETH",
    category: "AI Art",
  },
];

const webXRExhibitions = [
  {
    id: 1,
    title: "Borders Dissolved: A Virtual Peace Festival",
    description: "Cross-cultural celebration connecting 12 countries",
    participants: 2847,
    countries: 12,
    languages: 8,
    duration: "72 hours",
    peaceBonds: 156,
    culturalExchanges: 489,
    status: "Live",
  },
  {
    id: 2,
    title: "Memory Palace: Trauma Healing Spaces",
    description: "Therapeutic VR environments for post-conflict healing",
    participants: 892,
    countries: 6,
    languages: 4,
    duration: "Ongoing",
    peaceBonds: 78,
    culturalExchanges: 234,
    status: "Beta",
  },
];

const cultureDAOActivity = [
  {
    id: 1,
    proposal: "Fund Syrian Cultural Archive Digitization",
    votes: 234,
    approval: 87,
    funding: "150K PC",
    curator: "Damascus Memory Collective",
    deadline: "3 days",
    category: "Heritage Preservation",
  },
  {
    id: 2,
    proposal: "Indigenous Peace Wisdom NFT Collection",
    votes: 189,
    approval: 94,
    funding: "89K PC",
    curator: "Global Indigenous Alliance",
    deadline: "1 week",
    category: "Cultural Documentation",
  },
  {
    id: 3,
    proposal: "AI-Powered Translation for Peace Stories",
    votes: 167,
    approval: 76,
    funding: "67K PC",
    curator: "Narrative Bridge Foundation",
    deadline: "5 days",
    category: "Technology Innovation",
  },
];

const creativeTools = [
  {
    name: "PeaceStory SDK",
    description: "AI-powered narrative generation for peace stories",
    users: 2340,
    stories: 15600,
    languages: 23,
    status: "Stable",
  },
  {
    name: "CultureBridge VR",
    description: "Cross-cultural immersive experience builder",
    users: 890,
    experiences: 456,
    countries: 45,
    status: "Beta",
  },
  {
    name: "Memory Archive Platform",
    description: "Decentralized cultural heritage preservation",
    users: 1560,
    archives: 234,
    terabytes: 45,
    status: "Production",
  },
];

export default function ArtistCultureWeaverDashboard() {
  const { user, earnPeaceCoin, logout } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleLogout = () => {
    logout();
  };

  const handleNewProject = () => {
    earnPeaceCoin(125, "Launched new cultural peace project");
  };

  const handleCreateNFT = () => {
    earnPeaceCoin(100, "Created peace narrative NFT collection");
  };

  const handleWebXRExhibition = () => {
    earnPeaceCoin(200, "Launched cross-border WebXR peace festival");
  };

  const handleCultureDAO = () => {
    earnPeaceCoin(75, "Participated in Culture DAO curation vote");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Culture Weaver Studio
            </h1>
            <p className="text-gray-600">
              Healing through art, preserving culture, weaving peace •{" "}
              {user?.name} • {user?.organization}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
              Level {user?.level} Culture Architect
            </Badge>
            <div className="text-right">
              <div className="text-sm font-medium">
                {user?.peaceCoinBalance} PeaceCoins
              </div>
              <div className="text-xs text-gray-500">
                Cultural Impact: {user?.contributionScore}
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
        {/* Key Creative Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {creativeMetrics.map((metric, index) => (
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
                  <Palette className="w-8 h-8 text-purple-600" />
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
            <TabsTrigger value="projects">Cultural Projects</TabsTrigger>
            <TabsTrigger value="nft-gallery">NFT Gallery</TabsTrigger>
            <TabsTrigger value="webxr">WebXR Festivals</TabsTrigger>
            <TabsTrigger value="culture-dao">Culture DAO</TabsTrigger>
            <TabsTrigger value="creative-tools">Creative SDK</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Cultural Projects */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brush className="w-5 h-5" />
                    <span>Active Cultural Projects</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeProjects.slice(0, 2).map((project) => (
                      <div
                        key={project.id}
                        className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-gray-600">
                              {project.type} • {project.medium}
                            </div>
                          </div>
                          <Badge variant="outline">{project.status}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                          <div>Collaborators: {project.collaborators}</div>
                          <div>
                            Audience: {project.audience.toLocaleString()}
                          </div>
                          <div>Funding: {project.funding}</div>
                          <div>Cultural Score: {project.culturalScore}%</div>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                          {project.impact}
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">
                          {project.progress}% complete
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Creative Tools & Impact */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Creative Innovation Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          89K
                        </div>
                        <div className="text-xs text-gray-600">
                          Stories Preserved
                        </div>
                      </div>
                      <div className="p-3 bg-pink-50 rounded-lg">
                        <div className="text-2xl font-bold text-pink-600">
                          234
                        </div>
                        <div className="text-xs text-gray-600">
                          Cultures Documented
                        </div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          67
                        </div>
                        <div className="text-xs text-gray-600">
                          Languages Supported
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          45
                        </div>
                        <div className="text-xs text-gray-600">
                          Countries Connected
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="text-sm font-medium mb-2">
                        Recent Achievements
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center">
                          <Award className="w-3 h-3 mr-2 text-yellow-500" />
                          UNESCO Digital Heritage Award 2024
                        </div>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-2 text-blue-500" />
                          Featured at Global Peace Arts Festival
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-3 h-3 mr-2 text-red-500" />
                          100K+ lives touched through art therapy
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Creative Actions */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Creative Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={handleNewProject}
                  >
                    <Plus className="w-6 h-6" />
                    <span>New Cultural Project</span>
                    <span className="text-xs text-purple-100">
                      125 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleCreateNFT}
                  >
                    <Archive className="w-6 h-6" />
                    <span>Create NFT Collection</span>
                    <span className="text-xs text-gray-500">
                      100 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleWebXRExhibition}
                  >
                    <Video className="w-6 h-6" />
                    <span>Launch WebXR Festival</span>
                    <span className="text-xs text-gray-500">
                      200 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleCultureDAO}
                  >
                    <Users className="w-6 h-6" />
                    <span>Culture DAO Vote</span>
                    <span className="text-xs text-gray-500">75 PeaceCoins</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cultural Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Cultural Peace Projects</h2>
              <Button onClick={handleNewProject}>
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {activeProjects.map((project) => (
                <Card key={project.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {project.type} • {project.medium}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {project.collaborators} collaborators
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {project.audience.toLocaleString()} audience
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {project.regions.join(", ")}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          project.status === "Production"
                            ? "bg-blue-100 text-blue-800"
                            : project.status === "Post-Production"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium">Cultural Impact</div>
                      <div className="text-sm text-gray-600">
                        {project.impact}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-gray-600">
                          Project Progress
                        </div>
                        <Progress
                          value={project.progress}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {project.progress}%
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Cultural Score
                        </div>
                        <Progress
                          value={project.culturalScore}
                          className="h-2 mt-1"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {project.culturalScore}%
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Continue Project
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Collaborate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* NFT Gallery Tab */}
          <TabsContent value="nft-gallery" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Peace Narrative NFT Collections
              </h2>
              <Button onClick={handleCreateNFT}>
                <Plus className="w-4 h-4 mr-2" />
                Create Collection
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nftCollections.map((collection) => (
                <Card key={collection.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">{collection.name}</h3>
                        <p className="text-sm text-gray-600">
                          {collection.description}
                        </p>
                        <Badge variant="outline" className="mt-2">
                          {collection.category}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Pieces:</span>
                          <div className="font-medium">{collection.pieces}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Owners:</span>
                          <div className="font-medium">{collection.owners}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Floor:</span>
                          <div className="font-medium">
                            {collection.floorPrice}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Total Sales:</span>
                          <div className="font-medium">
                            {collection.totalSales}
                          </div>
                        </div>
                      </div>

                      <div className="p-2 bg-green-50 rounded text-xs">
                        <strong>Impact Fund:</strong> {collection.impactFund}
                      </div>

                      <div className="p-2 bg-blue-50 rounded text-xs">
                        <strong>Royalties Earned:</strong>{" "}
                        {collection.royalties}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Upload className="w-3 h-3 mr-1" />
                          Add Piece
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* WebXR Festivals Tab */}
          <TabsContent value="webxr" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Cross-Border WebXR Peace Festivals
              </h2>
              <Button onClick={handleWebXRExhibition}>
                <Video className="w-4 h-4 mr-2" />
                Launch Festival
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {webXRExhibitions.map((exhibition) => (
                <Card key={exhibition.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {exhibition.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {exhibition.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {exhibition.participants.toLocaleString()}{" "}
                            participants
                          </span>
                          <span className="flex items-center">
                            <Globe className="w-4 h-4 mr-1" />
                            {exhibition.countries} countries
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exhibition.duration}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          exhibition.status === "Live"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {exhibition.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
                      <div>
                        <div className="text-lg font-bold text-purple-600">
                          {exhibition.peaceBonds}
                        </div>
                        <div className="text-xs text-gray-600">
                          Peace Bonds Formed
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-pink-600">
                          {exhibition.culturalExchanges}
                        </div>
                        <div className="text-xs text-gray-600">
                          Cultural Exchanges
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          {exhibition.languages}
                        </div>
                        <div className="text-xs text-gray-600">Languages</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          {exhibition.countries}
                        </div>
                        <div className="text-xs text-gray-600">Countries</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        {exhibition.status === "Live"
                          ? "Join Festival"
                          : "Preview"}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Participants
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Culture DAO Tab */}
          <TabsContent value="culture-dao" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Culture DAO Curation & Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {cultureDAOActivity.map((proposal) => (
                    <div
                      key={proposal.id}
                      className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-blue-50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{proposal.proposal}</h3>
                          <p className="text-sm text-gray-600">
                            by {proposal.curator}
                          </p>
                          <div className="flex items-center space-x-4 text-sm mt-1">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {proposal.votes} votes
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {proposal.deadline} left
                            </span>
                            <span className="flex items-center">
                              <Award className="w-4 h-4 mr-1" />
                              {proposal.funding}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800">
                            {proposal.approval}% approval
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">
                            {proposal.category}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <Progress value={proposal.approval} className="h-2" />
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleCultureDAO}>
                          Vote
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Creative Tools Tab */}
          <TabsContent value="creative-tools" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Creative Peace SDK & Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creativeTools.map((tool, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-medium">{tool.name}</h3>
                            <p className="text-sm text-gray-600">
                              {tool.description}
                            </p>
                            <Badge variant="outline" className="mt-2">
                              {tool.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">Users:</span>
                              <div className="font-medium">
                                {tool.users.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {tool.stories
                                  ? "Stories:"
                                  : tool.experiences
                                    ? "Experiences:"
                                    : "Archives:"}
                              </span>
                              <div className="font-medium">
                                {tool.stories?.toLocaleString() ||
                                  tool.experiences?.toLocaleString() ||
                                  tool.archives?.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">
                                {tool.languages
                                  ? "Languages:"
                                  : tool.countries
                                    ? "Countries:"
                                    : "Storage:"}
                              </span>
                              <div className="font-medium">
                                {tool.languages ||
                                  tool.countries ||
                                  `${tool.terabytes} TB`}
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <Zap className="w-3 h-3 mr-1" />
                              Use Tool
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              <BookOpen className="w-3 h-3 mr-1" />
                              Docs
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
