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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import {
  Users,
  Heart,
  Globe,
  Mic,
  BookOpen,
  Smartphone,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  Upload,
  MapPin,
  Calendar,
  Clock,
  Star,
  MessageCircle,
  Video,
  Headphones,
  Languages,
  Wifi,
  WifiOff,
  User,
  Edit,
  Save,
  Share2,
  FileText,
  Camera,
  Mic2,
  Settings,
  BarChart3,
  TrendingUp,
  Target,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

// Mock data interfaces
interface CommunityMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  language: string;
  location: string;
  trustScore: number;
  activeConflicts: number;
  resolvedConflicts: number;
}

interface ConflictCase {
  id: string;
  title: string;
  type: string;
  status: "active" | "mediation" | "resolved" | "escalated";
  priority: "low" | "medium" | "high" | "urgent";
  parties: string[];
  mediator: string;
  startDate: string;
  location: string;
  culturalContext: string;
  storyElements: string[];
}

interface VRScenario {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  cultures: string[];
  completionRate: number;
  empathyScore: number;
  language: string;
}

interface StoryTemplate {
  id: string;
  title: string;
  culture: string;
  category: string;
  template: string;
  audioFile?: string;
  visualElements: string[];
  moralLesson: string;
  adaptable: boolean;
}

interface MobileApp {
  id: string;
  name: string;
  type: "mediation" | "dialogue" | "education" | "documentation";
  offline: boolean;
  languages: string[];
  downloads: number;
  rating: number;
  lastSync: string;
}

interface VoiceSession {
  id: string;
  participant: string;
  language: string;
  duration: number;
  topic: string;
  sentiment: "positive" | "neutral" | "negative";
  transcription: string;
  translation?: string;
}

// Mock data
const mockCommunityMembers: CommunityMember[] = [
  {
    id: "1",
    name: "Amara Diallo",
    role: "Community Elder",
    avatar: "/avatars/amara.jpg",
    language: "Bambara",
    location: "Mali",
    trustScore: 98,
    activeConflicts: 2,
    resolvedConflicts: 47,
  },
  {
    id: "2",
    name: "Hassan Al-Rashid",
    role: "Religious Leader",
    avatar: "/avatars/hassan.jpg",
    language: "Pashto",
    location: "Afghanistan",
    trustScore: 95,
    activeConflicts: 1,
    resolvedConflicts: 31,
  },
  {
    id: "3",
    name: "Maria Santos",
    role: "NGO Coordinator",
    avatar: "/avatars/maria.jpg",
    language: "Quechua",
    location: "Peru",
    trustScore: 92,
    activeConflicts: 3,
    resolvedConflicts: 28,
  },
];

const mockConflicts: ConflictCase[] = [
  {
    id: "1",
    title: "Water Rights Dispute",
    type: "Resource Conflict",
    status: "mediation",
    priority: "high",
    parties: ["Farmers Association", "Herders Union"],
    mediator: "Amara Diallo",
    startDate: "2024-01-15",
    location: "Bamako Region, Mali",
    culturalContext:
      "Traditional water sharing customs vs. modern farming needs",
    storyElements: ["Ancient well legends", "Seasonal migration patterns"],
  },
  {
    id: "2",
    title: "Youth-Elder Generation Gap",
    type: "Social Conflict",
    status: "active",
    priority: "medium",
    parties: ["Village Youth Council", "Council of Elders"],
    mediator: "Hassan Al-Rashid",
    startDate: "2024-01-20",
    location: "Kabul Province, Afghanistan",
    culturalContext: "Traditional values vs. digital age aspirations",
    storyElements: ["Stories of wisdom", "Dreams of innovation"],
  },
];

const mockVRScenarios: VRScenario[] = [
  {
    id: "1",
    title: "Cultural Bridge Building",
    description:
      "Experience cross-cultural communication challenges and solutions",
    duration: 25,
    difficulty: "intermediate",
    cultures: ["Akan", "Fulani"],
    completionRate: 87,
    empathyScore: 94,
    language: "English",
  },
  {
    id: "2",
    title: "Family Mediation Scenario",
    description: "Navigate complex family disputes with cultural sensitivity",
    duration: 30,
    difficulty: "advanced",
    cultures: ["Pashtun"],
    completionRate: 72,
    empathyScore: 91,
    language: "Pashto",
  },
];

const mockStoryTemplates: StoryTemplate[] = [
  {
    id: "1",
    title: "The Wise Elephant",
    culture: "West African",
    category: "Conflict Resolution",
    template: "Once upon a time, in a village where {conflict_type} arose...",
    audioFile: "/audio/wise_elephant_bambara.mp3",
    visualElements: [
      "Elephant illustrations",
      "Village scenes",
      "Traditional patterns",
    ],
    moralLesson: "Patience and wisdom can resolve the deepest conflicts",
    adaptable: true,
  },
  {
    id: "2",
    title: "The Mountain and the River",
    culture: "Central Asian",
    category: "Resource Sharing",
    template: "High in the mountains where {parties} once lived in harmony...",
    audioFile: "/audio/mountain_river_pashto.mp3",
    visualElements: [
      "Mountain landscapes",
      "Flowing water",
      "Traditional clothing",
    ],
    moralLesson: "True strength comes from sharing, not hoarding",
    adaptable: true,
  },
];

export default function GrassrootsBuilderDashboard() {
  const [activeTab, setActiveTab] = useState("command");
  const [isOnline, setIsOnline] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [voiceRecording, setVoiceRecording] = useState(false);

  // Real-time metrics state
  const [metrics, setMetrics] = useState({
    activeCommunities: 127,
    ongoingMediations: 23,
    resolvedConflicts: 892,
    trainedMediators: 1547,
    storiesShared: 3421,
    offlineUsers: 45,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        activeCommunities:
          prev.activeCommunities + Math.floor(Math.random() * 3),
        ongoingMediations: Math.max(
          0,
          prev.ongoingMediations + Math.floor(Math.random() * 5) - 2,
        ),
        resolvedConflicts:
          prev.resolvedConflicts + Math.floor(Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleVoiceToggle = () => {
    setVoiceRecording(!voiceRecording);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Grassroots Peacebuilder Command
            </h1>
            <p className="text-gray-600 mt-2">
              Empowering communities through dialogue, mediation, and cultural
              harmony
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
            </div>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Swahili">Kiswahili</SelectItem>
                <SelectItem value="Pashto">پښتو</SelectItem>
                <SelectItem value="Bambara">Bamanankan</SelectItem>
                <SelectItem value="Arabic">العربية</SelectItem>
                <SelectItem value="Quechua">Runasimi</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={voiceRecording ? "destructive" : "outline"}
              size="sm"
              onClick={handleVoiceToggle}
              className="flex items-center gap-2"
            >
              {voiceRecording ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
              {voiceRecording ? "Stop Voice" : "Voice Input"}
            </Button>
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {metrics.activeCommunities}
                  </p>
                  <p className="text-xs text-gray-600">Active Communities</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    {metrics.ongoingMediations}
                  </p>
                  <p className="text-xs text-gray-600">Ongoing Mediations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {metrics.resolvedConflicts}
                  </p>
                  <p className="text-xs text-gray-600">Resolved Conflicts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {metrics.trainedMediators}
                  </p>
                  <p className="text-xs text-gray-600">Trained Mediators</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-2xl font-bold text-teal-600">
                    {metrics.storiesShared}
                  </p>
                  <p className="text-xs text-gray-600">Stories Shared</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {metrics.offlineUsers}
                  </p>
                  <p className="text-xs text-gray-600">Offline Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="command" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Command
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="mediation" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Mediation
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              VR Training
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Stories
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile dApps
            </TabsTrigger>
          </TabsList>

          {/* Command Center Tab */}
          <TabsContent value="command" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Global Impact Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Global Impact Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Africa</span>
                        <span>67 communities</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Asia</span>
                        <span>43 communities</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Americas</span>
                        <span>17 communities</span>
                      </div>
                      <Progress value={34} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Mediations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Active Mediations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48">
                    <div className="space-y-3">
                      {mockConflicts.map((conflict) => (
                        <div
                          key={conflict.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium text-sm">
                              {conflict.title}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {conflict.location}
                            </p>
                          </div>
                          <Badge
                            variant={
                              conflict.priority === "urgent"
                                ? "destructive"
                                : conflict.priority === "high"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {conflict.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Language Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Languages className="h-5 w-5" />
                    Language Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { lang: "Swahili", users: 342, coverage: 85 },
                      { lang: "Pashto", users: 187, coverage: 72 },
                      { lang: "Bambara", users: 156, coverage: 68 },
                      { lang: "Quechua", users: 94, coverage: 54 },
                      { lang: "Arabic", users: 223, coverage: 91 },
                    ].map((item) => (
                      <div
                        key={item.lang}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <span className="font-medium text-sm">
                            {item.lang}
                          </span>
                          <span className="text-xs text-gray-600 ml-2">
                            ({item.users} users)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={item.coverage}
                            className="w-16 h-2"
                          />
                          <span className="text-xs">{item.coverage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Health */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Community Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold text-green-600">87%</div>
                    <p className="text-sm text-gray-600">
                      Overall community harmony index
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Trust Level</p>
                        <p className="text-green-600">92%</p>
                      </div>
                      <div>
                        <p className="font-medium">Engagement</p>
                        <p className="text-blue-600">84%</p>
                      </div>
                      <div>
                        <p className="font-medium">Resolution Rate</p>
                        <p className="text-purple-600">89%</p>
                      </div>
                      <div>
                        <p className="font-medium">Cultural Harmony</p>
                        <p className="text-orange-600">91%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Community Members</CardTitle>
                  <CardDescription>
                    Active mediators and community leaders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCommunityMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{member.name}</h4>
                            <p className="text-sm text-gray-600">
                              {member.role}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Languages className="h-3 w-3" />
                                {member.language}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {member.location}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">
                              {member.trustScore}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">
                            {member.resolvedConflicts} resolved
                          </p>
                          <p className="text-xs text-gray-600">
                            {member.activeConflicts} active
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Invite New Mediator
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Community Dialogue
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Peace Circle
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Share Cultural Story
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Mic className="h-4 w-4 mr-2" />
                    Record Voice Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mediation Tab */}
          <TabsContent value="mediation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Cases</CardTitle>
                  <CardDescription>
                    Ongoing mediation and dialogue sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockConflicts.map((conflict) => (
                      <div
                        key={conflict.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{conflict.title}</h4>
                          <Badge
                            variant={
                              conflict.status === "resolved"
                                ? "default"
                                : conflict.status === "mediation"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {conflict.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{conflict.type}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {conflict.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {conflict.startDate}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-1">Parties:</p>
                          <div className="flex flex-wrap gap-1">
                            {conflict.parties.map((party, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {party}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">
                          <span className="font-medium">Cultural Context:</span>{" "}
                          {conflict.culturalContext}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Join Session
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Voice Input Session</CardTitle>
                  <CardDescription>
                    Real-time voice-to-text for non-literate participants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button
                      size="lg"
                      variant={voiceRecording ? "destructive" : "default"}
                      onClick={handleVoiceToggle}
                      className="flex items-center gap-2"
                    >
                      {voiceRecording ? (
                        <>
                          <VolumeX className="h-5 w-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic2 className="h-5 w-5" />
                          Start Voice Input
                        </>
                      )}
                    </Button>
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Swahili">Kiswahili</SelectItem>
                        <SelectItem value="Pashto">پښتو</SelectItem>
                        <SelectItem value="Bambara">Bamanankan</SelectItem>
                        <SelectItem value="Arabic">العربية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {voiceRecording && (
                    <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 text-red-600">
                        <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                        <span className="font-medium">
                          Recording in {selectedLanguage}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Audio Level</span>
                          <span>Recording: 0:23</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="font-medium">Recent Voice Sessions</h4>
                    {[
                      {
                        id: "1",
                        participant: "Community Member",
                        language: "Bambara",
                        duration: 125,
                        topic: "Water dispute concerns",
                        sentiment: "neutral" as const,
                        transcription:
                          "We need to find a way to share the water fairly between all families...",
                      },
                      {
                        id: "2",
                        participant: "Elder",
                        language: "Pashto",
                        duration: 89,
                        topic: "Traditional mediation",
                        sentiment: "positive" as const,
                        transcription:
                          "In the old ways, we would gather under the tree and speak from the heart...",
                      },
                    ].map((session) => (
                      <div
                        key={session.id}
                        className="border rounded-lg p-3 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {session.participant}
                          </span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {session.language}
                            </Badge>
                            <Badge
                              variant={
                                session.sentiment === "positive"
                                  ? "default"
                                  : session.sentiment === "negative"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {session.sentiment}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">
                          {session.transcription}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{session.duration}s</span>
                          <span>{session.topic}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* VR Training Tab */}
          <TabsContent value="training" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="h-5 w-5" />
                    VR Empathy Training
                  </CardTitle>
                  <CardDescription>
                    Immersive cultural understanding experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockVRScenarios.map((scenario) => (
                      <div
                        key={scenario.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{scenario.title}</h4>
                          <Badge
                            variant={
                              scenario.difficulty === "beginner"
                                ? "default"
                                : scenario.difficulty === "intermediate"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {scenario.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {scenario.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="font-medium">Duration:</span>{" "}
                            {scenario.duration}min
                          </div>
                          <div>
                            <span className="font-medium">Language:</span>{" "}
                            {scenario.language}
                          </div>
                          <div>
                            <span className="font-medium">Completion:</span>{" "}
                            {scenario.completionRate}%
                          </div>
                          <div>
                            <span className="font-medium">Empathy Score:</span>{" "}
                            {scenario.empathyScore}%
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-1">
                            Cultures Covered:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {scenario.cultures.map((culture, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {culture}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">
                            <Play className="h-3 w-3 mr-1" />
                            Start Training
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3 w-3 mr-1" />
                            Customize
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training Progress</CardTitle>
                  <CardDescription>
                    Your mediation skill development
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      {
                        skill: "Active Listening",
                        progress: 87,
                        level: "Advanced",
                      },
                      {
                        skill: "Cultural Sensitivity",
                        progress: 92,
                        level: "Expert",
                      },
                      {
                        skill: "Conflict De-escalation",
                        progress: 74,
                        level: "Intermediate",
                      },
                      {
                        skill: "Nonviolent Communication",
                        progress: 81,
                        level: "Advanced",
                      },
                      {
                        skill: "Cross-cultural Mediation",
                        progress: 69,
                        level: "Intermediate",
                      },
                    ].map((skill) => (
                      <div key={skill.skill} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{skill.skill}</span>
                          <span className="text-gray-600">{skill.level}</span>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                        <p className="text-xs text-gray-600">
                          {skill.progress}% Complete
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Recommended Next Steps</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-sm"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Practice Family Mediation Scenarios
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-sm"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        Learn Pashtun Cultural Practices
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-sm"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Advanced Empathy Building Exercises
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Peace Story Templates
                  </CardTitle>
                  <CardDescription>
                    Cultural stories adapted for conflict resolution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockStoryTemplates.map((story) => (
                      <div
                        key={story.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{story.title}</h4>
                          <div className="flex items-center gap-2">
                            {story.adaptable && (
                              <Badge variant="outline" className="text-xs">
                                Adaptable
                              </Badge>
                            )}
                            <Badge variant="secondary" className="text-xs">
                              {story.culture}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 italic">
                          "{story.template}"
                        </p>
                        <p className="text-xs">
                          <span className="font-medium">Moral:</span>{" "}
                          {story.moralLesson}
                        </p>
                        <div>
                          <p className="text-xs font-medium mb-1">
                            Visual Elements:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {story.visualElements.map((element, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {element}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">
                            <Play className="h-3 w-3 mr-1" />
                            Tell Story
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Adapt
                          </Button>
                          {story.audioFile && (
                            <Button size="sm" variant="outline">
                              <Volume2 className="h-3 w-3 mr-1" />
                              Audio
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Story Builder</CardTitle>
                  <CardDescription>
                    Create culturally adapted peace narratives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="story-culture">Cultural Context</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select culture" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="west-african">
                            West African
                          </SelectItem>
                          <SelectItem value="central-asian">
                            Central Asian
                          </SelectItem>
                          <SelectItem value="andean">Andean</SelectItem>
                          <SelectItem value="middle-eastern">
                            Middle Eastern
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="conflict-type">Conflict Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select conflict type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resource">
                            Resource Dispute
                          </SelectItem>
                          <SelectItem value="family">
                            Family Conflict
                          </SelectItem>
                          <SelectItem value="community">
                            Community Division
                          </SelectItem>
                          <SelectItem value="generational">
                            Generational Gap
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="story-template">Story Template</Label>
                      <Textarea
                        placeholder="Once upon a time, in a village where {conflict_type} arose..."
                        className="min-h-24"
                      />
                    </div>

                    <div>
                      <Label htmlFor="moral-lesson">Moral Lesson</Label>
                      <Input placeholder="The key teaching from this story..." />
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch id="voice-recording" />
                      <Label htmlFor="voice-recording">
                        Record voice narration
                      </Label>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Save Template
                      </Button>
                      <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">
                      Recently Shared Stories
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>"The Generous Tree" (Akan)</span>
                        <span className="text-gray-600">23 uses</span>
                      </div>
                      <div className="flex justify-between">
                        <span>"Two Rivers" (Kurdish)</span>
                        <span className="text-gray-600">18 uses</span>
                      </div>
                      <div className="flex justify-between">
                        <span>"The Patient Farmer" (Quechua)</span>
                        <span className="text-gray-600">15 uses</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mobile dApps Tab */}
          <TabsContent value="mobile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Offline-First Mobile dApps
                  </CardTitle>
                  <CardDescription>
                    Decentralized apps that work without internet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: "1",
                        name: "Peace Circles",
                        type: "mediation" as const,
                        offline: true,
                        languages: ["Swahili", "English", "Kikuyu"],
                        downloads: 2341,
                        rating: 4.8,
                        lastSync: "2024-01-22",
                        description:
                          "Facilitate community dialogue sessions with cultural protocols",
                      },
                      {
                        id: "2",
                        name: "Story Keeper",
                        type: "education" as const,
                        offline: true,
                        languages: ["Pashto", "Dari", "Urdu"],
                        downloads: 1876,
                        rating: 4.6,
                        lastSync: "2024-01-21",
                        description:
                          "Preserve and share traditional peace stories",
                      },
                      {
                        id: "3",
                        name: "Voice Bridge",
                        type: "dialogue" as const,
                        offline: false,
                        languages: ["Bambara", "French", "Fulfulde"],
                        downloads: 987,
                        rating: 4.4,
                        lastSync: "2024-01-23",
                        description:
                          "Real-time voice translation for cross-cultural communication",
                      },
                    ].map((app) => (
                      <div
                        key={app.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{app.name}</h4>
                          <div className="flex items-center gap-2">
                            {app.offline ? (
                              <Badge variant="default" className="text-xs">
                                Offline
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Online
                              </Badge>
                            )}
                            <Badge variant="secondary" className="text-xs">
                              {app.type}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {app.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="font-medium">Downloads:</span>{" "}
                            {app.downloads.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span>{app.rating}</span>
                          </div>
                          <div>
                            <span className="font-medium">Last Sync:</span>{" "}
                            {app.lastSync}
                          </div>
                          <div>
                            <span className="font-medium">Languages:</span>{" "}
                            {app.languages.length}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-1">
                            Supported Languages:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {app.languages.map((lang, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Install
                          </Button>
                          <Button size="sm" variant="outline">
                            <Info className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                          {app.offline && (
                            <Button size="sm" variant="outline">
                              <Upload className="h-3 w-3 mr-1" />
                              Sync
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>dApp Development Kit</CardTitle>
                  <CardDescription>
                    Tools for building community-specific apps
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Offline-First Framework
                      </h4>
                      <p className="text-sm text-blue-700 mb-3">
                        Build apps that work seamlessly without internet
                        connectivity
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Local Data Storage</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Peer-to-Peer Sync</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Conflict Resolution</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-900 mb-2">
                        Voice-First Interface
                      </h4>
                      <p className="text-sm text-green-700 mb-3">
                        Design for non-literate users with voice navigation
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Speech Recognition</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Audio Feedback</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Cultural Audio Cues</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-900 mb-2">
                        Localization Engine
                      </h4>
                      <p className="text-sm text-purple-700 mb-3">
                        Multi-language support with cultural adaptations
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Right-to-Left Support</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Cultural Icons</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex justify-between">
                          <span>Local Number Formats</span>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Quick Start Templates</h4>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start text-sm"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Community Dialogue App
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-sm"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Cultural Story Sharing
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-sm"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Conflict Documentation
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-sm"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Peace Goal Tracker
                      </Button>
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
}
