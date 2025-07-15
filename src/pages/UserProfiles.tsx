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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Award,
  Star,
  TrendingUp,
  Activity,
  Brain,
  Zap,
  Shield,
  Eye,
  Languages,
  Heart,
  Target,
  Coins,
  Settings,
  Link as LinkIcon,
  Camera,
  Edit,
  Trash2,
  Medal,
  Crown,
  Gem,
  CheckCircle,
  Lock,
  Unlock,
  Network,
  Headphones,
} from "lucide-react";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  archetype: string;

  // Basic Info
  bio: string;
  location: {
    country: string;
    region: string;
    city: string;
    coordinates?: { lat: number; lng: number };
    timezone: string;
  };

  // Languages & Skills
  languages: {
    code: string;
    name: string;
    proficiency: "native" | "fluent" | "conversational" | "basic";
  }[];
  skills: {
    name: string;
    category:
      | "mediation"
      | "technical"
      | "cultural"
      | "research"
      | "diplomacy"
      | "education";
    level: number; // 1-10
    verified: boolean;
  }[];

  // Peace Credentials & SoulBound Tokens (SBT)
  soulboundCredentials: SoulboundCredential[];
  achievements: Achievement[];
  peaceCoinsEarned: number;
  reputationScore: number;
  trustLevel: number;

  // VR & Training
  vrEmpathyScores: {
    cultural: number;
    conflict: number;
    negotiation: number;
    overall: number;
  };
  trainingModules: TrainingModule[];

  // Activity & Contributions
  projectsContributed: number;
  conflictsMediated: number;
  peaceActions: PeaceAction[];
  lastActive: string;
  joinDate: string;

  // Privacy & Security
  privacySettings: {
    profileVisibility: "public" | "network" | "private";
    locationVisible: boolean;
    contactVisible: boolean;
    activityVisible: boolean;
  };

  // Social & Network
  followers: number;
  following: number;
  peaceNetworkConnections: number;
  mentorshipRole: "mentor" | "mentee" | "both" | "none";

  // Verification & KYC
  verificationStatus: "verified" | "pending" | "unverified";
  kycLevel: "none" | "basic" | "full" | "zk_verified"; // Zero-knowledge verified

  metadata: {
    interests: string[];
    expertise: string[];
    availability: "full_time" | "part_time" | "volunteer" | "emergency_only";
    missionAlignment: string[];
  };
}

interface SoulboundCredential {
  id: string;
  name: string;
  description: string;
  category:
    | "mediation"
    | "education"
    | "technical"
    | "leadership"
    | "impact"
    | "special";
  level: number;
  issuer: string;
  issueDate: string;
  nftHash?: string;
  verified: boolean;
  rarity: "common" | "rare" | "epic" | "legendary" | "unique";
  attributes: {
    [key: string]: any;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  peaceCoinsAwarded: number;
  category:
    | "conflict_resolution"
    | "community_building"
    | "innovation"
    | "leadership"
    | "collaboration";
}

interface TrainingModule {
  id: string;
  name: string;
  category:
    | "vr_empathy"
    | "negotiation"
    | "cultural_sensitivity"
    | "crisis_management"
    | "leadership";
  progress: number;
  completedDate?: string;
  vrScore?: number;
}

interface PeaceAction {
  id: string;
  type:
    | "mediation"
    | "education"
    | "resource_sharing"
    | "conflict_prevention"
    | "community_support";
  title: string;
  description: string;
  date: string;
  peaceCoinsEarned: number;
  impact: "low" | "medium" | "high" | "transformative";
  verified: boolean;
}

export default function UserProfiles() {
  const { user } = usePaxisAuth();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArchetype, setFilterArchetype] = useState<string>("all");
  const [filterRegion, setFilterRegion] = useState<string>("all");
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(
    null,
  );
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list" | "network">("grid");
  const [showOwnProfile, setShowOwnProfile] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockProfiles: UserProfile[] = [
      {
        id: "1",
        username: "peace_architect_sarah",
        displayName: "Dr. Sarah Williams",
        email: "sarah@globalpeace.org",
        avatar: "https://i.pravatar.cc/150?img=1",
        archetype: "peace_architect",
        bio: "UN diplomat specializing in water resource conflicts and climate-related peace negotiations. Leading innovative diplomatic frameworks for sustainable peace.",
        location: {
          country: "Switzerland",
          region: "Europe",
          city: "Geneva",
          timezone: "CET",
        },
        languages: [
          { code: "en", name: "English", proficiency: "native" },
          { code: "fr", name: "French", proficiency: "fluent" },
          { code: "ar", name: "Arabic", proficiency: "conversational" },
          { code: "es", name: "Spanish", proficiency: "fluent" },
        ],
        skills: [
          {
            name: "Diplomatic Negotiation",
            category: "diplomacy",
            level: 9,
            verified: true,
          },
          {
            name: "Water Rights Mediation",
            category: "mediation",
            level: 8,
            verified: true,
          },
          {
            name: "Climate Diplomacy",
            category: "diplomacy",
            level: 8,
            verified: true,
          },
          {
            name: "Multilateral Treaties",
            category: "diplomacy",
            level: 9,
            verified: true,
          },
        ],
        soulboundCredentials: [
          {
            id: "sbt_1",
            name: "Master Diplomat",
            description: "Successfully mediated 10+ international conflicts",
            category: "mediation",
            level: 5,
            issuer: "UN Mediation Support Unit",
            issueDate: "2023-12-15",
            nftHash: "0x1234...abcd",
            verified: true,
            rarity: "epic",
            attributes: {
              conflicts_resolved: 12,
              countries_involved: 8,
              peace_duration: "2+ years",
            },
          },
          {
            id: "sbt_2",
            name: "Water Peace Pioneer",
            description: "Pioneered innovative water diplomacy frameworks",
            category: "special",
            level: 4,
            issuer: "Water Diplomacy Institute",
            issueDate: "2023-08-20",
            verified: true,
            rarity: "legendary",
            attributes: {
              frameworks_created: 3,
              adoption_rate: "85%",
              water_conflicts_resolved: 7,
            },
          },
        ],
        achievements: [
          {
            id: "ach_1",
            title: "Peacemaker",
            description: "Successfully resolved first international conflict",
            icon: "🕊️",
            earnedDate: "2023-06-10",
            peaceCoinsAwarded: 1000,
            category: "conflict_resolution",
          },
          {
            id: "ach_2",
            title: "Network Builder",
            description: "Connected 100+ peace professionals",
            icon: "🌐",
            earnedDate: "2023-09-15",
            peaceCoinsAwarded: 500,
            category: "community_building",
          },
        ],
        peaceCoinsEarned: 15420,
        reputationScore: 94,
        trustLevel: 9,
        vrEmpathyScores: {
          cultural: 88,
          conflict: 92,
          negotiation: 95,
          overall: 92,
        },
        trainingModules: [
          {
            id: "tm_1",
            name: "Advanced Conflict Resolution",
            category: "negotiation",
            progress: 100,
            completedDate: "2023-07-15",
          },
          {
            id: "tm_2",
            name: "Cultural Empathy VR",
            category: "vr_empathy",
            progress: 100,
            completedDate: "2023-08-20",
            vrScore: 88,
          },
        ],
        projectsContributed: 12,
        conflictsMediated: 8,
        peaceActions: [
          {
            id: "pa_1",
            type: "mediation",
            title: "Jordan-Palestine Water Rights Resolution",
            description:
              "Led mediation process for sustainable water sharing agreement",
            date: "2024-01-15",
            peaceCoinsEarned: 2000,
            impact: "transformative",
            verified: true,
          },
        ],
        lastActive: "2024-01-21",
        joinDate: "2022-03-15",
        privacySettings: {
          profileVisibility: "public",
          locationVisible: true,
          contactVisible: true,
          activityVisible: true,
        },
        followers: 1247,
        following: 389,
        peaceNetworkConnections: 542,
        mentorshipRole: "mentor",
        verificationStatus: "verified",
        kycLevel: "full",
        metadata: {
          interests: [
            "Water Diplomacy",
            "Climate Peace",
            "Multilateral Negotiations",
          ],
          expertise: [
            "International Law",
            "Environmental Governance",
            "Conflict Prevention",
          ],
          availability: "full_time",
          missionAlignment: ["SDG 6", "SDG 16", "SDG 13"],
        },
      },
      {
        id: "2",
        username: "tech_peace_alex",
        displayName: "Alex Chen",
        email: "alex@techforpeace.dev",
        avatar: "https://i.pravatar.cc/150?img=2",
        archetype: "tech_diplomat",
        bio: "Full-stack developer and AI researcher building early warning systems for conflict prevention. Passionate about Web3 solutions for peace.",
        location: {
          country: "USA",
          region: "North America",
          city: "San Francisco",
          timezone: "PST",
        },
        languages: [
          { code: "en", name: "English", proficiency: "native" },
          { code: "zh", name: "Chinese", proficiency: "native" },
          { code: "py", name: "Python", proficiency: "fluent" },
          { code: "js", name: "JavaScript", proficiency: "fluent" },
        ],
        skills: [
          {
            name: "Machine Learning",
            category: "technical",
            level: 9,
            verified: true,
          },
          {
            name: "Blockchain Development",
            category: "technical",
            level: 8,
            verified: true,
          },
          {
            name: "Conflict Prediction AI",
            category: "technical",
            level: 7,
            verified: false,
          },
          {
            name: "Data Analysis",
            category: "technical",
            level: 9,
            verified: true,
          },
        ],
        soulboundCredentials: [
          {
            id: "sbt_3",
            name: "AI Peace Engineer",
            description: "Developed AI systems that prevented 5+ conflicts",
            category: "technical",
            level: 4,
            issuer: "Tech for Peace Consortium",
            issueDate: "2023-11-30",
            verified: true,
            rarity: "rare",
            attributes: {
              ai_models_deployed: 3,
              conflicts_prevented: 5,
              accuracy_rate: "92%",
            },
          },
        ],
        achievements: [
          {
            id: "ach_3",
            title: "Code for Peace",
            description: "Contributed 1000+ lines of peace-tech code",
            icon: "💻",
            earnedDate: "2023-10-05",
            peaceCoinsAwarded: 750,
            category: "innovation",
          },
        ],
        peaceCoinsEarned: 8930,
        reputationScore: 87,
        trustLevel: 8,
        vrEmpathyScores: {
          cultural: 75,
          conflict: 68,
          negotiation: 72,
          overall: 72,
        },
        trainingModules: [
          {
            id: "tm_3",
            name: "Cross-Cultural Communication",
            category: "cultural_sensitivity",
            progress: 85,
          },
        ],
        projectsContributed: 8,
        conflictsMediated: 2,
        peaceActions: [
          {
            id: "pa_2",
            type: "innovation",
            title: "Early Warning System Deployment",
            description: "Deployed AI system in Horn of Africa",
            date: "2024-01-10",
            peaceCoinsEarned: 1500,
            impact: "high",
            verified: true,
          },
        ],
        lastActive: "2024-01-21",
        joinDate: "2023-01-20",
        privacySettings: {
          profileVisibility: "public",
          locationVisible: false,
          contactVisible: true,
          activityVisible: true,
        },
        followers: 892,
        following: 234,
        peaceNetworkConnections: 156,
        mentorshipRole: "both",
        verificationStatus: "verified",
        kycLevel: "zk_verified",
        metadata: {
          interests: ["AI for Good", "Blockchain", "Open Source"],
          expertise: ["Machine Learning", "Web3", "Data Science"],
          availability: "part_time",
          missionAlignment: ["SDG 9", "SDG 16", "SDG 17"],
        },
      },
      {
        id: "3",
        username: "grassroots_maria",
        displayName: "Maria Santos",
        email: "maria@communitypeace.org",
        avatar: "https://i.pravatar.cc/150?img=3",
        archetype: "grassroots_peacebuilder",
        bio: "Community organizer and conflict mediator working with indigenous communities in Latin America. Advocating for local peace solutions.",
        location: {
          country: "Colombia",
          region: "South America",
          city: "Bogotá",
          timezone: "COT",
        },
        languages: [
          { code: "es", name: "Spanish", proficiency: "native" },
          { code: "en", name: "English", proficiency: "conversational" },
          { code: "qu", name: "Quechua", proficiency: "conversational" },
        ],
        skills: [
          {
            name: "Community Mediation",
            category: "mediation",
            level: 8,
            verified: true,
          },
          {
            name: "Indigenous Rights",
            category: "cultural",
            level: 9,
            verified: true,
          },
          {
            name: "Restorative Justice",
            category: "mediation",
            level: 7,
            verified: true,
          },
          {
            name: "Trauma Healing",
            category: "education",
            level: 6,
            verified: false,
          },
        ],
        soulboundCredentials: [
          {
            id: "sbt_4",
            name: "Community Healer",
            description: "Facilitated healing in 20+ communities",
            category: "mediation",
            level: 3,
            issuer: "Indigenous Peace Council",
            issueDate: "2023-09-10",
            verified: true,
            rarity: "rare",
            attributes: {
              communities_served: 23,
              healing_circles: 45,
              participants: 1200,
            },
          },
        ],
        achievements: [
          {
            id: "ach_4",
            title: "Community Champion",
            description: "Served 20+ communities with peace initiatives",
            icon: "🤝",
            earnedDate: "2023-11-20",
            peaceCoinsAwarded: 800,
            category: "community_building",
          },
        ],
        peaceCoinsEarned: 5670,
        reputationScore: 91,
        trustLevel: 9,
        vrEmpathyScores: {
          cultural: 95,
          conflict: 89,
          negotiation: 85,
          overall: 90,
        },
        trainingModules: [
          {
            id: "tm_4",
            name: "Trauma-Informed Mediation",
            category: "crisis_management",
            progress: 100,
            completedDate: "2023-12-05",
          },
        ],
        projectsContributed: 15,
        conflictsMediated: 23,
        peaceActions: [
          {
            id: "pa_3",
            type: "community_support",
            title: "Post-Conflict Community Healing",
            description: "Led healing process for conflict-affected families",
            date: "2024-01-18",
            peaceCoinsEarned: 600,
            impact: "high",
            verified: true,
          },
        ],
        lastActive: "2024-01-20",
        joinDate: "2022-11-08",
        privacySettings: {
          profileVisibility: "network",
          locationVisible: false,
          contactVisible: false,
          activityVisible: true,
        },
        followers: 456,
        following: 123,
        peaceNetworkConnections: 289,
        mentorshipRole: "mentor",
        verificationStatus: "verified",
        kycLevel: "basic",
        metadata: {
          interests: [
            "Indigenous Rights",
            "Community Healing",
            "Restorative Justice",
          ],
          expertise: [
            "Conflict Mediation",
            "Cultural Sensitivity",
            "Trauma Recovery",
          ],
          availability: "volunteer",
          missionAlignment: ["SDG 16", "SDG 10", "SDG 11"],
        },
      },
    ];
    setProfiles(mockProfiles);
  }, []);

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchetype =
      filterArchetype === "all" || profile.archetype === filterArchetype;
    const matchesRegion =
      filterRegion === "all" || profile.location.region === filterRegion;

    return matchesSearch && matchesArchetype && matchesRegion;
  });

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: "bg-gray-100 text-gray-800",
      rare: "bg-blue-100 text-blue-800",
      epic: "bg-purple-100 text-purple-800",
      legendary: "bg-orange-100 text-orange-800",
      unique: "bg-red-100 text-red-800",
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common":
        return <Medal className="h-4 w-4" />;
      case "rare":
        return <Star className="h-4 w-4" />;
      case "epic":
        return <Crown className="h-4 w-4" />;
      case "legendary":
        return <Gem className="h-4 w-4" />;
      case "unique":
        return <Zap className="h-4 w-4" />;
      default:
        return <Medal className="h-4 w-4" />;
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <XCircle className="h-4 w-4 text-red-600" />;
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
                Peace Network
              </h1>
              <p className="text-muted-foreground">
                Connect with global peacebuilders and their verified credentials
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setShowOwnProfile(true)}>
                <Settings className="h-4 w-4 mr-2" />
                My Profile
              </Button>
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
                  placeholder="Search peacebuilders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterArchetype} onValueChange={setFilterArchetype}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Archetype" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Archetypes</SelectItem>
                <SelectItem value="peace_architect">Peace Architect</SelectItem>
                <SelectItem value="tech_diplomat">Tech Diplomat</SelectItem>
                <SelectItem value="grassroots_peacebuilder">
                  Grassroots Builder
                </SelectItem>
                <SelectItem value="conflict_analyst">
                  Conflict Analyst
                </SelectItem>
                <SelectItem value="artist_culture_weaver">
                  Culture Weaver
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRegion} onValueChange={setFilterRegion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
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
                variant={viewMode === "network" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("network")}
              >
                <Network className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Profiles Display */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <UserProfileCard
                key={profile.id}
                profile={profile}
                onView={(profile) => setSelectedProfile(profile)}
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
                    <TableHead>User</TableHead>
                    <TableHead>Archetype</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Reputation</TableHead>
                    <TableHead>Credentials</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={profile.avatar}
                              alt={profile.displayName}
                            />
                            <AvatarFallback>
                              {profile.displayName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {profile.displayName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              @{profile.username}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {profile.archetype.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {profile.privacySettings.locationVisible
                          ? `${profile.location.city}, ${profile.location.country}`
                          : "Private"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="text-lg font-bold">
                            {profile.reputationScore}
                          </div>
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {profile.soulboundCredentials
                            .slice(0, 2)
                            .map((cred) => (
                              <Badge
                                key={cred.id}
                                className={`text-xs ${getRarityColor(cred.rarity)}`}
                              >
                                {getRarityIcon(cred.rarity)}
                              </Badge>
                            ))}
                          {profile.soulboundCredentials.length > 2 && (
                            <span className="text-xs text-muted-foreground">
                              +{profile.soulboundCredentials.length - 2}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedProfile(profile)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {viewMode === "network" && (
          <Card>
            <CardContent className="p-6">
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Network className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    Peace Network Graph
                  </h3>
                  <p className="text-muted-foreground">
                    Interactive network visualization of peace connections
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    D3.js or Cytoscape.js integration for relationship mapping
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Profile Details Modal */}
      <Dialog
        open={!!selectedProfile}
        onOpenChange={() => setSelectedProfile(null)}
      >
        {selectedProfile && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <UserProfileDetails profile={selectedProfile} />
          </DialogContent>
        )}
      </Dialog>

      {/* Own Profile Modal */}
      <Dialog open={showOwnProfile} onOpenChange={setShowOwnProfile}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>My Profile Settings</DialogTitle>
            <DialogDescription>
              Manage your peace profile and credentials
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center p-6 border rounded-lg">
              <p className="text-muted-foreground">
                Profile editing functionality would be implemented here
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// User Profile Card Component
function UserProfileCard({
  profile,
  onView,
}: {
  profile: UserProfile;
  onView: (profile: UserProfile) => void;
}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatar} alt={profile.displayName} />
            <AvatarFallback className="text-lg">
              {profile.displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{profile.displayName}</CardTitle>
              {getVerificationIcon(profile.verificationStatus)}
            </div>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
            <Badge variant="secondary" className="text-xs">
              {profile.archetype.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {profile.bio}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-semibold text-primary">
              {profile.reputationScore}
            </div>
            <div className="text-muted-foreground">Reputation</div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-semibold text-primary">
              {profile.peaceCoinsEarned.toLocaleString()}
            </div>
            <div className="text-muted-foreground">PeaceCoins</div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-semibold text-primary">
              {profile.conflictsMediated}
            </div>
            <div className="text-muted-foreground">Mediated</div>
          </div>
        </div>

        {/* Top SoulBound Credentials */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Top Credentials</h4>
          <div className="space-y-1">
            {profile.soulboundCredentials.slice(0, 2).map((cred) => (
              <div key={cred.id} className="flex items-center space-x-2">
                <Badge className={`text-xs ${getRarityColor(cred.rarity)}`}>
                  {getRarityIcon(cred.rarity)}
                </Badge>
                <span className="text-xs truncate">{cred.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* VR Empathy Score */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <VrHeadset className="h-4 w-4 text-muted-foreground" />
              <span>VR Empathy</span>
            </div>
            <span className="font-medium">
              {profile.vrEmpathyScores.overall}/100
            </span>
          </div>
          <Progress value={profile.vrEmpathyScores.overall} className="h-2" />
        </div>

        {/* Languages */}
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <span>Languages</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {profile.languages.slice(0, 3).map((lang) => (
              <Badge key={lang.code} variant="outline" className="text-xs">
                {lang.name}
              </Badge>
            ))}
            {profile.languages.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.languages.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            {profile.privacySettings.locationVisible
              ? `${profile.location.city}, ${profile.location.country}`
              : "Location private"}
          </div>
          <Button size="sm" onClick={() => onView(profile)}>
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// User Profile Details Component
function UserProfileDetails({ profile }: { profile: UserProfile }) {
  return (
    <div className="space-y-6">
      <DialogHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatar} alt={profile.displayName} />
            <AvatarFallback className="text-2xl">
              {profile.displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <DialogTitle className="text-2xl">
              {profile.displayName}
            </DialogTitle>
            <DialogDescription className="text-lg">
              @{profile.username}
            </DialogDescription>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">
                {profile.archetype.replace("_", " ")}
              </Badge>
              {getVerificationIcon(profile.verificationStatus)}
              <span className="text-sm text-muted-foreground">
                Joined {new Date(profile.joinDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </DialogHeader>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{profile.bio}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {profile.reputationScore}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reputation Score
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {profile.trustLevel}/10
                    </div>
                    <p className="text-sm text-muted-foreground">Trust Level</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {profile.peaceCoinsEarned.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">PeaceCoins</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {profile.conflictsMediated}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Conflicts Mediated
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>VR Empathy Scores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cultural Understanding</span>
                    <span>{profile.vrEmpathyScores.cultural}/100</span>
                  </div>
                  <Progress
                    value={profile.vrEmpathyScores.cultural}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Conflict Resolution</span>
                    <span>{profile.vrEmpathyScores.conflict}/100</span>
                  </div>
                  <Progress
                    value={profile.vrEmpathyScores.conflict}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Negotiation Skills</span>
                    <span>{profile.vrEmpathyScores.negotiation}/100</span>
                  </div>
                  <Progress
                    value={profile.vrEmpathyScores.negotiation}
                    className="h-2"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Overall Score</span>
                    <span>{profile.vrEmpathyScores.overall}/100</span>
                  </div>
                  <Progress
                    value={profile.vrEmpathyScores.overall}
                    className="h-3"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Languages & Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile.languages.map((lang) => (
                  <div
                    key={lang.code}
                    className="text-center p-3 border rounded"
                  >
                    <div className="font-medium">{lang.name}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {lang.proficiency}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credentials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.soulboundCredentials.map((cred) => (
              <Card key={cred.id} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{cred.name}</CardTitle>
                    <Badge className={getRarityColor(cred.rarity)}>
                      {getRarityIcon(cred.rarity)}
                      <span className="ml-1 capitalize">{cred.rarity}</span>
                    </Badge>
                  </div>
                  <CardDescription>{cred.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Level: </span>
                      <span className="font-medium">{cred.level}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Issuer: </span>
                      <span className="font-medium">{cred.issuer}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Issued: </span>
                      <span className="font-medium">
                        {new Date(cred.issueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-muted-foreground">Status: </span>
                      {cred.verified ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                  </div>

                  {cred.nftHash && (
                    <div className="text-xs">
                      <span className="text-muted-foreground">NFT Hash: </span>
                      <code className="bg-muted px-1 rounded">
                        {cred.nftHash}
                      </code>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Attributes</h4>
                    <div className="space-y-1">
                      {Object.entries(cred.attributes).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">
                            {key.replace("_", " ")}:
                          </span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "mediation",
              "technical",
              "cultural",
              "research",
              "diplomacy",
              "education",
            ].map((category) => {
              const categorySkills = profile.skills.filter(
                (skill) => skill.category === category,
              );
              if (categorySkills.length === 0) return null;

              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize">
                      {category} Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {skill.name}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{skill.level}/10</span>
                            {skill.verified && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                        </div>
                        <Progress value={skill.level * 10} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profile.achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {new Date(
                            achievement.earnedDate,
                          ).toLocaleDateString()}
                        </span>
                        <Badge variant="outline">
                          <Coins className="h-3 w-3 mr-1" />
                          {achievement.peaceCoinsAwarded} PC
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <div className="space-y-4">
            {profile.peaceActions.map((action) => (
              <Card key={action.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {action.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-muted-foreground">
                          {new Date(action.date).toLocaleDateString()}
                        </span>
                        <Badge variant="outline" className="capitalize">
                          {action.type.replace("_", " ")}
                        </Badge>
                        <Badge
                          className={`${
                            action.impact === "transformative"
                              ? "bg-purple-100 text-purple-800"
                              : action.impact === "high"
                                ? "bg-green-100 text-green-800"
                                : action.impact === "medium"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {action.impact} impact
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          <Coins className="h-3 w-3 mr-1" />
                          {action.peaceCoinsEarned} PC
                        </Badge>
                        {action.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {profile.followers}
                </div>
                <p className="text-sm text-muted-foreground">Followers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {profile.following}
                </div>
                <p className="text-sm text-muted-foreground">Following</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary">
                  {profile.peaceNetworkConnections}
                </div>
                <p className="text-sm text-muted-foreground">
                  Peace Connections
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Mentorship</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="capitalize">
                  {profile.mentorshipRole === "both"
                    ? "Mentor & Mentee"
                    : profile.mentorshipRole}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {profile.mentorshipRole === "mentor" &&
                    "Available to guide others"}
                  {profile.mentorshipRole === "mentee" && "Seeking guidance"}
                  {profile.mentorshipRole === "both" && "Teaching and learning"}
                  {profile.mentorshipRole === "none" &&
                    "Not currently participating"}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
