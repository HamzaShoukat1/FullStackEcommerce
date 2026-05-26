"use client";

import { useEffect, useState } from "react";
import SigninDialog from "./SigninDialog";

export default function SessionExpiredListener() {
    const [open, setOpen] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const handler = () => setOpen(true);

        window.addEventListener("auth:session-expired", handler);

        return () => window.removeEventListener("auth:session-expired", handler);
    }, []);

    const handleOpenSignin = () => {
        setOpen(false);
        setShowDialog(true);
    };

    return (
        <>
            {/* 1. Show the expiration notice ONLY when open is true */}
            {open && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
                        <h2 className="text-lg font-semibold text-gray-900">Session expired</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Please sign in again to continue
                        </p>

                        <button
                            className="mt-4 w-full bg-black text-white py-2 cursor-pointer rounded font-medium hover:bg-neutral-800 transition"
                            onClick={handleOpenSignin}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            )}

            {/* 2. Left outside so it works perfectly even when 'open' is false */}
            <SigninDialog open={showDialog} setOpen={setShowDialog} />
        </>
    );
}
