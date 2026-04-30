import { Injectable } from '@nestjs/common';
import { prisma, type Order } from '@repo/db';

@Injectable()
export class OrderService {
    async getUserOrders(userId: number): Promise<Order[]> {
        const orders = await prisma.order.findMany({
            where: {
                userId,

            }
        });
        return orders;
    }

    async getAllOrders(): Promise<Order[]> {
        const allOrders = await prisma.order.findMany();
        return allOrders;

    }

}
