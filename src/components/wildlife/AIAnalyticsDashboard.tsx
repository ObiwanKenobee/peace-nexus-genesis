import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Globe,
  Brain,
  Zap,
  Target,
  Users,
  Heart,
  Leaf,
  Shield,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MapPin,
  Calendar,
  Download,
  Share,
  Settings,
  Filter,
  Search,
  Refresh,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Lightbulb,
  Gauge,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  Radar,
  Map,
  Database,
  Cpu,
  Smartphone,
  Monitor,
  Signal,
  Wifi,
  Battery,
  CloudRain,
  Sun,
  Thermometer,
  Wind,
  Droplets,
  TreePine,
  Mountain,
  Waves,
  Fish,
  Bird,
  Crown,
  Coins,
  Award,
  Flag,
  Mail,
  Bell,
} from "lucide-react";

interface AnalyticsData {
  overview: {
    totalUsers: number;
    activeUsers: number;
    globalReach: number;
    totalPeaceCoins: number;
    speciesProtected: number;
    habitatsMonitored: number;
    prayersCompleted: number;
    projectsActive: number;
    growthRate: number;
    engagementRate: number;
  };
  geographical: {
    countries: CountryData[];
    continents: ContinentData[];
    topRegions: RegionData[];
  };
  species: {
    mostPopular: SpeciesData[];
    conservation: ConservationData[];
    threats: ThreatData[];
  };
  faith: {
    distribution: FaithData[];
    engagement: FaithEngagementData[];
    crossFaithCollaboration: number;
  };
  predictions: {
    userGrowth: PredictionData;
    conservationImpact: PredictionData;
    fundraising: PredictionData;
    engagement: PredictionData;
  };
  realTime: {
    activeNow: number;
    recentActions: RecentAction[];
    emergencyAlerts: EmergencyAlert[];
    trending: TrendingItem[];
  };
  performance: {
    platformHealth: number;
    apiResponseTime: number;
    uptime: number;
    errorRate: number;
    serverLoad: number;
  };
}

interface CountryData {
  name: string;
  code: string;
  users: number;
  peaceCoins: number;
  projects: number;
  growthRate: number;
  engagement: number;
  topSpecies: string[];
  activeFaiths: string[];
}

interface ContinentData {
  name: string;
  users: number;
  countries: number;
  peaceCoins: number;
  conservationProjects: number;
  biodiversityIndex: number;
}

interface RegionData {
  name: string;
  users: number;
  engagement: number;
  specialization: string;
}

interface SpeciesData {
  name: string;
  category: string;
  guardians: number;
  peaceCoins: number;
  healthScore: number;
  trend: "up" | "down" | "stable";
  projects: number;
  countries: number;
}

interface ConservationData {
  species: string;
  status: string;
  populationTrend: number;
  threatsReduced: number;
  projectsActive: number;
  fundingReceived: number;
}

interface ThreatData {
  threat: string;
  severity: number;
  affectedSpecies: number;
  regions: string[];
  mitigationProgress: number;
}

interface FaithData {
  tradition: string;
  users: number;
  prayers: number;
  projects: number;
  peaceCoins: number;
  averageEngagement: number;
}

interface FaithEngagementData {
  tradition: string;
  dailyPrayers: number;
  communityProjects: number;
  interfaithCollaboration: number;
  educationalContent: number;
}

interface PredictionData {
  current: number;
  predicted3Month: number;
  predicted6Month: number;
  predicted1Year: number;
  confidence: number;
  factors: string[];
}

interface RecentAction {
  id: string;
  type:
    | "prayer"
    | "donation"
    | "adoption"
    | "project_creation"
    | "forum_post"
    | "habitat_report";
  user: string;
  action: string;
  timestamp: string;
  location?: string;
  impact: number;
}

interface EmergencyAlert {
  id: string;
  type:
    | "species_emergency"
    | "habitat_threat"
    | "natural_disaster"
    | "poaching_incident";
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  species?: string;
  timestamp: string;
  responseActions: number;
  status: "active" | "responding" | "resolved";
}

interface TrendingItem {
  id: string;
  type: "species" | "location" | "faith" | "project" | "prayer";
  name: string;
  activity: number;
  growth: number;
  description: string;
}

// Mock analytics data
const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalUsers: 1247893,
    activeUsers: 234567,
    globalReach: 147,
    totalPeaceCoins: 45678923,
    speciesProtected: 1234,
    habitatsMonitored: 892,
    prayersCompleted: 567890,
    projectsActive: 456,
    growthRate: 23.4,
    engagementRate: 78.5,
  },
  geographical: {
    countries: [
      {
        name: "United States",
        code: "US",
        users: 234567,
        peaceCoins: 8934567,
        projects: 89,
        growthRate: 15.3,
        engagement: 82.1,
        topSpecies: ["Bald Eagle", "California Condor", "Gray Wolf"],
        activeFaiths: ["Christianity", "Judaism", "Indigenous", "Buddhism"],
      },
      {
        name: "Brazil",
        code: "BR",
        users: 189234,
        peaceCoins: 6734521,
        projects: 67,
        growthRate: 31.7,
        engagement: 89.4,
        topSpecies: ["Amazon River Dolphin", "Jaguar", "Harpy Eagle"],
        activeFaiths: ["Christianity", "Indigenous", "Universal"],
      },
      {
        name: "Kenya",
        code: "KE",
        users: 156789,
        peaceCoins: 5623478,
        projects: 78,
        growthRate: 45.2,
        engagement: 91.8,
        topSpecies: ["African Elephant", "Lion", "Giraffe"],
        activeFaiths: ["Christianity", "Islam", "Traditional African"],
      },
    ],
    continents: [
      {
        name: "Africa",
        users: 345678,
        countries: 34,
        peaceCoins: 12345678,
        conservationProjects: 156,
        biodiversityIndex: 94.2,
      },
      {
        name: "North America",
        users: 289345,
        countries: 12,
        peaceCoins: 11234567,
        conservationProjects: 134,
        biodiversityIndex: 87.6,
      },
      {
        name: "South America",
        users: 234567,
        countries: 8,
        peaceCoins: 9876543,
        conservationProjects: 98,
        biodiversityIndex: 96.8,
      },
    ],
    topRegions: [
      {
        name: "Amazon Basin",
        users: 89234,
        engagement: 94.5,
        specialization: "Rainforest Conservation",
      },
      {
        name: "East African Savanna",
        users: 76543,
        engagement: 92.1,
        specialization: "Megafauna Protection",
      },
      {
        name: "North American Plains",
        users: 65432,
        engagement: 88.7,
        specialization: "Prairie Restoration",
      },
    ],
  },
  species: {
    mostPopular: [
      {
        name: "African Elephant",
        category: "Mammal",
        guardians: 23456,
        peaceCoins: 1234567,
        healthScore: 73,
        trend: "stable",
        projects: 45,
        countries: 23,
      },
      {
        name: "Snow Leopard",
        category: "Mammal",
        guardians: 18934,
        peaceCoins: 987654,
        healthScore: 58,
        trend: "down",
        projects: 34,
        countries: 12,
      },
      {
        name: "Monarch Butterfly",
        category: "Insect",
        guardians: 34567,
        peaceCoins: 765432,
        healthScore: 42,
        trend: "down",
        projects: 67,
        countries: 8,
      },
    ],
    conservation: [
      {
        species: "California Condor",
        status: "Critically Endangered",
        populationTrend: 12.3,
        threatsReduced: 34,
        projectsActive: 12,
        fundingReceived: 2345678,
      },
      {
        species: "Humpback Whale",
        status: "Least Concern",
        populationTrend: 8.7,
        threatsReduced: 23,
        projectsActive: 18,
        fundingReceived: 1876543,
      },
    ],
    threats: [
      {
        threat: "Climate Change",
        severity: 95,
        affectedSpecies: 1234,
        regions: [
          "Arctic",
          "Tropical Forests",
          "Coral Reefs",
          "Mountain Ranges",
        ],
        mitigationProgress: 34,
      },
      {
        threat: "Habitat Loss",
        severity: 89,
        affectedSpecies: 987,
        regions: ["Amazon", "Southeast Asia", "Madagascar", "California"],
        mitigationProgress: 67,
      },
    ],
  },
  faith: {
    distribution: [
      {
        tradition: "Christianity",
        users: 456789,
        prayers: 234567,
        projects: 145,
        peaceCoins: 15678234,
        averageEngagement: 84.2,
      },
      {
        tradition: "Islam",
        users: 234567,
        prayers: 156789,
        projects: 89,
        peaceCoins: 9876543,
        averageEngagement: 87.6,
      },
      {
        tradition: "Buddhism",
        users: 189234,
        prayers: 123456,
        projects: 67,
        peaceCoins: 7654321,
        averageEngagement: 91.3,
      },
      {
        tradition: "Indigenous",
        users: 156789,
        prayers: 98765,
        projects: 78,
        peaceCoins: 6543210,
        averageEngagement: 94.7,
      },
      {
        tradition: "Judaism",
        users: 89234,
        prayers: 67890,
        projects: 34,
        peaceCoins: 4321098,
        averageEngagement: 89.1,
      },
      {
        tradition: "Hinduism",
        users: 76543,
        prayers: 54321,
        projects: 29,
        peaceCoins: 3210987,
        averageEngagement: 86.8,
      },
    ],
    engagement: [
      {
        tradition: "Christianity",
        dailyPrayers: 23456,
        communityProjects: 145,
        interfaithCollaboration: 89,
        educationalContent: 234,
      },
      {
        tradition: "Islam",
        dailyPrayers: 18934,
        communityProjects: 89,
        interfaithCollaboration: 67,
        educationalContent: 189,
      },
      {
        tradition: "Buddhism",
        dailyPrayers: 15678,
        communityProjects: 67,
        interfaithCollaboration: 78,
        educationalContent: 156,
      },
      {
        tradition: "Indigenous",
        dailyPrayers: 12345,
        communityProjects: 78,
        interfaithCollaboration: 56,
        educationalContent: 123,
      },
    ],
    crossFaithCollaboration: 73.4,
  },
  predictions: {
    userGrowth: {
      current: 1247893,
      predicted3Month: 1456789,
      predicted6Month: 1678234,
      predicted1Year: 2234567,
      confidence: 87.3,
      factors: [
        "Viral social media campaigns",
        "Celebrity endorsements",
        "Educational partnerships",
        "Mobile app launch",
      ],
    },
    conservationImpact: {
      current: 1234,
      predicted3Month: 1456,
      predicted6Month: 1678,
      predicted1Year: 2345,
      confidence: 92.1,
      factors: [
        "Increased funding",
        "Technology adoption",
        "Community engagement",
        "Policy support",
      ],
    },
    fundraising: {
      current: 45678923,
      predicted3Month: 52345678,
      predicted6Month: 61234567,
      predicted1Year: 78923456,
      confidence: 84.7,
      factors: [
        "Corporate partnerships",
        "Grant applications",
        "Crowdfunding campaigns",
        "Event fundraising",
      ],
    },
    engagement: {
      current: 78.5,
      predicted3Month: 82.1,
      predicted6Month: 85.7,
      predicted1Year: 89.3,
      confidence: 79.8,
      factors: [
        "Gamification features",
        "AI personalization",
        "Community challenges",
        "Educational content",
      ],
    },
  },
  realTime: {
    activeNow: 23456,
    recentActions: [
      {
        id: "action-001",
        type: "prayer",
        user: "Sarah from Kenya",
        action: "Completed dawn prayer for elephants",
        timestamp: "2024-02-15T06:30:00Z",
        location: "Nairobi, Kenya",
        impact: 75,
      },
      {
        id: "action-002",
        type: "donation",
        user: "Michael from USA",
        action: "Donated $500 to Amazon conservation",
        timestamp: "2024-02-15T14:15:00Z",
        impact: 500,
      },
      {
        id: "action-003",
        type: "adoption",
        user: "Fatima from Morocco",
        action: "Adopted Snow Leopard family",
        timestamp: "2024-02-15T18:45:00Z",
        impact: 100,
      },
    ],
    emergencyAlerts: [
      {
        id: "alert-001",
        type: "species_emergency",
        title: "Whale Stranding - New Zealand",
        description: "Pod of 45 pilot whales stranded on South Island beach",
        severity: "critical",
        location: "New Zealand",
        species: "Pilot Whale",
        timestamp: "2024-02-15T08:30:00Z",
        responseActions: 234,
        status: "responding",
      },
    ],
    trending: [
      {
        id: "trend-001",
        type: "species",
        name: "Snow Leopard",
        activity: 1234,
        growth: 45.7,
        description: "Increased interest due to recent documentary",
      },
      {
        id: "trend-002",
        type: "location",
        name: "Amazon Basin",
        activity: 2345,
        growth: 67.8,
        description: "New conservation project launched",
      },
    ],
  },
  performance: {
    platformHealth: 97.8,
    apiResponseTime: 234,
    uptime: 99.9,
    errorRate: 0.1,
    serverLoad: 67.4,
  },
};

export default function AIAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData);
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [selectedRegion, setSelectedRegion] = useState("global");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate real-time data updates
        setData((prev) => ({
          ...prev,
          realTime: {
            ...prev.realTime,
            activeNow:
              prev.realTime.activeNow + Math.floor(Math.random() * 20 - 10),
          },
        }));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Target className="w-4 h-4 text-blue-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Analytics Dashboard</h1>
          <p className="text-gray-600">
            Global insights and predictions for wildlife conservation impact
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white"
          >
            <option value="global">Global</option>
            <option value="africa">Africa</option>
            <option value="americas">Americas</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
          <Button
            variant="outline"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? "bg-green-50" : ""}
          >
            <Refresh
              className={`w-4 h-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`}
            />
            Auto Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Real-time Alerts */}
      {data.realTime.emergencyAlerts.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {data.realTime.emergencyAlerts.map((alert) => (
            <Card key={alert.id} className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <div>
                      <h4 className="font-bold text-red-800">{alert.title}</h4>
                      <p className="text-sm text-red-700">
                        {alert.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-red-600 mt-1">
                        <span>{alert.location}</span>
                        <span>
                          {new Date(alert.timestamp).toLocaleString()}
                        </span>
                        <span>{alert.responseActions} responses</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <Badge variant="outline">{alert.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold">
                  {formatLargeNumber(data.overview.totalUsers)}
                </p>
                <div className="flex items-center text-sm text-green-600 mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />+
                  {data.overview.growthRate}% growth
                </div>
              </div>
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Global Reach</p>
                <p className="text-3xl font-bold">
                  {data.overview.globalReach}
                </p>
                <p className="text-sm text-gray-500">countries</p>
              </div>
              <Globe className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">PeaceCoins</p>
                <p className="text-3xl font-bold">
                  {formatLargeNumber(data.overview.totalPeaceCoins)}
                </p>
                <p className="text-sm text-gray-500">generated</p>
              </div>
              <Coins className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Species Protected</p>
                <p className="text-3xl font-bold">
                  {data.overview.speciesProtected}
                </p>
                <p className="text-sm text-gray-500">actively monitored</p>
              </div>
              <Shield className="w-12 h-12 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="geographical">Geographic</TabsTrigger>
          <TabsTrigger value="species">Species</TabsTrigger>
          <TabsTrigger value="faith">Faith Communities</TabsTrigger>
          <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Platform Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active Users (24h)</span>
                    <span className="font-bold">
                      {formatLargeNumber(data.overview.activeUsers)}
                    </span>
                  </div>
                  <Progress
                    value={
                      (data.overview.activeUsers / data.overview.totalUsers) *
                      100
                    }
                    className="h-3"
                  />

                  <div className="flex justify-between items-center">
                    <span>Engagement Rate</span>
                    <span className="font-bold">
                      {data.overview.engagementRate}%
                    </span>
                  </div>
                  <Progress
                    value={data.overview.engagementRate}
                    className="h-3"
                  />

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {data.overview.prayersCompleted.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        Prayers Completed
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {data.overview.projectsActive}
                      </div>
                      <div className="text-sm text-gray-600">
                        Active Projects
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gauge className="w-5 h-5" />
                  <span>Platform Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Uptime</span>
                    <span className="font-bold text-green-600">
                      {data.performance.uptime}%
                    </span>
                  </div>
                  <Progress value={data.performance.uptime} className="h-3" />

                  <div className="flex justify-between items-center">
                    <span>Platform Health</span>
                    <span className="font-bold text-green-600">
                      {data.performance.platformHealth}%
                    </span>
                  </div>
                  <Progress
                    value={data.performance.platformHealth}
                    className="h-3"
                  />

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">
                        {data.performance.apiResponseTime}ms
                      </div>
                      <div className="text-sm text-gray-600">API Response</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl font-bold text-orange-600">
                        {data.performance.errorRate}%
                      </div>
                      <div className="text-sm text-gray-600">Error Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Recent Growth Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    23.4%
                  </div>
                  <div className="text-sm text-gray-600">User Growth (30d)</div>
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    156%
                  </div>
                  <div className="text-sm text-gray-600">
                    Prayer Activity (30d)
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    89%
                  </div>
                  <div className="text-sm text-gray-600">
                    Project Funding (30d)
                  </div>
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geographical Tab */}
        <TabsContent value="geographical" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Top Countries</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.geographical.countries.map((country, index) => (
                    <div
                      key={country.code}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-lg font-bold text-gray-500">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{country.name}</div>
                          <div className="text-sm text-gray-600">
                            {formatLargeNumber(country.users)} users •{" "}
                            {country.projects} projects
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {formatLargeNumber(country.peaceCoins)} PC
                        </div>
                        <div className="text-sm text-green-600">
                          +{country.growthRate}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Map className="w-5 h-5" />
                  <span>Continental Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.geographical.continents.map((continent) => (
                    <div key={continent.name} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{continent.name}</h4>
                        <Badge variant="outline">
                          {continent.countries} countries
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Users: </span>
                          <span className="font-medium">
                            {formatLargeNumber(continent.users)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Projects: </span>
                          <span className="font-medium">
                            {continent.conservationProjects}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">PeaceCoins: </span>
                          <span className="font-medium">
                            {formatLargeNumber(continent.peaceCoins)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Biodiversity: </span>
                          <span className="font-medium">
                            {continent.biodiversityIndex}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Regional Specializations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.geographical.topRegions.map((region) => (
                  <div
                    key={region.name}
                    className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-green-50"
                  >
                    <h4 className="font-bold mb-2">{region.name}</h4>
                    <p className="text-sm text-blue-600 mb-3">
                      {region.specialization}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Users</span>
                        <span className="font-medium">
                          {formatLargeNumber(region.users)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Engagement</span>
                        <span className="font-medium">
                          {region.engagement}%
                        </span>
                      </div>
                      <Progress value={region.engagement} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Species Tab */}
        <TabsContent value="species" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Most Protected Species</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.species.mostPopular.map((species, index) => (
                    <div
                      key={species.name}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-lg font-bold text-gray-500">
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{species.name}</div>
                          <div className="text-sm text-gray-600">
                            {formatLargeNumber(species.guardians)} guardians •{" "}
                            {species.projects} projects
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(species.trend)}
                        <div className="text-right">
                          <div className="font-bold">
                            {species.healthScore}%
                          </div>
                          <div className="text-xs text-gray-500">health</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Major Threats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.species.threats.map((threat) => (
                    <div key={threat.threat} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{threat.threat}</h4>
                        <Badge className={getSeverityColor("high")}>
                          {threat.severity}% severity
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Affected Species</span>
                          <span className="font-medium">
                            {threat.affectedSpecies}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Mitigation Progress</span>
                          <span className="font-medium">
                            {threat.mitigationProgress}%
                          </span>
                        </div>
                        <Progress
                          value={threat.mitigationProgress}
                          className="h-2"
                        />
                        <div className="flex flex-wrap gap-1 mt-2">
                          {threat.regions.map((region, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {region}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Conservation Success Stories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.species.conservation.map((item) => (
                  <div
                    key={item.species}
                    className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-blue-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold">{item.species}</h4>
                      <Badge
                        className={
                          item.status.includes("Critically")
                            ? getSeverityColor("high")
                            : getSeverityColor("medium")
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Population Trend</span>
                        <span className="font-medium text-green-600">
                          +{item.populationTrend}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Threats Reduced</span>
                        <span className="font-medium">
                          {item.threatsReduced}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Projects</span>
                        <span className="font-medium">
                          {item.projectsActive}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Funding Received</span>
                        <span className="font-medium">
                          ${formatLargeNumber(item.fundingReceived)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Faith Communities Tab */}
        <TabsContent value="faith" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Faith Community Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.faith.distribution.map((faith) => (
                    <div
                      key={faith.tradition}
                      className="p-3 border rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{faith.tradition}</h4>
                        <span className="text-sm font-bold">
                          {formatLargeNumber(faith.users)} users
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Prayers: </span>
                          <span className="font-medium">
                            {formatLargeNumber(faith.prayers)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Projects: </span>
                          <span className="font-medium">{faith.projects}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">PeaceCoins: </span>
                          <span className="font-medium">
                            {formatLargeNumber(faith.peaceCoins)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Engagement: </span>
                          <span className="font-medium">
                            {faith.averageEngagement}%
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={faith.averageEngagement}
                        className="h-2 mt-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Interfaith Collaboration</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {data.faith.crossFaithCollaboration}%
                  </div>
                  <div className="text-gray-600">
                    Cross-faith collaboration rate
                  </div>
                  <Progress
                    value={data.faith.crossFaithCollaboration}
                    className="h-3 mt-3"
                  />
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium">Recent Interfaith Projects</h5>
                  <div className="space-y-2">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-sm">
                        Amazon Sacred Grove Restoration
                      </div>
                      <div className="text-xs text-gray-600">
                        Christian • Indigenous • Universal • 234 participants
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-sm">
                        Whale Protection Prayer Circle
                      </div>
                      <div className="text-xs text-gray-600">
                        Buddhist • Islamic • Jewish • 156 participants
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-sm">
                        Urban Wildlife Sanctuary
                      </div>
                      <div className="text-xs text-gray-600">
                        All Faiths • 567 participants
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Faith Community Engagement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.faith.engagement.map((faith) => (
                  <div
                    key={faith.tradition}
                    className="p-4 border rounded-lg text-center"
                  >
                    <h4 className="font-bold mb-3">{faith.tradition}</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          {formatLargeNumber(faith.dailyPrayers)}
                        </div>
                        <div className="text-xs text-gray-600">
                          Daily Prayers
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          {faith.communityProjects}
                        </div>
                        <div className="text-xs text-gray-600">
                          Community Projects
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">
                          {faith.interfaithCollaboration}
                        </div>
                        <div className="text-xs text-gray-600">
                          Interfaith Projects
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>User Growth Prediction</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {formatLargeNumber(
                        data.predictions.userGrowth.predicted1Year,
                      )}
                    </div>
                    <div className="text-gray-600">
                      Predicted users in 1 year
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      {data.predictions.userGrowth.confidence}% confidence
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">3 months</span>
                      <span className="font-medium">
                        {formatLargeNumber(
                          data.predictions.userGrowth.predicted3Month,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">6 months</span>
                      <span className="font-medium">
                        {formatLargeNumber(
                          data.predictions.userGrowth.predicted6Month,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">12 months</span>
                      <span className="font-medium">
                        {formatLargeNumber(
                          data.predictions.userGrowth.predicted1Year,
                        )}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Key Growth Factors</h5>
                    <div className="space-y-1">
                      {data.predictions.userGrowth.factors.map(
                        (factor, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <Lightbulb className="w-3 h-3 text-yellow-600" />
                            <span>{factor}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="w-5 h-5" />
                  <span>Conservation Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {data.predictions.conservationImpact.predicted1Year}
                    </div>
                    <div className="text-gray-600">
                      Species under protection
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      {data.predictions.conservationImpact.confidence}%
                      confidence
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Impact Drivers</h5>
                    <div className="space-y-1">
                      {data.predictions.conservationImpact.factors.map(
                        (factor, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <Zap className="w-3 h-3 text-green-600" />
                            <span>{factor}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="w-5 h-5" />
                  <span>Fundraising Projections</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      $
                      {formatLargeNumber(
                        data.predictions.fundraising.predicted1Year,
                      )}
                    </div>
                    <div className="text-gray-600">
                      Expected funds in 1 year
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      {data.predictions.fundraising.confidence}% confidence
                    </div>
                  </div>

                  <Progress
                    value={
                      (data.predictions.fundraising.predicted1Year /
                        data.predictions.fundraising.predicted1Year) *
                      100
                    }
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Engagement Forecast</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {data.predictions.engagement.predicted1Year}%
                    </div>
                    <div className="text-gray-600">
                      Predicted engagement rate
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      {data.predictions.engagement.confidence}% confidence
                    </div>
                  </div>

                  <Progress
                    value={data.predictions.engagement.predicted1Year}
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Real-time Tab */}
        <TabsContent value="realtime" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Live Activity Feed</span>
                  <Badge className="ml-auto">
                    {data.realTime.activeNow} online
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.realTime.recentActions.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-center space-x-3 p-3 border rounded-lg"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {action.action}
                        </div>
                        <div className="text-xs text-gray-600">
                          {action.user} •{" "}
                          {new Date(action.timestamp).toLocaleTimeString()}
                          {action.location && ` • ${action.location}`}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        +{action.impact} PC
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Trending Now</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.realTime.trending.map((item) => (
                    <div key={item.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.description}
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>
                          Activity: {formatLargeNumber(item.activity)}
                        </span>
                        <span className="text-green-600">+{item.growth}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="w-5 h-5" />
                <span>System Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {data.performance.uptime}%
                  </div>
                  <div className="text-sm text-gray-600">Uptime</div>
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {data.performance.apiResponseTime}ms
                  </div>
                  <div className="text-sm text-gray-600">Response Time</div>
                  <Zap className="w-6 h-6 text-blue-600 mx-auto mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {data.performance.serverLoad}%
                  </div>
                  <div className="text-sm text-gray-600">Server Load</div>
                  <Database className="w-6 h-6 text-purple-600 mx-auto mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    {data.performance.errorRate}%
                  </div>
                  <div className="text-sm text-gray-600">Error Rate</div>
                  <AlertTriangle className="w-6 h-6 text-orange-600 mx-auto mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {data.performance.platformHealth}%
                  </div>
                  <div className="text-sm text-gray-600">Health Score</div>
                  <Heart className="w-6 h-6 text-green-600 mx-auto mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
