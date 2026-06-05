import { Controller, Inject } from '@nestjs/common'; // 1. Import Controller instead of Injectable/Inject
import { EventPattern } from '@repo/rabbitmq-service';
import { OrderService } from '../Order/Order.service';
import { CreateOrder } from '@repo/shared';

@Controller() // 2. Change @Injectable() to @Controller()
export class PaymentConsumer {

    constructor(
        // 3. Clean up the constructor injection (OrderService doesn't need @Inject unless using custom tokens)
        @Inject(OrderService) private readonly orderService: OrderService,
    ) { }

    @EventPattern("payment.completed")
    async handlePaymentCompleted(data: any) {
        try {

            const orderData: CreateOrder[] = [data];

            await this.orderService.createOrder(orderData);
        } catch (error) {
            throw error;
        }
    }
}
