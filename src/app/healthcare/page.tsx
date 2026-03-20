import type { Metadata } from "next";
import FeatureCard from "@/app/Layouts/FeatureCard";
import Navbar from "@/app/Layouts/Navbar";
import { IoPlayOutline } from "react-icons/io5";
import img1 from '../../../assets/images/healthcare1.jpg';
import img2 from '../../../assets/images/heathcare2.jpg';
import img3 from '../../../assets/images/healthcare3.jpg';
import Footer from "@/app/Layouts/Footer";
import MainFooter from "@/app/Layouts/MainFooter";
import Link from "next/link";

export default function Healthcare() {
    return (
        <>
            <div className="solution-bg pt-24">
                <Navbar />

                <section className="relative text-white md:py-24 py-16 text-center ">

                    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                        {/* Title + Description */}
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">Intelligence That Cares. APIs That Power Clinical Systems.</h1>
                        <p className="mt-6 text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto">
                            Modular clinical AI — speech, reasoning, and documentation built for accuracy, privacy, and scale.
                        </p>

                        {/* 🎬 Live Demo Button */}
                        <Link href="/">
                        <button
                            className="md:mt-10 mt-5 flex items-center justify-center mx-auto gap-2 text-white font-medium px-6 py-2 rounded-full bg-gradient-to-r from-[#9333EA] to-[#412081] hover:opacity-90 shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300"
                        >
                            <IoPlayOutline style={{ fontSize: "20px", marginTop: "2px" }} />
                            Live Demo
                        </button>
                        </Link>
                    </div>
                </section>

                <div className="md:px-0 px-4 max-w-7xl m-auto md:pt-12 pt-8 md:pb-24 pb-16 flex flex-col items-center justify-center md:gap-12 gap-4">
                    <FeatureCard
                        title="Capture clinical encounters—accurate, structured, compliant"
                        image={img1}
                        imagePosition="right"
                        points={[
                            {
                                heading: 'Real-time clinical transcription',
                                description:
                                    '<3% WER, noise-resilient, tuned for medical vocab with clean labels for Doctor/Patient/Nurse. ',
                            },
                            {
                                heading: 'Speaker-aware notes',
                                description:
                                    'Automatic diarization for clear who-said-what and action items.',
                            },
                            {
                                heading: 'Secure by design',
                                description:
                                    'HIPAA-ready APIs & SDKs; deploy in your private cloud or on-prem.',
                            },
                        ]}
                    />

                    <FeatureCard
                        title="Turn paperwork into EMR-ready data"
                        image={img2}
                        imagePosition="left"
                        points={[
                            {
                                heading: 'Advanced healthcare OCR',
                                description:
                                    'Handwritten prescriptions, scans, lab forms, and tabular reports—no sweat.',
                            },
                            {
                                heading: 'Reasoning engine',
                                description:
                                    'LLM-powered understanding to normalize and disambiguate clinical meaning.',
                            },
                            {
                                heading: 'Structured outputs',
                                description:
                                    'Diagnoses, labs, vitals, prescriptions—exported as EMR-ready JSON.',
                            },
                        ]}
                    />


                    <FeatureCard
                        title="Safer prescribing and stigma-free virtual care"
                        image={img3}
                        imagePosition="right"
                        points={[
                            {
                                heading: 'Prescription validation',
                                description:
                                    'Real-time alerts for drug–drug and drug–disease risks, backed by a clinical knowledge graph.',
                            },
                            {
                                heading: 'Healthcare AI SDK',
                                description:
                                    'CBT, mindfulness, and coaching with clinical guardrails; detects risk and escalates safely.',
                            },
                            {
                                heading: 'Easy to integrate',
                                description:
                                    'Plug into EMRs and telehealth in minutes; clinician dashboard, multi-language support.',
                            },
                        ]}
                    />
                </div>
            </div>
            <Footer text='Provide safe, customised and instant care to your patients .'/>
            <MainFooter/>
        </>
    )
}