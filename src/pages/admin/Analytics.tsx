import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Globe,
  Search,
  Users,
  Eye,
  Clock,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  RefreshCw,
} from "lucide-react";
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

const trafficData = [
  { month: "Jan", organic: 12400, social: 3200, direct: 8900, referral: 2100 },
  { month: "Feb", organic: 15800, social: 4100, direct: 9200, referral: 2800 },
  { month: "Mar", organic: 18200, social: 5300, direct: 9800, referral: 3200 },
  { month: "Apr", organic: 22100, social: 6200, direct: 10400, referral: 3800 },
  { month: "May", organic: 25600, social: 7100, direct: 11200, referral: 4200 },
  { month: "Jun", organic: 28900, social: 8400, direct: 12100, referral: 4800 },
];

const seoKeywords = [
  {
    keyword: "peacetech",
    position: 3,
    traffic: 1240,
    difficulty: 68,
    trend: "up",
  },
  {
    keyword: "conflict resolution AI",
    position: 7,
    traffic: 890,
    difficulty: 72,
    trend: "up",
  },
  {
    keyword: "peace DAO",
    position: 12,
    traffic: 560,
    difficulty: 45,
    trend: "down",
  },
  {
    keyword: "blockchain for peace",
    position: 15,
    traffic: 420,
    difficulty: 58,
    trend: "up",
  },
  {
    keyword: "VR empathy lab",
    position: 8,
    traffic: 380,
    difficulty: 41,
    trend: "up",
  },
  {
    keyword: "disarmament tech",
    position: 22,
    traffic: 210,
    difficulty: 67,
    trend: "down",
  },
];

const regionData = [
  { name: "East Africa", value: 28, users: 4200, growth: 15 },
  { name: "Middle East", value: 22, users: 3300, growth: 12 },
  { name: "South Asia", value: 18, users: 2700, growth: 8 },
  { name: "Europe", value: 16, users: 2400, growth: 5 },
  { name: "North America", value: 10, users: 1500, growth: 3 },
  { name: "Other", value: 6, users: 900, growth: 2 },
];

const pageMetrics = [
  {
    page: "/",
    views: 45200,
    bounceRate: 23,
    avgTime: "3:45",
    conversions: 890,
  },
  {
    page: "/dao",
    views: 28900,
    bounceRate: 31,
    avgTime: "4:12",
    conversions: 420,
  },
  {
    page: "/tools",
    views: 22100,
    bounceRate: 28,
    avgTime: "3:58",
    conversions: 320,
  },
  {
    page: "/vr-labs",
    views: 18700,
    bounceRate: 25,
    avgTime: "5:21",
    conversions: 280,
  },
  {
    page: "/peacecoin",
    views: 15400,
    bounceRate: 35,
    avgTime: "2:47",
    conversions: 190,
  },
  {
    page: "/education",
    views: 12800,
    bounceRate: 29,
    avgTime: "4:33",
    conversions: 150,
  },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("30d");

  const stats = [
    {
      title: "Total Page Views",
      value: "142.8K",
      change: "+18.2%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600",
    },
    {
      title: "Organic Traffic",
      value: "89.2K",
      change: "+24.5%",
      trend: "up",
      icon: Search,
      color: "text-green-600",
    },
    {
      title: "Active Users",
      value: "15.4K",
      change: "+12.8%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Avg. Session Time",
      value: "4:32",
      change: "-3.2%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-600 mt-1">
            SEO metrics and platform analytics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 flex items-center mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span
                    className={
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="ml-1">vs last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="traffic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traffic">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="seo">SEO Performance</TabsTrigger>
          <TabsTrigger value="geography">Geographic Data</TabsTrigger>
          <TabsTrigger value="pages">Page Performance</TabsTrigger>
        </TabsList>

        {/* Traffic Analysis */}
        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Traffic Sources Over Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="organic"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="social"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="direct"
                    stroke="#ffc658"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="referral"
                    stroke="#ff7c7c"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-center mt-4 space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#8884d8] rounded mr-2"></div>
                  <span className="text-sm">Organic</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#82ca9d] rounded mr-2"></div>
                  <span className="text-sm">Social</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#ffc658] rounded mr-2"></div>
                  <span className="text-sm">Direct</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#ff7c7c] rounded mr-2"></div>
                  <span className="text-sm">Referral</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Performance */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Keyword Rankings</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{keyword.keyword}</div>
                      <div className="text-sm text-gray-500">
                        Position #{keyword.position} • {keyword.traffic} monthly
                        visits
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">
                        Difficulty: {keyword.difficulty}%
                      </Badge>
                      <div className="flex items-center">
                        {keyword.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Domain Authority</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">42</div>
                <div className="text-sm text-gray-500">+3 from last month</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Indexed Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">1,247</div>
                <div className="text-sm text-gray-500">+89 new pages</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Backlinks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">3,892</div>
                <div className="text-sm text-gray-500">+127 this month</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Geographic Data */}
        <TabsContent value="geography" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="w-5 h-5" />
                  <span>Traffic by Region</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {regionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionData.map((region, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium">{region.name}</div>
                        <div className="text-sm text-gray-500">
                          {region.users.toLocaleString()} users
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">+{region.growth}%</Badge>
                        <div
                          className="w-3 h-3 rounded"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Page Performance */}
        <TabsContent value="pages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pageMetrics.map((page, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-4 items-center p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{page.page}</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">
                        {page.views.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{page.bounceRate}%</div>
                      <div className="text-xs text-gray-500">Bounce Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{page.avgTime}</div>
                      <div className="text-xs text-gray-500">Avg Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{page.conversions}</div>
                      <div className="text-xs text-gray-500">Conversions</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
