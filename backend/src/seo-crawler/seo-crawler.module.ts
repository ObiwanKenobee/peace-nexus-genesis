import { Module } from "@nestjs/common";
import { SEOCrawlerService } from "./seo-crawler.service";
import { SEOCrawlerController } from "./seo-crawler.controller";
import { SEOAnalyticsService } from "./seo-analytics.service";

@Module({
  controllers: [SEOCrawlerController],
  providers: [SEOCrawlerService, SEOAnalyticsService],
  exports: [SEOCrawlerService, SEOAnalyticsService],
})
export class SEOCrawlerModule {}
