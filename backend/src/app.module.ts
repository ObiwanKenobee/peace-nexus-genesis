import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { CacheModule } from "@nestjs/cache-manager";
import { join } from "path";

// Core modules
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConflictModule } from "./conflict/conflict.module";
import { MediationModule } from "./mediation/mediation.module";
import { TranslationModule } from "./translation/translation.module";
import { PeaceCoinModule } from "./peacecoin/peacecoin.module";
import { ResourcesModule } from "./resources/resources.module";
import { EducationModule } from "./education/education.module";
import { VRLabsModule } from "./vr-labs/vr-labs.module";
import { AIAgentsModule } from "./ai-agents/ai-agents.module";
import { GovernanceModule } from "./governance/governance.module";
import { SecurityModule } from "./security/security.module";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { PaymentModule } from "./payment/payment.module";
import { SEOCrawlerModule } from "./seo-crawler/seo-crawler.module";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST", "localhost"),
        port: configService.get("DB_PORT", 5432),
        username: configService.get("DB_USERNAME", "postgres"),
        password: configService.get("DB_PASSWORD", "password"),
        database: configService.get("DB_NAME", "paxis_core"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: configService.get("NODE_ENV") === "development",
        logging: configService.get("NODE_ENV") === "development",
        ssl:
          configService.get("NODE_ENV") === "production"
            ? { rejectUnauthorized: false }
            : false,
      }),
      inject: [ConfigService],
    }),

    // GraphQL
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), "src/schema.gql"),
        sortSchema: true,
        playground: configService.get("NODE_ENV") === "development",
        introspection: true,
        context: ({ req, res }) => ({ req, res }),
        subscriptions: {
          "graphql-ws": true,
          "subscriptions-transport-ws": true,
        },
      }),
      inject: [ConfigService],
    }),

    // Cache
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ttl: 300, // 5 minutes
        max: 100,
        store: configService.get("REDIS_URL") ? "redis" : "memory",
        host: configService.get("REDIS_HOST", "localhost"),
        port: configService.get("REDIS_PORT", 6379),
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),

    // Core business modules
    AuthModule,
    UsersModule,
    ConflictModule,
    MediationModule,
    TranslationModule,
    PeaceCoinModule,
    ResourcesModule,
    EducationModule,
    VRLabsModule,
    AIAgentsModule,
    GovernanceModule,
    SecurityModule,
    BlockchainModule,
    NotificationsModule,
    AnalyticsModule,
    PaymentModule,
  ],
})
export class AppModule {}
