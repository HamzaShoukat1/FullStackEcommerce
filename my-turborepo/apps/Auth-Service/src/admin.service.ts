import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { prisma } from "@repo/db";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import * as bcrypt from 'bcryptjs';



@Injectable()


export class AdminService {
    constructor() { }

    async getAllUsers() {
        const user = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                createdAt: true
            }
        })
        return user;
    };
    
    async createUser(dto: CreateUserDto) {
        const existing = await prisma.user.findUnique({ where: { email: dto.email } });
        if (existing) throw new BadRequestException('User already exists');
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                // address: dto.address, // Uncomment if address is in schema
            },
        });
        return user;
    }

    async updateUser(id: number, dto: UpdateUserDto) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        let passwordHash = undefined;
        if (dto.password) passwordHash = await bcrypt.hash(dto.password, 10);
        const updated = await prisma.user.update({
            where: { id },
            data: {
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                // address: dto.address, // Uncomment if address is in schema
                ...(passwordHash ? { passwordHash } : {}),
            },
        });
        return updated;
    }

    async deleteUser(id: number) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        await prisma.user.delete({ where: { id } });
        return { message: 'User deleted successfully' };
    };

    async getUserById(id: number) {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                createdAt: true
            }
        });
        console.log("Fetched user by ID:", user);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}