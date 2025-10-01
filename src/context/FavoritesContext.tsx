"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export type FavoriteWithProduct = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string | null;
  };
};

type FavoritesCtx = {
  favorites: FavoriteWithProduct[];
  toggleFavorite: (productId: number) => Promise<void>;
};

const BACKEND_URL = "http://localhost:4000";

const FavoritesContext = createContext<FavoritesCtx | null>(null);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteWithProduct[]>([]);
  const [uid, setUid] = useState<string | null>(null);

  // ✅ Kullanıcıyı dinle
  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUid(u?.uid ?? null);
      if (u) fetchFavorites(u.uid);
      else setFavorites([]);
    });
  }, []);

  const fetchFavorites = async (userId: string) => {
    const res = await fetch(`${BACKEND_URL}/api/favorites?userId=${userId}`);
    const data: FavoriteWithProduct[] = await res.json();
    setFavorites(data);
  };

  const toggleFavorite = async (productId: number) => {
    if (!uid) {
      alert("Lütfen önce giriş yapın");
      return;
    }

    // Favori varsa sil
    const exists = favorites.find((f) => f.product && f.product.id === productId);
    if (exists) {
      await fetch(`${BACKEND_URL}/api/favorites/${exists.id}`, { method: "DELETE" });
      setFavorites((prev) => prev.filter((f) => f.id !== exists.id));
      return;
    }

    // Yoksa ekle
    const res = await fetch(`${BACKEND_URL}/api/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, productId }),
    });
    const created: FavoriteWithProduct = await res.json();
    setFavorites((prev) => [...prev, created]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be inside FavoritesProvider");
  return ctx;
};
