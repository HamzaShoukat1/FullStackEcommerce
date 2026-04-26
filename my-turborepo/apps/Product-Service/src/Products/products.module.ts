import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ProductsService } from "./products.service.js";
import { ProductsController } from "./products.controller.js";
import { IsAuthenticatedGuard, RolesGuard } from "@repo/shared";
import { ACCESS_SECRET } from "@repo/shared/cookiesOptions";


@Module({
    imports: [
        JwtModule.register({
            secret:ACCESS_SECRET
        }),
    ],
    providers:[ProductsService, IsAuthenticatedGuard, RolesGuard],
    controllers:[ProductsController]

})

export class ProductModule {}