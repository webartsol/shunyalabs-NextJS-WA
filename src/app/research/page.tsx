"use client";

import React from 'react';
import MainFooter from '../Layouts/MainFooter';
import Navbar from '../Layouts/Navbar';
import { FiFileText, FiArrowUpRight } from 'react-icons/fi';
import Link from 'next/link';

const papers = [
    {
        category: "RESEARCH PAPERS",
        title: "LLMs Will Always Hallucinate, and We Need to Live With This",
        date: "1 February, 2024",
        link: "https://arxiv.org/abs/2409.05746"
    },
    {
        category: "RESEARCH PAPERS",
        title: "The Vulnerability of Language Model Benchmarks: Do They Accurately Reflect True LLM Performance?",
        date: "2 December, 2024",
        link: "https://arxiv.org/abs/2412.03597"
    },
    {
        category: "RESEARCH PAPERS",
        title: "High-precision medical speech recognition through synthetic data and semantic correction: UNITED-MEDASR",
        date: "24 November, 2024",
        link: "https://arxiv.org/abs/2412.00055"
    },
    {
        category: "RESEARCH PAPERS",
        title: "First Train to Generate, then Generate to Train: UnitedSynT5 for Few-Shot NLI",
        date: "12 December, 2024",
        link: "https://arxiv.org/abs/2412.09263"
    },
    {
        category: "RESEARCH PAPERS",
        title: "Securing Well-Being: Exploring Security Protocols and Mitigating Risks in AI-Driven Mental Health Chatbots for Employees",
        date: "1 January, 2024",
        link: "https://www.researchgate.net/publication/377513888_Securing_Well-Being_Exploring_Security_Protocols_and_Mitigating_Risks_in_AI-Driven_Mental_Health_Chatbots_for_Employees"
    },
    {
        category: "RESEARCH PAPERS",
        title: "Chatbot-Enhanced Mental Health First Aid in Corporate Settings: Addressing Risks, Implementing Crisis Management, and Promoting Employee Well-Being",
        date: "10 November, 2024",
        link: "https://www.researchgate.net/publication/377508078_Chatbot-Enhanced_Mental_Health_First_Aid_in_Corporate_Settings_Addressing_Risks_Implementing_Crisis_Management_and_Promoting_Employee_Well-Being"
    },
    {
        category: "RESEARCH PAPERS",
        title: "Boosting Workplace Well-Being: A Novel Approach with a Mental Health Chatbot for Employee Engagement and Satisfaction",
        date: "12 January, 2024",
        link: "https://www.researchgate.net/publication/377510582_Boosting_Workplace_Well-Being_A_Novel_Approach_with_a_Mental_Health_Chatbot_for_Employee_Engagement_and_Satisfaction"
    }
];

export default function ResearchPaperPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0B0B0F] text-white pt-32 pb-20 px-6 font-sans">

                {/* Header Section */}
                <div className="max-w-6xl mx-auto text-center mb-20">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-loose tracking-wide text-white">
                        Our Research
                    </h1>
                </div>

                {/* Cards Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {papers.map((paper, index) => (
                        <Link
                            href={paper.link}
                            key={index}
                            className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#0F111A] border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 min-h-[300px]"
                        >
                            <div>
                                {/* Category Badge */}
                                <div className="flex items-center gap-2 text-blue-500 mb-6">
                                    <FiFileText size={18} />
                                    <span className="text-xs font-bold tracking-wider uppercase">{paper.category}</span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-medium text-gray-200 group-hover:text-white transition-colors leading-relaxed mb-4">
                                    {paper.title}
                                </h3>
                            </div>

                            <div className="flex items-end justify-between mt-auto pt-6">
                                {/* Date */}
                                <span className="text-sm text-gray-500 font-medium">
                                    {paper.date}
                                </span>

                                {/* Arrow Button */}
                                <div className="w-10 h-10 rounded-full bg-[#1A1D2B] flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                                    <FiArrowUpRight className="text-gray-400 group-hover:text-white transition-colors" size={20} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
            <MainFooter />
        </>
    );
}
