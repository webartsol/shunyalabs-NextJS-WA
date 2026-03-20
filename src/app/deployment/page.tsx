"use client";
import React from 'react'
import Navbar from '../Layouts/Navbar'
import HomeFooter from '../Layouts/HomeFooter'
import MainFooter from '../Layouts/MainFooter'

import { FiCloud } from "react-icons/fi";
import { LuNetwork } from "react-icons/lu";
import { HiOutlineServer } from "react-icons/hi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Link from 'next/link';

function page() {

    const cards = [
        {
            icon: <FiCloud className="text-2xl text-blue-400" />,
            title: "Cloud",
            desc: "Fully managed infrastructure for rapid deployment and effortless scaling.",
            capabilities: [
                "Zero infrastructure management",
                "Instant auto-scaling",
                "Global low-latency access",
            ],
            ideal: "Startups and fast-growing companies prioritizing speed to market.",
        },
        {
            icon: <LuNetwork className="text-2xl text-blue-400" />,
            title: "Edge",
            desc: "Ultra-low latency processing at the network edge.",
            capabilities: [
                "Regional data residency",
                "Reduced bandwidth costs",
                "Continues during network disruptions",
            ],
            ideal:
                "Real-time applications, IoT, telecom, and multi-region deployments.",
        },
        {
            icon: <HiOutlineServer className="text-2xl text-blue-400" />,
            title: "On-Premises",
            desc: "Complete control within your infrastructure.",
            capabilities: [
                "Full data sovereignty",
                "Air-gapped deployment option",
                "Custom security integration",
            ],
            ideal:
                "Startups and fast-growing companies prioritizing speed to market.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#0B0A0F] text-white pt-20">
            <Navbar />

            {/* Hero Section */}
            <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight m-auto">
                        Deploy Anywhere, Your Way
                    </h1>

                    <h2 className="mt-6 text-lg md:text-xl text-gray-300">
                        Flexible deployment options for your security, performance, and compliance needs.
                    </h2>
                </div>
            </section>

            {/* Cards Section */}
            <section className="w-full bg-[#0B0B0F] py-10 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-white/10 bg-[#0F1117] p-8 shadow-xl 
                            hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 
                            flex flex-col"
                        >
                            {/* Icon + Title */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-lg bg-[#0B0C10] border border-white/10 flex items-center justify-center">
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-400 text-base leading-relaxed mb-6">
                                {card.desc}
                            </p>

                            {/* Capabilities */}
                            <h4 className="text-white font-semibold text-base mb-3">
                                Capabilities
                            </h4>

                            <ul className="space-y-2 mb-8">
                                {card.capabilities.map((cap, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <IoMdCheckmarkCircleOutline className="text-blue-400 text-base mt-[2px]" />
                                        <span className="text-gray-300 text-base">{cap}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Spacer to push Ideal box to bottom */}
                            <div className="flex-grow"></div>

                            {/* Ideal For Box */}
                            <div className="bg-[#0C1022] border border-white/10 rounded-xl p-4 mt-4">
                                <h5 className="text-blue-400 text-base font-semibold mb-1">
                                    Ideal for:
                                </h5>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {card.ideal}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className='text-center pt-8 pb-16 md:pt-12 md:pb-20'>
                <Link href='/contact'
                    className="px-10 py-3 rounded-full text-white text-base font-medium 
             bg-gradient-to-r from-[#361D83] to-[#145AE8]
             hover:opacity-90 transition duration-300 mt-10"
                >
                    Contact Us
                </Link>
            </div>

            <HomeFooter />
            <MainFooter />
        </div>
    )
}

export default page;
