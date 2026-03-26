import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const port = Number(process.env.PORT) || 3002;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`🚀 Email-Service is running on http://localhost:${port}`);
}

bootstrap();
