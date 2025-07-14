import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Globe,
  Plus,
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Activity,
  GitBranch,
  Clock,
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Star,
  Map,
  Layers,
  Database,
  Brain,
  Zap,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

interface PeaceProject {
  id: string;
  title: string;
  description: string;
  type:
    | "mediation"
    | "water_diplomacy"
    | "economic_empowerment"
    | "conflict_prevention"
    | "digital_peace"
    | "cultural_exchange";
  status: "planning" | "active" | "paused" | "completed" | "archived";
  priority: "low" | "medium" | "high" | "critical";
  visibility: "public" | "private" | "restricted";

  // Geographic data
  location: {
    country: string;
    region: string;
    coordinates: { lat: number; lng: number };
    conflictZone: boolean;
    proximityIndex: number;
  };

  // Timeline
  phases: ProjectPhase[];
  startDate: string;
  endDate?: string;
  lastUpdated: string;

  // Stakeholders
  leadOrganization: string;
  partners: string[];
  beneficiaries: string[];
  teamSize: number;

  // Financials
  budget: {
    total: number;
    allocated: number;
    spent: number;
    currency: "USD" | "PeaceCoin";
  };

  // Impact & Metrics
  impactMetrics: {
    peopleReached: number;
    conflictsResolved: number;
    peacefulDays: number;
    trustScore: number;
  };

  // Versioning & Collaboration
  version: string;
  ipfsHash?: string;
  gitRepository?: string;
  forkCount: number;

  // AI & Predictions
  successProbability: number;
  aiRecommendations: string[];

  // Web3 Integration
  smartContract?: string;
  daoVotes: {
    support: number;
    total: number;
  };

  metadata: {
    tags: string[];
    sdgAlignment: string[];
    conflictTypes: string[];
    innovationLevel: number;
  };
}

interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  status: "pending" | "active" | "completed" | "blocked";
  startDate: string;
  endDate?: string;
  milestones: string[];
  budget: number;
  progress: number;
}

export default function PeaceProjects() {
  const { user } = usePaxisAuth();
  const [projects, setProjects] = useState<PeaceProject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<PeaceProject | null>(
    null,
  );
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [viewMode, setViewMode] = useState<
    "list" | "cards" | "map" | "timeline"
  >("cards");

  // Mock data for demonstration
  useEffect(() => {
    const mockProjects: PeaceProject[] = [
      {
        id: "1",
        title: "Jordan-Palestine Water Rights Mediation",
        description:
          "Multi-stakeholder dialogue for sustainable water resource management across the Jordan River basin",
        type: "water_diplomacy",
        status: "active",
        priority: "high",
        visibility: "public",
        location: {
          country: "Jordan",
          region: "Middle East",
          coordinates: { lat: 31.2001, lng: 34.8854 },
          conflictZone: true,
          proximityIndex: 8.2,
        },
        phases: [
          {
            id: "1",
            name: "Stakeholder Mapping",
            description: "Identify and engage all relevant parties",
            status: "completed",
            startDate: "2024-01-01",
            endDate: "2024-01-31",
            milestones: [
              "Community leaders identified",
              "Government liaisons established",
            ],
            budget: 50000,
            progress: 100,
          },
          {
            id: "2",
            name: "Mediation Sessions",
            description: "Facilitated dialogue sessions",
            status: "active",
            startDate: "2024-02-01",
            milestones: ["First session completed", "Framework agreement"],
            budget: 120000,
            progress: 65,
          },
        ],
        startDate: "2024-01-01",
        lastUpdated: "2024-01-21",
        leadOrganization: "Global Peace Initiative",
        partners: [
          "UN Water",
          "Jordan Water Authority",
          "Palestine Water Authority",
        ],
        beneficiaries: [
          "Farming communities",
          "Urban water users",
          "Ecosystem stakeholders",
        ],
        teamSize: 12,
        budget: {
          total: 300000,
          allocated: 250000,
          spent: 85000,
          currency: "USD",
        },
        impactMetrics: {
          peopleReached: 125000,
          conflictsResolved: 3,
          peacefulDays: 45,
          trustScore: 87,
        },
        version: "v1.2.3",
        ipfsHash: "QmX7M2V3Q...",
        gitRepository: "https://github.com/paxis/water-mediation-jordan",
        forkCount: 2,
        successProbability: 78,
        aiRecommendations: [
          "Consider involving youth representatives",
          "Schedule sessions during culturally neutral times",
          "Implement water usage monitoring system",
        ],
        smartContract: "0x742d35Cc...",
        daoVotes: {
          support: 127,
          total: 150,
        },
        metadata: {
          tags: ["water", "mediation", "middle-east", "sustainability"],
          sdgAlignment: ["SDG 6", "SDG 16"],
          conflictTypes: ["Resource", "Territorial"],
          innovationLevel: 8,
        },
      },
      {
        id: "2",
        title: "AI-Powered Early Warning System - Horn of Africa",
        description:
          "Machine learning system to predict conflict escalation patterns in the Horn of Africa region",
        type: "conflict_prevention",
        status: "active",
        priority: "critical",
        visibility: "public",
        location: {
          country: "Ethiopia",
          region: "Horn of Africa",
          coordinates: { lat: 9.145, lng: 40.4897 },
          conflictZone: true,
          proximityIndex: 9.1,
        },
        phases: [
          {
            id: "1",
            name: "Data Collection",
            description: "Gather historical conflict data and indicators",
            status: "completed",
            startDate: "2023-10-01",
            endDate: "2023-12-31",
            milestones: [
              "Historical data compiled",
              "Real-time feeds established",
            ],
            budget: 80000,
            progress: 100,
          },
          {
            id: "2",
            name: "Model Development",
            description: "Build and train ML prediction models",
            status: "active",
            startDate: "2024-01-01",
            milestones: ["Initial model trained", "Validation completed"],
            budget: 150000,
            progress: 75,
          },
          {
            id: "3",
            name: "Deployment & Testing",
            description: "Deploy system and conduct field testing",
            status: "pending",
            startDate: "2024-03-01",
            milestones: ["Beta deployment", "User training"],
            budget: 100000,
            progress: 0,
          },
        ],
        startDate: "2023-10-01",
        endDate: "2024-06-30",
        lastUpdated: "2024-01-20",
        leadOrganization: "Tech for Peace Lab",
        partners: ["African Union", "IGAD", "Local NGOs"],
        beneficiaries: [
          "Regional governments",
          "NGOs",
          "International observers",
        ],
        teamSize: 8,
        budget: {
          total: 450000,
          allocated: 400000,
          spent: 180000,
          currency: "USD",
        },
        impactMetrics: {
          peopleReached: 5000000,
          conflictsResolved: 0,
          peacefulDays: 0,
          trustScore: 92,
        },
        version: "v2.1.0",
        ipfsHash: "QmY8N3W4R...",
        gitRepository: "https://github.com/paxis/early-warning-horn-africa",
        forkCount: 5,
        successProbability: 85,
        aiRecommendations: [
          "Include climate data as additional indicator",
          "Expand to neighboring regions",
          "Develop mobile app for field workers",
        ],
        smartContract: "0x892e47Dc...",
        daoVotes: {
          support: 234,
          total: 251,
        },
        metadata: {
          tags: ["AI", "early-warning", "machine-learning", "africa"],
          sdgAlignment: ["SDG 16", "SDG 17"],
          conflictTypes: ["Ethnic", "Resource", "Political"],
          innovationLevel: 9,
        },
      },
      {
        id: "3",
        title: "VR Empathy Training for Colombian Ex-FARC Integration",
        description:
          "Virtual reality-based empathy training program to support reintegration of former FARC combatants",
        type: "cultural_exchange",
        status: "completed",
        priority: "medium",
        visibility: "public",
        location: {
          country: "Colombia",
          region: "South America",
          coordinates: { lat: 4.711, lng: -74.0721 },
          conflictZone: false,
          proximityIndex: 3.4,
        },
        phases: [
          {
            id: "1",
            name: "Content Development",
            description: "Create VR scenarios and empathy exercises",
            status: "completed",
            startDate: "2023-06-01",
            endDate: "2023-09-30",
            milestones: ["VR scenarios completed", "Testing with focus groups"],
            budget: 120000,
            progress: 100,
          },
          {
            id: "2",
            name: "Pilot Training Sessions",
            description: "Conduct pilot training with participants",
            status: "completed",
            startDate: "2023-10-01",
            endDate: "2023-12-31",
            milestones: ["200 participants trained", "Effectiveness measured"],
            budget: 80000,
            progress: 100,
          },
        ],
        startDate: "2023-06-01",
        endDate: "2023-12-31",
        lastUpdated: "2024-01-05",
        leadOrganization: "Colombian Peace Foundation",
        partners: ["Ministry of Interior", "UN Verification Mission"],
        beneficiaries: ["Ex-combatants", "Host communities", "Victims"],
        teamSize: 6,
        budget: {
          total: 200000,
          allocated: 200000,
          spent: 200000,
          currency: "USD",
        },
        impactMetrics: {
          peopleReached: 850,
          conflictsResolved: 12,
          peacefulDays: 180,
          trustScore: 89,
        },
        version: "v1.0.0",
        ipfsHash: "QmZ9O4Y5T...",
        forkCount: 3,
        successProbability: 91,
        aiRecommendations: [
          "Expand to other post-conflict regions",
          "Develop mobile VR version",
          "Create long-term impact tracking",
        ],
        daoVotes: {
          support: 89,
          total: 95,
        },
        metadata: {
          tags: ["VR", "empathy", "reintegration", "colombia"],
          sdgAlignment: ["SDG 16", "SDG 10"],
          conflictTypes: ["Post-conflict", "Social"],
          innovationLevel: 7,
        },
      },
    ];
    setProjects(mockProjects);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || project.type === filterType;
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    const matchesRegion =
      filterRegion === "all" || project.location.region === filterRegion;

    return matchesSearch && matchesType && matchesStatus && matchesRegion;
  });

  const handleCreateProject = (formData: any) => {
    const newProject: PeaceProject = {
      id: Date.now().toString(),
      ...formData,
      version: "v1.0.0",
      forkCount: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      impactMetrics: {
        peopleReached: 0,
        conflictsResolved: 0,
        peacefulDays: 0,
        trustScore: 0,
      },
      daoVotes: {
        support: 0,
        total: 0,
      },
    };
    setProjects([...projects, newProject]);
    setShowCreateDialog(false);
  };

  const handleUpdateProject = (
    id: string,
    updatedData: Partial<PeaceProject>,
  ) => {
    setProjects((projects) =>
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              ...updatedData,
              version: incrementVersion(project.version),
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : project,
      ),
    );
    setShowEditDialog(false);
    setSelectedProject(null);
  };

  const handleDeleteProject = (id: string) => {
    // Soft delete - archive project
    setProjects((projects) =>
      projects.map((project) =>
        project.id === id
          ? { ...project, status: "archived" as const }
          : project,
      ),
    );
  };

  const handleForkProject = (project: PeaceProject) => {
    const forkedProject: PeaceProject = {
      ...project,
      id: Date.now().toString(),
      title: `${project.title} (Fork)`,
      version: "v1.0.0-fork",
      forkCount: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
      status: "planning",
      leadOrganization: user?.name || "Current User",
    };

    setProjects([...projects, forkedProject]);

    // Increment fork count on original
    setProjects((projects) =>
      projects.map((p) =>
        p.id === project.id ? { ...p, forkCount: p.forkCount + 1 } : p,
      ),
    );
  };

  const incrementVersion = (version: string): string => {
    const parts = version.replace("v", "").split(".");
    const patch = parseInt(parts[2] || "0") + 1;
    return `v${parts[0]}.${parts[1]}.${patch}`;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planning: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      paused: "bg-yellow-100 text-yellow-800",
      completed: "bg-purple-100 text-purple-800",
      archived: "bg-gray-100 text-gray-800",
    };
    return colors[status as keyof typeof colors] || colors.planning;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-blue-100 text-blue-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800",
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Peace Projects
              </h1>
              <p className="text-muted-foreground">
                Global initiatives for conflict resolution and peace building
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog
                open={showCreateDialog}
                onOpenChange={setShowCreateDialog}
              >
                <DialogTrigger asChild>
                  <Button className="peace-gradient">
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </DialogTrigger>
                <ProjectForm
                  onSubmit={handleCreateProject}
                  onCancel={() => setShowCreateDialog(false)}
                />
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {/* Filters and Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="mediation">Mediation</SelectItem>
                <SelectItem value="water_diplomacy">Water Diplomacy</SelectItem>
                <SelectItem value="economic_empowerment">
                  Economic Empowerment
                </SelectItem>
                <SelectItem value="conflict_prevention">
                  Conflict Prevention
                </SelectItem>
                <SelectItem value="digital_peace">Digital Peace</SelectItem>
                <SelectItem value="cultural_exchange">
                  Cultural Exchange
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                Cards
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
              >
                <Map className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "timeline" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("timeline")}
              >
                <Activity className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Display */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={(project) => setSelectedProject(project)}
                onEdit={(project) => {
                  setSelectedProject(project);
                  setShowEditDialog(true);
                }}
                onDelete={(id) => handleDeleteProject(id)}
                onFork={(project) => handleForkProject(project)}
              />
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {project.location.country} • {project.teamSize}{" "}
                            members
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {project.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {Math.round(
                              project.phases.reduce(
                                (acc, phase) => acc + phase.progress,
                                0,
                              ) / project.phases.length,
                            )}
                            %
                          </div>
                          <Progress
                            value={
                              project.phases.reduce(
                                (acc, phase) => acc + phase.progress,
                                0,
                              ) / project.phases.length
                            }
                            className="h-2"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>
                            {project.impactMetrics.peopleReached.toLocaleString()}{" "}
                            reached
                          </div>
                          <div>
                            {project.impactMetrics.conflictsResolved} resolved
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Brain className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">
                            {project.successProbability}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedProject(project)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleForkProject(project)}
                          >
                            <GitBranch className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedProject(project);
                              setShowEditDialog(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {viewMode === "map" && (
          <Card>
            <CardContent className="p-6">
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    Geospatial Project Map
                  </h3>
                  <p className="text-muted-foreground">
                    Interactive map showing project locations and conflict
                    proximity
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Leaflet/Mapbox integration with conflict zone overlays
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {viewMode === "timeline" && (
          <Card>
            <CardContent className="p-6">
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    Project Timeline View
                  </h3>
                  <p className="text-muted-foreground">
                    Gantt chart-style timeline of all project phases
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Interactive timeline with milestone tracking
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Project Details Modal */}
      <Dialog
        open={!!selectedProject && !showEditDialog}
        onOpenChange={() => setSelectedProject(null)}
      >
        {selectedProject && (
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <ProjectDetails project={selectedProject} />
          </DialogContent>
        )}
      </Dialog>

      {/* Edit Project Modal */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        {selectedProject && (
          <ProjectForm
            project={selectedProject}
            onSubmit={(data) => handleUpdateProject(selectedProject.id, data)}
            onCancel={() => {
              setShowEditDialog(false);
              setSelectedProject(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}

// Project Card Component
function ProjectCard({
  project,
  onView,
  onEdit,
  onDelete,
  onFork,
}: {
  project: PeaceProject;
  onView: (project: PeaceProject) => void;
  onEdit: (project: PeaceProject) => void;
  onDelete: (id: string) => void;
  onFork: (project: PeaceProject) => void;
}) {
  const overallProgress =
    project.phases.reduce((acc, phase) => acc + phase.progress, 0) /
    project.phases.length;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg line-clamp-2">
              {project.title}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                {project.status}
              </Badge>
              <Badge
                className={`text-xs ${getPriorityColor(project.priority)}`}
              >
                {project.priority}
              </Badge>
              {project.location.conflictZone && (
                <Badge variant="outline" className="text-xs text-red-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Conflict Zone
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <GitBranch className="h-3 w-3" />
            <span>{project.version}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{project.location.country}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{project.teamSize} members</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-muted-foreground" />
              <span>{project.successProbability}% success</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>
                {(project.budget.total / 1000).toFixed(0)}k{" "}
                {project.budget.currency}
              </span>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-semibold text-primary">
              {project.impactMetrics.peopleReached.toLocaleString()}
            </div>
            <div className="text-muted-foreground">Reached</div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-semibold text-primary">
              {project.impactMetrics.conflictsResolved}
            </div>
            <div className="text-muted-foreground">Resolved</div>
          </div>
        </div>

        {/* AI Recommendations Preview */}
        {project.aiRecommendations.length > 0 && (
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Brain className="h-3 w-3" />
              <span>AI Recommendation</span>
            </div>
            <p className="text-xs bg-purple-50 p-2 rounded line-clamp-2">
              {project.aiRecommendations[0]}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={() => onView(project)}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm" variant="outline" onClick={() => onFork(project)}>
              <GitBranch className="h-4 w-4 mr-1" />
              Fork
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Button size="sm" variant="outline" onClick={() => onEdit(project)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(project.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Project Details Component
function ProjectDetails({ project }: { project: PeaceProject }) {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
            <DialogDescription>
              {project.type.replace("_", " ")} • {project.location.country} •
              Version {project.version}
            </DialogDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            <Badge className={getPriorityColor(project.priority)}>
              {project.priority}
            </Badge>
          </div>
        </div>
      </DialogHeader>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="phases">Phases</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
          <TabsTrigger value="versioning">Versioning</TabsTrigger>
          <TabsTrigger value="dao">DAO</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Team & Partners</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Lead Organization</h4>
                  <p className="text-sm text-muted-foreground">
                    {project.leadOrganization}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Partners</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.partners.map((partner, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {partner}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Beneficiaries</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.beneficiaries.map((beneficiary, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {beneficiary}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget & Financials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Budget</span>
                    <span className="font-medium">
                      {project.budget.total.toLocaleString()}{" "}
                      {project.budget.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Allocated</span>
                    <span className="font-medium">
                      {project.budget.allocated.toLocaleString()}{" "}
                      {project.budget.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Spent</span>
                    <span className="font-medium">
                      {project.budget.spent.toLocaleString()}{" "}
                      {project.budget.currency}
                    </span>
                  </div>
                  <Progress
                    value={(project.budget.spent / project.budget.total) * 100}
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          {project.phases.map((phase, index) => (
            <Card key={phase.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Phase {index + 1}: {phase.name}
                  </CardTitle>
                  <Badge className={getStatusColor(phase.status)}>
                    {phase.status}
                  </Badge>
                </div>
                <CardDescription>{phase.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Start Date: </span>
                    <span>
                      {new Date(phase.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Budget: </span>
                    <span>
                      {phase.budget.toLocaleString()} {project.budget.currency}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{phase.progress}%</span>
                  </div>
                  <Progress value={phase.progress} className="h-2" />
                </div>

                <div>
                  <h4 className="font-medium mb-2">Milestones</h4>
                  <ul className="space-y-1">
                    {phase.milestones.map((milestone, idx) => (
                      <li
                        key={idx}
                        className="text-sm flex items-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {project.impactMetrics.peopleReached.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">People Reached</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {project.impactMetrics.conflictsResolved}
                </div>
                <p className="text-sm text-muted-foreground">
                  Conflicts Resolved
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {project.impactMetrics.peacefulDays}
                </div>
                <p className="text-sm text-muted-foreground">Peaceful Days</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {project.impactMetrics.trustScore}
                </div>
                <p className="text-sm text-muted-foreground">Trust Score</p>
              </CardContent>
            </Card>
          </div>

          {/* Conflict Proximity Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Conflict Proximity Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Proximity Index</span>
                  <span className="font-medium">
                    {project.location.proximityIndex}/10
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${
                      project.location.proximityIndex > 7
                        ? "bg-red-500"
                        : project.location.proximityIndex > 4
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{
                      width: `${project.location.proximityIndex * 10}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.location.conflictZone
                    ? "Operating in active conflict zone - enhanced security protocols required"
                    : "Stable region - standard operating procedures apply"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Success Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600">
                    {project.successProbability}%
                  </div>
                  <p className="text-muted-foreground">
                    Predicted Success Probability
                  </p>
                </div>
                <Progress value={project.successProbability} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.aiRecommendations.map((recommendation, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="versioning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Version Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Current Version</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{project.version}</Badge>
                    <span className="text-sm text-muted-foreground">
                      Updated{" "}
                      {new Date(project.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <Label>Fork Count</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <GitBranch className="h-4 w-4" />
                    <span>{project.forkCount} forks</span>
                  </div>
                </div>
              </div>

              {project.ipfsHash && (
                <div>
                  <Label>IPFS Hash</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Database className="h-4 w-4" />
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {project.ipfsHash}
                    </code>
                  </div>
                </div>
              )}

              {project.gitRepository && (
                <div>
                  <Label>Git Repository</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <LinkIcon className="h-4 w-4" />
                    <a
                      href={project.gitRepository}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {project.gitRepository}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>DAO Governance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Community Support</Label>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>
                      Support: {project.daoVotes.support} /{" "}
                      {project.daoVotes.total} votes
                    </span>
                    <span>
                      {Math.round(
                        (project.daoVotes.support / project.daoVotes.total) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (project.daoVotes.support / project.daoVotes.total) * 100
                    }
                    className="h-2"
                  />
                </div>
              </div>

              {project.smartContract && (
                <div>
                  <Label>Smart Contract</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Zap className="h-4 w-4" />
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {project.smartContract}
                    </code>
                  </div>
                </div>
              )}

              <div>
                <Label>SDG Alignment</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.metadata.sdgAlignment.map((sdg, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {sdg}
                    </Badge>
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

// Project Form Component
function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: {
  project?: PeaceProject;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    type: project?.type || "mediation",
    priority: project?.priority || "medium",
    visibility: project?.visibility || "public",
    country: project?.location.country || "",
    region: project?.location.region || "",
    leadOrganization: project?.leadOrganization || "",
    teamSize: project?.teamSize || 1,
    budgetTotal: project?.budget.total || 0,
    budgetCurrency: project?.budget.currency || "USD",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      location: {
        country: formData.country,
        region: formData.region,
        coordinates: { lat: 0, lng: 0 }, // Would be geocoded in real implementation
        conflictZone: false, // Would be determined by AI analysis
        proximityIndex: 0,
      },
      budget: {
        total: formData.budgetTotal,
        allocated: 0,
        spent: 0,
        currency: formData.budgetCurrency,
      },
      phases: [],
      partners: [],
      beneficiaries: [],
      successProbability: 50, // Initial value
      aiRecommendations: [],
      metadata: {
        tags: [],
        sdgAlignment: [],
        conflictTypes: [],
        innovationLevel: 5,
      },
    };
    onSubmit(submitData);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {project ? "Edit Project" : "Create New Peace Project"}
        </DialogTitle>
        <DialogDescription>
          {project
            ? "Update project information"
            : "Launch a new peace building initiative"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Project Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mediation">Mediation</SelectItem>
                <SelectItem value="water_diplomacy">Water Diplomacy</SelectItem>
                <SelectItem value="economic_empowerment">
                  Economic Empowerment
                </SelectItem>
                <SelectItem value="conflict_prevention">
                  Conflict Prevention
                </SelectItem>
                <SelectItem value="digital_peace">Digital Peace</SelectItem>
                <SelectItem value="cultural_exchange">
                  Cultural Exchange
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) =>
                setFormData({ ...formData, priority: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <Select
              value={formData.visibility}
              onValueChange={(value) =>
                setFormData({ ...formData, visibility: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="restricted">Restricted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              value={formData.region}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="leadOrganization">Lead Organization</Label>
            <Input
              id="leadOrganization"
              value={formData.leadOrganization}
              onChange={(e) =>
                setFormData({ ...formData, leadOrganization: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teamSize">Team Size</Label>
            <Input
              id="teamSize"
              type="number"
              value={formData.teamSize}
              onChange={(e) =>
                setFormData({ ...formData, teamSize: parseInt(e.target.value) })
              }
              min="1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budgetTotal">Total Budget</Label>
            <Input
              id="budgetTotal"
              type="number"
              value={formData.budgetTotal}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  budgetTotal: parseInt(e.target.value),
                })
              }
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budgetCurrency">Currency</Label>
            <Select
              value={formData.budgetCurrency}
              onValueChange={(value) =>
                setFormData({ ...formData, budgetCurrency: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="PeaceCoin">PeaceCoin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="peace-gradient">
            {project ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}

function getStatusColor(status: string) {
  const colors = {
    planning: "bg-blue-100 text-blue-800",
    active: "bg-green-100 text-green-800",
    paused: "bg-yellow-100 text-yellow-800",
    completed: "bg-purple-100 text-purple-800",
    archived: "bg-gray-100 text-gray-800",
  };
  return colors[status as keyof typeof colors] || colors.planning;
}

function getPriorityColor(priority: string) {
  const colors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  };
  return colors[priority as keyof typeof colors] || colors.medium;
}
