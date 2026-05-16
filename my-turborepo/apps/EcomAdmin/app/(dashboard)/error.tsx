// app/dashboard/error.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WifiOff, RotateCcw } from "lucide-react";

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [isBrowserOffline, setIsBrowserOffline] = useState(false);

    useEffect(() => {
        // 1. Log telemetry to terminal/console
        console.error("Dashboard system crash captured:", error);

        // 2. Check if user's browser device has lost internet completely
        if (typeof window !== "undefined" && !navigator.onLine) {
            setIsBrowserOffline(true);
        }
    }, [error]);

    const handleResetAndRefresh = () => {
        // 1. Recover standard Next.js reactive framework render trees
        reset();

        // 2. Wipe memory cache and force fresh data from origin server
        window.location.reload();
    };

    return (
        <div className="p-6 max-w-xl mx-auto my-12 flex flex-col items-center justify-center text-center border rounded-lg bg-background shadow-sm space-y-4">
            {/* Visual Indicator Icon */}
            <div className="p-3 bg-destructive/10 text-destructive rounded-full">
                <WifiOff className="h-8 w-8" />
            </div>

            {/* Error Message Header & Content */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight">
                    {isBrowserOffline ? "Network Disconnected" : "Connection Timeout"}
                </h2>
                <p className="text-muted-foreground text-sm max-w-sm">
                    {isBrowserOffline
                        ? "Your device appears to be offline. Check your internet connection and reload."
                        : "The server took too long to respond. Please refresh the page to try again."
                    }
                </p>
            </div>

            {/* Interactive Recovery Action Button */}
            <div className="flex gap-4 pt-2">
                <Button
                    variant="default"
                    onClick={handleResetAndRefresh}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <RotateCcw className="h-4 w-4 cursor-pointer" />
                    Refresh Page
                </Button>
            </div>
        </div>
    );
}
