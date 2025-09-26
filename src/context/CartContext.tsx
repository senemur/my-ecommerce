"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

interface CartContextType {
  items: CartItem[];
  refresh: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [uid, setUid] = useState<string | null>(null);

  // Firebase oturumunu dinle
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  const refresh = async () => {
    if (!uid) return; // giriş yapılmamışsa sepeti çağırma
    const res = await fetch(`http://localhost:4000/api/cart?userId=${encodeURIComponent(uid)}`);
    if (!res.ok) return;
    const data = await res.json();
    setItems(data);
  };

  const addToCart = async (productId: number) => {
    if (!uid) throw new Error("Giriş yapılmamış");
    await fetch("http://localhost:4000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, productId, quantity: 1 }),
    });
    await refresh();
  };

  const removeFromCart = async (cartItemId: number) => {
    if (!uid) return;
    await fetch(`http://localhost:4000/api/cart/${cartItemId}`, {
      method: "DELETE",
    });
    await refresh();
  };

  // UID değiştikçe sepeti güncelle
  useEffect(() => {
    if (uid) refresh();
  }, [uid]);

  return (
    <CartContext.Provider value={{ items, refresh, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
