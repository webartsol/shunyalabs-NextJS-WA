"use client";

import React from "react";

interface FeatureCard {
    title: string;
    desc: string;
    icon: React.ReactNode;
    iconBg: string;
}

interface FeatureSectionProps {
    heading: string;
    accentColor: string;
    cardBgColor: string;
    cards: FeatureCard[];
}

export default function FeatureSection({
    heading,
    accentColor,
    cardBgColor,
    cards,
}: FeatureSectionProps) {
    return (
        <section className="w-full mb-20">
            {/* Heading */}
            <div className="flex items-center gap-3 mb-8">
                <div
                    className="w-1 h-12 rounded-full"
                    style={{ backgroundColor: accentColor }}
                ></div>

                <h2 className="text-2xl font-semibold text-white">{heading}</h2>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="rounded-2xl p-6 border border-white/5 flex items-start gap-5"
                        style={{ backgroundColor: cardBgColor }}
                    >
                        {/* Icon Box */}
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: card.iconBg }}
                        >
                            {card.icon}
                        </div>

                        {/* Text Content */}
                        <div>
                            <h3 className="text-white font-semibold text-lg mb-2">
                                {card.title}
                            </h3>

                            <p className="text-gray-400 text-sm leading-relaxed">
                                {card.desc}
                            </p>
                        </div>
                    </div>

                ))}
            </div>
        </section>
    );
}
