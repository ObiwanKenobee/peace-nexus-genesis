import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Heart,
  Star,
  MapPin,
  Camera,
  Edit,
  Save,
  X,
  Plus,
  Target,
  Award,
  TrendingUp,
  Calendar,
  Clock,
  Globe,
  Shield,
  Leaf,
  Bird,
  Fish,
  TreePine,
  Mountain,
  Flower,
  Sun,
  Moon,
  Crown,
  Coins,
  Users,
  BookOpen,
  Settings,
  Bell,
  Trash2,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  faithTradition: string;
  location: string;
  joinDate: string;
  avatar: string;
  bio: string;
  conservationLevel: string;
  totalPeaceCoins: number;
  impactScore: number;
  favoriteSpecies: string[];
  guardiansSpecies: string[];
  habitatsProtected: string[];
  prayersCompleted: number;
  meditationMinutes: number;
  conservationActions: number;
  badgesEarned: string[];
  currentGoals: ConservationGoal[];
  recentActivities: Activity[];
  spiritualPreferences: SpiritualPreferences;
}

interface ConservationGoal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentProgress: number;
  deadline: string;
  category: "prayer" | "action" | "donation" | "education" | "advocacy";
  species?: string;
  peaceCoinsReward: number;
  status: "active" | "completed" | "paused";
}

interface Activity {
  id: string;
  type:
    | "prayer"
    | "adoption"
    | "habitat_blessing"
    | "dao_vote"
    | "vr_experience"
    | "meditation"
    | "donation";
  title: string;
  description: string;
  timestamp: string;
  peaceCoinsEarned: number;
  species?: string;
  location?: string;
  impact?: string;
}

interface SpiritualPreferences {
  prayerTimes: string[];
  preferredScriptures: string[];
  notificationSettings: {
    dailyPrayers: boolean;
    emergencyAlerts: boolean;
    speciesUpdates: boolean;
    communityEvents: boolean;
  };
  meditationStyle: string;
  languagePreference: string;
}

// Mock data for demonstration
const mockUserProfile: UserProfile = {
  id: "user-001",
  name: "Sarah Chen",
  email: "sarah.chen@example.com",
  faithTradition: "Buddhist",
  location: "San Francisco, CA",
  joinDate: "2024-01-15",
  avatar: "/avatars/sarah.jpg",
  bio: "Passionate about wildlife conservation and Buddhist teachings on compassion for all sentient beings. Specializing in marine conservation.",
  conservationLevel: "Guardian",
  totalPeaceCoins: 12847,
  impactScore: 89,
  favoriteSpecies: ["Snow Leopard", "Monarch Butterfly", "Pacific Whale"],
  guardiansSpecies: ["Snow Leopard", "Sea Turtle"],
  habitatsProtected: [
    "Himalayan Snow Leopard Refuge",
    "Pacific Whale Sanctuary",
  ],
  prayersCompleted: 156,
  meditationMinutes: 2340,
  conservationActions: 43,
  badgesEarned: [
    "First Prayer",
    "Species Guardian",
    "Habitat Protector",
    "Meditation Master",
    "DAO Voter",
  ],
  currentGoals: [
    {
      id: "goal-1",
      title: "Complete 200 Prayers",
      description: "Reach 200 completed prayers for wildlife",
      targetValue: 200,
      currentProgress: 156,
      deadline: "2024-12-31",
      category: "prayer",
      peaceCoinsReward: 500,
      status: "active",
    },
    {
      id: "goal-2",
      title: "Adopt 3 Endangered Species",
      description: "Become guardian for 3 critically endangered species",
      targetValue: 3,
      currentProgress: 2,
      deadline: "2024-06-30",
      category: "action",
      species: "Various",
      peaceCoinsReward: 1000,
      status: "active",
    },
    {
      id: "goal-3",
      title: "Meditate 3000 Minutes",
      description: "Complete 3000 minutes of nature meditation",
      targetValue: 3000,
      currentProgress: 2340,
      deadline: "2024-08-15",
      category: "education",
      peaceCoinsReward: 750,
      status: "active",
    },
  ],
  recentActivities: [
    {
      id: "act-1",
      type: "prayer",
      title: "Dawn Prayer for Snow Leopards",
      description:
        "Completed morning prayer for Himalayan snow leopards facing habitat threats",
      timestamp: "2024-02-15T06:30:00Z",
      peaceCoinsEarned: 75,
      species: "Snow Leopard",
      location: "Himalayas",
      impact: "Contributed to emergency prayer campaign",
    },
    {
      id: "act-2",
      type: "dao_vote",
      title: "Voted on Whale Protection",
      description:
        "Supported proposal for Pacific whale migration corridor protection",
      timestamp: "2024-02-14T15:20:00Z",
      peaceCoinsEarned: 25,
      species: "Pacific Whale",
      impact: "Proposal approved with 94% support",
    },
    {
      id: "act-3",
      type: "meditation",
      title: "Sacred Soundscape Session",
      description:
        "30-minute meditation with live ocean sounds from turtle nesting beaches",
      timestamp: "2024-02-14T20:45:00Z",
      peaceCoinsEarned: 15,
      species: "Sea Turtle",
      impact: "Deepened spiritual connection with marine life",
    },
    {
      id: "act-4",
      type: "habitat_blessing",
      title: "Blessed Monarch Sanctuary",
      description:
        "Sent spiritual protection to Monarch butterfly overwintering site in Mexico",
      timestamp: "2024-02-13T12:15:00Z",
      peaceCoinsEarned: 50,
      species: "Monarch Butterfly",
      location: "Mexico",
      impact: "Part of international blessing ceremony",
    },
  ],
  spiritualPreferences: {
    prayerTimes: ["Dawn", "Evening"],
    preferredScriptures: ["Buddhist Sutras", "Indigenous Wisdom"],
    notificationSettings: {
      dailyPrayers: true,
      emergencyAlerts: true,
      speciesUpdates: true,
      communityEvents: false,
    },
    meditationStyle: "Mindfulness",
    languagePreference: "English",
  },
};

const conservationLevels = [
  { name: "Seeker", minCoins: 0, maxCoins: 999, color: "gray" },
  { name: "Guardian", minCoins: 1000, maxCoins: 4999, color: "green" },
  { name: "Protector", minCoins: 5000, maxCoins: 14999, color: "blue" },
  { name: "Champion", minCoins: 15000, maxCoins: 49999, color: "purple" },
  { name: "Saint", minCoins: 50000, maxCoins: Infinity, color: "gold" },
];

const availableBadges = [
  {
    id: "first_prayer",
    name: "First Prayer",
    icon: Heart,
    description: "Completed your first wildlife prayer",
  },
  {
    id: "species_guardian",
    name: "Species Guardian",
    icon: Shield,
    description: "Adopted your first endangered species",
  },
  {
    id: "habitat_protector",
    name: "Habitat Protector",
    icon: TreePine,
    description: "Protected your first sacred habitat",
  },
  {
    id: "meditation_master",
    name: "Meditation Master",
    icon: Sun,
    description: "Completed 1000 minutes of meditation",
  },
  {
    id: "dao_voter",
    name: "DAO Voter",
    icon: Users,
    description: "Participated in Wildlife DAO governance",
  },
  {
    id: "prayer_warrior",
    name: "Prayer Warrior",
    icon: Star,
    description: "Completed 100 prayers",
  },
  {
    id: "ark_supporter",
    name: "Ark Supporter",
    icon: Bird,
    description: "Supported an Ark System mission",
  },
  {
    id: "vr_explorer",
    name: "VR Explorer",
    icon: Mountain,
    description: "Completed a VR wildlife experience",
  },
];

export default function UserProfileManager() {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [newGoal, setNewGoal] = useState<Partial<ConservationGoal>>({});
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");

  const getCurrentLevel = () => {
    return (
      conservationLevels.find(
        (level) =>
          profile.totalPeaceCoins >= level.minCoins &&
          profile.totalPeaceCoins <= level.maxCoins,
      ) || conservationLevels[0]
    );
  };

  const getNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const currentIndex = conservationLevels.indexOf(currentLevel);
    return currentIndex < conservationLevels.length - 1
      ? conservationLevels[currentIndex + 1]
      : null;
  };

  const handleSaveProfile = () => {
    setProfile(editForm);
    setIsEditing(false);
    console.log("Profile updated:", editForm);
  };

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.description && newGoal.targetValue) {
      const goal: ConservationGoal = {
        id: `goal-${Date.now()}`,
        title: newGoal.title,
        description: newGoal.description,
        targetValue: newGoal.targetValue,
        currentProgress: 0,
        deadline: newGoal.deadline || "2024-12-31",
        category: newGoal.category || "action",
        peaceCoinsReward: newGoal.peaceCoinsReward || 100,
        status: "active",
        ...(newGoal.species && { species: newGoal.species }),
      };

      setProfile((prev) => ({
        ...prev,
        currentGoals: [...prev.currentGoals, goal],
      }));

      setNewGoal({});
      setShowAddGoal(false);
      console.log("New goal added:", goal);
    }
  };

  const handleDeleteGoal = (goalId: string) => {
    setProfile((prev) => ({
      ...prev,
      currentGoals: prev.currentGoals.filter((goal) => goal.id !== goalId),
    }));
    console.log("Goal deleted:", goalId);
  };

  const handleUpdateNotifications = (setting: string, value: boolean) => {
    setProfile((prev) => ({
      ...prev,
      spiritualPreferences: {
        ...prev.spiritualPreferences,
        notificationSettings: {
          ...prev.spiritualPreferences.notificationSettings,
          [setting]: value,
        },
      },
    }));
    console.log("Notification setting updated:", setting, value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "prayer":
        return Heart;
      case "adoption":
        return Shield;
      case "habitat_blessing":
        return Star;
      case "dao_vote":
        return Users;
      case "vr_experience":
        return Mountain;
      case "meditation":
        return Sun;
      case "donation":
        return Coins;
      default:
        return Target;
    }
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const progressToNext = nextLevel
    ? ((profile.totalPeaceCoins - currentLevel.minCoins) /
        (nextLevel.minCoins - currentLevel.minCoins)) *
      100
    : 100;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <Badge
                  className={`absolute -bottom-2 -right-2 bg-${currentLevel.color}-500 text-white`}
                >
                  {currentLevel.name}
                </Badge>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="text-2xl font-bold"
                    />
                    <Input
                      value={editForm.location}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      placeholder="Location"
                    />
                    <Textarea
                      value={editForm.bio}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      placeholder="Bio"
                      rows={3}
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {profile.name}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profile.location}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {profile.faithTradition}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Joined {formatDate(profile.joinDate)}
                      </span>
                    </div>
                    <p className="text-gray-700 max-w-2xl">{profile.bio}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Conservation Level Progress */}
          <div className="mt-6 p-4 bg-white/80 backdrop-blur rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">
                Conservation Level: {currentLevel.name}
              </span>
              <span className="text-sm text-gray-600">
                {profile.totalPeaceCoins.toLocaleString()} PC
                {nextLevel &&
                  ` / ${nextLevel.minCoins.toLocaleString()} PC to ${nextLevel.name}`}
              </span>
            </div>
            <Progress value={progressToNext} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Coins className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              {profile.totalPeaceCoins.toLocaleString()}
            </h3>
            <p className="text-gray-600">PeaceCoins Earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">{profile.impactScore}</h3>
            <p className="text-gray-600">Impact Score</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">{profile.prayersCompleted}</h3>
            <p className="text-gray-600">Prayers Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              {profile.conservationActions}
            </h3>
            <p className="text-gray-600">Conservation Actions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="species">My Species</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Guardian Species */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Guardian Species</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.guardiansSpecies.map((species, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <span className="font-medium">{species}</span>
                      <Badge variant="outline">Guardian</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Protected Habitats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TreePine className="w-5 h-5 text-green-600" />
                  <span>Protected Habitats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.habitatsProtected.map((habitat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <span className="font-medium">{habitat}</span>
                      <Badge variant="outline">Protected</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {profile.recentActivities.slice(0, 3).map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-3 border rounded-lg"
                    >
                      <Icon className="w-6 h-6 text-blue-600" />
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-gray-600">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        +{activity.peaceCoinsEarned} PC
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Conservation Goals</h2>
            <Button onClick={() => setShowAddGoal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </div>

          {showAddGoal && (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Create New Goal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Goal title"
                    value={newGoal.title || ""}
                    onChange={(e) =>
                      setNewGoal((prev) => ({ ...prev, title: e.target.value }))
                    }
                  />
                  <Input
                    placeholder="Target value"
                    type="number"
                    value={newGoal.targetValue || ""}
                    onChange={(e) =>
                      setNewGoal((prev) => ({
                        ...prev,
                        targetValue: parseInt(e.target.value),
                      }))
                    }
                  />
                  <Input
                    placeholder="Deadline (YYYY-MM-DD)"
                    type="date"
                    value={newGoal.deadline || ""}
                    onChange={(e) =>
                      setNewGoal((prev) => ({
                        ...prev,
                        deadline: e.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="PeaceCoin reward"
                    type="number"
                    value={newGoal.peaceCoinsReward || ""}
                    onChange={(e) =>
                      setNewGoal((prev) => ({
                        ...prev,
                        peaceCoinsReward: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>
                <Textarea
                  placeholder="Goal description"
                  value={newGoal.description || ""}
                  onChange={(e) =>
                    setNewGoal((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="mt-4"
                />
                <div className="flex items-center space-x-3 mt-4">
                  <Button onClick={handleAddGoal}>
                    <Save className="w-4 h-4 mr-2" />
                    Create Goal
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddGoal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {profile.currentGoals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{goal.title}</h3>
                      <p className="text-gray-600">{goal.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                        <span>Deadline: {formatDate(goal.deadline)}</span>
                        <span>Reward: {goal.peaceCoinsReward} PC</span>
                        {goal.species && <span>Species: {goal.species}</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          goal.status === "active" ? "default" : "secondary"
                        }
                      >
                        {goal.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {goal.currentProgress} / {goal.targetValue}
                      </span>
                    </div>
                    <Progress
                      value={(goal.currentProgress / goal.targetValue) * 100}
                      className="h-3"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-6">
          <h2 className="text-2xl font-bold">Activity History</h2>

          <div className="space-y-4">
            {profile.recentActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <Card key={activity.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold">{activity.title}</h3>
                            <p className="text-gray-600">
                              {activity.description}
                            </p>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            +{activity.peaceCoinsEarned} PC
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDate(activity.timestamp)}
                          </span>
                          {activity.species && (
                            <span className="flex items-center">
                              <Leaf className="w-4 h-4 mr-1" />
                              {activity.species}
                            </span>
                          )}
                          {activity.location && (
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {activity.location}
                            </span>
                          )}
                        </div>

                        {activity.impact && (
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm text-green-800">
                              <strong>Impact:</strong> {activity.impact}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Species Tab */}
        <TabsContent value="species" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Species</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.favoriteSpecies.map((species, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <span className="font-medium">{species}</span>
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Guardian Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.guardiansSpecies.map((species, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg bg-green-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{species}</span>
                        <Badge className="bg-green-100 text-green-800">
                          Guardian
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Active guardian since {formatDate(profile.joinDate)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button size="sm" variant="outline">
                          <Camera className="w-4 h-4 mr-1" />
                          Live Cam
                        </Button>
                        <Button size="sm" variant="outline">
                          <MapPin className="w-4 h-4 mr-1" />
                          Habitat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Badges Tab */}
        <TabsContent value="badges" className="space-y-6">
          <h2 className="text-2xl font-bold">Achievement Badges</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {availableBadges.map((badge) => {
              const isEarned = profile.badgesEarned.includes(badge.name);
              const Icon = badge.icon;

              return (
                <Card
                  key={badge.id}
                  className={`${isEarned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200"}`}
                >
                  <CardContent className="p-6 text-center">
                    <Icon
                      className={`w-12 h-12 mx-auto mb-4 ${isEarned ? "text-yellow-600" : "text-gray-400"}`}
                    />
                    <h3
                      className={`font-bold mb-2 ${isEarned ? "text-yellow-800" : "text-gray-600"}`}
                    >
                      {badge.name}
                    </h3>
                    <p
                      className={`text-sm ${isEarned ? "text-yellow-700" : "text-gray-500"}`}
                    >
                      {badge.description}
                    </p>
                    {isEarned && (
                      <Badge className="mt-3 bg-yellow-100 text-yellow-800">
                        Earned!
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-2xl font-bold">Profile Settings</h2>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(
                  profile.spiritualPreferences.notificationSettings,
                ).map(([setting, enabled]) => (
                  <div
                    key={setting}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium capitalize">
                        {setting.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {setting === "dailyPrayers" &&
                          "Receive daily prayer reminders"}
                        {setting === "emergencyAlerts" &&
                          "Get notified of wildlife emergencies"}
                        {setting === "speciesUpdates" &&
                          "Updates on your guardian species"}
                        {setting === "communityEvents" &&
                          "Community events and gatherings"}
                      </p>
                    </div>
                    <Button
                      variant={enabled ? "default" : "outline"}
                      onClick={() =>
                        handleUpdateNotifications(setting, !enabled)
                      }
                    >
                      {enabled ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Spiritual Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Faith Tradition
                  </label>
                  <Input value={profile.faithTradition} readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preferred Prayer Times
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profile.spiritualPreferences.prayerTimes.map(
                      (time, index) => (
                        <Badge key={index} variant="outline">
                          {time}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Meditation Style
                  </label>
                  <Input
                    value={profile.spiritualPreferences.meditationStyle}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Language Preference
                  </label>
                  <Input
                    value={profile.spiritualPreferences.languagePreference}
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
