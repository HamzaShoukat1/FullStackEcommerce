import "dotenv/config";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { getAccessTokenSecret, getJwtAccessExpires } from "@repo/shared";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";

if (!getAccessTokenSecret() || !getJwtAccessExpires()) {
    throw new Error("JWT configuration is missing. Please set the access token secret and expiration in the environment variables.");
}
@Module({
    imports: [
        JwtModule.register({
            secret: getAccessTokenSecret(),
            signOptions: { expiresIn: getJwtAccessExpires() as any },
        })
    ],
    providers: [AuthService, AdminService],
    controllers: [AuthController, AdminController],
    // exports: [AuthService, JwtModule],
})
export class AuthModule { }