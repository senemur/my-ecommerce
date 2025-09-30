//Genel modal tasarımı (overlay, animasyon, kapama vs.), AuthModal buraya gömülüyor.

"use client";

import { ReactNode, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // ESC ile kapatma
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 animate-fadeIn"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm
                   transition-opacity duration-300"
        onClick={onClose}
      />

      {/* İçerik kutusu */}
      <div
        className="relative bg-white  rounded-3xl shadow-2xl
                   w-[90%] max-w-xl p-8 md:p-10 z-10
                   transform transition-all duration-300
                   animate-scaleIn"
      >
        {/* Kapatma butonu */}
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700
                     dark:hover:text-gray-300 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {children}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          0%   { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1);    opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out; }
      `}</style>
    </div>
  );
}

