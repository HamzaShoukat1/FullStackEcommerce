import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { getAccessTokenSecret } from "@repo/shared";


@Injectable()
@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3010'],
        methods: ['GET', 'POST', 'OPTIONS'],
        credentials: true,
        allowEIO3: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    },
})

export class NotificationsGateway implements OnGatewayConnection {
    @WebSocketServer()
    server!: Server
    constructor(private readonly jwtService: JwtService) { }


    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth?.token

            if (!token) {
                client.disconnect();
                return
            };

            const payload = await this.jwtService.verifyAsync(token, {
                secret: getAccessTokenSecret()
            });

            if (!payload) {
                client.disconnect();
                return
            };
            const userId = payload.sub
            client.join(`user_${userId}`)
            console.log(`user connected to room user ${client.id} and userId ${userId}`)

        } catch (error) {
            client.disconnect();
        }

    };

    sendOrderNotification(userId: number, notification: any) {
        this.server.to(`user_${userId}`).emit('order_created', notification)

    };

}