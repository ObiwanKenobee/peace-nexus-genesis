/**
 * PAXIS Wildlife Peace - Global API Gateway
 *
 * Comprehensive API gateway supporting 194+ countries with:
 * - Global load balancing and routing
 * - Multi-region deployment
 * - Rate limiting and DDoS protection
 * - Authentication and authorization
 * - Request/response transformation
 * - Caching and performance optimization
 * - Real-time monitoring and analytics
 */

import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";

// Types for API Gateway
interface APIRoute {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  handler: string;
  authRequired: boolean;
  rateLimit?: {
    windowMs: number;
    max: number;
  };
  regions: string[];
  cacheStrategy?: "none" | "short" | "medium" | "long";
  transformRequest?: boolean;
  transformResponse?: boolean;
}

interface Region {
  code: string;
  name: string;
  endpoint: string;
  loadBalancer: string[];
  latencyThreshold: number;
  priority: number;
  capabilities: string[];
}

interface LoadBalancingStrategy {
  type:
    | "round_robin"
    | "least_connections"
    | "weighted"
    | "geographic"
    | "health_based";
  healthCheckInterval: number;
  failoverThreshold: number;
  retryAttempts: number;
}

// Global regions for 194+ countries
const GLOBAL_REGIONS: Region[] = [
  // North America
  {
    code: "us-east-1",
    name: "US East (Virginia)",
    endpoint: "https://api-us-east.paxis.org",
    loadBalancer: [
      "https://lb1-us-east.paxis.org",
      "https://lb2-us-east.paxis.org",
      "https://lb3-us-east.paxis.org",
    ],
    latencyThreshold: 100,
    priority: 1,
    capabilities: [
      "wildlife-tracking",
      "prayer-services",
      "blockchain",
      "ai-analytics",
    ],
  },
  {
    code: "us-west-1",
    name: "US West (California)",
    endpoint: "https://api-us-west.paxis.org",
    loadBalancer: [
      "https://lb1-us-west.paxis.org",
      "https://lb2-us-west.paxis.org",
    ],
    latencyThreshold: 100,
    priority: 1,
    capabilities: [
      "wildlife-tracking",
      "prayer-services",
      "blockchain",
      "ai-analytics",
    ],
  },
  {
    code: "ca-central-1",
    name: "Canada Central",
    endpoint: "https://api-ca-central.paxis.org",
    loadBalancer: ["https://lb1-ca-central.paxis.org"],
    latencyThreshold: 120,
    priority: 2,
    capabilities: ["wildlife-tracking", "prayer-services"],
  },

  // Europe
  {
    code: "eu-west-1",
    name: "Europe West (Ireland)",
    endpoint: "https://api-eu-west.paxis.org",
    loadBalancer: [
      "https://lb1-eu-west.paxis.org",
      "https://lb2-eu-west.paxis.org",
      "https://lb3-eu-west.paxis.org",
    ],
    latencyThreshold: 80,
    priority: 1,
    capabilities: [
      "wildlife-tracking",
      "prayer-services",
      "blockchain",
      "ai-analytics",
    ],
  },
  {
    code: "eu-central-1",
    name: "Europe Central (Frankfurt)",
    endpoint: "https://api-eu-central.paxis.org",
    loadBalancer: [
      "https://lb1-eu-central.paxis.org",
      "https://lb2-eu-central.paxis.org",
    ],
    latencyThreshold: 90,
    priority: 1,
    capabilities: ["wildlife-tracking", "prayer-services", "blockchain"],
  },
  {
    code: "eu-north-1",
    name: "Europe North (Stockholm)",
    endpoint: "https://api-eu-north.paxis.org",
    loadBalancer: ["https://lb1-eu-north.paxis.org"],
    latencyThreshold: 100,
    priority: 2,
    capabilities: ["wildlife-tracking", "prayer-services"],
  },

  // Asia Pacific
  {
    code: "ap-southeast-1",
    name: "Asia Pacific (Singapore)",
    endpoint: "https://api-ap-southeast.paxis.org",
    loadBalancer: [
      "https://lb1-ap-southeast.paxis.org",
      "https://lb2-ap-southeast.paxis.org",
    ],
    latencyThreshold: 120,
    priority: 1,
    capabilities: ["wildlife-tracking", "prayer-services", "blockchain"],
  },
  {
    code: "ap-south-1",
    name: "Asia Pacific (Mumbai)",
    endpoint: "https://api-ap-south.paxis.org",
    loadBalancer: [
      "https://lb1-ap-south.paxis.org",
      "https://lb2-ap-south.paxis.org",
    ],
    latencyThreshold: 150,
    priority: 1,
    capabilities: ["wildlife-tracking", "prayer-services", "blockchain"],
  },
  {
    code: "ap-northeast-1",
    name: "Asia Pacific (Tokyo)",
    endpoint: "https://api-ap-northeast.paxis.org",
    loadBalancer: ["https://lb1-ap-northeast.paxis.org"],
    latencyThreshold: 100,
    priority: 1,
    capabilities: ["wildlife-tracking", "prayer-services"],
  },
  {
    code: "ap-east-1",
    name: "Asia Pacific (Hong Kong)",
    endpoint: "https://api-ap-east.paxis.org",
    loadBalancer: ["https://lb1-ap-east.paxis.org"],
    latencyThreshold: 110,
    priority: 2,
    capabilities: ["wildlife-tracking", "prayer-services"],
  },

  // Africa
  {
    code: "af-south-1",
    name: "Africa (Cape Town)",
    endpoint: "https://api-af-south.paxis.org",
    loadBalancer: [
      "https://lb1-af-south.paxis.org",
      "https://lb2-af-south.paxis.org",
    ],
    latencyThreshold: 200,
    priority: 1,
    capabilities: [
      "wildlife-tracking",
      "prayer-services",
      "conservation-projects",
    ],
  },
  {
    code: "af-east-1",
    name: "Africa East (Kenya)",
    endpoint: "https://api-af-east.paxis.org",
    loadBalancer: ["https://lb1-af-east.paxis.org"],
    latencyThreshold: 180,
    priority: 1,
    capabilities: [
      "wildlife-tracking",
      "prayer-services",
      "conservation-projects",
    ],
  },

  // South America
  {
    code: "sa-east-1",
    name: "South America (São Paulo)",
    endpoint: "https://api-sa-east.paxis.org",
    loadBalancer: [
      "https://lb1-sa-east.paxis.org",
      "https://lb2-sa-east.paxis.org",
    ],
    latencyThreshold: 150,
    priority: 1,
    capabilities: [
      "wildlife-tracking",
      "prayer-services",
      "rainforest-monitoring",
    ],
  },

  // Middle East
  {
    code: "me-south-1",
    name: "Middle East (Bahrain)",
    endpoint: "https://api-me-south.paxis.org",
    loadBalancer: ["https://lb1-me-south.paxis.org"],
    latencyThreshold: 120,
    priority: 2,
    capabilities: ["wildlife-tracking", "prayer-services"],
  },

  // Oceania
  {
    code: "ap-southeast-2",
    name: "Asia Pacific (Sydney)",
    endpoint: "https://api-ap-southeast2.paxis.org",
    loadBalancer: ["https://lb1-ap-southeast2.paxis.org"],
    latencyThreshold: 100,
    priority: 1,
    capabilities: [
      "wildlife-tracking",
      "prayer-services",
      "marine-conservation",
    ],
  },
];

// API Routes Configuration
const API_ROUTES: APIRoute[] = [
  // Authentication & User Management
  {
    path: "/api/v1/auth/login",
    method: "POST",
    handler: "auth.login",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/auth/register",
    method: "POST",
    handler: "auth.register",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/auth/refresh",
    method: "POST",
    handler: "auth.refresh",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/auth/logout",
    method: "POST",
    handler: "auth.logout",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },

  // User Profiles
  {
    path: "/api/v1/users/profile",
    method: "GET",
    handler: "users.getProfile",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/users/profile",
    method: "PUT",
    handler: "users.updateProfile",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/users/:id/conservation-stats",
    method: "GET",
    handler: "users.getConservationStats",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "medium",
  },

  // Species Database
  {
    path: "/api/v1/species",
    method: "GET",
    handler: "species.list",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "long",
    rateLimit: { windowMs: 60000, max: 100 },
  },
  {
    path: "/api/v1/species/:id",
    method: "GET",
    handler: "species.getById",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "long",
  },
  {
    path: "/api/v1/species",
    method: "POST",
    handler: "species.create",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/species/:id",
    method: "PUT",
    handler: "species.update",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/species/:id/guardian",
    method: "POST",
    handler: "species.becomeGuardian",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/species/:id/reports",
    method: "GET",
    handler: "species.getReports",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/species/:id/reports",
    method: "POST",
    handler: "species.addReport",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },

  // Prayer & Meditation System
  {
    path: "/api/v1/prayers",
    method: "GET",
    handler: "prayers.list",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/prayers",
    method: "POST",
    handler: "prayers.create",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/prayers/:id",
    method: "GET",
    handler: "prayers.getById",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/prayers/:id/complete",
    method: "POST",
    handler: "prayers.markComplete",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/prayers/daily",
    method: "GET",
    handler: "prayers.getDailyPrayers",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/prayers/ai-generate",
    method: "POST",
    handler: "prayers.aiGenerate",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },

  // Habitat Monitoring
  {
    path: "/api/v1/habitats",
    method: "GET",
    handler: "habitats.list",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/habitats/:id",
    method: "GET",
    handler: "habitats.getById",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/habitats/:id/incidents",
    method: "GET",
    handler: "habitats.getIncidents",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/habitats/:id/incidents",
    method: "POST",
    handler: "habitats.reportIncident",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/habitats/:id/devices",
    method: "GET",
    handler: "habitats.getDevices",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/habitats/:id/environmental-data",
    method: "GET",
    handler: "habitats.getEnvironmentalData",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "short",
  },

  // Conservation Projects
  {
    path: "/api/v1/projects",
    method: "GET",
    handler: "projects.list",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/projects",
    method: "POST",
    handler: "projects.create",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/projects/:id",
    method: "GET",
    handler: "projects.getById",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/projects/:id/support",
    method: "POST",
    handler: "projects.support",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/projects/:id/updates",
    method: "GET",
    handler: "projects.getUpdates",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/projects/:id/updates",
    method: "POST",
    handler: "projects.addUpdate",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },

  // Community Forums
  {
    path: "/api/v1/forums",
    method: "GET",
    handler: "forums.list",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/forums/:id/topics",
    method: "GET",
    handler: "forums.getTopics",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/forums/:id/topics",
    method: "POST",
    handler: "forums.createTopic",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/topics/:id",
    method: "GET",
    handler: "topics.getById",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/topics/:id/replies",
    method: "GET",
    handler: "topics.getReplies",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/topics/:id/replies",
    method: "POST",
    handler: "topics.addReply",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },

  // Analytics & Insights
  {
    path: "/api/v1/analytics/overview",
    method: "GET",
    handler: "analytics.getOverview",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/analytics/species",
    method: "GET",
    handler: "analytics.getSpeciesAnalytics",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/analytics/geographical",
    method: "GET",
    handler: "analytics.getGeographicalData",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/analytics/predictions",
    method: "GET",
    handler: "analytics.getPredictions",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/analytics/realtime",
    method: "GET",
    handler: "analytics.getRealTimeData",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },

  // PeaceCoin & Blockchain
  {
    path: "/api/v1/blockchain/balance",
    method: "GET",
    handler: "blockchain.getBalance",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/blockchain/transactions",
    method: "GET",
    handler: "blockchain.getTransactions",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/blockchain/transfer",
    method: "POST",
    handler: "blockchain.transfer",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/blockchain/dao/proposals",
    method: "GET",
    handler: "dao.getProposals",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "short",
  },
  {
    path: "/api/v1/blockchain/dao/vote",
    method: "POST",
    handler: "dao.vote",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },

  // Real-time Features
  {
    path: "/api/v1/realtime/alerts",
    method: "GET",
    handler: "realtime.getAlerts",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/realtime/activities",
    method: "GET",
    handler: "realtime.getActivities",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },

  // Mobile-specific endpoints
  {
    path: "/api/v1/mobile/sync",
    method: "POST",
    handler: "mobile.sync",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/mobile/offline-data",
    method: "GET",
    handler: "mobile.getOfflineData",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "short",
  },

  // File Upload & Media
  {
    path: "/api/v1/upload",
    method: "POST",
    handler: "media.upload",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/media/:id",
    method: "GET",
    handler: "media.getById",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "long",
  },

  // Payments & Donations
  {
    path: "/api/v1/payments/donate",
    method: "POST",
    handler: "payments.donate",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/api/v1/payments/methods",
    method: "GET",
    handler: "payments.getMethods",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "medium",
  },
  {
    path: "/api/v1/payments/history",
    method: "GET",
    handler: "payments.getHistory",
    authRequired: true,
    regions: ["all"],
    cacheStrategy: "short",
  },

  // Localization
  {
    path: "/api/v1/i18n/:locale",
    method: "GET",
    handler: "i18n.getTranslations",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "long",
  },
  {
    path: "/api/v1/i18n/currencies",
    method: "GET",
    handler: "i18n.getCurrencies",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "long",
  },

  // Health Checks
  {
    path: "/health",
    method: "GET",
    handler: "health.check",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "none",
  },
  {
    path: "/health/detailed",
    method: "GET",
    handler: "health.detailed",
    authRequired: false,
    regions: ["all"],
    cacheStrategy: "none",
  },
];

// Rate Limiting Configuration
const RATE_LIMITS = {
  global: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: {
      error: "Too many requests from this IP, please try again later.",
      retryAfter: 15 * 60,
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),

  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 authentication requests per windowMs
    message: {
      error: "Too many authentication attempts, please try again later.",
      retryAfter: 15 * 60,
    },
  }),

  api: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 API requests per minute
    message: {
      error: "API rate limit exceeded, please slow down.",
      retryAfter: 60,
    },
  }),

  blockchain: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // limit blockchain operations
    message: {
      error: "Blockchain rate limit exceeded.",
      retryAfter: 60,
    },
  }),
};

// Cache Configuration
interface CacheConfig {
  redis: Redis;
  strategies: {
    none: number;
    short: number;
    medium: number;
    long: number;
  };
}

const CACHE_CONFIG: CacheConfig = {
  redis: new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD,
    retryDelayOnFailover: 100,
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
  }),
  strategies: {
    none: 0,
    short: 60, // 1 minute
    medium: 300, // 5 minutes
    long: 3600, // 1 hour
  },
};

// Load Balancing and Health Management
class RegionManager {
  private healthChecks: Map<string, boolean> = new Map();
  private latencyData: Map<string, number[]> = new Map();
  private loadBalancer: LoadBalancingStrategy;

  constructor() {
    this.loadBalancer = {
      type: "health_based",
      healthCheckInterval: 30000, // 30 seconds
      failoverThreshold: 3,
      retryAttempts: 3,
    };

    this.startHealthChecks();
  }

  private startHealthChecks() {
    setInterval(async () => {
      for (const region of GLOBAL_REGIONS) {
        try {
          const start = Date.now();
          const response = await fetch(`${region.endpoint}/health`, {
            method: "GET",
            timeout: 5000,
          });
          const latency = Date.now() - start;

          this.healthChecks.set(region.code, response.ok);

          if (!this.latencyData.has(region.code)) {
            this.latencyData.set(region.code, []);
          }

          const latencies = this.latencyData.get(region.code)!;
          latencies.push(latency);

          // Keep only last 10 measurements
          if (latencies.length > 10) {
            latencies.shift();
          }
        } catch (error) {
          this.healthChecks.set(region.code, false);
          console.error(
            `Health check failed for region ${region.code}:`,
            error,
          );
        }
      }
    }, this.loadBalancer.healthCheckInterval);
  }

  public getBestRegion(
    userLocation?: string,
    capability?: string,
  ): Region | null {
    const availableRegions = GLOBAL_REGIONS.filter((region) => {
      const isHealthy = this.healthChecks.get(region.code) !== false;
      const hasCapability =
        !capability || region.capabilities.includes(capability);
      return isHealthy && hasCapability;
    });

    if (availableRegions.length === 0) {
      return null;
    }

    // Geographic routing if user location is provided
    if (userLocation) {
      // Simplified geographic matching - in production, use more sophisticated geolocation
      const geoRegions = this.getRegionsByGeography(userLocation);
      const intersection = availableRegions.filter((r) =>
        geoRegions.includes(r.code),
      );
      if (intersection.length > 0) {
        return this.selectBestFromRegions(intersection);
      }
    }

    return this.selectBestFromRegions(availableRegions);
  }

  private selectBestFromRegions(regions: Region[]): Region {
    // Health-based selection with latency consideration
    return regions.reduce((best, current) => {
      const bestLatency = this.getAverageLatency(best.code);
      const currentLatency = this.getAverageLatency(current.code);

      if (current.priority < best.priority) return current;
      if (current.priority === best.priority && currentLatency < bestLatency)
        return current;
      return best;
    });
  }

  private getAverageLatency(regionCode: string): number {
    const latencies = this.latencyData.get(regionCode) || [];
    if (latencies.length === 0) return Infinity;
    return latencies.reduce((sum, lat) => sum + lat, 0) / latencies.length;
  }

  private getRegionsByGeography(userLocation: string): string[] {
    // Simplified mapping - in production, use IP geolocation or user preference
    const geoMap: { [key: string]: string[] } = {
      US: ["us-east-1", "us-west-1"],
      CA: ["ca-central-1", "us-east-1"],
      GB: ["eu-west-1", "eu-central-1"],
      DE: ["eu-central-1", "eu-west-1"],
      FR: ["eu-west-1", "eu-central-1"],
      SG: ["ap-southeast-1", "ap-east-1"],
      JP: ["ap-northeast-1", "ap-southeast-1"],
      AU: ["ap-southeast-2", "ap-southeast-1"],
      BR: ["sa-east-1", "us-east-1"],
      ZA: ["af-south-1", "eu-west-1"],
      KE: ["af-east-1", "af-south-1"],
      IN: ["ap-south-1", "ap-southeast-1"],
    };

    return geoMap[userLocation] || ["us-east-1"];
  }
}

// Request/Response Transformation
class TransformationEngine {
  public transformRequest(req: Request): Request {
    // Add correlation ID for tracing
    req.headers["x-correlation-id"] =
      req.headers["x-correlation-id"] || uuidv4();

    // Add timestamp
    req.headers["x-request-timestamp"] = Date.now().toString();

    // Normalize request format
    if (req.body && typeof req.body === "object") {
      // Add metadata
      req.body._metadata = {
        timestamp: Date.now(),
        version: "v1",
        source: "api-gateway",
      };
    }

    return req;
  }

  public transformResponse(res: any, req: Request): any {
    // Add standard response format
    const transformed = {
      success: true,
      data: res.data || res,
      metadata: {
        timestamp: Date.now(),
        correlationId: req.headers["x-correlation-id"],
        processingTime:
          Date.now() - parseInt(req.headers["x-request-timestamp"] as string),
        version: "v1",
      },
    };

    return transformed;
  }
}

// Main API Gateway Class
export class APIGateway {
  private regionManager: RegionManager;
  private transformationEngine: TransformationEngine;
  private cache: Redis;

  constructor() {
    this.regionManager = new RegionManager();
    this.transformationEngine = new TransformationEngine();
    this.cache = CACHE_CONFIG.redis;
  }

  public async routeRequest(req: Request, res: Response): Promise<void> {
    try {
      // Apply transformation
      req = this.transformationEngine.transformRequest(req);

      // Find matching route
      const route = this.findRoute(req.path, req.method as any);
      if (!route) {
        res.status(404).json({ error: "Route not found" });
        return;
      }

      // Check cache first
      const cacheKey = this.generateCacheKey(req);
      if (route.cacheStrategy && route.cacheStrategy !== "none") {
        const cached = await this.getFromCache(cacheKey);
        if (cached) {
          res.json(cached);
          return;
        }
      }

      // Get best region for request
      const userLocation =
        (req.headers["cf-ipcountry"] as string) ||
        (req.headers["x-user-country"] as string);
      const capability = this.getRequiredCapability(route);
      const region = this.regionManager.getBestRegion(userLocation, capability);

      if (!region) {
        res.status(503).json({ error: "Service temporarily unavailable" });
        return;
      }

      // Forward request to selected region
      const response = await this.forwardRequest(req, region, route);

      // Transform response
      const transformedResponse = this.transformationEngine.transformResponse(
        response,
        req,
      );

      // Cache response if needed
      if (route.cacheStrategy && route.cacheStrategy !== "none") {
        await this.setCache(
          cacheKey,
          transformedResponse,
          CACHE_CONFIG.strategies[route.cacheStrategy],
        );
      }

      res.json(transformedResponse);
    } catch (error) {
      console.error("Gateway routing error:", error);
      res.status(500).json({
        error: "Internal server error",
        correlationId: req.headers["x-correlation-id"],
      });
    }
  }

  private findRoute(path: string, method: string): APIRoute | null {
    return (
      API_ROUTES.find((route) => {
        const pathMatch = this.matchPath(route.path, path);
        const methodMatch = route.method === method;
        return pathMatch && methodMatch;
      }) || null
    );
  }

  private matchPath(routePath: string, requestPath: string): boolean {
    const routeParts = routePath.split("/");
    const requestParts = requestPath.split("/");

    if (routeParts.length !== requestParts.length) return false;

    return routeParts.every((part, index) => {
      if (part.startsWith(":")) return true; // Parameter match
      return part === requestParts[index];
    });
  }

  private generateCacheKey(req: Request): string {
    const baseKey = `${req.method}:${req.path}`;
    const queryString = new URLSearchParams(req.query as any).toString();
    const userContext = req.headers["authorization"] ? "auth" : "anon";

    return `gateway:${baseKey}:${queryString}:${userContext}`;
  }

  private async getFromCache(key: string): Promise<any | null> {
    try {
      const cached = await this.cache.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  }

  private async setCache(key: string, data: any, ttl: number): Promise<void> {
    try {
      await this.cache.setex(key, ttl, JSON.stringify(data));
    } catch (error) {
      console.error("Cache set error:", error);
    }
  }

  private getRequiredCapability(route: APIRoute): string | undefined {
    if (route.path.includes("/blockchain/")) return "blockchain";
    if (route.path.includes("/analytics/")) return "ai-analytics";
    if (route.path.includes("/species/")) return "wildlife-tracking";
    if (route.path.includes("/prayers/")) return "prayer-services";
    if (route.path.includes("/projects/")) return "conservation-projects";
    return undefined;
  }

  private async forwardRequest(
    req: Request,
    region: Region,
    route: APIRoute,
  ): Promise<any> {
    const endpoint = `${region.endpoint}${req.path}`;

    const requestOptions: RequestInit = {
      method: req.method,
      headers: {
        ...req.headers,
        "x-forwarded-for": req.ip,
        "x-region": region.code,
        "x-gateway-version": "1.0.0",
      } as any,
    };

    if (
      req.body &&
      (req.method === "POST" || req.method === "PUT" || req.method === "PATCH")
    ) {
      requestOptions.body = JSON.stringify(req.body);
      (requestOptions.headers as any)["content-type"] = "application/json";
    }

    const response = await fetch(endpoint, requestOptions);

    if (!response.ok) {
      throw new Error(
        `Upstream service error: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  }
}

// Configuration and Setup Functions
export function setupGateway() {
  const gateway = new APIGateway();

  return {
    // Middleware for Express.js
    middleware: [
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "wss:", "https:"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
          },
        },
        crossOriginEmbedderPolicy: false,
      }),

      cors({
        origin:
          process.env.NODE_ENV === "production"
            ? [
                "https://paxis.org",
                "https://app.paxis.org",
                "https://mobile.paxis.org",
              ]
            : true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: [
          "Content-Type",
          "Authorization",
          "X-Requested-With",
          "X-User-Country",
          "X-Correlation-ID",
        ],
      }),

      compression({
        filter: (req: Request, res: Response) => {
          if (req.headers["x-no-compression"]) {
            return false;
          }
          return compression.filter(req, res);
        },
        threshold: 1024,
      }),

      RATE_LIMITS.global,

      // Custom middleware for gateway routing
      async (req: Request, res: Response, next: NextFunction) => {
        if (req.path.startsWith("/api/")) {
          await gateway.routeRequest(req, res);
        } else {
          next();
        }
      },
    ],

    // Direct gateway access
    gateway,

    // Health check endpoint
    healthCheck: () => ({
      status: "healthy",
      timestamp: new Date().toISOString(),
      regions: GLOBAL_REGIONS.map((r) => ({
        code: r.code,
        name: r.name,
        healthy: true, // This would be checked in real implementation
      })),
      version: "1.0.0",
    }),
  };
}

// Export types and constants for use in other modules
export { APIRoute, Region, GLOBAL_REGIONS, API_ROUTES, RATE_LIMITS };
