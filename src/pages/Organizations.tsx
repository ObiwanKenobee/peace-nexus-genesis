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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  Plus,
  Search,
  Filter,
  MapPin,
  Users,
  Award,
  TrendingUp,
  Activity,
  Shield,
  Brain,
  AlertTriangle,
  Edit,
  Trash2,
  Eye,
  Star,
  Target,
  BarChart3,
  Map,
  Zap,
} from "lucide-react";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

interface Organization {
  id: string;
  name: string;
  type: "ngo" | "peace_mission" | "research_lab" | "government" | "private";
  region: string;
  country: string;
  sdgAlignment: string[];
  verificationStatus: "verified" | "pending" | "unverified";
  peaceSealNFT?: string;
  impactScore: number;
  conflictProximityIndex: number;
  description: string;
  website?: string;
  foundedYear: number;
  teamSize: number;
  projectsCount: number;
  peaceCoinsEarned: number;
  lastActivity: string;
  metadata: {
    missionStatement: string;
    specializations: string[];
    languages: string[];
    operatingRegions: string[];
  };
}

export default function Organizations() {
  const { user } = usePaxisAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("grid");

  // Mock data for demonstration
  useEffect(() => {
    const mockOrganizations: Organization[] = [
      {
        id: "1",
        name: "Global Peace Initiative",
        type: "ngo",
        region: "Global",
        country: "Switzerland",
        sdgAlignment: ["SDG 16", "SDG 17"],
        verificationStatus: "verified",
        peaceSealNFT: "0x1234...abcd",
        impactScore: 94,
        conflictProximityIndex: 3.2,
        description:
          "Leading international NGO focused on conflict prevention and resolution through innovative diplomatic approaches.",
        website: "https://globalpeace.org",
        foundedYear: 2010,
        teamSize: 127,
        projectsCount: 45,
        peaceCoinsEarned: 15420,
        lastActivity: "2024-01-20",
        metadata: {
          missionStatement:
            "Building sustainable peace through grassroots empowerment and diplomatic innovation.",
          specializations: [
            "Conflict Mediation",
            "Water Diplomacy",
            "Digital Peace",
          ],
          languages: ["English", "Arabic", "French", "Spanish"],
          operatingRegions: ["Middle East", "Africa", "Southeast Asia"],
        },
      },
      {
        id: "2",
        name: "Tech for Peace Lab",
        type: "research_lab",
        region: "North America",
        country: "USA",
        sdgAlignment: ["SDG 9", "SDG 16"],
        verificationStatus: "verified",
        peaceSealNFT: "0x5678...efgh",
        impactScore: 87,
        conflictProximityIndex: 1.8,
        description:
          "Research laboratory developing AI-powered early warning systems for conflict prevention.",
        website: "https://techforpeace.edu",
        foundedYear: 2018,
        teamSize: 34,
        projectsCount: 12,
        peaceCoinsEarned: 8930,
        lastActivity: "2024-01-21",
        metadata: {
          missionStatement:
            "Leveraging technology to predict, prevent, and resolve conflicts.",
          specializations: [
            "AI Development",
            "Data Analysis",
            "Conflict Prediction",
          ],
          languages: ["English", "Python", "R"],
          operatingRegions: ["Global Remote"],
        },
      },
      {
        id: "3",
        name: "African Unity Foundation",
        type: "ngo",
        region: "Africa",
        country: "Kenya",
        sdgAlignment: ["SDG 1", "SDG 16", "SDG 6"],
        verificationStatus: "pending",
        impactScore: 76,
        conflictProximityIndex: 6.7,
        description:
          "Community-driven organization working on water conflict resolution and economic empowerment.",
        foundedYear: 2015,
        teamSize: 89,
        projectsCount: 23,
        peaceCoinsEarned: 5670,
        lastActivity: "2024-01-19",
        metadata: {
          missionStatement:
            "Empowering African communities through sustainable peace and development initiatives.",
          specializations: [
            "Water Rights",
            "Community Mediation",
            "Economic Development",
          ],
          languages: ["English", "Swahili", "French"],
          operatingRegions: ["East Africa", "Central Africa"],
        },
      },
    ];
    setOrganizations(mockOrganizations);
  }, []);

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || org.type === filterType;
    const matchesRegion = filterRegion === "all" || org.region === filterRegion;

    return matchesSearch && matchesType && matchesRegion;
  });

  const handleCreateOrganization = (formData: any) => {
    const newOrg: Organization = {
      id: Date.now().toString(),
      ...formData,
      verificationStatus: "pending" as const,
      impactScore: 0,
      conflictProximityIndex: 0,
      projectsCount: 0,
      peaceCoinsEarned: 0,
      lastActivity: new Date().toISOString().split("T")[0],
    };
    setOrganizations([...organizations, newOrg]);
    setShowCreateDialog(false);
  };

  const handleUpdateOrganization = (
    id: string,
    updatedData: Partial<Organization>,
  ) => {
    setOrganizations((orgs) =>
      orgs.map((org) => (org.id === id ? { ...org, ...updatedData } : org)),
    );
    setShowEditDialog(false);
    setSelectedOrg(null);
  };

  const handleDeleteOrganization = (id: string) => {
    // Soft delete - in real implementation, would archive
    setOrganizations((orgs) => orgs.filter((org) => org.id !== id));
  };

  const getTypeColor = (type: string) => {
    const colors = {
      ngo: "bg-green-100 text-green-800",
      peace_mission: "bg-blue-100 text-blue-800",
      research_lab: "bg-purple-100 text-purple-800",
      government: "bg-orange-100 text-orange-800",
      private: "bg-gray-100 text-gray-800",
    };
    return colors[type as keyof typeof colors] || colors.private;
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <Shield className="h-4 w-4 text-green-600" />;
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Organizations
              </h1>
              <p className="text-muted-foreground">
                Global network of peace organizations, missions, and research
                institutions
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
                    Register Organization
                  </Button>
                </DialogTrigger>
                <OrganizationForm
                  onSubmit={handleCreateOrganization}
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
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Organization Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ngo">NGO</SelectItem>
                <SelectItem value="peace_mission">Peace Mission</SelectItem>
                <SelectItem value="research_lab">Research Lab</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRegion} onValueChange={setFilterRegion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
                <SelectItem value="North America">North America</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Africa">Africa</SelectItem>
                <SelectItem value="South America">South America</SelectItem>
                <SelectItem value="Oceania">Oceania</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
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
            </div>
          </div>
        </div>

        {/* Organizations Display */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrganizations.map((org) => (
              <OrganizationCard
                key={org.id}
                organization={org}
                onView={(org) => setSelectedOrg(org)}
                onEdit={(org) => {
                  setSelectedOrg(org);
                  setShowEditDialog(true);
                }}
                onDelete={(id) => handleDeleteOrganization(id)}
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
                    <TableHead>Organization</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Impact Score</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrganizations.map((org) => (
                    <TableRow key={org.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{org.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {org.teamSize} members • {org.projectsCount}{" "}
                            projects
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(org.type)}>
                          {org.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{org.region}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="text-lg font-bold">
                            {org.impactScore}
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getVerificationIcon(org.verificationStatus)}
                          <span className="capitalize">
                            {org.verificationStatus}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedOrg(org)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedOrg(org);
                              setShowEditDialog(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteOrganization(org.id)}
                          >
                            <Trash2 className="h-4 w-4" />
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
                    Interactive Map View
                  </h3>
                  <p className="text-muted-foreground">
                    Geospatial visualization of organizations would be
                    implemented here
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Integration with Leaflet/Mapbox for real-world deployment
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Organization Details Modal */}
      <Dialog
        open={!!selectedOrg && !showEditDialog}
        onOpenChange={() => setSelectedOrg(null)}
      >
        {selectedOrg && (
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <OrganizationDetails organization={selectedOrg} />
          </DialogContent>
        )}
      </Dialog>

      {/* Edit Organization Modal */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        {selectedOrg && (
          <OrganizationForm
            organization={selectedOrg}
            onSubmit={(data) => handleUpdateOrganization(selectedOrg.id, data)}
            onCancel={() => {
              setShowEditDialog(false);
              setSelectedOrg(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}

// Organization Card Component
function OrganizationCard({
  organization,
  onView,
  onEdit,
  onDelete,
}: {
  organization: Organization;
  onView: (org: Organization) => void;
  onEdit: (org: Organization) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{organization.name}</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getTypeColor(organization.type)}`}>
                {organization.type.replace("_", " ")}
              </Badge>
              {organization.verificationStatus === "verified" &&
                organization.peaceSealNFT && (
                  <Badge variant="outline" className="text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    Peace Seal
                  </Badge>
                )}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {getVerificationIcon(organization.verificationStatus)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {organization.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{organization.region}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{organization.teamSize} members</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span>Impact: {organization.impactScore}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span>{organization.peaceCoinsEarned} PC</span>
            </div>
          </div>
        </div>

        {/* Conflict Proximity Indicator */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Conflict Proximity</span>
            <span className="font-medium">
              {organization.conflictProximityIndex}/10
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                organization.conflictProximityIndex > 7
                  ? "bg-red-500"
                  : organization.conflictProximityIndex > 4
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
              style={{ width: `${organization.conflictProximityIndex * 10}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onView(organization)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <div className="flex items-center space-x-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(organization)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(organization.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Organization Details Component
function OrganizationDetails({ organization }: { organization: Organization }) {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div>
            <DialogTitle className="text-2xl">{organization.name}</DialogTitle>
            <DialogDescription>
              {organization.type.replace("_", " ")} • {organization.region} •
              Founded {organization.foundedYear}
            </DialogDescription>
          </div>
          <div className="flex items-center space-x-2">
            {organization.verificationStatus === "verified" && (
              <Badge className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
            {organization.peaceSealNFT && (
              <Badge variant="outline">
                <Award className="h-3 w-3 mr-1" />
                Peace Seal NFT
              </Badge>
            )}
          </div>
        </div>
      </DialogHeader>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mission Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{organization.metadata.missionStatement}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {organization.metadata.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {organization.metadata.languages.map((lang, index) => (
                    <Badge key={index} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {organization.impactScore}
                </div>
                <p className="text-sm text-muted-foreground">Impact Score</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {organization.projectsCount}
                </div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {organization.peaceCoinsEarned}
                </div>
                <p className="text-sm text-muted-foreground">PeaceCoins</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {organization.teamSize}
                </div>
                <p className="text-sm text-muted-foreground">Team Members</p>
              </CardContent>
            </Card>
          </div>

          {/* Impact Heatmap Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Impact Heatmap</CardTitle>
              <CardDescription>
                Regional impact intensity visualization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Interactive heatmap visualization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Project listing would be integrated here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Team member profiles and roles
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Organization Form Component
function OrganizationForm({
  organization,
  onSubmit,
  onCancel,
}: {
  organization?: Organization;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: organization?.name || "",
    type: organization?.type || "ngo",
    region: organization?.region || "",
    country: organization?.country || "",
    description: organization?.description || "",
    website: organization?.website || "",
    foundedYear: organization?.foundedYear || new Date().getFullYear(),
    teamSize: organization?.teamSize || 1,
    missionStatement: organization?.metadata.missionStatement || "",
    specializations: organization?.metadata.specializations?.join(", ") || "",
    languages: organization?.metadata.languages?.join(", ") || "",
    operatingRegions: organization?.metadata.operatingRegions?.join(", ") || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      metadata: {
        missionStatement: formData.missionStatement,
        specializations: formData.specializations
          .split(",")
          .map((s) => s.trim()),
        languages: formData.languages.split(",").map((s) => s.trim()),
        operatingRegions: formData.operatingRegions
          .split(",")
          .map((s) => s.trim()),
      },
    };
    onSubmit(submitData);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {organization ? "Edit Organization" : "Register New Organization"}
        </DialogTitle>
        <DialogDescription>
          {organization
            ? "Update organization information"
            : "Register your organization with the PAXIS network"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Organization Type</Label>
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
                <SelectItem value="ngo">NGO</SelectItem>
                <SelectItem value="peace_mission">Peace Mission</SelectItem>
                <SelectItem value="research_lab">Research Lab</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="space-y-2">
          <Label htmlFor="missionStatement">Mission Statement</Label>
          <Textarea
            id="missionStatement"
            value={formData.missionStatement}
            onChange={(e) =>
              setFormData({ ...formData, missionStatement: e.target.value })
            }
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website">Website (Optional)</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="foundedYear">Founded Year</Label>
            <Input
              id="foundedYear"
              type="number"
              value={formData.foundedYear}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  foundedYear: parseInt(e.target.value),
                })
              }
              min="1800"
              max={new Date().getFullYear()}
            />
          </div>
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

        <div className="space-y-2">
          <Label htmlFor="specializations">
            Specializations (comma-separated)
          </Label>
          <Input
            id="specializations"
            value={formData.specializations}
            onChange={(e) =>
              setFormData({ ...formData, specializations: e.target.value })
            }
            placeholder="e.g., Conflict Mediation, Water Diplomacy, Digital Peace"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="languages">Languages (comma-separated)</Label>
          <Input
            id="languages"
            value={formData.languages}
            onChange={(e) =>
              setFormData({ ...formData, languages: e.target.value })
            }
            placeholder="e.g., English, Arabic, French"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="operatingRegions">
            Operating Regions (comma-separated)
          </Label>
          <Input
            id="operatingRegions"
            value={formData.operatingRegions}
            onChange={(e) =>
              setFormData({ ...formData, operatingRegions: e.target.value })
            }
            placeholder="e.g., Middle East, Africa, Southeast Asia"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="peace-gradient">
            {organization ? "Update Organization" : "Register Organization"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );

  function getTypeColor(type: string) {
    const colors = {
      ngo: "bg-green-100 text-green-800",
      peace_mission: "bg-blue-100 text-blue-800",
      research_lab: "bg-purple-100 text-purple-800",
      government: "bg-orange-100 text-orange-800",
      private: "bg-gray-100 text-gray-800",
    };
    return colors[type as keyof typeof colors] || colors.private;
  }
}
