"use client";

import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Bell, Home } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import ClientOnly from "@/app/hooks/onlyClient";
import { useState } from "react";
import SignupDialog from "../Dialogs/SignupDialog";
import SigninDialog from "../Dialogs/SigninDialog";
import usecurrentUser from "@/app/hooks/usecurrentUser";
import LogoutDialog from "../Dialogs/LogoutDialog";

export default function Navbar() {
    const [signupopen, setsignupopen] = useState(false);
    const [signinopen, setsigninopen] = useState(false);

    const { user, loading } = usecurrentUser();


    return (
        <>
            <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4 px-4">
                {/* LEFT */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Ecommerce"
                        width={36}
                        height={36}
                        className="w-6 h-6 md:w-9 md:h-9"
                    />
                    <p className="hidden md:block text-md font-medium tracking-wider">
                        Ecommerce
                    </p>
                </Link>

                {/* RIGHT */}
                <div className="flex items-center gap-5">
                    <SearchBar />

                    <Link href="/">
                        <Home className="w-4 h-4 text-gray-600" />
                    </Link>

                    <Bell className="w-4 h-4 text-gray-600 cursor-pointer" />

                    <ClientOnly>
                        <ShoppingCartIcon />
                    </ClientOnly>

                    {/* AUTH SECTION */}
                    <div className="flex items-center gap-3">
                        {loading ? (
                            <div className="w-20 h-9 bg-gray-200 rounded-lg animate-pulse" />
                        ) : user ? (
                            <LogoutDialog />
                        ) : (
                            <>
                                <button
                                    className="cursor-pointer px-3 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-lg transition-colors"
                                    onClick={() => setsigninopen(true)}
                                >
                                    Sign in
                                </button>

                                <button
                                    className="cursor-pointer px-3 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-lg transition-colors"
                                    onClick={() => setsignupopen(true)}
                                >
                                    Sign up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* DIALOGS */}
            <SigninDialog open={signinopen} setOpen={setsigninopen} />
            <SignupDialog open={signupopen} setOpen={setsignupopen} />
        </>
    );
}