import React from 'react'
import Navbar from '../Layouts/Navbar'
import { TbLanguage, TbLanguageHiragana } from "react-icons/tb";
import { MdTranslate } from "react-icons/md";
import { RiSpeakLine, RiVoiceprintFill } from "react-icons/ri";
import { BsClockHistory } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";
import { PiDetectiveFill } from "react-icons/pi";
import { FaRegSmileBeam } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import FeatureSection from '../components/FeatureSection';
import { GoGlobe } from "react-icons/go";
import Link from "next/link";
import { FaRegKeyboard } from "react-icons/fa6";
import { TbReportMedical } from "react-icons/tb";
import HomeFooter from '../Layouts/HomeFooter';
import MainFooter from '../Layouts/MainFooter';


function page() {
    return (

        <div className="min-h-screen bg-[#0B0A0F] text-white pt-20">
            <Navbar />

            {/* Hero Section */}
            <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight m-auto">
                        Understand Every Conversation with
                        Intelligence Features
                    </h1>

                    <h2 className="mt-6 text-lg md:text-xl text-gray-300">
                        Full flexibility and control across multilingual support, smart formatting, conversational analytics, and advanced AI capabilities.
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

            <div className="max-w-6xl mx-auto px-6 pt-5 pb-12 text-white">

                {/* 1️⃣ LANGUAGE EXPERTISE */}
                <FeatureSection
                    heading="Language Expertise"
                    accentColor="#1266ED"
                    cardBgColor="#0C1223"
                    cards={[
                        {
                            title: "Language Identification",
                            desc: "Automatically detect the language in your audio files",
                            icon: <GoGlobe className="text-white text-2xl" />,
                            iconBg: "#1C2D4A",
                        },
                        {
                            title: "Translation",
                            desc: "Translate audio during or after transcription",
                            icon: <MdTranslate className="text-white text-2xl" />,
                            iconBg: "#1C2D4A",
                        },
                        {
                            title: "Transliteration",
                            desc: "Convert output to your preferred script",
                            icon: <TbLanguageHiragana className="text-white text-2xl" />,
                            iconBg: "#1C2D4A",
                        },
                    ]}
                />

                {/* 2️⃣ SMART FORMATTING */}
                <FeatureSection
                    heading="Smart Formatting"
                    accentColor="#764CCB"
                    cardBgColor="#1C1230"
                    cards={[
                        {
                            title: "Speaker Diarization",
                            desc: "Separate transcripts by speaker automatically",
                            icon: <RiSpeakLine className="text-white text-2xl" />,
                            iconBg: "#3D2370",
                        },
                        {
                            title: "Speaker Identification",
                            desc: "Customize speaker labels for personalized transcripts",
                            icon: <RiVoiceprintFill className="text-white text-2xl" />,
                            iconBg: "#3D2370",
                        },
                        {
                            title: "Word Timestamps",
                            desc: "Word-level timing for precise navigation",
                            icon: <BsClockHistory className="text-white text-2xl" />,
                            iconBg: "#3D2370",
                        },
                        {
                            title: "Profanity and Keyword Hashing",
                            desc: "Filter and mask profanity or custom keywords",
                            icon: <IoFilterSharp className="text-white text-2xl" />,
                            iconBg: "#3D2370",
                        },
                    ]}
                />

                {/* 3️⃣ CONVERSATIONAL INSIGHTS */}
                <FeatureSection
                    heading="Conversational Insights"
                    accentColor="#00DFFA"
                    cardBgColor="#0B1F29"
                    cards={[
                        {
                            title: "Intent Detection",
                            desc: "Understand the purpose behind every conversation",
                            icon: <PiDetectiveFill className="text-white text-2xl" />,
                            iconBg: "#144B59",
                        },
                        {
                            title: "Sentiment Analysis",
                            desc: "Track emotional tone across interactions",
                            icon: <FaRegSmileBeam className="text-white text-2xl" />,
                            iconBg: "#144B59",
                        },
                        {
                            title: "Emotion Diarization",
                            desc: "Get clearer emotion tracking throughout conversations",
                            icon: <FaRegSmileBeam className="text-white text-2xl" />,
                            iconBg: "#144B59",
                        },
                        {
                            title: "Summarisation",
                            desc: "Generate concise summaries from audio or text",
                            icon: <GiDiscussion className="text-white text-2xl" />,
                            iconBg: "#144B59",
                        },
                    ]}
                />

            </div>


            <div className='bg-[#0C0024] pt-16 pb-5 px-6 md:px-10'>

                <div className='max-w-6xl mx-auto text-white'>
                    <FeatureSection
                        heading="Advanced Features"
                        accentColor="#15213F"
                        cardBgColor="#0C1223"
                        cards={[
                            {
                                title: "Keyword Normalisation",
                                desc: "Standardize brand names, acronyms, and custom terminology",
                                icon: <FaRegKeyboard className="text-white text-2xl" />,
                                iconBg: "#11161F",
                            },
                            {
                                title: "Medical Keyterm Correction",
                                desc: "Ensure accurate transcription of medical terminology",
                                icon: <TbReportMedical className="text-white text-2xl" />,
                                iconBg: "#11161F",
                            }
                        ]}
                    />
                </div>
            </div>

            <HomeFooter />
            <MainFooter />
        </div>
    )
}

export default page