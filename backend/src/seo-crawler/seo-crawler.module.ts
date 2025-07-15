import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { SEOCrawlerService } from "./seo-crawler.service";
import { SEOCrawlerController } from "./seo-crawler.controller";
import { SEOAnalyticsService } from "./seo-analytics.service";

@Module({
  imports: [HttpModule],
  controllers: [SEOCrawlerController],
  providers: [SEOCrawlerService, SEOAnalyticsService],
  exports: [SEOCrawlerService, SEOAnalyticsService],
})
export class SEOCrawlerModule {}
