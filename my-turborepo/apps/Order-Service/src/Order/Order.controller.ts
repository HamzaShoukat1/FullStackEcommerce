import { Controller, Get, Inject, Query, UseGuards } from "@nestjs/common";
import type { AuthRequest, OrderChartType } from "@repo/shared";
import { IsAuthenticatedGuard, Roles, RolesGuard } from "@repo/shared";
import { OrderService } from "./Order.service.js";
import type { Order } from "@repo/db";
@Controller('')
export class OrderController {
    constructor(@Inject(OrderService) private readonly orderService: OrderService) { }

    @UseGuards(IsAuthenticatedGuard, RolesGuard)
    @Roles("USER")
    @Get('user-order')
    async getUserOrders(req: AuthRequest): Promise<Order[]> {
        const userId = req.user.sub;
        const orders = await this.orderService.getUserOrders(userId);
        return orders;

    }

    //for admin see orders
    @UseGuards(IsAuthenticatedGuard, RolesGuard)
    @Roles("ADMIN")
    @Get('all-orders')
    async getAllOrders(@Query('limit') limit?: number): Promise<Pick<Order, "id" | "email" | "amount" | "status" | "createdAt">[]> {
        const allOrders = await this.orderService.getAllOrders(limit);

        return allOrders;

    };

    @UseGuards(IsAuthenticatedGuard, RolesGuard)
    @Roles("ADMIN")
    @Get('chart-data')
    async getOrderChartData(): Promise<OrderChartType[]> {
        return this.orderService.orderChartData();
    }

}