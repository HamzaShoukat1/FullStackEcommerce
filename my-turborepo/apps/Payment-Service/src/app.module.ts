import { Module } from '@nestjs/common';
import { PaymentModule } from './Payment/payment.module';

@Module({
    imports: [PaymentModule]
})
export class AppModule { }
