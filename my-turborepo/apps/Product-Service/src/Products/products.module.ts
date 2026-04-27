import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ProductsService } from "./products.service.js";
import { ProductsController } from "./products.controller.js";
import { getJwtAccessExpires, IsAuthenticatedGuard, RolesGuard } from "@repo/shared";
import { getAccessTokenSecret } from "@repo/shared";


@Module({
    imports: [
        JwtModule.register({
            secret:getAccessTokenSecret(),
            signOptions: { expiresIn: getJwtAccessExpires() as any },
        }),
    ],
    providers:[ProductsService, IsAuthenticatedGuard, RolesGuard],
    controllers:[ProductsController]

})

export class ProductModule {}