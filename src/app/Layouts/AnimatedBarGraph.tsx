"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import upper from '../../../assets/icons/upper.png';

const data = {
    Tedlium: [98.57, 97.29, 96.6, 97.06, 96.62, 96.88],
    LibriSpeechClean: [99.29, 98.39, 98.57, 98.31, 98.31, 98.52],
    LibriSpeechOther: [97.83, 96.9, 97.14, 96.18, 96.81, 97.13],
    SPGISpeech: [98.69, 98.1, 96.09, 96.94, 97.83, 98.05],
    AMI: [95.88, 89.81, 91.02, 88.91, 88.84, 86.89],
    Gigaspeech: [95.05, 90.57, 89.81, 90.67, 90.26, 90.15],
    Voxpopuli: [96.32, 94.34, 94.28, 93.96, 94.05, 94.37],
    Earnings22: [94.91, 89.55, 90.58, 89.84, 88.85, 87.23],
};

const labels = [
    "Tedlium <br/> Ted Talks",
    "LibriSpeech Clean <br/> Audiobooks, Clear speech",
    "LibriSpeech Other <br/> Audiobooks, noisy audio",
    "SPGISpeech <br/> Financial earnings calls",
    "AMI <br/> Meetings with overlaps/crosstalk",
    "Gigaspeech <br/> Youtube/podcast audio",
    "Voxpopuli <br/> European Parliament speeches, accented English",
    "Earnings22 <br/> Earnings calls, Corporate communications",
];

const companies = [
    { name: "Shunya Labs", subText: "Pingala-v1-universal" },
    { name: "NVIDIA", subText: "canary-qwen-2.5b" },
    { name: "IBM", subText: "granite-speech-3.3-8b" },
    { name: "Microsoft", subText: "Phi-4-multimodal-instruct" },
    { name: "NVIDIA", subText: "parakeet-tdt-0.6b" },
    { name: "NVIDIA", subText: "canary-1b-flash" },
];

const colors = ["#9D6BFF", "#0a2d80", "#003f8a", "#0096d6", "#a6d7ee", "#d8ebf9"];

export default function AnimatedBarGraph() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [page, setPage] = useState(0);

    // ✅ REPLACED isMobile with buttonsPerPage (responsive)
    const [buttonsPerPage, setButtonsPerPage] = useState(4);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setButtonsPerPage(2);       // mobile
            else if (window.innerWidth < 1024) setButtonsPerPage(3); // tablet
            else setButtonsPerPage(4);                               // desktop
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ✅ Keep page in range if buttonsPerPage changes
    useEffect(() => {
        const maxPage = Math.max(0, Math.ceil(labels.length / buttonsPerPage) - 1);
        if (page > maxPage) setPage(maxPage);
    }, [buttonsPerPage, page]);

    // ✅ Uses buttonsPerPage everywhere
    const totalPages = Math.ceil(labels.length / buttonsPerPage);
    const startIndex = page * buttonsPerPage;
    const visibleButtons = labels.slice(startIndex, startIndex + buttonsPerPage);

    const activeKey = Object.keys(data)[activeIndex];
    const activeData = data[activeKey as keyof typeof data];

    const yAxisValues = [100, 95, 90, 85];
    const minY = 85;
    const maxY = 100;

    const pctFromTop = (v: number) => ((maxY - v) / (maxY - minY)) * 100;
    const heightPct = (v: number) => ((v - minY) / (maxY - minY)) * 100;

    return (
        <div className="flex flex-col items-center text-white px-3 sm:px-4 py-8 md:py-16">
            {/* Title Section */}
            <div className="flex gap-2 md:gap-3 items-center justify-center mb-6 md:mb-12">
                <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold">
                    Highest Word Accuracy Rate
                </h2>
                <div className="flex-shrink-0">
                    <img src={upper.src} alt="upper" className="w-7 sm:w-8 md:w-10" loading="lazy"/>
                </div>
            </div>

            {/* Navigation buttons */}
            <div className="relative flex items-center justify-center w-full max-w-6xl mb-6 md:mb-10 px-0 sm:px-4 md:px-8">
                {/* Left Scroll Button */}
                {page > 0 && (
                    <button
                        className="absolute left-1 sm:left-2 md:left-4 z-10 bg-white/20 p-2 sm:p-3 rounded-full hover:bg-white/40 transition-all text-xs sm:text-base"
                        onClick={() => setPage(page - 1)}
                    >
                        <FaChevronLeft />
                    </button>
                )}

                {/* Center Navigation Buttons */}
                <div className="w-full flex justify-center px-10 sm:px-12 md:px-14">
                    <div className="relative w-full max-w-[260px] sm:max-w-[580px] md:max-w-[1050px] min-h-[75px] sm:min-h-[80px] md:min-h-[90px] overflow-visible flex justify-center items-center">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={page}
                                initial={{ opacity: 0, x: page > 0 ? 150 : -150 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: page > 0 ? -150 : 150 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="flex justify-center gap-2 sm:gap-3 md:gap-4"
                            >
                                {visibleButtons.map((label, i) => {
                                    const globalIndex = startIndex + i;
                                    return (
                                        <button
                                            key={globalIndex}
                                            onClick={() => setActiveIndex(globalIndex)}
                                            className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-lg border text-[9px] sm:text-xs md:text-sm transition-all duration-300 w-[120px] sm:w-[180px] md:w-[240px] min-h-[70px] sm:min-h-[75px] md:min-h-[80px] flex items-center justify-center text-center whitespace-normal leading-tight ${
                                                activeIndex === globalIndex
                                                    ? "bg-white text-black font-semibold"
                                                    : "bg-transparent border-gray-500 text-gray-300 hover:bg-gray-700/30"
                                            }`}
                                        >
                                            <span dangerouslySetInnerHTML={{ __html: label }} />
                                        </button>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Scroll Button */}
                {page < totalPages - 1 && (
                    <button
                        className="absolute right-1 sm:right-2 md:right-4 z-10 bg-white/20 p-2 sm:p-3 rounded-full hover:bg-white/40 transition-all text-xs sm:text-base"
                        onClick={() => setPage(page + 1)}
                    >
                        <FaChevronRight />
                    </button>
                )}
            </div>

            {/* Graph container */}
            <div className="relative bg-[#ffffff]/30 rounded-2xl md:rounded-3xl w-full max-w-6xl px-4 md:px-12 pt-8 md:pt-12 pb-12 md:pb-20 mt-4 md:mt-10">

                {/* Chart Area with Percentages Inside */}
                <div className="relative h-[260px] sm:h-[320px] md:h-[420px] overflow-hidden">
                    {/* Grid lines */}
                    {yAxisValues.map((val) => (
                        <div
                            key={val}
                            className="absolute left-0 right-0 flex items-center pointer-events-none"
                            style={{ top: `${pctFromTop(val) * 0.857}%`, marginTop: '40px' }}
                        >
                            <span className="w-7 sm:w-8 md:w-10 text-[10px] sm:text-xs md:text-sm text-gray-200 font-medium select-none">
                                {val}
                            </span>
                            <div className="flex-1 border-t border-gray-300/40"></div>
                        </div>
                    ))}

                    {/* Bars Container */}
                    <div className="absolute left-7 sm:left-8 md:left-10 right-0 top-[40px] bottom-0 flex gap-[2px] sm:gap-1 md:gap-[40px] justify-around items-end px-1 sm:px-2 md:px-12 pb-0 mb-[10px]">
                        {activeData.map((value, i) => {
                            const h = heightPct(value);
                            return (
                                <div
                                    key={i}
                                    className="relative flex-1 max-w-[35px] sm:max-w-[50px] md:max-w-[120px] h-full flex flex-col items-center justify-end"
                                >
                                    {/* Percentage above bar - centered */}
                                    <div 
                                        className="absolute -top-[45px] left-1/2 -translate-x-1/2 font-bold text-center whitespace-nowrap"
                                        style={{ color: colors[i] }}
                                    >
                                        {/* Mobile: Stack vertically */}
                                        <div className="block md:hidden">
                                            <span className="block text-sm sm:text-base">{value.toFixed(2)}</span>
                                            <span className="text-[10px] sm:text-xs ">%</span>
                                        </div>
                                        {/* Desktop: Same line */}
                                        <div className="hidden md:block text-3xl">
                                            {value.toFixed(2)}<span className="text-xl">%</span>
                                        </div>
                                    </div>
                                    
                                    {/* Bar */}
                                    <motion.div
                                        key={`${activeIndex}-${i}`}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 0.9 }}
                                        className="w-full rounded-t-lg md:rounded-t-2xl"
                                        style={{ backgroundColor: colors[i] }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Company names - aligned with bars */}
                <div className="relative w-full mt-3 sm:mt-4 md:mt-6">
                    <div className="absolute left-7 sm:left-8 md:left-10 right-0 flex gap-[2px] sm:gap-1 md:gap-[40px] justify-around px-1 sm:px-2 md:px-12">
                        {companies.map((c, i) => (
                            <div key={i} className="flex flex-col items-center text-center flex-1 max-w-[35px] sm:max-w-[50px] md:max-w-[120px]">
                                {/* All screens: Single line subtext */}
                                <span className="text-[7px] sm:text-[9px] md:text-xs text-gray-400 leading-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                                    {c.subText}
                                </span>
                                <p className="text-[9px] sm:text-[10px] md:text-base font-semibold mt-0.5 md:mt-1 whitespace-nowrap">
                                    {c.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
