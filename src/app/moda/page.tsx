"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import Toast from "@/components/Toast";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuth } from "firebase/auth";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ModaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"default" | "price-asc" | "price-desc">("default");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:4000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Ürünler alınamadı:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const aboveMin = minPrice === "" || p.price >= minPrice;
    const belowMax = maxPrice === "" || p.price <= maxPrice;
    return aboveMin && belowMax;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "price-asc") return a.price - b.price;
    if (sortOrder === "price-desc") return b.price - a.price;
    return 0;
  });

const [toastMsg, setToastMsg] = useState("");
const handleAddToCart = async (id: number) => {
  try {
    await addToCart(id);  // CartContext’ten gelen fonksiyon
    setToastMsg("Ürün sepete eklendi!");
  } catch (err: any) {
    // CartContext zaten "Giriş yapılmamış" fırlatıyor
    setToastMsg(err.message || "Bir hata oluştu");
  } finally {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }
};

const handleFavoriteClick = async (product: Product) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("Önce giriş yapmalısınız!");
    return;
  }

  const uid = user.uid;

  try {
    const res = await fetch("http://localhost:4000/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: uid,
        productId: product.id,
      }),
    });

    if (!res.ok) throw new Error("Favori eklenemedi");

    const data = await res.json();
    console.log("Favori kaydedildi:", data);

    // frontend context'i de güncelle
    toggleFavorite(product.id);

  } catch (err) {
    console.error(err);
    alert("Favori eklenemedi.");
  }
};

  return (
    <>
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 py-10 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Moda</h1>

        {/* Filtre & Sıralama */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="Min ₺"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")}
              className="border rounded-md p-2 w-24"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max ₺"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")}
              className="border rounded-md p-2 w-24"
            />
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
            className="border rounded-md p-2 w-48"
          >
            <option value="default">Varsayılan</option>
            <option value="price-asc">Fiyat: Artan</option>
            <option value="price-desc">Fiyat: Azalan</option>
          </select>
        </div>

        {/* Ürün Grid */}
        {loading ? (
          <p className="text-gray-600">Yükleniyor…</p>
        ) : sorted.length === 0 ? (
          <p className="text-gray-600">Seçili aralıkta ürün bulunamadı.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sorted.map((product) => {
              const isFav = favorites.some((f) => f.product && f.product.id === product.id);
              return (
                <div
                  key={product.id}
                  className="relative bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
                >
                  {/* Favori ikonu */}
                  <button
                    onClick={() => handleFavoriteClick(product)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 transition"
                    aria-label="Favorilere ekle"
                  >
                    {isFav ? (
                      <HeartSolid className="w-6 h-6 text-pink-500" />
                    ) : (
                      <HeartOutline className="w-6 h-6" />
                    )}
                  </button>

                  <Link href={`/moda/${product.id}`} className="flex flex-col flex-1">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-pink-600 font-bold mt-2">₺{product.price}</p>

                  </Link>

                  <GradientButton onClick={() => handleAddToCart(product.id)} className="mt-4">
                    Sepete Ekle
                  </GradientButton>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      <Toast message="Ürün sepete eklendi!" show={toastVisible} />
      <Toast message={toastMsg} show={toastVisible} />
    </>
  );
}

