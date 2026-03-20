import React from 'react'
import Navbar from '../Layouts/Navbar';
import { MdOutlineStickyNote2 } from "react-icons/md";
import HomeFooter from '../Layouts/HomeFooter';
import MainFooter from '../Layouts/MainFooter';
import Link from 'next/link';

function page() {

    const patents = [
        "Translation with Clinical Precision",
        "Text to emotion vector generation",
        "LLM Hallucination Mitigation",
        "Fake information classification",
        "Clinician like Discharge Summary generation",
        "Causality driven Graph Neural Network for Mental Health Prognosis",
        "Stochastic Actor Oriented Model driven Clinician Suggestion",
        "Clinical Case History Generation",
        "Deltawave guided wearable EEG happiness Monitors",
        "Interoperable EHR Taxonomy and Data Mapper",
        "Stella for Clinician",
        "Phoneme Viseme"
    ];

    return (
        <>
            <div className="bg-[#0B0B0F] min-h-screen text-white py-10 md:py-20">
                <Navbar />

                {/* Hero Section */}
                <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto px-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight m-auto">
                            Discover our ever-growing collection of patents.
                        </h1>
                    </div>
                </section>

                {/* ============================ */}
                {/*        PATENT LIST SECTION    */}
                {/* ============================ */}
                <div className="max-w-6xl mx-auto px-6 space-y-8 mt-5 md:mt-10">

                    {patents.map((title, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 bg-[#0C1223] 
                            border border-[#1A253A] rounded-xl px-6 py-4 md:py-5 
                            hover:bg-[#111A2F] transition-all cursor-pointer"
                        >
                            {/* Badge */}
                            <div className="flex items-center justify-center w-12 h-12 border border-[#0b84fe26] rounded-md bg-[#141C35]">
                                <span className="text-[#0B86FE] text-2xl font-semibold tracking-wide">
                                    <MdOutlineStickyNote2 />
                                </span>
                            </div>

                            {/* Title */}
                            <div>
                                <span className='text-xs text-gray-400'>PATENT</span>
                                <p className="text-white text-lg">{title}</p>
                            </div>
                        </div>
                    ))}

                </div>

                <div className='text-center pt-16 md:pt-20 pb-6'>
                    <Link href='/contact'
                        className="px-10 py-3 rounded-full text-white text-base font-medium 
             bg-gradient-to-r from-[#361D83] to-[#145AE8]
             hover:opacity-90 transition duration-300 mt-10"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
            <HomeFooter />
            <MainFooter />
        </>
    )
}

export default page
