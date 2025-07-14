import React, { createContext, useContext, useState, useEffect } from "react";

export type UserArchetype =
  | "peace_architect"
  | "tech_diplomat"
  | "grassroots_peacebuilder"
  | "conflict_analyst"
  | "artist_culture_weaver"
  | "peacepreneur"
  | "youth_peacemaker"
  | "refugee_displaced"
  | "funder_validator"
  | "ai_peace_agent";

export interface PaxisUser {
  id: string;
  email: string;
  name: string;
  archetype: UserArchetype;
  subRole?: string; // e.g., "UN Official", "NGO Leader", "Student", etc.
  organization?: string;
  location?: string;
  avatar?: string;
  peaceCoinBalance: number;
  contributionScore: number;
  level: number;
  badges: string[];
  permissions: string[];
  preferences: {
    language: string;
    timezone: string;
    notifications: boolean;
    theme: "light" | "dark" | "auto";
  };
  profile: {
    bio?: string;
    skills: string[];
    interests: string[];
    conflicts_worked_on: string[];
    verification_status: "unverified" | "pending" | "verified";
    kyc_level: "basic" | "enhanced" | "full";
  };
  lastLogin: Date;
  createdAt: Date;
}

interface PaxisAuthContextType {
  user: PaxisUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    userData: Partial<PaxisUser> & { email: string; password: string },
  ) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<PaxisUser>) => Promise<boolean>;
  hasPermission: (permission: string) => boolean;
  hasAccess: (tool: string) => boolean;
  earnPeaceCoin: (amount: number, activity: string) => void;
}

const PaxisAuthContext = createContext<PaxisAuthContextType | undefined>(
  undefined,
);

export const usePaxisAuth = () => {
  const context = useContext(PaxisAuthContext);
  if (context === undefined) {
    throw new Error("usePaxisAuth must be used within a PaxisAuthProvider");
  }
  return context;
};

// Archetype definitions with permissions and access
const archetypeConfig = {
  peace_architect: {
    permissions: [
      "dao_governance",
      "conflict_mapping",
      "ai_scenarios",
      "policy_editing",
      "treaty_tools",
      "interagency_dashboards",
      "smart_contracts",
    ],
    tools: ["governance", "heatmaps", "ai_simulator", "policy_editor"],
    dashboardPath: "/dashboard/peace-architect",
  },
  tech_diplomat: {
    permissions: [
      "sdk_access",
      "github_integration",
      "web3_wallets",
      "issue_bounties",
      "governance_gitops",
      "zk_modules",
    ],
    tools: ["sdk", "github", "web3", "bounties"],
    dashboardPath: "/dashboard/tech-diplomat",
  },
  grassroots_peacebuilder: {
    permissions: [
      "vr_training",
      "localization",
      "storytelling",
      "offline_apps",
      "voice_input",
      "rapid_response",
    ],
    tools: ["vr_empathy", "localization_toolkit", "storytelling_engine"],
    dashboardPath: "/dashboard/grassroots",
  },
  conflict_analyst: {
    permissions: [
      "knowledge_search",
      "graph_analytics",
      "timeline_builder",
      "custom_llm",
      "peace_gpt",
      "data_export",
    ],
    tools: ["research_db", "analytics", "ai_assistant"],
    dashboardPath: "/dashboard/analyst",
  },
  artist_culture_weaver: {
    permissions: [
      "multimedia_archive",
      "nft_creation",
      "vr_exhibitions",
      "culture_dao",
      "webxr_festivals",
      "storytelling_sdk",
    ],
    tools: ["archive", "nft_studio", "vr_gallery"],
    dashboardPath: "/dashboard/artist",
  },
  peacepreneur: {
    permissions: [
      "commons_exchange",
      "peacecoin_earning",
      "crowdfunding",
      "supply_tracking",
      "impact_reporting",
      "auto_audit",
    ],
    tools: ["exchange", "funding", "impact_dashboard"],
    dashboardPath: "/dashboard/peacepreneur",
  },
  youth_peacemaker: {
    permissions: [
      "gamified_quests",
      "xp_system",
      "skill_badges",
      "micro_stories",
      "peace_sandbox",
      "leaderboard",
    ],
    tools: ["games", "social", "learning"],
    dashboardPath: "/dashboard/youth",
  },
  refugee_displaced: {
    permissions: [
      "sovereign_id",
      "escape_routes",
      "peer_support",
      "safe_zone_alerts",
      "crypto_bridge",
      "community_validation",
    ],
    tools: ["identity", "safety", "support"],
    dashboardPath: "/dashboard/refugee",
  },
  funder_validator: {
    permissions: [
      "impact_dashboards",
      "dao_voting",
      "smart_contracts",
      "risk_mitigation",
      "due_diligence",
      "roi_forecasting",
    ],
    tools: ["funding", "governance", "analytics"],
    dashboardPath: "/dashboard/funder",
  },
  ai_peace_agent: {
    permissions: [
      "dialogue_facilitation",
      "mediation_bots",
      "bias_detection",
      "negotiation_support",
      "diplomacy_chains",
      "federated_ai",
    ],
    tools: ["ai_mediation", "dialogue_tools", "bias_checker"],
    dashboardPath: "/dashboard/ai-agent",
  },
};

// Mock users for demo
const mockUsers: PaxisUser[] = [
  {
    id: "1",
    email: "diplomat@un.org",
    name: "Ambassador Sarah Chen",
    archetype: "peace_architect",
    subRole: "UN Diplomat",
    organization: "United Nations",
    location: "New York, US",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=40&h=40&fit=crop&crop=face",
    peaceCoinBalance: 8500,
    contributionScore: 95,
    level: 12,
    badges: ["Treaty Architect", "Peace Innovator", "Global Mediator"],
    permissions: archetypeConfig.peace_architect.permissions,
    preferences: {
      language: "en",
      timezone: "America/New_York",
      notifications: true,
      theme: "light",
    },
    profile: {
      bio: "Senior diplomat specializing in conflict resolution and peace treaty development.",
      skills: ["Diplomacy", "Conflict Resolution", "International Law"],
      interests: ["Sustainable Peace", "Human Rights", "Global Governance"],
      conflicts_worked_on: ["South Sudan Peace Process", "Yemen Mediation"],
      verification_status: "verified",
      kyc_level: "full",
    },
    lastLogin: new Date(),
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    email: "dev@peacetech.org",
    name: "Alex Rodriguez",
    archetype: "tech_diplomat",
    subRole: "Peace Engineer",
    organization: "PeaceTech Lab",
    location: "San Francisco, US",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    peaceCoinBalance: 3200,
    contributionScore: 78,
    level: 8,
    badges: ["Code for Peace", "Open Source Hero", "Blockchain Builder"],
    permissions: archetypeConfig.tech_diplomat.permissions,
    preferences: {
      language: "en",
      timezone: "America/Los_Angeles",
      notifications: true,
      theme: "dark",
    },
    profile: {
      bio: "Full-stack developer building open-source tools for peace and conflict resolution.",
      skills: ["React", "Blockchain", "AI/ML", "DevOps"],
      interests: ["Open Source", "Web3", "Peace Technology"],
      conflicts_worked_on: [
        "Digital Ceasefire Monitoring",
        "Trust Protocol Development",
      ],
      verification_status: "verified",
      kyc_level: "enhanced",
    },
    lastLogin: new Date(),
    createdAt: new Date("2023-03-20"),
  },
  {
    id: "3",
    email: "maria@communityhealing.ke",
    name: "Maria Wanjiku",
    archetype: "grassroots_peacebuilder",
    subRole: "Community Leader",
    organization: "Kenya Community Healing Initiative",
    location: "Nairobi, Kenya",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    peaceCoinBalance: 1850,
    contributionScore: 87,
    level: 9,
    badges: ["Community Healer", "Dialogue Facilitator", "Local Leader"],
    permissions: archetypeConfig.grassroots_peacebuilder.permissions,
    preferences: {
      language: "sw",
      timezone: "Africa/Nairobi",
      notifications: true,
      theme: "light",
    },
    profile: {
      bio: "Community organizer working on post-election violence healing and reconciliation.",
      skills: ["Community Organizing", "Conflict Mediation", "Storytelling"],
      interests: ["Community Healing", "Women's Rights", "Youth Empowerment"],
      conflicts_worked_on: [
        "Post-Election Violence Mediation",
        "Land Dispute Resolution",
      ],
      verification_status: "verified",
      kyc_level: "basic",
    },
    lastLogin: new Date(),
    createdAt: new Date("2023-06-10"),
  },
];

export const PaxisAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<PaxisUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("paxis_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("paxis_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find((u) => u.email === email);

    if (foundUser && password === "peace123") {
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date(),
      };

      setUser(updatedUser);
      localStorage.setItem("paxis_user", JSON.stringify(updatedUser));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (
    userData: Partial<PaxisUser> & { email: string; password: string },
  ): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newUser: PaxisUser = {
      id: Date.now().toString(),
      name: userData.name || "New User",
      email: userData.email,
      archetype: userData.archetype || "youth_peacemaker",
      subRole: userData.subRole,
      organization: userData.organization,
      location: userData.location,
      peaceCoinBalance: 100, // Welcome bonus
      contributionScore: 0,
      level: 1,
      badges: ["Welcome to PAXIS"],
      permissions:
        archetypeConfig[userData.archetype || "youth_peacemaker"].permissions,
      preferences: {
        language: "en",
        timezone: "UTC",
        notifications: true,
        theme: "light",
      },
      profile: {
        skills: [],
        interests: [],
        conflicts_worked_on: [],
        verification_status: "unverified",
        kyc_level: "basic",
      },
      lastLogin: new Date(),
      createdAt: new Date(),
    };

    setUser(newUser);
    localStorage.setItem("paxis_user", JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("paxis_user");
  };

  const updateProfile = async (
    updates: Partial<PaxisUser>,
  ): Promise<boolean> => {
    if (!user) return false;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("paxis_user", JSON.stringify(updatedUser));
    return true;
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasAccess = (tool: string): boolean => {
    if (!user) return false;
    const config = archetypeConfig[user.archetype];
    return config.tools.includes(tool);
  };

  const earnPeaceCoin = (amount: number, activity: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      peaceCoinBalance: user.peaceCoinBalance + amount,
      contributionScore: user.contributionScore + Math.floor(amount / 10),
    };

    setUser(updatedUser);
    localStorage.setItem("paxis_user", JSON.stringify(updatedUser));

    // Could trigger notification here
    console.log(`Earned ${amount} PeaceCoins for: ${activity}`);
  };

  const value: PaxisAuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    hasPermission,
    hasAccess,
    earnPeaceCoin,
  };

  return (
    <PaxisAuthContext.Provider value={value}>
      {children}
    </PaxisAuthContext.Provider>
  );
};

// Helper function to get dashboard path for archetype
export const getDashboardPath = (archetype: UserArchetype): string => {
  return archetypeConfig[archetype].dashboardPath;
};

// Helper function to get archetype display name
export const getArchetypeDisplayName = (archetype: UserArchetype): string => {
  const names = {
    peace_architect: "Peace Architect",
    tech_diplomat: "Tech Diplomat",
    grassroots_peacebuilder: "Grassroots Peacebuilder",
    conflict_analyst: "Conflict Analyst",
    artist_culture_weaver: "Artist & Culture Weaver",
    peacepreneur: "Peacepreneur",
    youth_peacemaker: "Youth Peacemaker",
    refugee_displaced: "Refugee & Displaced",
    funder_validator: "Funder & Validator",
    ai_peace_agent: "AI Peace Agent",
  };
  return names[archetype];
};
