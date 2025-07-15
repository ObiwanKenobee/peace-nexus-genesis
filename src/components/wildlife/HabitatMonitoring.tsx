import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  MapPin,
  Plus,
  Save,
  Edit,
  X,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Camera,
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
  Users,
  Upload,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Star,
  Flag,
  Brain,
  Bell,
  Send,
  Download,
  Share,
  Trash2,
  ExternalLink,
  Smartphone,
  Satellite,
  Radio,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";

interface HabitatSite {
  id: string;
  name: string;
  type:
    | "forest"
    | "wetland"
    | "grassland"
    | "marine"
    | "mountain"
    | "desert"
    | "urban";
  coordinates: { lat: number; lng: number };
  size: number; // in hectares
  protectionLevel: "none" | "partial" | "protected" | "sacred";
  description: string;
  keySpecies: string[];
  threats: string[];
  guardians: string[];
  lastInspection: string;
  healthScore: number;
  trendDirection: "improving" | "stable" | "declining";
  monitoringDevices: MonitoringDevice[];
  recentIncidents: Incident[];
  environmentalData: EnvironmentalData;
  communityReports: number;
  establishedDate: string;
  managementPlan?: string;
  imageUrl: string;
  virtualTourUrl?: string;
}

interface MonitoringDevice {
  id: string;
  type: "camera" | "sensor" | "gps_collar" | "acoustic" | "satellite" | "drone";
  name: string;
  status: "active" | "maintenance" | "offline" | "error";
  batteryLevel?: number;
  signalStrength?: number;
  lastUpdate: string;
  coordinates?: { lat: number; lng: number };
  dataPoints: number;
  alerts: number;
}

interface Incident {
  id: string;
  title: string;
  type:
    | "threat"
    | "poaching"
    | "habitat_damage"
    | "pollution"
    | "wildlife_conflict"
    | "natural_disaster"
    | "human_encroachment";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  reporterId: string;
  reporterName: string;
  reporterType:
    | "community_member"
    | "ranger"
    | "researcher"
    | "tourist"
    | "ai_system";
  timestamp: string;
  status:
    | "reported"
    | "investigating"
    | "action_taken"
    | "resolved"
    | "escalated";
  priority: number; // 1-10
  affectedSpecies?: string[];
  evidenceFiles: string[];
  responseActions: ResponseAction[];
  verifiedBy?: string;
  estimatedDamage?: string;
  resolutionNotes?: string;
  followUpRequired: boolean;
}

interface ResponseAction {
  id: string;
  action: string;
  assignedTo: string;
  deadline: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  notes?: string;
  completedAt?: string;
}

interface EnvironmentalData {
  temperature: {
    current: number;
    trend: "rising" | "stable" | "falling";
    weekly_avg: number;
    monthly_avg: number;
  };
  humidity: {
    current: number;
    trend: "rising" | "stable" | "falling";
    weekly_avg: number;
  };
  precipitation: {
    daily: number;
    weekly: number;
    monthly: number;
    trend: "increasing" | "stable" | "decreasing";
  };
  airQuality: {
    aqi: number;
    status: "good" | "moderate" | "unhealthy" | "hazardous";
    pollutants: { type: string; level: number }[];
  };
  vegetationHealth: {
    ndvi: number; // Normalized Difference Vegetation Index
    coverage: number;
    trend: "improving" | "stable" | "degrading";
  };
  wildlifeActivity: {
    species_count: number;
    activity_level: "high" | "normal" | "low";
    migration_status?: string;
    breeding_indicators: boolean;
  };
}

// Mock data
const mockHabitatSites: HabitatSite[] = [
  {
    id: "habitat-001",
    name: "Maasai Mara Elephant Corridor",
    type: "grassland",
    coordinates: { lat: -1.5, lng: 35.0 },
    size: 1200,
    protectionLevel: "sacred",
    description:
      "Critical elephant migration corridor connecting Maasai Mara to Amboseli, blessed by tribal elders and protected through blockchain covenant.",
    keySpecies: ["African Elephant", "Lion", "Zebra", "Wildebeest"],
    threats: ["Human encroachment", "Drought", "Poaching"],
    guardians: ["Maasai Community", "Kenya Wildlife Service", "PAXIS Rangers"],
    lastInspection: "2024-02-14T10:30:00Z",
    healthScore: 85,
    trendDirection: "stable",
    monitoringDevices: [
      {
        id: "device-001",
        type: "camera",
        name: "Waterhole Cam 1",
        status: "active",
        batteryLevel: 78,
        signalStrength: 85,
        lastUpdate: "2024-02-15T08:45:00Z",
        coordinates: { lat: -1.5023, lng: 35.0012 },
        dataPoints: 15642,
        alerts: 3,
      },
      {
        id: "device-002",
        type: "sensor",
        name: "Weather Station Alpha",
        status: "active",
        batteryLevel: 92,
        signalStrength: 78,
        lastUpdate: "2024-02-15T09:00:00Z",
        dataPoints: 8934,
        alerts: 0,
      },
    ],
    recentIncidents: [
      {
        id: "incident-001",
        title: "Elephant Family Blocked by Fence",
        type: "human_encroachment",
        severity: "medium",
        description:
          "A family of elephants was observed struggling to cross a newly erected fence along their traditional migration route.",
        location: "Northern boundary near Kimana Gate",
        coordinates: { lat: -1.4956, lng: 35.0234 },
        reporterId: "user-123",
        reporterName: "Joseph Sankale",
        reporterType: "community_member",
        timestamp: "2024-02-13T16:20:00Z",
        status: "investigating",
        priority: 7,
        affectedSpecies: ["African Elephant"],
        evidenceFiles: [
          "/evidence/fence-blocking.jpg",
          "/evidence/elephant-tracks.jpg",
        ],
        responseActions: [
          {
            id: "action-001",
            action: "Contact fence owner for removal",
            assignedTo: "Community Liaison Officer",
            deadline: "2024-02-16T18:00:00Z",
            status: "in_progress",
          },
        ],
        followUpRequired: true,
      },
    ],
    environmentalData: {
      temperature: {
        current: 28,
        trend: "rising",
        weekly_avg: 26,
        monthly_avg: 25,
      },
      humidity: {
        current: 65,
        trend: "stable",
        weekly_avg: 63,
      },
      precipitation: {
        daily: 0,
        weekly: 12,
        monthly: 45,
        trend: "decreasing",
      },
      airQuality: {
        aqi: 42,
        status: "good",
        pollutants: [
          { type: "PM2.5", level: 8 },
          { type: "CO", level: 0.5 },
        ],
      },
      vegetationHealth: {
        ndvi: 0.72,
        coverage: 85,
        trend: "stable",
      },
      wildlifeActivity: {
        species_count: 23,
        activity_level: "normal",
        migration_status: "peak_season",
        breeding_indicators: false,
      },
    },
    communityReports: 45,
    establishedDate: "2018-03-15",
    imageUrl: "/habitats/maasai-mara.jpg",
    virtualTourUrl: "/tours/maasai-mara-360",
  },
];

const mockIncidents: Incident[] = [
  {
    id: "incident-002",
    title: "Illegal Logging Detected",
    type: "habitat_damage",
    severity: "high",
    description:
      "Satellite imagery shows unauthorized tree cutting in protected forest section. Estimated 50+ trees removed in past week.",
    location: "Amazon Dolphin Sanctuary - Sector 7",
    coordinates: { lat: -3.4653, lng: -62.2159 },
    reporterId: "ai-system",
    reporterName: "AI Forest Monitor",
    reporterType: "ai_system",
    timestamp: "2024-02-14T23:45:00Z",
    status: "escalated",
    priority: 9,
    affectedSpecies: ["Amazon River Dolphin", "Jaguar", "Harpy Eagle"],
    evidenceFiles: [
      "/evidence/satellite-logging.jpg",
      "/evidence/before-after.jpg",
    ],
    responseActions: [
      {
        id: "action-002",
        action: "Deploy ranger patrol to investigate",
        assignedTo: "Ranger Team Delta",
        deadline: "2024-02-16T08:00:00Z",
        status: "in_progress",
      },
      {
        id: "action-003",
        action: "Coordinate with local authorities",
        assignedTo: "Legal Affairs Department",
        deadline: "2024-02-17T12:00:00Z",
        status: "pending",
      },
    ],
    followUpRequired: true,
    estimatedDamage: "High - Critical habitat disruption",
  },
];

export default function HabitatMonitoring() {
  const [habitats, setHabitats] = useState<HabitatSite[]>(mockHabitatSites);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedHabitat, setSelectedHabitat] = useState<HabitatSite | null>(
    habitats[0],
  );
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null,
  );
  const [isReporting, setIsReporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  const [newIncident, setNewIncident] = useState<Partial<Incident>>({
    type: "threat",
    severity: "medium",
    reporterType: "community_member",
    status: "reported",
    priority: 5,
    evidenceFiles: [],
    responseActions: [],
    followUpRequired: false,
  });

  const handleCreateIncident = () => {
    if (newIncident.title && newIncident.description && newIncident.location) {
      const incident: Incident = {
        id: `incident-${Date.now()}`,
        title: newIncident.title,
        type: newIncident.type || "threat",
        severity: newIncident.severity || "medium",
        description: newIncident.description,
        location: newIncident.location,
        coordinates: newIncident.coordinates,
        reporterId: "current-user",
        reporterName: "Current User",
        reporterType: newIncident.reporterType || "community_member",
        timestamp: new Date().toISOString(),
        status: "reported",
        priority: newIncident.priority || 5,
        affectedSpecies: newIncident.affectedSpecies || [],
        evidenceFiles: newIncident.evidenceFiles || [],
        responseActions: [],
        followUpRequired: newIncident.followUpRequired || false,
      };

      setIncidents((prev) => [...prev, incident]);
      setNewIncident({
        type: "threat",
        severity: "medium",
        reporterType: "community_member",
        status: "reported",
        priority: 5,
        evidenceFiles: [],
        responseActions: [],
        followUpRequired: false,
      });
      setIsReporting(false);
      console.log("New incident created:", incident);
    }
  };

  const handleUpdateIncidentStatus = (
    incidentId: string,
    newStatus: string,
  ) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId ? { ...inc, status: newStatus as any } : inc,
      ),
    );
    console.log("Incident status updated:", incidentId, newStatus);
  };

  const handleAddResponseAction = (incidentId: string, action: string) => {
    const newAction: ResponseAction = {
      id: `action-${Date.now()}`,
      action,
      assignedTo: "Current User",
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "pending",
    };

    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? { ...inc, responseActions: [...inc.responseActions, newAction] }
          : inc,
      ),
    );
    console.log("Response action added:", newAction);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "maintenance":
        return "text-yellow-600";
      case "offline":
        return "text-red-600";
      case "error":
        return "text-red-800";
      default:
        return "text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "forest":
        return TreePine;
      case "wetland":
        return Droplets;
      case "grassland":
        return Leaf;
      case "marine":
        return Waves;
      case "mountain":
        return Mountain;
      case "desert":
        return Sun;
      case "urban":
        return Users;
      default:
        return Globe;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "camera":
        return Camera;
      case "sensor":
        return Radio;
      case "gps_collar":
        return MapPin;
      case "acoustic":
        return Volume2;
      case "satellite":
        return Satellite;
      case "drone":
        return Zap;
      default:
        return Wifi;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return TrendingUp;
      case "declining":
        return TrendingDown;
      case "stable":
        return Target;
      default:
        return Target;
    }
  };

  const filteredIncidents = incidents.filter((inc) => {
    const matchesSearch =
      inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || inc.type === filterType;
    const matchesSeverity =
      filterSeverity === "all" || inc.severity === filterSeverity;

    return matchesSearch && matchesType && matchesSeverity;
  });

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Habitat Monitoring System</h1>
          <p className="text-gray-600">
            Real-time habitat monitoring and incident reporting for wildlife
            conservation
          </p>
        </div>
        <Button onClick={() => setIsReporting(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Report Incident
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">{habitats.length}</h3>
            <p className="text-gray-600">Monitored Sites</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              {incidents.filter((i) => i.status !== "resolved").length}
            </h3>
            <p className="text-gray-600">Active Incidents</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Camera className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              {habitats.reduce(
                (total, habitat) => total + habitat.monitoringDevices.length,
                0,
              )}
            </h3>
            <p className="text-gray-600">Monitoring Devices</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              {habitats.reduce(
                (total, habitat) => total + habitat.communityReports,
                0,
              )}
            </h3>
            <p className="text-gray-600">Community Reports</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Incident Modal */}
      {isReporting && (
        <Card className="border-2 border-red-300 bg-red-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Report New Incident</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Incident title"
                  value={newIncident.title || ""}
                  onChange={(e) =>
                    setNewIncident((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Location"
                  value={newIncident.location || ""}
                  onChange={(e) =>
                    setNewIncident((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </div>

              <Textarea
                placeholder="Detailed description of the incident"
                value={newIncident.description || ""}
                onChange={(e) =>
                  setNewIncident((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={newIncident.type || "threat"}
                  onChange={(e) =>
                    setNewIncident((prev) => ({
                      ...prev,
                      type: e.target.value as any,
                    }))
                  }
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  <option value="threat">General Threat</option>
                  <option value="poaching">Poaching</option>
                  <option value="habitat_damage">Habitat Damage</option>
                  <option value="pollution">Pollution</option>
                  <option value="wildlife_conflict">Wildlife Conflict</option>
                  <option value="natural_disaster">Natural Disaster</option>
                  <option value="human_encroachment">Human Encroachment</option>
                </select>

                <select
                  value={newIncident.severity || "medium"}
                  onChange={(e) =>
                    setNewIncident((prev) => ({
                      ...prev,
                      severity: e.target.value as any,
                    }))
                  }
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>

                <Input
                  type="number"
                  placeholder="Priority (1-10)"
                  min="1"
                  max="10"
                  value={newIncident.priority || ""}
                  onChange={(e) =>
                    setNewIncident((prev) => ({
                      ...prev,
                      priority: parseInt(e.target.value),
                    }))
                  }
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newIncident.followUpRequired || false}
                    onChange={(e) =>
                      setNewIncident((prev) => ({
                        ...prev,
                        followUpRequired: e.target.checked,
                      }))
                    }
                  />
                  <span className="text-sm">Requires follow-up</span>
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <Button onClick={handleCreateIncident}>
                  <Save className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
                <Button variant="outline" onClick={() => setIsReporting(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Habitat List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Monitored Habitats</h2>
          {habitats.map((habitat) => {
            const TypeIcon = getTypeIcon(habitat.type);
            const TrendIcon = getTrendIcon(habitat.trendDirection);

            return (
              <Card
                key={habitat.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedHabitat?.id === habitat.id
                    ? "ring-2 ring-blue-500"
                    : ""
                }`}
                onClick={() => setSelectedHabitat(habitat)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <TypeIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold">{habitat.name}</h3>
                        <p className="text-sm text-gray-600">
                          {habitat.size.toLocaleString()} hectares
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`${habitat.protectionLevel === "sacred" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                    >
                      {habitat.protectionLevel}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Health Score</span>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`font-bold ${getHealthScoreColor(habitat.healthScore)}`}
                        >
                          {habitat.healthScore}%
                        </span>
                        <TrendIcon
                          className={`w-4 h-4 ${getHealthScoreColor(habitat.healthScore)}`}
                        />
                      </div>
                    </div>
                    <Progress value={habitat.healthScore} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                    <span>{habitat.monitoringDevices.length} devices</span>
                    <span>{habitat.recentIncidents.length} incidents</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {selectedHabitat ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedHabitat.name}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Live View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="space-y-4"
                >
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="environmental">
                      Environmental
                    </TabsTrigger>
                    <TabsTrigger value="devices">Devices</TabsTrigger>
                    <TabsTrigger value="incidents">Incidents</TabsTrigger>
                    <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">
                          Habitat Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span className="capitalize">
                              {selectedHabitat.type}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Size:</span>
                            <span>
                              {selectedHabitat.size.toLocaleString()} hectares
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Protection Level:</span>
                            <Badge className="text-xs">
                              {selectedHabitat.protectionLevel}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Established:</span>
                            <span>
                              {new Date(
                                selectedHabitat.establishedDate,
                              ).getFullYear()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Key Species</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedHabitat.keySpecies.map((species, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {species}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Description</h4>
                      <p className="text-sm text-gray-700">
                        {selectedHabitat.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Current Threats</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedHabitat.threats.map((threat, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-red-50"
                          >
                            {threat}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Guardians</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedHabitat.guardians.map((guardian, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-blue-50"
                          >
                            {guardian}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="environmental" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3">Temperature</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Current</span>
                              <span className="font-bold">
                                {
                                  selectedHabitat.environmentalData.temperature
                                    .current
                                }
                                °C
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Weekly Avg</span>
                              <span>
                                {
                                  selectedHabitat.environmentalData.temperature
                                    .weekly_avg
                                }
                                °C
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Monthly Avg</span>
                              <span>
                                {
                                  selectedHabitat.environmentalData.temperature
                                    .monthly_avg
                                }
                                °C
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3">Humidity</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Current</span>
                              <span className="font-bold">
                                {
                                  selectedHabitat.environmentalData.humidity
                                    .current
                                }
                                %
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Weekly Avg</span>
                              <span>
                                {
                                  selectedHabitat.environmentalData.humidity
                                    .weekly_avg
                                }
                                %
                              </span>
                            </div>
                            <Progress
                              value={
                                selectedHabitat.environmentalData.humidity
                                  .current
                              }
                              className="h-2"
                            />
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3">Precipitation</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Daily</span>
                              <span className="font-bold">
                                {
                                  selectedHabitat.environmentalData
                                    .precipitation.daily
                                }
                                mm
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Weekly</span>
                              <span>
                                {
                                  selectedHabitat.environmentalData
                                    .precipitation.weekly
                                }
                                mm
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Monthly</span>
                              <span>
                                {
                                  selectedHabitat.environmentalData
                                    .precipitation.monthly
                                }
                                mm
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3">Air Quality</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">AQI</span>
                              <span className="font-bold">
                                {
                                  selectedHabitat.environmentalData.airQuality
                                    .aqi
                                }
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Status</span>
                              <Badge
                                className={`text-xs ${selectedHabitat.environmentalData.airQuality.status === "good" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                              >
                                {
                                  selectedHabitat.environmentalData.airQuality
                                    .status
                                }
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">
                          Vegetation Health
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold">
                              {
                                selectedHabitat.environmentalData
                                  .vegetationHealth.ndvi
                              }
                            </div>
                            <div className="text-sm text-gray-600">
                              NDVI Index
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold">
                              {
                                selectedHabitat.environmentalData
                                  .vegetationHealth.coverage
                              }
                              %
                            </div>
                            <div className="text-sm text-gray-600">
                              Coverage
                            </div>
                          </div>
                          <div className="text-center">
                            <Badge className="text-xs">
                              {
                                selectedHabitat.environmentalData
                                  .vegetationHealth.trend
                              }
                            </Badge>
                            <div className="text-sm text-gray-600">Trend</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="devices" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedHabitat.monitoringDevices.map((device) => {
                        const DeviceIcon = getDeviceIcon(device.type);

                        return (
                          <Card key={device.id}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-green-100 rounded-lg">
                                    <DeviceIcon className="w-5 h-5 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium">
                                      {device.name}
                                    </h4>
                                    <p className="text-sm text-gray-600 capitalize">
                                      {device.type}
                                    </p>
                                  </div>
                                </div>
                                <Badge
                                  className={`text-xs ${getStatusColor(device.status)}`}
                                >
                                  {device.status}
                                </Badge>
                              </div>

                              <div className="space-y-2 text-sm">
                                {device.batteryLevel && (
                                  <div className="flex items-center justify-between">
                                    <span>Battery</span>
                                    <div className="flex items-center space-x-2">
                                      <Battery className="w-3 h-3" />
                                      <span>{device.batteryLevel}%</span>
                                    </div>
                                  </div>
                                )}
                                {device.signalStrength && (
                                  <div className="flex items-center justify-between">
                                    <span>Signal</span>
                                    <div className="flex items-center space-x-2">
                                      <Signal className="w-3 h-3" />
                                      <span>{device.signalStrength}%</span>
                                    </div>
                                  </div>
                                )}
                                <div className="flex items-center justify-between">
                                  <span>Data Points</span>
                                  <span>
                                    {device.dataPoints.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Alerts</span>
                                  <span
                                    className={
                                      device.alerts > 0
                                        ? "text-red-600 font-medium"
                                        : ""
                                    }
                                  >
                                    {device.alerts}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Last Update</span>
                                  <span>
                                    {new Date(
                                      device.lastUpdate,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="incidents" className="space-y-4">
                    {/* Search and filters for incidents */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="Search incidents..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <select
                        value={filterSeverity}
                        onChange={(e) => setFilterSeverity(e.target.value)}
                        className="px-3 py-2 border rounded-md bg-white"
                      >
                        <option value="all">All Severities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      {filteredIncidents.map((incident) => (
                        <Card
                          key={incident.id}
                          className="cursor-pointer hover:shadow-md"
                          onClick={() => setSelectedIncident(incident)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium">{incident.title}</h4>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  className={getSeverityColor(
                                    incident.severity,
                                  )}
                                >
                                  {incident.severity}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {incident.status}
                                </Badge>
                              </div>
                            </div>

                            <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                              {incident.description}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {incident.location}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {new Date(
                                  incident.timestamp,
                                ).toLocaleDateString()}
                              </span>
                              <span>Priority: {incident.priority}/10</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="wildlife" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3">
                            Wildlife Activity
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Species Count</span>
                              <span className="font-bold">
                                {
                                  selectedHabitat.environmentalData
                                    .wildlifeActivity.species_count
                                }
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Activity Level</span>
                              <Badge
                                className={`text-xs ${selectedHabitat.environmentalData.wildlifeActivity.activity_level === "high" ? "bg-green-100 text-green-800" : selectedHabitat.environmentalData.wildlifeActivity.activity_level === "normal" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
                              >
                                {
                                  selectedHabitat.environmentalData
                                    .wildlifeActivity.activity_level
                                }
                              </Badge>
                            </div>
                            {selectedHabitat.environmentalData.wildlifeActivity
                              .migration_status && (
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Migration</span>
                                <Badge className="text-xs">
                                  {
                                    selectedHabitat.environmentalData
                                      .wildlifeActivity.migration_status
                                  }
                                </Badge>
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Breeding Indicators
                              </span>
                              <span
                                className={
                                  selectedHabitat.environmentalData
                                    .wildlifeActivity.breeding_indicators
                                    ? "text-green-600"
                                    : "text-gray-600"
                                }
                              >
                                {selectedHabitat.environmentalData
                                  .wildlifeActivity.breeding_indicators
                                  ? "Detected"
                                  : "None"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3">
                            Key Species Status
                          </h4>
                          <div className="space-y-2">
                            {selectedHabitat.keySpecies.map(
                              (species, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-2 border rounded"
                                >
                                  <span className="text-sm">{species}</span>
                                  <Badge variant="outline" className="text-xs">
                                    Stable
                                  </Badge>
                                </div>
                              ),
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Select a Habitat
                </h3>
                <p className="text-gray-500">
                  Choose a habitat from the list to view detailed monitoring
                  information
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Incident Detail Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedIncident.title}</span>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={getSeverityColor(selectedIncident.severity)}
                  >
                    {selectedIncident.severity}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedIncident(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-sm text-gray-700">
                  {selectedIncident.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Location</h4>
                  <p className="text-sm text-gray-700">
                    {selectedIncident.location}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Reporter</h4>
                  <p className="text-sm text-gray-700">
                    {selectedIncident.reporterName}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{selectedIncident.status}</Badge>
                  <select
                    value={selectedIncident.status}
                    onChange={(e) =>
                      handleUpdateIncidentStatus(
                        selectedIncident.id,
                        e.target.value,
                      )
                    }
                    className="px-2 py-1 text-xs border rounded"
                  >
                    <option value="reported">Reported</option>
                    <option value="investigating">Investigating</option>
                    <option value="action_taken">Action Taken</option>
                    <option value="resolved">Resolved</option>
                    <option value="escalated">Escalated</option>
                  </select>
                </div>
              </div>

              {selectedIncident.affectedSpecies &&
                selectedIncident.affectedSpecies.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Affected Species</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedIncident.affectedSpecies.map(
                        (species, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {species}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                )}

              <div>
                <h4 className="font-semibold mb-2">Response Actions</h4>
                <div className="space-y-2">
                  {selectedIncident.responseActions.map((action) => (
                    <div key={action.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {action.action}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {action.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600">
                        Assigned to: {action.assignedTo} • Due:{" "}
                        {new Date(action.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center space-x-2 mt-3">
                    <Input
                      placeholder="Add new action..."
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value) {
                          handleAddResponseAction(
                            selectedIncident.id,
                            e.currentTarget.value,
                          );
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                    <Button size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-xs text-gray-500">
                  Reported:{" "}
                  {new Date(selectedIncident.timestamp).toLocaleString()}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Share className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline">
                    <Flag className="w-4 h-4 mr-1" />
                    Escalate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
