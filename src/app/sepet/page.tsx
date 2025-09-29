"use client";

import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GradientButton from "@/components/GradientButton";
import ModaPage from "../moda/page";
import { useRouter } from "next/navigation";

function toNumber(val: any): number {
  if (val === null || val === undefined) return 0;
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    // "499.00" veya "499,00" gibi formatları destekle
    const cleaned = val.replace(",", ".").replace(/[^0-9.\-]/g, "");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  }
  // Eğer özel bir Decimal objesi gelirse (ör. toNumber metodu varsa)
  if (typeof val === "object" && typeof (val as any).toNumber === "function") {
    try {
      return (val as any).toNumber();
    } catch {
      return 0;
    }
  }
  return 0;
}

export default function SepetPage() {
  const { items, removeFromCart, addToCart, decreaseQuantity } = useCart();
  const router = useRouter();

  const total = items.reduce((s, it) => s + toNumber(it.product.price) * it.quantity, 0);

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Sepetim</h1>

        {items.length === 0 ? (
          <p className="text-gray-600">Sepetiniz şu anda boş.</p>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            <ul className="divide-y divide-gray-100">
              {items.map((it) => {
                const price = toNumber(it.product.price);
                return (
                  <li key={it.id} className="flex flex-col md:flex-row items-center md:items-start gap-4 py-4">
                    {/* Görsel */}
                    <div className="w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={it.product.image}
                        alt={it.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Bilgiler */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold">{it.product.name}</p>
                          <p className="text-sm text-gray-500 mt-1">₺{price.toFixed(2)}</p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">₺{(price * it.quantity).toFixed(2)}</p>
                          <button
                            onClick={() => {  if (confirm("Bu ürünü sepetten silmek istediğinize emin misiniz?")) {
                removeFromCart(it.id);
              }
            }}
            className="text-xs text-gray-500 hover:text-red-500 mt-1"
                          >
                            Sil
                          </button>
                        </div>
                      </div>

                      {/* Adet kontrolleri */}
                      <div className="flex items-center gap-3 mt-3">
                        {/* Not: şu an "-" tam silme yapıyor. Adet azaltma için backend'e quantity:-1 şeklinde update endpoint ekleyebilirsin */}
                        <button
                          onClick={() => decreaseQuantity(it.id)}
                          className="px-3 py-1 border rounded-md hover:bg-gray-50"
                          title="Adet azalt"
                        >
                          -
                        </button>

                        <div className="px-4 py-1 border rounded-md">{it.quantity}</div>

                        <button
                          onClick={() => addToCart(it.productId)}
                          className="px-3 py-1 border rounded-md hover:bg-gray-50"
                          title="Adet artır"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Alt özet */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-gray-600">Ara toplam</p>
                <p className="text-2xl font-bold">₺{total.toFixed(2)}</p>
              </div>

              <div className="flex gap-3">
                <button  onClick={() => router.push("/moda")} className="px-5 py-2 rounded-lg border hover:bg-gray-50">Alışverişe Devam Et</button>
                <GradientButton className="">
                  Ödemeye Geç
                </GradientButton>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
