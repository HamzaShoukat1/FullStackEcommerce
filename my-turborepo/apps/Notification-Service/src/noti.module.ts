import { Module } from "@nestjs/common";
import { NotificationsGateway } from "./notifications.gateway";
import { NotificationService } from "./noti.service";
import { NotiController } from "./noti.controller";



@Module({
    providers:[NotificationService,NotificationsGateway],
    controllers:[NotiController]
})

export class NotiModule {}