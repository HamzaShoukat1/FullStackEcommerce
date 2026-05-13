import {  Injectable } from "@nestjs/common";
import { prisma } from "@repo/db";



@Injectable()


export class AdminService {
    constructor() { }

    async getAllUsers() {
        const user = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                createdAt: true
            }
        })
        return user;
    };
    
}