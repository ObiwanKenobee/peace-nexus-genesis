import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Plus,
  Search,
  Filter,
  Book,
  FileText,
  Video,
  Gamepad2,
  Languages,
  Brain,
  Download,
  Share,
  Star,
  Eye,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Subtitles,
  Users,
  MessageSquare,
  ThumbsUp,
  BookOpen,
  Library,
  Sparkles,
  Zap,
  Target,
  Award,
  Crown,
  Edit,
  Trash2,
  Upload,
} from "lucide-react";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  type:
    | "article"
    | "video"
    | "simulation"
    | "treaty"
    | "case_study"
    | "cultural_story"
    | "training_module";
  category:
    | "conflict_resolution"
    | "cultural_understanding"
    | "legal_frameworks"
    | "peace_education"
    | "trauma_healing"
    | "diplomacy"
    | "mediation";

  // Content
  content?: string;
  videoUrl?: string;
  simulationData?: any;

  // Metadata
  author: string;
  dateCreated: string;
  lastUpdated: string;
  readTime?: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";

  // Localization & Translation
  originalLanguage: string;
  availableLanguages: string[];
  translations: {
    [language: string]: {
      title: string;
      description: string;
      content?: string;
    };
  };

  // Community Features
  views: number;
  likes: number;
  comments: number;
  rating: number;

  // AI Features
  aiSummary: string;
  keyInsights: string[];
  relatedTopics: string[];
  culturalContext?: string;

  // Verification & Trust
  verified: boolean;
  verifiedBy?: string;
  communityValidated: boolean;

  // Regional & Cultural
  regions: string[];
  cultures: string[];
  conflictTypes: string[];

  // Learning & Simulation
  learningObjectives?: string[];
  prerequisites?: string[];
  completionRate?: number;

  metadata: {
    tags: string[];
    sdgAlignment: string[];
    peacePillars: string[]; // Based on UN peace pillars
    accessLevel: "public" | "verified" | "premium";
  };
}

export default function PeaceKnowledgebase() {
  const { user } = usePaxisAuth();
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterLanguage, setFilterLanguage] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "library">("grid");
  const [currentLanguage, setCurrentLanguage] = useState("en");

  // Mock data for demonstration
  useEffect(() => {
    const mockKnowledgeItems: KnowledgeItem[] = [
      {
        id: "1",
        title: "Water Diplomacy in the Middle East: A Comprehensive Guide",
        description:
          "Comprehensive analysis of water resource conflicts and diplomatic solutions in the Jordan River basin, with practical mediation frameworks.",
        type: "article",
        category: "conflict_resolution",
        content:
          "Water scarcity and disputes over water resources have been significant sources of tension in the Middle East...",
        author: "Dr. Sarah Williams",
        dateCreated: "2024-01-15",
        lastUpdated: "2024-01-20",
        readTime: 25,
        difficulty: "intermediate",
        originalLanguage: "en",
        availableLanguages: ["en", "ar", "he", "fr"],
        translations: {
          ar: {
            title: "دبلوماسية المياه في الشرق الأوسط: دليل شامل",
            description:
              "تحليل شامل لنزاعات الموارد المائية والحلول الدبلوماسية في حوض نهر الأردن",
            content:
              "ندرة المياه والنزاعات حول الموارد المائية كانت مصادر توتر كبيرة في الشرق الأوسط...",
          },
        },
        views: 1247,
        likes: 89,
        comments: 23,
        rating: 4.7,
        aiSummary:
          "This guide provides practical frameworks for water-related conflict resolution, focusing on the Jordan River basin as a case study.",
        keyInsights: [
          "Water conflicts often stem from upstream-downstream power imbalances",
          "Cultural and religious significance of water sources must be considered",
          "Technical solutions require political will and trust-building",
        ],
        relatedTopics: [
          "Environmental Peace",
          "Resource Sharing",
          "Middle East Politics",
        ],
        culturalContext:
          "Understanding Islamic, Jewish, and Christian perspectives on water as a sacred resource",
        verified: true,
        verifiedBy: "UN Water Mediation Unit",
        communityValidated: true,
        regions: ["Middle East", "Jordan River Basin"],
        cultures: ["Arab", "Israeli", "Palestinian"],
        conflictTypes: ["Resource", "Territorial"],
        learningObjectives: [
          "Understand water conflict dynamics",
          "Apply mediation frameworks",
          "Design sustainable solutions",
        ],
        prerequisites: ["Basic conflict resolution knowledge"],
        metadata: {
          tags: ["water", "diplomacy", "middle-east", "mediation"],
          sdgAlignment: ["SDG 6", "SDG 16"],
          peacePillars: ["Conflict Prevention", "Sustainable Development"],
          accessLevel: "public",
        },
      },
      {
        id: "2",
        title: "VR Empathy Training: Colombian Post-Conflict Reconciliation",
        description:
          "Interactive virtual reality experience designed to build empathy between former combatants and communities in post-conflict Colombia.",
        type: "simulation",
        category: "peace_education",
        simulationData: {
          platform: "WebXR",
          duration: "45 minutes",
          scenarios: 5,
          participants: "2-8 people",
        },
        author: "Maria Santos",
        dateCreated: "2023-12-10",
        lastUpdated: "2024-01-18",
        difficulty: "beginner",
        originalLanguage: "es",
        availableLanguages: ["es", "en", "pt"],
        translations: {
          en: {
            title:
              "VR Empathy Training: Colombian Post-Conflict Reconciliation",
            description:
              "Interactive virtual reality experience for building empathy in post-conflict communities",
          },
        },
        views: 892,
        likes: 156,
        comments: 67,
        rating: 4.9,
        aiSummary:
          "Immersive VR training that helps participants understand different perspectives in post-conflict reconciliation processes.",
        keyInsights: [
          "Perspective-taking exercises reduce prejudice and increase empathy",
          "Virtual environments allow safe exploration of difficult conversations",
          "Community-based approaches are more effective than individual training",
        ],
        relatedTopics: [
          "Post-Conflict Recovery",
          "Empathy Building",
          "Virtual Reality",
        ],
        culturalContext:
          "Designed for Colombian context with indigenous, Afro-Colombian, and mestizo perspectives",
        verified: true,
        verifiedBy: "Colombian Ministry of Peace",
        communityValidated: true,
        regions: ["South America", "Colombia"],
        cultures: ["Colombian", "Indigenous", "Afro-Colombian"],
        conflictTypes: ["Post-conflict", "Social"],
        learningObjectives: [
          "Develop empathy for different perspectives",
          "Practice difficult conversations",
          "Build reconciliation skills",
        ],
        completionRate: 87,
        metadata: {
          tags: ["vr", "empathy", "colombia", "reconciliation", "training"],
          sdgAlignment: ["SDG 16", "SDG 10"],
          peacePillars: ["Reconciliation", "Social Cohesion"],
          accessLevel: "verified",
        },
      },
      {
        id: "3",
        title: "Traditional Peace Circles: Elder Wisdom from East Africa",
        description:
          "Documentary series capturing traditional conflict resolution practices from various East African communities, with elder testimonials.",
        type: "video",
        category: "cultural_understanding",
        videoUrl: "https://example.com/peace-circles-video",
        author: "East African Peace Elders Council",
        dateCreated: "2023-11-20",
        lastUpdated: "2024-01-10",
        readTime: 90, // minutes for video
        difficulty: "beginner",
        originalLanguage: "sw",
        availableLanguages: ["sw", "en", "fr", "am"],
        translations: {
          en: {
            title: "Traditional Peace Circles: Elder Wisdom from East Africa",
            description:
              "Documentary capturing traditional conflict resolution from East African communities",
          },
        },
        views: 2156,
        likes: 234,
        comments: 89,
        rating: 4.8,
        aiSummary:
          "Traditional peace-making practices offer valuable insights for modern conflict resolution approaches.",
        keyInsights: [
          "Community involvement is essential for lasting peace",
          "Ritual and ceremony create sacred space for reconciliation",
          "Elders serve as neutral facilitators with moral authority",
        ],
        relatedTopics: [
          "Traditional Justice",
          "Community Mediation",
          "African Philosophy",
        ],
        culturalContext:
          "Features Maasai, Kikuyu, Luo, and other East African traditional practices",
        verified: true,
        verifiedBy: "African Union Peace Council",
        communityValidated: true,
        regions: ["East Africa", "Kenya", "Tanzania", "Uganda"],
        cultures: ["Maasai", "Kikuyu", "Luo", "Kalenjin"],
        conflictTypes: ["Community", "Traditional"],
        learningObjectives: [
          "Understand traditional justice systems",
          "Learn from indigenous wisdom",
          "Apply traditional methods in modern contexts",
        ],
        metadata: {
          tags: ["traditional", "elders", "africa", "peace-circles", "wisdom"],
          sdgAlignment: ["SDG 16", "SDG 11"],
          peacePillars: ["Traditional Justice", "Community Healing"],
          accessLevel: "public",
        },
      },
    ];
    setKnowledgeItems(mockKnowledgeItems);
  }, []);

  const filteredItems = knowledgeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    const matchesLanguage =
      filterLanguage === "all" ||
      item.availableLanguages.includes(filterLanguage);

    return matchesSearch && matchesType && matchesCategory && matchesLanguage;
  });

  const getTypeIcon = (type: string) => {
    const icons = {
      article: <FileText className="h-4 w-4" />,
      video: <Video className="h-4 w-4" />,
      simulation: <Gamepad2 className="h-4 w-4" />,
      treaty: <BookOpen className="h-4 w-4" />,
      case_study: <Target className="h-4 w-4" />,
      cultural_story: <Users className="h-4 w-4" />,
      training_module: <Award className="h-4 w-4" />,
    };
    return (
      icons[type as keyof typeof icons] || <FileText className="h-4 w-4" />
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-100 text-green-800",
      intermediate: "bg-blue-100 text-blue-800",
      advanced: "bg-orange-100 text-orange-800",
      expert: "bg-red-100 text-red-800",
    };
    return colors[difficulty as keyof typeof colors] || colors.beginner;
  };

  const getDisplayContent = (item: KnowledgeItem) => {
    if (
      currentLanguage !== item.originalLanguage &&
      item.translations[currentLanguage]
    ) {
      return item.translations[currentLanguage];
    }
    return {
      title: item.title,
      description: item.description,
      content: item.content,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Peace Knowledgebase
              </h1>
              <p className="text-muted-foreground">
                Global repository of peace wisdom, stories, and learning
                resources
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={currentLanguage}
                onValueChange={setCurrentLanguage}
              >
                <SelectTrigger className="w-[140px]">
                  <Languages className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="sw">Kiswahili</SelectItem>
                </SelectContent>
              </Select>
              <Dialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
              >
                <DialogTrigger asChild>
                  <Button className="peace-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Knowledge
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search knowledge..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="article">Articles</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="simulation">Simulations</SelectItem>
                <SelectItem value="treaty">Treaties</SelectItem>
                <SelectItem value="case_study">Case Studies</SelectItem>
                <SelectItem value="cultural_story">Cultural Stories</SelectItem>
                <SelectItem value="training_module">Training</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="conflict_resolution">
                  Conflict Resolution
                </SelectItem>
                <SelectItem value="cultural_understanding">
                  Cultural Understanding
                </SelectItem>
                <SelectItem value="legal_frameworks">
                  Legal Frameworks
                </SelectItem>
                <SelectItem value="peace_education">Peace Education</SelectItem>
                <SelectItem value="trauma_healing">Trauma Healing</SelectItem>
                <SelectItem value="diplomacy">Diplomacy</SelectItem>
                <SelectItem value="mediation">Mediation</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
              <Button
                variant={viewMode === "library" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("library")}
              >
                <Library className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Knowledge Items Display */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <KnowledgeCard
                key={item.id}
                item={item}
                displayContent={getDisplayContent(item)}
                onView={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <KnowledgeListItem
                key={item.id}
                item={item}
                displayContent={getDisplayContent(item)}
                onView={(item) => setSelectedItem(item)}
              />
            ))}
          </div>
        )}

        {viewMode === "library" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Conflict Resolution
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Cultural Understanding
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Award className="h-4 w-4 mr-2" />
                    Peace Education
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <KnowledgeCard
                    key={item.id}
                    item={item}
                    displayContent={getDisplayContent(item)}
                    onView={(item) => setSelectedItem(item)}
                    compact
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Knowledge Item Details Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <KnowledgeDetails
              item={selectedItem}
              displayContent={getDisplayContent(selectedItem)}
              currentLanguage={currentLanguage}
            />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

// Knowledge Card Component
function KnowledgeCard({
  item,
  displayContent,
  onView,
  compact = false,
}: {
  item: KnowledgeItem;
  displayContent: any;
  onView: (item: KnowledgeItem) => void;
  compact?: boolean;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className={compact ? "pb-2" : "pb-3"}>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle
              className={`${compact ? "text-base" : "text-lg"} line-clamp-2`}
            >
              {displayContent.title}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {getTypeIcon(item.type)}
                <span className="ml-1 capitalize">
                  {item.type.replace("_", " ")}
                </span>
              </Badge>
              <Badge
                className={`text-xs ${getDifficultyColor(item.difficulty)}`}
              >
                {item.difficulty}
              </Badge>
            </div>
          </div>
          {item.verified && (
            <Crown className="h-4 w-4 text-yellow-600 flex-shrink-0" />
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p
          className={`text-sm text-muted-foreground ${compact ? "line-clamp-2" : "line-clamp-3"}`}
        >
          {displayContent.description}
        </p>

        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <span>by {item.author}</span>
          {item.readTime && (
            <>
              <span>•</span>
              <span>{item.readTime}min</span>
            </>
          )}
        </div>

        {!compact && (
          <div className="flex flex-wrap gap-1">
            {item.metadata.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.metadata.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{item.metadata.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{item.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="h-3 w-3" />
              <span>{item.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-current text-yellow-500" />
              <span>{item.rating}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Languages className="h-3 w-3" />
            <span>{item.availableLanguages.length}</span>
          </div>
        </div>

        <Button size="sm" className="w-full" onClick={() => onView(item)}>
          <Eye className="h-4 w-4 mr-2" />
          {item.type === "video"
            ? "Watch"
            : item.type === "simulation"
              ? "Experience"
              : "Read"}
        </Button>
      </CardContent>
    </Card>
  );
}

// Knowledge List Item Component
function KnowledgeListItem({
  item,
  displayContent,
  onView,
}: {
  item: KnowledgeItem;
  displayContent: any;
  onView: (item: KnowledgeItem) => void;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              {getTypeIcon(item.type)}
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  {displayContent.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  by {item.author}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  className={`text-xs ${getDifficultyColor(item.difficulty)}`}
                >
                  {item.difficulty}
                </Badge>
                {item.verified && <Crown className="h-4 w-4 text-yellow-600" />}
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {displayContent.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{item.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-3 w-3" />
                  <span>{item.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-current text-yellow-500" />
                  <span>{item.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Languages className="h-3 w-3" />
                  <span>{item.availableLanguages.length} languages</span>
                </div>
              </div>
              <Button size="sm" onClick={() => onView(item)}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Knowledge Details Component
function KnowledgeDetails({
  item,
  displayContent,
  currentLanguage,
}: {
  item: KnowledgeItem;
  displayContent: any;
  currentLanguage: string;
}) {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-2xl">
              {displayContent.title}
            </DialogTitle>
            <DialogDescription>
              by {item.author} • {item.category.replace("_", " ")} •{" "}
              {new Date(item.dateCreated).toLocaleDateString()}
            </DialogDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getDifficultyColor(item.difficulty)}>
              {item.difficulty}
            </Badge>
            {item.verified && (
              <Badge variant="outline">
                <Crown className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </div>
      </DialogHeader>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="cultural">Cultural Context</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="metadata">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {item.type === "video" && (
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Video player would be integrated here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {item.type === "simulation" && (
            <Card>
              <CardContent className="p-6">
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Gamepad2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Interactive simulation would be embedded here
                    </p>
                    <Button className="mt-4">
                      <Play className="h-4 w-4 mr-2" />
                      Start Simulation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">
                {displayContent.description}
              </p>
              {displayContent.content && (
                <div className="mt-4">
                  <p className="whitespace-pre-wrap">
                    {displayContent.content}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {item.learningObjectives && (
            <Card>
              <CardHeader>
                <CardTitle>Learning Objectives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {item.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.aiSummary}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {item.keyInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-blue-50 rounded"
                  >
                    <Sparkles className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.relatedTopics.map((topic, index) => (
                  <Badge key={index} variant="outline">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cultural" className="space-y-4">
          {item.culturalContext && (
            <Card>
              <CardHeader>
                <CardTitle>Cultural Context</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.culturalContext}</p>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {item.regions.map((region, index) => (
                    <Badge key={index} variant="secondary">
                      {region}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cultures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {item.cultures.map((culture, index) => (
                    <Badge key={index} variant="outline">
                      {culture}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Available Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {item.availableLanguages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-2 border rounded"
                  >
                    <Languages className="h-4 w-4" />
                    <span className="text-sm">{lang}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {item.views}
                </div>
                <p className="text-sm text-muted-foreground">Views</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {item.likes}
                </div>
                <p className="text-sm text-muted-foreground">Likes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {item.comments}
                </div>
                <p className="text-sm text-muted-foreground">Comments</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {item.rating}
                </div>
                <p className="text-sm text-muted-foreground">Rating</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Comments & Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Community discussion interface would be implemented here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Publication Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created:</span>
                  <span>{new Date(item.dateCreated).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated:</span>
                  <span>{new Date(item.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="capitalize">
                    {item.type.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="capitalize">
                    {item.category.replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Access Level:</span>
                  <span className="capitalize">
                    {item.metadata.accessLevel}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verified:</span>
                  <span>{item.verified ? "Yes" : "No"}</span>
                </div>
                {item.verifiedBy && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Verified By:</span>
                    <span>{item.verifiedBy}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Community Validated:
                  </span>
                  <span>{item.communityValidated ? "Yes" : "No"}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>SDG Alignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {item.metadata.sdgAlignment.map((sdg, index) => (
                  <Badge key={index} variant="outline">
                    {sdg}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Peace Pillars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {item.metadata.peacePillars.map((pillar, index) => (
                  <Badge key={index} variant="secondary">
                    {pillar}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getTypeIcon(type: string) {
  const icons = {
    article: <FileText className="h-4 w-4" />,
    video: <Video className="h-4 w-4" />,
    simulation: <Gamepad2 className="h-4 w-4" />,
    treaty: <BookOpen className="h-4 w-4" />,
    case_study: <Target className="h-4 w-4" />,
    cultural_story: <Users className="h-4 w-4" />,
    training_module: <Award className="h-4 w-4" />,
  };
  return icons[type as keyof typeof icons] || <FileText className="h-4 w-4" />;
}

function getDifficultyColor(difficulty: string) {
  const colors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-blue-100 text-blue-800",
    advanced: "bg-orange-100 text-orange-800",
    expert: "bg-red-100 text-red-800",
  };
  return colors[difficulty as keyof typeof colors] || colors.beginner;
}
