"use client";

import { useFavorites } from "@/context/FavoritesContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FavorilerPage() {
  const { favorites } = useFavorites();

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Favoriler</h1>

        {favorites.length === 0 ? (
          <p>Henüz favoriniz yok.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((f) => (
              <div key={f.id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src={f.product.image ?? "/placeholder.jpg"}
                  alt={f.product.name}
                  className="h-56 w-full object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold">{f.product.name}</h3>
                <p className="text-pink-600 font-bold mt-1">
                  ₺{Number(f.product.price)}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
