import {  Injectable } from "@nestjs/common";
import { prisma } from "@repo/db";

@Injectable()

export class NotificationService {


    async createNotification(userId: number, orderId: string) {
        return await prisma.notification.create({
            data:{
                userId ,
                orderId,
                title:"Order Placed Successfully",
                message: `Your order #${orderId} has been placed successfully.`
            }

        })

    };
    async getNotificationForUser(userId:number){
        return await prisma.notification.findMany({
            where:{
                userId
            },
            orderBy:{
                createdAt:"desc"
            }
        })

    };
    async markAsRead(notificationId:number){
        return await prisma.notification.update({
            where:{
                id:notificationId
            },
            data:{
                isRead:true
            }
        })
    };
    async markAllAsRead(userId:number){
        return await prisma.notification.updateMany({
            where:{
                userId,
                isRead:false
            },
            data:{
                isRead:true
            }
        })
    }
}
          
