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
import { getAccessTokenSecret, getJwtAccessExpires, ResponseInterceptor } from '@repo/shared';
import { JwtModule } from '@nestjs/jwt';
import { Transport } from '@repo/rabbitmq-service';


async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    // Connect to RabbitMQ as microservice consumer
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || "amqps://aigxmdvw:LRq8AnXoyWSCnAT0bxYQxNLa--dVZzUc@yak.lmq.cloudamqp.com/aigxmdvw"],
        queue: "order_queue",
        queueOptions: {
          durable: true
        }
      }
    });

    // Security middleware
    app.use(cookieParser());
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.enableCors({
      origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3010'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true,
    })
    // app.use(helmet());

    JwtModule.register({
      global: true,
      secret: getAccessTokenSecret(),
      signOptions: { expiresIn: getJwtAccessExpires() as any }
    })
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
    const port = process.env.PORT || 3015;
    await app.listen(port);
    await app.startAllMicroservices();
    logger.log(`Application is running on: http://localhost:${port}`);
    logger.log(`Microservice listening on queue: order_queue`);

  } catch (error) {
    logger.error('Error during application bootstrap:', error);
    process.exit(1);
  }
}

bootstrap();
