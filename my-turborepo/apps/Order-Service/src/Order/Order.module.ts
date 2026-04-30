import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OrderController } from './Order.controller.js';
import { OrderService } from './Order.service.js';
import { IsAuthenticatedGuard, RolesGuard, getAccessTokenSecret, getJwtAccessExpires } from '@repo/shared';

@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: () => ({
				secret: getAccessTokenSecret(),
				signOptions: { expiresIn: getJwtAccessExpires() as any },
			}),
		}),
	],
	controllers: [OrderController],
	providers: [OrderService, IsAuthenticatedGuard, RolesGuard],
})
export class OrderModule {}
