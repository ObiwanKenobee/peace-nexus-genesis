import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";
import {
  GraduationCap,
  Gamepad2,
  Star,
  Trophy,
  Users,
  Zap,
  Video,
  Smartphone,
  Globe,
  Heart,
  TrendingUp,
  Play,
  Medal,
  Target,
  Flame,
  Share,
  MessageCircle,
  Camera,
  Mic,
  Award,
  Calendar,
  MapPin,
  Plus,
  Eye,
  ThumbsUp,
  Send,
  Crown,
  LogOut,
} from "lucide-react";

const youthMetrics = [
  { title: "Global Reach", value: "45.2K", change: "+67%", trend: "up" },
  { title: "Skills Unlocked", value: "23", change: "+5", trend: "up" },
  { title: "Peace XP", value: "89,420", change: "+2.1K", trend: "up" },
  { title: "Impact Stories", value: "156", change: "+34", trend: "up" },
];

const activeQuests = [
  {
    id: 1,
    title: "Digital Storyteller Badge",
    description: "Create 5 micro-stories about local peace heroes",
    category: "Content Creation",
    difficulty: "Intermediate",
    xpReward: 1500,
    progress: 60,
    timeLeft: "3 days",
    participants: 2847,
    requirements: ["Video editing", "Interview skills", "Storytelling"],
    unlocks: ["Advanced Creator Tools", "Mentor Access"],
  },
  {
    id: 2,
    title: "Global Peace Ambassador",
    description: "Connect with 10 youth peacemakers from different continents",
    category: "Networking",
    difficulty: "Advanced",
    xpReward: 2500,
    progress: 30,
    timeLeft: "2 weeks",
    participants: 1256,
    requirements: ["Cultural awareness", "Language skills", "Diplomacy"],
    unlocks: ["UN Youth Council", "Global Events Access"],
  },
  {
    id: 3,
    title: "VR Empathy Explorer",
    description: "Complete all VR scenarios in the Peace World sandbox",
    category: "Virtual Reality",
    difficulty: "Beginner",
    xpReward: 800,
    progress: 85,
    timeLeft: "1 week",
    participants: 5634,
    requirements: ["VR headset", "Empathy assessment"],
    unlocks: ["VR Creator Mode", "Peace Scenarios SDK"],
  },
];

const peaceSkills = [
  {
    skill: "Conflict Resolution",
    level: 8,
    xp: 12450,
    nextLevel: 15000,
    badges: ["Mediator", "Active Listener", "Problem Solver"],
    recentActivity: "Mediated school dispute",
  },
  {
    skill: "Cultural Intelligence",
    level: 6,
    xp: 8920,
    nextLevel: 10000,
    badges: ["Global Citizen", "Language Bridge", "Tradition Keeper"],
    recentActivity: "Cross-cultural dialogue session",
  },
  {
    skill: "Digital Activism",
    level: 9,
    xp: 16780,
    nextLevel: 18000,
    badges: ["Viral Creator", "Campaign Builder", "Change Catalyst"],
    recentActivity: "Peace campaign reached 50K",
  },
  {
    skill: "Innovation Thinking",
    level: 7,
    xp: 11234,
    nextLevel: 12500,
    badges: ["Problem Hacker", "Solution Designer", "Future Thinker"],
    recentActivity: "Hackathon winner: Peace App",
  },
];

const socialFeed = [
  {
    id: 1,
    author: "Maya_PeaceBuilder",
    avatar: "M",
    content:
      "Just completed my first VR peace mediation! The refugee experience simulation really opened my eyes. 💙 #EmpathyInAction",
    media: "vr_simulation.mp4",
    likes: 234,
    comments: 45,
    shares: 67,
    timestamp: "2h ago",
    location: "Nairobi, Kenya",
    peaceBadge: "Rising Star",
  },
  {
    id: 2,
    author: "Ahmed_ChangeMaker",
    avatar: "A",
    content:
      "Our youth climate action group prevented a water conflict in our community! Small actions, big impact. 🌍 #YouthPower",
    media: "community_action.jpg",
    likes: 892,
    comments: 156,
    shares: 234,
    timestamp: "6h ago",
    location: "Cairo, Egypt",
    peaceBadge: "Community Hero",
  },
  {
    id: 3,
    author: "Sofia_Innovator",
    avatar: "S",
    content:
      "Launching our peace app tomorrow! Built with @PAXIS SDK for cross-cultural understanding. Beta testers welcome! 🚀",
    media: "app_preview.gif",
    likes: 567,
    comments: 89,
    shares: 123,
    timestamp: "1d ago",
    location: "São Paulo, Brazil",
    peaceBadge: "Tech Pioneer",
  },
];

const getLeaderboards = (userName?: string) => [
  {
    rank: 1,
    username: "PeaceNinja_2024",
    level: 15,
    xp: 45670,
    badge: "Global Champion",
    achievement: "Led 50+ peace initiatives",
    country: "Philippines",
  },
  {
    rank: 2,
    username: "DigitalDiplomat",
    level: 14,
    xp: 42156,
    badge: "Innovation Master",
    achievement: "Created viral peace campaign",
    country: "Nigeria",
  },
  {
    rank: 3,
    username: "CulturalBridge23",
    level: 13,
    xp: 38924,
    badge: "Unity Weaver",
    achievement: "Connected 500+ youth globally",
    country: "India",
  },
  {
    rank: 8,
    username: userName || "You",
    level: 9,
    xp: 22456,
    badge: "Rising Star",
    achievement: "Consistent progress",
    country: "Your Location",
    isUser: true,
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Global Youth Peace Hackathon",
    date: "2024-02-15",
    time: "10:00 AM UTC",
    duration: "48 hours",
    participants: 2500,
    prize: "50K PeaceCoins + Mentorship",
    theme: "AI for Conflict Prevention",
    format: "Virtual + AR Collaboration",
  },
  {
    id: 2,
    title: "TikTok Peace Stories Challenge",
    date: "2024-02-20",
    time: "All day",
    duration: "1 week",
    participants: 15000,
    prize: "Creator Fund + Global Recognition",
    theme: "60-second Peace Narratives",
    format: "Social Media Challenge",
  },
  {
    id: 3,
    title: "Virtual UN Model Assembly",
    date: "2024-03-01",
    time: "2:00 PM UTC",
    duration: "3 days",
    participants: 500,
    prize: "UN Internship Opportunities",
    theme: "Climate Security & Peace",
    format: "VR Simulation",
  },
];

const peaceWorldSandbox = [
  {
    id: 1,
    world: "Refugee Camp Simulator",
    description: "Experience life in a refugee camp and design solutions",
    players: 12450,
    rating: 4.8,
    difficulty: "Intermediate",
    completionTime: "45 min",
    learningGoals: ["Empathy", "Resource Management", "Community Building"],
  },
  {
    id: 2,
    world: "Climate Peace Negotiations",
    description: "Lead international climate talks to prevent conflicts",
    players: 8967,
    rating: 4.6,
    difficulty: "Advanced",
    completionTime: "90 min",
    learningGoals: ["Diplomacy", "Environmental Science", "Consensus Building"],
  },
  {
    id: 3,
    world: "Urban Peace Design",
    description: "Design inclusive cities that prevent urban conflicts",
    players: 15023,
    rating: 4.9,
    difficulty: "Beginner",
    completionTime: "30 min",
    learningGoals: ["Urban Planning", "Social Inclusion", "Design Thinking"],
  },
];

export default function YouthPeacemakerDashboard() {
  const { user, earnPeaceCoin, logout } = usePaxisAuth();
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleLogout = () => {
    logout();
  };

  const handleCompleteQuest = () => {
    earnPeaceCoin(150, "Completed empathy quest and earned new badge");
  };

  const handleCreateContent = () => {
    earnPeaceCoin(100, "Created viral peace story for social media");
  };

  const handleJoinEvent = () => {
    earnPeaceCoin(75, "Registered for global youth peace event");
  };

  const handlePeaceWorld = () => {
    earnPeaceCoin(50, "Completed Peace World VR scenario");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Youth Peace Hub
            </h1>
            <p className="text-gray-600">
              Building tomorrow's peace • {user?.name} • Level{" "}
              {user?.level || 9} Rising Star
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800">
              <Crown className="w-3 h-3 mr-1" />
              Rising Star
            </Badge>
            <div className="text-right">
              <div className="text-sm font-medium">
                {user?.peaceCoinBalance || "22,456"} Peace XP
              </div>
              <div className="text-xs text-gray-500">
                Global Rank: #{user?.contributionScore || 847}
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
        {/* Key Youth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {youthMetrics.map((metric, index) => (
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
                          : "text-red-600"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {metric.change}
                    </p>
                  </div>
                  <GraduationCap className="w-8 h-8 text-orange-600" />
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
            <TabsTrigger value="quests">Peace Quests</TabsTrigger>
            <TabsTrigger value="skills">Skill Tree</TabsTrigger>
            <TabsTrigger value="social">Social Feed</TabsTrigger>
            <TabsTrigger value="events">Global Events</TabsTrigger>
            <TabsTrigger value="peace-world">Peace World</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Quests */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Active Peace Quests</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeQuests.slice(0, 2).map((quest) => (
                      <div
                        key={quest.id}
                        className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-medium">{quest.title}</div>
                            <div className="text-sm text-gray-600">
                              {quest.category}
                            </div>
                          </div>
                          <Badge variant="outline">{quest.difficulty}</Badge>
                        </div>
                        <div className="text-xs text-gray-600 mb-2">
                          {quest.description}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>{quest.progress}% complete</span>
                            <span>
                              {quest.xpReward} XP • {quest.timeLeft}
                            </span>
                          </div>
                          <Progress value={quest.progress} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills Progress */}
              <Card className="bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span>Peace Skills Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {peaceSkills.slice(0, 3).map((skill, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-sm">
                            {skill.skill}
                          </div>
                          <Badge variant="outline">Level {skill.level}</Badge>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{skill.xp} XP</span>
                          <span>
                            {skill.nextLevel - skill.xp} to next level
                          </span>
                        </div>
                        <Progress
                          value={(skill.xp / skill.nextLevel) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard Preview */}
            <Card className="bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Global Youth Leaderboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getLeaderboards(user?.name)
                    .slice(0, 4)
                    .map((player) => (
                      <div
                        key={player.rank}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          player.isUser
                            ? "bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300"
                            : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              player.rank === 1
                                ? "bg-yellow-400 text-white"
                                : player.rank === 2
                                  ? "bg-gray-400 text-white"
                                  : player.rank === 3
                                    ? "bg-orange-400 text-white"
                                    : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {player.rank <= 3 ? (
                              <Crown className="w-4 h-4" />
                            ) : (
                              player.rank
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{player.username}</div>
                            <div className="text-sm text-gray-600">
                              {player.country} • {player.badge}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            Level {player.level}
                          </div>
                          <div className="text-sm text-gray-500">
                            {player.xp.toLocaleString()} XP
                          </div>
                        </div>
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
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    onClick={handleCompleteQuest}
                  >
                    <Target className="w-6 h-6" />
                    <span>Complete Quest</span>
                    <span className="text-xs text-orange-100">
                      150 Peace XP
                    </span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleCreateContent}
                  >
                    <Camera className="w-6 h-6" />
                    <span>Create Story</span>
                    <span className="text-xs text-gray-500">100 Peace XP</span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handleJoinEvent}
                  >
                    <Calendar className="w-6 h-6" />
                    <span>Join Event</span>
                    <span className="text-xs text-gray-500">75 Peace XP</span>
                  </Button>
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    variant="outline"
                    onClick={handlePeaceWorld}
                  >
                    <Gamepad2 className="w-6 h-6" />
                    <span>Play Peace World</span>
                    <span className="text-xs text-gray-500">50 Peace XP</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Peace Quests Tab */}
          <TabsContent value="quests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gamified Peace Quests</h2>
              <Button onClick={handleCompleteQuest}>
                <Target className="w-4 h-4 mr-2" />
                Start New Quest
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {activeQuests.map((quest) => (
                <Card key={quest.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{quest.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {quest.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {quest.participants.toLocaleString()} participants
                          </span>
                          <span className="flex items-center">
                            <Zap className="w-4 h-4 mr-1" />
                            {quest.xpReward} XP reward
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {quest.timeLeft} left
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          quest.difficulty === "Advanced"
                            ? "bg-red-100 text-red-800"
                            : quest.difficulty === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {quest.difficulty}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-1">
                        Quest Progress
                      </div>
                      <Progress value={quest.progress} className="h-3" />
                      <div className="text-xs text-gray-500 mt-1">
                        {quest.progress}% complete
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm font-medium mb-2">
                          Requirements
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {quest.requirements.map((req, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Unlocks</div>
                        <div className="flex flex-wrap gap-1">
                          {quest.unlocks.map((unlock, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {unlock}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleCompleteQuest}>
                        <Play className="w-4 h-4 mr-2" />
                        Continue Quest
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Join Team
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share Progress
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Peace Skills Development Tree
              </h2>
              <div className="text-sm text-gray-600">
                Total XP:{" "}
                {peaceSkills
                  .reduce((sum, skill) => sum + skill.xp, 0)
                  .toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {peaceSkills.map((skill, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{skill.skill}</h3>
                        <p className="text-sm text-gray-600">
                          {skill.recentActivity}
                        </p>
                      </div>
                      <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800">
                        Level {skill.level}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress to Level {skill.level + 1}</span>
                        <span>
                          {skill.xp} / {skill.nextLevel} XP
                        </span>
                      </div>
                      <Progress
                        value={(skill.xp / skill.nextLevel) * 100}
                        className="h-3"
                      />
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">
                        Earned Badges
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.badges.map((badge, badgeIndex) => (
                          <Badge
                            key={badgeIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            <Medal className="w-3 h-3 mr-1" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button size="sm" className="w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      Practice {skill.skill}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Social Feed Tab */}
          <TabsContent value="social" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                TikTok-Style Peace Stories
              </h2>
              <Button onClick={handleCreateContent}>
                <Camera className="w-4 h-4 mr-2" />
                Create Story
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {socialFeed.map((post) => (
                <Card key={post.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="font-medium">{post.author}</div>
                          <Badge variant="outline" className="text-xs">
                            {post.peaceBadge}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {post.timestamp}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mb-2">
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {post.location}
                        </div>
                        <p className="text-sm mb-3">{post.content}</p>

                        {post.media && (
                          <div className="bg-gray-100 rounded-lg p-4 mb-3 text-center">
                            <Video className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <div className="text-xs text-gray-500">
                              {post.media}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <button className="flex items-center space-x-1 hover:text-red-500">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-blue-500">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-500">
                            <Share className="w-4 h-4" />
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Global Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Global Youth Peace Events
              </h2>
              <Button onClick={handleJoinEvent}>
                <Calendar className="w-4 h-4 mr-2" />
                Join Event
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {event.theme}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {event.date} at {event.time}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {event.participants.toLocaleString()} registered
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.duration}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">{event.format}</Badge>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg mb-4">
                      <div className="text-sm font-medium">Prize Pool</div>
                      <div className="text-sm text-gray-600">{event.prize}</div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleJoinEvent}>
                        <Plus className="w-4 h-4 mr-2" />
                        Register
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Peace World Tab */}
          <TabsContent value="peace-world" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Peace World VR Sandbox</h2>
              <Button onClick={handlePeaceWorld}>
                <Gamepad2 className="w-4 h-4 mr-2" />
                Enter World
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {peaceWorldSandbox.map((world) => (
                <Card key={world.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">{world.world}</h3>
                        <p className="text-sm text-gray-600">
                          {world.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{world.rating}</span>
                        </div>
                        <Badge variant="outline">{world.difficulty}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Players:</span>
                          <div className="font-medium">
                            {world.players.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <div className="font-medium">
                            {world.completionTime}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-1">
                          Learning Goals
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {world.learningGoals.map((goal, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {goal}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="w-full"
                        onClick={handlePeaceWorld}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Enter World
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
