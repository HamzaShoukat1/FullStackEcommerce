"use client";

import { useAppSelector } from "@/app/hooks/usereduxhook";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  const cartCount = useAppSelector((state) => state.cart.totalQuantity);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      {cartCount > 0 && (
        <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium">

          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default ShoppingCartIcon;