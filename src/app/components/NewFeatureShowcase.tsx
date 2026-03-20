import Image from "next/image";
import React from "react";

type FeatureCard = {
    title: string;
    description: string;
    icon: React.ReactNode;
};

type NewFeatureShowcaseProps = {
    heading: string;
    image: string;
    imageAlt?: string;
    imagePosition?: "left" | "right";
    cards: FeatureCard[];
};

export default function NewFeatureShowcase({
    heading,
    image,
    imageAlt = "",
    imagePosition = "left",
    cards,
}: NewFeatureShowcaseProps) {
    const isImageLeft = imagePosition === "left";

    return (
        <section className="md:py-20 py-10 md:mt-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Heading */}
                <h2 className="text-center text-2xl md:text-3xl font-semibold text-white mb-8 md:mb-14">
                    {heading}
                </h2>

                {/* Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">

                    {/* Image — ALWAYS FIRST on mobile */}
                    <div
                        className={`order-1 ${isImageLeft ? "lg:order-1" : "lg:order-2"
                            }`}
                    >
                        <div className="relative w-full h-[280px] md:h-[400px] rounded-xl overflow-hidden">
                            <Image
                                src={image}
                                alt={imageAlt}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Cards — ALWAYS SECOND on mobile */}
                    <div
                        className={`order-2 ${isImageLeft ? "lg:order-2" : "lg:order-1"
                            } grid grid-cols-1 sm:grid-cols-2 gap-4`}
                    >
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-[#A757ED]/20 bg-[#0F0916] p-7 hover:border-[#A757ED] transition"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#A757ED42] border border-[#a757edc4] text-white text-xl">
                                        {card.icon}
                                    </div>
                                    <h3 className="text-white font-medium">
                                        {card.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}
