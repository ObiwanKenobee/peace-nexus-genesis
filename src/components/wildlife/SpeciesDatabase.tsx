import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Save,
  X,
  Trash2,
  Eye,
  Heart,
  Star,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Camera,
  BookOpen,
  Users,
  Globe,
  Zap,
  Brain,
  BarChart3,
  Target,
  Clock,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  TreePine,
  Mountain,
  Waves,
  Leaf,
  Bug,
  Fish,
  Bird,
  Rabbit,
  Crown,
  Shield,
  Coins,
} from "lucide-react";

interface Species {
  id: string;
  name: string;
  scientificName: string;
  spiritualName: string;
  category: "mammal" | "bird" | "marine" | "insect" | "plant" | "tree";
  conservationStatus:
    | "Least Concern"
    | "Near Threatened"
    | "Vulnerable"
    | "Endangered"
    | "Critically Endangered"
    | "Extinct";
  population: number;
  populationTrend: "increasing" | "stable" | "decreasing" | "unknown";
  habitat: string[];
  primaryLocation: string;
  threats: string[];
  conservationActions: string[];
  culturalSignificance: string;
  scripturalReferences: { faith: string; text: string }[];
  guardians: number;
  peaceCoinsGenerated: number;
  lastUpdated: string;
  imageUrl: string;
  facts: string[];
  keystone: boolean;
  endemic: boolean;
  migrates: boolean;
  aiInsights: {
    threatLevel: number;
    recoveryPotential: number;
    humanConflictRisk: number;
    climateSensitivity: number;
    prediction: string;
    actionRecommendations: string[];
  };
  communityReports: CommunityReport[];
  researchPapers: ResearchPaper[];
  liveData: LiveData;
}

interface CommunityReport {
  id: string;
  reporterId: string;
  reporterName: string;
  type: "sighting" | "threat" | "rescue" | "behavior" | "habitat_change";
  title: string;
  description: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  timestamp: string;
  verified: boolean;
  images?: string[];
  impact: "low" | "medium" | "high" | "critical";
}

interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  publishDate: string;
  doi: string;
  abstract: string;
  keyFindings: string[];
  relevanceScore: number;
}

interface LiveData {
  lastSighting: string;
  activeCameras: number;
  recentBehaviors: string[];
  environmentalConditions: {
    temperature: number;
    humidity: number;
    rainfall: number;
    habitatHealth: number;
  };
  migrationStatus?: {
    currentLocation: string;
    progress: number;
    arrivalEstimate: string;
  };
}

// Mock species data with AI insights
const mockSpeciesData: Species[] = [
  {
    id: "species-001",
    name: "Snow Leopard",
    scientificName: "Panthera uncia",
    spiritualName: "The Mountain Guardian",
    category: "mammal",
    conservationStatus: "Vulnerable",
    population: 4000,
    populationTrend: "stable",
    habitat: ["Mountain slopes", "Alpine meadows", "Rocky outcrops"],
    primaryLocation: "Central Asian Mountains",
    threats: [
      "Climate change",
      "Human-wildlife conflict",
      "Poaching",
      "Habitat fragmentation",
    ],
    conservationActions: [
      "Protected areas",
      "Community-based conservation",
      "Anti-poaching patrols",
      "Livestock insurance",
    ],
    culturalSignificance:
      "Revered as protector of high places in Buddhist and Himalayan traditions",
    scripturalReferences: [
      {
        faith: "Christianity",
        text: "He makes my feet like deer's feet, and sets me on my high places - 2 Samuel 22:34",
      },
      {
        faith: "Buddhism",
        text: "The mountain spirit watches over all who dwell in the heights with compassion",
      },
    ],
    guardians: 1256,
    peaceCoinsGenerated: 8900,
    lastUpdated: "2024-02-15T10:30:00Z",
    imageUrl: "/species/snow-leopard.jpg",
    facts: [
      "Can leap up to 50 feet horizontally",
      "Tail is nearly as long as their body for balance",
      "Cannot roar due to different vocal cord structure",
      "Perfectly adapted to extreme cold with thick fur",
    ],
    keystone: true,
    endemic: false,
    migrates: false,
    aiInsights: {
      threatLevel: 75,
      recoveryPotential: 65,
      humanConflictRisk: 80,
      climateSensitivity: 85,
      prediction:
        "Climate change poses severe threat as snow lines retreat. Population stable but range shrinking. Increased human encounters predicted in next 5 years.",
      actionRecommendations: [
        "Establish climate corridors at higher altitudes",
        "Expand livestock insurance programs",
        "Deploy AI-powered early warning systems for herder-leopard encounters",
        "Create sacred snow leopard reserves with monastery partnerships",
      ],
    },
    communityReports: [
      {
        id: "report-001",
        reporterId: "user-123",
        reporterName: "Tenzin Norbu",
        type: "sighting",
        title: "Snow Leopard Family Spotted",
        description:
          "Mother with two cubs seen near monastery at dawn. They appeared healthy and unstressed.",
        location: "Ladakh, India",
        coordinates: { lat: 34.1526, lng: 77.5771 },
        timestamp: "2024-02-14T06:15:00Z",
        verified: true,
        images: ["/reports/snow-leopard-family.jpg"],
        impact: "medium",
      },
    ],
    researchPapers: [
      {
        id: "paper-001",
        title: "Climate Change Impacts on Snow Leopard Habitat",
        authors: ["Dr. Sarah Johnson", "Dr. Rinchen Dorje"],
        journal: "Conservation Biology",
        publishDate: "2024-01-15",
        doi: "10.1111/cobi.14123",
        abstract:
          "Analysis of habitat changes in Central Asian mountains over past 20 years...",
        keyFindings: [
          "Habitat loss of 23% due to warming temperatures",
          "Prey species declining in lower elevations",
          "Increased human-leopard encounters near settlements",
        ],
        relevanceScore: 95,
      },
    ],
    liveData: {
      lastSighting: "2024-02-14T06:15:00Z",
      activeCameras: 23,
      recentBehaviors: ["Hunting", "Territory marking", "Cub teaching"],
      environmentalConditions: {
        temperature: -15,
        humidity: 45,
        rainfall: 2.3,
        habitatHealth: 78,
      },
    },
  },
  {
    id: "species-002",
    name: "Monarch Butterfly",
    scientificName: "Danaus plexippus",
    spiritualName: "The Resurrection Messenger",
    category: "insect",
    conservationStatus: "Critically Endangered",
    population: 35000000,
    populationTrend: "decreasing",
    habitat: ["Milkweed meadows", "Gardens", "Roadsides", "Forest edges"],
    primaryLocation: "North America",
    threats: [
      "Habitat loss",
      "Pesticide use",
      "Climate change",
      "Deforestation in overwintering sites",
    ],
    conservationActions: [
      "Milkweed planting",
      "Pesticide reduction",
      "Overwintering site protection",
      "Migration corridor restoration",
    ],
    culturalSignificance:
      "Symbol of transformation, resurrection, and divine guidance in many cultures",
    scripturalReferences: [
      {
        faith: "Christianity",
        text: "Consider the lilies of the field... even Solomon in all his glory was not arrayed like one of these - Matthew 6:28-29",
      },
      {
        faith: "Indigenous",
        text: "The butterfly carries prayers to the Great Spirit on painted wings",
      },
    ],
    guardians: 3456,
    peaceCoinsGenerated: 15600,
    lastUpdated: "2024-02-15T14:20:00Z",
    imageUrl: "/species/monarch-butterfly.jpg",
    facts: [
      "Migrates up to 3,000 miles each fall",
      "Uses magnetic fields and sun position for navigation",
      "Lives through 4 generations during migration cycle",
      "Cannot survive freezing temperatures",
    ],
    keystone: false,
    endemic: false,
    migrates: true,
    aiInsights: {
      threatLevel: 95,
      recoveryPotential: 70,
      humanConflictRisk: 30,
      climateSensitivity: 90,
      prediction:
        "Critical population decline continues. Migration patterns disrupted by extreme weather. Without immediate action, species faces local extinctions.",
      actionRecommendations: [
        "Emergency milkweed corridor establishment",
        "Climate-adaptive planting strategies",
        "Citizen science monitoring expansion",
        "Cross-border conservation cooperation with Mexico",
      ],
    },
    communityReports: [
      {
        id: "report-002",
        reporterId: "user-456",
        reporterName: "Maria Rodriguez",
        type: "habitat_change",
        title: "Milkweed Habitat Restored",
        description:
          "Local school planted 500 milkweed plants along highway corridor",
        location: "Texas, USA",
        timestamp: "2024-02-13T16:30:00Z",
        verified: true,
        impact: "high",
      },
    ],
    researchPapers: [],
    liveData: {
      lastSighting: "2024-02-15T12:45:00Z",
      activeCameras: 15,
      recentBehaviors: ["Nectar feeding", "Egg laying", "Northward migration"],
      environmentalConditions: {
        temperature: 22,
        humidity: 65,
        rainfall: 1.2,
        habitatHealth: 52,
      },
      migrationStatus: {
        currentLocation: "Central Texas",
        progress: 35,
        arrivalEstimate: "2024-04-15",
      },
    },
  },
];

export default function SpeciesDatabase() {
  const [species, setSpecies] = useState<Species[]>(mockSpeciesData);
  const [filteredSpecies, setFilteredSpecies] =
    useState<Species[]>(mockSpeciesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddSpecies, setShowAddSpecies] = useState(false);
  const [newSpecies, setNewSpecies] = useState<Partial<Species>>({});
  const [newReport, setNewReport] = useState<Partial<CommunityReport>>({});
  const [showAddReport, setShowAddReport] = useState(false);

  // Filter and search functionality
  useEffect(() => {
    let filtered = species;

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.spiritualName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (s) => s.conservationStatus === selectedStatus,
      );
    }

    setFilteredSpecies(filtered);
  }, [species, searchTerm, selectedCategory, selectedStatus]);

  const handleAddSpecies = () => {
    if (newSpecies.name && newSpecies.scientificName && newSpecies.category) {
      const species: Species = {
        id: `species-${Date.now()}`,
        name: newSpecies.name,
        scientificName: newSpecies.scientificName,
        spiritualName: newSpecies.spiritualName || "",
        category: newSpecies.category,
        conservationStatus: newSpecies.conservationStatus || "Least Concern",
        population: newSpecies.population || 0,
        populationTrend: newSpecies.populationTrend || "unknown",
        habitat: newSpecies.habitat || [],
        primaryLocation: newSpecies.primaryLocation || "",
        threats: newSpecies.threats || [],
        conservationActions: newSpecies.conservationActions || [],
        culturalSignificance: newSpecies.culturalSignificance || "",
        scripturalReferences: newSpecies.scripturalReferences || [],
        guardians: 0,
        peaceCoinsGenerated: 0,
        lastUpdated: new Date().toISOString(),
        imageUrl: newSpecies.imageUrl || "/species/placeholder.jpg",
        facts: newSpecies.facts || [],
        keystone: newSpecies.keystone || false,
        endemic: newSpecies.endemic || false,
        migrates: newSpecies.migrates || false,
        aiInsights: {
          threatLevel: 50,
          recoveryPotential: 50,
          humanConflictRisk: 30,
          climateSensitivity: 50,
          prediction: "AI analysis pending...",
          actionRecommendations: [],
        },
        communityReports: [],
        researchPapers: [],
        liveData: {
          lastSighting: new Date().toISOString(),
          activeCameras: 0,
          recentBehaviors: [],
          environmentalConditions: {
            temperature: 20,
            humidity: 50,
            rainfall: 0,
            habitatHealth: 50,
          },
        },
      };

      setSpecies((prev) => [...prev, species]);
      setNewSpecies({});
      setShowAddSpecies(false);
      console.log("New species added:", species);
    }
  };

  const handleAddReport = () => {
    if (newReport.title && newReport.description && selectedSpecies) {
      const report: CommunityReport = {
        id: `report-${Date.now()}`,
        reporterId: "current-user",
        reporterName: "Current User",
        type: newReport.type || "sighting",
        title: newReport.title,
        description: newReport.description,
        location: newReport.location || "",
        timestamp: new Date().toISOString(),
        verified: false,
        impact: newReport.impact || "medium",
      };

      setSpecies((prev) =>
        prev.map((s) =>
          s.id === selectedSpecies.id
            ? { ...s, communityReports: [...s.communityReports, report] }
            : s,
        ),
      );

      // Update selected species to reflect new report
      setSelectedSpecies((prev) =>
        prev
          ? {
              ...prev,
              communityReports: [...prev.communityReports, report],
            }
          : null,
      );

      setNewReport({});
      setShowAddReport(false);
      console.log("New report added:", report);
    }
  };

  const handleDeleteSpecies = (speciesId: string) => {
    setSpecies((prev) => prev.filter((s) => s.id !== speciesId));
    if (selectedSpecies?.id === speciesId) {
      setSelectedSpecies(null);
    }
    console.log("Species deleted:", speciesId);
  };

  const handleBecomeguardian = (speciesId: string) => {
    setSpecies((prev) =>
      prev.map((s) =>
        s.id === speciesId
          ? {
              ...s,
              guardians: s.guardians + 1,
              peaceCoinsGenerated: s.peaceCoinsGenerated + 100,
            }
          : s,
      ),
    );
    console.log("Became guardian of species:", speciesId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Least Concern":
        return "bg-green-100 text-green-800";
      case "Near Threatened":
        return "bg-yellow-100 text-yellow-800";
      case "Vulnerable":
        return "bg-orange-100 text-orange-800";
      case "Endangered":
        return "bg-red-100 text-red-800";
      case "Critically Endangered":
        return "bg-red-200 text-red-900";
      case "Extinct":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mammal":
        return Rabbit;
      case "bird":
        return Bird;
      case "marine":
        return Fish;
      case "insect":
        return Bug;
      case "plant":
        return Leaf;
      case "tree":
        return TreePine;
      default:
        return Globe;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return TrendingUp;
      case "decreasing":
        return TrendingDown;
      case "stable":
        return Target;
      default:
        return Target;
    }
  };

  const categories = [
    "all",
    "mammal",
    "bird",
    "marine",
    "insect",
    "plant",
    "tree",
  ];
  const statuses = [
    "all",
    "Least Concern",
    "Near Threatened",
    "Vulnerable",
    "Endangered",
    "Critically Endangered",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Species Database</h1>
          <p className="text-gray-600">
            AI-powered wildlife conservation database with community insights
          </p>
        </div>
        <Button onClick={() => setShowAddSpecies(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Species
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search species by name, scientific name, or spiritual name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All Categories"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All Statuses" : status}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Add New Species Modal */}
      {showAddSpecies && (
        <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Add New Species</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Common name"
                value={newSpecies.name || ""}
                onChange={(e) =>
                  setNewSpecies((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <Input
                placeholder="Scientific name"
                value={newSpecies.scientificName || ""}
                onChange={(e) =>
                  setNewSpecies((prev) => ({
                    ...prev,
                    scientificName: e.target.value,
                  }))
                }
              />
              <Input
                placeholder="Spiritual name"
                value={newSpecies.spiritualName || ""}
                onChange={(e) =>
                  setNewSpecies((prev) => ({
                    ...prev,
                    spiritualName: e.target.value,
                  }))
                }
              />
              <select
                value={newSpecies.category || ""}
                onChange={(e) =>
                  setNewSpecies((prev) => ({
                    ...prev,
                    category: e.target.value as any,
                  }))
                }
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="">Select category</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={newSpecies.conservationStatus || ""}
                onChange={(e) =>
                  setNewSpecies((prev) => ({
                    ...prev,
                    conservationStatus: e.target.value as any,
                  }))
                }
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="">Select status</option>
                {statuses.slice(1).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Primary location"
                value={newSpecies.primaryLocation || ""}
                onChange={(e) =>
                  setNewSpecies((prev) => ({
                    ...prev,
                    primaryLocation: e.target.value,
                  }))
                }
              />
            </div>
            <Textarea
              placeholder="Cultural significance"
              value={newSpecies.culturalSignificance || ""}
              onChange={(e) =>
                setNewSpecies((prev) => ({
                  ...prev,
                  culturalSignificance: e.target.value,
                }))
              }
              className="mt-4"
            />
            <div className="flex items-center space-x-3 mt-4">
              <Button onClick={handleAddSpecies}>
                <Save className="w-4 h-4 mr-2" />
                Add Species
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddSpecies(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Species List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredSpecies.map((speciesItem) => {
            const CategoryIcon = getCategoryIcon(speciesItem.category);
            const TrendIcon = getTrendIcon(speciesItem.populationTrend);

            return (
              <Card
                key={speciesItem.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedSpecies?.id === speciesItem.id
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => setSelectedSpecies(speciesItem)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <CategoryIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {speciesItem.name}
                        </h3>
                        <p className="text-gray-600 italic">
                          {speciesItem.scientificName}
                        </p>
                        <p className="text-sm text-purple-600 font-medium">
                          "{speciesItem.spiritualName}"
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge
                        className={getStatusColor(
                          speciesItem.conservationStatus,
                        )}
                      >
                        {speciesItem.conservationStatus}
                      </Badge>
                      {speciesItem.keystone && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Crown className="w-3 h-3 mr-1" />
                          Keystone
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {speciesItem.population.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 flex items-center justify-center">
                        <TrendIcon className="w-3 h-3 mr-1" />
                        Population
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {speciesItem.guardians}
                      </div>
                      <div className="text-xs text-gray-600">Guardians</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {speciesItem.aiInsights.threatLevel}%
                      </div>
                      <div className="text-xs text-gray-600">Threat Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">
                        {speciesItem.peaceCoinsGenerated}
                      </div>
                      <div className="text-xs text-gray-600">PC Generated</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {speciesItem.culturalSignificance}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {speciesItem.primaryLocation}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBecomeguardian(speciesItem.id);
                      }}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Become Guardian
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Species Detail Panel */}
        <div className="space-y-6">
          {selectedSpecies ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedSpecies.name}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteSpecies(selectedSpecies.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                      <TabsTrigger value="live-data">Live Data</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold">Scientific Name</h4>
                          <p className="text-sm text-gray-600">
                            {selectedSpecies.scientificName}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Spiritual Name</h4>
                          <p className="text-sm text-purple-600">
                            "{selectedSpecies.spiritualName}"
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            Cultural Significance
                          </h4>
                          <p className="text-sm text-gray-600">
                            {selectedSpecies.culturalSignificance}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Primary Threats</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedSpecies.threats.map((threat, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {threat}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">
                            Conservation Actions
                          </h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedSpecies.conservationActions.map(
                              (action, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-green-50"
                                >
                                  {action}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="ai-insights" className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <Brain className="w-5 h-5 text-purple-600" />
                          <h4 className="font-semibold">AI Analysis</h4>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">
                          {selectedSpecies.aiInsights.prediction}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Threat Level</span>
                              <span>
                                {selectedSpecies.aiInsights.threatLevel}%
                              </span>
                            </div>
                            <Progress
                              value={selectedSpecies.aiInsights.threatLevel}
                              className="h-2"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Recovery Potential</span>
                              <span>
                                {selectedSpecies.aiInsights.recoveryPotential}%
                              </span>
                            </div>
                            <Progress
                              value={
                                selectedSpecies.aiInsights.recoveryPotential
                              }
                              className="h-2"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Human Conflict Risk</span>
                              <span>
                                {selectedSpecies.aiInsights.humanConflictRisk}%
                              </span>
                            </div>
                            <Progress
                              value={
                                selectedSpecies.aiInsights.humanConflictRisk
                              }
                              className="h-2"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Climate Sensitivity</span>
                              <span>
                                {selectedSpecies.aiInsights.climateSensitivity}%
                              </span>
                            </div>
                            <Progress
                              value={
                                selectedSpecies.aiInsights.climateSensitivity
                              }
                              className="h-2"
                            />
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">
                            AI Recommendations
                          </h5>
                          <ul className="space-y-1">
                            {selectedSpecies.aiInsights.actionRecommendations.map(
                              (rec, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-gray-700 flex items-start"
                                >
                                  <Zap className="w-3 h-3 mr-2 mt-0.5 text-yellow-600 flex-shrink-0" />
                                  {rec}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="reports" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Community Reports</h4>
                        <Button
                          size="sm"
                          onClick={() => setShowAddReport(true)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Report
                        </Button>
                      </div>

                      {showAddReport && (
                        <Card className="border-dashed border-2 border-green-300 bg-green-50">
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <Input
                                placeholder="Report title"
                                value={newReport.title || ""}
                                onChange={(e) =>
                                  setNewReport((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                  }))
                                }
                              />
                              <Textarea
                                placeholder="Report description"
                                value={newReport.description || ""}
                                onChange={(e) =>
                                  setNewReport((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                  }))
                                }
                              />
                              <Input
                                placeholder="Location"
                                value={newReport.location || ""}
                                onChange={(e) =>
                                  setNewReport((prev) => ({
                                    ...prev,
                                    location: e.target.value,
                                  }))
                                }
                              />
                              <div className="flex space-x-2">
                                <Button size="sm" onClick={handleAddReport}>
                                  <Save className="w-4 h-4 mr-1" />
                                  Submit
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setShowAddReport(false)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <div className="space-y-3">
                        {selectedSpecies.communityReports.map((report) => (
                          <Card key={report.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium">{report.title}</h5>
                                <Badge
                                  variant={
                                    report.verified ? "default" : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {report.verified ? "Verified" : "Pending"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">
                                {report.description}
                              </p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{report.reporterName}</span>
                                <span>
                                  {new Date(
                                    report.timestamp,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="live-data" className="space-y-4">
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3">
                            Environmental Conditions
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Temperature</span>
                              <span className="font-medium">
                                {
                                  selectedSpecies.liveData
                                    .environmentalConditions.temperature
                                }
                                °C
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Humidity</span>
                              <span className="font-medium">
                                {
                                  selectedSpecies.liveData
                                    .environmentalConditions.humidity
                                }
                                %
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Rainfall</span>
                              <span className="font-medium">
                                {
                                  selectedSpecies.liveData
                                    .environmentalConditions.rainfall
                                }
                                mm
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Habitat Health</span>
                              <span className="font-medium">
                                {
                                  selectedSpecies.liveData
                                    .environmentalConditions.habitatHealth
                                }
                                %
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3">
                            Recent Activity
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Last Sighting</span>
                              <span className="font-medium">
                                {new Date(
                                  selectedSpecies.liveData.lastSighting,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Active Cameras</span>
                              <span className="font-medium">
                                {selectedSpecies.liveData.activeCameras}
                              </span>
                            </div>
                          </div>

                          <div className="mt-3">
                            <h5 className="text-sm font-medium mb-2">
                              Recent Behaviors
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {selectedSpecies.liveData.recentBehaviors.map(
                                (behavior, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {behavior}
                                  </Badge>
                                ),
                              )}
                            </div>
                          </div>
                        </div>

                        {selectedSpecies.liveData.migrationStatus && (
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-3">
                              Migration Status
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Current Location</span>
                                <span className="font-medium">
                                  {
                                    selectedSpecies.liveData.migrationStatus
                                      .currentLocation
                                  }
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span className="font-medium">
                                  {
                                    selectedSpecies.liveData.migrationStatus
                                      .progress
                                  }
                                  %
                                </span>
                              </div>
                              <Progress
                                value={
                                  selectedSpecies.liveData.migrationStatus
                                    .progress
                                }
                                className="h-2"
                              />
                              <div className="flex justify-between text-sm">
                                <span>Est. Arrival</span>
                                <span className="font-medium">
                                  {new Date(
                                    selectedSpecies.liveData.migrationStatus.arrivalEstimate,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Select a Species
                </h3>
                <p className="text-gray-500">
                  Choose a species from the list to view detailed information
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
