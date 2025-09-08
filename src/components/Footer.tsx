// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full border-t mt-12 py-6 px-6 md:px-12 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} MyShop. All rights reserved.
    </footer>
  );
}
