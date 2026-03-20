"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainFooter from "./MainFooter";

const categories = ["Podcast", "Financial Call", "Political Speech"];

// ✅ Fixed colors (always same)
const barsInfo = [
    { label: "Shunya Labs", color: "from-purple-500 to-indigo-400", text: "text-purple-300" },
    { label: "Microsoft", color: "from-amber-400 to-yellow-500", text: "text-amber-300" },
    { label: "NVIDIA", color: "from-green-400 to-lime-500", text: "text-green-300" },
    { label: "IBM", color: "from-sky-400 to-blue-500", text: "text-sky-300" },
];

// ✅ Only values change
const dataSets: Record<string, number[]> = {
    Podcast: [87, 65, 85, 48],
    "Financial Call": [72, 90, 60, 50],
    "Political Speech": [40, 55, 70, 80],
};

export default function AnimatedBarChart() {
    const [active, setActive] = useState("Podcast");
    const gridValues = [100, 80, 60, 40, 20, 0];
    const values = dataSets[active];

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
                {/* Navigation Buttons */}
                <div className="flex gap-5 mb-10">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setActive(c)}
                            className={`px-6 py-3 rounded-md border text-sm font-medium transition ${active === c
                                    ? "bg-white text-black shadow"
                                    : "border-gray-500 text-gray-300 hover:bg-gray-800"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* Chart */}
                <div className="w-full max-w-4xl rounded-2xl border border-[#262636] bg-gradient-to-b from-[#1717228e] to-[#0e0e147c] shadow-[inset_0_0_40px_rgba(255,255,255,0.05)] p-16 pt-16 pb-10">
                    {/* Chart Area */}
                    <div className="relative px-16" style={{ height: 300 }}>
                        {/* Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {gridValues.map((v) => (
                                <div key={v} className="flex items-center">
                                    <span className="w-10 text-sm text-gray-400 mr-3">{v}</span>
                                    <div className="flex-1 h-px bg-gray-500/40" />
                                </div>
                            ))}
                        </div>

                        {/* Bars aligned exactly on 0 line */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end">
                            <AnimatePresence>
                                {barsInfo.map((bar, i) => (
                                    <motion.div
                                        key={bar.label}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${values[i] * 2.4}px` }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className={`relative w-24 bg-gradient-to-t ${bar.color} rounded-t-lg flex items-end justify-center`}
                                    >
                                        <motion.span
                                            key={`${active}-${i}-${values[i]}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className={`absolute -top-8 text-lg font-bold ${bar.text}`}
                                        >
                                            {values[i]}%
                                        </motion.span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* ✅ Circle Containers BELOW the graph (no overlap) */}
                    <div className="mt-8 grid grid-cols-4 gap-4  text-center">
                        {barsInfo.map((bar) => (
                            <div key={bar.label} className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 shadow-[0_2px_12px_rgba(0,0,0,0.4)]" />
                                <span className="mt-2 text-gray-200 text-sm md:text-base">{bar.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <MainFooter />
        </>
    );
}
