import React from "react";
import { FaCheck } from "react-icons/fa";

type WhyChooseSectionProps = {
  title: string;
  theme?: "blue" | "purple" | "teal" | "green";
  points: string[];
};

export default function WhyChooseSection({
  title,
  theme = "blue",
  points,
}: WhyChooseSectionProps) {
  // Gradient theme colors
  const themeColors = {
    blue: "from-[#2563EB] to-[#0C368D]",
    purple: "from-[#8B5CF6] to-[#412081]",
    teal: "from-[#14B8A6] to-[#06B6D4]",
    green: "from-[#22C55E] to-[#16A34A]",
  };

  const gradient = themeColors[theme] || themeColors.blue;

  //html part
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 text-center">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-semibold mb-12 md:mb-20 text-gray-700">
          {title}
        </h2>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 text-left">
          {points.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3">
              {/* Gradient Icon */}
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white`}
              >
                <FaCheck style={{ fontSize: "0.7rem" }} />
              </div>

              {/* Text */}
              <p className="text-gray-700 leading-relaxed font-semibold">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
