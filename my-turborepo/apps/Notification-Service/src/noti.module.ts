import { Module } from "@nestjs/common";
import { NotificationsGateway } from "./notifications.gateway";
import { NotificationService } from "./noti.service";
import { NotiController } from "./noti.controller";
import { ClientsModule, Transport } from "@repo/rabbitmq-service";
import { OrderConsumer } from "./consumer/order.consumer";


@Module({
    imports: [
        ClientsModule.register([
            {
                name: "NOTIFICATION_PUBLISHER",
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL || "amqps://aigxmdvw:LRq8AnXoyWSCnAT0bxYQxNLa--dVZzUc@yak.lmq.cloudamqp.com/aigxmdvw"],
                    queue: "notification_queue",
                    queueOptions: {
                        durable: true
                    }
                }
            }
        ]),
    ],
    providers: [NotificationService, NotificationsGateway, OrderConsumer],
    controllers: [NotiController, OrderConsumer],
    exports: [NotificationService, NotificationsGateway]
})

export class NotiModule { }