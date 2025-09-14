// components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
  { name: "Elektronik", path: "/elektronik" },
  { name: "Moda", path: "/moda" },          // ✅ yeni sayfa
  { name: "Ev & Yaşam", path: "/ev-yasam" },
  { name: "Telefon & Aksesuar", path: "/telefon-aksesuar" },
];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-gray-700"
        >
          Senem's
          <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text">
            Shop
          </span>
        </Link>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#" className="hover:text-pink-500 transition">
            Anasayfa
          </Link>

          {/* Dropdown container - group relative */}
          <div className="relative group">
            {/* Tetikleyici */}
            <button
              className="flex items-center gap-1 hover:text-pink-500 transition"
            >
              Kategoriler
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {/* Açılır Menü */}
            <div
              className="
                invisible opacity-0
                group-hover:visible group-hover:opacity-100
                absolute left-0 top-full mt-2
                w-48 bg-white rounded-xl shadow-lg p-3
                transition-all duration-200
                z-50
              "
            >
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <Link
                      href={cat.path}
                      className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="#" className="hover:text-pink-500 transition">
            Kampanyalar
          </Link>
          <Link href="#" className="hover:text-pink-500 transition">
            Hakkımızda
          </Link>
        </nav>

        {/* Login Butonu */}
        <button
          onClick={openModal}
          className="hidden md:inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:bg-gradient-to-l transition"
        >
          Login
        </button>

        {/* Mobil Menü Toggle */}
        <button
          className="md:hidden ml-4 text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobil Menü */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col gap-2 px-6 py-4">
            <Link href="#" className="hover:text-pink-500 transition">
              Anasayfa
            </Link>

            {/* Basit açılır */}
            <details>
              <summary className="flex justify-between items-center cursor-pointer hover:text-pink-500 transition list-none">
                Kategoriler
                <ChevronDownIcon className="w-4 h-4" />
              </summary>
              <div className="mt-2 flex flex-col gap-1 pl-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.path}
                    className="py-1 hover:text-pink-500 transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </details>

            <Link href="#" className="hover:text-pink-500 transition">
              Kampanyalar
            </Link>
            <Link href="#" className="hover:text-pink-500 transition">
              Hakkımızda
            </Link>

            <button
              onClick={openModal}
              className="mt-2 px-5 py-2 rounded-lg bg-pink-300 text-white font-medium hover:bg-pink-400 transition"
            >
              Giriş Yap / Kayıt Ol
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
