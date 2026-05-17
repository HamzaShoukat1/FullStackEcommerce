import { Injectable } from '@nestjs/common';
import { prisma, type Order } from '@repo/db';
import { startOfMonth, subMonths, format } from 'date-fns';
import { OrderChartType } from "@repo/shared"

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

    async getAllOrders(limit?:number): Promise<Pick<Order, "id" | "email" | "amount" | "status" | "createdAt">[]> {

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


    }


}
