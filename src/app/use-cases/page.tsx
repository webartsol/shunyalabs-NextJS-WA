"use client";
import React from "react";
import Image from "next/image";
import Navbar from "../Layouts/Navbar";
import { FiBookOpen, FiCode, FiCloud, FiUser } from "react-icons/fi"; // replace with your icons
import Link from "next/link";
import img1 from '../../../assets/images/use-case1.jpg';
import img2 from '../../../assets/images/voice-agent.jpg';
import img3 from '../../../assets/images/medical-doc.jpg';
import img4 from '../../../assets/images/contact-center.jpg';
import FeatureShowcase from "../components/FeatureShowcase";
import { RiRobot2Line } from "react-icons/ri";
import { LuBriefcaseMedical } from "react-icons/lu";
import { FaHeadset } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";
import MainFooter from "../Layouts/MainFooter";
import HomeFooter from "../Layouts/HomeFooter";

export default function Page() {
    const items = [
        {
            icon: <FiBookOpen className="text-[#4BA3F5] text-xl md:text-3xl" />,
            title: "Custom vocabularies",
            desc: "Add custom vocabularies and pronunciations to specialized models",
        },
        {
            icon: <FiCode className="text-[#4BA3F5] text-xl md:text-3xl" />,
            title: "Business logic integration",
            desc: "Embed your rules, workflows, and context",
        },
        {
            icon: <FiCloud className="text-[#4BA3F5] text-xl md:text-3xl" />,
            title: "Flexible deployment",
            desc: "Cloud, edge, or on-premises based on your needs",
        },
        {
            icon: <FiUser className="text-[#4BA3F5] text-xl md:text-3xl" />,
            title: "Speaker identification",
            desc: "Register workplace voices for personalized speaker tags",
        },
        {
            icon: <FiCode className="text-[#4BA3F5] text-xl md:text-3xl" />,
            title: "Structured outputs",
            desc: "Format data for seamless system integration",
        },
    ];

    return (
        <>
            <div className="bg-[#0F0920] min-h-screen text-white py-10 md:py-20">
                <Navbar />

                {/* Hero Section */}
                <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto px-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight m-auto">
                            Enterprise Use Cases
                        </h1>
                        <div className="mt-10 md:mt-[100px] rounded-2xl overflow-hidden w-full">
                            <div className="relative w-full h-[180px] md:h-[400px]">
                                <Image
                                    src={img1}
                                    alt="Enterprise Use Cases"
                                    fill
                                    className="object-cover object-center"
                                    priority
                                />
                            </div>
                        </div>

                    </div>

                </section>

                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-xl md:text-2xl font-semibold">
                        Custom applications tailored to your specific context and workflows.
                    </h2>

                    <div className="md:pl-16 grid grid-cols-1 md:grid-cols-2 md:gap-x-24 gap-y-8 md:gap-y-14 mt-10 md:mt-20">

                        {items.map((item, index) => (
                            <div key={index} className="flex items-start gap-4">

                                {/* Icon box */}
                                <div className="mt-2 md:mt-0 md:w-16 md:h-16 bg-[#0E1A35] rounded-xl flex items-center justify-center">
                                    {item.icon}
                                </div>

                                {/* Text LEFT aligned */}
                                <div className="text-left">
                                    <h3 className="text-white text-base font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1 max-w-sm">
                                        {item.desc}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="py-10 md:py-20 flex flex-col gap-10 md:gap-16">
                        <FeatureShowcase
                            icon={<RiRobot2Line />}
                            title="Voice Agents & Assistants"
                            description="Conversational automation with intelligent action execution."
                            image={img2.src}
                            imagePosition="left"
                            points={[
                                { title: "200+ language", desc: "Wide coverage with multilingual support" },
                                { title: "Context-aware", desc: "Understands your business workflows" },
                                { title: "One integration", desc: "Single API for workflows & automation" },
                                { title: "Custom entities", desc: "Recognizes your business terminology" }
                            ]}
                            link='/voice-agent'
                        />

                        <FeatureShowcase
                            icon={<LuBriefcaseMedical />}
                            title="Medical Documentation"
                            description="Clinical-grade speech recognition with structured EHR integration."
                            image={img3.src}
                            imagePosition="right"
                            points={[
                                { title: "Medical specialized", desc: "Trained on medications, procedures, and diagnoses" },
                                { title: "Noise-optimized ", desc: "Performs in clinical environments with equipment noise" },
                                { title: "Structured outputs", desc: "Direct FHIR, HL7, and EHR format compatibility" },
                                { title: "HIPAA-compliant", desc: "On-premises or dedicated tenant deployment" }
                            ]}
                            link='/healthcare'
                        />

                        <FeatureShowcase
                            icon={<FaHeadset />}
                            title="Contact Center Intelligence"
                            description="Real-time analytics and agent assistance with conversational insights."
                            image={img4.src}
                            imagePosition="left"
                            points={[
                                { title: "Live transcription ", desc: "Streaming ASR with <100ms latency for continuous support" },
                                { title: "Emotion tracking ", desc: "Speaker-level sentiment throughout conversations" },
                                { title: "Agent assist", desc: "Real-time guidance for upsell opportunities" },
                                { title: "Automated ticketing", desc: "Structured extraction with CRM integration" }
                            ]}
                            link='/contact-centers'
                        />

                        <FeatureShowcase
                            icon={<TbUsers />}
                            title="Meeting Transcription"
                            description="High-fidelity capture with speaker attribution and structured output."
                            image={img4.src}
                            imagePosition="right"
                            points={[
                                { title: "Speaker diarization", desc: "Identifies who said what, even with crosstalk" },
                                { title: "Numerical extraction", desc: "Captures amounts, dates, and percentages accurately" },
                                { title: "Word timestamps", desc: "Precise alignment for video synchronization" },
                                { title: "Custom vocabulary", desc: "Recognizes brand names and proper nouns" }
                            ]}
                            link="/contact"
                        />
                    </div>
                </div>

            </div>
            <HomeFooter />
            <MainFooter />
        </>
    );
}
