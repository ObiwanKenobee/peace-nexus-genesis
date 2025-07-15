import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Plus,
  Save,
  Edit,
  X,
  Star,
  Users,
  MapPin,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  Eye,
  Heart,
  Coins,
  Globe,
  TreePine,
  Mountain,
  Waves,
  Leaf,
  Bird,
  Fish,
  Shield,
  Award,
  Search,
  Filter,
  Download,
  Share,
  Upload,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Zap,
  Camera,
  FileText,
  Video,
  Mic,
  Link,
  Mail,
  Phone,
  ExternalLink,
  Trash2,
  Flag,
  Crown,
  Smartphone,
  Laptop,
  Database,
  Code,
  Settings,
  Lock,
} from "lucide-react";

interface ConservationProject {
  id: string;
  title: string;
  description: string;
  category:
    | "habitat_restoration"
    | "species_protection"
    | "research"
    | "education"
    | "community_engagement"
    | "technology"
    | "policy_advocacy";
  status:
    | "planning"
    | "fundraising"
    | "active"
    | "completed"
    | "paused"
    | "cancelled";
  priority: "low" | "medium" | "high" | "critical";
  location: {
    country: string;
    region: string;
    coordinates?: { lat: number; lng: number };
  };
  targetSpecies: string[];
  ecosystems: string[];
  sdgGoals: number[]; // UN Sustainable Development Goals
  creatorId: string;
  creatorName: string;
  organization?: string;
  partnersOrganizations: string[];
  timeline: {
    startDate: string;
    endDate: string;
    milestones: Milestone[];
  };
  budget: {
    totalRequired: number;
    currentFunding: number;
    currency: string;
    fundingSources: FundingSource[];
  };
  impact: {
    expectedBeneficiaries: number;
    estimatedCO2Reduction: number;
    habitatAreaProtected: number;
    speciesPopulationTarget: number;
    communityJobsCreated: number;
  };
  methodology: string;
  successMetrics: SuccessMetric[];
  risksAndMitigation: Risk[];
  team: TeamMember[];
  volunteers: Volunteer[];
  updates: ProjectUpdate[];
  documents: Document[];
  media: MediaFile[];
  certifications: string[];
  faithIntegration: {
    traditions: string[];
    spiritualApproach: string;
    blessings: string[];
  };
  communityEngagement: {
    localPartners: string[];
    stakeholderGroups: string[];
    consultationMethods: string[];
  };
  technology: {
    platforms: string[];
    monitoringTools: string[];
    innovationAspects: string[];
  };
  peaceCoinsGenerated: number;
  supporters: number;
  views: number;
  featured: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedDate?: string;
  deliverables: string[];
  responsibleTeam: string[];
}

interface FundingSource {
  id: string;
  source: string;
  amount: number;
  confirmed: boolean;
  receivedDate?: string;
  conditions?: string[];
}

interface SuccessMetric {
  id: string;
  metric: string;
  target: number;
  current: number;
  unit: string;
  measurementMethod: string;
}

interface Risk {
  id: string;
  risk: string;
  probability: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  mitigation: string;
  owner: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  organization?: string;
  contact: string;
  commitment: string; // e.g., "50% time", "weekends only"
}

interface Volunteer {
  id: string;
  name: string;
  skills: string[];
  availability: string;
  location: string;
  experience: string;
}

interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  type:
    | "progress"
    | "milestone"
    | "challenge"
    | "success"
    | "funding"
    | "media";
  authorId: string;
  authorName: string;
  timestamp: string;
  attachments: string[];
  visibility: "public" | "supporters" | "team";
}

interface Document {
  id: string;
  title: string;
  type:
    | "proposal"
    | "report"
    | "permit"
    | "agreement"
    | "certification"
    | "study";
  url: string;
  uploadDate: string;
  size: number;
  access: "public" | "supporters" | "team" | "private";
}

interface MediaFile {
  id: string;
  title: string;
  type: "image" | "video" | "audio" | "360_photo" | "drone_footage";
  url: string;
  thumbnail?: string;
  caption: string;
  location?: string;
  timestamp: string;
  tags: string[];
}

// Mock data
const mockProjects: ConservationProject[] = [
  {
    id: "project-001",
    title: "Sacred Grove Restoration - Amazon Sanctuary",
    description:
      "Comprehensive restoration of 500 hectares of degraded Amazon rainforest, integrating indigenous wisdom with modern conservation science. The project focuses on creating sacred corridors for endangered species while supporting local communities through sustainable livelihoods.",
    category: "habitat_restoration",
    status: "active",
    priority: "high",
    location: {
      country: "Brazil",
      region: "Amazon Basin",
      coordinates: { lat: -3.4653, lng: -62.2159 },
    },
    targetSpecies: [
      "Amazon River Dolphin",
      "Jaguar",
      "Harpy Eagle",
      "Giant Otter",
    ],
    ecosystems: ["Tropical Rainforest", "River System"],
    sdgGoals: [13, 14, 15, 1, 8], // Climate, Water, Life on Land, Poverty, Economic Growth
    creatorId: "user-123",
    creatorName: "Dr. Maria Santos",
    organization: "Amazon Conservation Institute",
    partnersOrganizations: [
      "Local Indigenous Tribes",
      "Wildlife Conservation Society",
      "PAXIS Foundation",
    ],
    timeline: {
      startDate: "2024-01-15",
      endDate: "2027-01-15",
      milestones: [
        {
          id: "milestone-001",
          title: "Site Assessment and Community Consultation",
          description:
            "Complete ecological assessment and engage all stakeholder communities",
          dueDate: "2024-03-15",
          completed: true,
          completedDate: "2024-03-10",
          deliverables: [
            "Ecological baseline report",
            "Community agreement",
            "Restoration plan",
          ],
          responsibleTeam: ["Research Team", "Community Liaisons"],
        },
        {
          id: "milestone-002",
          title: "Phase 1 Planting - 100 hectares",
          description: "Plant native species in first restoration zone",
          dueDate: "2024-08-15",
          completed: false,
          deliverables: [
            "100 hectares planted",
            "Monitoring system installed",
            "Community training completed",
          ],
          responsibleTeam: ["Field Team", "Local Partners"],
        },
      ],
    },
    budget: {
      totalRequired: 2500000,
      currentFunding: 1800000,
      currency: "USD",
      fundingSources: [
        {
          id: "funding-001",
          source: "Global Environment Facility",
          amount: 1000000,
          confirmed: true,
          receivedDate: "2024-01-20",
        },
        {
          id: "funding-002",
          source: "PAXIS Community Donations",
          amount: 800000,
          confirmed: true,
          receivedDate: "2024-02-01",
        },
        {
          id: "funding-003",
          source: "Corporate Sponsorship - EcoTech Solutions",
          amount: 700000,
          confirmed: false,
          conditions: ["Technology integration", "Impact reporting"],
        },
      ],
    },
    impact: {
      expectedBeneficiaries: 12000,
      estimatedCO2Reduction: 50000,
      habitatAreaProtected: 500,
      speciesPopulationTarget: 1000,
      communityJobsCreated: 150,
    },
    methodology:
      "Ecosystem-based restoration combining traditional indigenous knowledge with scientific monitoring. Using drone technology for monitoring, community-based management, and faith-integrated ceremonial blessings at key milestones.",
    successMetrics: [
      {
        id: "metric-001",
        metric: "Tree Survival Rate",
        target: 85,
        current: 78,
        unit: "%",
        measurementMethod: "Monthly field surveys",
      },
      {
        id: "metric-002",
        metric: "Species Return Rate",
        target: 15,
        current: 8,
        unit: "species",
        measurementMethod: "Camera trap monitoring",
      },
    ],
    risksAndMitigation: [
      {
        id: "risk-001",
        risk: "Illegal logging in project area",
        probability: "medium",
        impact: "high",
        mitigation:
          "24/7 monitoring system, community ranger program, legal enforcement partnerships",
        owner: "Security Team Lead",
      },
    ],
    team: [
      {
        id: "team-001",
        name: "Dr. Maria Santos",
        role: "Project Director",
        expertise: [
          "Rainforest Ecology",
          "Community Engagement",
          "Project Management",
        ],
        organization: "Amazon Conservation Institute",
        contact: "maria.santos@example.org",
        commitment: "100% time",
      },
      {
        id: "team-002",
        name: "Chief Raoni Metuktire",
        role: "Indigenous Wisdom Advisor",
        expertise: [
          "Traditional Ecological Knowledge",
          "Community Leadership",
          "Sacred Site Management",
        ],
        organization: "Kayapo Indigenous Nation",
        contact: "tribal.council@example.org",
        commitment: "Advisory role",
      },
    ],
    volunteers: [
      {
        id: "vol-001",
        name: "Sarah Johnson",
        skills: ["Environmental Science", "Data Analysis", "Portuguese"],
        availability: "6 months full-time",
        location: "International - willing to relocate",
        experience: "3 years with Peace Corps environmental programs",
      },
    ],
    updates: [
      {
        id: "update-001",
        title: "Milestone Achievement: Community Consultation Complete",
        content:
          "Successfully completed comprehensive consultation with all 12 indigenous communities in the project area. Achieved unanimous agreement on restoration approach and benefit-sharing framework. Elder blessing ceremony scheduled for project launch.",
        type: "milestone",
        authorId: "user-123",
        authorName: "Dr. Maria Santos",
        timestamp: "2024-03-12T14:30:00Z",
        attachments: [
          "/updates/community-agreement.pdf",
          "/updates/blessing-ceremony.jpg",
        ],
        visibility: "public",
      },
    ],
    documents: [
      {
        id: "doc-001",
        title: "Environmental Impact Assessment",
        type: "study",
        url: "/documents/eia-amazon-project.pdf",
        uploadDate: "2024-01-20",
        size: 15728640, // 15MB
        access: "public",
      },
    ],
    media: [
      {
        id: "media-001",
        title: "Aerial View of Restoration Site",
        type: "drone_footage",
        url: "/media/amazon-drone-footage.mp4",
        thumbnail: "/media/amazon-thumbnail.jpg",
        caption: "Drone footage showing current state of restoration area",
        location: "Amazon Basin, Brazil",
        timestamp: "2024-02-15T10:00:00Z",
        tags: ["restoration", "amazon", "before"],
      },
    ],
    certifications: [
      "FSC Certified",
      "Gold Standard",
      "UN SDG Impact Certified",
    ],
    faithIntegration: {
      traditions: ["Indigenous Shamanic", "Catholic", "Protestant"],
      spiritualApproach:
        "Sacred grove concept with multi-faith blessing ceremonies",
      blessings: [
        "Monthly full moon ceremonies",
        "Seasonal planting blessings",
        "Harvest thanksgiving rituals",
      ],
    },
    communityEngagement: {
      localPartners: [
        "Kayapo Nation",
        "Xingu River Communities",
        "Regional Farmer Cooperatives",
      ],
      stakeholderGroups: [
        "Indigenous Leaders",
        "Local Farmers",
        "Government Officials",
        "NGO Partners",
      ],
      consultationMethods: [
        "Village assemblies",
        "Elder councils",
        "Youth focus groups",
        "Women's circles",
      ],
    },
    technology: {
      platforms: [
        "Satellite monitoring",
        "Drone surveillance",
        "IoT sensors",
        "Mobile data collection",
      ],
      monitoringTools: [
        "Camera traps",
        "Acoustic monitoring",
        "Water quality sensors",
        "Soil analysis kits",
      ],
      innovationAspects: [
        "AI species identification",
        "Blockchain impact tracking",
        "VR community engagement",
      ],
    },
    peaceCoinsGenerated: 45600,
    supporters: 1247,
    views: 8934,
    featured: true,
    verified: true,
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-03-12T14:30:00Z",
  },
  {
    id: "project-002",
    title: "Urban Wildlife Corridors - Sacred City Spaces",
    description:
      "Creating interconnected wildlife corridors through urban environments, transforming city spaces into sacred habitats that support both biodiversity and human well-being through faith-based community engagement.",
    category: "habitat_restoration",
    status: "fundraising",
    priority: "medium",
    location: {
      country: "Kenya",
      region: "Nairobi Metropolitan Area",
      coordinates: { lat: -1.2921, lng: 36.8219 },
    },
    targetSpecies: ["Urban Birds", "Pollinators", "Small Mammals"],
    ecosystems: ["Urban Green Spaces", "Riparian Corridors"],
    sdgGoals: [11, 15, 3, 17], // Sustainable Cities, Life on Land, Health, Partnerships
    creatorId: "user-456",
    creatorName: "Rev. Grace Wanjiku",
    organization: "Nairobi Faith & Environment Network",
    partnersOrganizations: [
      "City Council of Nairobi",
      "Kenya Wildlife Service",
      "Local Churches",
    ],
    timeline: {
      startDate: "2024-06-01",
      endDate: "2025-12-31",
      milestones: [
        {
          id: "milestone-003",
          title: "Community Mapping and Design",
          description:
            "Map existing green spaces and design corridor connections",
          dueDate: "2024-08-01",
          completed: false,
          deliverables: [
            "Corridor design plan",
            "Community input integration",
            "Permit applications",
          ],
          responsibleTeam: ["Urban Planning Team", "Community Coordinators"],
        },
      ],
    },
    budget: {
      totalRequired: 450000,
      currentFunding: 125000,
      currency: "USD",
      fundingSources: [
        {
          id: "funding-004",
          source: "UN Habitat Urban Innovation Fund",
          amount: 200000,
          confirmed: false,
        },
      ],
    },
    impact: {
      expectedBeneficiaries: 850000,
      estimatedCO2Reduction: 5000,
      habitatAreaProtected: 25,
      speciesPopulationTarget: 500,
      communityJobsCreated: 45,
    },
    methodology:
      "Faith-based community organizing combined with urban ecology principles. Integrating prayer gardens, meditation spaces, and wildlife observation areas.",
    successMetrics: [],
    risksAndMitigation: [],
    team: [],
    volunteers: [],
    updates: [],
    documents: [],
    media: [],
    certifications: [],
    faithIntegration: {
      traditions: ["Christianity", "Islam", "Traditional African"],
      spiritualApproach: "Sacred urban oases with interfaith stewardship",
      blessings: [
        "Quarterly blessing ceremonies",
        "Earth Day celebrations",
        "Harvest festivals",
      ],
    },
    communityEngagement: {
      localPartners: [
        "Religious Communities",
        "School Groups",
        "Environmental Clubs",
      ],
      stakeholderGroups: [
        "Faith Leaders",
        "Youth Groups",
        "Local Businesses",
        "City Officials",
      ],
      consultationMethods: [
        "Faith community meetings",
        "School assemblies",
        "Business roundtables",
      ],
    },
    technology: {
      platforms: [
        "Mobile apps for citizen science",
        "QR codes for educational content",
      ],
      monitoringTools: [
        "Bird counting apps",
        "Pollinator surveys",
        "Air quality monitors",
      ],
      innovationAspects: [
        "Augmented reality nature guides",
        "Community reporting platforms",
      ],
    },
    peaceCoinsGenerated: 8900,
    supporters: 234,
    views: 2156,
    featured: false,
    verified: true,
    createdAt: "2024-02-20T11:15:00Z",
    updatedAt: "2024-02-25T16:45:00Z",
  },
];

export default function ConservationProjects() {
  const [projects, setProjects] = useState<ConservationProject[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] =
    useState<ConservationProject[]>(mockProjects);
  const [selectedProject, setSelectedProject] =
    useState<ConservationProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  const [newProject, setNewProject] = useState<Partial<ConservationProject>>({
    category: "habitat_restoration",
    status: "planning",
    priority: "medium",
    location: { country: "", region: "" },
    targetSpecies: [],
    ecosystems: [],
    sdgGoals: [],
    partnersOrganizations: [],
    budget: {
      totalRequired: 0,
      currentFunding: 0,
      currency: "USD",
      fundingSources: [],
    },
    impact: {
      expectedBeneficiaries: 0,
      estimatedCO2Reduction: 0,
      habitatAreaProtected: 0,
      speciesPopulationTarget: 0,
      communityJobsCreated: 0,
    },
    timeline: { startDate: "", endDate: "", milestones: [] },
    team: [],
    volunteers: [],
    updates: [],
    documents: [],
    media: [],
    certifications: [],
    faithIntegration: { traditions: [], spiritualApproach: "", blessings: [] },
    technology: { platforms: [], monitoringTools: [], innovationAspects: [] },
    featured: false,
    verified: false,
  });

  // Filter projects
  useEffect(() => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.organization?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter((p) => p.category === filterCategory);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    if (filterPriority !== "all") {
      filtered = filtered.filter((p) => p.priority === filterPriority);
    }

    setFilteredProjects(filtered);
  }, [projects, searchTerm, filterCategory, filterStatus, filterPriority]);

  const handleCreateProject = () => {
    if (newProject.title && newProject.description) {
      const project: ConservationProject = {
        id: `project-${Date.now()}`,
        title: newProject.title,
        description: newProject.description,
        category: newProject.category || "habitat_restoration",
        status: "planning",
        priority: newProject.priority || "medium",
        location: newProject.location || { country: "", region: "" },
        targetSpecies: newProject.targetSpecies || [],
        ecosystems: newProject.ecosystems || [],
        sdgGoals: newProject.sdgGoals || [],
        creatorId: "current-user",
        creatorName: "Current User",
        organization: newProject.organization,
        partnersOrganizations: newProject.partnersOrganizations || [],
        timeline: newProject.timeline || {
          startDate: "",
          endDate: "",
          milestones: [],
        },
        budget: newProject.budget || {
          totalRequired: 0,
          currentFunding: 0,
          currency: "USD",
          fundingSources: [],
        },
        impact: newProject.impact || {
          expectedBeneficiaries: 0,
          estimatedCO2Reduction: 0,
          habitatAreaProtected: 0,
          speciesPopulationTarget: 0,
          communityJobsCreated: 0,
        },
        methodology: newProject.methodology || "",
        successMetrics: [],
        risksAndMitigation: [],
        team: [],
        volunteers: [],
        updates: [],
        documents: [],
        media: [],
        certifications: [],
        faithIntegration: newProject.faithIntegration || {
          traditions: [],
          spiritualApproach: "",
          blessings: [],
        },
        communityEngagement: {
          localPartners: [],
          stakeholderGroups: [],
          consultationMethods: [],
        },
        technology: newProject.technology || {
          platforms: [],
          monitoringTools: [],
          innovationAspects: [],
        },
        peaceCoinsGenerated: 0,
        supporters: 0,
        views: 0,
        featured: false,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setProjects((prev) => [...prev, project]);
      setNewProject({
        category: "habitat_restoration",
        status: "planning",
        priority: "medium",
        location: { country: "", region: "" },
        targetSpecies: [],
        ecosystems: [],
        sdgGoals: [],
        partnersOrganizations: [],
        budget: {
          totalRequired: 0,
          currentFunding: 0,
          currency: "USD",
          fundingSources: [],
        },
        impact: {
          expectedBeneficiaries: 0,
          estimatedCO2Reduction: 0,
          habitatAreaProtected: 0,
          speciesPopulationTarget: 0,
          communityJobsCreated: 0,
        },
        timeline: { startDate: "", endDate: "", milestones: [] },
        team: [],
        volunteers: [],
        updates: [],
        documents: [],
        media: [],
        certifications: [],
        faithIntegration: {
          traditions: [],
          spiritualApproach: "",
          blessings: [],
        },
        technology: {
          platforms: [],
          monitoringTools: [],
          innovationAspects: [],
        },
        featured: false,
        verified: false,
      });
      setIsCreating(false);
      console.log("New project created:", project);
    }
  };

  const handleSupportProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              supporters: p.supporters + 1,
              peaceCoinsGenerated: p.peaceCoinsGenerated + 100,
            }
          : p,
      ),
    );
    console.log("Supported project:", projectId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-100 text-blue-800";
      case "fundraising":
        return "bg-yellow-100 text-yellow-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "paused":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "habitat_restoration":
        return TreePine;
      case "species_protection":
        return Shield;
      case "research":
        return BarChart3;
      case "education":
        return Users;
      case "community_engagement":
        return Heart;
      case "technology":
        return Zap;
      case "policy_advocacy":
        return Flag;
      default:
        return Target;
    }
  };

  const categories = [
    "all",
    "habitat_restoration",
    "species_protection",
    "research",
    "education",
    "community_engagement",
    "technology",
    "policy_advocacy",
  ];
  const statuses = [
    "all",
    "planning",
    "fundraising",
    "active",
    "completed",
    "paused",
    "cancelled",
  ];
  const priorities = ["all", "low", "medium", "high", "critical"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Conservation Projects</h1>
          <p className="text-gray-600">
            Community-driven conservation projects with faith-based integration
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Project
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">{projects.length}</h3>
            <p className="text-gray-600">Total Projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              {projects.filter((p) => p.status === "active").length}
            </h3>
            <p className="text-gray-600">Active Projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Coins className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              $
              {projects
                .reduce((total, p) => total + p.budget.currentFunding, 0)
                .toLocaleString()}
            </h3>
            <p className="text-gray-600">Total Funding Raised</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">
              {new Set(projects.map((p) => p.location.country)).size}
            </h3>
            <p className="text-gray-600">Countries</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search projects by title, description, or organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All Categories"
                    : cat
                        .replace("_", " ")
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority === "all"
                    ? "All Priorities"
                    : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Create Project Form */}
      {isCreating && (
        <Card className="border-2 border-green-300 bg-green-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">
              Create New Conservation Project
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Project title"
                  value={newProject.title || ""}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Organization (optional)"
                  value={newProject.organization || ""}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      organization: e.target.value,
                    }))
                  }
                />
              </div>

              <Textarea
                placeholder="Project description"
                value={newProject.description || ""}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={4}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  value={newProject.category || "habitat_restoration"}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      category: e.target.value as any,
                    }))
                  }
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat
                        .replace("_", " ")
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" ")}
                    </option>
                  ))}
                </select>
                <select
                  value={newProject.priority || "medium"}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      priority: e.target.value as any,
                    }))
                  }
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  {priorities.slice(1).map((priority) => (
                    <option key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
                <Input
                  placeholder="Funding required (USD)"
                  type="number"
                  value={newProject.budget?.totalRequired || ""}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      budget: {
                        ...prev.budget,
                        totalRequired: parseInt(e.target.value) || 0,
                        currentFunding: prev.budget?.currentFunding || 0,
                        currency: "USD",
                        fundingSources: [],
                      },
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Country"
                  value={newProject.location?.country || ""}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        country: e.target.value,
                        region: prev.location?.region || "",
                      },
                    }))
                  }
                />
                <Input
                  placeholder="Region"
                  value={newProject.location?.region || ""}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        country: prev.location?.country || "",
                        region: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Start date"
                  type="date"
                  value={newProject.timeline?.startDate || ""}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      timeline: {
                        ...prev.timeline,
                        startDate: e.target.value,
                        endDate: prev.timeline?.endDate || "",
                        milestones: [],
                      },
                    }))
                  }
                />
                <Input
                  placeholder="End date"
                  type="date"
                  value={newProject.timeline?.endDate || ""}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      timeline: {
                        ...prev.timeline,
                        startDate: prev.timeline?.startDate || "",
                        endDate: e.target.value,
                        milestones: [],
                      },
                    }))
                  }
                />
              </div>

              <Textarea
                placeholder="Methodology and approach"
                value={newProject.methodology || ""}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    methodology: e.target.value,
                  }))
                }
                rows={3}
              />

              <div className="flex items-center space-x-3">
                <Button onClick={handleCreateProject}>
                  <Save className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredProjects.map((project) => {
            const CategoryIcon = getCategoryIcon(project.category);
            const fundingProgress =
              (project.budget.currentFunding / project.budget.totalRequired) *
              100;

            return (
              <Card
                key={project.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedProject?.id === project.id
                    ? "ring-2 ring-blue-500"
                    : ""
                } ${project.featured ? "border-yellow-300 bg-yellow-50" : ""}`}
                onClick={() => setSelectedProject(project)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <CategoryIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-xl font-bold">{project.title}</h3>
                          {project.featured && (
                            <Crown className="w-5 h-5 text-yellow-600" />
                          )}
                          {project.verified && (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <p className="text-gray-600">{project.organization}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {project.location.country}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(
                              project.timeline.startDate || project.createdAt,
                            ).getFullYear()}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {project.views}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Funding Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Funding Progress</span>
                      <span>
                        ${project.budget.currentFunding.toLocaleString()} / $
                        {project.budget.totalRequired.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={fundingProgress} className="h-3" />
                    <div className="text-xs text-gray-500 mt-1">
                      {Math.round(fundingProgress)}% funded
                    </div>
                  </div>

                  {/* Target Species */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.targetSpecies
                        .slice(0, 3)
                        .map((species, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {species}
                          </Badge>
                        ))}
                      {project.targetSpecies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.targetSpecies.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Faith Integration */}
                  {project.faithIntegration.traditions.length > 0 && (
                    <div className="mb-4 bg-purple-50 p-3 rounded-lg">
                      <h5 className="text-sm font-medium mb-1">
                        Faith Integration
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {project.faithIntegration.traditions.map(
                          (tradition, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-purple-100"
                            >
                              {tradition}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.supporters} supporters
                      </span>
                      <span className="flex items-center">
                        <Coins className="w-4 h-4 mr-1" />
                        {project.peaceCoinsGenerated} PC
                      </span>
                    </div>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSupportProject(project.id);
                      }}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Project Detail Panel */}
        <div className="space-y-6">
          {selectedProject ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedProject.title}</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Share className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
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
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="updates">Updates</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Project Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Category:</span>
                            <span className="capitalize">
                              {selectedProject.category.replace("_", " ")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Location:</span>
                            <span>
                              {selectedProject.location.country},{" "}
                              {selectedProject.location.region}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Timeline:</span>
                            <span>
                              {selectedProject.timeline.startDate &&
                                new Date(
                                  selectedProject.timeline.startDate,
                                ).getFullYear()}{" "}
                              -
                              {selectedProject.timeline.endDate &&
                                new Date(
                                  selectedProject.timeline.endDate,
                                ).getFullYear()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Created:</span>
                            <span>
                              {new Date(
                                selectedProject.createdAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Expected Impact</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="text-center p-2 bg-blue-50 rounded">
                            <div className="font-bold">
                              {selectedProject.impact.expectedBeneficiaries.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">
                              Beneficiaries
                            </div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded">
                            <div className="font-bold">
                              {selectedProject.impact.habitatAreaProtected}
                            </div>
                            <div className="text-xs text-gray-600">
                              Hectares Protected
                            </div>
                          </div>
                          <div className="text-center p-2 bg-purple-50 rounded">
                            <div className="font-bold">
                              {selectedProject.impact.estimatedCO2Reduction.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">
                              CO₂ Reduced (tons)
                            </div>
                          </div>
                          <div className="text-center p-2 bg-yellow-50 rounded">
                            <div className="font-bold">
                              {selectedProject.impact.communityJobsCreated}
                            </div>
                            <div className="text-xs text-gray-600">
                              Jobs Created
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Target Species</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedProject.targetSpecies.map(
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

                      <div>
                        <h4 className="font-semibold mb-2">
                          Faith Integration
                        </h4>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <p className="text-sm text-purple-800 mb-2">
                            {selectedProject.faithIntegration.spiritualApproach}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {selectedProject.faithIntegration.traditions.map(
                              (tradition, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs bg-purple-100"
                                >
                                  {tradition}
                                </Badge>
                              ),
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Methodology</h4>
                        <p className="text-sm text-gray-700">
                          {selectedProject.methodology}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="progress" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Funding Progress</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Current Funding</span>
                          <span className="font-bold">
                            $
                            {selectedProject.budget.currentFunding.toLocaleString()}
                          </span>
                        </div>
                        <Progress
                          value={
                            (selectedProject.budget.currentFunding /
                              selectedProject.budget.totalRequired) *
                            100
                          }
                          className="h-3"
                        />
                        <div className="text-xs text-gray-500">
                          {Math.round(
                            (selectedProject.budget.currentFunding /
                              selectedProject.budget.totalRequired) *
                              100,
                          )}
                          % of $
                          {selectedProject.budget.totalRequired.toLocaleString()}{" "}
                          goal
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Funding Sources</h4>
                      <div className="space-y-2">
                        {selectedProject.budget.fundingSources.map((source) => (
                          <div
                            key={source.id}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div>
                              <div className="font-medium text-sm">
                                {source.source}
                              </div>
                              <div className="text-xs text-gray-500">
                                ${source.amount.toLocaleString()} •{" "}
                                {source.confirmed ? "Confirmed" : "Pending"}
                              </div>
                            </div>
                            <Badge
                              variant={source.confirmed ? "default" : "outline"}
                              className="text-xs"
                            >
                              {source.confirmed ? "Received" : "Pending"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Milestones</h4>
                      <div className="space-y-3">
                        {selectedProject.timeline.milestones.map(
                          (milestone) => (
                            <div
                              key={milestone.id}
                              className="p-3 border rounded-lg"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-sm">
                                  {milestone.title}
                                </h5>
                                <Badge
                                  variant={
                                    milestone.completed ? "default" : "outline"
                                  }
                                  className="text-xs"
                                >
                                  {milestone.completed
                                    ? "Completed"
                                    : "Pending"}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-2">
                                {milestone.description}
                              </p>
                              <div className="text-xs text-gray-500">
                                Due:{" "}
                                {new Date(
                                  milestone.dueDate,
                                ).toLocaleDateString()}
                                {milestone.completedDate &&
                                  ` • Completed: ${new Date(milestone.completedDate).toLocaleDateString()}`}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    {selectedProject.successMetrics.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Success Metrics</h4>
                        <div className="space-y-3">
                          {selectedProject.successMetrics.map((metric) => (
                            <div
                              key={metric.id}
                              className="p-3 border rounded-lg"
                            >
                              <div className="flex justify-between text-sm mb-2">
                                <span>{metric.metric}</span>
                                <span>
                                  {metric.current} / {metric.target}{" "}
                                  {metric.unit}
                                </span>
                              </div>
                              <Progress
                                value={(metric.current / metric.target) * 100}
                                className="h-2"
                              />
                              <div className="text-xs text-gray-500 mt-1">
                                {metric.measurementMethod}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="team" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Core Team</h4>
                      <div className="space-y-3">
                        {selectedProject.team.map((member) => (
                          <div
                            key={member.id}
                            className="p-3 border rounded-lg"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-medium">{member.name}</h5>
                                <p className="text-sm text-gray-600">
                                  {member.role}
                                </p>
                                {member.organization && (
                                  <p className="text-xs text-gray-500">
                                    {member.organization}
                                  </p>
                                )}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {member.commitment}
                              </Badge>
                            </div>
                            <div className="mt-2">
                              <div className="text-xs text-gray-600 mb-1">
                                Expertise:
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {member.expertise.map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedProject.volunteers.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Volunteers</h4>
                        <div className="space-y-3">
                          {selectedProject.volunteers.map((volunteer) => (
                            <div
                              key={volunteer.id}
                              className="p-3 border rounded-lg"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h5 className="font-medium text-sm">
                                    {volunteer.name}
                                  </h5>
                                  <p className="text-xs text-gray-600">
                                    {volunteer.location}
                                  </p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {volunteer.availability}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600 mb-1">
                                Skills:
                              </div>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {volunteer.skills.map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-xs text-gray-700">
                                {volunteer.experience}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Want to Join?</h5>
                      <p className="text-sm text-gray-700 mb-3">
                        This project is looking for volunteers with skills in
                        ecology, community engagement, and project management.
                      </p>
                      <Button size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Apply to Join
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="updates" className="space-y-4">
                    <div className="space-y-4">
                      {selectedProject.updates.map((update) => (
                        <div key={update.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium">{update.title}</h5>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {update.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {update.visibility}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-3">
                            {update.content}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>By {update.authorName}</span>
                            <span>
                              {new Date(update.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          {update.attachments.length > 0 && (
                            <div className="mt-3 flex space-x-2">
                              {update.attachments.map((attachment, index) => (
                                <Button key={index} size="sm" variant="outline">
                                  <FileText className="w-3 h-3 mr-1" />
                                  View
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Follow This Project</h5>
                      <p className="text-sm text-gray-700 mb-3">
                        Get notified about important updates, milestones, and
                        opportunities to contribute.
                      </p>
                      <Button size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Follow Updates
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Select a Project
                </h3>
                <p className="text-gray-500">
                  Choose a project from the list to view detailed information
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
