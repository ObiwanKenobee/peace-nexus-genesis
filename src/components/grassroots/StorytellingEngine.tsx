import React, { useState, useEffect, useRef } from "react";
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
import { Slider } from "@/components/ui/slider";
import {
  BookOpen,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Edit,
  Save,
  Share2,
  Download,
  Upload,
  Heart,
  Star,
  Users,
  Globe,
  Camera,
  Image,
  Palette,
  Wand2,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Languages,
  FileText,
  Video,
  Headphones,
  Sparkles,
  TreePine,
  Mountain,
  Waves,
  Sun,
  Moon,
  Eye,
  Ear,
  Brain,
  CirclePlay,
  RotateCcw,
} from "lucide-react";

interface StoryTemplate {
  id: string;
  title: string;
  culture: string;
  category:
    | "conflict-resolution"
    | "wisdom"
    | "unity"
    | "justice"
    | "healing"
    | "celebration";
  template: string;
  moralLesson: string;
  culturalContext: string;
  characters: Character[];
  visualElements: VisualElement[];
  audioElements: AudioElement[];
  adaptationPoints: string[];
  ageGroups: string[];
  language: string;
  narrator: string;
  duration: number;
  difficulty: "simple" | "moderate" | "complex";
  useCount: number;
  rating: number;
  keywords: string[];
}

interface Character {
  name: string;
  role: string;
  description: string;
  voiceProfile: string;
  culturalSignificance: string;
  appearanceDescription: string;
}

interface VisualElement {
  type: "illustration" | "pattern" | "symbol" | "landscape" | "object";
  description: string;
  culturalMeaning: string;
  usage: string;
  style: string;
}

interface AudioElement {
  type: "narration" | "music" | "sound-effect" | "ambient";
  description: string;
  timing: string;
  culturalInstruments?: string[];
  language?: string;
}

interface StorySession {
  id: string;
  storyId: string;
  audience: string;
  adaptations: string[];
  feedback: {
    engagement: number;
    understanding: number;
    culturalResonance: number;
    peaceImpact: number;
  };
  duration: number;
  language: string;
  narrator: string;
  date: string;
}

interface AdaptationSuggestion {
  type: "character" | "setting" | "conflict" | "resolution" | "moral";
  suggestion: string;
  reason: string;
  culturalNote: string;
}

const mockStoryTemplates: StoryTemplate[] = [
  {
    id: "1",
    title: "The Wise Elephant and the Two Villages",
    culture: "West African (Akan)",
    category: "conflict-resolution",
    template:
      "Long ago, when the great baobab trees were young, two villages by the river could not agree on {conflict_issue}. The wise elephant, keeper of ancient wisdom, heard their quarrel...",
    moralLesson: "True wisdom listens to all voices before speaking",
    culturalContext:
      "In Akan tradition, elephants represent memory and wisdom. The baobab tree is sacred.",
    characters: [
      {
        name: "Kwaku the Elephant",
        role: "Wise Mediator",
        description:
          "Ancient elephant with golden tusks, keeper of tribal memory",
        voiceProfile: "Deep, resonant, patient Elder voice",
        culturalSignificance: "Represents ancestral wisdom and long memory",
        appearanceDescription:
          "Massive gray elephant with intricate traditional patterns on tusks",
      },
      {
        name: "Chief Kofi",
        role: "Village Leader A",
        description: "Proud chief of the upstream village",
        voiceProfile: "Strong, authoritative, but fair",
        culturalSignificance: "Traditional leadership and responsibility",
        appearanceDescription: "Tall man in kente cloth with golden staff",
      },
    ],
    visualElements: [
      {
        type: "landscape",
        description:
          "River flowing between two traditional villages with thatched roofs",
        culturalMeaning:
          "Water as life source and potential source of conflict",
        usage: "Opening scene setting",
        style: "West African art style with earth tones",
      },
      {
        type: "symbol",
        description: "Sankofa bird symbolizing learning from the past",
        culturalMeaning: "Wisdom comes from understanding history",
        usage: "During wisdom teaching moments",
        style: "Traditional Akan gold weight style",
      },
    ],
    audioElements: [
      {
        type: "music",
        description: "Traditional kora music for scene transitions",
        timing: "Between story sections",
        culturalInstruments: ["Kora", "Djembe", "Balafon"],
      },
      {
        type: "ambient",
        description: "River sounds and village life",
        timing: "Background throughout",
      },
    ],
    adaptationPoints: [
      "Replace river with local water source",
      "Adjust village structure to local architecture",
      "Substitute elephant with locally revered wise animal",
    ],
    ageGroups: ["Children 5-12", "Youth 13-18", "Adults"],
    language: "English",
    narrator: "Elder Ama",
    duration: 15,
    difficulty: "moderate",
    useCount: 247,
    rating: 4.8,
    keywords: [
      "wisdom",
      "water-conflict",
      "mediation",
      "elephant",
      "tradition",
    ],
  },
  {
    id: "2",
    title: "The Mountain That Learned to Bend",
    culture: "Central Asian (Pashtun)",
    category: "unity",
    template:
      "In the high mountains where the snow touches the sky, there lived a proud mountain who would not bend for anyone. When the fierce winds came, the mountain said {mountain_dialogue}...",
    moralLesson:
      "Strength comes from knowing when to stand firm and when to yield",
    culturalContext:
      "Mountains are sacred in Pashtun culture, representing both strength and endurance",
    characters: [
      {
        name: "Tor Ghar (Black Mountain)",
        role: "Proud Mountain",
        description: "Ancient mountain peak, stubborn and proud",
        voiceProfile: "Deep, echoing, slowly learning humility",
        culturalSignificance:
          "Represents Pashtun concepts of honor and strength",
        appearanceDescription: "Towering dark peak with snow-covered summit",
      },
      {
        name: "Naseem (Gentle Breeze)",
        role: "Wise Wind",
        description: "Ancient wind that has seen many seasons",
        voiceProfile: "Flowing, musical, patient teacher",
        culturalSignificance: "Represents wisdom and divine guidance",
        appearanceDescription:
          "Invisible but felt through movement of grass and trees",
      },
    ],
    visualElements: [
      {
        type: "landscape",
        description:
          "Dramatic mountain landscape with traditional stone houses",
        culturalMeaning: "Connection between earth and sky, human and divine",
        usage: "Main setting throughout story",
        style: "Traditional Central Asian miniature painting style",
      },
      {
        type: "pattern",
        description: "Geometric patterns representing harmony and balance",
        culturalMeaning: "Islamic concepts of divine order and balance",
        usage: "During resolution scenes",
        style: "Traditional Islamic geometric art",
      },
    ],
    audioElements: [
      {
        type: "music",
        description: "Traditional rubab and tabla music",
        timing: "Emotional peaks of the story",
        culturalInstruments: ["Rubab", "Tabla", "Ney"],
      },
      {
        type: "sound-effect",
        description: "Mountain wind and avalanche sounds",
        timing: "During conflict scenes",
      },
    ],
    adaptationPoints: [
      "Replace mountain with local geographical feature",
      "Adapt to local weather patterns",
      "Include local architectural elements",
    ],
    ageGroups: ["Youth 13-18", "Adults"],
    language: "Pashto",
    narrator: "Khan Sahib Ahmad",
    duration: 18,
    difficulty: "complex",
    useCount: 156,
    rating: 4.6,
    keywords: ["strength", "flexibility", "honor", "mountain", "wisdom"],
  },
  {
    id: "3",
    title: "The River that Split and Rejoined",
    culture: "Andean (Quechua)",
    category: "healing",
    template:
      "High in the sacred mountains, where Pachamama breathes through the stones, a river faced a great boulder. The water said to the stone, {water_dialogue}...",
    moralLesson:
      "Division can lead to greater strength when paths reunite with purpose",
    culturalContext:
      "Rivers are sacred in Quechua culture, representing life force and community connection",
    characters: [
      {
        name: "Mayu (Sacred River)",
        role: "Life Giver",
        description: "Ancient river carrying the memory of glaciers",
        voiceProfile: "Flowing, melodic, carrying ancient songs",
        culturalSignificance: "Represents life force and community connection",
        appearanceDescription: "Crystal clear water with sparkles of starlight",
      },
      {
        name: "Rumi (Stone)",
        role: "Ancient Obstacle",
        description: "Ancient stone placed by the ancestors",
        voiceProfile: "Steady, grounded, keeper of earth wisdom",
        culturalSignificance: "Connection to Pachamama and ancestral presence",
        appearanceDescription:
          "Large granite boulder with quartz veins and carved symbols",
      },
    ],
    visualElements: [
      {
        type: "landscape",
        description: "Andean highlands with terraced fields and snow peaks",
        culturalMeaning:
          "Harmony between human cultivation and natural environment",
        usage: "Background setting showing community",
        style: "Traditional Andean textile patterns and colors",
      },
      {
        type: "symbol",
        description: "Chakana (Andean cross) representing cosmic order",
        culturalMeaning:
          "Connection between three worlds - upper, middle, lower",
        usage: "During spiritual teaching moments",
        style: "Traditional Inca stonework style",
      },
    ],
    audioElements: [
      {
        type: "music",
        description: "Traditional pan flute and charango melodies",
        timing: "Throughout, building to resolution",
        culturalInstruments: ["Pan flute", "Charango", "Bombo"],
      },
      {
        type: "ambient",
        description: "Mountain wind and flowing water",
        timing: "Continuous background",
      },
    ],
    adaptationPoints: [
      "Adapt to local water sources and geography",
      "Include local spiritual practices",
      "Reference local agricultural practices",
    ],
    ageGroups: ["All ages"],
    language: "Quechua",
    narrator: "Mama Esperanza",
    duration: 12,
    difficulty: "simple",
    useCount: 189,
    rating: 4.9,
    keywords: ["healing", "unity", "water", "pachamama", "community"],
  },
];

export default function StorytellingEngine() {
  const [selectedStory, setSelectedStory] = useState<StoryTemplate | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [adaptationMode, setAdaptationMode] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("library");

  const [customStory, setCustomStory] = useState({
    title: "",
    culture: "",
    category: "conflict-resolution" as const,
    template: "",
    moralLesson: "",
    characters: "",
    setting: "",
    conflict: "",
    resolution: "",
  });

  const playStory = (story: StoryTemplate) => {
    setSelectedStory(story);
    setIsPlaying(true);
    setStoryProgress(0);

    // Simulate story progress
    const progressInterval = setInterval(() => {
      setStoryProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsPlaying(false);
          return 100;
        }
        return prev + 100 / (story.duration * 4); // 4 updates per minute
      });
    }, 250);
  };

  const pauseStory = () => {
    setIsPlaying(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "conflict-resolution":
        return "bg-blue-500";
      case "wisdom":
        return "bg-purple-500";
      case "unity":
        return "bg-green-500";
      case "justice":
        return "bg-orange-500";
      case "healing":
        return "bg-pink-500";
      case "celebration":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "simple":
        return "text-green-600";
      case "moderate":
        return "text-yellow-600";
      case "complex":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Storytelling Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-600" />
            Peace Storytelling Engine
          </h2>
          <p className="text-gray-600">
            Cultural stories for conflict resolution and healing
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Swahili">Kiswahili</SelectItem>
              <SelectItem value="Pashto">پښتو</SelectItem>
              <SelectItem value="Quechua">Runasimi</SelectItem>
              <SelectItem value="Bambara">Bamanankan</SelectItem>
              <SelectItem value="Arabic">العربية</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Story Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Storytelling Configuration</DialogTitle>
                <DialogDescription>
                  Customize story presentation and cultural adaptation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="visual-aids">Visual Illustrations</Label>
                    <Switch id="visual-aids" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="audio-narration">Audio Narration</Label>
                    <Switch id="audio-narration" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cultural-music">Cultural Music</Label>
                    <Switch id="cultural-music" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="interactive-elements">
                      Interactive Elements
                    </Label>
                    <Switch id="interactive-elements" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Narration Speed</Label>
                    <Slider
                      defaultValue={[50]}
                      max={100}
                      step={10}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Slow</span>
                      <span>Normal</span>
                      <span>Fast</span>
                    </div>
                  </div>

                  <div>
                    <Label>Cultural Adaptation Level</Label>
                    <Select defaultValue="high">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">
                          Minimal (Universal themes)
                        </SelectItem>
                        <SelectItem value="moderate">
                          Moderate (Some adaptation)
                        </SelectItem>
                        <SelectItem value="high">
                          High (Full cultural context)
                        </SelectItem>
                        <SelectItem value="expert">
                          Expert (Deep cultural immersion)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Target Audience</Label>
                    <Select defaultValue="mixed">
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="children">
                          Children (5-12)
                        </SelectItem>
                        <SelectItem value="youth">Youth (13-18)</SelectItem>
                        <SelectItem value="adults">Adults (18+)</SelectItem>
                        <SelectItem value="elders">Elders (65+)</SelectItem>
                        <SelectItem value="mixed">Mixed Age Group</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Story Engine Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {mockStoryTemplates.length}
            </div>
            <p className="text-xs text-gray-600">Story Templates</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">23</div>
            <p className="text-xs text-gray-600">Cultures</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">67</div>
            <p className="text-xs text-gray-600">Narrators</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">592</div>
            <p className="text-xs text-gray-600">Adaptations</p>
          </CardContent>
        </Card>
        <Card className="border-teal-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-teal-600">15</div>
            <p className="text-xs text-gray-600">Languages</p>
          </CardContent>
        </Card>
        <Card className="border-pink-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">4.7★</div>
            <p className="text-xs text-gray-600">Avg. Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Storytelling Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="library" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Story Library
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Create
          </TabsTrigger>
          <TabsTrigger value="adapt" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Adapt
          </TabsTrigger>
          <TabsTrigger value="record" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Record
          </TabsTrigger>
          <TabsTrigger value="sessions" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Sessions
          </TabsTrigger>
        </TabsList>

        {/* Story Library Tab */}
        <TabsContent value="library" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Cultural Story Collection</CardTitle>
                <CardDescription>
                  Traditional stories adapted for peace-building
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStoryTemplates.map((story) => (
                    <div
                      key={story.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{story.title}</h4>
                            <Badge
                              className={`text-white ${getCategoryColor(story.category)}`}
                            >
                              {story.category}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={getDifficultyColor(story.difficulty)}
                            >
                              {story.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {story.culture}
                          </p>
                          <p className="text-sm italic text-green-700 mb-3">
                            "{story.moralLesson}"
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{story.rating}</span>
                        </div>
                      </div>

                      <div className="text-sm bg-gray-50 p-3 rounded border">
                        <p className="font-medium mb-1">Story Opening:</p>
                        <p className="italic">
                          {story.template.substring(0, 120)}...
                        </p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="font-medium">Duration:</span>{" "}
                          {story.duration}min
                        </div>
                        <div>
                          <span className="font-medium">Language:</span>{" "}
                          {story.language}
                        </div>
                        <div>
                          <span className="font-medium">Uses:</span>{" "}
                          {story.useCount}
                        </div>
                        <div>
                          <span className="font-medium">Ages:</span>{" "}
                          {story.ageGroups[0]}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium mb-2">
                          Main Characters:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {story.characters
                            .slice(0, 3)
                            .map((character, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {character.name}
                              </Badge>
                            ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium mb-2">Keywords:</p>
                        <div className="flex flex-wrap gap-1">
                          {story.keywords.map((keyword, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => playStory(story)}
                          disabled={isPlaying && selectedStory?.id === story.id}
                        >
                          {isPlaying && selectedStory?.id === story.id ? (
                            <>
                              <Pause className="h-3 w-3 mr-1" />
                              Playing
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3 mr-1" />
                              Tell Story
                            </>
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline">
                          <Wand2 className="h-3 w-3 mr-1" />
                          Adapt
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Story Player & Details */}
            <div className="space-y-6">
              {selectedStory && isPlaying ? (
                <Card className="border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700">
                      <CirclePlay className="h-5 w-5" />
                      Now Playing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium">{selectedStory.title}</h4>
                      <p className="text-sm text-gray-600">
                        {selectedStory.culture}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(storyProgress)}%</span>
                      </div>
                      <Progress value={storyProgress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0:00</span>
                        <span>{selectedStory.duration}:00</span>
                      </div>
                    </div>

                    <div className="text-sm p-3 bg-blue-50 rounded border border-blue-200">
                      <p className="font-medium mb-1">Current Narrator:</p>
                      <p>{selectedStory.narrator}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium">Cultural Context:</p>
                      <p className="text-xs text-gray-600">
                        {selectedStory.culturalContext}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" onClick={pauseStory}>
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </Button>
                      <Button size="sm" variant="outline">
                        <Volume2 className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Ready to Share Stories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="text-4xl">📚</div>
                      <p className="text-sm text-gray-600">
                        Select a story from the library to begin sharing wisdom
                        with your community
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>Audio System:</span>
                          <span className="text-green-600">Ready</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Visual Aids:</span>
                          <span className="text-green-600">Loaded</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Language:</span>
                          <span className="text-blue-600">
                            {currentLanguage}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI Story Suggestions
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    <Languages className="h-4 w-4 mr-2" />
                    Translate Story
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    Record Narration
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Add Illustrations
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Share with Community
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Create Story Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Create New Story
                </CardTitle>
                <CardDescription>
                  Build culturally meaningful peace stories
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Story Title</Label>
                    <Input
                      placeholder="Enter story title..."
                      value={customStory.title}
                      onChange={(e) =>
                        setCustomStory((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Cultural Origin</Label>
                    <Input
                      placeholder="e.g., West African (Yoruba)"
                      value={customStory.culture}
                      onChange={(e) =>
                        setCustomStory((prev) => ({
                          ...prev,
                          culture: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Story Category</Label>
                  <Select
                    value={customStory.category}
                    onValueChange={(value: any) =>
                      setCustomStory((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conflict-resolution">
                        Conflict Resolution
                      </SelectItem>
                      <SelectItem value="wisdom">Wisdom Teaching</SelectItem>
                      <SelectItem value="unity">Community Unity</SelectItem>
                      <SelectItem value="justice">
                        Justice & Fairness
                      </SelectItem>
                      <SelectItem value="healing">
                        Healing & Reconciliation
                      </SelectItem>
                      <SelectItem value="celebration">
                        Celebration & Joy
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Story Template</Label>
                  <Textarea
                    placeholder="Long ago, in a village where {conflict_situation} arose..."
                    className="min-h-24"
                    value={customStory.template}
                    onChange={(e) =>
                      setCustomStory((prev) => ({
                        ...prev,
                        template: e.target.value,
                      }))
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use {"{placeholders}"} for customizable elements
                  </p>
                </div>

                <div>
                  <Label>Moral Lesson</Label>
                  <Input
                    placeholder="The key teaching from this story..."
                    value={customStory.moralLesson}
                    onChange={(e) =>
                      setCustomStory((prev) => ({
                        ...prev,
                        moralLesson: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label>Main Characters</Label>
                  <Textarea
                    placeholder="Describe the key characters and their roles..."
                    className="min-h-20"
                    value={customStory.characters}
                    onChange={(e) =>
                      setCustomStory((prev) => ({
                        ...prev,
                        characters: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Setting</Label>
                    <Textarea
                      placeholder="Where does the story take place?"
                      className="min-h-16"
                      value={customStory.setting}
                      onChange={(e) =>
                        setCustomStory((prev) => ({
                          ...prev,
                          setting: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label>Central Conflict</Label>
                    <Textarea
                      placeholder="What problem needs resolution?"
                      className="min-h-16"
                      value={customStory.conflict}
                      onChange={(e) =>
                        setCustomStory((prev) => ({
                          ...prev,
                          conflict: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Resolution</Label>
                  <Textarea
                    placeholder="How is the conflict resolved peacefully?"
                    className="min-h-20"
                    value={customStory.resolution}
                    onChange={(e) =>
                      setCustomStory((prev) => ({
                        ...prev,
                        resolution: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Story
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Story Building Assistance</CardTitle>
                <CardDescription>
                  AI-powered guidance for effective storytelling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">
                      Cultural Authenticity
                    </h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>Research cultural context</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span>Avoid cultural appropriation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-600" />
                        <span>Honor traditional wisdom</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">
                      Peace-Building Elements
                    </h4>
                    <div className="space-y-1 text-sm text-green-700">
                      <p>• Include diverse perspectives</p>
                      <p>• Show empathy and understanding</p>
                      <p>• Demonstrate conflict transformation</p>
                      <p>• Celebrate shared humanity</p>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-900 mb-2">
                      Story Structure Tips
                    </h4>
                    <div className="space-y-1 text-sm text-purple-700">
                      <p>• Begin with familiar setting</p>
                      <p>• Introduce relatable characters</p>
                      <p>• Present clear conflict</p>
                      <p>• Show wisdom in action</p>
                      <p>• End with hope and lesson</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">
                    Suggested Story Templates
                  </h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                    >
                      <TreePine className="h-4 w-4 mr-2" />
                      Animal Wisdom Stories
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                    >
                      <Mountain className="h-4 w-4 mr-2" />
                      Natural Elements Teaching
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Community Challenge Stories
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-sm"
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Ancestor Wisdom Tales
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Adaptation Tab */}
        <TabsContent value="adapt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Cultural Story Adaptation
              </CardTitle>
              <CardDescription>
                Modify existing stories for different cultural contexts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Source Story</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select story to adapt" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockStoryTemplates.map((story) => (
                          <SelectItem key={story.id} value={story.id}>
                            {story.title} ({story.culture})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Target Culture</Label>
                    <Input placeholder="e.g., East African (Maasai)" />
                  </div>

                  <div>
                    <Label>Local Context</Label>
                    <Textarea
                      placeholder="Describe the local setting, customs, and challenges..."
                      className="min-h-24"
                    />
                  </div>

                  <div>
                    <Label>Specific Adaptations Needed</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Switch id="characters" />
                        <Label htmlFor="characters">Adapt characters</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="setting" />
                        <Label htmlFor="setting">Change setting</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="animals" />
                        <Label htmlFor="animals">Use local animals</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch id="customs" />
                        <Label htmlFor="customs">Include local customs</Label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Adaptation
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Adaptation Preview</h4>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-600 italic">
                      Select a source story and target culture to see the
                      adapted version here.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium text-sm">Suggested Changes:</h5>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-blue-50 rounded border border-blue-200">
                        <span className="font-medium">Setting:</span> Replace
                        river with local water source
                      </div>
                      <div className="p-2 bg-green-50 rounded border border-green-200">
                        <span className="font-medium">Characters:</span> Use
                        locally respected animals
                      </div>
                      <div className="p-2 bg-purple-50 rounded border border-purple-200">
                        <span className="font-medium">Customs:</span> Include
                        traditional greetings
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Save className="h-3 w-3 mr-1" />
                      Save Adaptation
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-3 w-3 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recording Tab */}
        <TabsContent value="record" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Story Recording Studio
                </CardTitle>
                <CardDescription>
                  Record narrations for your stories
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Button
                    size="lg"
                    variant={isRecording ? "destructive" : "default"}
                    onClick={() => setIsRecording(!isRecording)}
                    className="w-32 h-32 rounded-full text-lg"
                  >
                    {isRecording ? (
                      <div className="flex flex-col items-center">
                        <MicOff className="h-8 w-8 mb-2" />
                        <span>Stop</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Mic className="h-8 w-8 mb-2" />
                        <span>Record</span>
                      </div>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Story to Record</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a story" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockStoryTemplates.map((story) => (
                          <SelectItem key={story.id} value={story.id}>
                            {story.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Narration Language</Label>
                    <Select
                      value={currentLanguage}
                      onValueChange={setCurrentLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Swahili">Kiswahili</SelectItem>
                        <SelectItem value="Pashto">پښتو</SelectItem>
                        <SelectItem value="Quechua">Runasimi</SelectItem>
                        <SelectItem value="Bambara">Bamanankan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Recording Quality</Label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">Studio Quality</SelectItem>
                        <SelectItem value="high">High Quality</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="mobile">Mobile Quality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {isRecording && (
                  <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-center gap-2 text-red-600">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="font-medium">
                        Recording in {currentLanguage}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-mono">2:34</div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Audio Level</span>
                        <span>Good</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recording Library</CardTitle>
                <CardDescription>Manage your story narrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "The Wise Elephant",
                      narrator: "Elder Amina",
                      duration: "12:34",
                      language: "Swahili",
                      quality: "Studio",
                    },
                    {
                      title: "Mountain That Learned",
                      narrator: "Khan Sahib",
                      duration: "15:22",
                      language: "Pashto",
                      quality: "High",
                    },
                    {
                      title: "River Rejoined",
                      narrator: "Mama Esperanza",
                      duration: "9:45",
                      language: "Quechua",
                      quality: "Studio",
                    },
                  ].map((recording, idx) => (
                    <div key={idx} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-sm">
                          {recording.title}
                        </h5>
                        <Badge variant="outline" className="text-xs">
                          {recording.quality}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        <p>Narrator: {recording.narrator}</p>
                        <p>
                          Duration: {recording.duration} • {recording.language}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          <Play className="h-3 w-3 mr-1" />
                          Play
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sessions Tab */}
        <TabsContent value="sessions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Storytelling Sessions
              </CardTitle>
              <CardDescription>
                Track community storytelling impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "2024-01-22",
                    story: "The Wise Elephant",
                    audience: "Village Council",
                    duration: "25 min",
                    feedback: {
                      engagement: 94,
                      understanding: 89,
                      culturalResonance: 96,
                      peaceImpact: 91,
                    },
                    outcome: "Water dispute successfully mediated",
                  },
                  {
                    date: "2024-01-20",
                    story: "Mountain That Learned",
                    audience: "Youth Group",
                    duration: "18 min",
                    feedback: {
                      engagement: 87,
                      understanding: 82,
                      culturalResonance: 79,
                      peaceImpact: 85,
                    },
                    outcome: "Increased dialogue between generations",
                  },
                  {
                    date: "2024-01-18",
                    story: "River Rejoined",
                    audience: "Women's Circle",
                    duration: "15 min",
                    feedback: {
                      engagement: 98,
                      understanding: 95,
                      culturalResonance: 93,
                      peaceImpact: 97,
                    },
                    outcome: "Community healing circle established",
                  },
                ].map((session, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{session.story}</h4>
                        <p className="text-sm text-gray-600">
                          {session.audience} • {session.date}
                        </p>
                      </div>
                      <Badge variant="outline">{session.duration}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          {session.feedback.engagement}%
                        </div>
                        <p className="text-xs text-gray-600">Engagement</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">
                          {session.feedback.understanding}%
                        </div>
                        <p className="text-xs text-gray-600">Understanding</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          {session.feedback.culturalResonance}%
                        </div>
                        <p className="text-xs text-gray-600">
                          Cultural Resonance
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">
                          {session.feedback.peaceImpact}%
                        </div>
                        <p className="text-xs text-gray-600">Peace Impact</p>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded border border-green-200">
                      <p className="text-sm">
                        <span className="font-medium">Outcome:</span>{" "}
                        {session.outcome}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
