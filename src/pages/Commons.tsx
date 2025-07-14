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
import {
  Zap,
  Droplets,
  Wheat,
  Brain,
  Globe,
  ArrowRightLeft,
  TrendingUp,
  MapPin,
  Calendar,
  Users,
  Gauge,
  PlusCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Commons = () => {
  const resourceData = [
    {
      type: "Energy",
      icon: Zap,
      available: "47.2 TWh",
      allocated: "39.8 TWh",
      efficiency: 94,
      trend: "+12%",
      color: "text-yellow-500",
      providers: 127,
      consumers: 89,
      price: "0.12 PC/kWh",
    },
    {
      type: "Water",
      icon: Droplets,
      available: "2.4B L",
      allocated: "1.9B L",
      efficiency: 87,
      trend: "+8%",
      color: "text-blue-500",
      providers: 84,
      consumers: 156,
      price: "0.008 PC/L",
    },
    {
      type: "Food",
      icon: Wheat,
      available: "847K tons",
      allocated: "623K tons",
      efficiency: 91,
      trend: "+15%",
      color: "text-green-500",
      providers: 203,
      consumers: 178,
      price: "2.4 PC/kg",
    },
    {
      type: "Knowledge",
      icon: Brain,
      available: "1,247 courses",
      allocated: "1,089 courses",
      efficiency: 96,
      trend: "+22%",
      color: "text-purple-500",
      providers: 45,
      consumers: 2847,
      price: "15 PC/course",
    },
  ];

  const recentTransactions = [
    {
      type: "Energy",
      from: "Solar Grid - Morocco",
      to: "City Network - Spain",
      amount: "2.4 MW",
      cost: "288 PC",
      status: "Completed",
      time: "15 minutes ago",
    },
    {
      type: "Water",
      from: "Desalination - Israel",
      to: "Agricultural - Palestine",
      amount: "50,000 L",
      cost: "400 PC",
      status: "Active",
      time: "1 hour ago",
    },
    {
      type: "Food",
      from: "Vertical Farm - Netherlands",
      to: "Distribution - Germany",
      amount: "5.2 tons",
      cost: "12,480 PC",
      status: "Pending",
      time: "3 hours ago",
    },
    {
      type: "Knowledge",
      from: "Peace Institute - Costa Rica",
      to: "University - Kenya",
      amount: "Conflict Resolution Course",
      cost: "15 PC",
      status: "Completed",
      time: "6 hours ago",
    },
  ];

  const globalNodes = [
    { region: "Europe", providers: 47, consumers: 89, utilization: 92 },
    { region: "Asia-Pacific", providers: 134, consumers: 156, utilization: 87 },
    { region: "Africa", providers: 78, consumers: 134, utilization: 79 },
    { region: "Americas", providers: 98, consumers: 112, utilization: 85 },
    { region: "Middle East", providers: 34, consumers: 67, utilization: 91 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Planetary Resource Commons
          </h1>
          <p className="text-muted-foreground">
            Decentralized sharing of energy, water, food, and knowledge across
            global communities
          </p>
        </div>

        {/* Resource Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {resourceData.map((resource, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <resource.icon className={`h-6 w-6 ${resource.color}`} />
                  <Badge variant="secondary" className="text-xs">
                    {resource.trend}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{resource.type}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Available</span>
                    <span className="font-medium">{resource.available}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Allocated</span>
                    <span className="font-medium">{resource.allocated}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Efficiency</span>
                    <span>{resource.efficiency}%</span>
                  </div>
                  <Progress value={resource.efficiency} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>{resource.providers} Providers</div>
                  <div>{resource.consumers} Consumers</div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-sm font-medium text-primary">
                    {resource.price}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="exchange">Exchange</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Global Resource Distribution
                  </CardTitle>
                  <CardDescription>
                    Real-time availability across regions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {globalNodes.map((node, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{node.region}</div>
                            <div className="text-sm text-muted-foreground">
                              {node.providers} providers • {node.consumers}{" "}
                              consumers
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm">{node.utilization}%</div>
                          <Progress value={node.utilization} className="w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Commons Analytics
                  </CardTitle>
                  <CardDescription>
                    Usage patterns and optimization metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Global Efficiency Score</span>
                        <span className="font-semibold text-primary">
                          92.4%
                        </span>
                      </div>
                      <Progress value={92.4} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">
                          Resource Waste Reduction
                        </span>
                        <span className="font-semibold text-accent">-34%</span>
                      </div>
                      <Progress value={66} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">
                          Cross-Border Cooperation
                        </span>
                        <span className="font-semibold text-primary">89%</span>
                      </div>
                      <Progress value={89} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          1.2M
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Daily Transactions
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">
                          847K
                        </div>
                        <div className="text-sm text-muted-foreground">
                          PC Saved Daily
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exchange" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Create Resource Offer
                  </CardTitle>
                  <CardDescription>
                    Share your surplus resources with the global commons
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resource-type">Resource Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="energy">Energy</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="knowledge">Knowledge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input id="quantity" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (PC)</Label>
                      <Input id="price" placeholder="0.00" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Geographic region or facility"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Available Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 Hour</SelectItem>
                        <SelectItem value="24h">24 Hours</SelectItem>
                        <SelectItem value="7d">7 Days</SelectItem>
                        <SelectItem value="30d">30 Days</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full peace-gradient">
                    Create Offer
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5" />
                    Request Resources
                  </CardTitle>
                  <CardDescription>
                    Submit a request for resources you need
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="needed-resource">Resource Needed</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="energy">Energy</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="knowledge">Knowledge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="needed-quantity">Quantity Needed</Label>
                      <Input id="needed-quantity" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-price">Max Price (PC)</Label>
                      <Input id="max-price" placeholder="0.00" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delivery-location">Delivery Location</Label>
                    <Input
                      id="delivery-location"
                      placeholder="Where you need the resource"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          Low - Within 30 days
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium - Within 7 days
                        </SelectItem>
                        <SelectItem value="high">
                          High - Within 24 hours
                        </SelectItem>
                        <SelectItem value="critical">
                          Critical - Immediate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full" variant="outline">
                    Submit Request
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>
                  Live feed of resource exchanges across the global commons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "Energy"
                              ? "bg-yellow-100 text-yellow-600"
                              : transaction.type === "Water"
                                ? "bg-blue-100 text-blue-600"
                                : transaction.type === "Food"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {transaction.type === "Energy" && (
                            <Zap className="h-5 w-5" />
                          )}
                          {transaction.type === "Water" && (
                            <Droplets className="h-5 w-5" />
                          )}
                          {transaction.type === "Food" && (
                            <Wheat className="h-5 w-5" />
                          )}
                          {transaction.type === "Knowledge" && (
                            <Brain className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {transaction.amount}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.from} → {transaction.to}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {transaction.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-medium text-primary">
                            {transaction.cost}
                          </div>
                          <Badge
                            variant={
                              transaction.status === "Completed"
                                ? "default"
                                : transaction.status === "Active"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {transaction.status === "Completed" && (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            )}
                            {transaction.status === "Pending" && (
                              <AlertCircle className="h-3 w-3 mr-1" />
                            )}
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Network Nodes
                  </CardTitle>
                  <CardDescription>
                    Active participants in the resource commons
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          1,247
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Active Nodes
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">
                          94.7%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Uptime
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          847K
                        </div>
                        <div className="text-sm text-muted-foreground">
                          PC Traded
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="h-5 w-5" />
                    Network Health
                  </CardTitle>
                  <CardDescription>
                    System performance and reliability metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Network Latency</span>
                        <span className="font-semibold text-green-600">
                          12ms
                        </span>
                      </div>
                      <Progress value={95} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">
                          Transaction Success Rate
                        </span>
                        <span className="font-semibold text-primary">
                          99.2%
                        </span>
                      </div>
                      <Progress value={99.2} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Resource Utilization</span>
                        <span className="font-semibold text-accent">87%</span>
                      </div>
                      <Progress value={87} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Commons Governance</CardTitle>
                <CardDescription>
                  Community decisions on resource allocation policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="font-medium mb-2">
                      Universal Basic Energy Access
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Proposal to guarantee minimum energy allocation for all
                      verified community nodes
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Voting ends in 3 days</span>
                      <span>24,567 votes</span>
                    </div>
                    <Progress value={84} />
                    <div className="text-sm mt-1">84% in favor</div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="font-medium mb-2">
                      Emergency Resource Protocol
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Automatic resource reallocation during crisis situations
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                      <span>Voting ends in 1 week</span>
                      <span>18,234 votes</span>
                    </div>
                    <Progress value={91} />
                    <div className="text-sm mt-1">91% in favor</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Commons;
