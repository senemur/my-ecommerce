"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import GradientButton from "@/components/GradientButton";

const products = [
  {
    id: 1,
    name: "Oversize T-Shirt",
    price: 349.9,
    image: "/tshirt.jpg",
  },
  {
    id: 2,
    name: "Yüksek Bel Jean",
    price: 799.0,
    image: "/tshirt.jpg",
  },
  {
    id: 3,
    name: "Sneaker Ayakkabı",
    price: 1299.0,
    image: "/tshirt.jpg",
  },
  {
    id: 4,
    name: "Deri Omuz Çantası",
    price: 699.0,
    image: "/tshirt.jpg",
  },
    {
    id: 5,
    name: "Bisiklet Yaka Sweatshirt",
    price: 899.0,
    image: "/tshirt.jpg",
  },
    {
    id: 6,
    name: "Dokum Elbise",
    price: 599.0,
    image: "/tshirt.jpg",
  },
    {
    id: 7,
    name: "Mom High Jean",
    price: 699.0,
    image: "/tshirt.jpg",
  },
    {
    id: 8,
    name: "Uzun Kollu Gömlek",
    price: 499.0,
    image: "/tshirt.jpg",
  },
];

export default function ModaPage() {
  const [sortOrder, setSortOrder] = useState<"default" | "price-asc" | "price-desc">("default");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  // 🔎 Fiyat filtresi
  const filtered = products.filter((p) => {
    const aboveMin = minPrice === "" || p.price >= minPrice;
    const belowMax = maxPrice === "" || p.price <= maxPrice;
    return aboveMin && belowMax;
  });

  // 🔢 Sıralama
  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "price-asc") return a.price - b.price;
    if (sortOrder === "price-desc") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6">Moda</h1>

        {/* ---- Filtre & Sıralama Kontrolleri ---- */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          {/* Fiyat aralığı */}
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

          {/* Sıralama */}
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

        {/* ---- Ürün Grid ---- */}
        {sorted.length === 0 ? (
          <p className="text-gray-600">Seçili aralıkta ürün bulunamadı.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sorted.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-pink-600 font-bold mt-2">₺{product.price}</p>
                <GradientButton onClick={() => console.log("Başka yerde!")} className="mt-4">
  Sepete Ekle
</GradientButton>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
