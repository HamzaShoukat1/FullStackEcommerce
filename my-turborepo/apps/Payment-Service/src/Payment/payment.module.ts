import { Module } from "@nestjs/common";
import { PaymentController } from "./Payment.controller";

@Module({
    controllers:[PaymentController]

})
export class  PaymentModule {}