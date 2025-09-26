import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { CartProvider } from "@/context/CartContext";
import { Inter } from "next/font/google";
import AuthModal from "@/components/AuthModal";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My E-commerce App",
  description: "Modern e-commerce app built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={inter.className}>
      <CartProvider>
        <ModalProvider>
          {children}
          <AuthModal /> 
        </ModalProvider>
      </CartProvider>
      </body>
    </html>
  );
}
