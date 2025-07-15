import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  Home,
  Shield,
  Users,
  MapPin,
  Navigation,
  Smartphone,
  Coins,
  Heart,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Phone,
  MessageCircle,
  FileText,
  Briefcase,
  GraduationCap,
  Hospital,
  Store,
  Car,
  Wifi,
  Globe,
  UserCheck,
  Eye,
  Download,
  Share,
  Plus,
  LogOut,
} from "lucide-react";

const communityMetrics = [
  { title: "Network Members", value: "12.4K", change: "+234", trend: "up" },
  { title: "Safe Zone Alerts", value: "89", change: "-12", trend: "down" },
  { title: "Identity Verified", value: "98%", change: "+3%", trend: "up" },
  { title: "Resources Accessed", value: "456", change: "+67", trend: "up" },
];

const safeZoneAlerts = [
  {
    id: 1,
    location: "Zaatari Refugee Camp, Jordan",
    alertType: "Service Disruption",
    severity: "Medium",
    description: "Water distribution delayed until 3 PM",
    timestamp: "2 hours ago",
    affectedPopulation: 2340,
    status: "Active",
    responseTeam: "UNHCR Water Team",
  },
  {
    id: 2,
    location: "Kakuma Camp, Kenya",
    alertType: "Security Update",
    severity: "Low",
    description: "Increased security presence - routine patrol",
    timestamp: "4 hours ago",
    affectedPopulation: 890,
    status: "Resolved",
    responseTeam: "UNHCR Security",
  },
  {
    id: 3,
    location: "Cox's Bazar, Bangladesh",
    alertType: "Weather Warning",
    severity: "High",
    description: "Monsoon flooding expected - evacuation routes open",
    timestamp: "1 hour ago",
    affectedPopulation: 15600,
    status: "Critical",
    responseTeam: "Emergency Response Team",
  },
];

const identityWallet = {
  verified: true,
  documents: [
    {
      type: "UNHCR Registration",
      status: "Verified",
      issueDate: "2023-08-15",
      expiryDate: "2024-08-15",
      blockchainHash: "0x742d35Cc6435C3...",
    },
    {
      type: "Education Certificate",
      status: "Verified",
      issueDate: "2023-06-20",
      expiryDate: "N/A",
      blockchainHash: "0x8c9f4a2b1e7d3...",
    },
    {
      type: "Skill Certification",
      status: "Pending",
      issueDate: "2024-01-10",
      expiryDate: "2025-01-10",
      blockchainHash: "0x5a8b2c4d9e1f6...",
    },
  ],
  trustedValidators: [
    "UNHCR Digital Identity Hub",
    "International Rescue Committee",
    "Doctors Without Borders",
    "Community Elder Council",
  ],
};

const supportNetwork = [
  {
    id: 1,
    name: "Amara Hassan",
    role: "Community Coordinator",
    location: "Zaatari Camp, Jordan",
    languages: ["Arabic", "English"],
    expertise: ["Legal Aid", "Family Reunification"],
    availability: "Online",
    responseTime: "< 30 min",
    rating: 4.9,
    helpCount: 234,
  },
  {
    id: 2,
    name: "Dr. Joseph Mukuwa",
    role: "Medical Coordinator",
    location: "Kakuma Camp, Kenya",
    languages: ["Swahili", "English", "Arabic"],
    expertise: ["Healthcare", "Mental Health", "Child Care"],
    availability: "Busy",
    responseTime: "< 2 hours",
    rating: 4.8,
    helpCount: 567,
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Education Specialist",
    location: "Virtual - Global",
    languages: ["English", "Mandarin", "French"],
    expertise: ["Online Learning", "Skill Training", "Certification"],
    availability: "Online",
    responseTime: "< 15 min",
    rating: 4.7,
    helpCount: 892,
  },
];

const resourceAccess = [
  {
    category: "Essential Services",
    services: [
      {
        name: "Healthcare Access",
        status: "Available",
        provider: "MSF Clinic",
        distance: "0.3 km",
      },
      {
        name: "Education Programs",
        status: "Available",
        provider: "UNICEF Learning Center",
        distance: "0.5 km",
      },
      {
        name: "Legal Aid",
        status: "Available",
        provider: "Legal Aid Society",
        distance: "Virtual",
      },
      {
        name: "Psychological Support",
        status: "Available",
        provider: "Mental Health NGO",
        distance: "0.2 km",
      },
    ],
  },
  {
    category: "Economic Opportunities",
    services: [
      {
        name: "Skill Training",
        status: "Available",
        provider: "ILO Training Center",
        distance: "0.8 km",
      },
      {
        name: "Microcredit Program",
        status: "Waitlist",
        provider: "Grameen Bank",
        distance: "Virtual",
      },
      {
        name: "Digital Work Platform",
        status: "Available",
        provider: "Refugee Work Hub",
        distance: "Virtual",
      },
      {
        name: "Small Business Support",
        status: "Available",
        provider: "UNDP Enterprise",
        distance: "1.2 km",
      },
    ],
  },
  {
    category: "Community Support",
    services: [
      {
        name: "Cultural Events",
        status: "Available",
        provider: "Community Center",
        distance: "0.4 km",
      },
      {
        name: "Language Exchange",
        status: "Available",
        provider: "Language Circle",
        distance: "Virtual",
      },
      {
        name: "Childcare Services",
        status: "Available",
        provider: "Community Mothers",
        distance: "0.1 km",
      },
      {
        name: "Elder Care",
        status: "Available",
        provider: "Respect Elders Group",
        distance: "0.3 km",
      },
    ],
  },
];

const peaceCoinEarning = [
  {
    activity: "Community Volunteer Work",
    description: "Help new arrivals navigate settlement",
    earning: "25 PC per hour",
    availability: "Daily",
    requirements: ["Language skills", "Orientation training"],
    currentEarnings: 450,
  },
  {
    activity: "Digital Skills Training",
    description: "Teach basic computer and smartphone skills",
    earning: "40 PC per session",
    availability: "3x per week",
    requirements: ["Digital literacy", "Teaching ability"],
    currentEarnings: 320,
  },
  {
    activity: "Cultural Bridge Building",
    description: "Facilitate integration activities with host community",
    earning: "60 PC per event",
    availability: "Weekly",
    requirements: ["Cultural awareness", "Communication skills"],
    currentEarnings: 180,
  },
  {
    activity: "Peer Support Counseling",
    description: "Provide emotional support to fellow refugees",
    earning: "35 PC per session",
    availability: "Flexible",
    requirements: ["Counseling training", "Emotional maturity"],
    currentEarnings: 280,
  },
];

const offlineCapabilities = [
  {
    feature: "Emergency Contacts",
    status: "Synced",
    lastUpdate: "2 hours ago",
    dataSize: "2.3 MB",
    functionality:
      "View emergency numbers, trusted contacts, and crisis protocols",
  },
  {
    feature: "Identity Documents",
    status: "Synced",
    lastUpdate: "1 day ago",
    dataSize: "15.7 MB",
    functionality:
      "Access verified identity documents and certificates offline",
  },
  {
    feature: "Resource Maps",
    status: "Synced",
    lastUpdate: "6 hours ago",
    dataSize: "8.9 MB",
    functionality: "Navigate to essential services, safe zones, and facilities",
  },
  {
    feature: "Language Tools",
    status: "Synced",
    lastUpdate: "3 days ago",
    dataSize: "45.2 MB",
    functionality: "Translation tools and phrase books for local languages",
  },
  {
    feature: "Community Messages",
    status: "Partial",
    lastUpdate: "30 min ago",
    dataSize: "12.1 MB",
    functionality: "Recent community announcements and safety updates",
  },
];

export default function RefugeeDisplacedDashboard() {
  const { user, earnPeaceCoin, logout } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleLogout = () => {
    logout();
  };

  const handleConnectSupport = () => {
    earnPeaceCoin(50, "Connected with community support volunteer");
  };

  const handleVerifyIdentity = () => {
    earnPeaceCoin(100, "Updated verified identity credentials");
  };

  const handleEarnCoins = () => {
    earnPeaceCoin(75, "Completed community volunteer activity");
  };

  const handleOfflineSync = () => {
    earnPeaceCoin(25, "Synchronized offline data for safe access");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Community Connection Hub
            </h1>
            <p className="text-gray-600">
              Rebuilding dignity, maintaining identity • {user?.name} •{" "}
              {user?.location || "Safe Zone"}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800">
              <UserCheck className="w-3 h-3 mr-1" />
              Verified Member
            </Badge>
            <div className="text-right">
              <div className="text-sm font-medium">
                {user?.peaceCoinBalance || "1,230"} PeaceCoins
              </div>
              <div className="text-xs text-gray-500">
                Community Score: {user?.contributionScore || "94"}
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
        {/* Key Community Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {communityMetrics.map((metric, index) => (
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
                          : metric.trend === "down"
                            ? "text-blue-600"
                            : "text-red-600"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {metric.change}
                    </p>
                  </div>
                  <Home className="w-8 h-8 text-green-600" />
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
            <TabsTrigger value="safe-zones">Safe Zones</TabsTrigger>
            <TabsTrigger value="identity">Identity Wallet</TabsTrigger>
            <TabsTrigger value="support-network">Support Network</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="offline">Offline Access</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Identity Status */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Identity & Verification Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-medium text-sm">
                            Identity Verified
                          </div>
                          <div className="text-xs text-gray-600">
                            Self-sovereign ID on blockchain
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        98% Trust
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Documents Verified:</span>
                        <span className="font-medium">
                          {
                            identityWallet.documents.filter(
                              (d) => d.status === "Verified",
                            ).length
                          }
                          /{identityWallet.documents.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Trusted Validators:</span>
                        <span className="font-medium">
                          {identityWallet.trustedValidators.length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Community Validation:</span>
                        <span className="font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Community Activity */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Community Connection</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          2.4K
                        </div>
                        <div className="text-xs text-gray-600">
                          Network Connections
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          156
                        </div>
                        <div className="text-xs text-gray-600">
                          Mutual Support Acts
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="text-sm font-medium mb-2">
                        Recent Support Received
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center">
                          <Hospital className="w-3 h-3 mr-2 text-blue-500" />
                          Connected with healthcare provider
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="w-3 h-3 mr-2 text-green-500" />
                          Enrolled in digital skills training
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-3 h-3 mr-2 text-red-500" />
                          Received emotional support session
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* PeaceCoin Earning Overview */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="w-5 h-5" />
                  <span>Community Contribution & Earning</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {peaceCoinEarning.slice(0, 4).map((activity, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium text-sm mb-1">
                        {activity.activity}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {activity.earning}
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        {activity.currentEarnings} PC
                      </div>
                      <div className="text-xs text-gray-500">This month</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    onClick={handleConnectSupport}
                  >
                    <Users className="w-6 h-6" />
                    <span>Connect Support</span>
                    <span className="text-xs text-green-100">
                      50 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleVerifyIdentity}
                  >
                    <Shield className="w-6 h-6" />
                    <span>Update Identity</span>
                    <span className="text-xs text-gray-500">
                      100 PeaceCoins
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleEarnCoins}
                  >
                    <Coins className="w-6 h-6" />
                    <span>Volunteer Work</span>
                    <span className="text-xs text-gray-500">75 PeaceCoins</span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleOfflineSync}
                  >
                    <Smartphone className="w-6 h-6" />
                    <span>Sync Offline</span>
                    <span className="text-xs text-gray-500">25 PeaceCoins</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safe Zones Tab */}
          <TabsContent value="safe-zones" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Safe Zone Alerts & Navigation
              </h2>
              <Button>
                <MapPin className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {safeZoneAlerts.map((alert) => (
                <Card key={alert.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {alert.location}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {alert.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {alert.affectedPopulation.toLocaleString()} affected
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {alert.timestamp}
                          </span>
                          <span>Response: {alert.responseTeam}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            alert.severity === "Critical" ||
                            alert.severity === "High"
                              ? "bg-red-100 text-red-800"
                              : alert.severity === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {alert.severity}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {alert.alertType}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge
                        className={
                          alert.status === "Critical"
                            ? "bg-red-100 text-red-800"
                            : alert.status === "Active"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {alert.status}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Navigation className="w-4 h-4 mr-2" />
                          Navigate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share className="w-4 h-4 mr-2" />
                          Share Alert
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Identity Wallet Tab */}
          <TabsContent value="identity" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Self-Sovereign Identity Wallet
              </h2>
              <Button onClick={handleVerifyIdentity}>
                <Shield className="w-4 h-4 mr-2" />
                Update Documents
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Identity Documents */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle>Verified Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {identityWallet.documents.map((doc, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{doc.type}</div>
                          <Badge
                            variant="outline"
                            className={
                              doc.status === "Verified"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {doc.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>Issued: {doc.issueDate}</div>
                          {doc.expiryDate !== "N/A" && (
                            <div>Expires: {doc.expiryDate}</div>
                          )}
                          <div className="font-mono text-xs mt-1">
                            Hash: {doc.blockchainHash}
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Trusted Validators */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle>Trusted Validator Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {identityWallet.trustedValidators.map(
                      (validator, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <div>
                              <div className="font-medium text-sm">
                                {validator}
                              </div>
                              <div className="text-xs text-gray-500">
                                Active Validator
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">Trusted</Badge>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Validator Benefits
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Document verification and attestation</li>
                      <li>• Identity recovery assistance</li>
                      <li>• Community reputation building</li>
                      <li>• Cross-border identity recognition</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Support Network Tab */}
          <TabsContent value="support-network" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Peer Support Network</h2>
              <Button onClick={handleConnectSupport}>
                <Users className="w-4 h-4 mr-2" />
                Find Support
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportNetwork.map((supporter) => (
                <Card key={supporter.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{supporter.name}</h3>
                          <p className="text-sm text-gray-600">
                            {supporter.role}
                          </p>
                          <p className="text-xs text-gray-500">
                            {supporter.location}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            supporter.availability === "Online"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {supporter.availability}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <div className="text-sm font-medium">Languages</div>
                          <div className="flex flex-wrap gap-1">
                            {supporter.languages.map((lang, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium">Expertise</div>
                          <div className="flex flex-wrap gap-1">
                            {supporter.expertise.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Response:</span>
                          <div className="font-medium">
                            {supporter.responseTime}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Rating:</span>
                          <div className="font-medium">
                            {supporter.rating}/5.0
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        Helped {supporter.helpCount} community members
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={handleConnectSupport}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Resource Access & Services
              </h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Request Service
              </Button>
            </div>

            <div className="space-y-6">
              {resourceAccess.map((category, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.services.map((service, serviceIndex) => (
                        <div
                          key={serviceIndex}
                          className="p-3 border rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-sm">
                              {service.name}
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                service.status === "Available"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {service.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            <div>Provider: {service.provider}</div>
                            <div>Distance: {service.distance}</div>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <Button size="sm" variant="outline">
                              <Navigation className="w-3 h-3 mr-1" />
                              Navigate
                            </Button>
                            <Button size="sm" variant="outline">
                              <Phone className="w-3 h-3 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Offline Access Tab */}
          <TabsContent value="offline" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Offline-Capable Mobile Access
              </h2>
              <Button onClick={handleOfflineSync}>
                <Smartphone className="w-4 h-4 mr-2" />
                Sync All Data
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offlineCapabilities.map((capability, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{capability.feature}</h3>
                          <p className="text-sm text-gray-600">
                            {capability.functionality}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            capability.status === "Synced"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {capability.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Last Update:</span>
                          <div className="font-medium">
                            {capability.lastUpdate}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Data Size:</span>
                          <div className="font-medium">
                            {capability.dataSize}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Access
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={handleOfflineSync}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle>Crypto-to-Cash PeaceCoin Bridge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">
                      Available Exchange Options
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">
                              Mobile Money
                            </div>
                            <div className="text-xs text-gray-500">
                              M-Pesa, MTN Mobile Money
                            </div>
                          </div>
                          <Badge variant="outline">Available</Badge>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">
                              Local Cash Pickup
                            </div>
                            <div className="text-xs text-gray-500">
                              Community exchange points
                            </div>
                          </div>
                          <Badge variant="outline">Available</Badge>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">
                              Prepaid Cards
                            </div>
                            <div className="text-xs text-gray-500">
                              Phone credit, transport cards
                            </div>
                          </div>
                          <Badge variant="outline">Available</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">
                      Current Balance & Exchange
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          1,230 PC
                        </div>
                        <div className="text-sm text-gray-600">
                          Available PeaceCoins
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="text-sm text-gray-600">
                          Current Exchange Rate
                        </div>
                        <div className="font-medium">
                          1 PC = 0.85 USD equivalent
                        </div>
                      </div>
                      <Button className="w-full">
                        <Coins className="w-4 h-4 mr-2" />
                        Exchange PeaceCoins
                      </Button>
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
