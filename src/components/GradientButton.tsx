// components/GradientButton.tsx
import React from "react";

interface GradientButtonProps {
  children: React.ReactNode;        // Buton içeriği (yazı, ikon vs.)
  onClick?: () => void;             // Tıklama olayı (opsiyonel)
  className?: string;               // Ekstra Tailwind sınıfları (opsiyonel)
  type?: "button" | "submit" | "reset";
}

export default function GradientButton({
  children,
  onClick,
  className = "",
  type = "button",
}: GradientButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-8 py-2 rounded-lg bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-700 font-medium hover:bg-gradient-to-l transition ${className}`}
    >
      {children}
    </button>
  );
}
