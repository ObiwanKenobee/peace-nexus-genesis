import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  Users,
  Clock,
  Star,
  Award,
  BookOpen,
  Heart,
  Eye,
  Headphones,
  Smartphone,
  Download,
  Share,
  TreePine,
  Mountain,
  Waves,
  Bird,
  Fish,
  Rabbit,
  Sun,
  Moon,
  Leaf,
  Globe,
  GraduationCap,
  Church,
  Zap,
} from "lucide-react";

const vrExperiences = [
  {
    id: 1,
    title: "Walk with Jesus Through Creation",
    subtitle: "Galilee Nature Experience",
    description:
      "Experience the Holy Land's wildlife as Jesus would have seen it - following the paths by the Sea of Galilee, observing birds of the air and lilies of the field.",
    duration: "25 minutes",
    difficulty: "Beginner",
    ageGroup: "All Ages",
    faithTradition: "Christian",
    features: [
      "Interactive Scripture",
      "Wildlife Spotting",
      "Prayer Moments",
      "Historical Context",
    ],
    participants: 234567,
    rating: 4.9,
    scripture:
      "Look at the birds of the air; they do not sow or reap or store away in barns, and yet your heavenly Father feeds them. Are you not much more valuable than they? - Matthew 6:26",
    learningGoals: [
      "Understand Biblical stewardship",
      "Experience sacred nature meditation",
      "Learn about Middle Eastern wildlife",
      "Practice contemplative prayer",
    ],
    environments: [
      "Sea of Galilee",
      "Mount of Beatitudes",
      "Jordan River",
      "Judean Wilderness",
    ],
    wildlife: ["Pelicans", "Eagles", "Wild Boar", "Gazelles", "Rock Badgers"],
    backgroundImage: "/vr-galilee.jpg",
    vrTech: "WebXR Compatible",
  },
  {
    id: 2,
    title: "Prophet's Garden - Islamic Nature Wisdom",
    subtitle: "Following Muhammad's (PBUH) Mercy to Animals",
    description:
      "Journey through Islamic gardens and learn about Prophet Muhammad's (PBUH) teachings on animal welfare and environmental stewardship.",
    duration: "30 minutes",
    difficulty: "Beginner",
    ageGroup: "Teen & Adult",
    faithTradition: "Islamic",
    features: [
      "Hadith Teachings",
      "Arabic Calligraphy",
      "Animal Interaction",
      "Garden Design",
    ],
    participants: 189234,
    rating: 4.8,
    scripture:
      "Whoever is merciful even to a sparrow, Allah will be merciful to him on the Day of Judgment. - Hadith",
    learningGoals: [
      "Learn Islamic environmental ethics",
      "Understand Quranic nature verses",
      "Practice mercy toward animals",
      "Experience Islamic garden design",
    ],
    environments: [
      "Mosque Gardens",
      "Desert Oasis",
      "Medina Palm Groves",
      "Andalusian Courtyards",
    ],
    wildlife: [
      "Arabian Oryx",
      "Falcons",
      "Honey Bees",
      "Gazelles",
      "Desert Cats",
    ],
    backgroundImage: "/vr-islamic-garden.jpg",
    vrTech: "VR Headset + Mobile",
  },
  {
    id: 3,
    title: "Sacred Grove - Indigenous Wisdom Walk",
    subtitle: "Seven Generations Teaching",
    description:
      "Learn from Native American elders about the sacred relationship with animal relatives and the responsibility to seven generations.",
    duration: "40 minutes",
    difficulty: "Intermediate",
    ageGroup: "Teen & Adult",
    faithTradition: "Indigenous",
    features: [
      "Elder Storytelling",
      "Animal Spirit Guides",
      "Seasonal Ceremonies",
      "Plant Medicine",
    ],
    participants: 67834,
    rating: 4.9,
    scripture:
      "In our every deliberation, we must consider the impact of our decisions on the next seven generations. - Haudenosaunee Principle",
    learningGoals: [
      "Understand indigenous ecology",
      "Learn about animal totems",
      "Practice land-based spirituality",
      "Honor traditional knowledge",
    ],
    environments: [
      "Old Growth Forest",
      "Sacred Mountain",
      "River Confluence",
      "Prairie Medicine Wheel",
    ],
    wildlife: ["Buffalo", "Eagles", "Salmon", "Bears", "Wolves"],
    backgroundImage: "/vr-sacred-grove.jpg",
    vrTech: "Full VR Immersion",
  },
  {
    id: 4,
    title: "Ganga Ma - River of Life",
    subtitle: "Hindu Dharma and River Ecology",
    description:
      "Experience the sacred Ganges through Hindu eyes, understanding the divine presence in rivers and the dharmic duty to protect water life.",
    duration: "35 minutes",
    difficulty: "Intermediate",
    ageGroup: "All Ages",
    faithTradition: "Hindu",
    features: [
      "Sanskrit Mantras",
      "River Aarti Ceremony",
      "Aquatic Life",
      "Temple Architecture",
    ],
    participants: 298765,
    rating: 4.7,
    scripture:
      "The rivers, especially Mother Ganga, are divine. To pollute them is to sin against the Divine Mother herself. - Rigveda Interpretation",
    learningGoals: [
      "Understand river as divine mother",
      "Learn about aquatic ecosystems",
      "Practice water conservation",
      "Experience Hindu ceremonies",
    ],
    environments: [
      "Gangotri Glacier",
      "Varanasi Ghats",
      "Sundarbans Delta",
      "Himalayan Source",
    ],
    wildlife: [
      "Ganges River Dolphin",
      "Gharials",
      "Peacocks",
      "Tigers",
      "Otters",
    ],
    backgroundImage: "/vr-ganga.jpg",
    vrTech: "WebXR + Mobile AR",
  },
  {
    id: 5,
    title: "Bodhi Tree Sangha - Buddhist Compassion",
    subtitle: "Interdependence of All Beings",
    description:
      "Sit under the Bodhi tree and learn about the interconnectedness of all life, practicing metta (loving-kindness) toward all creatures.",
    duration: "45 minutes",
    difficulty: "Advanced",
    ageGroup: "Teen & Adult",
    faithTradition: "Buddhist",
    features: [
      "Meditation Guidance",
      "Karma Visualization",
      "Rebirth Stories",
      "Monastery Life",
    ],
    participants: 156789,
    rating: 4.8,
    scripture:
      "All beings tremble before violence. All fear death. All love life. See yourself in others. Then whom can you hurt? - Buddha",
    learningGoals: [
      "Practice loving-kindness meditation",
      "Understand interdependence",
      "Learn about ahimsa (non-violence)",
      "Experience monastic wisdom",
    ],
    environments: [
      "Bodh Gaya Temple",
      "Tibetan Monastery",
      "Forest Retreat",
      "Mountain Cave",
    ],
    wildlife: ["Monkeys", "Deer", "Snow Leopards", "Cranes", "Butterflies"],
    backgroundImage: "/vr-bodhi-tree.jpg",
    vrTech: "VR + Biofeedback",
  },
  {
    id: 6,
    title: "Tikkun Olam Nature Lab",
    subtitle: "Jewish Environmental Action",
    description:
      "Engage in hands-on tikkun olam (repairing the world) through environmental stewardship, following Jewish teachings on bal tashchit (do not destroy).",
    duration: "30 minutes",
    difficulty: "Intermediate",
    ageGroup: "Youth & Adult",
    faithTradition: "Jewish",
    features: [
      "Talmudic Discussions",
      "Environmental Mitzvot",
      "Kibbutz Agriculture",
      "Sabbath in Nature",
    ],
    participants: 89456,
    rating: 4.6,
    scripture:
      "When you besiege a city... you shall not destroy its trees by wielding an axe against them, for from them you will eat, and you shall not cut them down. - Deuteronomy 20:19",
    learningGoals: [
      "Understand bal tashchit principle",
      "Practice environmental mitzvot",
      "Learn sustainable agriculture",
      "Experience Sabbath rest in nature",
    ],
    environments: [
      "Jerusalem Mountains",
      "Galilee Gardens",
      "Desert Kibbutz",
      "Mediterranean Coast",
    ],
    wildlife: ["Hoopoes", "Ibex", "Leopards", "Sea Turtles", "Bee-eaters"],
    backgroundImage: "/vr-jerusalem.jpg",
    vrTech: "AR + Traditional VR",
  },
];

const vrClassrooms = [
  {
    id: 1,
    name: "Global Faith Elementary",
    students: 2500,
    age: "6-12 years",
    currentExperience: "Walk with Jesus Through Creation",
    teacher: "Sister Mary Catherine",
    location: "Schools Worldwide",
    nextSession: "Tomorrow 10 AM",
  },
  {
    id: 2,
    name: "Interfaith Teen Academy",
    students: 890,
    age: "13-18 years",
    currentExperience: "Sacred Grove - Indigenous Wisdom",
    teacher: "Dr. Running Bear",
    location: "Native American Cultural Center",
    nextSession: "Friday 2 PM",
  },
  {
    id: 3,
    name: "Seminary Ecology Course",
    students: 156,
    age: "Adult",
    currentExperience: "Ganga Ma - River of Life",
    teacher: "Swami Nirmalananda",
    location: "Interfaith Seminary",
    nextSession: "Monday 7 PM",
  },
];

const achievements = [
  {
    id: 1,
    title: "Creation Walker",
    description: "Completed 5 different faith-based nature experiences",
    icon: TreePine,
    progress: 3,
    total: 5,
    peaceCoins: 500,
  },
  {
    id: 2,
    title: "Interfaith Bridge Builder",
    description: "Experienced VR journeys from 3 different faith traditions",
    icon: Heart,
    progress: 2,
    total: 3,
    peaceCoins: 300,
  },
  {
    id: 3,
    title: "Sacred Storyteller",
    description: "Shared 10 VR experiences with friends",
    icon: Share,
    progress: 7,
    total: 10,
    peaceCoins: 200,
  },
];

export default function WildlifeVRExperience() {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(
    null,
  );
  const [isVRActive, setIsVRActive] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(75);
  const [isMuted, setIsMuted] = useState(false);

  const handleStartVR = (experienceId: number) => {
    setSelectedExperience(experienceId);
    setIsVRActive(true);
    console.log(
      `Starting VR Experience: ${vrExperiences.find((e) => e.id === experienceId)?.title}`,
    );
  };

  const handleEndVR = () => {
    setIsVRActive(false);
    setSelectedExperience(null);
    console.log("VR Experience ended");
  };

  const handleEarnAchievement = (achievement: string, coins: number) => {
    console.log(
      `Achievement unlocked: ${achievement} - Earned ${coins} PeaceCoins`,
    );
  };

  const handleJoinClassroom = (classroom: string) => {
    console.log(`Joined classroom: ${classroom}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Peace with Creation Curriculum
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Virtual Reality experiences connecting sacred wisdom with wildlife
          conservation across all faith traditions
        </p>
      </div>

      {/* VR Experience Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {vrExperiences.map((experience) => (
          <Card
            key={experience.id}
            className="bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                  <p className="text-gray-600 font-medium mb-2">
                    {experience.subtitle}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {experience.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {experience.participants.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {experience.rating}
                    </span>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {experience.faithTradition}
                </Badge>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {experience.description}
              </p>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm italic text-blue-800">
                  "{experience.scripture}"
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <h5 className="font-medium text-sm mb-2">Learning Goals</h5>
                  <div className="flex flex-wrap gap-1">
                    {experience.learningGoals.map((goal, index) => (
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

                <div>
                  <h5 className="font-medium text-sm mb-2">
                    Featured Wildlife
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {experience.wildlife.map((animal, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {animal}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-sm mb-2">VR Features</h5>
                  <div className="flex flex-wrap gap-1">
                    {experience.features.map((feature, index) => (
                      <Badge key={index} variant="default" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                <div className="text-center">
                  <div className="font-medium">{experience.difficulty}</div>
                  <div className="text-gray-500">Difficulty</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{experience.ageGroup}</div>
                  <div className="text-gray-500">Age Group</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{experience.vrTech}</div>
                  <div className="text-gray-500">Technology</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => handleStartVR(experience.id)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Enter VR Experience
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active VR Session */}
      {isVRActive && selectedExperience && (
        <Card className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">VR Session Active</h2>
                <p className="opacity-90">
                  {
                    vrExperiences.find((e) => e.id === selectedExperience)
                      ?.title
                  }
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <Settings className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <TreePine className="w-16 h-16 mx-auto mb-4 text-green-400" />
                  <p className="text-sm">Immersed in Sacred Nature</p>
                </div>
                <div className="text-center">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-red-400 animate-pulse" />
                  <p className="text-sm">Connecting with Creation</p>
                </div>
                <div className="text-center">
                  <Star className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                  <p className="text-sm">Gaining Wisdom</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleEndVR}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  End Experience
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restart
                </Button>
              </div>
              <div className="text-sm opacity-75">
                Session Duration: 12:34 • Progress: 65%
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Virtual Classrooms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Church className="w-6 h-6 text-blue-600" />
            <span>Active Virtual Classrooms</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vrClassrooms.map((classroom) => (
              <div
                key={classroom.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50"
              >
                <h4 className="font-bold mb-2">{classroom.name}</h4>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span className="font-medium">
                      {classroom.students.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age Group:</span>
                    <span className="font-medium">{classroom.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Teacher:</span>
                    <span className="font-medium">{classroom.teacher}</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg mb-3">
                  <p className="text-sm font-medium">Current Experience:</p>
                  <p className="text-sm text-gray-600">
                    {classroom.currentExperience}
                  </p>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg mb-3">
                  <p className="text-sm">
                    <strong>Next Session:</strong> {classroom.nextSession}
                  </p>
                </div>

                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleJoinClassroom(classroom.name)}
                >
                  <Users className="w-3 h-3 mr-1" />
                  Join Classroom
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-yellow-600" />
            <span>Spiritual Learning Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              const progressPercent =
                (achievement.progress / achievement.total) * 100;

              return (
                <div key={achievement.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-8 h-8 text-blue-600" />
                    <Badge variant="outline">
                      {achievement.progress}/{achievement.total}
                    </Badge>
                  </div>

                  <h4 className="font-bold mb-2">{achievement.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {achievement.description}
                  </p>

                  <div className="space-y-2">
                    <Progress value={progressPercent} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Progress: {progressPercent.toFixed(0)}%</span>
                      <span className="font-medium text-green-600">
                        {achievement.peaceCoins} PC Reward
                      </span>
                    </div>
                  </div>

                  {progressPercent === 100 && (
                    <Button
                      size="sm"
                      className="w-full mt-3"
                      onClick={() =>
                        handleEarnAchievement(
                          achievement.title,
                          achievement.peaceCoins,
                        )
                      }
                    >
                      <Zap className="w-3 h-3 mr-1" />
                      Claim Reward
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Mobile VR Options */}
      <Card className="bg-gradient-to-r from-green-100 to-blue-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Mobile VR Access</h3>
              <p className="text-gray-700 mb-4">
                Experience sacred nature journeys on any device - from simple
                smartphone VR to advanced headsets
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>📱 Smartphone Compatible</span>
                <span>🥽 VR Headset Enhanced</span>
                <span>🌐 WebXR Technology</span>
                <span>♿ Accessibility Features</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile App
              </Button>
              <Button>
                <Headphones className="w-4 h-4 mr-2" />
                Get VR Headset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faith Community Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-6 h-6 text-green-600" />
            <span>Faith Community Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100">
              <h4 className="font-bold mb-2">🏛️ Temples & Churches</h4>
              <p className="text-sm text-gray-700 mb-3">
                VR stations in religious buildings for congregation-wide
                experiences
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Partner with Us
              </Button>
            </div>

            <div className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-100">
              <h4 className="font-bold mb-2">🏫 Religious Schools</h4>
              <p className="text-sm text-gray-700 mb-3">
                Curriculum integration for madrasas, Sunday schools, and
                seminaries
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Educator Resources
              </Button>
            </div>

            <div className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-100">
              <h4 className="font-bold mb-2">👥 Youth Groups</h4>
              <p className="text-sm text-gray-700 mb-3">
                Special programs for religious youth organizations and camps
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Youth Programs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
