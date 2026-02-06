"use client";

import Link from "next/link";
import { useCart } from "../app/context/CartContext";

export function CartLink() {
  const { cart } = useCart();

  return (
    <Link href="/cart" className="relative flex items-center gap-1">
      🛒
      <span>Cart</span>

      {cart.length > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {cart.length}
        </span>
      )}
    </Link>
  );
}
