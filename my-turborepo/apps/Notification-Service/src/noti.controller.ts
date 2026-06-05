import {
    Controller,
    Get,
    Patch,
    Param,
    UseGuards,
    Req,
    Inject,
} from "@nestjs/common";
import { NotificationService } from "./noti.service";
import { IsAuthenticatedGuard } from "@repo/shared";
import type { AuthRequest } from "@repo/shared";


@Controller('notifications')
@UseGuards(IsAuthenticatedGuard)
export class NotiController {
    constructor(@Inject(NotificationService) private readonly notificationService: NotificationService) { }

    @Get()
    async getNotifications(@Req() req: AuthRequest) {
        const userId = Number(req.user.sub)
        return await this.notificationService.getNotificationForUser(userId)
    };

    @Patch(':id/read')
    async markAsRead(@Param('id') id: string) {
        return await this.notificationService.markAsRead(Number(id))
    }

    @Patch('read-all')
    async markAllAsRead(@Req() req: AuthRequest) {
        const userId = Number(req.user.sub)
        return await this.notificationService.markAllAsRead(userId)
    }


}