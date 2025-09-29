"use client";

import { useRouter } from "next/navigation";
import FeatureCard from "./FeatureCard";
import {
  ShoppingBagIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useModal } from "@/context/ModalContext";
import GradientButton from "./GradientButton";
import { useEffect, useState } from "react";

export default function OnboardingHero() {
  const router = useRouter();
  const { openModal } = useModal();
  const [index, setIndex] = useState(0);

  // Arka planı değiştirebileceğiniz görseller
  const slides = [
    { bg: "/slider1.png" },
    { bg: "/slider2.jpg" },
  ];

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      8000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-[800px]">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bg})` }}
          />
          <div className="absolute inset-0 bg-white/40" />

          <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-26 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* === 1. SLIDE: Hero metni === */}
            {i === 0 && (
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
                  Alışverişin yeni hali —{" "}
                  <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text">
                    hızlı
                  </span>
                  ,{" "}
                  <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text">
                    güvenli
                  </span>{" "}
                  ve{" "}
                  <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text">
                    kişisel
                  </span>
                  .
                </h1>

                <p className="text-gray-800 max-w-xl text-lg leading-relaxed">
                  Kendi mağazanı keşfet. Özel kampanyalar, güvenli ödeme ve
                  kapıda hızlı teslimatla tanış. İlk siparişinde indirim kazan!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <GradientButton onClick={openModal}>Hemen Başla</GradientButton>
                  <button
                    onClick={() => router.push("/home")}
                    className="inline-flex items-center justify-center px-7 py-3 rounded-xl
                               border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Misafir Olarak Gez
                  </button>
                </div>
              </div>
            )}
</div>
            {/* === 2. SLIDE: Sadece Feature Cards === */}
            {i === 1 && (
              <div className=" mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 backdrop-blur-sm">
                <FeatureCard
                  title="Kapsamlı Katalog"
                  desc="Binlerce ürün arasından aradığını saniyeler içinde bul."
                  icon={<ShoppingBagIcon className="w-7 h-7" />}
                />
                <FeatureCard
                  title="Güvenli Ödeme"
                  desc="Ödeme bilgileriniz PCI DSS standartlarıyla korunur."
                  icon={<ShieldCheckIcon className="w-7 h-7" />}
                />
                <FeatureCard
                  title="Hızlı Teslimat"
                  desc="Yerel depolardan aynı gün veya ertesi gün gönderim."
                  icon={<TruckIcon className="w-7 h-7" />}
                />
              </div>
            )}
          
        </div>
      ))}

      {/* Slider Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full transition-colors ${
              i === index ? "bg-gray-900" : "bg-gray-400/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
