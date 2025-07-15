import { Injectable, Logger } from "@nestjs/common";
import { RankingData } from "./seo-crawler.service";

export interface RankingQuery {
  region?: string;
  keyword?: string;
  searchEngine?: string;
  days?: number;
}

export interface SEOMetrics {
  totalKeywords: number;
  avgPosition: number;
  top10Keywords: number;
  top3Keywords: number;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface RegionalMetrics {
  region: string;
  metrics: SEOMetrics;
  trending: "up" | "down" | "stable";
  opportunityScore: number;
}

@Injectable()
export class SEOAnalyticsService {
  private readonly logger = new Logger(SEOAnalyticsService.name);
  private rankingData: RankingData[] = [];

  async storeRankingData(rankings: RankingData[]): Promise<void> {
    this.logger.log(`Storing ${rankings.length} ranking records`);

    // In a real implementation, this would store to a database
    // For now, we'll store in memory with some persistence simulation
    this.rankingData.push(...rankings);

    // Keep only last 1000 records to prevent memory issues
    if (this.rankingData.length > 1000) {
      this.rankingData = this.rankingData.slice(-1000);
    }

    // Simulate data persistence logging
    this.logger.debug(`Total stored rankings: ${this.rankingData.length}`);
  }

  async getRankingHistory(query: RankingQuery): Promise<RankingData[]> {
    let filteredData = [...this.rankingData];

    // Apply filters
    if (query.region) {
      filteredData = filteredData.filter((r) => r.region === query.region);
    }

    if (query.keyword) {
      filteredData = filteredData.filter((r) =>
        r.keyword.toLowerCase().includes(query.keyword.toLowerCase()),
      );
    }

    if (query.searchEngine) {
      filteredData = filteredData.filter(
        (r) => r.searchEngine === query.searchEngine,
      );
    }

    if (query.days) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - query.days);
      filteredData = filteredData.filter((r) => r.timestamp >= cutoffDate);
    }

    return filteredData.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    );
  }

  async getRegionalMetrics(region?: string): Promise<RegionalMetrics[]> {
    const regions = region ? [region] : this.getUniqueRegions();
    const metrics: RegionalMetrics[] = [];

    for (const reg of regions) {
      const regionData = await this.getRankingHistory({
        region: reg,
        days: 30,
      });

      if (regionData.length > 0) {
        const seoMetrics = this.calculateSEOMetrics(regionData);
        const trending = await this.calculateTrend(reg);
        const opportunityScore = this.calculateOpportunityScore(regionData);

        metrics.push({
          region: reg,
          metrics: seoMetrics,
          trending,
          opportunityScore,
        });
      }
    }

    return metrics.sort((a, b) => b.opportunityScore - a.opportunityScore);
  }

  async getKeywordPerformance(keyword: string): Promise<any> {
    const keywordData = await this.getRankingHistory({ keyword, days: 90 });

    if (keywordData.length === 0) {
      return null;
    }

    const performance = {
      keyword,
      currentPosition: keywordData[0]?.position || null,
      bestPosition: Math.min(...keywordData.map((r) => r.position)),
      worstPosition: Math.max(...keywordData.map((r) => r.position)),
      avgPosition:
        keywordData.reduce((sum, r) => sum + r.position, 0) /
        keywordData.length,
      regions: this.getKeywordRegionalData(keywordData),
      trend: this.calculateKeywordTrend(keywordData),
      competitorInsights: this.analyzeKeywordCompetitors(keywordData),
    };

    return performance;
  }

  private calculateSEOMetrics(data: RankingData[]): SEOMetrics {
    const totalKeywords = [...new Set(data.map((r) => r.keyword))].length;
    const avgPosition =
      data.reduce((sum, r) => sum + r.position, 0) / data.length;
    const top10Keywords = data.filter((r) => r.position <= 10).length;
    const top3Keywords = data.filter((r) => r.position <= 3).length;

    // Simulate impressions and clicks based on position
    const impressions = data.reduce((sum, r) => {
      // Higher positions get more impressions
      return sum + Math.max(1000 - r.position * 10, 10);
    }, 0);

    const clicks = data.reduce((sum, r) => {
      // CTR decreases with position
      const ctr = Math.max(0.2 - r.position * 0.01, 0.01);
      return sum + Math.max(1000 - r.position * 10, 10) * ctr;
    }, 0);

    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

    return {
      totalKeywords,
      avgPosition: Math.round(avgPosition * 10) / 10,
      top10Keywords,
      top3Keywords,
      impressions: Math.round(impressions),
      clicks: Math.round(clicks),
      ctr: Math.round(ctr * 100) / 100,
    };
  }

  private async calculateTrend(
    region: string,
  ): Promise<"up" | "down" | "stable"> {
    const recentData = await this.getRankingHistory({ region, days: 7 });
    const olderData = await this.getRankingHistory({ region, days: 14 });
    const previousWeekData = olderData.filter((r) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 14);
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);
      return r.timestamp >= twoWeeksAgo && r.timestamp < weekAgo;
    });

    if (recentData.length === 0 || previousWeekData.length === 0) {
      return "stable";
    }

    const recentAvg =
      recentData.reduce((sum, r) => sum + r.position, 0) / recentData.length;
    const previousAvg =
      previousWeekData.reduce((sum, r) => sum + r.position, 0) /
      previousWeekData.length;

    const difference = previousAvg - recentAvg; // Positive means improvement (lower position number)

    if (difference > 2) return "up";
    if (difference < -2) return "down";
    return "stable";
  }

  private calculateOpportunityScore(data: RankingData[]): number {
    if (data.length === 0) return 0;

    // Factors that contribute to opportunity score:
    // 1. Number of keywords ranking 11-30 (page 2-3)
    // 2. Average position improvement potential
    // 3. Competitor gap analysis
    // 4. Regional priority

    const page2Keywords = data.filter(
      (r) => r.position >= 11 && r.position <= 30,
    ).length;
    const avgPosition =
      data.reduce((sum, r) => sum + r.position, 0) / data.length;
    const competitorGap = this.calculateCompetitorGap(data);

    // Higher score for more page 2 keywords (quick wins)
    const page2Score = (page2Keywords / data.length) * 40;

    // Higher score for better average position potential
    const positionScore = Math.max(0, (50 - avgPosition) / 50) * 30;

    // Higher score for smaller competitor gap
    const competitorScore = Math.max(0, (100 - competitorGap) / 100) * 30;

    return Math.round(page2Score + positionScore + competitorScore);
  }

  private calculateCompetitorGap(data: RankingData[]): number {
    const competitorPositions = data.flatMap((r) =>
      r.competitorAnalysis.map((c) => c.position),
    );

    if (competitorPositions.length === 0) return 50;

    const avgCompetitorPosition =
      competitorPositions.reduce((sum, pos) => sum + pos, 0) /
      competitorPositions.length;
    const avgOurPosition =
      data.reduce((sum, r) => sum + r.position, 0) / data.length;

    return Math.max(0, avgOurPosition - avgCompetitorPosition);
  }

  private getUniqueRegions(): string[] {
    return [...new Set(this.rankingData.map((r) => r.region))];
  }

  private getKeywordRegionalData(data: RankingData[]): any[] {
    const regionMap = new Map<string, { positions: number[]; count: number }>();

    data.forEach((r) => {
      if (!regionMap.has(r.region)) {
        regionMap.set(r.region, { positions: [], count: 0 });
      }
      const regionData = regionMap.get(r.region);
      regionData.positions.push(r.position);
      regionData.count++;
    });

    return Array.from(regionMap.entries()).map(([region, data]) => ({
      region,
      avgPosition:
        data.positions.reduce((sum, pos) => sum + pos, 0) /
        data.positions.length,
      dataPoints: data.count,
    }));
  }

  private calculateKeywordTrend(data: RankingData[]): any {
    if (data.length < 2) return { direction: "stable", change: 0 };

    const sortedData = data.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
    );
    const firstPosition = sortedData[0].position;
    const lastPosition = sortedData[sortedData.length - 1].position;

    const change = firstPosition - lastPosition; // Positive means improvement
    const direction =
      change > 1 ? "improving" : change < -1 ? "declining" : "stable";

    return { direction, change: Math.abs(change) };
  }

  private analyzeKeywordCompetitors(data: RankingData[]): any {
    const competitorMap = new Map<
      string,
      {
        appearances: number;
        avgPosition: number;
        totalPosition: number;
        bestPosition: number;
      }
    >();

    data.forEach((r) => {
      r.competitorAnalysis.forEach((comp) => {
        if (!competitorMap.has(comp.domain)) {
          competitorMap.set(comp.domain, {
            appearances: 0,
            avgPosition: 0,
            totalPosition: 0,
            bestPosition: 100,
          });
        }

        const competitor = competitorMap.get(comp.domain);
        competitor.appearances++;
        competitor.totalPosition += comp.position;
        competitor.avgPosition =
          competitor.totalPosition / competitor.appearances;
        competitor.bestPosition = Math.min(
          competitor.bestPosition,
          comp.position,
        );
      });
    });

    return Array.from(competitorMap.entries())
      .map(([domain, stats]) => ({ domain, ...stats }))
      .sort((a, b) => a.avgPosition - b.avgPosition)
      .slice(0, 5);
  }
}
