// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-white shadow-sm">
      <Link href="/" className="text-xl font-extrabold tracking-tight">
        Senem<span className="text-pink-300">Shop</span>
      </Link>

      <nav className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-pink-300">
          Login
        </Link>
      </nav>
    </header>
  );
}
