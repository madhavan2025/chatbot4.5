"use client";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-xl font-semibold">Your Cart</h1>
        <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-xl font-semibold">Your Cart</h1>

      <ul className="space-y-4">
        {cart.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-20 w-28 rounded object-cover"
            />

            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
