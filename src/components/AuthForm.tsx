// Giriş / Kayıt formunu içerir.

"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/home");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full">
      {/* Tab buttons */}
      <div className="flex mb-6 border-b">
        <button
          className={`flex-1 py-2 text-center font-medium ${
            isLogin
              ? "border-b-2 border-pink-400 text-pink-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setIsLogin(true)}
        >
          Giriş Yap
        </button>
        <button
          className={`flex-1 py-2 text-center font-medium ${
            !isLogin
              ? "border-b-2 border-pink-400 text-pink-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setIsLogin(false)}
        >
          Hesap Oluştur
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Şifre"
          className="border rounded-lg p-3 focus:ring-2 focus:ring-pink-300 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-500 py-3 rounded-lg font-semibold hover:bg-gradient-to-l transition"
        >
          {isLogin ? "Giriş Yap" : "Hesap Oluştur"}
        </button>
      </form>

      {isLogin && (
        <p className="text-sm text-right mt-3 text-gray-500 hover:text-gray-700 cursor-pointer">
          Şifreni mi unuttun?
        </p>
      )}
    </div>
  );
}
