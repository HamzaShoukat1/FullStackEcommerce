import stripe from './stripe.service';

import { StripeProductTypes } from "@repo/shared";

export const createStripeProduct = async (item: StripeProductTypes): Promise<any> => {
    try {
        const res = await stripe.products.create({
            id: item.id,
            name: item.name,
            default_price_data: {
                currency: 'usd',
                unit_amount: item.price * 100, // Convert to cents
            },
        });

        return res

    } catch (error) {
        console.error('Error creating Stripe product:', error);

    }
}

export const getStripeProductPrice = async (productId: number): Promise<any> => {
    try {
        const res = await stripe.prices.list({
            product: "123"
        })
        return res.data[0]?.unit_amount ?? null


    } catch (error) {
        console.error('Error creating Stripe price:', error);

    }
}