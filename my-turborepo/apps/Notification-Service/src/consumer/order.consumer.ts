import { Controller, Inject } from "@nestjs/common"; // 1. Import Controller instead of Injectable/Inject
import { EventPattern } from "@repo/rabbitmq-service";
import { NotificationService } from "../noti.service";
import { NotificationsGateway } from "../notifications.gateway";

@Controller() 
export class OrderConsumer {

    constructor(
        @Inject(NotificationService)
        private readonly notificationService: NotificationService,
        @Inject(NotificationsGateway)
        private readonly notificationsGateway: NotificationsGateway
    ) { }

    @EventPattern("order.created")
    async handleOrderCreated(data: any) {
        try {

            const notification = await this.notificationService.createNotification(
                Number(data.userId),
                String(data.orderId)
            )


            this.notificationsGateway.sendOrderNotification(Number(data.userId), notification);
        } catch (error) {
            throw error;
        }
    }
}
