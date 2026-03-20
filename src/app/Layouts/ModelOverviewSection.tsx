import Link from "next/link";
import { DOCS_URL } from "../utils/constants";
import React from "react";
import { Play } from 'lucide-react';
import { IoPlayOutline } from "react-icons/io5";
import { BookText } from 'lucide-react';
type Feature = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

type ModelOverviewSectionProps = {
  title: string;
  description: string;
  buttonText?: string;
  theme?: "blue" | "purple" | "teal" | "green";
  features?: Feature[];
  tab: string
};

export default function ModelOverviewSection({
  title,
  description,
  theme = "blue",
  features = [],
  tab
}: ModelOverviewSectionProps) {
  const themeColors = {
    blue: {
      gradientBg: "bg-gradient-to-br from-[#0B0C1A] via-[#0E1330] to-[#071021]",
      button:
        "bg-gradient-to-r from-[#2563eb] to-[#0C368D] hover:opacity-90 shadow-[0_4px_20px_rgba(59,130,246,0.2)]",
      iconGradient: "bg-gradient-to-br from-[#0C368D] to-[#3b82f6]",
      leftGlow: "bg-[#7B61FF]/30",
      rightGlow: "bg-[#2563EB]/30",
    },
    purple: {
      gradientBg: "bg-gradient-to-br from-[#1B1028] via-[#2A1047] to-[#0F0520]",
      button:
        "bg-gradient-to-r from-[#9333EA] to-[#412081] hover:opacity-90 shadow-[0_4px_20px_rgba(168,85,247,0.2)]",
      iconGradient: "bg-gradient-to-br from-[#9333EA] to-[#412081]",
      leftGlow: "bg-[#9333EA]/30",
      rightGlow: "bg-[#7C3AED]/30",
    },
  };

  const colors = themeColors[theme === "purple" ? "purple" : "blue"];
  const docLink =
    tab === "mt"
      ? `${DOCS_URL}/med-transcription`
      : `${DOCS_URL}/batch/quickstart`;
  return (
    <section className="relative text-white md:py-24 py-16 text-center ">

      {/* 🌟 Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Title + Description */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h1>
        <h2 className="mt-6 text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto">
          {description}
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {/* 🎬 Live Demo Button */}
          <Link href={`/?innertab=${tab}#HomePageWidget`} className="inline-flex">
            <button
              className={`flex items-center justify-center gap-2 text-white font-medium
                  px-6 py-3 rounded-full min-h-[48px] min-w-[48px]
                  ${colors.button} transition-all duration-300 focus:outline-none
                  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
            >
              <Play className="w-4 h-4 mt-[2px]" />
              Live Demo
            </button>
          </Link>

          {/* 📘 Documentation Button */}
          <Link href={docLink} className="inline-flex">
            <button
              className="flex items-center justify-center gap-2 text-black font-medium
                 px-6 py-3 rounded-full bg-white min-h-[48px] min-w-[48px]
                 transition-all duration-300 hover:bg-gray-100 focus:outline-none
                 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              <BookText className="w-4 h-4 mt-[2px]" />
              Documentation
            </button>
          </Link>
        </div>



        {/* 🔑 Key Features */}
        <h2 className="md:text-xl text-lg font-semibold mt-16 md:mt-24 md:mb-10 mb-5">Key Features</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
            >
              <div
                className={`w-12 h-12 mx-auto mb-5 rounded-full flex items-center justify-center ${colors.iconGradient} `}
              >
                <span className="text-white text-2xl">{feature.icon}</span>
              </div>

              <h3 className="font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
