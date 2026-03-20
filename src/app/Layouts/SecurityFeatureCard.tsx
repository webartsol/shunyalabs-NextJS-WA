import React from "react";

type SecurityFeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  theme?: "blue" | "purple" | "teal" | "green";
};

export default function SecurityFeatureCard({
  icon,
  title,
  description,
  theme = "blue",
}: SecurityFeatureCardProps) {
  // Tailwind gradient themes
  const themeColors = {
    blue: {
      glow: "shadow-[0_0_35px_6px_rgba(59,130,246,0.2)]",
      icon: "bg-gradient-to-r from-[#2563eb] to-[#0C368D]",
    },
    purple: {
      glow: "shadow-[0_0_35px_6px_rgba(168,85,247,0.2)]",
      icon: "bg-gradient-to-r from-[#8b5cf6] to-[#412081]",
    },
    teal: {
      glow: "shadow-[0_0_35px_6px_rgba(13,148,136,0.2)]",
      icon: "bg-gradient-to-r from-[#14b8a6] to-[#06b6d4]",
    },
    green: {
      glow: "shadow-[0_0_35px_6px_rgba(34,197,94,0.2)]",
      icon: "bg-gradient-to-r from-[#22c55e] to-[#16a34a]",
    },
  };

  const colors = themeColors[theme] || themeColors.blue;

  return (
    <section className="relative flex items-center justify-center py-20 z-0  bg-[#0B0B0F] overflow-hidden text-white">
      <div className="absolute inset-0 pointer-events-none -z-10">
   
   <div className="absolute top-[10px] left-[400px] w-[200px] h-[200px] bg-purple-700/60 rounded-full blur-[120px]"></div>

   <div className="absolute top-[10px] left-[1300px] w-[150px] h-[150px] bg-blue-200/90 rounded-full blur-[120px]"></div>

 </div>
      {/* Card */}
      <div
        className={`relative z-10 w-[90%] max-w-4xl bg-[#071229] backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center ${colors.glow}`}
      >
        {/* Icon */}
        <div
          className={`mx-auto w-12 h-12 ${colors.icon} rounded-full flex items-center justify-center mb-4`}
        >
          <div className="text-white text-2xl">{icon}</div>
        </div>

        {/* Title */}
        <p className="md:text-2xl text-lg font-semibold mb-2">{title}</p>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mt-3 md:mt-6">
          {description}
        </p>
      </div>
    </section>
  );
}
