//“Başla / Kayıt ol” çağrısı.

"use client";

import { useModal } from "@/context/ModalContext";

export default function CTASection() {
  const { openModal } = useModal();

  return (
    <section className="relative bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 py-20 px-6 text-center text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Bugün Alışverişe Başla
        </h2>
        <p className="mb-8 text-lg">
          İlk siparişine özel indirim fırsatını kaçırma.
        </p>
        <button
          onClick={openModal}
          className="bg-white text-pink-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Hemen Üye Ol
        </button>
      </div>
    </section>
  );
}
