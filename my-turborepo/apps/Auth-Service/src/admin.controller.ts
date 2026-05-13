import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { IsAuthenticatedGuard, RolesGuard, Roles } from "@repo/shared";
import { AdminService } from "./admin.service";


@Controller('admin')

export class AdminController {
    constructor(@Inject(AdminService) private readonly adminService: AdminService) { }

    @UseGuards(IsAuthenticatedGuard, RolesGuard)
    @Roles("ADMIN")
    @Get('all-users')
    async getAllUsers() {
        return this.adminService.getAllUsers();
    }

}