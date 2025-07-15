import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Plus,
  Save,
  Edit,
  X,
  Star,
  ThumbsUp,
  ThumbsDown,
  Share,
  BookOpen,
  Eye,
  Clock,
  MapPin,
  User,
  Globe,
  Sparkles,
  Send,
  Filter,
  Search,
  Calendar,
  Volume2,
  Play,
  Pause,
  Download,
  Flag,
  Crown,
  Leaf,
  Mountain,
  Waves,
  Sun,
  Moon,
  TreePine,
  Bird,
  Fish,
  Flower,
  Target,
  Zap,
  Brain,
  Trash2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface Prayer {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  faithTradition: string[];
  species?: string;
  habitat?: string;
  occasion?: string;
  timeOfDay?: "dawn" | "midday" | "evening" | "night" | "any";
  language: string;
  tags: string[];
  scripture?: { text: string; reference: string };
  audioUrl?: string;
  imageUrl?: string;
  duration: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  type: "prayer" | "meditation" | "chant" | "reflection" | "blessing";
  status: "pending" | "approved" | "featured" | "rejected";
  upvotes: number;
  downvotes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  aiEnhanced: boolean;
  moderationNotes?: string;
  isPrivate: boolean;
  derivedFrom?: string; // Reference to original prayer if this is a variation
}

interface PrayerTemplate {
  id: string;
  name: string;
  description: string;
  structure: string[];
  faithTraditons: string[];
  example: string;
  aiPrompt: string;
}

interface AIGenerationRequest {
  species?: string;
  habitat?: string;
  occasion?: string;
  faithTradition: string;
  timeOfDay?: string;
  mood?: string;
  length?: "short" | "medium" | "long";
  includeScripture: boolean;
}

// Mock data
const mockPrayers: Prayer[] = [
  {
    id: "prayer-001",
    title: "Dawn Blessing for Mountain Guardians",
    content:
      "As the first light touches the sacred peaks, we offer our gratitude to the snow leopards who guard these heights. Great Spirit of the Mountains, protect these noble beings who walk the knife-edge between heaven and earth. May their silent paws find safe passage through the changing seasons, and may human hearts learn the wisdom of their patience and grace.",
    authorId: "user-123",
    authorName: "Tenzin Norbu",
    faithTradition: ["Buddhism", "Indigenous"],
    species: "Snow Leopard",
    habitat: "Mountains",
    timeOfDay: "dawn",
    language: "English",
    tags: ["protection", "wisdom", "sacred-mountains", "guardianship"],
    scripture: {
      text: "He makes my feet like deer's feet, and sets me on my high places",
      reference: "2 Samuel 22:34",
    },
    duration: 5,
    difficulty: "beginner",
    type: "prayer",
    status: "featured",
    upvotes: 147,
    downvotes: 3,
    views: 892,
    createdAt: "2024-02-10T06:30:00Z",
    updatedAt: "2024-02-15T10:20:00Z",
    aiEnhanced: false,
    isPrivate: false,
  },
  {
    id: "prayer-002",
    title: "Ocean Meditation for Whale Songs",
    content:
      "Breathe deeply with the rhythm of the waves. Feel yourself descending into the blue cathedral where ancient whales sing their songs of memory. Each breath connects you to the great migrations that have crossed these waters for millions of years. Listen... can you hear the mothers calling to their calves? The elders sharing the maps of the deep? Let their songs wash through you, carrying away the noise of human worry, leaving only the vast peace of the ocean's embrace.",
    authorId: "user-456",
    authorName: "Maria Santos",
    faithTradition: ["Indigenous", "Universal"],
    species: "Whales",
    habitat: "Ocean",
    timeOfDay: "any",
    language: "English",
    tags: ["meditation", "ocean", "whale-songs", "deep-listening"],
    audioUrl: "/audio/whale-meditation.mp3",
    duration: 15,
    difficulty: "intermediate",
    type: "meditation",
    status: "approved",
    upvotes: 203,
    downvotes: 7,
    views: 1247,
    createdAt: "2024-02-08T14:15:00Z",
    updatedAt: "2024-02-12T16:45:00Z",
    aiEnhanced: true,
    isPrivate: false,
  },
  {
    id: "prayer-003",
    title: "Evening Gratitude for Pollinator Gardens",
    content:
      "Dear Creator of All Blooming Things, as twilight settles over our gardens, we give thanks for the tiny winged workers who dance from flower to flower. Each bee, each butterfly, each hummingbird carries the secret of life from bloom to bloom. Tonight we pray for their safe rest and tomorrow's continuation of the ancient dance between petal and wing. May our gardens be sanctuaries, our pesticides few, and our wonder ever-growing at the miracle of pollination.",
    authorId: "user-789",
    authorName: "Rev. Sarah Kim",
    faithTradition: ["Christianity"],
    species: "Bees",
    habitat: "Gardens",
    timeOfDay: "evening",
    language: "English",
    tags: ["gratitude", "pollinators", "gardens", "stewardship"],
    scripture: {
      text: "Consider the lilies of the field, how they grow; they neither toil nor spin",
      reference: "Matthew 6:28",
    },
    duration: 3,
    difficulty: "beginner",
    type: "prayer",
    status: "approved",
    upvotes: 89,
    downvotes: 1,
    views: 456,
    createdAt: "2024-02-12T19:20:00Z",
    updatedAt: "2024-02-12T19:20:00Z",
    aiEnhanced: false,
    isPrivate: false,
  },
];

const prayerTemplates: PrayerTemplate[] = [
  {
    id: "template-001",
    name: "Traditional Opening-Body-Closing",
    description:
      "Classic prayer structure with invocation, main content, and closing blessing",
    structure: [
      "Invocation",
      "Gratitude",
      "Petition",
      "Commitment",
      "Closing Blessing",
    ],
    faithTraditons: ["Christianity", "Islam", "Judaism"],
    example:
      "Dear [Divine Name], we thank you for [specific blessing], we ask for [specific help], we commit to [specific action], may [blessing] be upon [recipients]. Amen.",
    aiPrompt:
      "Create a prayer following traditional structure with opening invocation, gratitude, petition, commitment, and closing blessing for {species} in {habitat}",
  },
  {
    id: "template-002",
    name: "Meditation Journey",
    description:
      "Guided visualization that takes the participant on a spiritual journey",
    structure: [
      "Grounding",
      "Journey Beginning",
      "Encounters",
      "Wisdom Received",
      "Return",
    ],
    faithTraditons: ["Buddhism", "Indigenous", "Universal"],
    example:
      "Close your eyes and feel your connection to earth... Now imagine walking into [habitat]... You encounter [species]... They teach you [wisdom]... You return with [understanding]...",
    aiPrompt:
      "Create a meditation journey where the participant encounters {species} in {habitat} and receives spiritual wisdom about conservation",
  },
  {
    id: "template-003",
    name: "Scripture-Based Reflection",
    description:
      "Prayer or meditation built around a specific scriptural passage",
    structure: ["Scripture Reading", "Reflection", "Application", "Prayer"],
    faithTraditons: ["Christianity", "Islam", "Judaism"],
    example:
      "The scripture says '[verse]'... When we consider [species], we see how this truth applies... Therefore we pray...",
    aiPrompt:
      "Create a prayer based on relevant scripture that connects {species} to divine teachings about stewardship and care",
  },
];

const faithTraditions = [
  "Christianity",
  "Islam",
  "Judaism",
  "Buddhism",
  "Hinduism",
  "Indigenous",
  "Universal",
];
const timeOfDayOptions = ["dawn", "midday", "evening", "night", "any"];
const prayerTypes = ["prayer", "meditation", "chant", "reflection", "blessing"];
const difficulties = ["beginner", "intermediate", "advanced"];

export default function PrayerCreationSystem() {
  const [prayers, setPrayers] = useState<Prayer[]>(mockPrayers);
  const [filteredPrayers, setFilteredPrayers] = useState<Prayer[]>(mockPrayers);
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFaith, setFilterFaith] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const [newPrayer, setNewPrayer] = useState<Partial<Prayer>>({
    faithTradition: [],
    tags: [],
    type: "prayer",
    difficulty: "beginner",
    timeOfDay: "any",
    language: "English",
    status: "pending",
    upvotes: 0,
    downvotes: 0,
    views: 0,
    aiEnhanced: false,
    isPrivate: false,
  });

  const [aiRequest, setAiRequest] = useState<AIGenerationRequest>({
    faithTradition: "Universal",
    includeScripture: false,
  });

  // Filter prayers based on search and filters
  useEffect(() => {
    let filtered = prayers;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    if (filterFaith !== "all") {
      filtered = filtered.filter((p) => p.faithTradition.includes(filterFaith));
    }

    if (filterType !== "all") {
      filtered = filtered.filter((p) => p.type === filterType);
    }

    setFilteredPrayers(filtered);
  }, [prayers, searchTerm, filterFaith, filterType]);

  const handleCreatePrayer = () => {
    if (newPrayer.title && newPrayer.content) {
      const prayer: Prayer = {
        id: `prayer-${Date.now()}`,
        title: newPrayer.title,
        content: newPrayer.content,
        authorId: "current-user",
        authorName: "Current User",
        faithTradition: newPrayer.faithTradition || [],
        species: newPrayer.species,
        habitat: newPrayer.habitat,
        occasion: newPrayer.occasion,
        timeOfDay: newPrayer.timeOfDay,
        language: newPrayer.language || "English",
        tags: newPrayer.tags || [],
        scripture: newPrayer.scripture,
        duration: newPrayer.duration || 5,
        difficulty: newPrayer.difficulty || "beginner",
        type: newPrayer.type || "prayer",
        status: "pending",
        upvotes: 0,
        downvotes: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        aiEnhanced: newPrayer.aiEnhanced || false,
        isPrivate: newPrayer.isPrivate || false,
      };

      setPrayers((prev) => [...prev, prayer]);
      setNewPrayer({
        faithTradition: [],
        tags: [],
        type: "prayer",
        difficulty: "beginner",
        timeOfDay: "any",
        language: "English",
        status: "pending",
        upvotes: 0,
        downvotes: 0,
        views: 0,
        aiEnhanced: false,
        isPrivate: false,
      });
      setIsCreating(false);
      console.log("New prayer created:", prayer);
    }
  };

  const handleVote = (prayerId: string, voteType: "up" | "down") => {
    setPrayers((prev) =>
      prev.map((p) =>
        p.id === prayerId
          ? {
              ...p,
              upvotes: voteType === "up" ? p.upvotes + 1 : p.upvotes,
              downvotes: voteType === "down" ? p.downvotes + 1 : p.downvotes,
            }
          : p,
      ),
    );
    console.log(`Voted ${voteType} on prayer:`, prayerId);
  };

  const handleDeletePrayer = (prayerId: string) => {
    setPrayers((prev) => prev.filter((p) => p.id !== prayerId));
    if (selectedPrayer?.id === prayerId) {
      setSelectedPrayer(null);
    }
    console.log("Prayer deleted:", prayerId);
  };

  const handleAIGenerate = () => {
    // Simulate AI generation
    const aiGeneratedContent = `Divine Creator, as we contemplate the ${aiRequest.species || "sacred creatures"} in their ${aiRequest.habitat || "natural homes"}, we are moved to prayer. Grant us wisdom to be faithful stewards of your creation. May our actions reflect the love and care that you have for all living beings. Guide our hearts to understand the interconnectedness of all life, and inspire us to protect and preserve the precious gift of biodiversity for future generations.`;

    setNewPrayer((prev) => ({
      ...prev,
      content: aiGeneratedContent,
      aiEnhanced: true,
      species: aiRequest.species,
      habitat: aiRequest.habitat,
      faithTradition: [aiRequest.faithTradition],
      title: `AI-Generated Prayer for ${aiRequest.species || "Creation"}`,
    }));

    setShowAIAssistant(false);
    setIsCreating(true);
    console.log("AI prayer generated with request:", aiRequest);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "featured":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prayer":
        return Heart;
      case "meditation":
        return Sun;
      case "chant":
        return Volume2;
      case "reflection":
        return BookOpen;
      case "blessing":
        return Star;
      default:
        return Heart;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Prayer & Meditation Creation</h1>
          <p className="text-gray-600">
            Community-generated spiritual content for wildlife conservation
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowAIAssistant(true)}>
            <Brain className="w-4 h-4 mr-2" />
            AI Assistant
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Prayer
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search prayers by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterFaith}
              onChange={(e) => setFilterFaith(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="all">All Faiths</option>
              {faithTraditions.map((faith) => (
                <option key={faith} value={faith}>
                  {faith}
                </option>
              ))}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="all">All Types</option>
              {prayerTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <Card className="border-2 border-purple-300 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold">AI Prayer Assistant</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Let AI help you create a meaningful prayer or meditation. Provide
              some details about what you'd like to focus on.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="Species (e.g., Snow Leopard)"
                value={aiRequest.species || ""}
                onChange={(e) =>
                  setAiRequest((prev) => ({ ...prev, species: e.target.value }))
                }
              />
              <Input
                placeholder="Habitat (e.g., Mountains)"
                value={aiRequest.habitat || ""}
                onChange={(e) =>
                  setAiRequest((prev) => ({ ...prev, habitat: e.target.value }))
                }
              />
              <Input
                placeholder="Occasion (e.g., World Wildlife Day)"
                value={aiRequest.occasion || ""}
                onChange={(e) =>
                  setAiRequest((prev) => ({
                    ...prev,
                    occasion: e.target.value,
                  }))
                }
              />
              <select
                value={aiRequest.faithTradition}
                onChange={(e) =>
                  setAiRequest((prev) => ({
                    ...prev,
                    faithTradition: e.target.value,
                  }))
                }
                className="px-3 py-2 border rounded-md bg-white"
              >
                {faithTraditions.map((faith) => (
                  <option key={faith} value={faith}>
                    {faith}
                  </option>
                ))}
              </select>
              <select
                value={aiRequest.timeOfDay || ""}
                onChange={(e) =>
                  setAiRequest((prev) => ({
                    ...prev,
                    timeOfDay: e.target.value,
                  }))
                }
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="">Any time</option>
                {timeOfDayOptions.slice(0, -1).map((time) => (
                  <option key={time} value={time}>
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={aiRequest.length || ""}
                onChange={(e) =>
                  setAiRequest((prev) => ({
                    ...prev,
                    length: e.target.value as any,
                  }))
                }
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="">Medium length</option>
                <option value="short">Short (1-2 min)</option>
                <option value="medium">Medium (3-5 min)</option>
                <option value="long">Long (10+ min)</option>
              </select>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={aiRequest.includeScripture}
                  onChange={(e) =>
                    setAiRequest((prev) => ({
                      ...prev,
                      includeScripture: e.target.checked,
                    }))
                  }
                />
                <span className="text-sm">Include scriptural reference</span>
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <Button onClick={handleAIGenerate}>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Prayer
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAIAssistant(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Prayer Form */}
      {isCreating && (
        <Card className="border-2 border-green-300 bg-green-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Create New Prayer</h3>

            <div className="space-y-4">
              <Input
                placeholder="Prayer title"
                value={newPrayer.title || ""}
                onChange={(e) =>
                  setNewPrayer((prev) => ({ ...prev, title: e.target.value }))
                }
              />

              <Textarea
                placeholder="Prayer content"
                value={newPrayer.content || ""}
                onChange={(e) =>
                  setNewPrayer((prev) => ({ ...prev, content: e.target.value }))
                }
                rows={8}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Species (optional)"
                  value={newPrayer.species || ""}
                  onChange={(e) =>
                    setNewPrayer((prev) => ({
                      ...prev,
                      species: e.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Habitat (optional)"
                  value={newPrayer.habitat || ""}
                  onChange={(e) =>
                    setNewPrayer((prev) => ({
                      ...prev,
                      habitat: e.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Duration (minutes)"
                  type="number"
                  value={newPrayer.duration || ""}
                  onChange={(e) =>
                    setNewPrayer((prev) => ({
                      ...prev,
                      duration: parseInt(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={newPrayer.type || "prayer"}
                  onChange={(e) =>
                    setNewPrayer((prev) => ({
                      ...prev,
                      type: e.target.value as any,
                    }))
                  }
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  {prayerTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  value={newPrayer.difficulty || "beginner"}
                  onChange={(e) =>
                    setNewPrayer((prev) => ({
                      ...prev,
                      difficulty: e.target.value as any,
                    }))
                  }
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  value={newPrayer.timeOfDay || "any"}
                  onChange={(e) =>
                    setNewPrayer((prev) => ({
                      ...prev,
                      timeOfDay: e.target.value as any,
                    }))
                  }
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  {timeOfDayOptions.map((time) => (
                    <option key={time} value={time}>
                      {time.charAt(0).toUpperCase() + time.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Faith Traditions
                </label>
                <div className="flex flex-wrap gap-2">
                  {faithTraditions.map((faith) => (
                    <label key={faith} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={
                          newPrayer.faithTradition?.includes(faith) || false
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewPrayer((prev) => ({
                              ...prev,
                              faithTradition: [
                                ...(prev.faithTradition || []),
                                faith,
                              ],
                            }));
                          } else {
                            setNewPrayer((prev) => ({
                              ...prev,
                              faithTradition:
                                prev.faithTradition?.filter(
                                  (f) => f !== faith,
                                ) || [],
                            }));
                          }
                        }}
                      />
                      <span className="text-sm">{faith}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Input
                placeholder="Tags (comma-separated)"
                value={newPrayer.tags?.join(", ") || ""}
                onChange={(e) =>
                  setNewPrayer((prev) => ({
                    ...prev,
                    tags: e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag),
                  }))
                }
              />

              {/* Scripture Reference */}
              <div className="border rounded-lg p-4 bg-white">
                <h4 className="font-medium mb-2">
                  Scripture Reference (Optional)
                </h4>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Scripture text"
                    value={newPrayer.scripture?.text || ""}
                    onChange={(e) =>
                      setNewPrayer((prev) => ({
                        ...prev,
                        scripture: {
                          ...prev.scripture,
                          text: e.target.value,
                          reference: prev.scripture?.reference || "",
                        },
                      }))
                    }
                    rows={2}
                  />
                  <Input
                    placeholder="Scripture reference (e.g., Matthew 6:28)"
                    value={newPrayer.scripture?.reference || ""}
                    onChange={(e) =>
                      setNewPrayer((prev) => ({
                        ...prev,
                        scripture: {
                          text: prev.scripture?.text || "",
                          reference: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newPrayer.isPrivate || false}
                    onChange={(e) =>
                      setNewPrayer((prev) => ({
                        ...prev,
                        isPrivate: e.target.checked,
                      }))
                    }
                  />
                  <span className="text-sm">Keep private</span>
                </label>
                {newPrayer.aiEnhanced && (
                  <Badge className="bg-purple-100 text-purple-800">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Enhanced
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <Button onClick={handleCreatePrayer}>
                  <Save className="w-4 h-4 mr-2" />
                  Create Prayer
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Prayer List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredPrayers.map((prayer) => {
            const TypeIcon = getTypeIcon(prayer.type);

            return (
              <Card
                key={prayer.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedPrayer?.id === prayer.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedPrayer(prayer)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <TypeIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{prayer.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {prayer.authorName}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {prayer.duration} min
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {prayer.views}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(prayer.status)}>
                        {prayer.status}
                      </Badge>
                      {prayer.aiEnhanced && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Brain className="w-3 h-3 mr-1" />
                          AI
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {prayer.content}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {prayer.faithTradition.map((faith, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {faith}
                      </Badge>
                    ))}
                    {prayer.species && (
                      <Badge variant="outline" className="text-xs bg-green-50">
                        {prayer.species}
                      </Badge>
                    )}
                    {prayer.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(prayer.id, "up");
                        }}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {prayer.upvotes}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(prayer.id, "down");
                        }}
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        {prayer.downvotes}
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {prayer.audioUrl && (
                        <Button size="sm" variant="outline">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Prayer Detail Panel */}
        <div className="space-y-6">
          {selectedPrayer ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedPrayer.title}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeletePrayer(selectedPrayer.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="stats">Stats</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {selectedPrayer.content}
                      </p>
                    </div>

                    {selectedPrayer.scripture && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-blue-800 italic mb-2">
                          "{selectedPrayer.scripture.text}"
                        </p>
                        <p className="text-blue-600 text-sm font-medium">
                          - {selectedPrayer.scripture.reference}
                        </p>
                      </div>
                    )}

                    {selectedPrayer.audioUrl && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Play Audio
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="details" className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold">Author</h4>
                        <p className="text-sm text-gray-600">
                          {selectedPrayer.authorName}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Faith Traditions</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPrayer.faithTradition.map((faith, index) => (
                            <Badge key={index} variant="outline">
                              {faith}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">Type & Duration</h4>
                        <p className="text-sm text-gray-600">
                          {selectedPrayer.type.charAt(0).toUpperCase() +
                            selectedPrayer.type.slice(1)}{" "}
                          • {selectedPrayer.duration} minutes
                        </p>
                      </div>
                      {selectedPrayer.species && (
                        <div>
                          <h4 className="font-semibold">Species</h4>
                          <p className="text-sm text-gray-600">
                            {selectedPrayer.species}
                          </p>
                        </div>
                      )}
                      {selectedPrayer.habitat && (
                        <div>
                          <h4 className="font-semibold">Habitat</h4>
                          <p className="text-sm text-gray-600">
                            {selectedPrayer.habitat}
                          </p>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">Tags</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPrayer.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="stats" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          {selectedPrayer.upvotes}
                        </div>
                        <div className="text-sm text-gray-600">Upvotes</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-lg font-bold text-red-600">
                          {selectedPrayer.downvotes}
                        </div>
                        <div className="text-sm text-gray-600">Downvotes</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">
                          {selectedPrayer.views}
                        </div>
                        <div className="text-sm text-gray-600">Views</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-lg font-bold text-purple-600">
                          {Math.round(
                            (selectedPrayer.upvotes /
                              (selectedPrayer.upvotes +
                                selectedPrayer.downvotes)) *
                              100,
                          ) || 0}
                          %
                        </div>
                        <div className="text-sm text-gray-600">Approval</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Created</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(
                          selectedPrayer.createdAt,
                        ).toLocaleDateString()}
                      </p>
                      <h4 className="font-semibold mb-2 mt-3">Last Updated</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(
                          selectedPrayer.updatedAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Select a Prayer
                </h3>
                <p className="text-gray-500">
                  Choose a prayer from the list to view details and content
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
