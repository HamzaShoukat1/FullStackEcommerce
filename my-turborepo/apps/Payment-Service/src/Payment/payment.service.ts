import "dotenv/config";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { prisma } from "@repo/db";
// Ensure this path is correct and doesn't use .js if you're in a TS environment
import stripe from "../utils/stripe.service";
import { StripeSessionResponseDto } from "../dto";
import { Stripe } from "stripe";

@Injectable()
export class PaymentService { // Fixed: Removed ()

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
            customer_email: data.email,
            line_items: lineItems,
            return_url: `${process.env.FRONTEND_URL}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        return {
            client_secret: session.client_secret,
        };
    };

    async getcurrentSession(session_id: string): Promise<StripeSessionResponseDto> {
        const session = await stripe.checkout.sessions.retrieve(session_id,{
            expand: ["line_items"],
        });
        if (!session) {
            throw new NotFoundException("Session not found");
        }


        return {
            status: session?.payment_status || "unknown",
            amount_total: session?.amount_total || 0,
            customer_email: session?.customer_email || "unknown",
            items:session.line_items?.data.map((item)=> ({
                name:item.description || "unknown",
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
      throw new BadRequestException(`Webhook Signature verification failed:`,error instanceof Error ? error.message : String(error));
    }

    // Handle specific business logic based on event type
    switch (event.type) {
      case 'checkout.session.completed':
        const session =  await  this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);

        console.log("webhook completed",session)

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

    // TODO: Create order in database
    // TODO: Send confirmation email
    console.log("Line Items retrieved:", lineItems.data.length);


  }


}