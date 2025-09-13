// components/OnboardingHero.tsx
"use client";

import { useRouter } from "next/navigation";
import FeatureCard from "./FeatureCard";
import {
  ShoppingBagIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { useModal } from "@/context/ModalContext";

export default function OnboardingHero() {
  const router = useRouter();
  const { openModal } = useModal();

  return (
    <section
      className="relative py-16 md:py-26 px-6 md:px-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/OnboardingHero.png')" }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-white/40 " />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
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
            Kendi mağazanı keşfet. Özel kampanyalar, güvenli ödeme ve kapıda
            hızlı teslimatla tanış. İlk siparişinde indirim kazan!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl
                         bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200
                         text-gray-800 font-medium hover:scale-105 transition-transform"
            >
              Hemen Başla
            </button>
            <button
              onClick={() => router.push("/home")}
              className="inline-flex items-center justify-center px-7 py-3 rounded-xl
                         border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Misafir Olarak Gez
            </button>
          </div>

          {/* Feature Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
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
        </div>
      </div>
    </section>
  );
}
