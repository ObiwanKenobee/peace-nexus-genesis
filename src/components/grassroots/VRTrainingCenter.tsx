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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Headphones,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Target,
  Heart,
  Brain,
  Eye,
  Ear,
  Users,
  Globe,
  Star,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Monitor,
  Smartphone,
  Gamepad2,
  Zap,
  TrendingUp,
  Award,
  BookOpen,
  Camera,
  Mic,
  Video,
} from "lucide-react";

interface VRScenario {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  cultures: string[];
  skills: string[];
  completionRate: number;
  empathyScore: number;
  language: string;
  category:
    | "conflict-resolution"
    | "cultural-bridge"
    | "active-listening"
    | "empathy-building";
  prerequisites?: string[];
  learningObjectives: string[];
  immersionLevel: number;
  emotionalIntensity: "low" | "medium" | "high";
  participantCount: number;
  aiPersonalities: string[];
}

interface TrainingSession {
  id: string;
  scenarioId: string;
  userId: string;
  startTime: string;
  duration: number;
  completionStatus: "in-progress" | "completed" | "paused" | "failed";
  empathyMeasurements: {
    timestamp: number;
    score: number;
    trigger: string;
  }[];
  decisionPoints: {
    situation: string;
    userChoice: string;
    outcome: string;
    culturalAccuracy: number;
  }[];
  biometricData?: {
    heartRate: number[];
    stressLevel: number[];
    engagementLevel: number[];
  };
}

interface CulturalPersona {
  id: string;
  name: string;
  culture: string;
  background: string;
  values: string[];
  communicationStyle: string;
  triggers: string[];
  peacePhilosophy: string;
  avatar: string;
  voiceProfile: string;
}

const mockVRScenarios: VRScenario[] = [
  {
    id: "1",
    title: "The Village Water Council",
    description:
      "Mediate a water sharing dispute between traditional farmers and modern agriculture in a West African village",
    duration: 35,
    difficulty: "intermediate",
    cultures: ["Akan", "Fulani", "Hausa"],
    skills: ["Active Listening", "Cultural Sensitivity", "Resource Mediation"],
    completionRate: 78,
    empathyScore: 89,
    language: "English",
    category: "conflict-resolution",
    learningObjectives: [
      "Understand traditional water rights customs",
      "Navigate generational perspectives on agriculture",
      "Apply culturally appropriate conflict resolution",
    ],
    immersionLevel: 95,
    emotionalIntensity: "medium",
    participantCount: 12,
    aiPersonalities: ["Elder Kofi", "Young Farmer Adama", "Herder Ibrahim"],
  },
  {
    id: "2",
    title: "Family Honor and Change",
    description:
      "Navigate a family dispute in Afghanistan where traditional values meet modern aspirations",
    duration: 45,
    difficulty: "advanced",
    cultures: ["Pashtun", "Tajik"],
    skills: [
      "Family Mediation",
      "Honor Reconciliation",
      "Generational Bridge-building",
    ],
    completionRate: 62,
    empathyScore: 94,
    language: "Pashto",
    category: "cultural-bridge",
    prerequisites: ["Basic Family Mediation"],
    learningObjectives: [
      "Respect honor concepts in mediation",
      "Bridge generational worldviews",
      "Maintain family unity while enabling change",
    ],
    immersionLevel: 98,
    emotionalIntensity: "high",
    participantCount: 8,
    aiPersonalities: ["Grandfather Noor", "Father Rashid", "Daughter Layla"],
  },
  {
    id: "3",
    title: "Mountain Community Harmony",
    description:
      "Restore harmony in an Andean community facing mining versus traditional life tensions",
    duration: 40,
    difficulty: "expert",
    cultures: ["Quechua", "Aymara"],
    skills: [
      "Environmental Mediation",
      "Sacred Site Respect",
      "Economic Justice",
    ],
    completionRate: 45,
    empathyScore: 91,
    language: "Quechua",
    category: "conflict-resolution",
    prerequisites: ["Environmental Conflicts", "Indigenous Rights"],
    learningObjectives: [
      "Honor indigenous worldviews",
      "Balance economic and spiritual needs",
      "Facilitate consensus-building in community councils",
    ],
    immersionLevel: 99,
    emotionalIntensity: "high",
    participantCount: 25,
    aiPersonalities: [
      "Mamá Ixchel",
      "Community Leader Carlos",
      "Mining Representative Ana",
    ],
  },
];

const mockCulturalPersonas: CulturalPersona[] = [
  {
    id: "1",
    name: "Elder Kofi Asante",
    culture: "Akan (Ghana)",
    background:
      "Traditional chief and water guardian with 40 years of community leadership",
    values: ["Collective Wisdom", "Ancestral Respect", "Community Harmony"],
    communicationStyle:
      "Proverb-rich, ceremonial, seeks consensus through storytelling",
    triggers: [
      "Disrespect for tradition",
      "Rushed decisions",
      "Ignoring elders",
    ],
    peacePhilosophy:
      "True peace flows like water - it finds its way around obstacles",
    avatar: "/avatars/elder-kofi.jpg",
    voiceProfile: "Deep, measured, with traditional Akan accent",
  },
  {
    id: "2",
    name: "Amina Al-Zahra",
    culture: "Pashtun (Afghanistan)",
    background:
      "Educated mother and informal community mediator balancing tradition and progress",
    values: ["Family Honor", "Education", "Women's Dignity"],
    communicationStyle:
      "Respectful but firm, uses Islamic principles, seeks win-win solutions",
    triggers: ["Dishonor to family", "Exclusion of women", "Abandoning faith"],
    peacePhilosophy:
      "Peace is like a garden - it needs both strong roots and room to grow",
    avatar: "/avatars/amina-alzahra.jpg",
    voiceProfile: "Warm, articulate, with gentle Pashto inflection",
  },
  {
    id: "3",
    name: "Mama Esperanza Quispe",
    culture: "Quechua (Peru)",
    background:
      "Indigenous rights advocate and traditional healer with deep connection to Pachamama",
    values: [
      "Earth Harmony",
      "Collective Ownership",
      "Intergenerational Responsibility",
    ],
    communicationStyle:
      "Speaks through metaphors of nature, circular conversation style",
    triggers: [
      "Environmental destruction",
      "Individual greed",
      "Ignoring ancestors",
    ],
    peacePhilosophy:
      "Like the mountains and rivers, peace must flow in balance with all life",
    avatar: "/avatars/mama-esperanza.jpg",
    voiceProfile: "Musical, with Quechua rhythm and Spanish overlay",
  },
];

export default function VRTrainingCenter() {
  const [selectedScenario, setSelectedScenario] = useState<VRScenario | null>(
    null,
  );
  const [currentSession, setCurrentSession] = useState<TrainingSession | null>(
    null,
  );
  const [vrSettings, setVrSettings] = useState({
    immersionLevel: 85,
    biometricTracking: true,
    voiceRecognition: true,
    hapticFeedback: true,
    difficulty: "adaptive",
    culturalAccuracy: "high",
  });
  const [sessionStats, setSessionStats] = useState({
    totalSessions: 23,
    completedScenarios: 8,
    averageEmpathyScore: 87,
    skillProgress: 74,
    favoriteCulture: "West African",
    totalHours: 18.5,
  });

  const startVRSession = (scenario: VRScenario) => {
    const newSession: TrainingSession = {
      id: Date.now().toString(),
      scenarioId: scenario.id,
      userId: "current-user",
      startTime: new Date().toISOString(),
      duration: 0,
      completionStatus: "in-progress",
      empathyMeasurements: [],
      decisionPoints: [],
    };
    setCurrentSession(newSession);
    setSelectedScenario(scenario);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500";
      case "intermediate":
        return "bg-yellow-500";
      case "advanced":
        return "bg-orange-500";
      case "expert":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* VR Training Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Headphones className="h-6 w-6 text-purple-600" />
            VR Empathy Training Center
          </h2>
          <p className="text-gray-600">
            Immersive cultural understanding through virtual reality
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              VR Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>VR Training Configuration</DialogTitle>
              <DialogDescription>
                Customize your immersive training experience
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Immersion Level</Label>
                  <div className="mt-2">
                    <Slider
                      value={[vrSettings.immersionLevel]}
                      onValueChange={(value) =>
                        setVrSettings((prev) => ({
                          ...prev,
                          immersionLevel: value[0],
                        }))
                      }
                      max={100}
                      step={5}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Basic (50%)</span>
                      <span>Realistic (75%)</span>
                      <span>Ultra-Real (100%)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="biometric">Biometric Tracking</Label>
                    <Switch
                      id="biometric"
                      checked={vrSettings.biometricTracking}
                      onCheckedChange={(checked) =>
                        setVrSettings((prev) => ({
                          ...prev,
                          biometricTracking: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="voice">Voice Recognition</Label>
                    <Switch
                      id="voice"
                      checked={vrSettings.voiceRecognition}
                      onCheckedChange={(checked) =>
                        setVrSettings((prev) => ({
                          ...prev,
                          voiceRecognition: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="haptic">Haptic Feedback</Label>
                    <Switch
                      id="haptic"
                      checked={vrSettings.hapticFeedback}
                      onCheckedChange={(checked) =>
                        setVrSettings((prev) => ({
                          ...prev,
                          hapticFeedback: checked,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label>Difficulty Adaptation</Label>
                  <Select
                    value={vrSettings.difficulty}
                    onValueChange={(value) =>
                      setVrSettings((prev) => ({ ...prev, difficulty: value }))
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Level</SelectItem>
                      <SelectItem value="adaptive">
                        Adaptive (Recommended)
                      </SelectItem>
                      <SelectItem value="challenge">Challenge Mode</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Cultural Accuracy</Label>
                  <Select
                    value={vrSettings.culturalAccuracy}
                    onValueChange={(value) =>
                      setVrSettings((prev) => ({
                        ...prev,
                        culturalAccuracy: value,
                      }))
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">
                        Basic Cultural Elements
                      </SelectItem>
                      <SelectItem value="high">
                        High Accuracy (Recommended)
                      </SelectItem>
                      <SelectItem value="academic">
                        Academic Research Level
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Training Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {sessionStats.totalSessions}
            </div>
            <p className="text-xs text-gray-600">Total Sessions</p>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {sessionStats.completedScenarios}
            </div>
            <p className="text-xs text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {sessionStats.averageEmpathyScore}%
            </div>
            <p className="text-xs text-gray-600">Empathy Score</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {sessionStats.skillProgress}%
            </div>
            <p className="text-xs text-gray-600">Skill Progress</p>
          </CardContent>
        </Card>
        <Card className="border-teal-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-teal-600">
              {sessionStats.totalHours}h
            </div>
            <p className="text-xs text-gray-600">Training Time</p>
          </CardContent>
        </Card>
        <Card className="border-pink-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm font-bold text-pink-600">
              {sessionStats.favoriteCulture}
            </div>
            <p className="text-xs text-gray-600">Top Culture</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Scenarios */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Available VR Scenarios
            </CardTitle>
            <CardDescription>
              Immersive cultural training experiences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockVRScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{scenario.title}</h4>
                        <Badge
                          className={`text-white ${getDifficultyColor(scenario.difficulty)}`}
                        >
                          {scenario.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {scenario.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <span className="font-medium">Duration:</span>{" "}
                      {scenario.duration}min
                    </div>
                    <div>
                      <span className="font-medium">Participants:</span>{" "}
                      {scenario.participantCount}
                    </div>
                    <div>
                      <span className="font-medium">Immersion:</span>{" "}
                      {scenario.immersionLevel}%
                    </div>
                    <div
                      className={getIntensityColor(scenario.emotionalIntensity)}
                    >
                      <span className="font-medium">Intensity:</span>{" "}
                      {scenario.emotionalIntensity}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium mb-2">
                      Cultures & Skills:
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {scenario.cultures.map((culture, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {culture}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {scenario.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium mb-1">
                      Learning Objectives:
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {scenario.learningObjectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {scenario.prerequisites && (
                    <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                      <p className="text-xs font-medium text-yellow-800 mb-1">
                        Prerequisites:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {scenario.prerequisites.map((prereq, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs text-yellow-700"
                          >
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span>{scenario.completionRate}% completion</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-red-600" />
                        <span>{scenario.empathyScore}% empathy</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => startVRSession(scenario)}
                        className="flex items-center gap-1"
                      >
                        <Play className="h-3 w-3" />
                        Start VR
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                        Preview
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cultural Personas & Session Info */}
        <div className="space-y-6">
          {/* Cultural AI Personas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                AI Cultural Personas
              </CardTitle>
              <CardDescription>
                Meet your virtual cultural mentors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCulturalPersonas.map((persona) => (
                  <div
                    key={persona.id}
                    className="border rounded-lg p-3 space-y-2"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={persona.avatar} alt={persona.name} />
                        <AvatarFallback>
                          {persona.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{persona.name}</h4>
                        <p className="text-xs text-gray-600">
                          {persona.culture}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700">
                      {persona.background}
                    </p>
                    <div className="text-xs">
                      <p className="font-medium text-green-700 italic">
                        "{persona.peacePhilosophy}"
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {persona.values.slice(0, 2).map((value, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Session Status */}
          {currentSession ? (
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Video className="h-5 w-5" />
                  Active VR Session
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">{selectedScenario?.title}</h4>
                  <p className="text-sm text-gray-600">Session in progress</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>23 min remaining</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Empathy:</span>
                    <div className="text-green-600">89%</div>
                  </div>
                  <div>
                    <span className="font-medium">Decisions:</span>
                    <div className="text-blue-600">7/12</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Pause className="h-3 w-3 mr-1" />
                    Pause
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3 mr-1" />
                    Adjust
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Ready to Train
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl">🥽</div>
                  <p className="text-sm text-gray-600">
                    Select a scenario to begin your immersive cultural empathy
                    training
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>VR Headset:</span>
                      <span className="text-green-600">Connected</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Biometric Sensors:</span>
                      <span className="text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Audio System:</span>
                      <span className="text-green-600">Ready</span>
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
                <BookOpen className="h-4 w-4 mr-2" />
                Cultural Background Reading
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
              >
                <Award className="h-4 w-4 mr-2" />
                View Achievements
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
              >
                <Gamepad2 className="h-4 w-4 mr-2" />
                Practice Mode
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
              >
                <Users className="h-4 w-4 mr-2" />
                Multiplayer Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
