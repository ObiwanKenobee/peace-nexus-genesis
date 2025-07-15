import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Filter,
  MessageCircle,
  Heart,
  Star,
  Users,
  Eye,
  Clock,
  Send,
  Reply,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Pin,
  Lock,
  Globe,
  Leaf,
  Bird,
  Fish,
  TreePine,
  Mountain,
  Sun,
  Moon,
  Crown,
  Shield,
  BookOpen,
  Calendar,
  MapPin,
  Share,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  UserCircle,
  Tag,
  Image,
  Link,
  Mic,
  Video,
  Paperclip,
  X,
  Zap,
  Target,
  Award,
  Flame,
  TrendingUp,
} from "lucide-react";

interface Forum {
  id: string;
  name: string;
  description: string;
  type: "faith" | "species" | "general" | "regional";
  category: string; // Faith tradition or species category
  moderators: string[];
  members: number;
  totalPosts: number;
  totalTopics: number;
  lastActivity: string;
  icon: string;
  color: string;
  rules: string[];
  featured: boolean;
  private: boolean;
  requiresApproval: boolean;
  tags: string[];
}

interface Topic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole:
    | "member"
    | "moderator"
    | "admin"
    | "verified_guardian"
    | "elder"
    | "youth_leader";
  forumId: string;
  forumName: string;
  type:
    | "discussion"
    | "question"
    | "prayer_request"
    | "testimony"
    | "news"
    | "event"
    | "project_update"
    | "meditation_guide";
  tags: string[];
  pinned: boolean;
  locked: boolean;
  featured: boolean;
  upvotes: number;
  downvotes: number;
  views: number;
  replies: number;
  lastReplyAt: string;
  lastReplyBy: string;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
  pollOptions?: PollOption[];
  eventDetails?: EventDetails;
  spiritualLevel?: "beginner" | "intermediate" | "advanced" | "elder";
}

interface Reply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole:
    | "member"
    | "moderator"
    | "admin"
    | "verified_guardian"
    | "elder"
    | "youth_leader";
  topicId: string;
  parentReplyId?: string; // For nested replies
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
  edited: boolean;
  helpful: boolean; // Marked as helpful by OP or moderators
}

interface Attachment {
  id: string;
  type: "image" | "video" | "audio" | "document" | "link";
  url: string;
  name: string;
  size?: number;
  caption?: string;
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[];
}

interface EventDetails {
  date: string;
  time: string;
  location: string;
  type:
    | "prayer_gathering"
    | "meditation_session"
    | "conservation_action"
    | "educational_workshop"
    | "community_service";
  attendees: string[];
  maxCapacity?: number;
}

// Mock data
const faithForums: Forum[] = [
  {
    id: "forum-christian",
    name: "Christian Stewardship",
    description:
      "Exploring creation care through biblical teachings and Christian action for wildlife conservation",
    type: "faith",
    category: "Christianity",
    moderators: ["Rev. Sarah Kim", "Dr. Michael Johnson"],
    members: 2847,
    totalPosts: 15623,
    totalTopics: 892,
    lastActivity: "2024-02-15T14:30:00Z",
    icon: "✝️",
    color: "blue",
    rules: [
      "Respectful discussion of Christian teachings",
      "Focus on creation care and stewardship",
      "No denominational arguments",
      "Support with scripture when appropriate",
    ],
    featured: true,
    private: false,
    requiresApproval: false,
    tags: [
      "creation-care",
      "stewardship",
      "biblical-ecology",
      "christian-environmentalism",
    ],
  },
  {
    id: "forum-islamic",
    name: "Islamic Environmental Mercy",
    description:
      "Following Prophet Muhammad's (PBUH) example of mercy to all creatures and environmental protection",
    type: "faith",
    category: "Islam",
    moderators: ["Imam Hassan Al-Rashid", "Dr. Fatima Abdullah"],
    members: 1934,
    totalPosts: 8756,
    totalTopics: 534,
    lastActivity: "2024-02-15T16:45:00Z",
    icon: "☪️",
    color: "green",
    rules: [
      "Follow Islamic principles of respect",
      "Share authentic hadith and Quranic verses",
      "Focus on environmental mercy and protection",
      "Respectful interfaith dialogue welcome",
    ],
    featured: true,
    private: false,
    requiresApproval: false,
    tags: [
      "tawhid",
      "environmental-mercy",
      "prophetic-guidance",
      "green-islam",
    ],
  },
  {
    id: "forum-indigenous",
    name: "Indigenous Wisdom Keepers",
    description:
      "Traditional ecological knowledge and sacred relationships with animal relatives",
    type: "faith",
    category: "Indigenous",
    moderators: ["Elder Mary Crow Feather", "Chief Joseph Running Bear"],
    members: 1456,
    totalPosts: 6234,
    totalTopics: 378,
    lastActivity: "2024-02-15T12:20:00Z",
    icon: "🦅",
    color: "orange",
    rules: [
      "Honor traditional protocols",
      "Share wisdom respectfully",
      "Protect sacred knowledge appropriately",
      "Focus on seven generations thinking",
    ],
    featured: true,
    private: false,
    requiresApproval: true,
    tags: [
      "traditional-knowledge",
      "sacred-relationships",
      "seven-generations",
      "animal-relatives",
    ],
  },
];

const speciesForums: Forum[] = [
  {
    id: "forum-elephants",
    name: "Elephant Guardians",
    description:
      "Dedicated to protecting and understanding elephants, the memory keepers of the animal kingdom",
    type: "species",
    category: "Elephants",
    moderators: ["Dr. Daphne Sheldrick", "Ranger Joseph Mukasa"],
    members: 3456,
    totalPosts: 12890,
    totalTopics: 756,
    lastActivity: "2024-02-15T18:15:00Z",
    icon: "🐘",
    color: "gray",
    rules: [
      "Focus on elephant conservation",
      "Share research and field experiences",
      "Respectful discussion of human-elephant conflict",
      "Support anti-poaching efforts",
    ],
    featured: true,
    private: false,
    requiresApproval: false,
    tags: [
      "elephant-behavior",
      "conservation",
      "human-elephant-conflict",
      "research",
    ],
  },
  {
    id: "forum-whales",
    name: "Whale Song Sanctuary",
    description:
      "Listening to the ancient wisdom of whales and protecting ocean sanctuaries",
    type: "species",
    category: "Whales",
    moderators: ["Dr. Roger Payne", "Captain Paul Watson"],
    members: 2134,
    totalPosts: 8943,
    totalTopics: 445,
    lastActivity: "2024-02-15T20:30:00Z",
    icon: "🐋",
    color: "blue",
    rules: [
      "Share whale research and sightings",
      "Discuss ocean conservation",
      "Respect indigenous whaling traditions",
      "Focus on marine sanctuary protection",
    ],
    featured: false,
    private: false,
    requiresApproval: false,
    tags: [
      "whale-songs",
      "marine-conservation",
      "ocean-sanctuaries",
      "cetacean-research",
    ],
  },
];

const mockTopics: Topic[] = [
  {
    id: "topic-001",
    title: "Biblical Foundations for Elephant Conservation in Kenya",
    content:
      "I've been reflecting on how we can apply biblical teachings to support elephant conservation efforts in Kenya. The verse 'Are not two sparrows sold for a penny? Yet not one of them will fall to the ground outside your Father's care' (Matthew 10:29) keeps coming to mind when I think about the elephants in Amboseli. How can we as Christians better support local communities who live alongside these majestic creatures?",
    authorId: "user-123",
    authorName: "Pastor David Kimani",
    authorRole: "verified_guardian",
    forumId: "forum-christian",
    forumName: "Christian Stewardship",
    type: "discussion",
    tags: ["kenya", "elephants", "biblical-stewardship", "community-support"],
    pinned: false,
    locked: false,
    featured: true,
    upvotes: 47,
    downvotes: 2,
    views: 234,
    replies: 23,
    lastReplyAt: "2024-02-15T16:45:00Z",
    lastReplyBy: "Dr. Grace Wanjiku",
    createdAt: "2024-02-12T09:15:00Z",
    updatedAt: "2024-02-15T16:45:00Z",
    attachments: [
      {
        id: "att-001",
        type: "image",
        url: "/forum/elephant-family-kenya.jpg",
        name: "Elephant family in Amboseli",
        caption: "A family of elephants near our church mission station",
      },
    ],
    spiritualLevel: "intermediate",
  },
  {
    id: "topic-002",
    title: "Prayer Request: Urgent Help for Whale Stranding in New Zealand",
    content:
      "Assalamu alaikum brothers and sisters. We need urgent prayers for a pod of pilot whales that have stranded on the beaches of New Zealand. The rescue teams are working around the clock, but we know that Allah (SWT) has power over all creation. Let us pray for the whales, the rescue workers, and for wisdom in our stewardship of the oceans.",
    authorId: "user-456",
    authorName: "Dr. Aisha Rahman",
    authorRole: "moderator",
    forumId: "forum-islamic",
    forumName: "Islamic Environmental Mercy",
    type: "prayer_request",
    tags: ["whales", "emergency", "marine-rescue", "stewardship"],
    pinned: true,
    locked: false,
    featured: false,
    upvotes: 89,
    downvotes: 0,
    views: 456,
    replies: 34,
    lastReplyAt: "2024-02-15T21:20:00Z",
    lastReplyBy: "Imam Hassan Al-Rashid",
    createdAt: "2024-02-14T11:30:00Z",
    updatedAt: "2024-02-15T21:20:00Z",
    attachments: [],
    spiritualLevel: "beginner",
  },
  {
    id: "topic-003",
    title: "Traditional Ceremony: Blessing the Monarch Butterfly Migration",
    content:
      "Our community is planning a traditional blessing ceremony for the monarch butterflies as they begin their sacred journey south. We invite all indigenous community members and allies to join us in honoring these messenger spirits. The ceremony will include traditional songs, prayers, and the planting of sacred milkweed. Please share if you know of similar ceremonies in your communities.",
    authorId: "user-789",
    authorName: "Elder Mary Crow Feather",
    authorRole: "elder",
    forumId: "forum-indigenous",
    forumName: "Indigenous Wisdom Keepers",
    type: "event",
    tags: [
      "monarch-butterfly",
      "traditional-ceremony",
      "migration",
      "blessing",
    ],
    pinned: false,
    locked: false,
    featured: true,
    upvotes: 67,
    downvotes: 1,
    views: 178,
    replies: 15,
    lastReplyAt: "2024-02-15T14:10:00Z",
    lastReplyBy: "Chief Joseph Running Bear",
    createdAt: "2024-02-13T08:45:00Z",
    updatedAt: "2024-02-15T14:10:00Z",
    attachments: [
      {
        id: "att-002",
        type: "image",
        url: "/forum/monarch-ceremony.jpg",
        name: "Monarch blessing ceremony",
        caption: "Last year's butterfly blessing ceremony",
      },
    ],
    eventDetails: {
      date: "2024-09-15",
      time: "06:00",
      location: "Sacred Grove, Oklahoma",
      type: "prayer_gathering",
      attendees: ["user-789", "user-101", "user-102"],
      maxCapacity: 50,
    },
    spiritualLevel: "advanced",
  },
];

export default function CommunityForums() {
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [topics, setTopics] = useState<Topic[]>(mockTopics);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [activeTab, setActiveTab] = useState("faith");

  const [newTopic, setNewTopic] = useState<Partial<Topic>>({
    type: "discussion",
    tags: [],
    attachments: [],
    spiritualLevel: "beginner",
  });

  const [newReply, setNewReply] = useState("");

  const allForums = [...faithForums, ...speciesForums];
  const filteredTopics = topics.filter((topic) => {
    if (selectedForum && topic.forumId !== selectedForum.id) return false;
    if (
      searchTerm &&
      !topic.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !topic.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    if (filterType !== "all" && topic.type !== filterType) return false;
    return true;
  });

  const handleCreateTopic = () => {
    if (newTopic.title && newTopic.content && selectedForum) {
      const topic: Topic = {
        id: `topic-${Date.now()}`,
        title: newTopic.title,
        content: newTopic.content,
        authorId: "current-user",
        authorName: "Current User",
        authorRole: "member",
        forumId: selectedForum.id,
        forumName: selectedForum.name,
        type: newTopic.type || "discussion",
        tags: newTopic.tags || [],
        pinned: false,
        locked: false,
        featured: false,
        upvotes: 0,
        downvotes: 0,
        views: 0,
        replies: 0,
        lastReplyAt: new Date().toISOString(),
        lastReplyBy: "Current User",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        attachments: newTopic.attachments || [],
        spiritualLevel: newTopic.spiritualLevel || "beginner",
      };

      setTopics((prev) => [topic, ...prev]);
      setNewTopic({
        type: "discussion",
        tags: [],
        attachments: [],
        spiritualLevel: "beginner",
      });
      setIsCreatingTopic(false);
      console.log("New topic created:", topic);
    }
  };

  const handleAddReply = () => {
    if (newReply && selectedTopic) {
      const reply: Reply = {
        id: `reply-${Date.now()}`,
        content: newReply,
        authorId: "current-user",
        authorName: "Current User",
        authorRole: "member",
        topicId: selectedTopic.id,
        upvotes: 0,
        downvotes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        attachments: [],
        edited: false,
        helpful: false,
      };

      setReplies((prev) => [...prev, reply]);
      setTopics((prev) =>
        prev.map((t) =>
          t.id === selectedTopic.id
            ? {
                ...t,
                replies: t.replies + 1,
                lastReplyAt: new Date().toISOString(),
                lastReplyBy: "Current User",
              }
            : t,
        ),
      );
      setNewReply("");
      console.log("New reply added:", reply);
    }
  };

  const handleVote = (topicId: string, voteType: "up" | "down") => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === topicId
          ? {
              ...t,
              upvotes: voteType === "up" ? t.upvotes + 1 : t.upvotes,
              downvotes: voteType === "down" ? t.downvotes + 1 : t.downvotes,
            }
          : t,
      ),
    );
    console.log(`Voted ${voteType} on topic:`, topicId);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-600";
      case "moderator":
        return "text-purple-600";
      case "verified_guardian":
        return "text-green-600";
      case "elder":
        return "text-yellow-600";
      case "youth_leader":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-3 h-3" />;
      case "moderator":
        return <Shield className="w-3 h-3" />;
      case "verified_guardian":
        return <Star className="w-3 h-3" />;
      case "elder":
        return <Award className="w-3 h-3" />;
      case "youth_leader":
        return <Zap className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "discussion":
        return MessageCircle;
      case "question":
        return Target;
      case "prayer_request":
        return Heart;
      case "testimony":
        return Star;
      case "news":
        return Globe;
      case "event":
        return Calendar;
      case "project_update":
        return TrendingUp;
      case "meditation_guide":
        return Sun;
      default:
        return MessageCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community Forums</h1>
          <p className="text-gray-600">
            Connect with fellow guardians across faith traditions and species
            protection
          </p>
        </div>
        {selectedForum && (
          <Button onClick={() => setIsCreatingTopic(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Topic
          </Button>
        )}
      </div>

      {/* Forum Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              {allForums
                .reduce((total, forum) => total + forum.members, 0)
                .toLocaleString()}
            </h3>
            <p className="text-gray-600">Active Members</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              {allForums
                .reduce((total, forum) => total + forum.totalTopics, 0)
                .toLocaleString()}
            </h3>
            <p className="text-gray-600">Discussion Topics</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Reply className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              {allForums
                .reduce((total, forum) => total + forum.totalPosts, 0)
                .toLocaleString()}
            </h3>
            <p className="text-gray-600">Total Posts</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">{allForums.length}</h3>
            <p className="text-gray-600">Communities</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Forum Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Forums</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 m-4 mb-0">
                  <TabsTrigger value="faith">Faith</TabsTrigger>
                  <TabsTrigger value="species">Species</TabsTrigger>
                </TabsList>

                <TabsContent value="faith" className="mt-0">
                  <div className="space-y-1 p-4">
                    {faithForums.map((forum) => (
                      <div
                        key={forum.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                          selectedForum?.id === forum.id
                            ? "bg-blue-50 border border-blue-200"
                            : ""
                        }`}
                        onClick={() => setSelectedForum(forum)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{forum.icon}</div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {forum.name}
                            </h4>
                            <p className="text-xs text-gray-500 truncate">
                              {forum.description}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                              <span>
                                {forum.members.toLocaleString()} members
                              </span>
                              <span>{forum.totalTopics} topics</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="species" className="mt-0">
                  <div className="space-y-1 p-4">
                    {speciesForums.map((forum) => (
                      <div
                        key={forum.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                          selectedForum?.id === forum.id
                            ? "bg-blue-50 border border-blue-200"
                            : ""
                        }`}
                        onClick={() => setSelectedForum(forum)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-xl">{forum.icon}</div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {forum.name}
                            </h4>
                            <p className="text-xs text-gray-500 truncate">
                              {forum.description}
                            </p>
                            <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                              <span>
                                {forum.members.toLocaleString()} members
                              </span>
                              <span>{forum.totalTopics} topics</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {selectedForum && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-xl">{selectedForum.icon}</span>
                  <span>{selectedForum.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  {selectedForum.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Members:</span>
                    <span className="font-medium">
                      {selectedForum.members.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Topics:</span>
                    <span className="font-medium">
                      {selectedForum.totalTopics}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posts:</span>
                    <span className="font-medium">
                      {selectedForum.totalPosts.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium mb-2">Moderators</h5>
                  <div className="space-y-1">
                    {selectedForum.moderators.map((mod, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <Shield className="w-3 h-3 text-purple-600" />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="font-medium mb-2">Forum Rules</h5>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {selectedForum.rules.map((rule, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 mt-1">��</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full mt-4" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Join Forum
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {selectedTopic ? (
            /* Topic View */
            <div className="space-y-6">
              <Button
                variant="outline"
                onClick={() => setSelectedTopic(null)}
                className="mb-4"
              >
                ← Back to {selectedForum?.name}
              </Button>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <UserCircle className="w-10 h-10 text-gray-400" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {selectedTopic.authorName}
                          </span>
                          {getRoleBadge(selectedTopic.authorRole)}
                          <Badge
                            variant="outline"
                            className={`text-xs ${getRoleColor(selectedTopic.authorRole)}`}
                          >
                            {selectedTopic.authorRole.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(
                            selectedTopic.createdAt,
                          ).toLocaleDateString()}{" "}
                          • {selectedTopic.views} views
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedTopic.pinned && (
                        <Pin className="w-4 h-4 text-yellow-600" />
                      )}
                      {selectedTopic.locked && (
                        <Lock className="w-4 h-4 text-red-600" />
                      )}
                      {selectedTopic.featured && (
                        <Star className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold mb-4">
                    {selectedTopic.title}
                  </h1>

                  <div className="flex items-center space-x-2 mb-4">
                    {selectedTopic.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-xs">
                      {selectedTopic.spiritualLevel}
                    </Badge>
                  </div>

                  <div className="prose max-w-none mb-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedTopic.content}
                    </p>
                  </div>

                  {selectedTopic.attachments.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Attachments</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedTopic.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="border rounded-lg p-3"
                          >
                            <div className="flex items-center space-x-3">
                              <Image className="w-8 h-8 text-gray-400" />
                              <div>
                                <div className="font-medium text-sm">
                                  {attachment.name}
                                </div>
                                {attachment.caption && (
                                  <div className="text-xs text-gray-500">
                                    {attachment.caption}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTopic.eventDetails && (
                    <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Event Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(
                            selectedTopic.eventDetails.date,
                          ).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span>{" "}
                          {selectedTopic.eventDetails.time}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span>{" "}
                          {selectedTopic.eventDetails.location}
                        </div>
                        <div>
                          <span className="font-medium">Attendees:</span>{" "}
                          {selectedTopic.eventDetails.attendees.length}
                          {selectedTopic.eventDetails.maxCapacity &&
                            ` / ${selectedTopic.eventDetails.maxCapacity}`}
                        </div>
                      </div>
                      <Button size="sm" className="mt-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        Join Event
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(selectedTopic.id, "up")}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {selectedTopic.upvotes}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(selectedTopic.id, "down")}
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        {selectedTopic.downvotes}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Flag className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Replies */}
              <Card>
                <CardHeader>
                  <CardTitle>Replies ({selectedTopic.replies})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {replies
                      .filter((r) => r.topicId === selectedTopic.id)
                      .map((reply) => (
                        <div
                          key={reply.id}
                          className="border-l-2 border-gray-200 pl-4"
                        >
                          <div className="flex items-start space-x-3">
                            <UserCircle className="w-8 h-8 text-gray-400 mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-sm">
                                  {reply.authorName}
                                </span>
                                {getRoleBadge(reply.authorRole)}
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${getRoleColor(reply.authorRole)}`}
                                >
                                  {reply.authorRole.replace("_", " ")}
                                </Badge>
                                {reply.helpful && (
                                  <Badge className="text-xs bg-green-100 text-green-800">
                                    Helpful
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 mb-2">
                                {new Date(reply.createdAt).toLocaleDateString()}
                                {reply.edited && " • edited"}
                              </div>
                              <p className="text-sm text-gray-700 mb-3">
                                {reply.content}
                              </p>
                              <div className="flex items-center space-x-3">
                                <Button variant="outline" size="sm">
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  {reply.upvotes}
                                </Button>
                                <Button variant="outline" size="sm">
                                  <ThumbsDown className="w-3 h-3 mr-1" />
                                  {reply.downvotes}
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Reply className="w-3 h-3 mr-1" />
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* Add Reply */}
                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-3">Add a Reply</h4>
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Share your thoughts..."
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          rows={4}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Image className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Link className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button onClick={handleAddReply}>
                            <Send className="w-4 h-4 mr-2" />
                            Post Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Topics List */
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search topics..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 border rounded-md bg-white"
                    >
                      <option value="all">All Types</option>
                      <option value="discussion">Discussion</option>
                      <option value="question">Question</option>
                      <option value="prayer_request">Prayer Request</option>
                      <option value="testimony">Testimony</option>
                      <option value="event">Event</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border rounded-md bg-white"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="replies">Most Replies</option>
                      <option value="views">Most Viewed</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Create Topic Form */}
              {isCreatingTopic && (
                <Card className="border-2 border-green-300 bg-green-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Create New Topic</h3>

                    <div className="space-y-4">
                      <Input
                        placeholder="Topic title"
                        value={newTopic.title || ""}
                        onChange={(e) =>
                          setNewTopic((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />

                      <Textarea
                        placeholder="Share your thoughts, questions, or experiences..."
                        value={newTopic.content || ""}
                        onChange={(e) =>
                          setNewTopic((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                        rows={6}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                          value={newTopic.type || "discussion"}
                          onChange={(e) =>
                            setNewTopic((prev) => ({
                              ...prev,
                              type: e.target.value as any,
                            }))
                          }
                          className="px-3 py-2 border rounded-md bg-white"
                        >
                          <option value="discussion">Discussion</option>
                          <option value="question">Question</option>
                          <option value="prayer_request">Prayer Request</option>
                          <option value="testimony">Testimony</option>
                          <option value="news">News</option>
                          <option value="event">Event</option>
                          <option value="meditation_guide">
                            Meditation Guide
                          </option>
                        </select>
                        <select
                          value={newTopic.spiritualLevel || "beginner"}
                          onChange={(e) =>
                            setNewTopic((prev) => ({
                              ...prev,
                              spiritualLevel: e.target.value as any,
                            }))
                          }
                          className="px-3 py-2 border rounded-md bg-white"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="elder">Elder</option>
                        </select>
                      </div>

                      <Input
                        placeholder="Tags (comma-separated)"
                        value={newTopic.tags?.join(", ") || ""}
                        onChange={(e) =>
                          setNewTopic((prev) => ({
                            ...prev,
                            tags: e.target.value
                              .split(",")
                              .map((tag) => tag.trim())
                              .filter((tag) => tag),
                          }))
                        }
                      />

                      <div className="flex items-center space-x-3">
                        <Button onClick={handleCreateTopic}>
                          <Send className="w-4 h-4 mr-2" />
                          Create Topic
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setIsCreatingTopic(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Topics List */}
              <div className="space-y-4">
                {filteredTopics.map((topic) => {
                  const TypeIcon = getTypeIcon(topic.type);

                  return (
                    <Card
                      key={topic.id}
                      className="cursor-pointer transition-all hover:shadow-lg"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <TypeIcon className="w-5 h-5 text-blue-600" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-bold truncate">
                                {topic.title}
                              </h3>
                              {topic.pinned && (
                                <Pin className="w-4 h-4 text-yellow-600" />
                              )}
                              {topic.locked && (
                                <Lock className="w-4 h-4 text-red-600" />
                              )}
                              {topic.featured && (
                                <Star className="w-4 h-4 text-purple-600" />
                              )}
                            </div>

                            <p className="text-gray-700 mb-3 line-clamp-2">
                              {topic.content}
                            </p>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {topic.tags.slice(0, 3).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {topic.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{topic.tags.length - 3}
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                  <UserCircle className="w-3 h-3 mr-1" />
                                  {topic.authorName}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {new Date(
                                    topic.createdAt,
                                  ).toLocaleDateString()}
                                </span>
                                <span className="flex items-center">
                                  <MessageCircle className="w-3 h-3 mr-1" />
                                  {topic.replies}
                                </span>
                                <span className="flex items-center">
                                  <Eye className="w-3 h-3 mr-1" />
                                  {topic.views}
                                </span>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleVote(topic.id, "up");
                                  }}
                                >
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  {topic.upvotes}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {!selectedForum && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="p-8 text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      Select a Forum
                    </h3>
                    <p className="text-gray-500">
                      Choose a faith community or species forum to view
                      discussions
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
