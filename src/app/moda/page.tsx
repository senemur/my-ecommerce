import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const products = [
  {
    id: 1,
    name: "Oversize T-Shirt",
    price: 249.9,
    image: "/tshirt.jpg",
  },
  {
    id: 2,
    name: "Yüksek Bel Jean",
    price: 499.0,
    image: "/tshirt.jpg",
  },
  {
    id: 3,
    name: "Sneaker Ayakkabı",
    price: 799.0,
    image: "/tshirt.jpg",
  },
  {
    id: 4,
    name: "Deri Omuz Çantası",
    price: 699.0,
    image: "/tshirt.jpg",
  },
    {
    id: 5,
    name: "Deri Omuz Çantası",
    price: 699.0,
    image: "/tshirt.jpg",
  },
    {
    id: 6,
    name: "Deri Omuz Çantası",
    price: 699.0,
    image: "/tshirt.jpg",
  },
    {
    id: 7,
    name: "Deri Omuz Çantası",
    price: 699.0,
    image: "/tshirt.jpg",
  },
    {
    id: 8,
    name: "Deri Omuz Çantası",
    price: 699.0,
    image: "/tshirt.jpg",
  },
];

export default function ModaPage() {
  return (
    <>
    <Header />
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Moda Koleksiyonu</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Ürün Görseli */}
            <div className="relative w-full h-56">
              <Image
                src={p.image}
                alt={p.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 25vw"
              />
            </div>

            {/* Ürün Bilgisi */}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p className="text-gray-600 mt-1 mb-4">{p.price.toFixed(2)} TL</p>
              <button
                className="mt-auto inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-medium hover:opacity-90 transition"
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    <Footer />
    </>
  );
}
