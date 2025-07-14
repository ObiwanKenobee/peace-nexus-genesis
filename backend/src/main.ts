import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      credentials: true,
    },
  });

  const configService = app.get(ConfigService);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === "production",
    }),
  );

  // API prefix
  app.setGlobalPrefix("api/v1");

  const port = configService.get("PORT") || 3000;
  await app.listen(port);

  console.log(`🌍 PAXIS Core API running on: http://localhost:${port}`);
  console.log(`�� GraphQL Playground: http://localhost:${port}/graphql`);
}

bootstrap();
