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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  BarChart3,
  Brain,
  Download,
  Filter,
  Globe,
  TrendingUp,
  AlertTriangle,
  FileText,
  Database,
  Network,
  Calendar,
  BookOpen,
  Users,
  MapPin,
  Zap,
  Target,
  LogOut,
} from "lucide-react";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

export default function ConflictAnalystDashboard() {
  const { user, logout } = usePaxisAuth();
  const [activeResearch, setActiveResearch] = useState([]);
  const [recentAnalyses, setRecentAnalyses] = useState([]);

  // Mock data for analyst dashboard
  useEffect(() => {
    const mockResearch = [
      {
        id: "1",
        title: "Horn of Africa Conflict Patterns 2020-2024",
        status: "analyzing",
        progress: 67,
        dataPoints: 15420,
        countries: ["Ethiopia", "Somalia", "Kenya"],
        timeline: "Last 4 years",
        riskLevel: "high",
      },
      {
        id: "2",
        title: "Water Scarcity Impact on Middle East Stability",
        status: "draft",
        progress: 23,
        dataPoints: 8950,
        countries: ["Jordan", "Syria", "Iraq"],
        timeline: "2019-2024",
        riskLevel: "critical",
      },
    ];

    const mockAnalyses = [
      {
        id: "1",
        title: "Climate Migration Patterns in Central America",
        completedDate: "2024-01-18",
        insights: 12,
        citations: 45,
        sdgImpact: ["SDG 13", "SDG 16"],
        downloadCount: 234,
      },
      {
        id: "2",
        title: "Social Media Hate Speech → Violence Correlation",
        completedDate: "2024-01-15",
        insights: 8,
        citations: 67,
        sdgImpact: ["SDG 16", "SDG 10"],
        downloadCount: 189,
      },
    ];

    setActiveResearch(mockResearch);
    setRecentAnalyses(mockAnalyses);
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="peace-gradient w-8 h-8 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Conflict Analysis Lab</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">
              <Database className="h-3 w-3 mr-1" />
              Research Access
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-muted-foreground">
                    Active Research
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">
                    Completed Analyses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">2.4M</p>
                  <p className="text-sm text-muted-foreground">Data Points</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">89%</p>
                  <p className="text-sm text-muted-foreground">
                    Prediction Accuracy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="research" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="research">Active Research</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Search</TabsTrigger>
            <TabsTrigger value="analytics">Graph Analytics</TabsTrigger>
            <TabsTrigger value="peacegpt">PeaceGPT</TabsTrigger>
            <TabsTrigger value="reports">Export Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="research" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Research Projects</h2>
              <Button className="peace-gradient">
                <FileText className="h-4 w-4 mr-2" />
                New Research
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {activeResearch.map((research: any) => (
                <Card
                  key={research.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {research.title}
                        </CardTitle>
                        <CardDescription>{research.timeline}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          research.riskLevel === "critical"
                            ? "destructive"
                            : research.riskLevel === "high"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {research.riskLevel} risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{research.progress}%</span>
                      </div>
                      <Progress value={research.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Data Points:
                        </span>
                        <p className="font-medium">
                          {research.dataPoints.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Countries:
                        </span>
                        <p className="font-medium">
                          {research.countries.length}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {research.countries.map(
                        (country: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {country}
                          </Badge>
                        ),
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Completed Analyses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnalyses.map((analysis: any) => (
                    <div
                      key={analysis.id}
                      className="flex items-center justify-between p-4 border rounded"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium">{analysis.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Completed: {analysis.completedDate}</span>
                          <span>{analysis.insights} key insights</span>
                          <span>{analysis.citations} citations</span>
                          <span>{analysis.downloadCount} downloads</span>
                        </div>
                        <div className="flex space-x-1">
                          {analysis.sdgImpact.map(
                            (sdg: string, index: number) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {sdg}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Knowledge Search</CardTitle>
                <CardDescription>
                  Search through global conflict databases, peace treaties, and
                  research archives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search conflicts, treaties, actors, regions..."
                      className="w-full pl-9 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <Button>
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Button variant="outline">
                    <Brain className="h-4 w-4 mr-2" />
                    AI Search
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Quick Searches</h4>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        Water conflicts in Africa
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        Post-election violence patterns
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        Climate migration trends
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Recent Searches</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Horn of Africa droughts</span>
                        <span className="text-muted-foreground">
                          2 days ago
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Syria peace process</span>
                        <span className="text-muted-foreground">
                          1 week ago
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Myanmar conflict actors</span>
                        <span className="text-muted-foreground">
                          2 weeks ago
                        </span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Saved Collections</h4>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Water Diplomacy Research
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Youth & Radicalization
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Climate Security
                      </Button>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Graph Analytics & Network Mapping</CardTitle>
                <CardDescription>
                  Visualize conflict networks, actor relationships, and pattern
                  analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Network Visualization
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Network className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-muted-foreground">
                            Interactive network graph
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Conflict actor relationships
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Timeline Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Timeline className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-muted-foreground">
                            Temporal pattern analysis
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Event sequence visualization
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Analysis Tools</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Centrality Analysis
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Network className="h-4 w-4 mr-2" />
                        Community Detection
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Trend Analysis
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Data Sources</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>ACLED Events</span>
                        <Badge variant="outline" className="text-xs">
                          Live
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>GDELT Project</span>
                        <Badge variant="outline" className="text-xs">
                          Daily
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>UCDP Database</span>
                        <Badge variant="outline" className="text-xs">
                          Monthly
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Export Options</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Network Data (JSON)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Analysis Report (PDF)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Visualization (SVG)
                      </Button>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="peacegpt" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>PeaceGPT - AI Research Assistant</CardTitle>
                <CardDescription>
                  Specialized AI trained on peace studies, conflict resolution,
                  and diplomatic history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-96 border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="h-5 w-5 text-primary" />
                    <span className="font-medium">PeaceGPT</span>
                    <Badge variant="outline" className="text-xs">
                      Conflict Analysis Specialist
                    </Badge>
                  </div>

                  <div className="space-y-4 mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm">
                        <strong>PeaceGPT:</strong> Hello! I'm your AI research
                        assistant specialized in conflict analysis and peace
                        studies. I can help you with:
                      </p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• Analyzing conflict patterns and trends</li>
                        <li>• Researching historical peace processes</li>
                        <li>• Identifying key actors and stakeholders</li>
                        <li>• Suggesting mediation approaches</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Ask about conflicts, peace processes, mediation strategies..."
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <Button>
                      <Zap className="h-4 w-4 mr-2" />
                      Ask
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Suggested Queries</h4>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left"
                      >
                        "What are the main drivers of conflict in the Sahel
                        region?"
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left"
                      >
                        "Compare peace processes in Colombia vs Northern
                        Ireland"
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left"
                      >
                        "How does climate change affect migration and conflict?"
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Research Templates</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Conflict Assessment Framework
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Stakeholder Mapping Template
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Early Warning Indicators
                      </Button>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Export Reports & Data</CardTitle>
                <CardDescription>
                  Generate comprehensive reports for UN SDG submissions, policy
                  briefings, and academic research
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">UN SDG Reports</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Generate standardized reports for UN Sustainable
                      Development Goals monitoring
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        SDG 16 Peace Report
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Conflict Indicators
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Policy Briefings</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Executive summaries and policy recommendations for
                      decision makers
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Target className="h-4 w-4 mr-2" />
                        Executive Summary
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Risk Assessment
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Academic Research</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Detailed analysis with citations and methodology for
                      academic publication
                    </p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Research Paper
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Database className="h-4 w-4 mr-2" />
                        Dataset Export
                      </Button>
                    </div>
                  </Card>
                </div>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Recent Exports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">
                            Horn of Africa Conflict Analysis - SDG 16 Report
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Generated on Jan 20, 2024 • 45 pages
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <h4 className="font-medium">
                            Climate Migration Policy Brief - Central America
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Generated on Jan 18, 2024 • 12 pages
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
