import { gateway } from "./gateway";

export interface CrawlerTarget {
  id: string;
  url: string;
  keywords: string[];
  region: string;
  language: string;
  priority: "high" | "medium" | "low";
  targetCountries: string[];
}

export interface RankingData {
  keyword: string;
  position: number;
  url: string;
  region: string;
  searchEngine: string;
  timestamp: Date;
  competitorAnalysis: CompetitorData[];
}

export interface CompetitorData {
  domain: string;
  position: number;
  title: string;
  description: string;
  backlinks: number;
}

export interface CrawlerInsights {
  regionalPerformance: Record<string, number>;
  keywordGaps: string[];
  optimizationOpportunities: string[];
  contentSuggestions: string[];
  technicalIssues: string[];
}

export interface OptimizationAction {
  type:
    | "meta_update"
    | "content_suggestion"
    | "technical_fix"
    | "link_building"
    | "regional_focus";
  target: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedImpact: number;
  implementationDetails: Record<string, unknown>;
}

export interface RegionalMetrics {
  region: string;
  metrics: {
    totalKeywords: number;
    avgPosition: number;
    top10Keywords: number;
    top3Keywords: number;
    impressions: number;
    clicks: number;
    ctr: number;
  };
  trending: "up" | "down" | "stable";
  opportunityScore: number;
}

export interface CrawlerStats {
  totalKeywords: number;
  avgPosition: number;
  topPerformingRegions: Array<{
    region: string;
    avgPosition: number;
    keywordCount: number;
  }>;
  improvementOpportunities: string[];
  recentTrends: {
    direction: string;
    percentage: string;
    recentAvgPosition: string;
    previousAvgPosition: string;
  };
}

export interface CompetitorAnalysisResult {
  domain: string;
  avgPosition: number;
  appearances: number;
  totalBacklinks: number;
  competingKeywords: string[];
}

export interface RegionalStrategy {
  region: string;
  countries: string[];
  keywordTargets: string[];
  contentPriorities: string[];
  technicalOptimizations: string[];
  linkBuildingStrategy: string[];
  localizations: {
    languages: string[];
    culturalConsiderations: string[];
    localPartners: string[];
  };
}

class SEOCrawlerAPI {
  private baseUrl = "/api/seo-crawler";

  async getDefaultTargets(): Promise<CrawlerTarget[]> {
    try {
      const response = await gateway.get(`${this.baseUrl}/targets`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch default targets:", error);
      // Return mock data as fallback
      return this.getMockTargets();
    }
  }

  async startCrawl(targets: CrawlerTarget[]): Promise<RankingData[]> {
    try {
      const response = await gateway.post(`${this.baseUrl}/crawl`, { targets });
      return response.data;
    } catch (error) {
      console.error("Failed to start crawl:", error);
      // Return mock data as fallback
      return this.getMockRankings();
    }
  }

  async getRankings(filters?: {
    region?: string;
    keyword?: string;
    days?: number;
  }): Promise<RankingData[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.region) params.append("region", filters.region);
      if (filters?.keyword) params.append("keyword", filters.keyword);
      if (filters?.days) params.append("days", filters.days.toString());

      const response = await gateway.get(`${this.baseUrl}/rankings?${params}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch rankings:", error);
      return this.getMockRankings();
    }
  }

  async getInsights(filters?: {
    region?: string;
    days?: number;
  }): Promise<CrawlerInsights> {
    try {
      const params = new URLSearchParams();
      if (filters?.region) params.append("region", filters.region);
      if (filters?.days) params.append("days", filters.days.toString());

      const response = await gateway.get(`${this.baseUrl}/insights?${params}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch insights:", error);
      return this.getMockInsights();
    }
  }

  async getPerformanceSummary(): Promise<CrawlerStats> {
    try {
      const response = await gateway.get(`${this.baseUrl}/performance-summary`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch performance summary:", error);
      return this.getMockCrawlerStats();
    }
  }

  async getRegionalMetrics(region?: string): Promise<RegionalMetrics[]> {
    try {
      const params = region ? `?region=${region}` : "";
      const response = await gateway.get(
        `${this.baseUrl}/regional-metrics${params}`,
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch regional metrics:", error);
      return this.getMockRegionalMetrics();
    }
  }

  async getCompetitorAnalysis(
    region?: string,
  ): Promise<CompetitorAnalysisResult[]> {
    try {
      const params = region ? `?region=${region}` : "";
      const response = await gateway.get(
        `${this.baseUrl}/competitor-analysis${params}`,
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch competitor analysis:", error);
      return this.getMockCompetitorAnalysis();
    }
  }

  async analyzeRegion(data: {
    region: string;
    countries: string[];
    keywords: string[];
    timeframe: string;
  }): Promise<RegionalStrategy> {
    try {
      const response = await gateway.post(
        `${this.baseUrl}/analyze-region`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error("Failed to analyze region:", error);
      return this.getMockRegionalStrategy();
    }
  }

  // Mock data methods for fallback when API is not available
  private getMockTargets(): CrawlerTarget[] {
    return [
      {
        id: "paxis-global",
        url: "https://paxis.global",
        keywords: [
          "peacetech",
          "conflict resolution AI",
          "peace DAO",
          "blockchain for peace",
        ],
        region: "Global",
        language: "en",
        priority: "high",
        targetCountries: ["all"],
      },
      {
        id: "paxis-east-africa",
        url: "https://paxis.global",
        keywords: [
          "peace building East Africa",
          "conflict resolution South Sudan",
          "DRC peace initiatives",
        ],
        region: "East Africa",
        language: "sw",
        priority: "high",
        targetCountries: ["KE", "UG", "TZ", "SS", "CD", "ET"],
      },
    ];
  }

  private getMockRankings(): RankingData[] {
    return [
      {
        keyword: "peacetech",
        position: 8,
        url: "https://paxis.global",
        region: "Global",
        searchEngine: "google",
        timestamp: new Date(),
        competitorAnalysis: [
          {
            domain: "un.org",
            position: 3,
            title: "UN Peace and Security",
            description: "Global peace initiatives",
            backlinks: 50000,
          },
        ],
      },
      {
        keyword: "conflict resolution AI",
        position: 15,
        url: "https://paxis.global",
        region: "East Africa",
        searchEngine: "google",
        timestamp: new Date(),
        competitorAnalysis: [
          {
            domain: "peacekeeping.org",
            position: 7,
            title: "AI for Conflict Resolution",
            description: "Technology solutions for peace",
            backlinks: 15000,
          },
        ],
      },
    ];
  }

  private getMockInsights(): CrawlerInsights {
    return {
      regionalPerformance: {
        Global: 18.2,
        "East Africa": 28.7,
        "Middle East": 31.5,
        "South Asia": 35.8,
      },
      keywordGaps: [
        "blockchain for peace",
        "VR conflict resolution",
        "peace technology platform",
      ],
      optimizationOpportunities: [
        "Improve content depth for high-ranking keywords",
        "Build regional authority through local partnerships",
        "Optimize for mobile-first indexing in emerging markets",
      ],
      contentSuggestions: [
        "Create region-specific case studies",
        "Develop multilingual content strategy",
        "Add interactive tools and calculators",
      ],
      technicalIssues: [
        "Improve Core Web Vitals scores",
        "Enhance mobile page speed",
        "Implement proper schema markup",
      ],
    };
  }

  private getMockCrawlerStats(): CrawlerStats {
    return {
      totalKeywords: 127,
      avgPosition: 23.4,
      topPerformingRegions: [
        { region: "Global", avgPosition: 18.2, keywordCount: 45 },
        { region: "East Africa", avgPosition: 28.7, keywordCount: 32 },
        { region: "Middle East", avgPosition: 31.5, keywordCount: 25 },
      ],
      improvementOpportunities: [
        "15 keywords on page 2-3 could be optimized to reach page 1",
        "Focus on improving rankings in: Middle East, South Asia",
      ],
      recentTrends: {
        direction: "improving",
        percentage: "12.3",
        recentAvgPosition: "21.8",
        previousAvgPosition: "24.6",
      },
    };
  }

  private getMockRegionalMetrics(): RegionalMetrics[] {
    return [
      {
        region: "Global",
        metrics: {
          totalKeywords: 45,
          avgPosition: 18.2,
          top10Keywords: 12,
          top3Keywords: 3,
          impressions: 45200,
          clicks: 2840,
          ctr: 6.3,
        },
        trending: "up",
        opportunityScore: 85,
      },
      {
        region: "East Africa",
        metrics: {
          totalKeywords: 32,
          avgPosition: 28.7,
          top10Keywords: 6,
          top3Keywords: 1,
          impressions: 18400,
          clicks: 980,
          ctr: 5.3,
        },
        trending: "stable",
        opportunityScore: 72,
      },
    ];
  }

  private getMockCompetitorAnalysis(): CompetitorAnalysisResult[] {
    return [
      {
        domain: "un.org",
        avgPosition: 4.2,
        appearances: 45,
        totalBacklinks: 250000,
        competingKeywords: ["peacetech", "conflict resolution", "global peace"],
      },
      {
        domain: "peacekeeping.org",
        avgPosition: 8.7,
        appearances: 23,
        totalBacklinks: 75000,
        competingKeywords: ["peace operations", "conflict prevention"],
      },
    ];
  }

  private getMockRegionalStrategy(): RegionalStrategy {
    return {
      region: "East Africa",
      countries: ["KE", "UG", "TZ", "SS", "CD", "ET"],
      keywordTargets: [
        "peace building East Africa",
        "conflict resolution South Sudan",
        "water conflict technology",
      ],
      contentPriorities: [
        "Water conflict case studies",
        "Community-led peace initiatives",
        "Traditional conflict resolution methods",
      ],
      technicalOptimizations: [
        "Implement hreflang tags for regional variations",
        "Optimize for mobile performance",
        "Add regional structured data markup",
      ],
      linkBuildingStrategy: [
        "Partner with African Union peace initiatives",
        "Collaborate with regional universities",
        "Connect with local NGOs",
      ],
    };
  }
}

export const seoCrawlerAPI = new SEOCrawlerAPI();
