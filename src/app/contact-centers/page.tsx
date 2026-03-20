import type { Metadata } from "next";
import FeatureCard from "@/app/Layouts/FeatureCard";
import Navbar from "@/app/Layouts/Navbar";
import { IoPlayOutline } from "react-icons/io5";
import img1 from '../../../assets/images/call-center1.jpg';
import img2 from '../../../assets/images/call-center2.jpg';
import img3 from '../../../assets/images/call-center3.jpg';
import Footer from "@/app/Layouts/Footer";
import MainFooter from "@/app/Layouts/MainFooter";
import Link from "next/link";

export default function ContactCenters() {
    return (
        <>
            <div className="solution-bg pt-24">
                <Navbar />

                <section className="relative text-white md:py-24 py-16 text-center ">

                    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                        {/* Title + Description */}
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">Intelligence That Listens. APIs That Power Contact Centers</h1>
                        <p className="mt-6 text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto">
                            Real-time transcription, analytics, and voice automation — plug-and-play intelligence for every conversation.
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
                        title="End-to-end support infra—secure, compliant, structured"
                        image={img1}
                        imagePosition="right"
                        points={[
                            {
                                heading: 'Get structured data',
                                description:
                                    'Convert messages & attachments to structured fields with smart OCR + LLM reasoning. Pull out intent, product, issue type, account data, and promised actions—export as CRM/ITSM-ready JSON.',
                            },
                            {
                                heading: 'QA & compliance',
                                description:
                                    'Auto-check script adherence and policies, redact card details and personal data, and keep full trails with audit-friendly logs.',
                            },
                            {
                                heading: 'Secure by design',
                                description:
                                    'Deploy in your private cloud or on-premises. CPU-efficient, cost-controlled, and built for strict privacy and uptime.',
                            },
                        ]}
                    />

                    <FeatureCard
                        title="Equip agents to win and lift your CSAT"
                        image={img2}
                        imagePosition="left"
                        points={[
                            {
                                heading: 'Cue agents in real-time',
                                description:
                                    'Live captions, knowledge-base lookups, and “next best response” with steady sub-second speed. Embed in any agent desktop or cloud contact-center platform.',
                            },
                            {
                                heading: 'Automate procedures',
                                description:
                                    'Detect intent and complete common requests end-to-end. Smart routing sends complex cases to the right expert—no dropped balls.',
                            },
                            {
                                heading: 'Understand every customer ',
                                description:
                                    'Transcripts in 120+ languages—accent-aware, and code-switching smart—built for real-world noise.',
                            },
                        ]}
                    />


                    <FeatureCard
                        title="Get post-call intelligence to see the bigger picture"
                        image={img3}
                        imagePosition="right"
                        points={[
                            {
                                heading: 'Analytics',
                                description:
                                    'Auto-generate call summaries, sentiment, topics, and trends with searchable transcripts—export to QA tools and your data lake.',
                            },
                            {
                                heading: 'Insights-driven coaching',
                                description:
                                    'Get sentiment analysis and trends from every transcript and turn knowledge from every conversation into agent coaching that lifts performance in real time.',
                            },
                            {
                                heading: 'Be future ready with features',
                                description:
                                    'Partner with an R&D leader—continuous model upgrades and new features without re-platforming.',
                            },
                        ]}
                    />
                </div>
            </div>
            <Footer text='Make your call center smart and future ready today.' />
            <MainFooter/>

        </>
    )
}