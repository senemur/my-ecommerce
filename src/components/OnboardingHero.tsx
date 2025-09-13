// components/OnboardingHero.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FeatureCard from "./FeatureCard";
import { ShoppingBagIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
import { useModal } from "@/context/ModalContext";

export default function OnboardingHero() {
  const router = useRouter();

  const { openModal } = useModal();
  
  return (
    <section className="py-12 md:py-20 px-6 md:px-12 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/OnboardingHero.png')" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Text */}
        {/* space-y-6 dikeydeki elementler arasında boşluk bırakır örn: div içerisinde <h1> ve <p> arasında 24px boşluk verir */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Alışverişin yeni hali — <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text
            ">hızlı</span>, <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text">güvenli</span>, ve <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text">şahsi</span>.
          </h1>
          <p className="text-gray-800 max-w-xl">
            Kendi mağazanı keşfet. Özel kampanyalar, güvenli ödeme, kapıda hızlı teslimat. Hemen başla ve ilk siparişinde indirim kazan.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:bg-gradient-to-l transition"
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
      </div>

    </section>
  );
}""
