import { Transport, RmqOptions } from '@nestjs/microservices';
import { RABBITMQ_URL } from './rabbitmq.constants';
export const rabbitMQConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [RABBITMQ_URL],
    queue: 'ecommerce_queue', 
    queueOptions: {
      durable: true,
    },
  },
});