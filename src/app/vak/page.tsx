import React from 'react';
import Navbar from '../Layouts/Navbar';
import MainFooter from '../Layouts/MainFooter';
import { Languages, CornerUpRight, BrainCircuit, Phone, ExternalLink, Calendar } from 'lucide-react';
import TechnicalRelease from '../components/TechnicalRelease';

const VakPage = () => {
    return (
        <div className="bg-black min-h-screen text-white relative overflow-hidden">
            <Navbar />

            {/* Decorative Dashed Lines (Grid Background) - REMOVED */}
            {/* <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-0 w-full h-[1px] border-t border-dashed border-blue-500/30"></div>
                <div className="absolute top-0 right-[30%] h-full w-[1px] border-r border-dashed border-blue-500/30 hidden lg:block"></div>
            </div> */}

            <main className="pt-[120px] pb-20 px-6 max-w-[1400px] mx-auto relative z-10 mt-[60px]">

                {/* Top Logo Pill */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex items-center">
                        <img
                            src="/images/shunyalabs-nasscom-white.png"
                            alt="Shunya Labs | nasscom"
                            className="h-10 w-auto"
                        />
                    </div>
                </div>

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

                    {/* Left Content */}
                    <div className="text-left space-y-8 pl-4 lg:pl-12">
                        {/* Vāk Title */}
                        <h1 className="text-[6rem] md:text-[8rem] font-bold leading-none tracking-tight text-[#00DFFA] relative inline-block">
                            Vāķ
                        </h1>

                        {/* Subtitle */}
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-400">
                            Real-Time Translation<br />
                            in <span className="text-white">55 Indic Languages</span>
                        </h2>

                        {/* Description */}
                        <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                            <span className="text-white font-semibold">Vāķ</span> ensures <span className="text-white">no Indian gets left behind</span><br />
                            by democratising voice AI
                        </p>


                    </div>

                    {/* Right Image (Goddess) */}
                    <div className="relative flex justify-center lg:justify-end pr-4 lg:pr-12">
                        {/* Image Container with Border Lines */}
                        <div className="relative">
                            {/* Decorative Corner Squares - REMOVED */}
                            {/* <div className="absolute top-[-4px] left-[-4px] w-2 h-2 bg-[#00DFFA]"></div>
                            <div className="absolute top-[-4px] right-[-4px] w-2 h-2 bg-[#00DFFA]"></div>
                            <div className="absolute bottom-[-4px] left-[-4px] w-2 h-2 bg-[#00DFFA]"></div>
                            <div className="absolute bottom-[-4px] right-[-4px] w-2 h-2 bg-[#00DFFA]"></div> */}

                            {/* Inner Image */}
                            <img
                                src="/images/sa.png"
                                alt="Vāk Goddess"
                                className="w-full max-w-[450px] h-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
                            />

                            {/* Dimensions Label (Decorative) - REMOVED */}
                            {/* <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 bg-[#0070f3] text-white text-xs px-2 py-1 rounded">
                                499 × 626.57
                            </div> */}
                        </div>
                    </div>

                </div>

                {/* --- FEATURES SECTION --- */}
                <section className="mt-32 mb-20">

                    {/* Section Header */}
                    <div className="text-center mb-16 space-y-4">
                        <p className="text-gray-500 text-sm font-semibold tracking-widest uppercase">
                            OUR MODELS
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white w-full mx-auto leading-tight">
                            In the AI-driven economy, voice is the interface.
                        </h2>
                    </div>

                    {/* 3-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                        {/* Card 1: Languages */}
                        <div className="border border-white/10 rounded-xl p-8 bg-white/5 hover:bg-white/10 transition duration-300">
                            <div className="mb-6">
                                <Languages className="w-10 h-10 text-white" strokeWidth={1} />
                            </div>
                            <div className="inline-block border border-blue-500/50 rounded-full px-3 py-1 text-[10px] font-bold text-[#00DFFA] mb-4 tracking-wider">
                                LANGUAGES
                            </div>
                            <h3 className="text-xl font-bold mb-4">55 Indic Languages</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Real-time translation between 55 languages with &lt;1.5s end-to-end latency and zero-shot voice cloning.
                            </p>
                        </div>

                        {/* Card 2: Accuracy */}
                        <div className="border border-white/10 rounded-xl p-8 bg-white/5 hover:bg-white/10 transition duration-300">
                            <div className="mb-6">
                                <CornerUpRight className="w-10 h-10 text-white" strokeWidth={1} />
                            </div>
                            <div className="inline-block border border-blue-500/50 rounded-full px-3 py-1 text-[10px] font-bold text-[#00DFFA] mb-4 tracking-wider">
                                TRAINING
                            </div>
                            <h3 className="text-xl font-bold mb-4">More Accurate at Low Cost</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Trained using Shunya Labs' NASSCOM-published "Desirable Difficulties" methodology at 1/25th the cost of Big Tech.
                            </p>
                        </div>

                        {/* Card 3: Zero Suite */}
                        <div className="border border-white/10 rounded-xl p-8 bg-white/5 hover:bg-white/10 transition duration-300">
                            <div className="mb-6">
                                <BrainCircuit className="w-10 h-10 text-white" strokeWidth={1} />
                            </div>
                            <div className="inline-block border border-blue-500/50 rounded-full px-3 py-1 text-[10px] font-bold text-[#00DFFA] mb-4 tracking-wider">
                                MODELS
                            </div>
                            <h3 className="text-xl font-bold mb-4">Powered by Zero Suite</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Powered by Zero STT, the #1 model on OpenASR Leaderboard. Built for CPUs and edge-compatibility.
                            </p>
                        </div>

                    </div>

                    {/* Bottom 2-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Left Quote Card */}
                        <div className="border border-[#00DFFA] rounded-xl p-10 bg-black/50 flex items-center justify-center md:justify-start">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-400 leading-snug text-center md:text-left">
                                <span className="text-white">Vāķ</span> ensures the voice interface is
                                <span className="text-white block mt-1">accessible to everyone.</span>
                            </h3>
                        </div>

                        {/* Right CTA Card */}
                        <a href="https://vak.shunyalabs.ai" target="_blank" rel="noopener noreferrer" className="bg-[#00DFFA] rounded-xl p-10 flex flex-col items-center justify-center text-black cursor-pointer hover:bg-[#00cce6] transition">
                            <Phone className="w-8 h-8 mb-4rounded p-1" strokeWidth={1.5} />
                            <h3 className="text-4xl font-bold">Vāķ</h3>
                        </a>

                    </div>

                </section>

            </main>

            {/* --- OPEN-WEIGHT CTA SECTION (Full Width) --- */}
            <section className="bg-[#050A10] py-24 text-center relative overflow-hidden w-full">

                {/* Decorative Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    {/* Top Label */}
                    <p className="text-gray-500 text-sm font-semibold tracking-widest uppercase mb-6">
                        OPEN-SOURCE
                    </p>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Open-Weight for the Community
                    </h2>

                    {/* Subtitle */}
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Open to every developer, government, startup,<br />
                        and researcher. <span className="text-white font-semibold">Sovereign by design.</span>
                    </p>

                    {/* Button */}
                    <a href="https://huggingface.co/shunyalabs" target='_blank' className="inline-flex items-center gap-2 bg-[#00DFFA] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#00cce6] transition group">
                        Check out our models on Hugging Face
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </section>

            <TechnicalRelease/>

            {/* --- LAUNCH INFO SECTION --- */}
            <section className="bg-black pt-24 pb-20 px-6">
                <div className="max-w-[700px] mx-auto border border-[#00DFFA] rounded-xl p-12 text-center relative overflow-hidden">

                    {/* Calendar Icon */}
                    <div className="flex justify-center mb-6">
                        <Calendar className="w-8 h-8 text-[#00DFFA]" strokeWidth={1.5} />
                    </div>

                    {/* Launched At Text */}
                    <p className="text-white text-xl md:text-2xl font-medium mb-8">
                        Launched at India AI Impact Summit
                    </p>

                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <img
                            src="/images/shunyalabs-nasscom-white.png"
                            alt="Shunya Labs | nasscom"
                            className="h-8 w-auto opacity-90"
                        />
                    </div>

                    {/* Date */}
                    <p className="text-[#00DFFA] text-2xl md:text-3xl font-bold tracking-wide">
                        Feb 19-20, 2026
                    </p>

                </div>
            </section>

            <MainFooter />
        </div>
    );
};

export default VakPage;