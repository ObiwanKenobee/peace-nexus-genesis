import { Controller, Get, Post, Body, Query, Logger } from "@nestjs/common";
import {
  SEOCrawlerService,
  CrawlerTarget,
  RankingData,
  CrawlerInsights,
} from "./seo-crawler.service";
import { SEOAnalyticsService } from "./seo-analytics.service";

export interface CrawlerConfigDto {
  targets: CrawlerTarget[];
  schedule?: string;
  notifications?: boolean;
}

export interface RegionalAnalysisDto {
  region: string;
  countries: string[];
  keywords: string[];
  timeframe: string;
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

export interface PerformanceSummary {
  totalKeywords: number;
  avgPosition: number;
  topPerformingRegions: TopRegion[];
  improvementOpportunities: string[];
  recentTrends: TrendAnalysis;
}

export interface TopRegion {
  region: string;
  avgPosition: number;
  keywordCount: number;
}

export interface TrendAnalysis {
  direction: string;
  percentage: string;
  recentAvgPosition: string;
  previousAvgPosition: string;
}

export interface CompetitorAnalysisResult {
  domain: string;
  avgPosition: number;
  appearances: number;
  totalBacklinks: number;
  competingKeywords: string[];
}

@Controller("api/seo-crawler")
export class SEOCrawlerController {
  private readonly logger = new Logger(SEOCrawlerController.name);

  constructor(
    private readonly crawlerService: SEOCrawlerService,
    private readonly analyticsService: SEOAnalyticsService,
  ) {}

  @Get("targets")
  async getDefaultTargets(): Promise<CrawlerTarget[]> {
    return [
      {
        id: "paxis-home",
        url: "https://paxis.global",
        keywords: [
          "peacetech",
          "conflict resolution AI",
          "peace DAO",
          "blockchain for peace",
          "VR empathy lab",
          "positive peace technology",
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
          "water conflict technology",
          "community peace programs Africa",
        ],
        region: "East Africa",
        language: "sw",
        priority: "high",
        targetCountries: ["KE", "UG", "TZ", "SS", "CD", "ET"],
      },
      {
        id: "paxis-middle-east",
        url: "https://paxis.global",
        keywords: [
          "Palestine peace solutions",
          "Yemen humanitarian technology",
          "Syria reconstruction tools",
          "Middle East diplomacy platform",
          "conflict mediation technology",
        ],
        region: "Middle East",
        language: "ar",
        priority: "high",
        targetCountries: ["PS", "YE", "SY", "IQ", "LB", "JO"],
      },
      {
        id: "paxis-south-asia",
        url: "https://paxis.global",
        keywords: [
          "Afghanistan peace building",
          "Pakistan peace technology",
          "South Asia conflict resolution",
          "cross-border peace dialogue",
          "community healing programs",
        ],
        region: "South Asia",
        language: "hi",
        priority: "high",
        targetCountries: ["AF", "PK", "IN", "BD", "LK"],
      },
    ];
  }

  @Post("crawl")
  async startCrawl(@Body() config: CrawlerConfigDto): Promise<RankingData[]> {
    this.logger.log("Starting SEO crawl with config:", config);

    try {
      const rankings = await this.crawlerService.crawlRegionalRankings(
        config.targets,
      );

      // Store results in analytics
      await this.analyticsService.storeRankingData(rankings);

      return rankings;
    } catch (error) {
      this.logger.error("Crawl failed:", error);
      throw error;
    }
  }

  @Get("rankings")
  async getRankings(
    @Query("region") region?: string,
    @Query("keyword") keyword?: string,
    @Query("days") days?: number,
  ): Promise<RankingData[]> {
    return this.analyticsService.getRankingHistory({
      region,
      keyword,
      days: days || 30,
    });
  }

  @Get("insights")
  async getInsights(
    @Query("region") region?: string,
    @Query("days") days?: number,
  ): Promise<CrawlerInsights> {
    const rankings = await this.analyticsService.getRankingHistory({
      region,
      days: days || 30,
    });

    const targetRegions = region
      ? [region]
      : [
          "East Africa",
          "Middle East",
          "South Asia",
          "Sahel Belt",
          "Caucasus & Balkans",
        ];

    return this.crawlerService.generateOptimizationInsights(
      rankings,
      targetRegions,
    );
  }

  @Post("analyze-region")
  async analyzeRegion(
    @Body() analysis: RegionalAnalysisDto,
  ): Promise<RegionalStrategy> {
    this.logger.log(`Analyzing region: ${analysis.region}`);

    const strategy = await this.crawlerService.generateRegionalSEOStrategy(
      analysis.region,
      analysis.countries,
    );

    return strategy;
  }

  @Get("performance-summary")
  async getPerformanceSummary(): Promise<PerformanceSummary> {
    const rankings = await this.analyticsService.getRankingHistory({
      days: 30,
    });

    const summary = {
      totalKeywords: [...new Set(rankings.map((r) => r.keyword))].length,
      avgPosition:
        rankings.length > 0
          ? rankings.reduce((sum, r) => sum + r.position, 0) / rankings.length
          : 0,
      topPerformingRegions: this.getTopPerformingRegions(rankings),
      improvementOpportunities:
        await this.getImprovementOpportunities(rankings),
      recentTrends: this.getRecentTrends(rankings),
    };

    return summary;
  }

  @Get("competitor-analysis")
  async getCompetitorAnalysis(
    @Query("region") region?: string,
  ): Promise<CompetitorAnalysisResult[]> {
    const rankings = await this.analyticsService.getRankingHistory({
      region,
      days: 30,
    });

    const competitors = new Map<string, any>();

    rankings.forEach((ranking) => {
      ranking.competitorAnalysis.forEach((comp) => {
        if (!competitors.has(comp.domain)) {
          competitors.set(comp.domain, {
            domain: comp.domain,
            avgPosition: 0,
            appearances: 0,
            totalBacklinks: 0,
            competingKeywords: [],
          });
        }

        const competitor = competitors.get(comp.domain);
        competitor.avgPosition =
          (competitor.avgPosition * competitor.appearances + comp.position) /
          (competitor.appearances + 1);
        competitor.appearances++;
        competitor.totalBacklinks += comp.backlinks;
        competitor.competingKeywords.push(ranking.keyword);
      });
    });

    return Array.from(competitors.values())
      .sort((a, b) => a.avgPosition - b.avgPosition)
      .slice(0, 10);
  }

  private getTopPerformingRegions(rankings: RankingData[]): TopRegion[] {
    const regionPerformance = new Map<
      string,
      { totalPosition: number; count: number }
    >();

    rankings.forEach((ranking) => {
      if (!regionPerformance.has(ranking.region)) {
        regionPerformance.set(ranking.region, { totalPosition: 0, count: 0 });
      }

      const perf = regionPerformance.get(ranking.region);
      perf.totalPosition += ranking.position;
      perf.count++;
    });

    return Array.from(regionPerformance.entries())
      .map(([region, perf]) => ({
        region,
        avgPosition: perf.totalPosition / perf.count,
        keywordCount: perf.count,
      }))
      .sort((a, b) => a.avgPosition - b.avgPosition)
      .slice(0, 5);
  }

  private getImprovementOpportunities(rankings: RankingData[]): string[] {
    const opportunities: string[] = [];

    // Find keywords ranking 11-30 (page 2-3)
    const page2Keywords = rankings.filter(
      (r) => r.position >= 11 && r.position <= 30,
    );
    if (page2Keywords.length > 0) {
      opportunities.push(
        `${page2Keywords.length} keywords on page 2-3 could be optimized to reach page 1`,
      );
    }

    // Find regions with poor performance
    const regionPerformance = this.getTopPerformingRegions(rankings);
    const poorRegions = regionPerformance.filter((r) => r.avgPosition > 50);
    if (poorRegions.length > 0) {
      opportunities.push(
        `Focus on improving rankings in: ${poorRegions.map((r) => r.region).join(", ")}`,
      );
    }

    // Analyze competitor gaps
    const strongCompetitors = rankings
      .flatMap((r) => r.competitorAnalysis)
      .filter((c) => c.position <= 5)
      .reduce(
        (acc, comp) => {
          acc[comp.domain] = (acc[comp.domain] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

    const topCompetitor = Object.entries(strongCompetitors).sort(
      ([, a], [, b]) => b - a,
    )[0];

    if (topCompetitor) {
      opportunities.push(
        `Study ${topCompetitor[0]} strategy - appears in top 5 for ${topCompetitor[1]} keywords`,
      );
    }

    return opportunities;
  }

  private getRecentTrends(rankings: RankingData[]): TrendAnalysis {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentRankings = rankings.filter((r) => r.timestamp >= weekAgo);
    const olderRankings = rankings.filter((r) => r.timestamp < weekAgo);

    const recentAvg =
      recentRankings.length > 0
        ? recentRankings.reduce((sum, r) => sum + r.position, 0) /
          recentRankings.length
        : 0;

    const olderAvg =
      olderRankings.length > 0
        ? olderRankings.reduce((sum, r) => sum + r.position, 0) /
          olderRankings.length
        : 0;

    const trend = olderAvg > 0 ? ((olderAvg - recentAvg) / olderAvg) * 100 : 0;

    return {
      direction: trend > 0 ? "improving" : trend < 0 ? "declining" : "stable",
      percentage: Math.abs(trend).toFixed(1),
      recentAvgPosition: recentAvg.toFixed(1),
      previousAvgPosition: olderAvg.toFixed(1),
    };
  }
}
