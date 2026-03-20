"use client";
import React, { useState } from 'react'
import { DOCS_URL } from '../utils/constants';
import Navbar from '../Layouts/Navbar'
import { FiZap, FiRefreshCw, FiSettings } from "react-icons/fi";
import { FiGlobe, FiType, FiLayers } from "react-icons/fi";
import { PiTranslateBold } from "react-icons/pi";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosStarHalf } from "react-icons/io";
import { LuBrain } from "react-icons/lu";
import { BiText } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { PiSpeakerHighLight } from "react-icons/pi";
import { ChevronRight } from "lucide-react";
import { PiSlidersBold } from "react-icons/pi";
import { FiVolume2 } from "react-icons/fi";
import { FiCloud, FiWifi, FiDatabase } from "react-icons/fi";
import HomeFooter from '../Layouts/HomeFooter';
import MainFooter from '../Layouts/MainFooter';
import Link from 'next/link';


function page() {

    const [active, setActive] = useState(0);

    const items = [
        {
            title: "Language Models",
            desc: "Comprehensive multilingual support for 200+ languages, including Indic languages",
            link: "/language-models",
        },
        {
            title: "Specialized Models",
            desc: "Purpose-built for specific industries and use cases",
            link: "/domain-specialisation",
        },
        {
            title: "On-Device Models",
            desc: "Lightweight models optimized for edge deployment",
            link: "/on-device-models",
        },
    ];

    return (
        <div className="relative z-[99] min-h-screen bg-[#0B0B0F] overflow-hidden text-white">
            <Navbar />

            <section className="relative text-white md:py-16 py-12 mt-[160px] mb-[80px] text-center">
                <div className="max-w-4xl mx-auto px-6">

                    {/* Title Line 1 */}
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        The Complete Voice AI Stack for
                    </h1>

                    {/* Title Line 2 - Gradient */}
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-2 
                        bg-gradient-to-r from-[#1266ED] to-[#9064E9] bg-clip-text text-transparent">
                        Developers and Enterprises
                    </h1>

                    {/* Sub text section */}
                    <div className="flex items-center justify-center gap-10 mt-16 text-sm md:text-base">

                        <div className="flex flex-col items-center">
                            <span className="text-gray-400 text-xl">BUILT FOR</span>
                            <span className="text-[#1266ED] font-semibold text-lg">Developers</span>
                        </div>

                        <div className="h-12 w-px bg-gray-700"></div>

                        <div className="flex flex-col items-center">
                            <span className="text-gray-400 text-xl">READY FOR</span>
                            <span className="text-[#9064E9] font-semibold text-lg">Enterprises</span>
                        </div>

                    </div>

                </div>
            </section>


            <section className="w-full bg-[#0C0024] text-white py-28 flex justify-center">
                <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-3xl md:text-4xl font-bold leading-snug">
                            Foundation Models Built <br /> for Every Need
                        </h2>

                        <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-md">
                            Choose from our suite of specialized models designed for exceptional
                            language support, tailored use cases, and flexible deployment.
                        </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative">


                        {/* <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">

                            <div className="w-[3px] h-24 bg-white/60"></div>

                            <div className="w-[3px] h-24 bg-[#1266ED] relative mt-12">
                                <div className="w-4 h-4 rounded-full bg-[#1266ED] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
                            </div>

                            <div className="w-[3px] h-24 bg-white/60 mt-16"></div>
                        </div> */}

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

                                        {/* Learn More — ONLY SHOW when active */}
                                        {isActive ? (
                                            <Link
                                                href={item.link}
                                                className="text-[#1266ED] text-sm font-medium mt-2 inline-flex items-center gap-1 hover:opacity-80"
                                            >
                                                Learn more <span className="text-base">→</span>
                                            </Link>
                                        ) : <div
                                            className="text-[#0C0024] text-sm font-medium mt-2 inline-flex items-center gap-1 hover:opacity-80"
                                        >
                                            Learn more <span className="text-base">→</span>
                                        </div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>


            <section className="w-full bg-[#171717] text-white py-24 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
                        End-to-End Voice Agent Orchestration
                    </h2>

                    {/* Subheading */}
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                        Build complete voice agents with Shunya Labs' intelligence layer—
                        a fully integrated platform from voice input to intelligent response.
                    </p>
                </div>

                {/* Features */}
                <div className="max-w-2xl mx-auto mt-10 md:mt-20 space-y-12">

                    {/* 1 — Simple Voice Agent Integration */}
                    <div className="flex items-start gap-5">
                        <div className="bg-[#0E1A32] border border-[#3c7dff4d] p-4 rounded-xl flex items-center justify-center">
                            <FiZap className="text-[#3C7CFF] text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">
                                Simple Voice Agent Integration
                            </h3>
                            <p className="text-gray-400 mt-2 leading-relaxed text-sm">
                                Get a single API with speech-to-text, LLM orchestration,
                                and text-to-speech in real time. No complex integrations—just seamless voice AI.
                            </p>
                        </div>
                    </div>

                    {/* 2 — Optimized Full-Stack Performance */}
                    <div className="flex items-start gap-5">
                        <div className="bg-[#0E1A32] border border-[#3c7dff4d] p-4 rounded-xl flex items-center justify-center">
                            <FiRefreshCw className="text-[#3C7CFF] text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">
                                Optimized Full-Stack Performance
                            </h3>
                            <p className="text-gray-400 mt-2 leading-relaxed text-sm">
                                Our custom-built voice stack optimizes every layer—STT, TTS,
                                and runtime orchestration—for minimal latency and synchronized speech-to-speech flow.
                            </p>
                        </div>
                    </div>

                    {/* 3 — Flexible Deployment Options */}
                    <div className="flex items-start gap-5">
                        <div className="bg-[#0E1A32] border border-[#3c7dff4d] p-4 rounded-xl flex items-center justify-center">
                            <FiSettings className="text-[#3C7CFF] text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">
                                Flexible Deployment Options
                            </h3>
                            <p className="text-gray-400 mt-2 leading-relaxed text-sm">
                                Deploy fully managed or self-hosted. Full support for HIPAA and GDPR compliance.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="w-full bg-[#0B0B0F] text-white py-20 px-6">

                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-6">
                        Intelligence Features That Give You Control
                    </h2>
                    <p className="text-gray-500 max-w-5xl mx-auto text-lg md:text-xl mb-8 md:mb-16">
                        Unlock powerful AI capabilities with flexible transcription features designed for precision and insight.
                    </p>
                </div>

                <div className="bg-[#121316] rounded-3xl p-6 md:p-10 border border-white/5 w-full max-w-5xl mx-auto">

                    {/* Header Row */}
                    <div className="flex items-center md:justify-center gap-4 mb-8">
                        <div className="md:w-14 md:h-14 w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A73FF] to-[#0049B7] flex items-center justify-center">
                            <PiTranslateBold className="text-white text-xl md:text-3xl" />
                        </div>
                        <h3 className="text-lg md:text-2xl font-semibold text-white">Language Expertise</h3>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/10 mb-10"></div>

                    {/* 3 Columns in same row */}
                    <div className="flex items-start flex-col md:flex-row justify-between gap-10">

                        {/* COLUMN 1 */}
                        <div className="flex flex-col w-100 md:w-1/3">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                                <FiGlobe className="text-gray-300 text-2xl" />
                            </div>
                            <h4 className="font-semibold text-white mb-1">Language Identification</h4>
                            <p className="text-gray-400 text-sm">Automatically detect the language in your audio files.</p>
                        </div>

                        {/* DIVIDER */}
                        <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-[#1A73FF] to-transparent opacity-40"></div>

                        {/* COLUMN 2 */}
                        <div className="flex flex-col w-100 md:w-1/3">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                                <PiTranslateBold className="text-gray-300 text-2xl" />
                            </div>
                            <h4 className="font-semibold text-white mb-1">Translation</h4>
                            <p className="text-gray-400 text-sm">Translate audio during or after transcription.</p>
                        </div>

                        {/* DIVIDER */}
                        <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-[#1A73FF] to-transparent opacity-40"></div>

                        {/* COLUMN 3 */}
                        <div className="flex flex-col w-100 md:w-1/3">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                                <FiType className="text-gray-300 text-2xl" />
                            </div>
                            <h4 className="font-semibold text-white mb-1">Transliteration</h4>
                            <p className="text-gray-400 text-sm">Convert output to your preferred script.</p>
                        </div>

                    </div>
                </div>

                <div className="bg-[#121316] rounded-3xl  p-6 md:p-10 border border-white/5 w-full max-w-5xl mx-auto mt-16">

                    {/* Header Row */}
                    <div className="flex items-center md:justify-center gap-4 mb-8">
                        <div className="md:w-14 md:h-14 w-12 h-12 rounded-xl bg-gradient-to-br from-[#9064E9] to-[#340F7F] flex items-center justify-center">
                            <FaRegMessage className="text-white text-xl md:text-3xl" />
                        </div>
                        <h3 className="text-lg md:text-2xl font-semibold text-white">Conversational Insights</h3>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/10 mb-10"></div>

                    {/* 3 Columns in same row */}
                    <div className="flex items-start flex-col md:flex-row justify-between gap-10">

                        {/* COLUMN 1 */}
                        <div className="flex flex-col w-100 md:w-1/3">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                                <LuBrain className="text-gray-300 text-2xl" />
                            </div>
                            <h4 className="font-semibold text-white mb-1">Intent Detection</h4>
                            <p className="text-gray-400 text-sm">Understand the purpose behind every conversation</p>
                        </div>

                        {/* DIVIDER */}
                        <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-[#9064E9] to-transparent opacity-40"></div>

                        {/* COLUMN 2 */}
                        <div className="flex flex-col w-100 md:w-1/3">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                                <IoIosStarHalf className="text-gray-300 text-2xl" />
                            </div>
                            <h4 className="font-semibold text-white mb-1">Sentiment Analysis</h4>
                            <p className="text-gray-400 text-sm">Track emotional tone across interactions.</p>
                        </div>

                        {/* DIVIDER */}
                        <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-[#9064E9] to-transparent opacity-40"></div>

                        {/* COLUMN 3 */}
                        <div className="flex flex-col w-100 md:w-1/3">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                                <FaRegMessage className="text-gray-300 text-2xl" />
                            </div>
                            <h4 className="font-semibold text-white mb-1">Emotion Diarization</h4>
                            <p className="text-gray-400 text-sm">Get granular emotion tracking throughout conversations</p>
                        </div>

                    </div>
                </div>

                <div className="bg-[#121316] rounded-3xl  p-6 md:p-10 border border-white/5 w-full max-w-5xl mx-auto mt-16">

                    {/* Header Row */}
                    <div className="flex items-center md:justify-center gap-4 mb-8">
                        <div className="md:w-14 md:h-14 w-12 h-12 rounded-xl bg-gradient-to-br from-[#047CAE] to-[#003B54] flex items-center justify-center">
                            <BiText className="text-white text-xl md:text-3xl" />
                        </div>
                        <h3 className="text-lg md:text-2xl font-semibold text-white">Smart Formatting</h3>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/10 mb-10"></div>

                    {/* 3 Columns in same row */}
                    <div className="flex items-start flex-col md:flex-row justify-between gap-10">

                        {/* COLUMN 1 */}
                        <div className="flex flex-col w-100 md:w-1/3">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                                <BsClock className="text-gray-300 text-2xl" />
                            </div>
                            <h4 className="font-semibold text-white mb-1">Timestamps</h4>
                            <p className="text-gray-400 text-sm">Sentence or word-level timing for precise navigation</p>
                        </div>

                        {/* DIVIDER */}
                        <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-[#047CAE] to-transparent opacity-40"></div>

                        {/* COLUMN 2 */}
                        <div className="flex flex-col w-100 md:w-1/3">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                                <BiText className="text-gray-300 text-2xl" />
                            </div>
                            <h4 className="font-semibold text-white mb-1">Speaker Diarization</h4>
                            <p className="text-gray-400 text-sm">Separate transcripts by speaker automatically</p>
                        </div>

                        {/* DIVIDER */}
                        <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-[#047CAE] to-transparent opacity-40"></div>

                        {/* COLUMN 3 */}
                        <div className="flex flex-col w-100 md:w-1/3">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                                <PiSpeakerHighLight className="text-gray-300 text-2xl" />
                            </div>
                            <h4 className="font-semibold text-white mb-1">Speaker Identification</h4>
                            <p className="text-gray-400 text-sm">Customize speaker labels for personalized transcripts</p>
                        </div>

                    </div>
                </div>


                <div className="flex justify-center mt-10 px-10 md:px-0 md:text-start text-center">
                    <Link
                        href={`${DOCS_URL}/features/diarization`} target="_blank" rel="noopener noreferrer"
                        className="text-blue-500 text-base my-5 md:text-lg font-semibold underline-offset-2 decoration-1 hover:text-blue-400 hover:decoration-2 transition-all inline-flex items-center gap-2"
                    >
                        See full list of features in documentation
                        <ChevronRight className="text-xl no-underline" />
                    </Link>
                </div>
            </section>


            <section className="w-full bg-[#0C0024] py-24 text-white">
                <div className="max-w-5xl mx-auto text-center px-6">

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        Studio-Quality Audio Processing
                    </h2>

                    {/* Subheading */}
                    <p className="text-gray-400 max-w-2xl text-xl mx-auto mb-16 leading-relaxed">
                        Deliver crystal-clear voice experiences with our proprietary audio tools.
                    </p>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">

                        {/* Card 1 */}
                        <div className="rounded-3xl bg-gradient-to-b from-[#111827]/60 to-[#0B0F19]/40 
                          border border-white/10 p-10 backdrop-blur-xl 
                          flex flex-col items-center text-center">

                            <div className="w-14 h-14 rounded-xl bg-[#1A73FF]/20 
                            flex items-center justify-center mb-6">
                                <PiSlidersBold className="text-[#1A73FF] text-3xl" />
                            </div>

                            <h3 className="text-xl font-semibold mb-3">Denoiser</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Remove background noise for pristine audio quality
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="rounded-3xl bg-gradient-to-b from-[#111827]/60 to-[#0B0F19]/40 
                          border border-white/10 p-10 backdrop-blur-xl 
                          flex flex-col items-center text-center">

                            <div className="w-14 h-14 rounded-xl bg-[#1A73FF]/20 
                            flex items-center justify-center mb-6">
                                <FiVolume2 className="text-[#1A73FF] text-3xl" />
                            </div>

                            <h3 className="text-xl font-semibold mb-3">Enhancement</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Optimize audio clarity and intelligibility
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            <section className="w-full bg-[#0B0B0F] py-24 text-white">
                <div className="max-w-6xl mx-auto text-center px-6">

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                        Deploy Anywhere, Your Way
                    </h2>

                    {/* Subheading */}
                    <p className="text-gray-400 max-w-2xl text-xl mx-auto mb-16 leading-relaxed">
                        Maintain complete control over your data with flexible hosting options.
                    </p>

                    {/* 3 Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">

                        {/* Cloud */}
                        <div className="rounded-3xl bg-gradient-to-b from-[#111827]/60 to-[#0B0F19]/40 
                          border border-white/10 p-10 backdrop-blur-xl 
                          flex flex-col items-center text-center">

                            <div className="w-14 h-14 rounded-xl bg-[#1A73FF]/20 flex items-center justify-center mb-6">
                                <FiCloud className="text-[#1A73FF] text-3xl" />
                            </div>

                            <h3 className="text-xl font-semibold mb-3">Cloud</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Scalable infrastructure for rapid deployment
                            </p>
                        </div>

                        {/* Edge */}
                        <div className="rounded-3xl bg-gradient-to-b from-[#111827]/60 to-[#0B0F19]/40 
                          border border-white/10 p-10 backdrop-blur-xl 
                          flex flex-col items-center text-center">

                            <div className="w-14 h-14 rounded-xl bg-[#1A73FF]/20 flex items-center justify-center mb-6">
                                <FiWifi className="text-[#1A73FF] text-3xl" />
                            </div>

                            <h3 className="text-xl font-semibold mb-3">Edge</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Low-latency processing at the network edge
                            </p>
                        </div>

                        {/* On-Premises */}
                        <div className="rounded-3xl bg-gradient-to-b from-[#111827]/60 to-[#0B0F19]/40 
                          border border-white/10 p-10 backdrop-blur-xl 
                          flex flex-col items-center text-center">

                            <div className="w-14 h-14 rounded-xl bg-[#1A73FF]/20 flex items-center justify-center mb-6">
                                <FiDatabase className="text-[#1A73FF] text-3xl" />
                            </div>

                            <h3 className="text-xl font-semibold mb-3">On-Premises</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Full data sovereignty and security control
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <HomeFooter />
            <MainFooter />
        </div>
    )
}

export default page
