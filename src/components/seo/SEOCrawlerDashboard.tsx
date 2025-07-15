import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  seoCrawlerAPI,
  CrawlerStats,
  RankingData,
  RegionalMetrics,
  OptimizationAction,
} from "@/api/seo-crawler";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Search,
  Globe,
  TrendingUp,
  TrendingDown,
  Target,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Map,
  Bot,
  Zap,
  RefreshCw,
  Settings,
  Play,
  Pause,
  Filter,
} from "lucide-react";

interface CrawlerStats {
  totalKeywords: number;
  avgPosition: number;
  topPerformingRegions: Array<{
    region: string;
    avgPosition: number;
    keywordCount: number;
  }>;
  improvementOpportunities: string[];
  recentTrends: {
    direction: string;
    percentage: string;
    recentAvgPosition: string;
    previousAvgPosition: string;
  };
}

interface RankingData {
  keyword: string;
  position: number;
  region: string;
  searchEngine: string;
  timestamp: string;
  trend: "up" | "down" | "stable";
}

interface OptimizationAction {
  type: string;
  target: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedImpact: number;
  implementationDetails: any;
}

interface RegionalMetrics {
  region: string;
  metrics: {
    totalKeywords: number;
    avgPosition: number;
    top10Keywords: number;
    top3Keywords: number;
    impressions: number;
    clicks: number;
    ctr: number;
  };
  trending: "up" | "down" | "stable";
  opportunityScore: number;
}

export default function SEOCrawlerDashboard() {
  const [crawlerStats, setCrawlerStats] = useState<CrawlerStats | null>(null);
  const [rankings, setRankings] = useState<RankingData[]>([]);
  const [regionalMetrics, setRegionalMetrics] = useState<RegionalMetrics[]>([]);
  const [optimizationActions, setOptimizationActions] = useState<
    OptimizationAction[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [crawlerRunning, setCrawlerRunning] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("30");

  useEffect(() => {
    loadDashboardData();
  }, [selectedRegion, selectedTimeframe]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      await Promise.all([
        loadCrawlerStats(),
        loadRankings(),
        loadRegionalMetrics(),
        loadOptimizationActions(),
      ]);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadCrawlerStats = async () => {
    // Simulate API call
    const mockStats: CrawlerStats = {
      totalKeywords: 127,
      avgPosition: 23.4,
      topPerformingRegions: [
        { region: "Global", avgPosition: 18.2, keywordCount: 45 },
        { region: "East Africa", avgPosition: 28.7, keywordCount: 32 },
        { region: "Middle East", avgPosition: 31.5, keywordCount: 25 },
        { region: "South Asia", avgPosition: 35.8, keywordCount: 25 },
      ],
      improvementOpportunities: [
        "15 keywords on page 2-3 could be optimized to reach page 1",
        "Focus on improving rankings in: Middle East, South Asia",
        "Study un.org strategy - appears in top 5 for 12 keywords",
      ],
      recentTrends: {
        direction: "improving",
        percentage: "12.3",
        recentAvgPosition: "21.8",
        previousAvgPosition: "24.6",
      },
    };
    setCrawlerStats(mockStats);
  };

  const loadRankings = async () => {
    // Simulate API call with mock data
    const mockRankings: RankingData[] = [
      {
        keyword: "peacetech",
        position: 8,
        region: "Global",
        searchEngine: "google",
        timestamp: "2024-01-15",
        trend: "up",
      },
      {
        keyword: "conflict resolution AI",
        position: 15,
        region: "East Africa",
        searchEngine: "google",
        timestamp: "2024-01-15",
        trend: "stable",
      },
      {
        keyword: "peace DAO",
        position: 12,
        region: "Global",
        searchEngine: "google",
        timestamp: "2024-01-15",
        trend: "up",
      },
      {
        keyword: "blockchain for peace",
        position: 24,
        region: "Middle East",
        searchEngine: "google",
        timestamp: "2024-01-15",
        trend: "down",
      },
      {
        keyword: "VR empathy lab",
        position: 18,
        region: "Global",
        searchEngine: "google",
        timestamp: "2024-01-15",
        trend: "up",
      },
    ];
    setRankings(mockRankings);
  };

  const loadRegionalMetrics = async () => {
    const mockMetrics: RegionalMetrics[] = [
      {
        region: "Global",
        metrics: {
          totalKeywords: 45,
          avgPosition: 18.2,
          top10Keywords: 12,
          top3Keywords: 3,
          impressions: 45200,
          clicks: 2840,
          ctr: 6.3,
        },
        trending: "up",
        opportunityScore: 85,
      },
      {
        region: "East Africa",
        metrics: {
          totalKeywords: 32,
          avgPosition: 28.7,
          top10Keywords: 6,
          top3Keywords: 1,
          impressions: 18400,
          clicks: 980,
          ctr: 5.3,
        },
        trending: "stable",
        opportunityScore: 72,
      },
      {
        region: "Middle East",
        metrics: {
          totalKeywords: 25,
          avgPosition: 31.5,
          top10Keywords: 4,
          top3Keywords: 0,
          impressions: 12200,
          clicks: 520,
          ctr: 4.3,
        },
        trending: "down",
        opportunityScore: 68,
      },
      {
        region: "South Asia",
        metrics: {
          totalKeywords: 25,
          avgPosition: 35.8,
          top10Keywords: 3,
          top3Keywords: 0,
          impressions: 8900,
          clicks: 310,
          ctr: 3.5,
        },
        trending: "stable",
        opportunityScore: 61,
      },
    ];
    setRegionalMetrics(mockMetrics);
  };

  const loadOptimizationActions = async () => {
    const mockActions: OptimizationAction[] = [
      {
        type: "content_suggestion",
        target: "conflict resolution AI",
        description:
          'Improve content for "conflict resolution AI" - currently #15, competitor un.org ranks #3',
        priority: "high",
        estimatedImpact: 8,
        implementationDetails: {
          currentPosition: 15,
          targetPosition: 3,
          suggestions: [
            "Expand content depth and comprehensiveness",
            "Add more relevant internal links",
            "Improve content structure with better headers",
          ],
        },
      },
      {
        type: "regional_focus",
        target: "Middle East",
        description: "Focus SEO efforts on Middle East - avg position 31.5",
        priority: "high",
        estimatedImpact: 9,
        implementationDetails: {
          quickWins: [
            "Create region-specific landing pages",
            "Add local language content",
            "Build regional backlink profile",
          ],
        },
      },
      {
        type: "meta_update",
        target: "blockchain for peace",
        description: 'Improve CTR for "blockchain for peace" at position 24',
        priority: "medium",
        estimatedImpact: 5,
        implementationDetails: {
          optimizations: [
            "Write more compelling meta titles",
            "Improve meta descriptions with clear value propositions",
            "Add power words and emotional triggers",
          ],
        },
      },
    ];
    setOptimizationActions(mockActions);
  };

  const startCrawl = async () => {
    setCrawlerRunning(true);
    // Simulate crawl process
    setTimeout(() => {
      setCrawlerRunning(false);
      loadDashboardData();
    }, 5000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const chartData = regionalMetrics.map((region) => ({
    name: region.region,
    avgPosition: region.metrics.avgPosition,
    opportunityScore: region.opportunityScore,
    keywords: region.metrics.totalKeywords,
  }));

  const trendData = [
    { date: "Jan 1", position: 28.5 },
    { date: "Jan 8", position: 26.2 },
    { date: "Jan 15", position: 23.8 },
    { date: "Jan 22", position: 21.9 },
    { date: "Jan 29", position: 23.4 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <Bot className="w-8 h-8 text-blue-600" />
            <span>SEO Crawler Engine</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Automated regional ranking optimization for PAXIS peace technology
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="Global">Global</SelectItem>
              <SelectItem value="East Africa">East Africa</SelectItem>
              <SelectItem value="Middle East">Middle East</SelectItem>
              <SelectItem value="South Asia">South Asia</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={startCrawl}
            disabled={crawlerRunning}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {crawlerRunning ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Crawling...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Crawl
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      {crawlerStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">
                Total Keywords
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {crawlerStats.totalKeywords}
              </div>
              <div className="text-xs text-gray-500">
                Tracked across all regions
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">
                Avg Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {crawlerStats.avgPosition}
              </div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                {crawlerStats.recentTrends.direction === "improving"
                  ? "+"
                  : "-"}
                {crawlerStats.recentTrends.percentage}% vs last week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">
                Top Regions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {crawlerStats.topPerformingRegions.length}
              </div>
              <div className="text-xs text-gray-500">
                Best: {crawlerStats.topPerformingRegions[0]?.region}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">
                Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {crawlerStats.improvementOpportunities.length}
              </div>
              <div className="text-xs text-gray-500">
                Active recommendations
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="rankings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          <TabsTrigger value="optimization">Auto-Optimization</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>

        {/* Rankings Tab */}
        <TabsContent value="rankings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Keyword Rankings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Search Engine</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankings.map((ranking, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {ranking.keyword}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ranking.position <= 10 ? "default" : "secondary"
                          }
                        >
                          #{ranking.position}
                        </Badge>
                      </TableCell>
                      <TableCell>{ranking.region}</TableCell>
                      <TableCell className="capitalize">
                        {ranking.searchEngine}
                      </TableCell>
                      <TableCell>{getTrendIcon(ranking.trend)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regional Analysis Tab */}
        <TabsContent value="regional" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgPosition" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Opportunity Score by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalMetrics.map((region, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {region.region}
                        </span>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(region.trending)}
                          <span className="text-sm">
                            {region.opportunityScore}
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={region.opportunityScore}
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Regional Metrics Detail</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Keywords</TableHead>
                    <TableHead>Avg Position</TableHead>
                    <TableHead>Top 10</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>Opportunity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regionalMetrics.map((region, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {region.region}
                      </TableCell>
                      <TableCell>{region.metrics.totalKeywords}</TableCell>
                      <TableCell>{region.metrics.avgPosition}</TableCell>
                      <TableCell>{region.metrics.top10Keywords}</TableCell>
                      <TableCell>{region.metrics.ctr}%</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            region.opportunityScore > 70
                              ? "default"
                              : "secondary"
                          }
                        >
                          {region.opportunityScore}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auto-Optimization Tab */}
        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Automated Optimization Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationActions.map((action, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant={getPriorityColor(action.priority)}>
                          {action.priority}
                        </Badge>
                        <span className="font-medium">
                          {action.type.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">
                          Impact: {action.estimatedImpact}/10
                        </span>
                        <Progress
                          value={action.estimatedImpact * 10}
                          className="w-20 h-2"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      {action.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                      <Button size="sm">Implement</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Position Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="position"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                <p>
                  Competitor analysis data will be available after crawl
                  completion
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Crawling Status */}
      {crawlerRunning && (
        <Alert>
          <Clock className="h-4 w-4" />
          <AlertDescription>
            SEO crawler is running... This may take a few minutes to complete
            regional analysis.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
