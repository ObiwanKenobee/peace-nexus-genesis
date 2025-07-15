import { Injectable, Logger } from "@nestjs/common";
import {
  SEOCrawlerService,
  CrawlerTarget,
  RankingData,
  CrawlerInsights,
} from "./seo-crawler.service";
import { SEOAnalyticsService } from "./seo-analytics.service";

export interface OptimizationRule {
  id: string;
  name: string;
  condition: (data: RankingData[]) => boolean;
  action: (data: RankingData[]) => Promise<OptimizationAction[]>;
  priority: number;
  enabled: boolean;
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
  implementationDetails: any;
}

export interface AutoOptimizationConfig {
  enabled: boolean;
  schedule: string;
  maxActionsPerRun: number;
  regionPriorities: Record<string, number>;
  keywordPriorities: Record<string, number>;
  autoImplement: boolean;
}

@Injectable()
export class SEOOptimizerService {
  private readonly logger = new Logger(SEOOptimizerService.name);
  private optimizationRules: OptimizationRule[] = [];
  private config: AutoOptimizationConfig;

  constructor(
    private readonly crawlerService: SEOCrawlerService,
    private readonly analyticsService: SEOAnalyticsService,
  ) {
    this.initializeOptimizationRules();
    this.initializeConfig();
  }

  private initializeConfig(): void {
    this.config = {
      enabled: true,
      schedule: "0 2 * * *", // Daily at 2 AM
      maxActionsPerRun: 10,
      regionPriorities: {
        "East Africa": 10,
        "Middle East": 10,
        "South Asia": 10,
        "Sahel Belt": 7,
        "Caucasus & Balkans": 5,
        Global: 8,
      },
      keywordPriorities: {
        peacetech: 10,
        "conflict resolution": 9,
        "peace DAO": 8,
        "blockchain for peace": 7,
        "VR empathy": 6,
      },
      autoImplement: false, // Manual approval required by default
    };
  }

  private initializeOptimizationRules(): void {
    this.optimizationRules = [
      {
        id: "page2_keywords",
        name: "Page 2 Keywords Optimization",
        condition: (data) =>
          data.some((r) => r.position >= 11 && r.position <= 20),
        action: this.optimizePage2Keywords.bind(this),
        priority: 9,
        enabled: true,
      },
      {
        id: "regional_underperformance",
        name: "Regional Underperformance",
        condition: (data) => this.hasRegionalUnderperformance(data),
        action: this.optimizeRegionalPerformance.bind(this),
        priority: 8,
        enabled: true,
      },
      {
        id: "competitor_gap",
        name: "Competitor Gap Analysis",
        condition: (data) => this.hasCompetitorGap(data),
        action: this.addressCompetitorGap.bind(this),
        priority: 7,
        enabled: true,
      },
      {
        id: "keyword_cannibalization",
        name: "Keyword Cannibalization",
        condition: (data) => this.hasKeywordCannibalization(data),
        action: this.fixKeywordCannibalization.bind(this),
        priority: 6,
        enabled: true,
      },
      {
        id: "missing_featured_snippets",
        name: "Featured Snippet Opportunities",
        condition: (data) => this.hasFeaturedSnippetOpportunity(data),
        action: this.optimizeForFeaturedSnippets.bind(this),
        priority: 8,
        enabled: true,
      },
      {
        id: "low_ctr_optimization",
        name: "Low CTR Optimization",
        condition: (data) => this.hasLowCTR(data),
        action: this.optimizeCTR.bind(this),
        priority: 7,
        enabled: true,
      },
    ];
  }

  async runAutomatedOptimization(): Promise<void> {
    if (!this.config.enabled) {
      this.logger.log("Automated optimization is disabled");
      return;
    }

    this.logger.log("Starting automated SEO optimization run");

    try {
      // Get recent ranking data
      const rankings = await this.analyticsService.getRankingHistory({
        days: 7,
      });

      if (rankings.length === 0) {
        this.logger.warn("No ranking data available for optimization");
        return;
      }

      const actions = await this.generateOptimizationActions(rankings);

      if (actions.length === 0) {
        this.logger.log("No optimization actions needed");
        return;
      }

      // Sort actions by priority and estimated impact
      const prioritizedActions = actions
        .sort((a, b) => this.getActionScore(b) - this.getActionScore(a))
        .slice(0, this.config.maxActionsPerRun);

      this.logger.log(
        `Generated ${prioritizedActions.length} optimization actions`,
      );

      if (this.config.autoImplement) {
        await this.implementActions(prioritizedActions);
      } else {
        await this.queueActionsForApproval(prioritizedActions);
      }
    } catch (error) {
      this.logger.error("Automated optimization failed:", error);
    }
  }

  async generateOptimizationActions(
    rankings: RankingData[],
  ): Promise<OptimizationAction[]> {
    const actions: OptimizationAction[] = [];

    for (const rule of this.optimizationRules.filter((r) => r.enabled)) {
      try {
        if (rule.condition(rankings)) {
          const ruleActions = await rule.action(rankings);
          actions.push(...ruleActions);
        }
      } catch (error) {
        this.logger.error(`Rule ${rule.name} failed:`, error);
      }
    }

    return actions;
  }

  private async optimizePage2Keywords(
    data: RankingData[],
  ): Promise<OptimizationAction[]> {
    const page2Keywords = data.filter(
      (r) => r.position >= 11 && r.position <= 20,
    );
    const actions: OptimizationAction[] = [];

    for (const ranking of page2Keywords) {
      // Analyze why it's on page 2
      const competitorAnalysis = ranking.competitorAnalysis
        .filter((c) => c.position < ranking.position)
        .sort((a, b) => a.position - b.position);

      if (competitorAnalysis.length > 0) {
        const topCompetitor = competitorAnalysis[0];

        actions.push({
          type: "content_suggestion",
          target: ranking.keyword,
          description: `Improve content for "${ranking.keyword}" - currently #${ranking.position}, competitor ${topCompetitor.domain} ranks #${topCompetitor.position}`,
          priority: "high",
          estimatedImpact: 8,
          implementationDetails: {
            currentPosition: ranking.position,
            targetPosition: topCompetitor.position,
            competitor: topCompetitor,
            suggestions: [
              "Expand content depth and comprehensiveness",
              "Add more relevant internal links",
              "Improve content structure with better headers",
              "Add relevant multimedia content",
            ],
          },
        });
      }

      // Check for technical optimization opportunities
      actions.push({
        type: "technical_fix",
        target: ranking.keyword,
        description: `Technical SEO optimization for "${ranking.keyword}"`,
        priority: "medium",
        estimatedImpact: 5,
        implementationDetails: {
          checks: [
            "Page load speed optimization",
            "Mobile responsiveness",
            "Core Web Vitals improvement",
            "Schema markup enhancement",
          ],
        },
      });
    }

    return actions;
  }

  private async optimizeRegionalPerformance(
    data: RankingData[],
  ): Promise<OptimizationAction[]> {
    const actions: OptimizationAction[] = [];
    const regionalMetrics = await this.analyticsService.getRegionalMetrics();

    const underperformingRegions = regionalMetrics
      .filter(
        (r) =>
          r.metrics.avgPosition > 30 &&
          this.config.regionPriorities[r.region] >= 7,
      )
      .sort((a, b) => b.opportunityScore - a.opportunityScore);

    for (const region of underperformingRegions.slice(0, 3)) {
      actions.push({
        type: "regional_focus",
        target: region.region,
        description: `Focus SEO efforts on ${region.region} - avg position ${region.metrics.avgPosition}`,
        priority: "high",
        estimatedImpact: 9,
        implementationDetails: {
          currentMetrics: region.metrics,
          strategy: await this.crawlerService.generateRegionalSEOStrategy(
            region.region,
            this.getRegionCountries(region.region),
          ),
          quickWins: [
            "Create region-specific landing pages",
            "Add local language content",
            "Build regional backlink profile",
            "Optimize for local search terms",
          ],
        },
      });
    }

    return actions;
  }

  private async addressCompetitorGap(
    data: RankingData[],
  ): Promise<OptimizationAction[]> {
    const actions: OptimizationAction[] = [];

    // Analyze competitor patterns
    const competitorDomains = new Map<
      string,
      { avgPosition: number; count: number; keywords: string[] }
    >();

    data.forEach((ranking) => {
      ranking.competitorAnalysis.forEach((comp) => {
        if (comp.position < ranking.position) {
          if (!competitorDomains.has(comp.domain)) {
            competitorDomains.set(comp.domain, {
              avgPosition: 0,
              count: 0,
              keywords: [],
            });
          }
          const competitor = competitorDomains.get(comp.domain);
          competitor.avgPosition =
            (competitor.avgPosition * competitor.count + comp.position) /
            (competitor.count + 1);
          competitor.count++;
          competitor.keywords.push(ranking.keyword);
        }
      });
    });

    // Find top competing domains
    const topCompetitors = Array.from(competitorDomains.entries())
      .sort(([, a], [, b]) => a.avgPosition - b.avgPosition)
      .slice(0, 3);

    for (const [domain, stats] of topCompetitors) {
      actions.push({
        type: "link_building",
        target: domain,
        description: `Build authority to compete with ${domain} (avg position ${stats.avgPosition.toFixed(1)})`,
        priority: "medium",
        estimatedImpact: 6,
        implementationDetails: {
          competitor: domain,
          competitorStats: stats,
          strategies: [
            "Analyze competitor backlink profile",
            "Create better content than competitor",
            "Target competitor's broken links",
            "Guest posting on competitor's partner sites",
          ],
        },
      });
    }

    return actions;
  }

  private async fixKeywordCannibalization(
    data: RankingData[],
  ): Promise<OptimizationAction[]> {
    const actions: OptimizationAction[] = [];

    // Group by similar keywords
    const keywordGroups = new Map<string, RankingData[]>();

    data.forEach((ranking) => {
      const baseKeyword = ranking.keyword
        .toLowerCase()
        .split(" ")
        .slice(0, 2)
        .join(" ");
      if (!keywordGroups.has(baseKeyword)) {
        keywordGroups.set(baseKeyword, []);
      }
      keywordGroups.get(baseKeyword).push(ranking);
    });

    // Find potential cannibalization
    for (const [baseKeyword, rankings] of keywordGroups) {
      if (rankings.length > 1) {
        const avgPosition =
          rankings.reduce((sum, r) => sum + r.position, 0) / rankings.length;

        if (avgPosition > 20) {
          actions.push({
            type: "content_suggestion",
            target: baseKeyword,
            description: `Potential keyword cannibalization for "${baseKeyword}" variations`,
            priority: "medium",
            estimatedImpact: 4,
            implementationDetails: {
              affectedKeywords: rankings.map((r) => r.keyword),
              avgPosition,
              suggestions: [
                "Consolidate similar content into one comprehensive page",
                "Use canonical tags to prevent cannibalization",
                "Create clear keyword targeting hierarchy",
                "Implement proper internal linking structure",
              ],
            },
          });
        }
      }
    }

    return actions;
  }

  private async optimizeForFeaturedSnippets(
    data: RankingData[],
  ): Promise<OptimizationAction[]> {
    const actions: OptimizationAction[] = [];

    // Look for positions 1-5 that could target featured snippets
    const snippetOpportunities = data.filter(
      (r) => r.position >= 1 && r.position <= 5,
    );

    for (const ranking of snippetOpportunities) {
      actions.push({
        type: "content_suggestion",
        target: ranking.keyword,
        description: `Optimize for featured snippet: "${ranking.keyword}" (position ${ranking.position})`,
        priority: "medium",
        estimatedImpact: 7,
        implementationDetails: {
          currentPosition: ranking.position,
          optimizations: [
            "Add clear, concise answers at the beginning of content",
            "Use bullet points and numbered lists",
            "Include relevant FAQs",
            "Structure content with appropriate headers",
            "Add schema markup for Q&A content",
          ],
        },
      });
    }

    return actions;
  }

  private async optimizeCTR(
    data: RankingData[],
  ): Promise<OptimizationAction[]> {
    const actions: OptimizationAction[] = [];

    // Identify keywords with good positions but potentially low CTR
    const ctrOpportunities = data.filter(
      (r) => r.position >= 3 && r.position <= 10,
    );

    for (const ranking of ctrOpportunities) {
      actions.push({
        type: "meta_update",
        target: ranking.keyword,
        description: `Improve CTR for "${ranking.keyword}" at position ${ranking.position}`,
        priority: "medium",
        estimatedImpact: 5,
        implementationDetails: {
          currentPosition: ranking.position,
          optimizations: [
            "Write more compelling meta titles",
            "Improve meta descriptions with clear value propositions",
            "Add power words and emotional triggers",
            "Include call-to-action in meta description",
            "Test different title formats",
          ],
        },
      });
    }

    return actions;
  }

  private hasRegionalUnderperformance(data: RankingData[]): boolean {
    const regionPerformance = new Map<string, number[]>();

    data.forEach((r) => {
      if (!regionPerformance.has(r.region)) {
        regionPerformance.set(r.region, []);
      }
      regionPerformance.get(r.region).push(r.position);
    });

    for (const [region, positions] of regionPerformance) {
      const avgPosition =
        positions.reduce((sum, pos) => sum + pos, 0) / positions.length;
      const priority = this.config.regionPriorities[region] || 1;

      if (avgPosition > 30 && priority >= 7) {
        return true;
      }
    }

    return false;
  }

  private hasCompetitorGap(data: RankingData[]): boolean {
    return data.some((r) =>
      r.competitorAnalysis.some((c) => c.position < r.position - 10),
    );
  }

  private hasKeywordCannibalization(data: RankingData[]): boolean {
    const keywordBases = new Set<string>();
    const duplicates = new Set<string>();

    data.forEach((r) => {
      const base = r.keyword.toLowerCase().split(" ").slice(0, 2).join(" ");
      if (keywordBases.has(base)) {
        duplicates.add(base);
      }
      keywordBases.add(base);
    });

    return duplicates.size > 0;
  }

  private hasFeaturedSnippetOpportunity(data: RankingData[]): boolean {
    return data.some((r) => r.position >= 1 && r.position <= 5);
  }

  private hasLowCTR(data: RankingData[]): boolean {
    return data.some((r) => r.position >= 3 && r.position <= 10);
  }

  private getActionScore(action: OptimizationAction): number {
    const priorityScores = { high: 10, medium: 5, low: 2 };
    return priorityScores[action.priority] + action.estimatedImpact;
  }

  private async implementActions(actions: OptimizationAction[]): Promise<void> {
    this.logger.log(`Auto-implementing ${actions.length} optimization actions`);

    for (const action of actions) {
      try {
        await this.implementAction(action);
        this.logger.log(`Implemented action: ${action.description}`);
      } catch (error) {
        this.logger.error(
          `Failed to implement action ${action.description}:`,
          error,
        );
      }
    }
  }

  private async queueActionsForApproval(
    actions: OptimizationAction[],
  ): Promise<void> {
    this.logger.log(
      `Queuing ${actions.length} optimization actions for approval`,
    );

    // In a real implementation, this would:
    // 1. Store actions in database
    // 2. Send notifications to administrators
    // 3. Create dashboard alerts
    // 4. Generate reports

    // For now, we'll just log the actions
    actions.forEach((action) => {
      this.logger.log(
        `Queued: ${action.type} - ${action.description} (Impact: ${action.estimatedImpact})`,
      );
    });
  }

  private async implementAction(action: OptimizationAction): Promise<void> {
    // In a real implementation, this would:
    // 1. Update meta tags automatically
    // 2. Generate content suggestions
    // 3. Update technical configurations
    // 4. Trigger content management workflows

    switch (action.type) {
      case "meta_update":
        // Auto-update meta tags
        this.logger.log(`Auto-updating meta tags for: ${action.target}`);
        break;
      case "content_suggestion":
        // Generate content optimization tasks
        this.logger.log(`Generated content suggestions for: ${action.target}`);
        break;
      case "technical_fix":
        // Apply technical optimizations
        this.logger.log(`Applied technical fixes for: ${action.target}`);
        break;
      default:
        this.logger.log(
          `Queued manual action: ${action.type} for ${action.target}`,
        );
    }
  }

  private getRegionCountries(region: string): string[] {
    const regionMap: Record<string, string[]> = {
      "East Africa": ["KE", "UG", "TZ", "SS", "CD", "ET"],
      "Middle East": ["PS", "YE", "SY", "IQ", "LB", "JO"],
      "South Asia": ["AF", "PK", "IN", "BD", "LK"],
      "Sahel Belt": ["ML", "TD", "NE", "BF", "SN"],
      "Caucasus & Balkans": ["GE", "AM", "BA", "XK", "ME"],
    };

    return regionMap[region] || [];
  }

  async getOptimizationConfig(): Promise<AutoOptimizationConfig> {
    return this.config;
  }

  async updateOptimizationConfig(
    config: Partial<AutoOptimizationConfig>,
  ): Promise<void> {
    this.config = { ...this.config, ...config };
    this.logger.log("Optimization configuration updated");
  }

  async getOptimizationRules(): Promise<OptimizationRule[]> {
    return this.optimizationRules;
  }

  async updateOptimizationRule(
    ruleId: string,
    updates: Partial<OptimizationRule>,
  ): Promise<void> {
    const ruleIndex = this.optimizationRules.findIndex((r) => r.id === ruleId);
    if (ruleIndex >= 0) {
      this.optimizationRules[ruleIndex] = {
        ...this.optimizationRules[ruleIndex],
        ...updates,
      };
      this.logger.log(`Updated optimization rule: ${ruleId}`);
    }
  }
}
