"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useModal } from "@/context/ModalContext";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import GradientButton from "./GradientButton";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { items, removeFromCart } = useCart();

  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // close profile dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    setProfileOpen(false);
    router.push("/"); // anasayfaya yönlendir
  };

  const categories = [
    { name: "Elektronik", path: "/elektronik" },
    { name: "Moda", path: "/moda" },
    { name: "Ev & Yaşam", path: "/ev-yasam" },
    { name: "Telefon & Aksesuar", path: "/telefon-aksesuar" },
  ];

  const total = items.reduce((s, it) => s + Number(it.product?.price || 0) * it.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold tracking-tight text-gray-700">
          Senem's
          <span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text">
            Shop
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-pink-500 transition">Anasayfa</Link>

          {/* Categories dropdown (desktop) */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-pink-500 transition">
              Kategoriler
              <ChevronDownIcon className="w-4 h-4" />
            </button>
            <div
              className="invisible opacity-0 group-hover:visible group-hover:opacity-100
                         absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg p-3
                         transition-all duration-200 z-50"
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

          <Link href="/kampanyalar" className="hover:text-pink-500 transition">Kampanyalar</Link>
          <Link href="/#features" className="hover:text-pink-500 transition">Hakkımızda</Link>
        </nav>

        {/* Right side (profile & cart) */}
        <div className="flex items-center gap-4">
          {/* PROFILE */}
          {user ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => {
                  // open profile, close mobile menu to avoid overlap
                  setProfileOpen((p) => {
                    const next = !p;
                    if (next) setMobileMenuOpen(false);
                    return next;
                  });
                }}
                className="flex items-center gap-2 rounded-full focus:outline-none"
                aria-expanded={profileOpen}
                aria-label="Kullanıcı menüsü"
              >
                <UserCircleIcon className="w-9 h-9 text-gray-600 hover:text-pink-300 transition" />
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profileOpen && (
                // responsive positioning: desktop -> absolute under button; mobile -> fixed top-right
                <div
                  className="z-50 md:absolute md:right-0 md:top-full md:mt-3
                             fixed right-4 top-16 w-[min(92vw,20rem)] md:w-80 h-auto bg-white rounded-2xl shadow-xl ring-1 ring-gray-100
                             animate-[fadeIn_0.12s_ease-out] overflow-hidden"
                >
                  {/* Header area */}
                  <div className="flex items-center gap-3 px-5 py-4 border-b">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200
                                    flex items-center justify-center text-gray-700 font-bold">
                      {user.email?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">{user.email}</p>
                      <p className="text-xs text-gray-500">Hesabım</p>
                    </div>
                  </div>

                  {/* Grid menu */}
                  <ul className="grid grid-cols-2 gap-1 px-2 py-3 text-gray-700 text-sm">
                    <li>
                      <Link
                        href="/orders"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M3 3h18v4H3V3zm0 6h18v4H3V9zm0 6h18v4H3v-4z"/>
                        </svg>
                        Siparişlerim
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/favoriler"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364 4.318 12.682a4.5 4.5 0 010-6.364z"/>
                        </svg>
                        Favoriler
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/returns"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 4v5h.582a9 9 0 018.546-8.546A9 9 0 0012 21a9 9 0 01-8-4.472"/>
                        </svg>
                        İadeler
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M5.121 17.804A4 4 0 0112 15a4 4 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        Profil Ayarları
                      </Link>
                    </li>
                  </ul>

                  <div className="border-t px-4 py-3 space-y-2">
                    <Link
                      href="/account"
                      onClick={() => setProfileOpen(false)}
                      className="block w-full text-center rounded-lg border border-gray-200 py-2 text-gray-700 hover:bg-gray-50 transition"
                    >
                      Hesabım
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center rounded-lg bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200
                                 text-white font-medium py-2 hover:opacity-90 transition"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <GradientButton
              onClick={() => {
                openModal();
                setProfileOpen(false);
              }}
              className="hidden md:inline-block"
            >
              Login
            </GradientButton>
          )}

          {/* Cart (same as before) */}
          <div className="relative group">
            <button className="relative flex items-center hover:text-pink-300 transition">
              <ShoppingCartIcon className="w-6 h-6" />
              {items.length > 0 && (
                <span
                  className="absolute -top-2 -right-1 bg-pink-300 text-white text-xs font-semibold
                             w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {items.length}
                </span>
              )}
            </button>

            <div
              className="invisible opacity-0 group-hover:visible group-hover:opacity-100
                         absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg p-4
                         transition-all duration-200 z-50"
            >
              {items.length === 0 ? (
                <p className="text-center text-gray-600">Sepetiniz boş</p>
              ) : (
                <>
                  <ul className="space-y-3 max-h-64 overflow-auto">
                    {items.map((it) => (
                      <li key={it.id} className="flex gap-3 items-center">
                        <img
                          src={it.product.image}
                          alt={it.product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{it.product.name}</p>
                          <p className="text-xs text-gray-500">
                            {it.quantity} × ₺{it.product.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(it.id)}
                          className="text-xs text-black hover:underline"
                        >
                          Sil
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-between font-semibold">
                    <span>Toplam:</span>
                    <span>₺{total.toFixed(2)}</span>
                  </div>

                  <Link
                    href="/sepet"
                    className="block mt-4 w-full text-center bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-white py-2 rounded-lg hover:bg-gradient-to-l transition"
                  >
                    Sepete Git
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-4 text-gray-700"
          onClick={() => {
            setMobileMenuOpen((prev) => {
              const next = !prev;
              if (next) {
                setProfileOpen(false);
                setCategoriesOpen(false);
              }
              return next;
            });
          }}
          aria-expanded={mobileMenuOpen}
          aria-label="Mobil menü"
        >
          {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col gap-2 px-6 py-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-pink-300 transition">Anasayfa</Link>

            {/* Categories collapsible */}
            <div>
              <button
                onClick={() => setCategoriesOpen((c) => !c)}
                className="w-full flex items-center justify-between py-2 hover:text-pink-300 transition"
              >
                <span>Kategoriler</span>
                <ChevronDownIcon className={`w-4 h-4 transform transition ${categoriesOpen ? "rotate-180" : ""}`} />
              </button>
              {categoriesOpen && (
                <ul className="mt-2 ml-3 flex flex-col gap-2">
                  {categories.map((cat) => (
                    <li key={cat.name}>
                      <Link
                        href={cat.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-2 py-1 rounded hover:bg-gray-50"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Link href="/kampanyalar" onClick={() => setMobileMenuOpen(false)} className="hover:text-pink-300 transition">Kampanyalar</Link>
            <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-pink-300 transition">Hakkımızda</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
