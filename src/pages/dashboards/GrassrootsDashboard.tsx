import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  Heart,
  Users,
  MessageCircle,
  MapPin,
  Mic,
  Globe,
  Smartphone,
  Video,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Play,
  Phone,
  Volume2,
  Languages,
} from "lucide-react";

const communityMetrics = [
  { title: "People Reached", value: "2,847", change: "+156", trend: "up" },
  { title: "Conflicts Mediated", value: "23", change: "+5", trend: "up" },
  { title: "Community Score", value: "87%", change: "+8%", trend: "up" },
  { title: "Active Dialogues", value: "12", change: "+3", trend: "up" },
];

const activeConflicts = [
  {
    id: 1,
    title: "Land Dispute - Nakuru County",
    status: "Active Mediation",
    priority: "High",
    participants: 8,
    progress: 65,
    lastUpdate: "2 hours ago",
    language: "Swahili",
  },
  {
    id: 2,
    title: "Youth Employment Tensions",
    status: "Dialogue Phase",
    priority: "Medium",
    participants: 15,
    progress: 40,
    lastUpdate: "1 day ago",
    language: "English",
  },
  {
    id: 3,
    title: "Market Vendor Conflict",
    status: "Resolution Planning",
    priority: "Low",
    participants: 6,
    progress: 85,
    lastUpdate: "3 hours ago",
    language: "Swahili",
  },
];

const vrTrainingSessions = [
  {
    id: 1,
    title: "Empathy Building: Refugee Experience",
    duration: "45 minutes",
    participants: 12,
    completion: 89,
    language: "Swahili",
    status: "Active",
  },
  {
    id: 2,
    title: "Cross-Cultural Communication",
    duration: "30 minutes",
    participants: 8,
    completion: 67,
    language: "English",
    status: "Ongoing",
  },
  {
    id: 3,
    title: "Conflict De-escalation Scenarios",
    duration: "60 minutes",
    participants: 15,
    completion: 95,
    language: "Swahili",
    status: "Completed",
  },
];

const storyBank = [
  {
    id: 1,
    title: "From Conflict to Cooperation: Water Well Project",
    author: "Maria Wanjiku",
    views: 234,
    likes: 67,
    language: "Swahili",
    type: "Success Story",
  },
  {
    id: 2,
    title: "Youth Dialogue Bridges Ethnic Divide",
    author: "James Otieno",
    views: 156,
    likes: 43,
    language: "English",
    type: "Case Study",
  },
  {
    id: 3,
    title: "Women's Peace Circle Methodology",
    author: "Grace Ndungu",
    views: 189,
    likes: 89,
    language: "Swahili",
    type: "Best Practice",
  },
];

const rapidAlerts = [
  {
    id: 1,
    alert: "Rising tensions in Kibera market area",
    severity: "Medium",
    time: "30 minutes ago",
    responders: 3,
  },
  {
    id: 2,
    alert: "Political rally planned near contested land",
    severity: "High",
    time: "2 hours ago",
    responders: 7,
  },
];

export default function GrassrootsDashboard() {
  const { user, earnPeaceCoin } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleStartMediation = () => {
    earnPeaceCoin(75, "Started new community mediation session");
  };

  const handleVRTraining = () => {
    earnPeaceCoin(50, "Completed VR empathy training session");
  };

  const handleVoiceStory = () => {
    earnPeaceCoin(40, "Recorded voice story for peace archive");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Community Peace Hub
            </h1>
            <p className="text-gray-600">
              Healing communities, one dialogue at a time • {user?.name} •{" "}
              {user?.location}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-orange-100 text-orange-800">
              Level {user?.level} Peacebuilder
            </Badge>
            <div className="text-right">
              <div className="text-sm font-medium">
                {user?.peaceCoinBalance} PeaceCoins
              </div>
              <div className="text-xs text-gray-500">
                Community Impact: {user?.contributionScore}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {communityMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <p
                      className={`text-sm flex items-center ${
                        metric.trend === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {metric.change}
                    </p>
                  </div>
                  <Heart className="w-8 h-8 text-orange-600" />
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mediation">Active Mediations</TabsTrigger>
            <TabsTrigger value="vr-training">VR Training</TabsTrigger>
            <TabsTrigger value="stories">Story Bank</TabsTrigger>
            <TabsTrigger value="rapid-response">Rapid Response</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Conflicts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Active Community Conflicts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeConflicts.slice(0, 3).map((conflict) => (
                      <div key={conflict.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm">
                            {conflict.title}
                          </div>
                          <Badge
                            variant={
                              conflict.priority === "High"
                                ? "destructive"
                                : conflict.priority === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {conflict.priority}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>
                              {conflict.participants} participants •{" "}
                              {conflict.language}
                            </span>
                            <span>{conflict.lastUpdate}</span>
                          </div>
                          <Progress value={conflict.progress} className="h-2" />
                          <div className="text-xs text-gray-600">
                            {conflict.status} • {conflict.progress}% complete
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Peace Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      className="h-auto p-4 flex items-center justify-between"
                      onClick={handleStartMediation}
                    >
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">Start New Mediation</div>
                          <div className="text-xs text-gray-500">
                            Begin community dialogue
                          </div>
                        </div>
                      </div>
                      <span className="text-xs">+75 PC</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-auto p-4 flex items-center justify-between"
                      onClick={handleVRTraining}
                    >
                      <div className="flex items-center space-x-3">
                        <Video className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">VR Empathy Session</div>
                          <div className="text-xs text-gray-500">
                            Experience perspectives
                          </div>
                        </div>
                      </div>
                      <span className="text-xs">+50 PC</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-auto p-4 flex items-center justify-between"
                      onClick={handleVoiceStory}
                    >
                      <div className="flex items-center space-x-3">
                        <Mic className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">Record Voice Story</div>
                          <div className="text-xs text-gray-500">
                            Share your experience
                          </div>
                        </div>
                      </div>
                      <span className="text-xs">+40 PC</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rapid Response Alerts */}
            {rapidAlerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <span>Rapid Response Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rapidAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-center justify-between p-3 border-l-4 border-orange-400 bg-orange-50 rounded-r-lg"
                      >
                        <div>
                          <div className="font-medium text-sm">
                            {alert.alert}
                          </div>
                          <div className="text-xs text-gray-600">
                            {alert.time} • {alert.responders} responders
                            assigned
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              alert.severity === "High"
                                ? "destructive"
                                : "default"
                            }
                          >
                            {alert.severity}
                          </Badge>
                          <Button size="sm">Respond</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Mediation Tab */}
          <TabsContent value="mediation" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Community Mediation Sessions
              </h2>
              <Button onClick={handleStartMediation}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Start New Session
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {activeConflicts.map((conflict) => (
                <Card key={conflict.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {conflict.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {conflict.participants} participants
                          </span>
                          <span className="flex items-center">
                            <Languages className="w-4 h-4 mr-1" />
                            {conflict.language}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {conflict.lastUpdate}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          conflict.priority === "High"
                            ? "destructive"
                            : conflict.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {conflict.priority} Priority
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{conflict.status}</span>
                          <span>{conflict.progress}% complete</span>
                        </div>
                        <Progress value={conflict.progress} className="h-2" />
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Continue Session
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Voice Call
                        </Button>
                        <Button variant="outline" size="sm">
                          <Volume2 className="w-4 h-4 mr-2" />
                          Voice Notes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* VR Training Tab */}
          <TabsContent value="vr-training" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                VR Empathy Training Labs
              </h2>
              <Button onClick={handleVRTraining}>
                <Video className="w-4 h-4 mr-2" />
                Start VR Session
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vrTrainingSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">{session.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                          <span>{session.duration}</span>
                          <Badge variant="outline">{session.language}</Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{session.completion}%</span>
                        </div>
                        <Progress value={session.completion} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          {session.participants} participants
                        </span>
                        <Badge
                          variant={
                            session.status === "Completed"
                              ? "secondary"
                              : session.status === "Active"
                                ? "default"
                                : "outline"
                          }
                        >
                          {session.status}
                        </Badge>
                      </div>

                      <Button
                        size="sm"
                        className="w-full"
                        variant={
                          session.status === "Completed" ? "outline" : "default"
                        }
                      >
                        {session.status === "Completed"
                          ? "Review"
                          : "Join Session"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Stories Tab */}
          <TabsContent value="stories" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Peace Story Bank</h2>
              <Button onClick={handleVoiceStory}>
                <Mic className="w-4 h-4 mr-2" />
                Record Story
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {storyBank.map((story) => (
                <Card key={story.id}>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">{story.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                          <span>by {story.author}</span>
                          <Badge variant="outline">{story.type}</Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1 text-red-500" />
                            {story.likes}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {story.views}
                          </span>
                        </div>
                        <Badge variant="outline">{story.language}</Badge>
                      </div>

                      <Button size="sm" className="w-full" variant="outline">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read Story
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rapid Response Tab */}
          <TabsContent value="rapid-response" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5" />
                  <span>Offline-First Mobile Dashboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Sync Status</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Conflict Data</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Community Messages</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Voice Stories</span>
                        <Clock className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>VR Training Modules</span>
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full justify-start">
                        <MapPin className="w-4 h-4 mr-2" />
                        Report Conflict Location
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        Voice Message
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Emergency Alert
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
