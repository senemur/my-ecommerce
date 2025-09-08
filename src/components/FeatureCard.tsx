// components/FeatureCard.tsx
import React from "react";

type Props = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

export default function FeatureCard({ title, desc, icon }: Props) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
}
