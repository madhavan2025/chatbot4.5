"use client";

import { createContext, useContext, useState } from "react";

type Listing = {
  id: string;
  title: string;
  price: string;
  image: string;
};

type CartContextType = {
  cart: Listing[];
  addToCart: (item: Listing) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Listing[]>([]);

  const addToCart = (item: Listing) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
