import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { IsAuthenticatedGuard, RolesGuard } from "@repo/shared";
import { AuthController } from "./auth.controller";
import { getAccessTokenSecret, getJwtAccessExpires } from "@repo/shared";
@Module({
    imports:[
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: getAccessTokenSecret(),
                signOptions: { expiresIn: getJwtAccessExpires() as any },
            }),
        })
    ],
    providers:[AuthService, IsAuthenticatedGuard, RolesGuard],
    controllers:[AuthController]
})

export class AuthModule {}