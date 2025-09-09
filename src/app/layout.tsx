import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
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
        <ModalProvider>
          {children}
           <AuthModal /> 
        </ModalProvider>
      </body>
    </html>
  );
}
