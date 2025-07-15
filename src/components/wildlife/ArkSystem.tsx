import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Ship,
  Heart,
  TreePine,
  Fish,
  Bird,
  Rabbit,
  Bug,
  Flower,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  CloudRain,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Globe,
  Shield,
  Users,
  Calendar,
  Camera,
  PlayCircle,
  BookOpen,
  Star,
  Crown,
  Zap,
} from "lucide-react";

const arkSpeciesData = {
  mammals: {
    icon: Rabbit,
    color: "from-orange-400 to-red-400",
    total: 5416,
    critical: 347,
    endangered: 892,
    vulnerable: 1245,
    stable: 2932,
    recentSaves: 23,
    examples: [
      "Snow Leopard",
      "African Elephant",
      "Pangolin",
      "Vaquita Porpoise",
    ],
  },
  birds: {
    icon: Bird,
    color: "from-blue-400 to-cyan-400",
    total: 10982,
    critical: 156,
    endangered: 423,
    vulnerable: 1876,
    stable: 8527,
    recentSaves: 34,
    examples: [
      "California Condor",
      "Kakapo",
      "Philippine Eagle",
      "Spoon-billed Sandpiper",
    ],
  },
  marine: {
    icon: Fish,
    color: "from-cyan-400 to-blue-400",
    total: 16748,
    critical: 892,
    endangered: 2341,
    vulnerable: 4567,
    stable: 8948,
    recentSaves: 67,
    examples: [
      "Bluefin Tuna",
      "Great White Shark",
      "Sea Turtle",
      "Coral Reefs",
    ],
  },
  insects: {
    icon: Bug,
    color: "from-green-400 to-emerald-400",
    total: 1000000,
    critical: 25000,
    endangered: 89000,
    vulnerable: 234000,
    stable: 652000,
    recentSaves: 156,
    examples: [
      "Monarch Butterfly",
      "Bumblebees",
      "Fireflies",
      "Madagascar Beetles",
    ],
  },
  plants: {
    icon: Flower,
    color: "from-pink-400 to-rose-400",
    total: 400000,
    critical: 12000,
    endangered: 45000,
    vulnerable: 123000,
    stable: 220000,
    recentSaves: 89,
    examples: [
      "Baobab Trees",
      "Ghost Orchid",
      "Venus Flytrap",
      "Ancient Redwoods",
    ],
  },
  trees: {
    icon: TreePine,
    color: "from-emerald-400 to-green-400",
    total: 60000,
    critical: 2300,
    endangered: 8900,
    vulnerable: 17800,
    stable: 31000,
    recentSaves: 45,
    examples: [
      "American Chestnut",
      "Wollemi Pine",
      "Dragon Blood Tree",
      "Hawaiian Sandalwood",
    ],
  },
};

const globalThreats = [
  {
    id: 1,
    threat: "Climate Change",
    severity: "Critical",
    speciesAffected: 234567,
    regions: ["Arctic", "Coral Reefs", "Mountain Ranges", "Tropical Forests"],
    spiritualResponse: "Prayer for Earth's Temperature Healing",
    actionTaken: "Carbon offset programs, renewable energy adoption",
    progress: 34,
  },
  {
    id: 2,
    threat: "Habitat Destruction",
    severity: "Critical",
    speciesAffected: 189234,
    regions: [
      "Amazon Rainforest",
      "Indonesian Palm Plantations",
      "African Savannas",
    ],
    spiritualResponse: "Sacred Land Protection Ceremonies",
    actionTaken: "Blockchain-protected reserves, indigenous land rights",
    progress: 67,
  },
  {
    id: 3,
    threat: "Ocean Pollution",
    severity: "High",
    speciesAffected: 156789,
    regions: ["Pacific Garbage Patch", "Mediterranean Sea", "Caribbean Waters"],
    spiritualResponse: "Blessing of Waters Ritual",
    actionTaken: "Ocean cleanup projects, plastic reduction campaigns",
    progress: 45,
  },
  {
    id: 4,
    threat: "Poaching & Trafficking",
    severity: "High",
    speciesAffected: 45623,
    regions: ["Africa", "Southeast Asia", "Central America"],
    spiritualResponse: "Guardian Angels Protection Prayer",
    actionTaken: "AI surveillance, community ranger programs",
    progress: 78,
  },
];

const arkMissions = [
  {
    id: 1,
    title: "Operation Phoenix - California Condor",
    species: "California Condor",
    currentPopulation: 518,
    targetPopulation: 1000,
    timeframe: "2025-2030",
    funding: "2.3M PC",
    spiritualBacking: "Native American blessing ceremonies",
    success: 89,
    miracles: [
      "First wild-born chick in 37 years",
      "Lead poisoning reduced by 67%",
      "Sacred nesting sites protected",
    ],
    nextMilestone: "Release 25 new birds in sacred canyon",
  },
  {
    id: 2,
    title: "Eden's Return - Monarch Migration",
    species: "Monarch Butterfly",
    currentPopulation: 35000000,
    targetPopulation: 100000000,
    timeframe: "2024-2027",
    funding: "1.8M PC",
    spiritualBacking: "Multi-denominational prayer gardens",
    success: 67,
    miracles: [
      "Milkweed corridors blessed by 12 faiths",
      "School children planted 2M seeds",
      "Mexico sanctuary expansion blessed",
    ],
    nextMilestone: "Complete Texas migration corridor",
  },
  {
    id: 3,
    title: "Leviathan's Song - Whale Recovery",
    species: "North Atlantic Right Whale",
    currentPopulation: 340,
    targetPopulation: 1000,
    timeframe: "2024-2035",
    funding: "4.1M PC",
    spiritualBacking: "Ocean blessing ceremonies",
    success: 43,
    miracles: [
      "Ship collision deaths reduced 45%",
      "New calves born in protected waters",
      "Indigenous whale songs recorded",
    ],
    nextMilestone: "Establish shipping lane modifications",
  },
];

const faithCommitments = [
  {
    faith: "Christianity",
    scripture: "Genesis 1:28 - Subdue and have dominion (steward responsibly)",
    pledges: 234567,
    actions: 892341,
    specialProjects: "Creation Care Network",
    recentWin: "Methodist churches adopt renewable energy",
  },
  {
    faith: "Islam",
    scripture:
      "Quran 6:38 - No creature in the earth or flying creature... but they are peoples like unto you",
    pledges: 189234,
    actions: 567823,
    specialProjects: "Islamic Society for Environmental Protection",
    recentWin: "Mosques become bird sanctuary networks",
  },
  {
    faith: "Judaism",
    scripture:
      "Deuteronomy 8:7-10 - A land of brooks, fountains, wheat and barley",
    pledges: 67834,
    actions: 234567,
    specialProjects: "Tikkun Olam Environmental Initiative",
    recentWin: "Synagogues host endangered seed banks",
  },
  {
    faith: "Buddhism",
    scripture:
      "All beings fear death and suffering - practice compassion to all",
    pledges: 156789,
    actions: 445672,
    specialProjects: "Mindful Conservation Network",
    recentWin: "Monasteries become wildlife refuges",
  },
  {
    faith: "Hinduism",
    scripture: "Bhumi Devi (Earth) is our mother, and we are her children",
    pledges: 298765,
    actions: 723456,
    specialProjects: "Sacred Grove Protection Movement",
    recentWin: "Temple forests legally protected",
  },
  {
    faith: "Indigenous",
    scripture: "We are caretakers of the land for seven generations",
    pledges: 78234,
    actions: 234567,
    specialProjects: "Traditional Knowledge Preservation",
    recentWin: "Land-back movement protects critical habitats",
  },
];

export default function ArkSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSpeciesSave = (species: string) => {
    console.log(`Committed to saving ${species}`);
  };

  const handleFaithPledge = (faith: string) => {
    console.log(`Joined ${faith} conservation pledge`);
  };

  const handleMissionSupport = (mission: string) => {
    console.log(`Supporting mission: ${mission}`);
  };

  return (
    <div className="space-y-8">
      {/* Ark Header */}
      <div className="text-center">
        <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
          <Ship className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">The Ark System</h1>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-6">
          "And of every living thing of all flesh, two of every sort shalt thou
          bring into the ark, to keep them alive with thee" - Genesis 7:19
        </p>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl max-w-3xl mx-auto">
          <p className="text-gray-800 font-medium">
            Modern Noah's Mission: Using technology, faith, and global
            cooperation to preserve every species for future generations.
          </p>
        </div>
      </div>

      {/* Species Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(arkSpeciesData).map(([category, data]) => {
          const Icon = data.icon;
          const survivalRate = ((data.stable / data.total) * 100).toFixed(1);
          const threatLevel = data.critical + data.endangered;

          return (
            <Card
              key={category}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedCategory === category
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(
                  category === selectedCategory ? null : category,
                )
              }
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 bg-gradient-to-r ${data.color} rounded-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {data.total.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Species</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold capitalize mb-4">
                  {category}
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Survival Rate</span>
                    <span className="font-medium">{survivalRate}%</span>
                  </div>
                  <Progress value={parseFloat(survivalRate)} className="h-3" />

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-red-600">Critical:</span>
                      <span>{data.critical.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-600">Endangered:</span>
                      <span>{data.endangered.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-600">Vulnerable:</span>
                      <span>{data.vulnerable.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Stable:</span>
                      <span>{data.stable.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Recent Saves</span>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span className="font-bold">{data.recentSaves}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedCategory === category && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-2">Priority Species</h4>
                    <div className="space-y-1">
                      {data.examples.map((species, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <span>{species}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeciesSave(species);
                            }}
                          >
                            <Heart className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Global Threats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <span>Global Threats to Creation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {globalThreats.map((threat) => (
              <div key={threat.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold">{threat.threat}</h4>
                  <Badge
                    variant={
                      threat.severity === "Critical" ? "destructive" : "default"
                    }
                  >
                    {threat.severity}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium">Species Affected: </span>
                    <span className="text-red-600">
                      {threat.speciesAffected.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-purple-800">
                      🙏 {threat.spiritualResponse}
                    </p>
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">Action Taken: </span>
                    <span>{threat.actionTaken}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{threat.progress}%</span>
                    </div>
                    <Progress value={threat.progress} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {threat.regions.map((region, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Ark Missions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-yellow-600" />
            <span>Active Ark Missions - Divine Interventions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {arkMissions.map((mission) => (
              <div
                key={mission.id}
                className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{mission.title}</h3>
                    <p className="text-gray-700 mb-2">
                      Species: {mission.species}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Timeline: {mission.timeframe}</span>
                      <span>Funding: {mission.funding}</span>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {mission.success}% Success
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-semibold mb-3">Population Recovery</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current:</span>
                        <span className="font-bold">
                          {mission.currentPopulation.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Target:</span>
                        <span className="font-bold">
                          {mission.targetPopulation.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={
                          (mission.currentPopulation /
                            mission.targetPopulation) *
                          100
                        }
                        className="h-3"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Recorded Miracles</h4>
                    <div className="space-y-1">
                      {mission.miracles.map((miracle, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          <span>{miracle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <p className="text-sm">
                    <strong>Spiritual Backing:</strong>{" "}
                    {mission.spiritualBacking}
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <p className="text-sm">
                    <strong>Next Milestone:</strong> {mission.nextMilestone}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleMissionSupport(mission.title)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Support Mission
                  </Button>
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Live Updates
                  </Button>
                  <Button variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Full Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Faith-Based Commitments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-600" />
            <span>Faith-Based Conservation Commitments</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faithCommitments.map((faith, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <h3 className="text-lg font-bold mb-3">{faith.faith}</h3>

                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="text-sm italic text-blue-800">
                    {faith.scripture}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Active Pledges:</span>
                    <span className="font-bold">
                      {faith.pledges.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Conservation Actions:</span>
                    <span className="font-bold text-green-600">
                      {faith.actions.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <p className="text-sm">
                    <strong>Special Project:</strong> {faith.specialProjects}
                  </p>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                  <p className="text-sm">
                    <strong>Recent Win:</strong> {faith.recentWin}
                  </p>
                </div>

                <Button
                  onClick={() => handleFaithPledge(faith.faith)}
                  className="w-full"
                  variant="outline"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Join {faith.faith} Pledge
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
        <CardContent className="p-8 text-center">
          <Ship className="w-16 h-16 mx-auto mb-6 text-white" />
          <h2 className="text-3xl font-bold mb-4">
            Join the Digital Ark Mission
          </h2>
          <p className="text-xl opacity-90 mb-6">
            Every species saved is a covenant kept. Every action taken is a
            prayer answered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Your Ark Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Users className="w-5 h-5 mr-2" />
              Find Your Faith Community
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
