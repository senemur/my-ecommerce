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
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100
                 hover:shadow-xl hover:-translate-y-1 transition-transform duration-200"
    >
      <div className="flex items-start gap-5">
        {/* Icon Box */}
        <div className="flex items-center justify-center w-14 h-14 rounded-xl 
                        bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200
                        text-gray-700">
          <span className="w-7 h-7">{icon}</span>
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-lg md:text-xl text-gray-800">
            {title}
          </h4>
          <p className="text-sm md:text-base text-gray-600 mt-2 leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
