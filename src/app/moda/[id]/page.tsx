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
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  stock?: number;
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
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

        const resAll = await fetch("http://localhost:4000/api/products");
        const all: Product[] = await resAll.json();
        const filtered = all.filter((p) => p.id !== data.id).slice(0, 4);
        setRelated(filtered);
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
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
        {/* Ürün Görsel + Detay */}
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-pink-600 text-3xl font-semibold">
              ₺{product.price.toLocaleString("tr-TR")}
            </p>

            {product.description && (
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            )}

            <p className="text-sm text-gray-500">
              {product.stock && product.stock > 0
                ? `Stokta ${product.stock} adet • 1-3 iş günü kargo`
                : "Stokta yok"}
            </p>

            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Materyal: %100 Pamuk</li>
              <li>Üretim Yeri: Türkiye</li>
              <li>Renk: Siyah</li>
              <li>Yıkama: 30° hassas yıkama</li>
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                –
              </button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <GradientButton
                onClick={handleAddToCart}
                className="px-8 py-3 text-lg"
              >
                Sepete Ekle
              </GradientButton>

              <button
                onClick={() => toggleFavorite(product.id)}
                aria-label="Favorilere ekle"
                className="p-3 border rounded-full hover:bg-gray-100 transition"
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


        {/* Kargo & İade Bilgileri */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-3">Kargo & İade Bilgileri</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Standart teslimat: 1–3 iş günü</li>
            <li>Ücretsiz kargo: ₺500 üzeri siparişlerde</li>
            <li>İade süresi: 14 gün koşulsuz iade</li>
            <li>İade masrafları: Ürün kullanılmamış olmalı</li>
          </ul>
        </section>

        {/* İlgini Çekebilecek Ürünler */}
        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">İlgini Çekebilecek Ürünler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((item) => {
                const isFavRelated = favorites.some((f) => f.product.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="relative bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
                  >
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 transition"
                    >
                      {isFavRelated ? (
                        <HeartSolid className="w-6 h-6 text-pink-500" />
                      ) : (
                        <HeartOutline className="w-6 h-6" />
                      )}
                    </button>

                    <Link href={`/moda/${item.id}`} className="flex flex-col flex-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-48 w-full object-cover rounded-md mb-4"
                      />
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-pink-600 font-bold mt-2">
                        ₺{item.price.toLocaleString("tr-TR")}
                      </p>
                    </Link>

                    <GradientButton
                      onClick={() => addToCart(item.id)}
                      className="mt-4"
                    >
                      Sepete Ekle
                    </GradientButton>
                  </div>
                );
              })}
            </div>
          </section>
        )}

                {/* Yorumlar */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Kullanıcı Yorumları</h2>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <p className="font-semibold">Ayşe K.</p>
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-gray-700 mt-2">
                Ürün tam bedenime uydu, kumaşı çok kaliteli. Kargo hızlıydı.
              </p>
            </div>
            <div className="border-b pb-4">
              <p className="font-semibold">Mehmet D.</p>
              <p className="text-yellow-500">★★★★☆</p>
              <p className="text-gray-700 mt-2">
                Ürün güzel ama paketleme biraz basitti.
              </p>
            </div>
            <div>
              <p className="font-semibold">Zeynep Y.</p>
              <p className="text-yellow-500">★★★★★</p>
              <p className="text-gray-700 mt-2">
                Bayıldım, fotoğraftan daha güzel duruyor.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <Toast message="Ürün sepete eklendi!" show={toastVisible} />
    </>
  );
}
