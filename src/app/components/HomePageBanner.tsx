"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const HomePageBanner = () => {
    const pathname = usePathname();
    if (pathname !== "/") return null;

    return (
        <div className="w-full bg-white border-b border-gray-200 shadow-sm relative z-[1000000]">
            <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-2.5">
                    {/* Left Section - Combined Logos */}
                    <div className="flex items-center">
                        <Image
                            src="/images/sl-nasscom.png"
                            alt="Shunya Labs and NASSCOM"
                            width={200}
                            height={28}
                            className="h-5 md:h-10 w-auto"
                        />
                    </div>

                    {/* Center Section - Vāk Icon + Description + Button */}
                    <div className="flex-1 flex items-center justify-center gap-4 px-2 ms-[10px] md:ms-[350px]">
                        <Image
                            src="/images/Vāķ.png"
                            alt="Vāk"
                            width={24}
                            height={24}
                            className="h-4 w-auto"
                            style={{ height: '1.2rem' }}
                        />
                        <div className="h-6 w-px bg-gray-300"></div>
                        <p className="hidden md:block text-xs text-black max-w-md">
                            Real-Time Speech to Speech Translation Model for 55 Indic Languages
                        </p>
                        <a href="/vak" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-1.5 rounded-full text-sm font-bold transition-colors duration-200 shadow-sm md:ml-2">
                            Explore
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageBanner;
