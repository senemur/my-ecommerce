// components/Testimonials.tsx
"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ayşe K.",
      comment:
        "Uygulama sayesinde alışverişim çok daha keyifli hale geldi, tavsiye ederim!",
      avatar: "/avatars/user1.jpg",
    },
    {
      name: "Mehmet T.",
      comment: "Ürün çeşitliliği ve hız harika. Tekrar alışveriş yapacağım.",
      avatar: "/avatars/user2.jpg",
    },
    {
      name: "Selin D.",
      comment: "Kullanımı çok kolay ve müşteri desteği çok hızlıydı.",
      avatar: "/avatars/user3.jpg",
    },
    {
      name: "Emre A.",
      comment: "İndirimler ve kampanyalar harika! Her zaman alışveriş yapıyorum.",
      avatar: "/avatars/user4.jpg",
    },
    {
      name: "Emre A.",
      comment: "İndirimler ve kampanyalar harika! Her zaman alışveriş yapıyorum.",
      avatar: "/avatars/user4.jpg",
    },
    {
      name: "Emre A.",
      comment: "İndirimler ve kampanyalar harika! Her zaman alışveriş yapıyorum.",
      avatar: "/avatars/user4.jpg",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Kullanıcı Yorumları
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Müşterilerimizden gelen geri bildirimler:
        </p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-80 md:w-96 bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <h3 className="font-semibold text-lg">{t.name}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{t.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
