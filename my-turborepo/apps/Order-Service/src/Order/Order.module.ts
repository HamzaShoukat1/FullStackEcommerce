import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OrderController } from './Order.controller.js';
import { OrderService } from './Order.service.js';
import { ClientsModule, Transport } from '@repo/rabbitmq-service';
import { IsAuthenticatedGuard, RolesGuard, getAccessTokenSecret, getJwtAccessExpires } from '@repo/shared';
import { PaymentConsumer } from '../consumer/payment.consumer.js';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "ORDER_PUBLISHER",
				transport: Transport.RMQ,
				options: {
					urls: [process.env.RABBITMQ_URL || "amqps://aigxmdvw:LRq8AnXoyWSCnAT0bxYQxNLa--dVZzUc@yak.lmq.cloudamqp.com/aigxmdvw"],
					queue: "order_queue",
					queueOptions: {
						durable: true
					}
				}
			}

		]),
		JwtModule.registerAsync({
			useFactory: () => ({
				secret: getAccessTokenSecret(),
				signOptions: { expiresIn: getJwtAccessExpires() as any },
			}),
		}),
	],
	exports: [OrderService],
	controllers: [OrderController,PaymentConsumer],
	providers: [OrderService, PaymentConsumer, IsAuthenticatedGuard, RolesGuard],
})
export class OrderModule { }
