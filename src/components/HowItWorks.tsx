// components/HowItWorks.tsx
export default function HowItWorks() {
  const steps = [
    { title: "Keşfet", desc: "Kategorilere göz at, filtrele, favori ürünleri bul." },
    { title: "Sepete Ekle", desc: "Kolayca sepete ekle, ödeme öncesi kontrol et." },
    { title: "Öde & Teslim Al", desc: "Güvenli ödeme, hızlı teslimat." },
  ];

  return (
    <section className="py-8 px-6 md:px-12 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-semibold">Nasıl çalışır?</h3>
        <p className="text-gray-600 mt-2">Basit 3 adımda alışverişini tamamla.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.title} className="p-4 bg-white rounded-lg shadow-sm border">
              <h4 className="font-semibold">{s.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
