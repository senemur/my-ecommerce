"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";



export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<null | any>(null);
  

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // login olmuş kullanıcı veya null
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to the Store 🛍️</h1>
      <button
        onClick={() => signOut(auth)}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </main>
  );
}
