import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import gateway from "@/api/gateway";
import { usePaxisAuth } from "@/contexts/PaxisAuthContext";

// Generic API hook types
interface APIState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAPIOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

// Core API hooks
export const useAPI = <T>(endpoint: string, options: UseAPIOptions = {}) => {
  const { user } = usePaxisAuth();

  return useQuery({
    queryKey: [endpoint, user?.id],
    queryFn: async () => {
      if (user) {
        gateway.setAuthToken(user.id); // In real app, this would be JWT token
      }
      const response = await gateway.get<T>(endpoint);
      return response.data;
    },
    enabled: options.enabled ?? true,
    refetchOnWindowFocus: options.refetchOnWindowFocus ?? false,
    staleTime: options.staleTime ?? 5 * 60 * 1000, // 5 minutes
    gcTime: options.cacheTime ?? 10 * 60 * 1000, // 10 minutes
  });
};

export const useAPIMutation = <T, V = unknown>(
  endpoint: string,
  method: "POST" | "PUT" | "DELETE" | "PATCH" = "POST",
) => {
  const { user } = usePaxisAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: V) => {
      if (user) {
        gateway.setAuthToken(user.id);
      }

      const response = (await gateway[
        method.toLowerCase() as keyof typeof gateway
      ](endpoint, variables)) as { data: T };

      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });
};

// Conflict monitoring hooks
export const useConflictData = () => {
  return useAPI<{
    hotspots: Array<{
      id: string;
      region: string;
      riskLevel: "Low" | "Medium" | "High" | "Critical";
      status: string;
      lastUpdate: string;
      coordinates: [number, number];
    }>;
    alerts: Array<{
      id: string;
      type: string;
      severity: string;
      message: string;
      timestamp: string;
    }>;
  }>("/api/conflicts");
};

export const useConflictAnalytics = (region?: string) => {
  const endpoint = region
    ? `/api/conflicts/analytics/${region}`
    : "/api/conflicts/analytics";
  return useAPI<{
    totalConflicts: number;
    preventedConflicts: number;
    activeMediation: number;
    riskTrends: Array<{ date: string; risk: number }>;
  }>(endpoint);
};

// Peace projects hooks
export const usePeaceProjects = () => {
  return useAPI<
    Array<{
      id: string;
      title: string;
      description: string;
      region: string;
      status: "planning" | "active" | "completed" | "paused";
      funding: {
        target: number;
        raised: number;
        contributors: number;
      };
      timeline: {
        start: string;
        end: string;
        milestones: Array<{
          title: string;
          date: string;
          completed: boolean;
        }>;
      };
      impact: {
        beneficiaries: number;
        peaceCoinGenerated: number;
        conflictsResolved: number;
      };
    }>
  >("/api/peace-projects");
};

export const useCreatePeaceProject = () => {
  return useAPIMutation<
    { id: string; message: string },
    {
      title: string;
      description: string;
      region: string;
      fundingTarget: number;
      timeline: {
        start: string;
        end: string;
      };
    }
  >("/api/peace-projects", "POST");
};

// User network hooks
export const usePeaceNetwork = () => {
  return useAPI<
    Array<{
      id: string;
      name: string;
      archetype: string;
      organization?: string;
      location: string;
      avatar?: string;
      contribution: {
        score: number;
        level: number;
        badges: string[];
      };
      skills: string[];
      recentActivity: Array<{
        type: string;
        description: string;
        timestamp: string;
      }>;
    }>
  >("/api/users/network");
};

// DAO governance hooks
export const useDAOProposals = () => {
  return useAPI<
    Array<{
      id: string;
      title: string;
      description: string;
      proposer: {
        id: string;
        name: string;
        avatar?: string;
      };
      type: "policy" | "funding" | "protocol" | "community";
      status: "draft" | "voting" | "passed" | "rejected" | "executed";
      voting: {
        startDate: string;
        endDate: string;
        totalVotes: number;
        yesVotes: number;
        noVotes: number;
        quorumReached: boolean;
      };
      impact: {
        estimatedCost: number;
        beneficiaries: number;
        riskLevel: "low" | "medium" | "high";
      };
    }>
  >("/api/dao/proposals");
};

export const useVoteOnProposal = () => {
  return useAPIMutation<
    { message: string },
    { proposalId: string; vote: "yes" | "no"; weight?: number }
  >("/api/dao/vote", "POST");
};

// Knowledge base hooks
export const useKnowledgeSearch = (query?: string) => {
  return useAPI<{
    results: Array<{
      id: string;
      title: string;
      content: string;
      category: string;
      tags: string[];
      relevanceScore: number;
      lastUpdated: string;
    }>;
    suggestions: string[];
    totalResults: number;
  }>(`/api/knowledge/search?q=${encodeURIComponent(query || "")}`, {
    enabled: !!query && query.length > 2,
  });
};

// PeaceCoin hooks
export const usePeaceCoinTransactions = () => {
  return useAPI<
    Array<{
      id: string;
      type: "earned" | "spent" | "transferred";
      amount: number;
      description: string;
      timestamp: string;
      from?: string;
      to?: string;
      activity?: string;
    }>
  >("/api/peacecoin/transactions");
};

export const usePeaceCoinStats = () => {
  return useAPI<{
    totalSupply: number;
    circulatingSupply: number;
    totalHolders: number;
    averageBalance: number;
    distribution: Array<{
      archetype: string;
      percentage: number;
      totalAmount: number;
    }>;
  }>("/api/peacecoin/stats");
};

// VR Labs hooks
export const useVRSessions = () => {
  return useAPI<
    Array<{
      id: string;
      title: string;
      description: string;
      category:
        | "empathy"
        | "conflict_resolution"
        | "cultural_exchange"
        | "trauma_healing";
      duration: number;
      participants: number;
      rating: number;
      difficulty: "beginner" | "intermediate" | "advanced";
      tags: string[];
    }>
  >("/api/vr/sessions");
};

// AI Agents hooks
export const useAIAgents = () => {
  return useAPI<
    Array<{
      id: string;
      name: string;
      type: "mediator" | "analyst" | "facilitator" | "advisor";
      status: "active" | "training" | "offline";
      specialization: string[];
      performance: {
        successRate: number;
        totalInteractions: number;
        averageRating: number;
      };
      capabilities: string[];
    }>
  >("/api/ai-agents");
};

export const useChatWithAI = () => {
  return useAPIMutation<
    { response: string; sessionId: string },
    { message: string; agentId: string; sessionId?: string }
  >("/api/ai-agents/chat", "POST");
};

// Analytics hooks
export const usePlatformAnalytics = () => {
  return useAPI<{
    users: {
      total: number;
      active: number;
      newThisWeek: number;
      retentionRate: number;
    };
    conflicts: {
      monitored: number;
      prevented: number;
      resolved: number;
      activeMediation: number;
    };
    peaceCoin: {
      totalTransactions: number;
      avgDailyVolume: number;
      topEarners: Array<{ name: string; amount: number }>;
    };
    projects: {
      active: number;
      completed: number;
      totalFunding: number;
      beneficiaries: number;
    };
  }>("/api/analytics/platform");
};

// Real-time hooks
export const useRealTimeUpdates = () => {
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      type: "conflict_alert" | "peace_achievement" | "dao_proposal" | "system";
      title: string;
      message: string;
      timestamp: string;
      priority: "low" | "medium" | "high" | "urgent";
    }>
  >([]);

  const [connectionStatus, setConnectionStatus] = useState<
    "connected" | "disconnected" | "connecting"
  >("disconnected");

  useEffect(() => {
    // WebSocket connection for real-time updates
    // This would be implemented with actual WebSocket in production
    const mockUpdates = setInterval(() => {
      const mockNotification = {
        id: Date.now().toString(),
        type: "peace_achievement" as const,
        title: "Peace Milestone Reached",
        message:
          "A new conflict resolution was successfully mediated in South Sudan",
        timestamp: new Date().toISOString(),
        priority: "medium" as const,
      };

      setNotifications((prev) => [mockNotification, ...prev.slice(0, 9)]);
    }, 30000); // Every 30 seconds

    setConnectionStatus("connected");

    return () => {
      clearInterval(mockUpdates);
      setConnectionStatus("disconnected");
    };
  }, []);

  return {
    notifications,
    connectionStatus,
    clearNotifications: useCallback(() => setNotifications([]), []),
  };
};

// Error boundary hook
export const useAPIError = () => {
  const [errors, setErrors] = useState<
    Array<{
      id: string;
      endpoint: string;
      message: string;
      timestamp: string;
    }>
  >([]);

  const addError = useCallback((endpoint: string, message: string) => {
    const error = {
      id: Date.now().toString(),
      endpoint,
      message,
      timestamp: new Date().toISOString(),
    };
    setErrors((prev) => [error, ...prev.slice(0, 4)]);
  }, []);

  const clearErrors = useCallback(() => setErrors([]), []);

  return { errors, addError, clearErrors };
};

export default {
  useAPI,
  useAPIMutation,
  useConflictData,
  useConflictAnalytics,
  usePeaceProjects,
  useCreatePeaceProject,
  usePeaceNetwork,
  useDAOProposals,
  useVoteOnProposal,
  useKnowledgeSearch,
  usePeaceCoinTransactions,
  usePeaceCoinStats,
  useVRSessions,
  useAIAgents,
  useChatWithAI,
  usePlatformAnalytics,
  useRealTimeUpdates,
  useAPIError,
};
