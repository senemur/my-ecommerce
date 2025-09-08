// components/OnboardingHero.tsx
"use client";

import { useRouter } from "next/navigation";
import FeatureCard from "./FeatureCard";
import { ShoppingBagIcon, ShieldCheckIcon, TruckIcon } from "./icons";

export default function OnboardingHero() {
  const router = useRouter();

  return (
    <section className="py-12 md:py-20 px-6 md:px-12 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/OnboardingHero.png')" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Text */}
        {/* space-y-6 dikeydeki elementler arasında boşluk bırakır örn: div içerisinde <h1> ve <p> arasında 24px boşluk verir */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Alışverişin yeni hali — <span className="text-pink-300
            ">hızlı</span>, <span className="text-pink-300">güvenli</span>, ve <span className="text-pink-300">şahsi</span>.
          </h1>
          <p className="text-gray-800 max-w-xl">
            Kendi mağazanı keşfet. Özel kampanyalar, güvenli ödeme, kapıda hızlı teslimat. Hemen başla ve ilk siparişinde indirim kazan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-pink-300 text-white font-medium hover:bg-pink-400 transition"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push("/home")}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
            >
              Browse as Guest
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <FeatureCard
              title="Kapsamlı Katalog"
              desc="Binlerce ürün kategorisiyle aradığını hızlıca bul."
              icon={<ShoppingBagIcon />}
            />
            <FeatureCard
              title="Güvenli Ödeme"
              desc="Ödeme bilgileriniz güvende. PCI uyumlu seçenekler."
              icon={<ShieldCheckIcon />}
            />
            <FeatureCard
              title="Hızlı Teslimat"
              desc="Yerel depolardan hızlı teslimat seçenekleri."
              icon={<TruckIcon />}
            />
          </div>
        </div>
{/* 
        Right: Illustration
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md p-6 bg-gradient-to-tr from-blue-50 to-white rounded-2xl shadow-lg">
           
            <svg viewBox="0 0 480 360" className="w-full h-60">
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#60a5fa" stopOpacity="0.12" />
                  <stop offset="1" stopColor="#7dd3fc" stopOpacity="0.12" />
                </linearGradient>
              </defs>
              <rect x="20" y="20" rx="20" ry="20" width="440" height="320" fill="url(#g)" />
              <g transform="translate(60,60)">
                <rect width="160" height="120" rx="12" fill="#fff" stroke="#e6f0ff" />
                <rect x="180" width="160" height="120" rx="12" fill="#fff" stroke="#e6f0ff" />
                <rect y="140" width="320" height="80" rx="12" fill="#fff" stroke="#e6f0ff" />
              </g>
            </svg>
            <p className="text-sm text-gray-600 mt-4">
              Güzel bir görsel + kısa açıklama. İlerleyen aşamada burayı carousel veya canlı ürün görselleriyle değiştirebilirsin.
            </p>
          </div>
        </div>*/}
      </div>
    </section>
  );
}""
