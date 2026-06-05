import { Inject, Injectable } from '@nestjs/common';
import { prisma, type Order } from '@repo/db';
import { startOfMonth, subMonths, format } from 'date-fns';
import { OrderChartType, CreateOrder } from "@repo/shared"
import { ClientProxy } from "@repo/rabbitmq-service"
import { firstValueFrom } from 'rxjs';
@Injectable()
export class OrderService {
    constructor(
        @Inject("ORDER_PUBLISHER")
        private readonly client: ClientProxy
    ) { }
    async getUserOrders(userId: number): Promise<Order[]> {
        const orders = await prisma.order.findMany({
            where: {
                userId,

            }
        });
        return orders;
    }

    async getAllOrders(limit?: number): Promise<Pick<Order, "id" | "email" | "amount" | "status" | "createdAt">[]> {

        return await prisma.order.findMany({
            take: limit,
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                email: true,
                amount: true,
                status: true,
                createdAt: true
            }

        })

    };
    async orderChartData(): Promise<OrderChartType[]> {
        const now = new Date();
        const sixMonthsAgo = startOfMonth(subMonths(now, 5))
        //   { month: "January", total: 186, successful: 80 },

        const rawData = await prisma.order.groupBy({
            by: ['createdAt', 'status'],
            where: {
                createdAt: {
                    gte: sixMonthsAgo,
                    lte: now,

                }
            },
            _count: {
                _all: true
            }
        });


        const aggMap: Record<string, { total: number, successful: number }> = {};
        rawData.forEach((item) => {
            const yearsMonthKey = format(item.createdAt, 'yyyy-MM');

            if (!aggMap[yearsMonthKey]) {
                aggMap[yearsMonthKey] = { total: 0, successful: 0 }
            };
            const count = item._count._all
            aggMap[yearsMonthKey].total += count;

            if (item.status === 'SUCCESS') {
                aggMap[yearsMonthKey].successful += count;
            }
        });


        const results: OrderChartType[] = []


        for (let i = 5; i >= 0; i--) {
            const currentMonthDate = subMonths(now, i);
            const searchKey = format(currentMonthDate, 'yyyy-MM');
            const monthDisplayName = format(currentMonthDate, 'MMMM');


            const matchData = aggMap[searchKey]

            results.push({
                month: monthDisplayName,
                total: matchData?.total ?? 0,
                successful: matchData?.successful ?? 0,
            })

        }

        return results


    };
    async createOrder(data: CreateOrder[]): Promise<Order> {
        try {
            
            const order = await prisma.order.create({
                data: {
                    userId: parseInt(data[0]?.userId as unknown as string),
                    email: data[0]?.email as string,
                    amount: data[0]?.amount as number,
                    shippingAddress: data[0]?.shippingAddress,
                    status: "SUCCESS",
                    products: {
                        create: data[0]?.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                },
                select: {
                    id: true,
                    userId: true,
                    email: true,
                    amount: true,
                    shippingAddress: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,

                }

            });
            

            await firstValueFrom(
                this.client.emit("order.created", {
                    orderId: order.id,
                    userId: order.userId,
                    email: order.email,
                    items: data[0]?.items
                })
            )
            

            return order
        } catch (error) {
            throw error;
        }

    }



}
