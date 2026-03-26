"use client";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Bell, Home } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";
import ClientOnly from "@/app/hooks/onlyClient";
export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between border-b border-t-gray-200 pb-4">
            {/* //left  */}
            <Link href={"/"} className="flex items-center">
                <Image src="/logo.png" alt="Ecommerce" width={36} height={36} className="w-6 h-6 md:w-9 md:h-9" />
                <p className=" hidden md:block text-md  font-medium tracking-wider">Ecommerce</p>
            </Link>

            {/* //right  */}
            <div className="flex items-center gap-5">
                <SearchBar />
                <Link href={"/"}>
                    <Home  className="w-4 h-4 text-gray-600"/>
                </Link>
                <Bell  className="w-4 h-4 text-gray-600 cursor-pointer"/>
                <ClientOnly>

                <ShoppingCartIcon />
                </ClientOnly>
                <Link href={"/login"}>
                Sign in
                </Link>

            </div>


        </nav>

    )
}
