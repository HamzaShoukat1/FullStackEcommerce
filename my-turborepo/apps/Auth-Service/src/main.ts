import 'dotenv/config';
import 'reflect-metadata';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, '..', '.env') });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';


async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    // Security middleware
    app.use(cookieParser());
    app.useGlobalInterceptors(new ResponseInterceptor());
    // app.use(helmet());
    const allowedOrigins = ['http://localhost:3003']
    app.enableCors({
      origin: allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    });

    // Global pipes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    // Swagger - only enable in non-production environments
    // if (configService.get('env') !== 'production') {
    //   const config = new DocumentBuilder()
    //     .setTitle('Prime Nestjs')
    //     .setDescription('Boilerplate for nestjs')
    //     .setVersion('2.0.0')
    //     .addBearerAuth()
    //     .addTag('api')
    //     .build();

    //   const document = SwaggerModule.createDocument(app, config);
    //   SwaggerModule.setup('api', app, document);
    // }

    // const port = ('port', 3000);
    const port = process.env.PORT || 3003;
    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}`);

  } catch (error) {
    logger.error('Error during application bootstrap:', error);
    process.exit(1);
  }
}

bootstrap();
