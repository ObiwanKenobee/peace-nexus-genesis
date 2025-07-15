import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Leaf,
  Heart,
  TreePine,
  Fish,
  Bird,
  Mountain,
  Sun,
  Moon,
  Star,
  Sprout,
  Globe,
  Shield,
  BookOpen,
  Users,
  Coins,
  Eye,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Zap,
  Camera,
  MapPin,
  Calendar,
  Play,
  Pause,
  Volume2,
  Smartphone,
  Crown,
} from "lucide-react";

const wildlifePeaceMetrics = [
  {
    title: "Wildlife Peace Index",
    value: "87.3",
    change: "+2.1",
    trend: "up",
    description: "Global harmony score between humans and wildlife",
  },
  {
    title: "Protected Habitats",
    value: "2,847",
    change: "+156",
    trend: "up",
    description: "Sacred zones under blockchain protection",
  },
  {
    title: "Species Ambassadors",
    value: "234",
    change: "+23",
    trend: "up",
    description: "Keystone species with guardian communities",
  },
  {
    title: "Divine Encounters",
    value: "12.4K",
    change: "+890",
    trend: "up",
    description: "Recorded spiritual-wildlife experiences",
  },
];

const keyStoneSpecies = [
  {
    id: 1,
    name: "African Elephant",
    spiritualName: "The Memory Keeper",
    region: "East Africa",
    population: 415000,
    status: "Vulnerable",
    peacekeepers: 2847,
    scripture: "For every beast of the forest is Mine - Psalm 50:10",
    healthScore: 73,
    recentEvents: [
      "Migration corridor protected in Kenya",
      "Community rangers trained in Tanzania",
      "Poaching incidents down 23% this month",
    ],
    culturalSignificance:
      "Symbol of wisdom, memory, and ancestral connection in African traditions",
    conservationActions: 45,
    peaceCoinsEarned: 12400,
  },
  {
    id: 2,
    name: "Snow Leopard",
    spiritualName: "The Mountain Guardian",
    region: "Himalayas",
    population: 4000,
    status: "Endangered",
    peacekeepers: 1256,
    scripture:
      "He makes my feet like deer's feet, and sets me on my high places - Habakkuk 3:19",
    healthScore: 58,
    recentEvents: [
      "Camera traps installed in Ladakh",
      "Herder compensation program expanded",
      "Sacred grove protection agreement signed",
    ],
    culturalSignificance:
      "Revered as protector of high places in Buddhist and Himalayan traditions",
    conservationActions: 32,
    peaceCoinsEarned: 8900,
  },
  {
    id: 3,
    name: "Monarch Butterfly",
    spiritualName: "The Resurrection Messenger",
    region: "North America",
    population: 35000000,
    status: "Critically Endangered",
    peacekeepers: 3456,
    scripture:
      "Consider the lilies of the field... even Solomon in all his glory was not arrayed like one of these - Matthew 6:28-29",
    healthScore: 42,
    recentEvents: [
      "Milkweed planting campaign launched",
      "Migration corridor mapped in Mexico",
      "Youth education program reaches 50K students",
    ],
    culturalSignificance:
      "Symbol of transformation, resurrection, and divine guidance in many cultures",
    conservationActions: 67,
    peaceCoinsEarned: 15600,
  },
];

const sacredHabitats = [
  {
    id: 1,
    name: "Maasai Mara Elephant Corridor",
    location: "Kenya-Tanzania Border",
    size: "1,200 sq km",
    protectionLevel: "Sacred Covenant",
    blockchainTx: "0x742d35Cc6Cf4C34B0...",
    guardians: ["Maasai Community", "Kenya Wildlife Service", "PAXIS Rangers"],
    spiritualSignificance: "Ancient migration route blessed by tribal elders",
    threatsDetected: 2,
    lastBlessing: "3 days ago",
    protectedSpecies: 23,
    status: "Active Protection",
  },
  {
    id: 2,
    name: "Amazon River Dolphin Sanctuary",
    location: "Brazil-Peru Confluence",
    size: "850 sq km",
    protectionLevel: "Divine Waters",
    blockchainTx: "0x8c9f4a2b1e7d35Af...",
    guardians: ["Indigenous Tribes", "River Guardians", "Dolphin Protectors"],
    spiritualSignificance:
      "Sacred waters where spirits communicate through dolphins",
    threatsDetected: 0,
    lastBlessing: "1 week ago",
    protectedSpecies: 156,
    status: "Blessed Protection",
  },
  {
    id: 3,
    name: "Himalayan Snow Leopard Refuge",
    location: "Tibet-Nepal Border",
    size: "2,100 sq km",
    protectionLevel: "Mountain Temple",
    blockchainTx: "0x5a8b2c4d9e1f67Bc...",
    guardians: ["Buddhist Monasteries", "Local Herders", "Conservation Groups"],
    spiritualSignificance:
      "High altitude sanctuary blessed by mountain deities",
    threatsDetected: 1,
    lastBlessing: "2 days ago",
    protectedSpecies: 8,
    status: "Sacred Watch",
  },
];

const divineDailyMessage = {
  date: new Date().toLocaleDateString(),
  species: "African Elephants",
  location: "Amboseli National Park",
  message:
    "The matriarch Nalani leads her family to the ancient watering hole. Their trust in the eternal springs reminds us that even in drought, divine provision flows. Today, let us protect not just their water, but the faith they place in tomorrow's dawn.",
  scripture:
    "He leads me beside quiet waters, He refreshes my soul - Psalm 23:2",
  action: "Consider supporting water conservation in East Africa",
  peaceCoins: 25,
  urgency: "medium",
  backgroundImage: "/elephant-sunset.jpg",
};

const wildlifeDAO = {
  activeProposals: [
    {
      id: 1,
      title: "Establish Pangolin Sanctuary in Vietnam",
      description:
        "Create blockchain-protected refuge for world's most trafficked mammal",
      votes: 2847,
      approval: 89,
      funding: "250K PC",
      timeline: "3 months",
      species: "Pangolin",
      spiritualBacking: "Buddhist temple blessing secured",
    },
    {
      id: 2,
      title: "Whale Song Peace Treaty - Pacific Ocean",
      description: "Reduce ship noise pollution in whale migration corridors",
      votes: 1956,
      approval: 94,
      funding: "180K PC",
      timeline: "6 months",
      species: "Humpback Whale",
      spiritualBacking: "Indigenous Hawaiian ceremony planned",
    },
    {
      id: 3,
      title: "Monarch Butterfly Highway Protection",
      description:
        "Protect and restore milkweed corridors across North America",
      votes: 3124,
      approval: 87,
      funding: "320K PC",
      timeline: "2 years",
      species: "Monarch Butterfly",
      spiritualBacking: "Multi-faith blessing ceremony",
    },
  ],
  treasuryBalance: "1.2M PC",
  activeGuardians: 15600,
  speciesRepresented: 89,
};

export default function WildlifePeace() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isPlayingNatureSounds, setIsPlayingNatureSounds] = useState(false);

  const handleEarnPeaceCoins = (amount: number, activity: string) => {
    console.log(`Earned ${amount} PeaceCoins for: ${activity}`);
    // Here we would integrate with the actual PeaceCoin system
  };

  const handleSpeciesAdoption = (species: string) => {
    handleEarnPeaceCoins(100, `Adopted ${species} as Wildlife Ambassador`);
  };

  const handleHabitatBless = (habitat: string) => {
    handleEarnPeaceCoins(50, `Blessed ${habitat} with spiritual protection`);
  };

  const handleDAOVote = (proposal: string) => {
    handleEarnPeaceCoins(25, `Voted on ${proposal} in Wildlife DAO`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Divine Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-4">
              <TreePine className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              PAXIS: Peace with Wildlife
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-4">
              "The wolf shall dwell with the lamb... they shall not hurt nor
              destroy in all My holy mountain." - Isaiah 11:6-9
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Covenant Mode Active
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                Divine Integration
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Sacred Protection
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Wildlife Peace Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {wildlifePeaceMetrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur border-0 shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                    {index === 0 && <Leaf className="w-6 h-6 text-green-600" />}
                    {index === 1 && (
                      <Shield className="w-6 h-6 text-blue-600" />
                    )}
                    {index === 2 && (
                      <Users className="w-6 h-6 text-purple-600" />
                    )}
                    {index === 3 && (
                      <Star className="w-6 h-6 text-yellow-600" />
                    )}
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {metric.change}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {metric.value}
                  </p>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Divine Daily Message */}
        <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-amber-900">
                    Divine Message for {divineDailyMessage.date}
                  </h3>
                  <Badge className="bg-amber-100 text-amber-800">
                    {divineDailyMessage.species}
                  </Badge>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  {divineDailyMessage.message}
                </p>
                <div className="bg-white/50 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium text-gray-800 italic">
                    "{divineDailyMessage.scripture}"
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {divineDailyMessage.location}
                  </p>
                  <Button
                    onClick={() =>
                      handleEarnPeaceCoins(
                        divineDailyMessage.peaceCoins,
                        "Daily divine reflection",
                      )
                    }
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Reflect & Earn {divineDailyMessage.peaceCoins} PC
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 bg-white/50 backdrop-blur">
            <TabsTrigger value="overview">Sacred Overview</TabsTrigger>
            <TabsTrigger value="ark-system">The Ark System</TabsTrigger>
            <TabsTrigger value="ambassadors">Wildlife Ambassadors</TabsTrigger>
            <TabsTrigger value="habitats">Sacred Habitats</TabsTrigger>
            <TabsTrigger value="dao">Wildlife DAO</TabsTrigger>
            <TabsTrigger value="covenant">Covenant Mode</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Keystone Species Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    <span>Keystone Species Guardianship</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {keyStoneSpecies.slice(0, 2).map((species) => (
                      <div
                        key={species.id}
                        className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{species.name}</h4>
                            <p className="text-sm text-gray-600 italic">
                              "{species.spiritualName}"
                            </p>
                          </div>
                          <Badge
                            variant={
                              species.status === "Vulnerable"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {species.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Peace Health Score</span>
                            <span>{species.healthScore}%</span>
                          </div>
                          <Progress
                            value={species.healthScore}
                            className="h-2"
                          />
                          <p className="text-xs text-gray-600">
                            {species.peacekeepers.toLocaleString()} guardians •{" "}
                            {species.peaceCoinsEarned.toLocaleString()} PC
                            earned
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Divine Encounters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span>Recent Divine Encounters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Bird className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">
                            Eagle Circle Vision
                          </p>
                          <p className="text-xs text-gray-500">
                            Yellowstone National Park • 2 hours ago
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        "Seven eagles circled the sacred mountain at dawn,
                        witnessed by tribal elders during prayer ceremony."
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Fish className="w-5 h-5 text-cyan-600" />
                        <div>
                          <p className="font-medium text-sm">
                            Salmon Return Blessing
                          </p>
                          <p className="text-xs text-gray-500">
                            Columbia River • 6 hours ago
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        "First salmon of the season arrived during riverside
                        blessing ceremony, bringing abundance message."
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <TreePine className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-sm">
                            Ancient Grove Awakening
                          </p>
                          <p className="text-xs text-gray-500">
                            Redwood Forest • 1 day ago
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        "1,000-year-old redwood began unusual humming sound
                        during full moon meditation gathering."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Nature Sound & Meditation */}
            <Card className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Sacred Soundscape Meditation
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Connect with creation through live sounds from protected
                      habitats worldwide
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>🐘 Amboseli Elephants</span>
                      <span>🐋 Pacific Whale Songs</span>
                      <span>🌊 Amazon River Flow</span>
                      <span>🦅 Mountain Eagle Calls</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setIsPlayingNatureSounds(!isPlayingNatureSounds)
                      }
                    >
                      {isPlayingNatureSounds ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      {isPlayingNatureSounds ? "Pause" : "Listen"}
                    </Button>
                    <Button
                      onClick={() =>
                        handleEarnPeaceCoins(15, "Sacred soundscape meditation")
                      }
                      className="bg-gradient-to-r from-green-500 to-blue-500"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Meditate & Earn 15 PC
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ark System Tab */}
          <TabsContent value="ark-system" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-4">
                The Ark System - Digital Noah's Mission
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                "And of every living thing of all flesh, two of every sort shalt
                thou bring into the ark, to keep them alive with thee" - Genesis
                7:19
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Species Preservation Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {keyStoneSpecies.map((species) => (
                      <div key={species.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{species.name}</h4>
                            <p className="text-sm text-gray-600">
                              {species.region}
                            </p>
                          </div>
                          <Badge
                            variant={
                              species.status === "Critically Endangered"
                                ? "destructive"
                                : species.status === "Endangered"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {species.status}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-sm">
                            <span>Population</span>
                            <span>{species.population.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Active Guardians</span>
                            <span>{species.peacekeepers.toLocaleString()}</span>
                          </div>
                          <Progress
                            value={species.healthScore}
                            className="h-2"
                          />
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg mb-3">
                          <p className="text-sm italic text-blue-800">
                            "{species.scripture}"
                          </p>
                        </div>

                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleSpeciesAdoption(species.name)}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          Become Guardian - Earn 100 PC
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Faith-Based Conservation Commitments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                      <h4 className="font-semibold mb-2">
                        🕊️ Christian Stewardship Pledge
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        "We commit to caring for God's creation as faithful
                        stewards, protecting the creatures and habitats
                        entrusted to our care."
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>Active Pledges: 12,847</span>
                        <span>Conservation Actions: 45,600</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                      <h4 className="font-semibold mb-2">
                        ☪️ Islamic Mercy Covenant
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        "Following Prophet Muhammad's (PBUH) example of mercy to
                        all creatures, we pledge to protect Allah's creation."
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>Active Pledges: 8,934</span>
                        <span>Conservation Actions: 32,100</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                      <h4 className="font-semibold mb-2">
                        ✡️ Tikkun Olam - Repairing the World
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        "Through Tza'ar ba'alei chayim (preventing animal
                        suffering), we fulfill our sacred duty to repair the
                        world."
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>Active Pledges: 5,623</span>
                        <span>Conservation Actions: 21,400</span>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-red-50">
                      <h4 className="font-semibold mb-2">
                        🕉️ Indigenous Sacred Kinship
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        "Honoring the sacred relationship with our animal
                        relatives and protecting the Earth Mother for seven
                        generations."
                      </p>
                      <div className="flex justify-between text-sm">
                        <span>Active Pledges: 3,456</span>
                        <span>Conservation Actions: 18,900</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Wildlife Ambassadors Tab */}
          <TabsContent value="ambassadors" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-4">
                Wildlife Ambassador Program
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Each region's keystone species serves as ambassador for peace.
                Their health reflects our harmony with creation.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {keyStoneSpecies.map((species) => (
                <Card key={species.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold">
                              {species.name}
                            </h3>
                            <p className="text-lg italic text-gray-600">
                              "{species.spiritualName}"
                            </p>
                            <p className="text-sm text-gray-500">
                              {species.region}
                            </p>
                          </div>
                          <Badge
                            variant={
                              species.status === "Critically Endangered"
                                ? "destructive"
                                : "default"
                            }
                            className="text-lg px-3 py-1"
                          >
                            {species.status}
                          </Badge>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <p className="text-sm italic text-blue-800 font-medium">
                            "{species.scripture}"
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Population:
                            </span>
                            <span className="text-sm">
                              {species.population.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Peace Guardians:
                            </span>
                            <span className="text-sm">
                              {species.peacekeepers.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              Conservation Actions:
                            </span>
                            <span className="text-sm">
                              {species.conservationActions}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">
                              PeaceCoins Earned:
                            </span>
                            <span className="text-sm">
                              {species.peaceCoinsEarned.toLocaleString()} PC
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">
                          Recent Peace Events
                        </h4>
                        <div className="space-y-2 mb-4">
                          {species.recentEvents.map((event, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span>{event}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-amber-50 p-4 rounded-lg mb-4">
                          <h5 className="font-medium mb-2">
                            Cultural Significance
                          </h5>
                          <p className="text-sm text-gray-700">
                            {species.culturalSignificance}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Button
                            className="w-full bg-gradient-to-r from-green-500 to-blue-500"
                            onClick={() => handleSpeciesAdoption(species.name)}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Adopt as Spirit Guardian - 100 PC
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Camera className="w-4 h-4 mr-2" />
                            View Live Habitat Cam
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sacred Habitats Tab */}
          <TabsContent value="habitats" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-4">Sacred Habitat Zones</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Blockchain-protected sanctuaries blessed by spiritual
                communities and defended by divine covenant.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {sacredHabitats.map((habitat) => (
                <Card key={habitat.id} className="bg-white/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">
                          {habitat.name}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {habitat.location} • {habitat.size}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Shield className="w-4 h-4 mr-1 text-green-600" />
                            {habitat.protectionLevel}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-blue-600" />
                            {habitat.protectedSpecies} species
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          habitat.status === "Blessed Protection"
                            ? "secondary"
                            : "default"
                        }
                        className="text-sm"
                      >
                        {habitat.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">
                          Spiritual Protection
                        </h4>
                        <div className="bg-purple-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-purple-800 font-medium">
                            {habitat.spiritualSignificance}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Last Blessing:</span>
                            <span>{habitat.lastBlessing}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Threats Detected:</span>
                            <span
                              className={
                                habitat.threatsDetected === 0
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }
                            >
                              {habitat.threatsDetected}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Guardian Network</h4>
                        <div className="space-y-2 mb-4">
                          {habitat.guardians.map((guardian, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm">{guardian}</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <p className="text-xs font-mono text-gray-600">
                            Blockchain TX: {habitat.blockchainTx}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-4">
                      <Button
                        onClick={() => handleHabitatBless(habitat.name)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Send Blessing - 50 PC
                      </Button>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Monitor Live
                      </Button>
                      <Button variant="outline">
                        <MapPin className="w-4 h-4 mr-2" />
                        View on Map
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wildlife DAO Tab */}
          <TabsContent value="dao" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-4">
                Wildlife DAO - Voice for the Voiceless
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Representing wildlife through human guardians, voting with both
                metrics and ethics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Coins className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="font-bold text-2xl">
                    {wildlifeDAO.treasuryBalance}
                  </h3>
                  <p className="text-gray-600">Treasury Balance</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-bold text-2xl">
                    {wildlifeDAO.activeGuardians.toLocaleString()}
                  </h3>
                  <p className="text-gray-600">Active Guardians</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Leaf className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold text-2xl">
                    {wildlifeDAO.speciesRepresented}
                  </h3>
                  <p className="text-gray-600">Species Represented</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Active Proposals</h3>
              {wildlifeDAO.activeProposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg mb-2">
                          {proposal.title}
                        </h4>
                        <p className="text-gray-700 mb-3">
                          {proposal.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Species: {proposal.species}</span>
                          <span>Timeline: {proposal.timeline}</span>
                          <span>Funding: {proposal.funding}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg mb-4">
                      <p className="text-sm">
                        <strong>Spiritual Backing:</strong>{" "}
                        {proposal.spiritualBacking}
                      </p>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Approval Rate</span>
                        <span>
                          {proposal.approval}% (
                          {proposal.votes.toLocaleString()} votes)
                        </span>
                      </div>
                      <Progress value={proposal.approval} className="h-3" />
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleDAOVote(proposal.title)}
                        className="bg-gradient-to-r from-green-500 to-blue-500"
                      >
                        Vote Support - 25 PC
                      </Button>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Covenant Mode Tab */}
          <TabsContent value="covenant" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Covenant Mode - Sacred Reflections
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Spiritual contemplations on peace with creation, guided by
                sacred texts and indigenous wisdom.
              </p>
            </div>

            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <BookOpen className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">
                    Today's Sacred Teaching
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold mb-4">📖 Scripture Meditation</h4>
                    <div className="bg-white p-6 rounded-lg mb-4">
                      <p className="text-lg italic text-gray-800 mb-4">
                        "Are not two sparrows sold for a penny? Yet not one of
                        them will fall to the ground outside your Father's
                        care."
                      </p>
                      <p className="text-sm text-gray-600">- Matthew 10:29</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg">
                      <h5 className="font-semibold mb-2">
                        Reflection Questions
                      </h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• How does divine care extend to all creation?</li>
                        <li>• What is our role as stewards of this care?</li>
                        <li>• How can we protect the sparrows today?</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-4">🌿 Indigenous Wisdom</h4>
                    <div className="bg-white p-6 rounded-lg mb-4">
                      <p className="text-lg italic text-gray-800 mb-4">
                        "We do not inherit the earth from our ancestors; we
                        borrow it from our children."
                      </p>
                      <p className="text-sm text-gray-600">
                        - Native American Proverb
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg">
                      <h5 className="font-semibold mb-2">Action Steps</h5>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li>• Consider the seven generations to come</li>
                        <li>• Honor the wisdom of indigenous guardians</li>
                        <li>• Practice gratitude for Earth's gifts</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button
                    onClick={() =>
                      handleEarnPeaceCoins(
                        50,
                        "Covenant mode spiritual reflection",
                      )
                    }
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Complete Sacred Reflection - Earn 50 PC
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Multi-Faith Integration */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">✝️</div>
                  <h4 className="font-bold mb-2">Christian Stewardship</h4>
                  <p className="text-sm text-gray-700">
                    Genesis mandate to tend and protect God's garden
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-100">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">☪️</div>
                  <h4 className="font-bold mb-2">Islamic Mercy</h4>
                  <p className="text-sm text-gray-700">
                    Following Prophet's (PBUH) compassion to all creatures
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-violet-100">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🕉️</div>
                  <h4 className="font-bold mb-2">Ahimsa Practice</h4>
                  <p className="text-sm text-gray-700">
                    Hindu/Buddhist non-violence toward all beings
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-100">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🦅</div>
                  <h4 className="font-bold mb-2">Indigenous Kinship</h4>
                  <p className="text-sm text-gray-700">
                    Sacred relationship with animal relatives
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
