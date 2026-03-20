import React from "react";
import Image from "next/image";
import MainFooter from "../Layouts/MainFooter";
import Link from "next/link";

interface Point {
    title: string;
    desc: string;
}

interface FeatureShowcaseProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    points: Point[];
    image: string;
    imagePosition?: "left" | "right"; // default = left
    link: string
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
    icon,
    title,
    description,
    points,
    image,
    imagePosition = "left",
    link
}) => {
    const isImageLeft = imagePosition === "left";

    return (
        <div className="w-full bg-[#080D28] border border-[#1A1A2C] rounded-3xl p-6 md:p-16 hover:shadow-[0_0_30px_#7B61FFaa] transition-all duration-700 group-hover:border-transparent">

            {/* TOP TITLE AND DESCRIPTION */}
            <div className="flex text-left items-center gap-4 md:gap-6 mb-6 md:mb-12">
                <div className="text-[#995ad1] p-2 md:p-0 md:h-16 md:w-16 flex justify-center items-center border border-[#9a5ad160] bg-[#2D1D4D] rounded-lg">
                    <span className="text-2xl md:text-3xl">{icon}</span>
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-white">
                        {title}
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base text-left max-w-xl">
                        {description}
                    </p>
                </div>
            </div>

            {/* IMAGE + POINTS GRID (EXACT LIKE SCREENSHOT) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

                {/* --- IMAGE ALWAYS FIRST ON MOBILE --- */}
                <div
                    className={`
            ${isImageLeft ? "md:order-1" : "md:order-2"}
            order-1
        `}
                >
                    <Image
                        src={image}
                        alt={title}
                        width={650}
                        height={400}
                        className="rounded-2xl shadow-lg w-full object-cover"
                    />
                </div>

                {/* --- POINTS ALWAYS SECOND ON MOBILE --- */}
                <div
                    className={`
            ${isImageLeft ? "md:order-2" : "md:order-1"}
            order-2
            space-y-6 text-left
        `}
                >
                    {points.map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <span className="text-white text-xl leading-none">•</span>
                            <div>
                                <p className="text-white font-semibold text-[15px]">{point.title}</p>
                                <p className="text-gray-400 text-sm mt-[1px]">{point.desc}</p>
                            </div>
                        </div>
                    ))}

                    <Link
                        href={link}
                        className="text-[#4A89FF] text-sm mt-3 inline-flex items-center gap-1 hover:opacity-80 transition"
                    >
                        Learn more →
                    </Link>
                </div>

            </div>


        </div>
    );
};

export default FeatureShowcase;
