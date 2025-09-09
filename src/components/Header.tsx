"use client";

import { useModal } from "@/context/ModalContext";
import Link from "next/link";

export default function Header() {
  const { openModal } = useModal();

  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-gray-100 shadow-sm ">
        <Link href="/" className="text-xl font-extrabold tracking-tight text-gray-600">
          Senem's<span className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 inline-block text-transparent bg-clip-text">Shop</span>
        </Link>

        {/* Login Button */}
        <nav className="flex items-center gap-4">
          <button
            onClick={openModal}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-white font-medium hover:bg-gradient-to-l transition"
          >
            Login
          </button>
        </nav>
      
    </header>
  );
}
