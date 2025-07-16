import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Smartphone,
  Download,
  Upload,
  Wifi,
  WifiOff,
  Database,
  Sync,
  Settings,
  Users,
  MessageCircle,
  BookOpen,
  Camera,
  Mic,
  Globe,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Play,
  Pause,
  Volume2,
  Share2,
  Edit,
  Save,
  Target,
  Heart,
  Star,
  TrendingUp,
  Zap,
  Shield,
  Key,
  Code,
  Layers,
  HardDrive,
  CloudOff,
  RefreshCw,
  FileText,
  Video,
  Image,
  Languages,
  MapPin,
  Calendar,
  Bell,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";

interface MobileApp {
  id: string;
  name: string;
  description: string;
  type:
    | "mediation"
    | "dialogue"
    | "education"
    | "documentation"
    | "networking"
    | "storytelling";
  version: string;
  offline: boolean;
  languages: string[];
  size: string;
  downloads: number;
  rating: number;
  lastSync: string;
  dataSize: string;
  batteryOptimized: boolean;
  voiceEnabled: boolean;
  culturalAdaptations: string[];
  minAndroidVersion: string;
  features: string[];
  screenshots: string[];
  developer: string;
  releaseDate: string;
  updateFrequency: string;
}

interface SyncStatus {
  appId: string;
  status: "synced" | "pending" | "failed" | "offline";
  lastSync: string;
  pendingChanges: number;
  dataToUpload: string;
  dataToDownload: string;
}

interface OfflineData {
  stories: number;
  mediationRecords: number;
  voiceNotes: number;
  photos: number;
  contacts: number;
  templates: number;
  totalSize: string;
}

interface DevKit {
  framework: string;
  description: string;
  features: string[];
  examples: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  supportedPlatforms: string[];
}

const mockMobileApps: MobileApp[] = [
  {
    id: "1",
    name: "Peace Circles",
    description:
      "Facilitate community dialogue sessions with cultural protocols and offline functionality",
    type: "mediation",
    version: "2.3.1",
    offline: true,
    languages: ["Swahili", "English", "Kikuyu", "Luo"],
    size: "45 MB",
    downloads: 12847,
    rating: 4.8,
    lastSync: "2024-01-22 14:30",
    dataSize: "2.3 GB",
    batteryOptimized: true,
    voiceEnabled: true,
    culturalAdaptations: [
      "Harambee protocols",
      "Ubuntu principles",
      "Elder respect systems",
    ],
    minAndroidVersion: "6.0",
    features: [
      "Offline dialogue sessions",
      "Voice recording",
      "Cultural templates",
      "Conflict tracking",
    ],
    screenshots: [
      "/screenshots/peace-circles-1.jpg",
      "/screenshots/peace-circles-2.jpg",
    ],
    developer: "PAXIS Community",
    releaseDate: "2023-08-15",
    updateFrequency: "Monthly",
  },
  {
    id: "2",
    name: "Story Keeper",
    description:
      "Preserve and share traditional peace stories with audio narration and cultural context",
    type: "storytelling",
    version: "1.7.4",
    offline: true,
    languages: ["Pashto", "Dari", "Urdu", "English"],
    size: "78 MB",
    downloads: 8934,
    rating: 4.6,
    lastSync: "2024-01-21 09:15",
    dataSize: "1.8 GB",
    batteryOptimized: true,
    voiceEnabled: true,
    culturalAdaptations: [
      "Pashtunwali narratives",
      "Islamic storytelling",
      "Tribal wisdom",
    ],
    minAndroidVersion: "7.0",
    features: [
      "Offline story library",
      "Voice narration",
      "Cultural adaptation",
      "Community sharing",
    ],
    screenshots: [
      "/screenshots/story-keeper-1.jpg",
      "/screenshots/story-keeper-2.jpg",
    ],
    developer: "Afghan Peace Network",
    releaseDate: "2023-11-20",
    updateFrequency: "Bi-weekly",
  },
  {
    id: "3",
    name: "Voice Bridge",
    description:
      "Real-time voice translation and cultural communication bridge for cross-cultural dialogue",
    type: "dialogue",
    version: "3.1.0",
    offline: false,
    languages: ["Bambara", "French", "Fulfulde", "Wolof"],
    size: "32 MB",
    downloads: 15672,
    rating: 4.4,
    lastSync: "2024-01-23 11:45",
    dataSize: "650 MB",
    batteryOptimized: false,
    voiceEnabled: true,
    culturalAdaptations: [
      "Griot tradition",
      "Islamic greetings",
      "Tribal protocols",
    ],
    minAndroidVersion: "8.0",
    features: [
      "Real-time translation",
      "Cultural context",
      "Voice recognition",
      "Offline phrases",
    ],
    screenshots: [
      "/screenshots/voice-bridge-1.jpg",
      "/screenshots/voice-bridge-2.jpg",
    ],
    developer: "West Africa Peace Tech",
    releaseDate: "2024-01-10",
    updateFrequency: "Weekly",
  },
  {
    id: "4",
    name: "Community Healer",
    description:
      "Document and track community healing processes with traditional and modern approaches",
    type: "documentation",
    version: "1.4.2",
    offline: true,
    languages: ["Quechua", "Spanish", "Aymara"],
    size: "56 MB",
    downloads: 4521,
    rating: 4.9,
    lastSync: "2024-01-20 16:20",
    dataSize: "3.1 GB",
    batteryOptimized: true,
    voiceEnabled: true,
    culturalAdaptations: [
      "Andean ceremonies",
      "Pachamama rituals",
      "Ayllu community",
    ],
    minAndroidVersion: "6.0",
    features: [
      "Healing documentation",
      "Ceremony guides",
      "Progress tracking",
      "Sacred calendar",
    ],
    screenshots: [
      "/screenshots/community-healer-1.jpg",
      "/screenshots/community-healer-2.jpg",
    ],
    developer: "Andean Peace Collective",
    releaseDate: "2023-09-30",
    updateFrequency: "Monthly",
  },
  {
    id: "5",
    name: "Peace Network",
    description:
      "Connect with other peacebuilders and share resources across communities",
    type: "networking",
    version: "2.8.1",
    offline: true,
    languages: ["Arabic", "Kurdish", "Turkish", "English"],
    size: "41 MB",
    downloads: 7892,
    rating: 4.5,
    lastSync: "2024-01-22 08:30",
    dataSize: "1.2 GB",
    batteryOptimized: true,
    voiceEnabled: false,
    culturalAdaptations: [
      "Islamic protocols",
      "Kurdish traditions",
      "Tribal networks",
    ],
    minAndroidVersion: "7.0",
    features: [
      "Offline messaging",
      "Resource sharing",
      "Event coordination",
      "Skill matching",
    ],
    screenshots: [
      "/screenshots/peace-network-1.jpg",
      "/screenshots/peace-network-2.jpg",
    ],
    developer: "Middle East Peace Hub",
    releaseDate: "2023-07-12",
    updateFrequency: "Bi-weekly",
  },
  {
    id: "6",
    name: "Learning Peace",
    description:
      "Interactive peace education modules adapted for different age groups and cultures",
    type: "education",
    version: "1.9.3",
    offline: true,
    languages: ["Amharic", "Oromo", "Tigrinya", "English"],
    size: "89 MB",
    downloads: 6234,
    rating: 4.7,
    lastSync: "2024-01-19 13:40",
    dataSize: "2.7 GB",
    batteryOptimized: true,
    voiceEnabled: true,
    culturalAdaptations: [
      "Ethiopian traditions",
      "Coffee ceremony",
      "Orthodox Christianity",
    ],
    minAndroidVersion: "6.0",
    features: [
      "Interactive lessons",
      "Cultural games",
      "Progress tracking",
      "Group activities",
    ],
    screenshots: [
      "/screenshots/learning-peace-1.jpg",
      "/screenshots/learning-peace-2.jpg",
    ],
    developer: "Ethiopian Peace Education",
    releaseDate: "2023-10-05",
    updateFrequency: "Monthly",
  },
];

const mockSyncStatus: SyncStatus[] = [
  {
    appId: "1",
    status: "synced",
    lastSync: "2024-01-22 14:30",
    pendingChanges: 0,
    dataToUpload: "0 MB",
    dataToDownload: "0 MB",
  },
  {
    appId: "2",
    status: "pending",
    lastSync: "2024-01-21 09:15",
    pendingChanges: 7,
    dataToUpload: "12 MB",
    dataToDownload: "3 MB",
  },
  {
    appId: "3",
    status: "failed",
    lastSync: "2024-01-20 18:45",
    pendingChanges: 3,
    dataToUpload: "5 MB",
    dataToDownload: "8 MB",
  },
  {
    appId: "4",
    status: "synced",
    lastSync: "2024-01-20 16:20",
    pendingChanges: 0,
    dataToUpload: "0 MB",
    dataToDownload: "0 MB",
  },
  {
    appId: "5",
    status: "offline",
    lastSync: "2024-01-18 11:30",
    pendingChanges: 15,
    dataToUpload: "28 MB",
    dataToDownload: "0 MB",
  },
  {
    appId: "6",
    status: "synced",
    lastSync: "2024-01-19 13:40",
    pendingChanges: 0,
    dataToUpload: "0 MB",
    dataToDownload: "0 MB",
  },
];

const mockOfflineData: OfflineData = {
  stories: 47,
  mediationRecords: 23,
  voiceNotes: 156,
  photos: 89,
  contacts: 234,
  templates: 12,
  totalSize: "8.9 GB",
};

const devKits: DevKit[] = [
  {
    framework: "Offline-First Framework",
    description:
      "Build apps that work seamlessly without internet connectivity",
    features: [
      "Local SQLite database",
      "Peer-to-peer sync",
      "Conflict resolution",
      "Background sync",
    ],
    examples: [
      "Community dialogue tracker",
      "Offline story library",
      "Mediation session recorder",
    ],
    difficulty: "intermediate",
    supportedPlatforms: ["Android", "iOS", "Web Progressive App"],
  },
  {
    framework: "Voice-First Interface Kit",
    description:
      "Design for non-literate users with voice navigation and audio feedback",
    features: [
      "Speech recognition",
      "Text-to-speech",
      "Audio navigation",
      "Cultural voice profiles",
    ],
    examples: [
      "Voice-guided mediation",
      "Audio story player",
      "Spoken form filling",
    ],
    difficulty: "advanced",
    supportedPlatforms: ["Android", "iOS"],
  },
  {
    framework: "Cultural Localization Engine",
    description: "Multi-language support with deep cultural adaptations",
    features: [
      "RTL language support",
      "Cultural color schemes",
      "Local number formats",
      "Cultural gestures",
    ],
    examples: [
      "Multi-script keyboards",
      "Cultural calendar integration",
      "Respectful icon usage",
    ],
    difficulty: "beginner",
    supportedPlatforms: ["Android", "iOS", "Web"],
  },
];

export default function OfflineMobileDApps() {
  const [isOnline, setIsOnline] = useState(true);
  const [selectedApp, setSelectedApp] = useState<MobileApp | null>(null);
  const [syncInProgress, setSyncInProgress] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("apps");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "failed":
        return "text-red-600";
      case "offline":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "offline":
        return <CloudOff className="h-4 w-4 text-gray-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  const startSync = (appId: string) => {
    setSyncInProgress((prev) => [...prev, appId]);
    // Simulate sync process
    setTimeout(() => {
      setSyncInProgress((prev) => prev.filter((id) => id !== appId));
    }, 3000);
  };

  const filteredApps = mockMobileApps.filter((app) => {
    const matchesType = filterType === "all" || app.type === filterType;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Mobile dApps Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-blue-600" />
            Offline-First Mobile dApps
          </h2>
          <p className="text-gray-600">
            Decentralized peace-building apps that work without internet
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
            <span className="text-sm">
              {isOnline ? "Online" : "Offline Mode"}
            </span>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Sync Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Synchronization Configuration</DialogTitle>
                <DialogDescription>
                  Configure how your apps sync data when online
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-sync">Auto-sync when online</Label>
                    <Switch id="auto-sync" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="wifi-only">WiFi only sync</Label>
                    <Switch id="wifi-only" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="battery-saver">Battery saver mode</Label>
                    <Switch id="battery-saver" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="background-sync">Background sync</Label>
                    <Switch id="background-sync" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Sync Frequency</Label>
                    <Select defaultValue="hourly">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Maximum Storage per App</Label>
                    <Select defaultValue="5gb">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1gb">1 GB</SelectItem>
                        <SelectItem value="5gb">5 GB</SelectItem>
                        <SelectItem value="10gb">10 GB</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* dApp Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {mockMobileApps.length}
            </div>
            <p className="text-xs text-gray-600">Installed dApps</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {mockMobileApps.filter((app) => app.offline).length}
            </div>
            <p className="text-xs text-gray-600">Offline-capable</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {mockOfflineData.totalSize}
            </div>
            <p className="text-xs text-gray-600">Offline Data</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {mockSyncStatus.filter((s) => s.status === "synced").length}
            </div>
            <p className="text-xs text-gray-600">Synced</p>
          </CardContent>
        </Card>
        <Card className="border-teal-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-teal-600">
              {mockMobileApps.filter((app) => app.voiceEnabled).length}
            </div>
            <p className="text-xs text-gray-600">Voice-enabled</p>
          </CardContent>
        </Card>
        <Card className="border-pink-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">
              {mockMobileApps.reduce(
                (acc, app) => acc + app.languages.length,
                0,
              )}
            </div>
            <p className="text-xs text-gray-600">Languages</p>
          </CardContent>
        </Card>
      </div>

      {/* Main dApp Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="apps" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            My dApps
          </TabsTrigger>
          <TabsTrigger value="sync" className="flex items-center gap-2">
            <Sync className="h-4 w-4" />
            Sync Status
          </TabsTrigger>
          <TabsTrigger value="offline" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Offline Data
          </TabsTrigger>
          <TabsTrigger value="devkit" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Dev Kit
          </TabsTrigger>
        </TabsList>

        {/* My dApps Tab */}
        <TabsContent value="apps" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search dApps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="mediation">Mediation</SelectItem>
                <SelectItem value="dialogue">Dialogue</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="storytelling">Storytelling</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => {
              const syncStatus = mockSyncStatus.find((s) => s.appId === app.id);
              const isInSync = syncInProgress.includes(app.id);

              return (
                <Card
                  key={app.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{app.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            v{app.version}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {app.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge
                        variant={app.offline ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {app.offline ? "Offline" : "Online"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {app.type}
                      </Badge>
                      {app.voiceEnabled && (
                        <Badge variant="outline" className="text-xs">
                          <Mic className="h-3 w-3 mr-1" />
                          Voice
                        </Badge>
                      )}
                      {app.batteryOptimized && (
                        <Badge
                          variant="outline"
                          className="text-xs text-green-600"
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Optimized
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-medium">Size:</span> {app.size}
                      </div>
                      <div>
                        <span className="font-medium">Data:</span>{" "}
                        {app.dataSize}
                      </div>
                      <div>
                        <span className="font-medium">Downloads:</span>{" "}
                        {app.downloads.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span>{app.rating}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {app.languages.slice(0, 3).map((lang, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {lang}
                          </Badge>
                        ))}
                        {app.languages.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{app.languages.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium mb-2">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {app.features.slice(0, 2).map((feature, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                        {app.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{app.features.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {syncStatus && (
                      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        {getStatusIcon(syncStatus.status)}
                        <span
                          className={`text-xs ${getStatusColor(syncStatus.status)}`}
                        >
                          {syncStatus.status === "synced"
                            ? "Up to date"
                            : syncStatus.status === "pending"
                              ? `${syncStatus.pendingChanges} changes pending`
                              : syncStatus.status === "failed"
                                ? "Sync failed"
                                : "Offline mode"}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Play className="h-3 w-3 mr-1" />
                        Open
                      </Button>
                      <Button size="sm" variant="outline">
                        <Info className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Sync Status Tab */}
        <TabsContent value="sync" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sync className="h-5 w-5" />
                  Synchronization Status
                </CardTitle>
                <CardDescription>
                  Monitor data sync across all apps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSyncStatus.map((status) => {
                    const app = mockMobileApps.find(
                      (a) => a.id === status.appId,
                    );
                    const isInSync = syncInProgress.includes(status.appId);

                    return (
                      <div
                        key={status.appId}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(status.status)}
                            <div>
                              <h4 className="font-medium text-sm">
                                {app?.name}
                              </h4>
                              <p className="text-xs text-gray-600">
                                Last sync: {status.lastSync}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startSync(status.appId)}
                            disabled={isInSync || !isOnline}
                          >
                            {isInSync ? (
                              <>
                                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                Syncing
                              </>
                            ) : (
                              <>
                                <Sync className="h-3 w-3 mr-1" />
                                Sync Now
                              </>
                            )}
                          </Button>
                        </div>

                        {status.pendingChanges > 0 && (
                          <div className="grid grid-cols-3 gap-4 text-xs">
                            <div>
                              <span className="font-medium">Pending:</span>{" "}
                              {status.pendingChanges}
                            </div>
                            <div>
                              <span className="font-medium">Upload:</span>{" "}
                              {status.dataToUpload}
                            </div>
                            <div>
                              <span className="font-medium">Download:</span>{" "}
                              {status.dataToDownload}
                            </div>
                          </div>
                        )}

                        {isInSync && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Synchronizing data...</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sync Analytics</CardTitle>
                <CardDescription>Data transfer statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      156 MB
                    </div>
                    <p className="text-xs text-gray-600">Today's Upload</p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      89 MB
                    </div>
                    <p className="text-xs text-gray-600">Today's Download</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sync Success Rate</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network Usage (Today)</span>
                      <span>245 MB</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage Used</span>
                      <span>8.9 GB / 15 GB</span>
                    </div>
                    <Progress value={59} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Recent Sync Activity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Peace Circles - Voice recordings</span>
                      <span className="text-green-600">✓ 2min ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Story Keeper - New stories</span>
                      <span className="text-green-600">✓ 15min ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community Healer - Progress data</span>
                      <span className="text-yellow-600">⏳ Pending</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Offline Data Tab */}
        <TabsContent value="offline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Offline Data Storage
                </CardTitle>
                <CardDescription>
                  Local data available without internet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {mockOfflineData.stories}
                    </div>
                    <p className="text-xs text-gray-600">Stories</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {mockOfflineData.mediationRecords}
                    </div>
                    <p className="text-xs text-gray-600">Mediation Records</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {mockOfflineData.voiceNotes}
                    </div>
                    <p className="text-xs text-gray-600">Voice Notes</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {mockOfflineData.photos}
                    </div>
                    <p className="text-xs text-gray-600">Photos</p>
                  </div>
                  <div className="text-center p-3 bg-teal-50 rounded-lg">
                    <div className="text-2xl font-bold text-teal-600">
                      {mockOfflineData.contacts}
                    </div>
                    <p className="text-xs text-gray-600">Contacts</p>
                  </div>
                  <div className="text-center p-3 bg-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600">
                      {mockOfflineData.templates}
                    </div>
                    <p className="text-xs text-gray-600">Templates</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Total Offline Storage</span>
                      <span>{mockOfflineData.totalSize} / 15 GB</span>
                    </div>
                    <Progress value={59} className="h-2" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Storage by App</h4>
                  <div className="space-y-3">
                    {mockMobileApps
                      .filter((app) => app.offline)
                      .map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{app.name}</span>
                          <span className="text-gray-600">{app.dataSize}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <HardDrive className="h-4 w-4 mr-2" />
                    Manage Storage
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Control your offline data preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-download">Auto-download content</Label>
                    <Switch id="auto-download" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compress-media">Compress media files</Label>
                    <Switch id="compress-media" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cache-audio">Cache audio narrations</Label>
                    <Switch id="cache-audio" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="backup-local">Local backup enabled</Label>
                    <Switch id="backup-local" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Auto-cleanup older than</Label>
                    <Select defaultValue="30days">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">7 days</SelectItem>
                        <SelectItem value="30days">30 days</SelectItem>
                        <SelectItem value="90days">90 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Max storage per app</Label>
                    <Select defaultValue="2gb">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500mb">500 MB</SelectItem>
                        <SelectItem value="1gb">1 GB</SelectItem>
                        <SelectItem value="2gb">2 GB</SelectItem>
                        <SelectItem value="5gb">5 GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh All Offline Data
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Backup to Cloud
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Essential Data
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm text-red-600"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Clear All Offline Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Dev Kit Tab */}
        <TabsContent value="devkit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Offline-First Development Kit
              </CardTitle>
              <CardDescription>
                Tools and frameworks for building community peace apps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {devKits.map((kit, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-4">
                    <div>
                      <h4 className="font-medium">{kit.framework}</h4>
                      <p className="text-sm text-gray-600 mt-2">
                        {kit.description}
                      </p>
                    </div>

                    <div>
                      <Badge
                        variant={
                          kit.difficulty === "beginner"
                            ? "default"
                            : kit.difficulty === "intermediate"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {kit.difficulty}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-xs font-medium mb-2">Key Features:</p>
                      <div className="space-y-1">
                        {kit.features.map((feature, featureIdx) => (
                          <div
                            key={featureIdx}
                            className="flex items-center gap-2 text-xs"
                          >
                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium mb-2">Example Apps:</p>
                      <div className="space-y-1">
                        {kit.examples.map((example, exampleIdx) => (
                          <Badge
                            key={exampleIdx}
                            variant="outline"
                            className="text-xs mr-1 mb-1"
                          >
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium mb-2">Platforms:</p>
                      <div className="flex flex-wrap gap-1">
                        {kit.supportedPlatforms.map((platform, platformIdx) => (
                          <Badge
                            key={platformIdx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Get Started
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-3 w-3 mr-1" />
                        Docs
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Quick Start Templates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        <span className="font-medium">
                          Community Dialogue App
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 text-left">
                        Template for offline dialogue facilitation with cultural
                        protocols
                      </p>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        <span className="font-medium">
                          Story Sharing Platform
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 text-left">
                        Template for cultural story preservation with voice
                        narration
                      </p>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        <span className="font-medium">Documentation Tool</span>
                      </div>
                      <p className="text-sm text-gray-600 text-left">
                        Template for conflict documentation and progress
                        tracking
                      </p>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 justify-start"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <span className="font-medium">Network Builder</span>
                      </div>
                      <p className="text-sm text-gray-600 text-left">
                        Template for connecting peacebuilders across communities
                      </p>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
