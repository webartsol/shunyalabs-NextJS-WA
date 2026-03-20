import React from 'react'
import Navbar from '../Layouts/Navbar'
import Image from 'next/image';
import img1 from '../../../assets/icons/speechToText.png'
import img2 from '../../../assets/icons/Orch-int.png'
import img3 from '../../../assets/icons/textToSpeech.png'
import { FiMic, FiCpu, FiShield } from "react-icons/fi";
import MainFooter from '../Layouts/MainFooter';
import HomeFooter from '../Layouts/HomeFooter';
import Link from "next/link";



function page() {
    const items = [
        {
            icon: img1,
            title: "Speech-to-Text",
            desc: "Foundation models convert audio to text across 200+ languages",
        },
        {
            icon: img2,
            title: "Orchestration Intelligence",
            desc: "Manages context, memory, behavior, and LLM integration",
        },
        {
            icon: img3,
            title: "Text-to-Speech",
            desc: "Generates natural-sounding voice responses",
        },
    ];

    const cardData = [
        {
            title: "Simple Voice Agent Integration",
            desc: "Single API integrating speech-to-text, LLM orchestration, and text-to-speech—no complex service integration required.",
            icon: <FiMic className="text-xl" />,
        },
        {
            title: "Optimized Full-Stack Performance",
            desc: "Custom-built voice stack with optimized STT, TTS, and runtime orchestration delivering minimal latency and maximum accuracy.",
            icon: <FiCpu className="text-xl" />,
        },
        {
            title: "Flexible Deployment Options",
            desc: "Deploy fully managed or self-hosted with complete HIPAA and GDPR compliance support.",
            icon: <FiShield className="text-xl" />,
        },
    ];

    return (

        <div className="min-h-screen bg-[#0B0A0F] text-white pt-20">
            <Navbar />

            {/* Hero Section */}
            <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight m-auto">
                        Everything you need to build a Voice Agent
                    </h1>

                    <h2 className="mt-6 text-lg md:text-xl text-gray-300">
                        Build complete voice agents with Shunya Labs' intelligence layer—a fully integrated platform from voice input to intelligent response.
                    </h2>
                </div>
            </section>

            <section className="w-full bg-[#0E1219] pt-40 pb-20 relative overflow-visible">

                {/* TOP DARK STRIP (same as Figma) */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-[#0B0A0F]" />

                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">

                    {/* 3 icons row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20">

                        {items.map((item, i) => (
                            <div key={i} className="flex flex-col items-center">

                                {/* FLOATING ICON */}
                                <div className="md:-mt-20 mb-6">
                                    <Image
                                        src={item.icon}
                                        width={75}
                                        height={75}
                                        alt={item.title}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-white text-lg font-semibold mb-2">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-sm max-w-[260px] leading-relaxed">
                                    {item.desc}
                                </p>

                            </div>
                        ))}

                    </div>

                    <Link
                        href="/contact"
                        className="px-10 py-3 rounded-full text-white text-base font-medium 
    bg-gradient-to-r from-[#2d58c5] to-[#145AE8]
    hover:opacity-90 transition duration-300 mt-8 md:mt-20 inline-block"
                    >
                        Contact us
                    </Link>


                </div>
            </section>

            <section className="text-white py-20 px-6 md:px-12 lg:px-20 mt-10">
                <div className="max-w-7xl mx-auto text-center">

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Build with Shunya Labs for an End-to-End Solution
                    </h2>

                    <p className="text-gray-400 max-w-4xl mx-auto text-lg md:text-xl mb-14">
                        One unified API delivering developer simplicity and enterprise-grade orchestration in a single platform.
                    </p>

                    {/* Cards Grid */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">

                        {cardData.map((card, index) => (
                            <div
                                key={index}
                                className="
            p-10 rounded-2xl text-center
            border border-white/10  
            bg-gradient-to-b from-[#0D0F14] to-[#11161F]
            shadow-[0_0_30px_rgba(0,0,0,0.35)]
            transition-all duration-300
            hover:border-[#1A73FF]
            hover:shadow-[0_0_40px_rgba(26,115,255,0.35)]
          "
                            >
                                {/* Icon Wrapper */}
                                <div className="
            w-12 h-12 mx-auto mb-6 rounded-full 
            bg-[#1A1F27] flex justify-center items-center 
            text-white
          ">
                                    {card.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg md:text-xl font-semibold mb-4">
                                    {card.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            <HomeFooter />
            <MainFooter />

        </div>
    )
}

export default page