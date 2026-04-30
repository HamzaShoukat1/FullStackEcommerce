// payment.controller.ts
import { Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import stripe from '../utils/stripe.service';
@Controller('payments')
export class PaymentController {


    @Post('create-product')
    async createStripeProduct(): Promise<any> {
        const res = await stripe.products.create({
            name: 'test product',
            default_price_data: {
                currency: 'usd',
                unit_amount: 1000,
            },
        });

        return res
    }

    @Get('create-product-price')
    async stripeProductPrice(): Promise<any> {
        const res = await stripe.prices.list({
            product: 'prod_UQmI0Wc3tQInj9',
        });

        return res.data;
    }
}