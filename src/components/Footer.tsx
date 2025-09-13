// components/Footer.tsx
"use client";

import { EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo & Açıklama */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text">Senem'sShop</h2>
          <p className="text-gray-400">
            En yeni ürünler, hızlı teslimat ve güvenli alışveriş deneyimi. Mağazamızı keşfedin!
          </p>
        </div>

        {/* Hızlı Linkler */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-200">Hızlı Linkler</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-pink-300 transition">Anasayfa</a></li>
            <li><a href="#" className="hover:text-pink-300 transition">Kategoriler</a></li>
            <li><a href="#" className="hover:text-pink-300 transition">Kampanyalar</a></li>
            <li><a href="#" className="hover:text-pink-300 transition">Hakkımızda</a></li>
          </ul>
        </div>

        {/* Müşteri Hizmetleri */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-200">Müşteri Hizmetleri</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-pink-300 transition">İletişim</a></li>
            <li><a href="#" className="hover:text-pink-300 transition">SSS</a></li>
            <li><a href="#" className="hover:text-pink-300 transition">İade Politikası</a></li>
            <li><a href="#" className="hover:text-pink-300 transition">Gizlilik</a></li>
          </ul>
        </div>

        {/* Sosyal Medya + Abonelik */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-200">Bizi Takip Edin</h3>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-pink-300 transition" aria-label="Email">
              <EnvelopeIcon className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-pink-300 transition" aria-label="Website">
              <GlobeAltIcon className="w-6 h-6" />
            </a>
          </div>
          <div className="mt-2">
            <h4 className="font-medium text-gray-200 mb-1">Bültenimize Katılın</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email adresiniz"
                className="flex-1 px-3 py-2 rounded-lg text-gray-900 focus:outline-none"
              />
              <button className="px-8 py-2 rounded-lg bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-white font-medium hover:bg-gradient-to-l transition absolute">
                Abone Ol
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyShop. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
