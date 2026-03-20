import React from 'react'
import Navbar from '../Layouts/Navbar'
import HomeFooter from '../Layouts/HomeFooter'
import MainFooter from '../Layouts/MainFooter'
import FeatureQuadrant3 from '../components/FeatureQuadrant3'
import Link from 'next/link'
import FeatureQuadrant from '../components/FeatureQuadrant';
import { RiWifiOffLine } from "react-icons/ri";
import { FiCpu, FiCode } from "react-icons/fi";
import { TbBolt } from "react-icons/tb";


function page() {

    const features = [
        {
            title: "Offline-ready",
            desc: "Operates without network connectivity or in low-bandwidth environments",
            icon: <RiWifiOffLine className="text-[#30ccf3] text-2xl" />
        },
        {
            title: "Lightweight models",
            desc: "Optimized edge architectures for resource-constrained devices",
            icon: <FiCpu className="text-[#30ccf3] text-2xl" />
        },
        {
            title: "ONNX format",
            desc: "Portable models deploy seamlessly across iOS, Android, Linux, and embedded systems",
            icon: <FiCode className="text-[#30ccf3] text-2xl" />
        },
        {
            title: "Low latency",
            desc: "Fast local processing without round-trip delays",
            icon: <TbBolt className="text-[#30ccf3] text-2xl" />
        }
    ];

    return (
        <div>
            <div className="min-h-screen bg-[#0C0B10] text-white pt-20">
                <Navbar />
                <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto px-6">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight m-auto">
                            On device speech-to-text for real-time transcription
                        </h1>

                        <h2 className="mt-6 text-lg md:text-2xl max-w-5xl text-gray-300 mx-auto">
                            Run fast, accurate speech-to-text directly on your devices with Shunya Labs’ ONNX-based English ASR model
                        </h2>
                    </div>
                </section>

                <section className="py-12 bg-[#0B0B0F] text-white px-6">
                    <div className="max-w-5xl mx-auto">

                        {/* GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                            {features.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl p-8
                                border border-[#1A253A]
                                hover:scale-[1.02] transition-all
                                bg-gradient-to-br from-[#0D0F14] to-[#11161F]"
                                >
                                    <div className="flex items-start gap-4">

                                        {/* Icon */}
                                        <div className="p-4 flex items-center justify-center rounded-2xl bg-[#09354D]">
                                            {item.icon}
                                        </div>

                                        {/* Text */}
                                        <div>
                                            <h3 className="text-xl font-semibold">{item.title}</h3>
                                            <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Bottom Text */}
                        <p className="text-center text-gray-300 mt-10 text-base md:text-lg">
                            Ideal for healthcare, automotive, mobile apps, and privacy-critical use cases.
                        </p>

                    </div>
                </section>
                <FeatureQuadrant
                    heading="Tiny ONNX model, big performance"
                    subheading="highly optimized ONNX model tailored for real-time English transcription"
                    rows={[
                        {
                            desc: `Small enough to fit on edge devices\nand existing servers without a\nhardware refresh`,
                            title: "Lightweight",
                        },
                        {
                            title: "Fast",
                            desc: `Transcribes as people speak,\nwith sub-100 ms latency for partials`,
                        },
                        {
                            desc: `Trained on high entropy data to\nachieve industry best 3.10% WER`,
                            title: "Accurate",
                        },
                    ]}
                />
            </div>

            <div className='text-center py-24 bg-[#0C0B10]'>
                <Link
                    href='contact'
                    className="px-10 py-3 rounded-full text-white text-base font-medium 
             bg-gradient-to-r from-[#145AE8] to-[#145AE8]
             hover:opacity-90 transition duration-300"
                >
                    Contact Us
                </Link>
            </div>

            <HomeFooter />
            <MainFooter />
        </div>
    )
}

export default page