"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import Toast from "@/components/Toast";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  stock?: number;       // backend’de varsa
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);

  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${id}`);
        if (!res.ok) throw new Error("Ürün bulunamadı");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Ürün alınamadı:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-20 text-center text-gray-600">
          Yükleniyor…
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-20 text-center text-gray-600">
          Ürün bulunamadı.
        </main>
        <Footer />
      </>
    );
  }

  const isFav = favorites.some((f) => f.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product.id);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Büyük ürün görseli */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full overflow-hidden rounded-xl ">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform"
              />
            </div>
            {/* İleride küçük thumb galerisi eklenebilir */}
          </div>

          {/* Sağ panel */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            <p className="text-pink-600 text-3xl font-semibold">
              ₺{product.price.toLocaleString("tr-TR")}
            </p>

            {product.description && (
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            )}

            <p className="text-sm text-gray-500">
              {product.stock && product.stock > 0
                ? `Stokta ${product.stock} adet var • 1-3 iş günü kargoda`
                : "Stokta yok"}
            </p>

            {/* Adet seçici */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 border rounded hover:bg-gray-50"
              >
                –
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 border rounded hover:bg-gray-50"
              >
                +
              </button>
            </div>

            {/* Sepete ekle & Favori */}
            <div className="flex items-center gap-4">
              <GradientButton
                onClick={handleAddToCart}
                className="px-8 py-3 text-lg"
              >
                Sepete Ekle
              </GradientButton>

              <button
                onClick={() => toggleFavorite(product.id)}
                aria-label="Favorilere ekle"
                className="p-3 border rounded-full hover:bg-gray-100"
              >
                {isFav ? (
                  <HeartSolid className="w-6 h-6 text-pink-500" />
                ) : (
                  <HeartOutline className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <Toast message="Ürün sepete eklendi!" show={toastVisible} />
    </>
  );
}
