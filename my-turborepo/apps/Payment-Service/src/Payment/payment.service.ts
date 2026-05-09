import "dotenv/config";
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { prisma } from "@repo/db";
// Ensure this path is correct and doesn't use .js if you're in a TS environment
import stripe from "../utils/stripe.service";
import { StripeSessionResponseDto } from "../dto";
import { Stripe } from "stripe";

@Injectable()
export class PaymentService {

    async createCheckoutSession(data: {
        userId: number;
        email: string;
        items?: Array<{ name: string; price: number; quantity: number }>;
    }) {
        // Use items from request, or fetch from database if not provided
        let items = data.items;

        if (!items || items.length === 0) {
            const cartItems = await prisma.cartItem.findMany({
                where: { userId: data.userId },
                include: { product: true },
            });

            if (!cartItems || cartItems.length === 0) {
                throw new NotFoundException("Cart is empty");
            }

            items = cartItems.map(item => ({
                productId: item.product.id,
                name: item.product.name,
                price: Number(item.product.price),
                quantity: item.quantity,
            }));
        }

        // Map items for Stripe
        const lineItems = (items || []).map(item => ({
            price_data: {
                currency: "usd",
                unit_amount: Math.round(Number(item.price) * 100),
                product_data: {
                    name: item.name,
                },
            },
            quantity: item.quantity,
        }));

        // Create stripe session
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            ui_mode: "embedded_page",
            client_reference_id: String(data.userId),
            metadata: {
                userId: String(data.userId),
                items: JSON.stringify(items)
            },
            customer_email: data.email,
            line_items: lineItems,
            return_url: `${process.env.FRONTEND_URL}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        });


        Logger.log("seesssss", session)
        return {
            client_secret: session.client_secret,
        };
    };

    async getcurrentSession(session_id: string): Promise<StripeSessionResponseDto> {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items"],
        });
        if (!session) {
            throw new NotFoundException("Session not found");
        }


        return {
            status: session?.payment_status || "unknown",
            amount_total: session?.amount_total || 0,
            customer_email: session?.customer_email || "unknown",
            items: session.line_items?.data.map((item) => ({
                name: item.description || "unknown",
                price: item.price?.unit_amount || 0,
                quantity: item.quantity || 0,
            })) || [],
            id: session.id,
        }


    };


    async processWebhook(rawBody: Buffer, signature: string) {
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!endpointSecret) {
            throw new InternalServerErrorException('STRIPE_WEBHOOK_SECRET not configured');
        }

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
        } catch (error) {
            throw new BadRequestException(
                `Webhook Signature verification failed: ${error instanceof Error ? error.message : String(error)
                }`
            );
        }

        // Handle specific business logic based on event type
        switch (event.type) {
            case 'checkout.session.completed':
                const session = await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);

                console.log("webhook completed", session)

                console.log('Checkout session completed:', session);
                break;

            default:
                console.log('Unhandled event type:', event.type);
        }

        return { received: true };
    }

    private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
        console.log('✅ Processing completed session:', session.id);

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
            limit: 100,
        });

        const userId = parseInt(session.metadata?.userId as string)
        const amount = session.amount_total ? session.amount_total / 100 : 0; // Convert from cents to dollars

        const metaDataItems = session.metadata?.items ? JSON.parse(session.metadata.items) : [];

        try {
            const order = await prisma.order.create({
                data: {
                    userId: userId,
                    email: session.customer_details?.email || "unknown",
                    amount: amount,
                    status: "SUCCESS",
                    shippingAddress: session.shipping_address_collection as any,
                    products: {
                        create: metaDataItems.map((item: any) => ({
                            productId: item.productId,
                            quantity: item.quantity || 1,
                            price: (item.amount_total / 100),
                        })),
                    }


                }
            })

            console.log('✅ Order saved to DB:', order.id);

            await prisma.cartItem.deleteMany({
                where: {
                    userId
                }
            })

        } catch (error) {
            console.error('❌ Database error saving order:', error);


        }





    }


}