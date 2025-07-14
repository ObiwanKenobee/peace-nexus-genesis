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
  Coins,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Users,
  Calendar,
  ArrowUpDown,
  Flame,
  PlusCircle,
  Target,
  BarChart,
  Wallet,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Globe,
  Handshake,
  Heart,
} from "lucide-react";

const PeaceCoin = () => {
  const tokenomicsMetrics = [
    { metric: "Total Supply", value: "1B PC", trend: "Fixed" },
    { metric: "Circulating Supply", value: "247.8M PC", trend: "+2.1%" },
    { metric: "Market Price", value: "$0.847 USD", trend: "+12.3%" },
    { metric: "Market Cap", value: "$209.9M USD", trend: "+14.7%" },
  ];

  const mintingActivities = [
    {
      action: "Nuclear Disarmament - Ukraine",
      description: "5 warheads safely dismantled and verified",
      amount: "+25,000 PC",
      timestamp: "2 hours ago",
      verified: true,
      category: "Disarmament",
      participants: "Ukraine, IAEA, PAXIS Monitors",
    },
    {
      action: "Water Sharing Agreement - Nile Basin",
      description: "Ethiopia-Sudan-Egypt trilateral water cooperation pact",
      amount: "+15,000 PC",
      timestamp: "6 hours ago",
      verified: true,
      category: "Cooperation",
      participants: "3 nations, 12 communities",
    },
    {
      action: "Conflict Resolution - Kashmir",
      description: "Peaceful resolution of trade route dispute",
      amount: "+8,500 PC",
      timestamp: "1 day ago",
      verified: true,
      category: "Mediation",
      participants: "2 regions, 4 councils",
    },
    {
      action: "Peace Education Deployment - West Africa",
      description: "VR empathy labs installed in 50 schools",
      amount: "+12,000 PC",
      timestamp: "2 days ago",
      verified: true,
      category: "Education",
      participants: "5 countries, 50 schools",
    },
  ];

  const burningEvents = [
    {
      violation: "Aggressive Military Exercise",
      description: "Unauthorized war games near disputed territory",
      amount: "-5,000 PC",
      timestamp: "3 days ago",
      entity: "Nation A (Anonymous)",
      category: "Aggression",
      status: "Verified",
    },
    {
      violation: "Disinformation Campaign",
      description: "Spreading false narratives about neighboring country",
      amount: "-2,500 PC",
      timestamp: "1 week ago",
      entity: "State Media Group",
      category: "Misinformation",
      status: "Under Review",
    },
  ];

  const stakingPools = [
    {
      name: "Peace Guardians",
      description: "Long-term commitment to non-violence",
      apy: "8.5%",
      staked: "45.2M PC",
      participants: "12,847",
      lockPeriod: "12 months",
      rewards: "Verified peace actions",
    },
    {
      name: "Resource Sharers",
      description: "Stake while providing commons resources",
      apy: "6.2%",
      staked: "28.9M PC",
      participants: "8,432",
      lockPeriod: "6 months",
      rewards: "Resource sharing bonuses",
    },
    {
      name: "Mediator Network",
      description: "Active conflict resolution specialists",
      apy: "12.1%",
      staked: "15.7M PC",
      participants: "2,156",
      lockPeriod: "18 months",
      rewards: "Successful mediation fees",
    },
    {
      name: "Education Validators",
      description: "Peace curriculum and VR content curators",
      apy: "9.8%",
      staked: "21.3M PC",
      participants: "5,643",
      lockPeriod: "9 months",
      rewards: "Content verification rewards",
    },
  ];

  const distributionAllocation = [
    {
      category: "Peace Actions Rewards",
      percentage: 40,
      amount: "400M PC",
      color: "bg-green-500",
    },
    {
      category: "DAO Governance",
      percentage: 15,
      amount: "150M PC",
      color: "bg-blue-500",
    },
    {
      category: "Education & Research",
      percentage: 20,
      amount: "200M PC",
      color: "bg-purple-500",
    },
    {
      category: "Infrastructure Development",
      percentage: 15,
      amount: "150M PC",
      color: "bg-orange-500",
    },
    {
      category: "Community Reserve",
      percentage: 10,
      amount: "100M PC",
      color: "bg-cyan-500",
    },
  ];

  const userPortfolio = {
    balance: "2,847 PC",
    staked: "1,200 PC",
    earned: "347 PC",
    pendingRewards: "23 PC",
    reputationScore: 94,
  };

  const priceHistory = [
    { date: "Jan 1", price: 0.65 },
    { date: "Jan 8", price: 0.72 },
    { date: "Jan 15", price: 0.78 },
    { date: "Jan 22", price: 0.85 },
    { date: "Today", price: 0.847 },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">PeaceCoin Tokenomics</h1>
          <p className="text-muted-foreground">
            Blockchain incentives for peaceful actions, cooperation, and
            conflict prevention
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tokenomicsMetrics.map((metric, index) => (
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

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="minting">Minting</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5" />
                    PeaceCoin Economics
                  </CardTitle>
                  <CardDescription>
                    How peaceful actions create and destroy value
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <PlusCircle className="h-4 w-4 text-green-600" />
                        Minting Triggers
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Weapon Dismantlement</span>
                          <span className="font-medium text-green-600">
                            +5,000 PC per warhead
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Peace Treaty Signing</span>
                          <span className="font-medium text-green-600">
                            +10,000 PC
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reconciliation Forum</span>
                          <span className="font-medium text-green-600">
                            +2,500 PC
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Resource Sharing Pact</span>
                          <span className="font-medium text-green-600">
                            +3,000 PC
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <Flame className="h-4 w-4 text-red-600" />
                        Burning Triggers
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Military Aggression</span>
                          <span className="font-medium text-red-600">
                            -10,000 PC
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Misinformation Campaign</span>
                          <span className="font-medium text-red-600">
                            -2,500 PC
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Treaty Violation</span>
                          <span className="font-medium text-red-600">
                            -15,000 PC
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Resource Hoarding</span>
                          <span className="font-medium text-red-600">
                            -5,000 PC
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Price Performance
                  </CardTitle>
                  <CardDescription>PeaceCoin value over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          $0.847
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Current Price
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          +12.3%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          24h Change
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {priceHistory.map((point, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span className="text-sm text-muted-foreground">
                            {point.date}
                          </span>
                          <span className="font-medium">
                            ${point.price.toFixed(3)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          All-time High:
                        </span>
                        <span className="font-medium">$1.24 (Dec 2023)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          All-time Low:
                        </span>
                        <span className="font-medium">$0.12 (Launch)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="minting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Recent Minting Events
                  </CardTitle>
                  <CardDescription>
                    PeaceCoins minted for verified peaceful actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mintingActivities.map((activity, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{activity.action}</h3>
                          <Badge variant="default" className="bg-green-600">
                            {activity.amount}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {activity.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">
                              Category:
                            </span>
                            <div className="font-medium">
                              {activity.category}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time:</span>
                            <div className="font-medium">
                              {activity.timestamp}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">
                              Participants:
                            </span>
                            <div className="font-medium">
                              {activity.participants}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-xs text-green-600">
                            Verified on blockchain
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5" />
                    Token Burning Events
                  </CardTitle>
                  <CardDescription>
                    PeaceCoins burned for violations and aggressive actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {burningEvents.map((event, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-red-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-red-700">
                            {event.violation}
                          </h3>
                          <Badge variant="destructive">{event.amount}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {event.description}
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">
                              Entity:
                            </span>
                            <div className="font-medium">{event.entity}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Category:
                            </span>
                            <div className="font-medium">{event.category}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time:</span>
                            <div className="font-medium">{event.timestamp}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Status:
                            </span>
                            <div className="font-medium">{event.status}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
                    <div className="text-sm font-medium text-red-700 mb-1">
                      Total Burned This Month
                    </div>
                    <div className="text-lg font-bold text-red-700">
                      -47,500 PC
                    </div>
                    <div className="text-xs text-red-600">
                      Maintaining peace incentives
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Staking Pools
                </CardTitle>
                <CardDescription>
                  Earn rewards by staking PeaceCoins for peace-building
                  activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {stakingPools.map((pool, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{pool.name}</h3>
                        <Badge
                          variant="outline"
                          className="peace-gradient text-white border-none"
                        >
                          {pool.apy} APY
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {pool.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">
                            Total Staked:
                          </span>
                          <div className="font-medium text-primary">
                            {pool.staked}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Participants:
                          </span>
                          <div className="font-medium">{pool.participants}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Lock Period:
                          </span>
                          <div className="font-medium">{pool.lockPeriod}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Bonus Rewards:
                          </span>
                          <div className="font-medium text-accent">
                            {pool.rewards}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">Stake in {pool.name}</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Your PeaceCoin Portfolio
                  </CardTitle>
                  <CardDescription>
                    Track your holdings, earnings, and contributions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg bg-primary/10">
                        <div className="text-2xl font-bold text-primary">
                          {userPortfolio.balance}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Available Balance
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-accent/10">
                        <div className="text-2xl font-bold text-accent">
                          {userPortfolio.staked}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Staked Amount
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Total Earned:
                        </span>
                        <span className="font-medium text-green-600">
                          {userPortfolio.earned}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Pending Rewards:
                        </span>
                        <span className="font-medium">
                          {userPortfolio.pendingRewards}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Reputation Score:
                        </span>
                        <span className="font-medium text-primary">
                          {userPortfolio.reputationScore}/100
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Claim Rewards
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Stake More
                        </Button>
                        <Button variant="outline">
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          Transfer
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Your Peace Actions
                  </CardTitle>
                  <CardDescription>
                    Track your contributions to global peace
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Resource Sharing</span>
                        <span className="text-primary">+245 PC</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        3 water sharing agreements in East Africa
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Education Support</span>
                        <span className="text-primary">+180 PC</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        VR empathy lab content creation
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          Mediation Assistance
                        </span>
                        <span className="text-primary">+320 PC</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Cultural mediation between communities
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">DAO Participation</span>
                        <span className="text-primary">+89 PC</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Active voting and proposal contributions
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-primary/10">
                    <div className="text-sm font-medium text-primary mb-1">
                      Peace Impact Score
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      847 Points
                    </div>
                    <div className="text-xs text-primary/70">
                      Top 5% of peace builders
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Token Distribution
                </CardTitle>
                <CardDescription>
                  How the 1 billion PeaceCoin supply is allocated
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    {distributionAllocation.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {item.category}
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-bold">
                              {item.percentage}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.amount}
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <h3 className="font-medium mb-2">Release Schedule</h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Genesis:
                          </span>
                          <span>100M PC (10%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Year 1:</span>
                          <span>200M PC (20%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Year 2-5:
                          </span>
                          <span>600M PC (60%)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Year 6-10:
                          </span>
                          <span>100M PC (10%)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Current Status</h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Released:
                          </span>
                          <span className="text-primary">247.8M PC</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Staked:</span>
                          <span className="text-accent">111.1M PC</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Burned:</span>
                          <span className="text-red-600">2.2M PC</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Reserved:
                          </span>
                          <span>752.2M PC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Token Governance Rights
                </CardTitle>
                <CardDescription>
                  How PeaceCoin holders participate in ecosystem governance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border text-center">
                      <Handshake className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-medium mb-1">Voting Power</h3>
                      <p className="text-sm text-muted-foreground">
                        1 PC = 1 vote on all proposals
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border text-center">
                      <Globe className="h-8 w-8 mx-auto mb-2 text-accent" />
                      <h3 className="font-medium mb-1">Proposal Rights</h3>
                      <p className="text-sm text-muted-foreground">
                        1,000+ PC holders can create proposals
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border text-center">
                      <Heart className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h3 className="font-medium mb-1">Council Eligibility</h3>
                      <p className="text-sm text-muted-foreground">
                        10,000+ PC for council nominations
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/30">
                    <h3 className="font-medium mb-3">Governance Incentives</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Active Voting Bonus:</span>
                        <span className="text-green-600">
                          +5% staking rewards
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Proposal Creation:</span>
                        <span className="text-green-600">
                          +100 PC if passed
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Council Participation:</span>
                        <span className="text-green-600">+500 PC monthly</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Constructive Debate:</span>
                        <span className="text-green-600">
                          +25 PC per contribution
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full peace-gradient">
                    Participate in Governance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PeaceCoin;
