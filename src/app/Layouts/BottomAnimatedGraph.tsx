// "use client";

// import { motion } from "framer-motion";
// import lower from '../../../assets/icons/lower.png';

// const data = [
//     { name: "Shunya Labs", subText: "Pingala-v1-universal", value: 3.1, color: "#9D6BFF" },
//     { name: "NVIDIA", subText: "canary-qwen-2.5b", value: 5.63, color: "#0a2d80" },
//     { name: "IBM", subText: "granite-speech-3.3-8b", value: 5.74, color: "#003f8a" },
//     { name: "Microsoft", subText: "Phi-4-multimodal-instruct", value: 6.02, color: "#0096d6" },
//     { name: "NVIDIA", subText: "parakeet-tdt-0.6b", value: 6.05, color: "#a6d7ee" },
//     { name: "NVIDIA", subText: "canary-1b-flash", value: 6.35, color: "#d8ebf9" },
// ];

// // ✅ Adjusted Y scale
// const yAxisValues = [8, 6, 4, 2, 0];
// const minY = 0;
// const maxY = 8;

// const pctFromTop = (v: number) => ((maxY - v) / (maxY - minY)) * 100;
// const heightPct = (v: number) => ((v - minY) / (maxY - minY)) * 100;

// export default function BottomAnimatedGraph() {
//     return (
//         <div className="flex flex-col items-center text-white px-4 py-16">
//             <div className="flex gap-3">
//                 <p className="text-center text-3xl font-semibold mb-12">
//                     Lowest Total Word Error Rate
//                 </p>
//                 <div className="mt-2">
//                     <img src={lower.src} alt="lower" style={{ width: "40px" }} />
//                 </div>
//             </div>

//             <div className="relative bg-[#ffffff]/30 rounded-3xl w-full max-w-6xl px-12 pt-12 pb-12 mt-10">

//                 {/* ✅ Top Percentages Row */}
//                 <div className="flex justify-around w-full max-w-5xl mb-4 px-16 md:px-[30px] ms-8">
//                     {data.map((item, i) => (
                        
//                         <div
//                             key={i}
//                             className="text-3xl font-bold"
//                             style={{ color: item.color }}
//                         >
//                             {item.value.toFixed(2)}
//                             <span className="text-xl">%</span>
//                         </div>
                        
                        
//                     ))}
//                 </div>

//                 <div className="relative h-[360px]">
//                     {/* Grid Lines */}
//                     {yAxisValues.map((val) => (
//                         <div
//                             key={val}
//                             className="absolute left-0 right-0 flex items-center pointer-events-none"
//                             style={{ top: `${pctFromTop(val)}%` }}
//                         >
//                             <span className="w-10 -translate-x-2 text-sm text-gray-200 font-medium select-none">
//                                 {val}
//                             </span>
//                             <div className="flex-1 border-t border-gray-300/40"></div>
//                         </div>
//                     ))}

//                     <div className="absolute inset-0 flex gap-[40px] justify-around items-end px-12 md:px-20 mt-2 -mb-[10px]">
//                         {data.map((item, i) => {
//                             const h = heightPct(item.value);
//                             return (
//                                 <div
//                                     key={i}
//                                     className="relative w-[200px] h-full flex flex-col items-center justify-end"
//                                 >
//                                     {/* Bar */}
//                                     <motion.div
//                                         initial={{ height: 0 }}
//                                         animate={{ height: `${h}%` }}
//                                         transition={{ duration: 0.9 }}
//                                         className="w-[120px] rounded-t-2xl"
//                                         style={{ backgroundColor: item.color }}
//                                     />
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Company names */}
//                 <div className="flex justify-around max-w-5xl mt-6 px-16 md:px-[30px] ms-7 w-full">
//                     {data.map((c, i) => (
//                         <div key={i} className="flex flex-col items-center text-center w-[150px]">
//                             <span className="text-xs text-gray-400">{c.subText}</span>
//                             <p className="text-base text-center font-semibold">{c.name}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";

import { motion } from "framer-motion";
import lower from '../../../assets/icons/lower.png';

const data = [
    { name: "Shunya Labs", subText: "Pingala-v1-universal", value: 3.1, color: "#9D6BFF" },
    { name: "NVIDIA", subText: "canary-qwen-2.5b", value: 5.63, color: "#0a2d80" },
    { name: "IBM", subText: "granite-speech-3.3-8b", value: 5.74, color: "#003f8a" },
    { name: "Microsoft", subText: "Phi-4-multimodal-instruct", value: 6.02, color: "#0096d6" },
    { name: "NVIDIA", subText: "parakeet-tdt-0.6b", value: 6.05, color: "#a6d7ee" },
    { name: "NVIDIA", subText: "canary-1b-flash", value: 6.35, color: "#d8ebf9" },
];

// ✅ Adjusted Y scale
const yAxisValues = [8, 6, 4, 2, 0];
const minY = 0;
const maxY = 8;

const pctFromTop = (v: number) => ((maxY - v) / (maxY - minY)) * 100;
const heightPct = (v: number) => ((v - minY) / (maxY - minY)) * 100;

export default function BottomAnimatedGraph() {
    return (
        <div className="flex flex-col items-center text-white px-4 py-8 md:py-16">
            <div className="flex gap-2 md:gap-3 items-center justify-center flex-wrap">
                <h2 className="text-center text-xl md:text-3xl font-semibold mb-6 md:mb-12">
                    Lowest Total Word Error Rate
                </h2>
                <div className="mb-6 md:mb-12">
                    <img src={lower.src} alt="lower" className="w-8 md:w-10" loading="lazy"/>
                </div>
            </div>

            <div className="relative bg-[#ffffff]/30 rounded-2xl md:rounded-3xl w-full max-w-6xl px-5 md:px-12 pt-8 md:pt-12 pb-8 md:pb-12 mt-4 md:mt-10">

                {/* ✅ Top Percentages Row */}
                <div className="flex justify-around w-full mb-3 md:mb-4 px-2 md:px-8">
                    {data.map((item, i) => (
                        <div
                            key={i}
                            className="text-[15px] md:text-3xl font-bold text-center"
                            style={{ color: item.color }}
                        >
                            {item.value.toFixed(2)}
                            <br className="block md:hidden"/>
                            <span className="text-xs md:text-xl">%</span>
                        </div>
                    ))}
                </div>

                <div className="relative h-[280px] md:h-[360px]">
                    {/* Grid Lines */}
                    {yAxisValues.map((val) => (
                        <div
                            key={val}
                            className="absolute left-0 right-0 flex items-center pointer-events-none"
                            style={{ top: `${pctFromTop(val)}%` }}
                        >
                            <span className="w-6 md:w-10 -translate-x-1 md:-translate-x-2 text-xs md:text-sm text-gray-200 font-medium select-none">
                                {val}
                            </span>
                            <div className="flex-1 border-t border-gray-300/40"></div>
                        </div>
                    ))}

                    <div className="absolute inset-0 flex gap-2 md:gap-[40px] justify-around items-end px-4 md:px-12 mt-2 -mb-[10px]">
                        {data.map((item, i) => {
                            const h = heightPct(item.value);
                            return (
                                <div
                                    key={i}
                                    className="relative w-[40px] md:w-[120px] h-full flex flex-col items-center justify-end"
                                >
                                    {/* Bar */}
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ duration: 0.9 }}
                                        className="w-full md:w-[120px] rounded-t-xl md:rounded-t-2xl"
                                        style={{ backgroundColor: item.color }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Company names */}
                <div className="flex justify-around w-full mt-4 md:mt-6 px-2 md:px-8">
                     {data.map((c, i) => (
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
    );
}