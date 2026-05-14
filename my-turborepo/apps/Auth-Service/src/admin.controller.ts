import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, Inject, UseGuards, Patch } from "@nestjs/common";
import { IsAuthenticatedGuard, RolesGuard, Roles } from "@repo/shared";
import { AdminService } from "./admin.service";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";


@Controller('admin')

export class AdminController {
    constructor(@Inject(AdminService) private readonly adminService: AdminService) { }

    @UseGuards(IsAuthenticatedGuard, RolesGuard)
    @Roles("ADMIN")
    @Get('all-users')
    async getAllUsers() {
        return this.adminService.getAllUsers();
    }

    @UseGuards(IsAuthenticatedGuard, RolesGuard)
    @Roles("ADMIN")
    @Post('create-user')
    async createUser(@Body() dto: CreateUserDto) {
        return this.adminService.createUser(dto);
    }

    @UseGuards(IsAuthenticatedGuard, RolesGuard)
    @Roles("ADMIN")
    @Patch('user/:id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return this.adminService.updateUser(id, dto);
    }

    @UseGuards(IsAuthenticatedGuard, RolesGuard)
    @Roles("ADMIN")
    @Delete('user/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.adminService.deleteUser(id);
    };

    @UseGuards(IsAuthenticatedGuard, RolesGuard)
    @Roles("ADMIN")
    @Get('user/:id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.adminService.getUserById(id);
    }

}