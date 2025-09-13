//e-ticaret özelliklerini kart kart anlatan yeni bölüm. avantajlar bölümü

// components/FeaturesGrid.tsx
"use client";

import { ShoppingBagIcon, ShieldCheckIcon, TruckIcon, } from "@heroicons/react/24/outline";

type Feature = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  bg?: string;
};

const features: Feature[] = [
  {
    title: "Kapsamlı Katalog",
    desc: "Binlerce ürün kategorisiyle aradığını hızlıca bul.",
    icon: <div className="w-10 h-10 text-pink-500 bg-pink-50" >
      <ShoppingBagIcon />
    </div>,
    bg: ""
  },
  {
    title: "Güvenli Ödeme",
    desc: "Ödeme bilgileriniz güvende. PCI uyumlu seçenekler.",
    icon: <div className="w-10 h-10 text-blue-500 bg-blue-50 ">
      <ShieldCheckIcon />
    </div>,
    bg: ""
  },
  {
    title: "Hızlı Teslimat",
    desc: "Yerel depolardan hızlı teslimat seçenekleri.",
    icon: <div className="w-10 h-10 text-green-500 bg-green-50">
      <TruckIcon />
    </div>,
    bg: ""
  },
  {
    title: "Özel Kampanyalar",
    desc: "Sadık müşterilerimize özel indirimler ve fırsatlar.",
    // icon: <GiftIcon className="w-10 h-10 text-yellow-500" />,
    bg: ""
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Neden Biz?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Alışveriş deneyiminizi bir üst seviyeye taşıyan avantajlarımız:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className={`flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition ${f.bg}`}
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
