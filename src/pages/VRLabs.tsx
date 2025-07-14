import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Headphones,
  Play,
  Users,
  Globe,
  Star,
  Clock,
  Headphones,
  Monitor,
  Settings,
  Award,
  Brain,
  Heart,
  Video,
  Camera,
  Volume2,
  Gamepad,
  Zap,
  Palette,
  Languages,
  Download,
  Share,
  EyeOff,
  RotateCcw,
  MapPin,
  Calendar,
  Target,
  Eye,
} from "lucide-react";

const VRLabs = () => {
  const vrExperiences = [
    {
      id: 1,
      title: "Walking in Their Shoes",
      description:
        "Experience conflict from multiple perspectives in immersive scenarios",
      duration: "30-45 min",
      participants: "2-6 players",
      scenarios: 12,
      languages: 8,
      rating: 4.9,
      difficulty: "Beginner",
      category: "Empathy Building",
      technologies: ["Hand Tracking", "Eye Tracking", "Spatial Audio"],
      lastPlayed: null,
      featured: true,
    },
    {
      id: 2,
      title: "Historical Reconciliation",
      description: "Relive and learn from major historical peace processes",
      duration: "45-60 min",
      participants: "1-4 players",
      scenarios: 8,
      languages: 15,
      rating: 4.7,
      difficulty: "Intermediate",
      category: "Historical Learning",
      technologies: ["Photogrammetry", "AI Avatars", "Real-time Translation"],
      lastPlayed: "2 days ago",
      featured: false,
    },
    {
      id: 3,
      title: "Community Mediation Simulator",
      description:
        "Practice mediation skills in realistic community conflict scenarios",
      duration: "60-90 min",
      participants: "3-8 players",
      scenarios: 15,
      languages: 6,
      rating: 4.8,
      difficulty: "Advanced",
      category: "Skill Practice",
      technologies: [
        "Haptic Feedback",
        "Emotion Recognition",
        "Biometric Monitoring",
      ],
      lastPlayed: "1 week ago",
      featured: true,
    },
    {
      id: 4,
      title: "Cultural Exchange Hub",
      description:
        "Connect with people from different cultures in shared virtual spaces",
      duration: "Variable",
      participants: "2-20 players",
      scenarios: 25,
      languages: 32,
      rating: 4.6,
      difficulty: "Beginner",
      category: "Cultural Bridge",
      technologies: ["Social VR", "Cultural AI", "Gesture Recognition"],
      lastPlayed: "Yesterday",
      featured: false,
    },
    {
      id: 5,
      title: "Environmental Peacebuilding",
      description:
        "Collaborate on environmental challenges in immersive ecosystems",
      duration: "45-75 min",
      participants: "4-12 players",
      scenarios: 10,
      languages: 12,
      rating: 4.5,
      difficulty: "Intermediate",
      category: "Environmental",
      technologies: [
        "Climate Simulation",
        "Ecosystem Modeling",
        "Collaborative Tools",
      ],
      lastPlayed: null,
      featured: false,
    },
    {
      id: 6,
      title: "Trauma-Informed Healing Spaces",
      description: "Safe virtual environments for trauma recovery and healing",
      duration: "20-40 min",
      participants: "1-3 players",
      scenarios: 18,
      languages: 20,
      rating: 4.9,
      difficulty: "Beginner",
      category: "Healing",
      technologies: [
        "Biofeedback",
        "Calming Environments",
        "Guided Meditation",
      ],
      lastPlayed: null,
      featured: true,
    },
  ];

  const vrStats = [
    { metric: "Active VR Sessions", value: "847", trend: "+23%" },
    {
      metric: "Empathy Score Improvement",
      value: "34%",
      trend: "Avg per session",
    },
    {
      metric: "Cultural Connections Made",
      value: "12.4K",
      trend: "This month",
    },
    { metric: "Peace Skills Practiced", value: "45.2K", trend: "Total hours" },
  ];

  const hardwareSupport = [
    {
      name: "Meta Quest 3",
      compatibility: "Full Support",
      features: ["Hand Tracking", "Mixed Reality", "High Res"],
      price: "From $499",
      availability: "Available",
    },
    {
      name: "HTC Vive Pro 2",
      compatibility: "Full Support",
      features: ["Eye Tracking", "Wireless", "Business Grade"],
      price: "From $799",
      availability: "Available",
    },
    {
      name: "Pico 4 Enterprise",
      compatibility: "Full Support",
      features: ["Enterprise Security", "Remote Management", "Analytics"],
      price: "From $899",
      availability: "Available",
    },
    {
      name: "Apple Vision Pro",
      compatibility: "Beta Support",
      features: ["Spatial Computing", "Neural Engine", "Premium Experience"],
      price: "From $3,499",
      availability: "2024 Q2",
    },
    {
      name: "Varjo Aero",
      compatibility: "Professional Support",
      features: ["Human-eye Resolution", "Mixed Reality", "Enterprise"],
      price: "From $1,990",
      availability: "Available",
    },
    {
      name: "Browser VR (WebXR)",
      compatibility: "Basic Support",
      features: ["No Installation", "Cross-platform", "Entry Level"],
      price: "Free",
      availability: "Available",
    },
  ];

  const vrSessions = [
    {
      title: "Middle East Peace Dialogue",
      scenario: "Historical Reconciliation",
      participants: 4,
      duration: "52 minutes",
      empathyGain: "+23%",
      peaceCoinReward: "340 PC",
      date: "Jan 15, 2024",
      status: "Completed",
    },
    {
      title: "Indigenous Land Rights",
      scenario: "Community Mediation Simulator",
      participants: 6,
      duration: "1h 18m",
      empathyGain: "+31%",
      peaceCoinReward: "520 PC",
      date: "Jan 12, 2024",
      status: "Completed",
    },
    {
      title: "Climate Refugee Crisis",
      scenario: "Environmental Peacebuilding",
      participants: 8,
      duration: "1h 05m",
      empathyGain: "+28%",
      peaceCoinReward: "485 PC",
      date: "Jan 10, 2024",
      status: "Completed",
    },
  ];

  const researchData = [
    {
      study: "VR Empathy Enhancement Study",
      institution: "Stanford Virtual Human Interaction Lab",
      participants: 2847,
      finding: "78% increase in cross-cultural empathy after VR sessions",
      publicationDate: "Dec 2023",
      status: "Published",
    },
    {
      study: "Peace Education Effectiveness in Virtual Reality",
      institution: "MIT Peace Innovation Lab",
      participants: 1523,
      finding: "VR learners show 45% better conflict resolution skills",
      publicationDate: "Jan 2024",
      status: "Published",
    },
    {
      study: "Trauma-Informed VR Healing Outcomes",
      institution: "University of Oxford Wellcome Centre",
      participants: 934,
      finding: "62% reduction in trauma symptoms with VR therapy",
      publicationDate: "Nov 2023",
      status: "Peer Review",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">VR Empathy Labs</h1>
          <p className="text-muted-foreground">
            Immersive virtual reality experiences that build understanding,
            empathy, and peace skills across cultures and conflicts
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {vrStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.metric}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="experiences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="experiences">VR Experiences</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
            <TabsTrigger value="create">Create Lab</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          <TabsContent value="experiences" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Monitor className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search VR experiences..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="empathy">Empathy Building</SelectItem>
                  <SelectItem value="historical">
                    Historical Learning
                  </SelectItem>
                  <SelectItem value="skill">Skill Practice</SelectItem>
                  <SelectItem value="cultural">Cultural Bridge</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="healing">Healing</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {vrExperiences.map((experience) => (
                <Card key={experience.id} className="relative">
                  {experience.featured && (
                    <Badge className="absolute top-4 right-4 bg-purple-600">
                      Featured
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{experience.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {experience.rating}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Headphones className="h-5 w-5 text-purple-600" />
                      {experience.title}
                    </CardTitle>
                    <CardDescription>{experience.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {experience.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {experience.participants}
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          {experience.scenarios} scenarios
                        </div>
                        <div className="flex items-center gap-2">
                          <Languages className="h-4 w-4 text-muted-foreground" />
                          {experience.languages} languages
                        </div>
                      </div>

                      <div>
                        <Badge variant="secondary">
                          {experience.difficulty}
                        </Badge>
                        {experience.lastPlayed && (
                          <span className="text-sm text-muted-foreground ml-2">
                            Last played: {experience.lastPlayed}
                          </span>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium">
                          Technologies:
                        </Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {experience.technologies.map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1 peace-gradient">
                          <Play className="h-4 w-4 mr-2" />
                          Launch VR Lab
                        </Button>
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hardware" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  VR Hardware Compatibility
                </CardTitle>
                <CardDescription>
                  Supported VR headsets and devices for optimal empathy lab
                  experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {hardwareSupport.map((device, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{device.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              device.compatibility === "Full Support"
                                ? "default"
                                : device.compatibility === "Beta Support"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {device.compatibility}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm font-medium">
                            Features:
                          </Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {device.features.map((feature, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Price:
                            </span>
                            <div className="font-medium text-primary">
                              {device.price}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Availability:
                            </span>
                            <div className="font-medium">
                              {device.availability}
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">
                          View Specifications
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    System Requirements
                  </CardTitle>
                  <CardDescription>
                    Minimum and recommended specs for VR empathy labs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Minimum Requirements</h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CPU:</span>
                          <span>Intel i5-8400 / AMD Ryzen 5 2600</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">GPU:</span>
                          <span>NVIDIA GTX 1660 / AMD RX 580</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">RAM:</span>
                          <span>8GB DDR4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Storage:
                          </span>
                          <span>25GB available space</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Recommended</h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CPU:</span>
                          <span>Intel i7-10700K / AMD Ryzen 7 3700X</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">GPU:</span>
                          <span>NVIDIA RTX 3070 / AMD RX 6700 XT</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">RAM:</span>
                          <span>16GB DDR4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Storage:
                          </span>
                          <span>50GB SSD space</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    VR Client Setup
                  </CardTitle>
                  <CardDescription>
                    Get started with PAXIS VR empathy labs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">PAXIS VR Client</div>
                        <div className="text-sm text-muted-foreground">
                          Windows, Mac, Linux
                        </div>
                      </div>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">WebXR Version</div>
                        <div className="text-sm text-muted-foreground">
                          Browser-based VR
                        </div>
                      </div>
                      <Button variant="outline">
                        <Globe className="h-4 w-4 mr-2" />
                        Launch
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Mobile VR App</div>
                        <div className="text-sm text-muted-foreground">
                          iOS, Android
                        </div>
                      </div>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        App Store
                      </Button>
                    </div>

                    <Button className="w-full peace-gradient">
                      Complete Setup Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  My VR Session History
                </CardTitle>
                <CardDescription>
                  Track your empathy building progress and earned rewards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vrSessions.map((session, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{session.title}</h3>
                        <Badge variant="default">{session.status}</Badge>
                      </div>

                      <div className="text-sm text-muted-foreground mb-3">
                        {session.scenario}
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Participants:
                          </span>
                          <div className="font-medium">
                            {session.participants} people
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <div className="font-medium">{session.duration}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Empathy Gain:
                          </span>
                          <div className="font-medium text-primary">
                            {session.empathyGain}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reward:</span>
                          <div className="font-medium text-accent">
                            {session.peaceCoinReward}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date:</span>
                          <div className="font-medium">{session.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/10">
                    <div className="text-2xl font-bold text-primary">23h</div>
                    <div className="text-sm text-muted-foreground">
                      Total VR Time
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-accent/10">
                    <div className="text-2xl font-bold text-accent">+47%</div>
                    <div className="text-sm text-muted-foreground">
                      Empathy Improvement
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-green-100">
                    <div className="text-2xl font-bold text-green-600">
                      1,345 PC
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Earned
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Create Custom VR Lab
                  </CardTitle>
                  <CardDescription>
                    Design your own empathy-building VR experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lab-title">Lab Title</Label>
                    <Input
                      id="lab-title"
                      placeholder="Enter experience title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scenario-type">Scenario Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select scenario type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="empathy">
                          Empathy Building
                        </SelectItem>
                        <SelectItem value="mediation">
                          Mediation Practice
                        </SelectItem>
                        <SelectItem value="cultural">
                          Cultural Exchange
                        </SelectItem>
                        <SelectItem value="historical">
                          Historical Recreation
                        </SelectItem>
                        <SelectItem value="environmental">
                          Environmental Cooperation
                        </SelectItem>
                        <SelectItem value="healing">
                          Trauma-Informed Healing
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="participants">Max Participants</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 (Solo)</SelectItem>
                          <SelectItem value="2-4">2-4 (Small Group)</SelectItem>
                          <SelectItem value="5-8">
                            5-8 (Medium Group)
                          </SelectItem>
                          <SelectItem value="9-20">
                            9-20 (Large Group)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Estimated Duration</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15-30">15-30 minutes</SelectItem>
                          <SelectItem value="30-60">30-60 minutes</SelectItem>
                          <SelectItem value="60-90">60-90 minutes</SelectItem>
                          <SelectItem value="90+">90+ minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="environment">VR Environment</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="village">
                          Village Community
                        </SelectItem>
                        <SelectItem value="urban">Urban Setting</SelectItem>
                        <SelectItem value="nature">
                          Natural Environment
                        </SelectItem>
                        <SelectItem value="historical">
                          Historical Location
                        </SelectItem>
                        <SelectItem value="abstract">Abstract Space</SelectItem>
                        <SelectItem value="custom">
                          Custom Environment
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Special Features</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="hand-tracking" />
                        <Label htmlFor="hand-tracking" className="text-sm">
                          Hand Tracking
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="eye-tracking" />
                        <Label htmlFor="eye-tracking" className="text-sm">
                          Eye Tracking
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="spatial-audio" />
                        <Label htmlFor="spatial-audio" className="text-sm">
                          Spatial Audio
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="haptic-feedback" />
                        <Label htmlFor="haptic-feedback" className="text-sm">
                          Haptic Feedback
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full peace-gradient">
                    Create VR Lab
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI-Assisted Lab Builder
                  </CardTitle>
                  <CardDescription>
                    Use AI to help design effective empathy experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                          AI
                        </div>
                        <div>
                          <div className="font-medium">Scenario Generator</div>
                          <div className="text-sm text-muted-foreground">
                            Create conflict scenarios based on real situations
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Generate Scenario
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">
                          AI
                        </div>
                        <div>
                          <div className="font-medium">Empathy Optimizer</div>
                          <div className="text-sm text-muted-foreground">
                            Optimize experience for maximum empathy building
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Optimize Experience
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium">
                          AI
                        </div>
                        <div>
                          <div className="font-medium">Cultural Advisor</div>
                          <div className="text-sm text-muted-foreground">
                            Ensure cultural sensitivity and authenticity
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Review Cultural Aspects
                      </Button>
                    </div>

                    <div className="p-4 rounded-lg bg-secondary/30">
                      <h3 className="font-medium mb-2">Lab Creation Tips</h3>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Start with real conflicts for authenticity</li>
                        <li>• Include multiple perspectives for each party</li>
                        <li>• Allow participants to switch roles</li>
                        <li>• Incorporate cultural context and sensitivity</li>
                        <li>• Include reflection and discussion phases</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  VR Empathy Research
                </CardTitle>
                <CardDescription>
                  Scientific studies on the effectiveness of VR for peace
                  education
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {researchData.map((study, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{study.study}</h3>
                        <Badge
                          variant={
                            study.status === "Published"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {study.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">
                            Institution:{" "}
                          </span>
                          <span className="font-medium">
                            {study.institution}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Participants:{" "}
                          </span>
                          <span className="font-medium">
                            {study.participants.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Key Finding:{" "}
                          </span>
                          <span className="font-medium text-primary">
                            {study.finding}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Publication:{" "}
                          </span>
                          <span className="font-medium">
                            {study.publicationDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Research Participation
                  </CardTitle>
                  <CardDescription>
                    Contribute to peace research through VR studies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border">
                      <div className="font-medium mb-1">Ongoing Studies</div>
                      <div className="text-sm text-muted-foreground">
                        3 active research projects seeking participants
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border">
                      <div className="font-medium mb-1">Your Contributions</div>
                      <div className="text-sm text-muted-foreground">
                        12 sessions contributed to research
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border">
                      <div className="font-medium mb-1">Research Rewards</div>
                      <div className="text-sm text-muted-foreground">
                        Earn 50 PC per research session
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      Join Research Program
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Impact Metrics
                  </CardTitle>
                  <CardDescription>
                    Measured outcomes of VR empathy experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Empathy Increase</span>
                        <span className="font-semibold text-primary">+78%</span>
                      </div>
                      <Progress value={78} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Cultural Understanding</span>
                        <span className="font-semibold text-accent">+65%</span>
                      </div>
                      <Progress value={65} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">
                          Conflict Resolution Skills
                        </span>
                        <span className="font-semibold text-green-600">
                          +45%
                        </span>
                      </div>
                      <Progress value={45} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Bias Reduction</span>
                        <span className="font-semibold text-purple-600">
                          -52%
                        </span>
                      </div>
                      <Progress value={48} />
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
};

export default VRLabs;
