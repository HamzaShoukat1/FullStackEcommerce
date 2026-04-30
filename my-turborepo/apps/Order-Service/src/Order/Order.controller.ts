import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import type { AuthRequest } from "@repo/shared";
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
    async getAllOrders(): Promise<Order[]> {
        const allOrders = await this.orderService.getAllOrders()
        return allOrders;

    }


}