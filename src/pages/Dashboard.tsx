import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Zap,
  Activity,
  CheckCircle,
  MapPin,
  Eye
} from "lucide-react";

const Dashboard = () => {
  const conflictAlerts = [
    {
      region: "Eastern Mediterranean",
      risk: "Medium",
      status: "Monitoring",
      lastUpdate: "2 hours ago",
      riskLevel: 60
    },
    {
      region: "Central Africa",
      risk: "Low",
      status: "Stable", 
      lastUpdate: "4 hours ago",
      riskLevel: 25
    },
    {
      region: "South Asia",
      risk: "High",
      status: "Active Mediation",
      lastUpdate: "30 minutes ago",
      riskLevel: 85
    }
  ];

  const peaceActions = [
    {
      action: "Disarmament Protocol Initiated",
      location: "Northern Europe",
      peaceCoin: "+2,500 PC",
      timestamp: "15 minutes ago",
      verified: true
    },
    {
      action: "Resource Sharing Agreement",
      location: "West Africa", 
      peaceCoin: "+1,200 PC",
      timestamp: "1 hour ago",
      verified: true
    },
    {
      action: "Diplomatic Dialogue Session",
      location: "Southeast Asia",
      peaceCoin: "+800 PC",
      timestamp: "3 hours ago",
      verified: false
    }
  ];

  const resourceMetrics = [
    { name: "Energy", shared: "2.4 TWh", efficiency: 94, trend: "+12%" },
    { name: "Water", shared: "847M L", efficiency: 87, trend: "+8%" },
    { name: "Food", shared: "156K tons", efficiency: 91, trend: "+15%" },
    { name: "Knowledge", shared: "924 courses", efficiency: 96, trend: "+22%" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Peace Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of global peace infrastructure and cooperative activities
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="peace-glow border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Global Peace Index</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">94.7</div>
              <p className="text-xs text-muted-foreground">+2.3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Conflicts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">-12 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PeaceCoin Circulation</CardTitle>
              <Zap className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.4M</div>
              <p className="text-xs text-muted-foreground">+847K this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Mediations</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">5 resolved today</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="monitoring">Conflict Monitoring</TabsTrigger>
            <TabsTrigger value="resources">Resource Commons</TabsTrigger>
            <TabsTrigger value="actions">Peace Actions</TabsTrigger>
            <TabsTrigger value="governance">DAO Governance</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Conflict Early Warning System
                  </CardTitle>
                  <CardDescription>
                    AI-powered monitoring of global tension indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conflictAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{alert.region}</div>
                            <div className="text-sm text-muted-foreground">{alert.lastUpdate}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={alert.risk === "High" ? "destructive" : alert.risk === "Medium" ? "default" : "secondary"}
                          >
                            {alert.risk} Risk
                          </Badge>
                          <Progress value={alert.riskLevel} className="w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Conflict Resolution Analytics
                  </CardTitle>
                  <CardDescription>
                    Success rates and intervention effectiveness
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Successful Mediations</span>
                      <span className="font-semibold">89%</span>
                    </div>
                    <Progress value={89} />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Prevention Rate</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <Progress value={94} />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Peace Treaty Compliance</span>
                      <span className="font-semibold">96%</span>
                    </div>
                    <Progress value={96} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Resource Commons
                </CardTitle>
                <CardDescription>
                  Decentralized sharing of planetary resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {resourceMetrics.map((resource, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{resource.name}</h3>
                        <Badge variant="secondary">{resource.trend}</Badge>
                      </div>
                      <div className="text-2xl font-bold text-primary">{resource.shared}</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Efficiency</span>
                          <span>{resource.efficiency}%</span>
                        </div>
                        <Progress value={resource.efficiency} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Recent Peace Actions
                </CardTitle>
                <CardDescription>
                  Verified peaceful activities earning PeaceCoin rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {peaceActions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${action.verified ? 'bg-accent' : 'bg-yellow-500'}`} />
                        <div>
                          <div className="font-medium">{action.action}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {action.location} • {action.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="peace-gradient text-white border-none">
                          {action.peaceCoin}
                        </Badge>
                        {action.verified ? (
                          <CheckCircle className="h-4 w-4 text-accent" />
                        ) : (
                          <Eye className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View All Actions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Proposals</CardTitle>
                  <CardDescription>Community votes on peace initiatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border">
                      <div className="font-medium mb-2">Renewable Energy Sharing Protocol</div>
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Voting ends in 2 days</span>
                        <span>12,847 votes</span>
                      </div>
                      <Progress value={78} />
                      <div className="text-sm mt-1">78% in favor</div>
                    </div>
                    
                    <div className="p-3 rounded-lg border">
                      <div className="font-medium mb-2">Conflict Prevention AI Training</div>
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Voting ends in 5 days</span>
                        <span>8,432 votes</span>
                      </div>
                      <Progress value={92} />
                      <div className="text-sm mt-1">92% in favor</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Council Members</CardTitle>
                  <CardDescription>Current peace council representatives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Citizens Council</div>
                        <div className="text-sm text-muted-foreground">47 verified representatives</div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">NGO Alliance</div>
                        <div className="text-sm text-muted-foreground">23 organizations</div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Indigenous Councils</div>
                        <div className="text-sm text-muted-foreground">15 communities</div>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Nation Delegates</div>
                        <div className="text-sm text-muted-foreground">89 countries</div>
                      </div>
                      <Badge>Active</Badge>
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

export default Dashboard;