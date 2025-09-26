"use client";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SepetPage() {
  const { items } = useCart();
  const total = items.reduce((s, it) => s + it.product.price * it.quantity, 0);

  return (
    <>
      <Header />
      <main className="max-w-[800px] mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Sepetim</h1>
        {items.length === 0 ? (
          <p>Sepetiniz boş</p>
        ) : (
          <>
            <ul className="divide-y">
              {items.map(it => (
                <li key={it.id} className="flex justify-between py-4">
                  <div>
                    <p className="font-semibold">{it.product.name}</p>
                    <p className="text-sm text-gray-600">x{it.quantity}</p>
                  </div>
                  <p>₺{(it.product.price * it.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <div className="text-right mt-6 font-bold text-lg">Toplam: ₺{total.toFixed(2)}</div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
