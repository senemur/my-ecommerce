// components/FeatureCard.tsx
import React from "react";

type Props = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

export default function FeatureCard({ title, desc, icon }: Props) {
  return (
    <div
      className="group relative flex flex-col items-center text-center
                 bg-white/90 backdrop-blur-sm
                 rounded-3xl p-8 md:p-10
                 shadow-md hover:shadow-2xl
                 border border-gray-100
                 transition-all duration-300
                 hover:-translate-y-1"
    >
      {/* Dış dairesel ikon alanı */}
      <div
        className="flex items-center justify-center w-20 h-20 mb-6
                   rounded-full bg-gradient-to-tr
                   from-pink-300 via-purple-300 to-blue-300
                   text-gray-700 shadow-inner"
      >
        <span className="w-8 h-8 text-gray-800">{icon}</span>
      </div>

      <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
        {title}
      </h4>

      <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-[18rem]">
        {desc}
      </p>

      {/* Hover efekti için alt çizgi */}
      <span
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r
                   from-pink-400 via-purple-400 to-blue-400
                   transition-all duration-300 group-hover:w-1/2"
      />
    </div>
  );
}
