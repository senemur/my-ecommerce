// components/HowItWorks.tsx
export default function HowItWorks() {
  const steps = [
    {
      title: "Keşfet",
      desc: "Kategorilere göz at, filtrele, favori ürünleri kolayca bul.",
    },
    {
      title: "Sepete Ekle",
      desc: "Beğendiğin ürünleri tek tıkla sepete ekle, detayları kontrol et.",
    },
    {
      title: "Öde & Teslim Al",
      desc: "Güvenli ödeme yöntemleriyle alışverişini tamamla, hızlı teslim al.",
    },
  ];

  return (
    <section className="relative py-16 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Nasıl Çalışır?
        </h3>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
          Basit <span className="font-semibold text-pink-500">3 adımda</span>{" "}
          alışverişini tamamla ve keyfine bak.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100
                         hover:shadow-xl hover:-translate-y-1 transition duration-200"
            >
              {/* Step Number */}
              <div
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center 
                           rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 
                           text-gray-800 font-bold text-lg shadow-md"
              >
                {i + 1}
              </div>

              <h4 className="mt-8 text-xl font-semibold text-gray-800">{s.title}</h4>
              <p className="mt-3 text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
