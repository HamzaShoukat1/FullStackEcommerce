"use client";
import "dotenv/config"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { shippingformInputs } from "@repo/shared";
import { useMutation } from "@tanstack/react-query";
import useCurrentUser from "@/app/hooks/usecurrentUser";
import { createpaymentSession } from "@/services/payment.service";
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ||
    "pk_test_51TRrrWBabLRZsefiIvpPVUiNMVpXTKCnRtFNShecQZG7uHnExNRt68tnYNRnsk2zFKYJpsDySls1u6F8oiuIanwx00o9zH5Qgo"
);

export default function StripeCheckoutForm({
    shippingForm,
}: {
    shippingForm: shippingformInputs;
}) {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const { user, loading } = useCurrentUser();

    // ✅ use mutateAsync instead of mutate
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: createpaymentSession,
    });

    useEffect(() => {
        const initializeCheckout = async () => {
            try {
                if (loading || !user) return;

                const cartState = retrieveCart();

                if (!cartState.length) {
                    throw new Error("Your cart is empty");
                }

                const items = cartState.map((item: any) => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                }));

                // ✅ correct async call
                const response = await mutateAsync({items});

                if (!response?.data.client_secret) {
                    throw new Error("Failed to create checkout session");
                }

                setClientSecret(response.data.client_secret);
            } catch (err) {
                console.error("Checkout initialization error:", err);
            }
        };

        initializeCheckout();
    }, [user, loading, shippingForm]); // ✅ fixed deps

    // Helper
    const retrieveCart = (): any[] => {
        try {
            const cartData = localStorage.getItem("cart");
            if (!cartData) return [];

            const parsed = JSON.parse(cartData);
            return Array.isArray(parsed) ? parsed : parsed.cartItems || [];
        } catch {
            return [];
        }
    };

    // UI States
    if (loading) return <div className="p-4">Loading user...</div>;

    if (!user)
        return <div className="p-4 text-red-600">Please sign in to checkout</div>;

    if (isPending)
        return <div className="p-4">Preparing checkout...</div>;

    if (error)
        return (
            <div className="p-4 text-red-600">
                {error instanceof Error ? error.message : "Something went wrong"}
            </div>
        );

    return (
        <div className="w-full">
            {clientSecret ? (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            ) : (
                <div className="p-4">Initializing checkout...</div>
            )}
        </div>
    );
}