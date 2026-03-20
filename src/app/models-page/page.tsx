"use client"
import Link from "next/link";
import React, { useState } from 'react'
import Navbar from '../Layouts/Navbar'
import HomeFooter from "../Layouts/HomeFooter";
import MainFooter from "../Layouts/MainFooter";

function page() {

    const [active, setActive] = useState(0);

    const items = [
        {
            title: "Zero STT Indic",
            desc: "Superior accuracy for deep Indic language support",
            link: "/zero-indic",
        },
        {
            title: "Zero STT Codeswitch",
            desc: "One-of-a-kind model for Hinglish speech",
            link: "/zero-code-switch",
        },
        {
            title: "Zero STT",
            desc: "Industry-leading accuracy across all languages and accents",
            link: "/zero-stt",
        },
    ];

    return (
        <div className="min-h-screen bg-[#0B0A0F] text-white pt-20">
            <Navbar />

            {/* Hero Section */}
            <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight m-auto">
                        Foundation Models Built to Power Voice Agents
                    </h1>

                    <h2 className="mt-6 text-lg md:text-xl text-gray-300">
                        Trained on proprietary methods and data, delivering industry-leading results across languages, specializations, and deployment environments.
                    </h2>
                </div>

                <Link
                    href="/contact"
                    className="px-10 py-3 rounded-full text-white text-base font-medium 
        bg-gradient-to-r from-[#2d58c5] to-[#145AE8]
        hover:opacity-90 transition duration-300 mt-8 md:mt-16 inline-block"
                >
                    Try Now
                </Link>

            </section>

            {/* ============================== */}

            <div className="bg-[#0E1219]">
                <section className="md:px-0 px-4 text-white py-12 md:py-20 flex justify-center">
                    <div
                        className="max-w-6xl bg-[#0E1219] p-8 md:p-16 rounded-2xl 
             border border-[#317cf487] w-full mx-auto 
             grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20
             
             transition-all duration-500 ease-out
             
             hover:shadow-[0_0_20px_2px_rgba(18,102,237,0.5)]
             hover:shadow-[#1266ED]/50"
                    >

                        {/* LEFT SIDE */}
                        <div className="flex flex-col justify-start">
                            <h2 className="text-4xl font-semibold mb-1 pb-3
    bg-clip-text text-transparent 
    inline-block w-fit" style={{
                                    backgroundImage: `linear-gradient(90deg, #00DFFA 0%, #ffffff 40%, #ffffff 100%)`,
                                }}>
                                Language Models
                            </h2>

                            <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-md">
                                Global coverage across 200+ languages with state-of-the-art Indic and code-switch capabilities for exceptional accuracy.
                            </p>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="relative">

                            {/* RIGHT CONTENT */}
                            <div className="space-y-12">
                                {items.map((item, index) => {
                                    const isActive = active === index;

                                    return (
                                        <div
                                            key={index}
                                            onMouseEnter={() => setActive(index)}
                                            className={`
              group relative pl-8 border-l-4 transition-all cursor-pointer 
              ${isActive ? "border-[#1266ED]" : "border-gray-700"}
            `}
                                        >
                                            {/* Circle */}
                                            <span
                                                className={`
                absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition-all
                ${isActive ? "bg-[#1266ED] scale-110" : "bg-transparent"}
              `}
                                            />

                                            {/* Title */}
                                            <h3
                                                className={`
                text-xl font-semibold transition-colors
                ${isActive ? "text-white" : "text-gray-400"}
              `}
                                            >
                                                {item.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-400 mt-2 text-sm max-w-sm leading-relaxed">
                                                {item.desc}
                                            </p>

                                            {/* Learn More — same behaviour as previous component (no jump) */}
                                            <div className="mt-2 h-5">
                                                {isActive ? (
                                                    <Link
                                                        href={item.link}
                                                        className="text-[#1266ED] text-sm font-medium inline-flex items-center gap-1 hover:opacity-80"
                                                    >
                                                        Learn more <span className="text-base">→</span>
                                                    </Link>
                                                ) : (
                                                    <span className="opacity-0 pointer-events-none text-sm inline-flex items-center gap-1">
                                                        Learn more →
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>


                    </div>
                </section>








            </div>

            <div className="md:px-0 px-4 bg-[#0E1219] pb-10">
                <div
                    className="max-w-6xl bg-[#0E1219] p-8 md:p-16 rounded-2xl 
             border border-[#317cf487] w-full mx-auto 
             grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20
             
             transition-all duration-500 ease-out
             
             hover:shadow-[0_0_20px_2px_rgba(18,102,237,0.5)]
             hover:shadow-[#1266ED]/50"
                >

                    {/* LEFT SIDE */}
                    <div className="flex flex-col justify-start">
                        <h2 className="text-4xl font-semibold mb-1 pb-3
    bg-clip-text text-transparent 
    inline-block w-fit" style={{
                                backgroundImage: `linear-gradient(90deg, #1266ED 0%, #ffffff 40%, #ffffff 100%)`,
                            }}>
                            Specialized Models
                        </h2>

                        <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-md">
                            Domain-specific models that understand your use case, from specialised terminology to proper nouns and numerical entities.
                        </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative">

                        {/* RIGHT CONTENT */}
                        <div className="space-y-12">

                            <div className="group relative pl-8 border-l-4 border-gray-700 hover:border-[#1266ED] transition-all hover-dot cursor-pointer">

                                {/* Circle */}
                                <span
                                    className="
        absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all
        group-hover:bg-[#1266ED] group-hover:scale-110
      "
                                />

                                <h3 className="text-xl font-semibold text-gray-200 group-hover:text-white mt-8 md:mt-10 transition-colors">
                                    Zero STT Med
                                </h3>

                                <p className="text-gray-400 mt-2 text-sm max-w-sm leading-relaxed">
                                    Clinical-grade accuracy for medical transcription and healthcare terminology
                                </p>

                                {/* Learn More — only visible on hover */}
                                <Link
                                    href="/zero-med"
                                    className="
        text-[#1266ED] text-sm font-medium mt-2 inline-flex items-center gap-1 
        opacity-0 group-hover:opacity-100 transition-opacity
      "
                                >
                                    Learn more <span className="text-base">→</span>
                                </Link>

                            </div>

                        </div>


                    </div>

                </div>
            </div>

            <div className="md:px-0 px-4 bg-[#0E1219] pb-20 md:pt-10">
                <div
                    className="max-w-6xl bg-[#0E1219] p-8 md:p-16 rounded-2xl 
             border border-[#317cf487] w-full mx-auto 
             grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20
             
             transition-all duration-500 ease-out
             
             hover:shadow-[0_0_20px_2px_rgba(18,102,237,0.5)]
             hover:shadow-[#1266ED]/50"
                >

                    {/* LEFT SIDE */}
                    <div className="flex flex-col justify-start">
                        <h2 className="text-4xl font-semibold mb-1 pb-3
    bg-clip-text text-transparent 
    inline-block w-fit" style={{
                                backgroundImage: `linear-gradient(90deg, #9064E9 0%, #ffffff 40%, #ffffff 100%)`,
                            }}>
                            On-Device Models
                        </h2>

                        <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-md">
                            Lightweight, high-performance models that run locally without compromising accuracy.
                        </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative">



                        {/* RIGHT CONTENT */}
                        <div className="space-y-12">

                            <div className="group relative pl-8 border-l-4 border-gray-700 hover:border-[#1266ED] transition-all hover-dot cursor-pointer">

                                {/* Circle */}
                                <span
                                    className="
        absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all
        group-hover:bg-[#1266ED] group-hover:scale-110
      "
                                />

                                <h3 className="text-xl font-semibold text-gray-200 group-hover:text-white mt-8 md:mt-10 transition-colors">
                                    Zero Tinny ONNX
                                </h3>

                                <p className="text-gray-400 mt-2 text-sm max-w-sm leading-relaxed">
                                    Compact ONNX format for accurate on-device transcription
                                </p>

                                {/* Learn More — only visible on hover */}
                                <Link
                                    href="/on-device-models"
                                    className="
        text-[#1266ED] text-sm font-medium mt-2 inline-flex items-center gap-1
        opacity-0 group-hover:opacity-100 transition-opacity
      "
                                >
                                    Learn more <span className="text-base">→</span>
                                </Link>

                            </div>

                        </div>


                    </div>

                </div>
            </div>

            <HomeFooter />
            <MainFooter />

        </div>
    )
}

export default page