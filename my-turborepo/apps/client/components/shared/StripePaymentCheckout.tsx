"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";

import useCurrentUser from "@/app/hooks/usecurrentUser";
import { createpaymentSession } from "@/services/payment.service";

import type { shippingformInputs } from "@repo/shared";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY! || "pk_test_51TRrrWBabLRZsefiIvpPVUiNMVpXTKCnRtFNShecQZG7uHnExNRt68tnYNRnsk2zFKYJpsDySls1u6F8oiuIanwx00o9zH5Qgo"
);

type CartItem = {
    id: number;
    name: string;
    price: number | string;
    quantity: number;
};

export default function StripeCheckoutForm({
    shippingForm,
}: {
    shippingForm: shippingformInputs;
}) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const initializedRef = useRef(false);

    const { user, loading } = useCurrentUser();

    const {
        mutateAsync: createSession,
        isPending,
        error,
    } = useMutation({
        mutationFn: createpaymentSession,
    });

    /**
     * Memoized cart retrieval
     */
    const cartItems = useMemo<CartItem[]>(() => {
        try {
            const cartData = localStorage.getItem("cart");

            if (!cartData) return [];

            const parsed = JSON.parse(cartData);

            return Array.isArray(parsed)
                ? parsed
                : parsed.cartItems || [];
        } catch (error) {
            console.error("Cart parse error:", error);
            return [];
        }
    }, []);

    useEffect(() => {
        /**
         * Prevent:
         * - multiple Stripe sessions
         * - rerender loops
         * - abandoned sessions
         */
        if (initializedRef.current) return;

        const initializeCheckout = async () => {
            try {
                if (loading || !user) return;

                if (!cartItems.length) {
                    throw new Error("Cart is empty");
                }

                initializedRef.current = true;

                const items = cartItems.map((item) => ({
                    productId: item.id,
                    name: item.name,
                    price: Number(item.price),
                    quantity: item.quantity,
                }));

                console.log("🛒 Creating Stripe session:", items);

                const response = await createSession({ items });

                const secret = response?.data?.client_secret;

                if (!secret) {
                    throw new Error("Stripe client secret missing");
                }

                console.log("✅ Stripe session initialized");

                setClientSecret(secret);
            } catch (error) {
                initializedRef.current = false;

                console.error(
                    "❌ Checkout initialization failed:",
                    error
                );
            }
        };

        initializeCheckout();
    }, [loading, user, cartItems, createSession]);

    /**
     * Loading States
     */
    if (loading) {
        return (
            <div className="p-4">
                Loading user...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-4 text-red-500">
                Please sign in to continue checkout
            </div>
        );
    }

    if (isPending && !clientSecret) {
        return (
            <div className="p-4">
                Preparing secure checkout...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500">
                {error instanceof Error
                    ? error.message
                    : "Checkout failed"}
            </div>
        );
    }

    return (
        <div className="w-full">
            {clientSecret ? (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{
                        clientSecret,
                    }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            ) : (
                <div className="p-4">
                    Initializing payment...
                </div>
            )}
        </div>
    );
}