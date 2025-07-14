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
  BookOpen,
  Headphones,
  Globe,
  Users,
  Play,
  Download,
  Star,
  Clock,
  Languages,
  Heart,
  Brain,
  Award,
  Mic,
  Video,
  MessageCircle,
  Search,
  Filter,
  TrendingUp,
  Eye,
  Palette,
} from "lucide-react";

const Education = () => {
  const courses = [
    {
      id: 1,
      title: "Conflict Resolution Fundamentals",
      description:
        "Learn the basics of peaceful conflict resolution and mediation techniques",
      level: "Beginner",
      duration: "4 hours",
      languages: 12,
      enrolled: "2,847",
      rating: 4.8,
      category: "Core Skills",
      instructor: "Dr. Sarah Martinez",
      progress: 0,
      vrAvailable: true,
    },
    {
      id: 2,
      title: "Cultural Empathy & Understanding",
      description:
        "Explore diverse cultural perspectives and build cross-cultural empathy",
      level: "Intermediate",
      duration: "6 hours",
      languages: 23,
      enrolled: "1,934",
      rating: 4.9,
      category: "Cultural Bridge",
      instructor: "Prof. Kwame Asante",
      progress: 45,
      vrAvailable: true,
    },
    {
      id: 3,
      title: "Indigenous Governance Wisdom",
      description:
        "Traditional governance models and conflict resolution from indigenous communities",
      level: "Advanced",
      duration: "8 hours",
      languages: 8,
      enrolled: "876",
      rating: 4.7,
      category: "Traditional Wisdom",
      instructor: "Elder Maria Takawira",
      progress: 0,
      vrAvailable: false,
    },
    {
      id: 4,
      title: "Environmental Peacebuilding",
      description:
        "Address environmental conflicts and promote ecological cooperation",
      level: "Intermediate",
      duration: "5 hours",
      languages: 15,
      enrolled: "1,567",
      rating: 4.6,
      category: "Environmental",
      instructor: "Dr. Raj Patel",
      progress: 78,
      vrAvailable: true,
    },
  ];

  const vrLabs = [
    {
      title: "Walking in Their Shoes",
      description:
        "Experience conflict from multiple perspectives in immersive VR scenarios",
      duration: "30 min",
      participants: "2-6",
      scenarios: 12,
      languages: 8,
      rating: 4.9,
      category: "Empathy Building",
    },
    {
      title: "Historical Reconciliation",
      description: "Relive and learn from major historical peace processes",
      duration: "45 min",
      participants: "1-4",
      scenarios: 8,
      languages: 15,
      rating: 4.7,
      category: "Historical Learning",
    },
    {
      title: "Community Mediation Simulator",
      description:
        "Practice mediation skills in realistic community conflict scenarios",
      duration: "60 min",
      participants: "3-8",
      scenarios: 15,
      languages: 6,
      rating: 4.8,
      category: "Skill Practice",
    },
    {
      title: "Cultural Exchange Hub",
      description:
        "Connect with people from different cultures in shared virtual spaces",
      duration: "Variable",
      participants: "2-20",
      scenarios: 25,
      languages: 32,
      rating: 4.6,
      category: "Cultural Bridge",
    },
  ];

  const peacePulse = [
    {
      type: "Music",
      title: "Songs of Unity - West Africa",
      artist: "Malian Peace Collective",
      culture: "Malian",
      plays: "45.2K",
      peaceCoins: "850 PC",
    },
    {
      type: "Story",
      title: "The Bridge Builders",
      artist: "Aisha Al-Rashid",
      culture: "Middle Eastern",
      plays: "23.1K",
      peaceCoins: "640 PC",
    },
    {
      type: "Art",
      title: "Healing Hands Mural",
      artist: "Colombian Artists Collective",
      culture: "Latin American",
      plays: "67.8K",
      peaceCoins: "1,200 PC",
    },
    {
      type: "Wisdom",
      title: "Seven Generations Principle",
      artist: "Haudenosaunee Council",
      culture: "Indigenous American",
      plays: "34.5K",
      peaceCoins: "920 PC",
    },
  ];

  const learningPaths = [
    {
      name: "Community Peacekeeper",
      description:
        "Build skills for local conflict resolution and community healing",
      courses: 8,
      duration: "32 hours",
      certificate: "Certified Community Mediator",
      enrolled: "1,247",
    },
    {
      name: "Cultural Ambassador",
      description: "Develop cross-cultural communication and empathy skills",
      courses: 6,
      duration: "24 hours",
      certificate: "Cultural Bridge Builder",
      enrolled: "892",
    },
    {
      name: "Peace Educator",
      description: "Learn to teach peace and conflict resolution to others",
      courses: 10,
      duration: "40 hours",
      certificate: "Certified Peace Educator",
      enrolled: "534",
    },
    {
      name: "Digital Peacemaker",
      description:
        "Use technology and AI tools for conflict prevention and resolution",
      courses: 7,
      duration: "28 hours",
      certificate: "Digital Peace Specialist",
      enrolled: "723",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Peace Education Ecosystem</h1>
          <p className="text-muted-foreground">
            Learn, practice, and share peace-building skills through AI-powered
            curricula, VR empathy labs, and cultural wisdom
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Active Learners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">47,283</div>
              <p className="text-xs text-muted-foreground">+12% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Courses Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">1,247</div>
              <p className="text-xs text-muted-foreground">In 100+ languages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">VR Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">23,456</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Certificates Issued
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">8,934</div>
              <p className="text-xs text-muted-foreground">
                Verified on blockchain
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="vr-labs">VR Labs</TabsTrigger>
            <TabsTrigger value="peace-pulse">PeacePulse</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search courses..." className="pl-10" />
                </div>
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="core">Core Skills</SelectItem>
                  <SelectItem value="cultural">Cultural Bridge</SelectItem>
                  <SelectItem value="traditional">
                    Traditional Wisdom
                  </SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Level" />
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
              {courses.map((course) => (
                <Card key={course.id} className="relative">
                  {course.vrAvailable && (
                    <Badge className="absolute top-4 right-4 bg-purple-600">
                      VR Available
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{course.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{course.level}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Languages className="h-4 w-4 text-muted-foreground" />
                          {course.languages} languages
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {course.enrolled} enrolled
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Instructor: {course.instructor}
                      </div>

                      {course.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button className="flex-1">
                          {course.progress > 0 ? "Continue" : "Start Course"}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vr-labs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  VR Empathy Labs
                </CardTitle>
                <CardDescription>
                  Immersive experiences that build understanding across
                  perspectives and cultures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {vrLabs.map((lab, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-medium">{lab.title}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{lab.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">
                        {lab.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <div className="font-medium">{lab.duration}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Participants:
                          </span>
                          <div className="font-medium">{lab.participants}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Scenarios:
                          </span>
                          <div className="font-medium">{lab.scenarios}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Languages:
                          </span>
                          <div className="font-medium">{lab.languages}</div>
                        </div>
                      </div>

                      <Badge variant="outline" className="mb-4">
                        {lab.category}
                      </Badge>

                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <Play className="h-4 w-4 mr-2" />
                          Launch VR Lab
                        </Button>
                        <Button variant="outline" size="icon">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="peace-pulse" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  PeacePulse Global Feed
                </CardTitle>
                <CardDescription>
                  Music, art, stories, and wisdom from peace movements worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {peacePulse.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            item.type === "Music"
                              ? "bg-blue-100 text-blue-600"
                              : item.type === "Story"
                                ? "bg-green-100 text-green-600"
                                : item.type === "Art"
                                  ? "bg-purple-100 text-purple-600"
                                  : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {item.type === "Music" && (
                            <Headphones className="h-6 w-6" />
                          )}
                          {item.type === "Story" && (
                            <BookOpen className="h-6 w-6" />
                          )}
                          {item.type === "Art" && (
                            <Palette className="h-6 w-6" />
                          )}
                          {item.type === "Wisdom" && (
                            <Brain className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">
                            by {item.artist} • {item.culture}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.plays} plays
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="peace-gradient text-white border-none"
                        >
                          {item.peaceCoins}
                        </Badge>
                        <Button size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-secondary/30">
                  <h3 className="font-medium mb-2">Contribute to PeacePulse</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your cultural art, music, stories, or wisdom with the
                    global peace community
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Mic className="h-4 w-4 mr-2" />
                      Upload Audio
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Video className="h-4 w-4 mr-2" />
                      Upload Video
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Share Story
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paths" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Structured Learning Paths
                </CardTitle>
                <CardDescription>
                  Comprehensive programs leading to verified peace-building
                  certifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {learningPaths.map((path, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <h3 className="font-medium text-lg mb-2">{path.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {path.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">
                            Courses:
                          </span>
                          <div className="font-medium">{path.courses}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Duration:
                          </span>
                          <div className="font-medium">{path.duration}</div>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">
                            Certificate:
                          </span>
                          <div className="font-medium text-primary">
                            {path.certificate}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-muted-foreground">
                          {path.enrolled} learners enrolled
                        </div>
                        <Badge variant="secondary">Blockchain Verified</Badge>
                      </div>

                      <Button className="w-full">Start Learning Path</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Learning Community
                  </CardTitle>
                  <CardDescription>
                    Connect with fellow peace learners worldwide
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Discussion Forums</div>
                        <div className="text-sm text-muted-foreground">
                          24,567 active discussions
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Join
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Study Groups</div>
                        <div className="text-sm text-muted-foreground">
                          1,234 groups worldwide
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Find
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Mentorship Program</div>
                        <div className="text-sm text-muted-foreground">
                          Connect with peace practitioners
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg border">
                      <div>
                        <div className="font-medium">Virtual Events</div>
                        <div className="text-sm text-muted-foreground">
                          Weekly workshops & seminars
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Browse
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Your Learning Analytics
                  </CardTitle>
                  <CardDescription>
                    Track your progress and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Courses Completed</span>
                        <span className="font-semibold">7/12</span>
                      </div>
                      <Progress value={58} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">VR Lab Sessions</span>
                        <span className="font-semibold">23 hours</span>
                      </div>
                      <Progress value={76} />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Cultural Connections</span>
                        <span className="font-semibold">15 cultures</span>
                      </div>
                      <Progress value={62} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          847
                        </div>
                        <div className="text-sm text-muted-foreground">
                          PeaceCoins Earned
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">3</div>
                        <div className="text-sm text-muted-foreground">
                          Certificates
                        </div>
                      </div>
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

export default Education;
