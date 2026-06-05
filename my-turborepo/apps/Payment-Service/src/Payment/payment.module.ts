import { Module } from "@nestjs/common";
import { PaymentController } from "./Payment.controller";
import { PaymentService } from "./payment.service";
import { JwtModule } from "@nestjs/jwt";
import { getAccessTokenSecret, getJwtAccessExpires, IsAuthenticatedGuard } from "@repo/shared";
import { ClientsModule, Transport } from "@repo/rabbitmq-service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name:"PAYMENT_PUBLISHER",
                transport:Transport.RMQ,
                options:{
                    urls:[process.env.RABBITMQ_URL || "amqps://aigxmdvw:LRq8AnXoyWSCnAT0bxYQxNLa--dVZzUc@yak.lmq.cloudamqp.com/aigxmdvw"],
                    queue:"payment_queue",
                    queueOptions:{
                        durable:true
                    }
                }
            }
        ]),

        JwtModule.register({
            secret: getAccessTokenSecret(),
            signOptions: { expiresIn: getJwtAccessExpires() as any },
        })
    ],
    controllers: [PaymentController,],
    providers: [PaymentService, IsAuthenticatedGuard,]

})
export class PaymentModule { }