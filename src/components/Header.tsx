"use client";

import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import Link from "next/link";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openModal } = useModal();

  const categories = [
    { name: "Elektronik" },
    { name: "Moda" },
    { name: "Ev & Yaşam" },
    { name: "Telefon & Aksesuar" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold tracking-tight text-gray-600">
          Senem's
          <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text">
            Shop
          </span>
        </Link>

        {/* Desktop Menü */}
        <nav className="hidden md:flex items-center gap-10">
          <a href="#" className="hover:text-pink-500 transition">Anasayfa</a>

          {/* Profesyonel Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="hover:text-pink-500 transition flex items-center gap-1">
              Kategoriler
              <svg
                className={`w-4 h-4 transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-lg p-4 grid grid-cols-1 gap-2 border-none z-50">
                {categories.map((cat, i) => (
                  <a
                    key={i}
                    href="#"
                    className="block px-4 py-2 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#" className="hover:text-pink-500 transition">Kampanyalar</a>
          <a href="#" className="hover:text-pink-500 transition">Hakkımızda</a>
        </nav>

        {/* Login Button */}
        <nav className="flex items-center gap-4">
          <button
            onClick={openModal}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-white font-medium hover:bg-gradient-to-l transition"
          >
            Login
          </button>
        </nav>

        {/* Mobil Hamburger */}
        <button
          className="md:hidden ml-4 text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobil Menü */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md animate-fadeIn">
          <nav className="flex flex-col gap-2 px-6 py-4">
            <a href="#" className="hover:text-pink-500 transition">Anasayfa</a>

            {/* Dropdown Mobil */}
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex justify-between items-center hover:text-pink-500 transition"
              >
                Kategoriler
                <svg
                  className={`w-4 h-4 transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="mt-2 flex flex-col gap-1 pl-4">
                  {categories.map((cat, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block py-2 hover:text-pink-500 transition"
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="hover:text-pink-500 transition">Kampanyalar</a>
            <a href="#" className="hover:text-pink-500 transition">Hakkımızda</a>

            {/* Mobil Login Butonu */}
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
