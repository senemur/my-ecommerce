//AuthForm’u modal içinde gösteriyor, modal tasarımını kullanıyor.

"use client";

import { useModal } from "@/context/ModalContext";
import Modal from "./LoginModal";
import AuthForm from "./AuthForm";

export default function AuthModal() {
  const { isOpen, closeModal } = useModal();

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Left side illustration (opsiyonel) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-60 h-60 bg-gradient-to-tr from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center">
            <p className="text-pink-500 font-bold">🛍️</p>
          </div>
        </div>

        {/* Right side: Auth Form */}
        <div className="flex-1 w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
            Hoşgeldin!
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Hesabına giriş yap veya yeni bir hesap oluştur.
          </p>

          <AuthForm />
        </div>
      </div>
    </Modal>
  );
}
