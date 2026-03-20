import type { Metadata } from "next";
import FeatureCard from "@/app/Layouts/FeatureCard";
import Navbar from "@/app/Layouts/Navbar";
import { IoPlayOutline } from "react-icons/io5";
import img1 from '../../../assets/images/media-ent1.png';
import img2 from '../../../assets/images/media-ent2.png';
import img3 from '../../../assets/images/media-ent4.jpg';
import img4 from '../../../assets/images/media-ent3.jpg';
import Footer from "@/app/Layouts/Footer";
import MainFooter from "@/app/Layouts/MainFooter";
import Link from "next/link";
import { FaGlobe, FaMicrophone, FaCode } from "react-icons/fa";
import { FaArrowsSplitUpAndLeft } from "react-icons/fa6";
import NewFeatureShowcase from "../components/NewFeatureShowcase";
import { LuLanguages } from "react-icons/lu";
import { SiReactos } from "react-icons/si";
import {
    BsSoundwave,
    BsMagic,
    BsShieldCheck,
    BsGlobe,
} from "react-icons/bs";
import {
    MdTune,
    MdTextSnippet,
    MdSentimentSatisfiedAlt,
    MdRecordVoiceOver,
    MdGraphicEq,
    MdTimer,
    MdLanguage,
} from "react-icons/md";



export default function MediaEntertainment() {
    return (
        <>
            <div className="relative min-h-screen bg-[#0B0B0F] pt-24">
                <Navbar />


                <section className="relative text-white md:py-24 py-16 text-center ">

                    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                        {/* Title + Description */}
                        <h1 className="text-3xl md:text-5xl font-medium leading-tight">Voice Stack for Global Media to Localise at Scale</h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-4xl mx-auto">
                            Dubbing, translation, subtitling, voice cloning, and lip sync—220+ languages, one platform, studio-grade quality
                        </p>

                        {/* 🎬 Live Demo Button */}
                        <Link href="/contact">
                            <button
                                className="md:mt-10 mt-6 flex items-center justify-center mx-auto gap-2 text-white font-medium px-6 py-2 rounded-full bg-gradient-to-r from-[#9064E9] to-[#3D1D7C] hover:opacity-90 shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300"
                            >
                                Contact Sales
                            </button>
                        </Link>
                    </div>
                </section>

                <section className="w-full pb-10">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-center text-center">

                            {/* Item 1 */}
                            <span className="text-lg md:text-2xl font-bold 
        bg-gradient-to-r from-[#43B0E8] to-[#A757ED] 
        bg-clip-text text-transparent">
                                Global Language Coverage
                            </span>

                            {/* Mobile Divider */}
                            <div className="md:hidden w-40 h-px my-4 bg-white/20" />

                            {/* Desktop Divider */}
                            <div className="hidden md:block h-10 w-px mx-6 bg-white/20" />

                            {/* Item 2 */}
                            <span className="text-lg md:text-2xl font-bold 
        bg-gradient-to-r from-[#43B0E8] to-[#A757ED] 
        bg-clip-text text-transparent">
                                Codeswitch Native Models
                            </span>

                            {/* Mobile Divider */}
                            <div className="md:hidden w-40 h-px my-4 bg-white/20" />

                            {/* Desktop Divider */}
                            <div className="hidden md:block h-10 w-px mx-6 bg-white/20" />

                            {/* Item 3 */}
                            <span className="text-lg md:text-2xl font-bold 
        bg-gradient-to-r from-[#43B0E8] to-[#A757ED] 
        bg-clip-text text-transparent">
                                Fully Configurable Tools
                            </span>

                        </div>
                    </div>
                </section>


                <NewFeatureShowcase
                    heading="Deep Language Coverage to Reach Every Viewer"
                    image={img1.src}
                    imagePosition="left"
                    cards={[
                        {
                            title: "Translate across formats",
                            description:
                                "Text-to-text, speech-to-speech, speech-to-text — translate in any direction.",
                            icon: <LuLanguages className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Languages & dialects",
                            description:
                                "220+ languages with dialect-level precision across regions.",
                            icon: <FaGlobe className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Native codeswitch AI",
                            description:
                                "Real-world code switching like Hinglish, Tanglish, Arabizi.",
                            icon: <FaArrowsSplitUpAndLeft className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Foundation models",
                            description:
                                "220+ languages with dialect-level precision (LatAm vs European Spanish, Gulf vs Levantine Arabic)",
                            icon: <SiReactos className="text-[#a757edc4]" />,
                        },
                    ]}
                />


                <NewFeatureShowcase
                    heading="Turn Content into Searchable, Monetizable Assets"
                    image={img2.src}   // your right-side image
                    imagePosition="right"
                    cards={[
                        {
                            title: "Speech Intelligence",
                            description:
                                "Scene segmentation, emotion arcs, and narrative beat detection.",
                            icon: <BsSoundwave className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Content generation",
                            description:
                                "Auto-generate highlights, trailers, and chaptered indexes.",
                            icon: <BsMagic className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Compliance at scale",
                            description:
                                "Ad suitability, compliance tagging, and multilingual metadata at scale.",
                            icon: <BsShieldCheck className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Global discoverability",
                            description:
                                "Search inside video and audio, in any language.",
                            icon: <BsGlobe className="text-[#a757edc4]" />,
                        },
                    ]}
                />


                <NewFeatureShowcase
                    heading="Create Characters, not just Voiceovers"
                    image={img3.src}
                    imagePosition="left"
                    cards={[
                        {
                            title: "Configurable voices",
                            description:
                                "Design and modulate voices—adjust tone, age, accent, and personality in real time.",
                            icon: <MdTune className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Script to audio",
                            description:
                                "Skip the recording studio—go from script to final audio instantly.",
                            icon: <MdTextSnippet className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Emotion tagging",
                            description:
                                "Natural emotion tagging for high-fidelity, expressive output.",
                            icon: <MdSentimentSatisfiedAlt className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Character consistency",
                            description:
                                "Save and reuse character voices across projects, episodes, and languages.",
                            icon: <MdGraphicEq className="text-[#a757edc4]" />,
                        },
                    ]}
                />

                <NewFeatureShowcase
                    heading="Dubbing, Cloning and Lip Sync that Sounds Natural, not Synthetic"
                    image={img4.src}   // your face + waveform image
                    imagePosition="right"
                    cards={[
                        {
                            title: "Advanced dubbing",
                            description:
                                "Voice-matched dubbing that preserves emotion, tone, and speaker identity.",
                            icon: <MdRecordVoiceOver className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Accurate lip sync",
                            description:
                                "Phoneme-accurate lip sync for film, animation, games, and avatars.",
                            icon: <MdGraphicEq className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Low-shot cloning",
                            description:
                                "Studio-quality clones from just minutes of audio.",
                            icon: <MdTimer className="text-[#a757edc4]" />,
                        },
                        {
                            title: "Preserved accents",
                            description:
                                "Accent and identity preservation across languages.",
                            icon: <MdLanguage className="text-[#a757edc4]" />,
                        },
                    ]}
                />

                <section className="md:py-24 py-12">
                    <div className="max-w-[1220px] mx-auto px-4 md:px-0">
                        {/* Gradient Border Wrapper */}
                        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#A757ED] via-[#5B6CFF] to-[#43B0E8]">

                            {/* Inner Box */}
                            <div className="rounded-2xl px-6 md:px-[150px] bg-[#1D1D1D] py-16 text-center">

                                {/* Heading */}
                                <h2 className="text-3xl md:text-5xl font-semibold text-white md:px-24 leading-snug md:leading-tight">
  Ready to Localise your Content{" "}
  <span className="text-[#6C6CFF]">at Scale?</span>
</h2>


                                {/* Subtext */}
                                <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-base md:text-lg leading-relaxed">
                                    Skip stitching multiple vendors. Choose Shunya Lab's one stop solution to configure all your audio and speech intelligence needs across geographies.
                                </p>

                                {/* CTA Button */}
                                <div className="mt-10">
                                    <Link href='/contact' className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-6 py-2 text-white font-medium hover:bg-[#1d4ed8] transition">
                                        Contact Sales
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <MainFooter />
        </>
    )
}