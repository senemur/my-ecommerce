import React from "react";

type ToastProps = {
  message: string;
  show: boolean;
};

export default function Toast({ message, show }: ToastProps) {
  return (
    <div
      className={`fixed top-6 right-6 z-50
                  bg-green-500 text-white font-medium
                  px-5 py-3 rounded-xl shadow-lg
                  transform transition-all duration-300
                  ${show ? "block" : "opacity-0 -translate-y-4"}`}
    >
      {message}
    </div>
  );
}
