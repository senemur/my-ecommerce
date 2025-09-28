"use client";

import { useState, useEffect } from "react";
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

export default function Header() {
  const { openModal } = useModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { items, removeFromCart } = useCart();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setProfileOpen(false);
  };

  const categories = [
    { name: "Elektronik", path: "/elektronik" },
    { name: "Moda", path: "/moda" },
    { name: "Ev & Yaşam", path: "/ev-yasam" },
    { name: "Telefon & Aksesuar", path: "/telefon-aksesuar" },
  ];

  const total = items.reduce((s, it) => s + it.product.price * it.quantity, 0);

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

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-pink-500 transition">Anasayfa</Link>

          {/* Kategoriler dropdown */}
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

          <Link href="#" className="hover:text-pink-500 transition">Kampanyalar</Link>
          <Link href="#" className="hover:text-pink-500 transition">Hakkımızda</Link>
        </nav>

        {/* Sağ taraf: Login / Profil ve Sepet */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full focus:outline-none"
              >
                <UserCircleIcon className="w-9 h-9 text-gray-600 hover:text-pink-300 transition" />
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg 
                             overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm text-gray-700 font-medium">
                      {user.email}
                    </p>
                  </div>
                  <ul className="py-1 text-gray-700">
                    <li>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        Siparişler
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/returns"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        İadeler
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setProfileOpen(false)}
                      >
                        Profil Ayarları
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                      >
                        Çıkış Yap
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <GradientButton
              onClick={openModal}
              className="hidden md:inline-block"
            >
              Login
            </GradientButton>
          )}

          {/* Sepet dropdown - kategorilerle aynı stil */}
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

        {/* Mobil Menü butonu */}
        <button
          className="md:hidden ml-4 text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobil Menü */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col gap-2 px-6 py-4">
            <Link href="/" className="hover:text-pink-300 transition">Anasayfa</Link>
            {user ? (
              <>
                <Link
                  href="/sepet"
                  className="flex items-center gap-2 hover:text-pink-300 transition"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  Sepet ({items.length})
                </Link>
                <Link href="/orders" className="hover:text-pink-300 transition">Siparişler</Link>
                <Link href="/returns" className="hover:text-pink-300 transition">İadeler</Link>
                <Link href="/profile" className="hover:text-pink-300 transition">Profil Ayarları</Link>
                <button
                  onClick={handleLogout}
                  className="mt-2 px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <button
                onClick={openModal}
                className="mt-2 px-5 py-2 rounded-lg bg-pink-300 text-white font-medium hover:bg-pink-200 transition"
              >
                Giriş Yap / Kayıt Ol
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
