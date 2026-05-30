import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { rabbitMQConfig } from './rabbitmq.options';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice(rabbitMQConfig());
      await app.startAllMicroservices();


    await app.listen(3009);

    console.log('🚀 RabbitMQ Microservice is listening on ecommerce_queue...');
}

bootstrap();
