"use client";

import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";

interface AudioFeatureCardProps {
    title: string;
    desc: string;
    capabilities: string[];
    useCases: string[];
    gradientColor: string;
}

export default function AudioFeatureCard({
    title,
    desc,
    capabilities,
    useCases,
    gradientColor,
}: AudioFeatureCardProps) {
    return (
        <div
            className="rounded-2xl p-[1px] transition-all duration-300 group"
            style={{
                background: `linear-gradient(120deg, ${gradientColor}, transparent)`,
            }}
        >
            {/* OUTER CARD CONTENT */}
            <div
                className="rounded-2xl bg-[#0E0F13] p-6 md:p-8 transition-all duration-300"
            >
                <h2
                    className={`
    text-3xl font-semibold mb-3 
    bg-clip-text text-transparent 
    inline-block w-fit
  `}
                    style={{
                        backgroundImage: `linear-gradient(90deg, ${gradientColor} 0%, ${gradientColor} 40%, #ffffff 100%)`,
                    }}
                >
                    {title}
                </h2>


                {/* Description */}
                <p className="text-gray-400 mb-6 text-lg">{desc}</p>

                {/* INNER SECTION (NO HOVER EFFECT ALLOWED!) */}
                <div className="w-full rounded-2xl bg-[#0F1117] border border-white/5 px-6 py-8 grid sm:grid-cols-2 gap-8 relative z-10 shadow-none">

                    {/* Capabilities */}
                    <div>
                        <h4 className="font-semibold text-lg text-white mb-4">Capabilities</h4>
                        <ul className="space-y-3">
                            {capabilities.map((cap, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <IoMdCheckmarkCircleOutline
                                        className="text-lg"
                                        style={{ color: gradientColor }}
                                    />
                                    <span className="text-gray-300 text-base">{cap}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Use Cases */}
                    <div>
                        <h4 className="font-semibold text-lg text-white mb-4">Use Cases</h4>
                        <ul className="space-y-3">
                            {useCases.map((use, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <IoArrowForward className="text-gray-300 text-lg mt-[4px]" />
                                    <span className="text-gray-300 text-base">{use}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* HOVER EFFECT ONLY ON OUTER CARD */}
            <style jsx>{`
        .group:hover {
          box-shadow: 0 0 35px ${gradientColor}40;
        }
      `}</style>
        </div>
    );
}
