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
import {
  Languages,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Download,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Globe,
  FileText,
  Image,
  Video,
  BookOpen,
  Users,
  Heart,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  Target,
  Edit,
  Save,
  Share2,
  Copy,
  Smartphone,
  Headphones,
  Camera,
  Type,
  Palette,
  Map,
  Calendar,
} from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  rtl: boolean;
  speakers: number;
  completeness: number;
  voiceSupport: boolean;
  keyboardLayout?: string;
  culturalElements: string[];
  scripts: string[];
}

interface VoiceProfile {
  id: string;
  language: string;
  speaker: string;
  age: string;
  gender: string;
  region: string;
  quality: "studio" | "field" | "mobile";
  culturalContext: string;
  sampleUrl: string;
  useCount: number;
}

interface Translation {
  id: string;
  sourceText: string;
  sourceLanguage: string;
  targetLanguage: string;
  translatedText: string;
  confidence: number;
  culturalAdaptation: string;
  context: string;
  reviewer?: string;
  status: "draft" | "reviewed" | "approved" | "published";
  voiceNarration?: string;
}

interface CulturalAsset {
  id: string;
  type: "icon" | "pattern" | "color-scheme" | "gesture" | "symbol";
  name: string;
  culture: string;
  description: string;
  usage: string;
  imageUrl: string;
  tags: string[];
  respectfulUse: string[];
  avoidances: string[];
}

const supportedLanguages: Language[] = [
  {
    code: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
    rtl: false,
    speakers: 200000000,
    completeness: 92,
    voiceSupport: true,
    keyboardLayout: "QWERTY",
    culturalElements: [
      "Ubuntu Philosophy",
      "Harambee Spirit",
      "Oral Tradition",
    ],
    scripts: ["Latin"],
  },
  {
    code: "ps",
    name: "Pashto",
    nativeName: "پښتو",
    rtl: true,
    speakers: 60000000,
    completeness: 85,
    voiceSupport: true,
    keyboardLayout: "Pashto",
    culturalElements: ["Pashtunwali Code", "Honor System", "Tribal Council"],
    scripts: ["Arabic", "Pashto"],
  },
  {
    code: "bm",
    name: "Bambara",
    nativeName: "Bamanankan",
    rtl: false,
    speakers: 14000000,
    completeness: 78,
    voiceSupport: true,
    keyboardLayout: "QWERTY",
    culturalElements: [
      "Griot Tradition",
      "Community Wisdom",
      "Ancestral Respect",
    ],
    scripts: ["Latin", "N'Ko"],
  },
  {
    code: "qu",
    name: "Quechua",
    nativeName: "Runasimi",
    rtl: false,
    speakers: 8000000,
    completeness: 73,
    voiceSupport: true,
    keyboardLayout: "QWERTY",
    culturalElements: [
      "Ayni Reciprocity",
      "Pachamama Connection",
      "Ayllu Community",
    ],
    scripts: ["Latin"],
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    rtl: true,
    speakers: 400000000,
    completeness: 96,
    voiceSupport: true,
    keyboardLayout: "Arabic",
    culturalElements: ["Islamic Values", "Hospitality", "Poetry Tradition"],
    scripts: ["Arabic"],
  },
  {
    code: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
    rtl: false,
    speakers: 32000000,
    completeness: 69,
    voiceSupport: true,
    keyboardLayout: "Amharic",
    culturalElements: [
      "Ethiopian Christianity",
      "Coffee Ceremony",
      "Community Elders",
    ],
    scripts: ["Ge'ez"],
  },
];

const mockVoiceProfiles: VoiceProfile[] = [
  {
    id: "1",
    language: "Swahili",
    speaker: "Mama Amina",
    age: "45",
    gender: "Female",
    region: "Coastal Kenya",
    quality: "studio",
    culturalContext: "Community elder and peace mediator",
    sampleUrl: "/audio/swahili-mama-amina.mp3",
    useCount: 342,
  },
  {
    id: "2",
    language: "Pashto",
    speaker: "Khan Sahib",
    age: "55",
    gender: "Male",
    region: "Kandahar",
    quality: "field",
    culturalContext: "Traditional tribal mediator",
    sampleUrl: "/audio/pashto-khan-sahib.mp3",
    useCount: 187,
  },
  {
    id: "3",
    language: "Bambara",
    speaker: "Griot Mamadou",
    age: "38",
    gender: "Male",
    region: "Mali",
    quality: "studio",
    culturalContext: "Traditional storyteller and historian",
    sampleUrl: "/audio/bambara-griot-mamadou.mp3",
    useCount: 256,
  },
];

const mockCulturalAssets: CulturalAsset[] = [
  {
    id: "1",
    type: "symbol",
    name: "Sankofa Bird",
    culture: "Akan (Ghana)",
    description: "Symbol representing learning from the past to move forward",
    usage: "Used in peace and reconciliation contexts",
    imageUrl: "/cultural/sankofa-bird.svg",
    tags: ["wisdom", "learning", "progress", "reflection"],
    respectfulUse: [
      "Education materials",
      "Reconciliation ceremonies",
      "Progress tracking",
    ],
    avoidances: [
      "Commercial branding",
      "Political campaigns",
      "Casual decoration",
    ],
  },
  {
    id: "2",
    type: "pattern",
    name: "Islamic Geometric",
    culture: "Islamic",
    description: "Sacred geometric patterns representing unity and harmony",
    usage: "Backgrounds for Islamic community dialogues",
    imageUrl: "/cultural/islamic-geometric.svg",
    tags: ["unity", "harmony", "sacred", "mathematics"],
    respectfulUse: [
      "Religious contexts",
      "Peace dialogues",
      "Educational materials",
    ],
    avoidances: [
      "Secular advertising",
      "Inappropriate contexts",
      "Distorted usage",
    ],
  },
  {
    id: "3",
    type: "color-scheme",
    name: "Andean Earth Tones",
    culture: "Quechua/Aymara",
    description: "Natural earth colors reflecting connection to Pachamama",
    usage: "Interface themes for indigenous communities",
    imageUrl: "/cultural/andean-colors.jpg",
    tags: ["earth", "nature", "sacred", "harmony"],
    respectfulUse: [
      "Environmental themes",
      "Community apps",
      "Educational content",
    ],
    avoidances: [
      "Mining company materials",
      "Extractive industry",
      "Urban contexts",
    ],
  },
];

export default function LocalizationToolkit() {
  const [selectedLanguage, setSelectedLanguage] = useState("sw");
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [activeTab, setActiveTab] = useState("translate");
  const [voiceSettings, setVoiceSettings] = useState({
    autoDetect: true,
    culturalContext: true,
    genderPreference: "any",
    regionPreference: "any",
    qualityPreference: "studio",
  });

  const recordingRef = useRef<NodeJS.Timeout | null>(null);

  const currentLanguage = supportedLanguages.find(
    (lang) => lang.code === selectedLanguage,
  );

  const startRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    recordingRef.current = setInterval(() => {
      setRecordingDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingRef.current) {
      clearInterval(recordingRef.current);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      if (recordingRef.current) {
        clearInterval(recordingRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Localization Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Languages className="h-6 w-6 text-blue-600" />
            Localization & Voice Toolkit
          </h2>
          <p className="text-gray-600">
            Multi-language support with cultural adaptation
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {supportedLanguages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center gap-2">
                    <span>{lang.name}</span>
                    <span className="text-sm text-gray-500">
                      ({lang.nativeName})
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Voice Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Voice Input & Output Configuration</DialogTitle>
                <DialogDescription>
                  Configure voice recognition and synthesis for non-literate
                  users
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-detect">Auto-detect Language</Label>
                    <Switch
                      id="auto-detect"
                      checked={voiceSettings.autoDetect}
                      onCheckedChange={(checked) =>
                        setVoiceSettings((prev) => ({
                          ...prev,
                          autoDetect: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cultural-context">Cultural Context</Label>
                    <Switch
                      id="cultural-context"
                      checked={voiceSettings.culturalContext}
                      onCheckedChange={(checked) =>
                        setVoiceSettings((prev) => ({
                          ...prev,
                          culturalContext: checked,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Voice Gender Preference</Label>
                    <Select
                      value={voiceSettings.genderPreference}
                      onValueChange={(value) =>
                        setVoiceSettings((prev) => ({
                          ...prev,
                          genderPreference: value,
                        }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Gender</SelectItem>
                        <SelectItem value="male">Male Voices</SelectItem>
                        <SelectItem value="female">Female Voices</SelectItem>
                        <SelectItem value="elder">Elder Voices</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Regional Preference</Label>
                    <Select
                      value={voiceSettings.regionPreference}
                      onValueChange={(value) =>
                        setVoiceSettings((prev) => ({
                          ...prev,
                          regionPreference: value,
                        }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Region</SelectItem>
                        <SelectItem value="urban">Urban Areas</SelectItem>
                        <SelectItem value="rural">Rural Communities</SelectItem>
                        <SelectItem value="traditional">
                          Traditional Speakers
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Audio Quality</Label>
                    <Select
                      value={voiceSettings.qualityPreference}
                      onValueChange={(value) =>
                        setVoiceSettings((prev) => ({
                          ...prev,
                          qualityPreference: value,
                        }))
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="studio">
                          Studio Quality (Best)
                        </SelectItem>
                        <SelectItem value="field">Field Recording</SelectItem>
                        <SelectItem value="mobile">Mobile Quality</SelectItem>
                        <SelectItem value="any">Any Quality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Language Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {supportedLanguages.length}
            </div>
            <p className="text-xs text-gray-600">Languages</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {currentLanguage?.completeness}%
            </div>
            <p className="text-xs text-gray-600">Complete</p>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {mockVoiceProfiles.length}
            </div>
            <p className="text-xs text-gray-600">Voice Profiles</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {mockCulturalAssets.length}
            </div>
            <p className="text-xs text-gray-600">Cultural Assets</p>
          </CardContent>
        </Card>
        <Card className="border-teal-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm font-bold text-teal-600">
              {currentLanguage?.speakers.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Speakers</p>
          </CardContent>
        </Card>
        <Card className="border-pink-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">
              {currentLanguage?.scripts.length}
            </div>
            <p className="text-xs text-gray-600">Scripts</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Toolkit Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="translate" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Translate
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            Voice Input
          </TabsTrigger>
          <TabsTrigger value="cultural" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Cultural UI
          </TabsTrigger>
          <TabsTrigger value="keyboards" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Keyboards
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Assets
          </TabsTrigger>
        </TabsList>

        {/* Translation Tab */}
        <TabsContent value="translate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Text Translation</CardTitle>
                <CardDescription>
                  Culturally-aware translation with context preservation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Source Text</Label>
                  <Textarea
                    placeholder="Enter text to translate..."
                    className="min-h-24"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>From</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="sw">Swahili</SelectItem>
                        <SelectItem value="ps">Pashto</SelectItem>
                        <SelectItem value="bm">Bambara</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>To</Label>
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {supportedLanguages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cultural Context</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select context" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal Mediation</SelectItem>
                      <SelectItem value="community">
                        Community Dialogue
                      </SelectItem>
                      <SelectItem value="family">
                        Family Conversation
                      </SelectItem>
                      <SelectItem value="religious">
                        Religious Context
                      </SelectItem>
                      <SelectItem value="educational">
                        Educational Material
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Languages className="h-4 w-4 mr-2" />
                  Translate
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Translation Results</CardTitle>
                <CardDescription>
                  Culturally adapted output with confidence scores
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="p-4 bg-gray-50 rounded-lg border"
                  dir={currentLanguage?.rtl ? "rtl" : "ltr"}
                >
                  <p className="font-medium text-sm mb-2">Translated Text:</p>
                  <p
                    className="text-lg"
                    style={{
                      fontFamily: currentLanguage?.rtl ? "Arabic" : "inherit",
                    }}
                  >
                    {currentLanguage?.rtl
                      ? "مرحبا بكم في دائرة السلام"
                      : "Karibu kwenye duara la amani"}
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Translation Confidence</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cultural Accuracy</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cultural Notes</Label>
                  <div className="text-sm p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p>
                      In {currentLanguage?.name} culture, greetings emphasize
                      community welcome and respect for elders.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Volume2 className="h-4 w-4 mr-1" />
                    Listen
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Voice Input Tab */}
        <TabsContent value="voice" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Voice Input & Recognition
                </CardTitle>
                <CardDescription>
                  Multi-language voice input for non-literate users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Button
                    size="lg"
                    variant={isRecording ? "destructive" : "default"}
                    onClick={isRecording ? stopRecording : startRecording}
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

                {isRecording && (
                  <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center justify-center gap-2 text-red-600">
                      <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="font-medium">
                        Recording in {currentLanguage?.name}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-mono">
                        {formatDuration(recordingDuration)}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Audio Level</span>
                        <span>Good Quality</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Label>Real-time Transcription</Label>
                  <div
                    className="p-4 bg-gray-50 rounded-lg border min-h-24"
                    dir={currentLanguage?.rtl ? "rtl" : "ltr"}
                  >
                    {isRecording ? (
                      <p className="text-gray-600 italic">Listening...</p>
                    ) : (
                      <p>Click record to start voice input</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Input Language</Label>
                    <Select
                      value={selectedLanguage}
                      onValueChange={setSelectedLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {supportedLanguages
                          .filter((lang) => lang.voiceSupport)
                          .map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Output Format</Label>
                    <Select defaultValue="text">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text Only</SelectItem>
                        <SelectItem value="audio">Audio + Text</SelectItem>
                        <SelectItem value="translation">
                          Auto-translate
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voice Profiles</CardTitle>
                <CardDescription>
                  Cultural voice personalities for text-to-speech
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {mockVoiceProfiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{profile.speaker}</h4>
                            <p className="text-sm text-gray-600">
                              {profile.language} • {profile.region}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {profile.quality}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Play className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-700">
                          {profile.culturalContext}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span>
                            {profile.age}, {profile.gender}
                          </span>
                          <span className="text-gray-500">
                            {profile.useCount} uses
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cultural UI Tab */}
        <TabsContent value="cultural" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Cultural UI Adaptation
                </CardTitle>
                <CardDescription>
                  Culturally appropriate interface elements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Current Language: {currentLanguage?.name}</Label>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Reading Direction:</span>
                        <div className="text-blue-600">
                          {currentLanguage?.rtl
                            ? "Right-to-Left"
                            : "Left-to-Right"}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Scripts:</span>
                        <div className="text-green-600">
                          {currentLanguage?.scripts.join(", ")}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Keyboard:</span>
                        <div className="text-purple-600">
                          {currentLanguage?.keyboardLayout}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Voice Support:</span>
                        <div
                          className={
                            currentLanguage?.voiceSupport
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {currentLanguage?.voiceSupport
                            ? "Available"
                            : "Limited"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Cultural Elements</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentLanguage?.culturalElements.map((element, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {element}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>UI Customization</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">
                        Use cultural color schemes
                      </span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Show cultural icons</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Adapt layout for RTL</span>
                      <Switch checked={currentLanguage?.rtl} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable voice navigation</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Button className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Apply Cultural Theme
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cultural Assets Library</CardTitle>
                <CardDescription>
                  Respectful cultural symbols and patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCulturalAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{asset.name}</h4>
                          <p className="text-sm text-gray-600">
                            {asset.culture}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {asset.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-700">
                        {asset.description}
                      </p>
                      <div>
                        <p className="text-xs font-medium text-green-700 mb-1">
                          Respectful Use:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {asset.respectfulUse.slice(0, 2).map((use, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs text-green-600"
                            >
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-red-700 mb-1">
                          Avoid:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {asset.avoidances.slice(0, 2).map((avoid, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs text-red-600"
                            >
                              {avoid}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Use
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          Guidelines
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Virtual Keyboards Tab */}
        <TabsContent value="keyboards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Virtual Keyboard Layouts
              </CardTitle>
              <CardDescription>
                Multi-script input support for all cultures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {supportedLanguages.map((lang) => (
                  <div
                    key={lang.code}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{lang.name}</h4>
                      <Badge
                        variant={
                          lang.code === selectedLanguage ? "default" : "outline"
                        }
                      >
                        {lang.completeness}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{lang.nativeName}</p>
                    <div className="text-xs space-y-1">
                      <div>Layout: {lang.keyboardLayout}</div>
                      <div>Scripts: {lang.scripts.join(", ")}</div>
                      <div
                        className={lang.rtl ? "text-blue-600" : "text-gray-500"}
                      >
                        {lang.rtl ? "Right-to-Left" : "Left-to-Right"}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={
                        lang.code === selectedLanguage ? "default" : "outline"
                      }
                      className="w-full"
                      onClick={() => setSelectedLanguage(lang.code)}
                    >
                      {lang.code === selectedLanguage ? "Active" : "Activate"}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-3">
                  Virtual Keyboard Preview - {currentLanguage?.name}
                </h4>
                <div
                  className="bg-white p-4 rounded border"
                  dir={currentLanguage?.rtl ? "rtl" : "ltr"}
                >
                  <Input
                    placeholder={`Type in ${currentLanguage?.name}...`}
                    className={
                      currentLanguage?.rtl ? "text-right" : "text-left"
                    }
                  />
                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      Sample text:{" "}
                      {currentLanguage?.rtl ? "مرحبا بالعالم" : "Hello World"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assets Tab */}
        <TabsContent value="assets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Localized Asset Management
              </CardTitle>
              <CardDescription>
                Upload and manage culturally appropriate media assets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center gap-2"
                >
                  <Image className="h-6 w-6" />
                  <span className="text-sm">Upload Images</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center gap-2"
                >
                  <Volume2 className="h-6 w-6" />
                  <span className="text-sm">Audio Files</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center gap-2"
                >
                  <Video className="h-6 w-6" />
                  <span className="text-sm">Video Content</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center gap-2"
                >
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Text Templates</span>
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recent Uploads by Language</h4>
                <div className="space-y-3">
                  {supportedLanguages.slice(0, 3).map((lang) => (
                    <div
                      key={lang.code}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <Languages className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">{lang.name}</h5>
                          <p className="text-xs text-gray-600">
                            {Math.floor(Math.random() * 50) + 10} assets
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={lang.completeness}
                          className="w-16 h-2"
                        />
                        <span className="text-xs">{lang.completeness}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
