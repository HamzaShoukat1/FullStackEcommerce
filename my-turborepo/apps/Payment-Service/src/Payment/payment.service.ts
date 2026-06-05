import "dotenv/config";
import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { prisma } from "@repo/db";
import stripe from "../utils/stripe.service";
import { StripeSessionResponseDto } from "../dto";
import { Stripe } from "stripe";
import { ClientProxy } from "@repo/rabbitmq-service/rabbitmq.constants";
import { firstValueFrom } from "rxjs";

@Injectable()
export class PaymentService {
    constructor(
        @Inject("PAYMENT_PUBLISHER")
        private readonly client: ClientProxy
    ) { }

    async createCheckoutSession(data: {
        userId: number;
        email: string;
        items?: Array<{ name: string; price: number; quantity: number }>;
    }) {
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

        const lineItems = items.map(item => ({
            price_data: {
                currency: "usd",
                unit_amount: Math.round(Number(item.price) * 100),
                product_data: {
                    name: item.name,
                },
            },
            quantity: item.quantity,
        }));

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

        return {
            client_secret: session.client_secret,
        };
    }

    async getCurrentSession(sessionId: string): Promise<StripeSessionResponseDto> {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items"],
        });

        if (!session) {
            throw new NotFoundException("Session not found");
        }

        return {
            status: session.payment_status || "unknown",
            amount_total: session.amount_total || 0,
            customer_email: session.customer_email || "unknown",
            items: session.line_items?.data.map((item) => ({
                name: item.description || "unknown",
                price: item.price?.unit_amount || 0,
                quantity: item.quantity || 0,
            })) || [],
            id: session.id,
        };
    }

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
                `Webhook Signature verification failed: ${error instanceof Error ? error.message : String(error)}`
            );
        }

        if (event.type === 'checkout.session.completed') {
            await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        }

        return { received: true };
    }

    private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
        const userId = Number.parseInt(session.metadata?.userId as string, 10);
        if (!userId || Number.isNaN(userId)) {
            throw new Error('Missing or invalid userId in session metadata');
        }

        const amount = session.amount_total ? session.amount_total / 100 : 0;
        let metaDataItems: any[] = [];
        
        try {
            metaDataItems = session.metadata?.items ? JSON.parse(session.metadata.items) : [];
            if (!Array.isArray(metaDataItems) || metaDataItems.length === 0) {
                throw new Error('No items found in session metadata');
            }
        } catch {
            throw new Error('Failed to parse items from session metadata');
        }

        const shippingAddress = session.customer_details?.address ? JSON.parse(JSON.stringify(session.customer_details.address)) : {};

        await firstValueFrom(
            this.client.emit("payment.completed", {
                userId,
                email: session.customer_details?.email || session.customer_email || "unknown",
                amount,
                status: "SUCCESS",
                shippingAddress,
                items: metaDataItems.map((item: any) => ({
                    productId: item.productId,
                    quantity: item.quantity || 1,
                    price: typeof item.price === 'number' ? item.price : 0,
                })),
            })
        );

        return { received: true };
    }
}
