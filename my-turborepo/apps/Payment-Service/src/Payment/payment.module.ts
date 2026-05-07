import { Module } from "@nestjs/common";
import { PaymentController } from "./Payment.controller";
import { PaymentService } from "./payment.service";
import { JwtModule } from "@nestjs/jwt";
import { getAccessTokenSecret, getJwtAccessExpires, IsAuthenticatedGuard} from "@repo/shared";
@Module({
       imports: [
        JwtModule.register({
            secret: getAccessTokenSecret(),
            signOptions: { expiresIn: getJwtAccessExpires() as any },
        })
    ],
    controllers: [PaymentController],
    providers: [PaymentService,IsAuthenticatedGuard,]
    
})
export class PaymentModule { }