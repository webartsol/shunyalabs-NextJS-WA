'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronRight } from "react-icons/fa6";
import { mergedLanguages } from '../utils/languages';
import { languageToFlag } from "../utils/languageToFlagMap";
import { getDirectLanguages } from '../modules/widget/config/language-mapping';
import { ChevronRight } from "lucide-react";

interface LanguageRegionsProps {
  title?: string;
  subtitle?: string;
}

export const LanguageRegions = ({
  title = "Language Regions",
  subtitle = "Explore our comprehensive language coverage across the globe",
}: LanguageRegionsProps) => {

  const router = useRouter();
  const languages: any = getDirectLanguages();

  languages.sort((a: { name: string }, b: { name: string }) =>
    a.name.localeCompare(b.name)
  );

  // Instead of redirecting to /speech-to-text/{language}, we scroll to the
  // HomePageWidget and set the ASR_STT_language dropdown via a URL query param.
  // This keeps users on the home page and directly updates the widget language.
  const handleClick = (lang: any) => {
    const params = new URLSearchParams(window.location.search);
    params.set("lang", lang.code);
    router.replace(`?${params.toString()}`, { scroll: false });

    const widgetEl = document.getElementById("HomePageWidget");
    if (widgetEl) {
      widgetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0B10] px-4 py-10">
      <section className="relative text-white my-8 md:my-12 text-center px-4 sm:px-6">
        <div className="max-w-6xl mx-auto px-6">

          {/* 👇 Dynamic Title */}
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight m-auto">
            {title}
          </p>

          {/* 👇 Dynamic Subtitle */}
          <p className="mt-6 text-lg md:text-xl max-w-5xl text-gray-400 mx-auto">
            {subtitle}
          </p>

        </div>
      </section>

      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {languages.map((lang: any, index: number) => (
            <button
              key={index}
              onClick={() => handleClick(lang)}
              className="
                group flex items-center justify-between gap-2 
                rounded-[10px] px-3 py-2 
                bg-[#1c1a22] border border-[#2a2a35]
                transition-all duration-300
                hover:border-blue-500
                hover:shadow-[0_0_10px_#b7e3ff]
              "
            >
              <div className="flex items-center gap-2">
                <span className="text-xl rounded-[5px] overflow-hidden flex items-center justify-center py-1">
                  <img src={lang?.flag || '🌐'} className='w-9 rounded-[3px]' alt={lang.name} loading="lazy" />
                </span>
                <span className="text-white text-sm font-medium ms-2">
                  {lang.name}
                </span>
              </div>

              <FaChevronRight
                size={14}
                className="text-gray-400 group-hover:text-blue-500 transition-colors"
              />
            </button>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <a
            href="documentation/languages"
            className="text-gray-300 text-base my-5 md:text-lg font-semibold underline-offset-2 decoration-1 hover:text-white hover:decoration-2 transition-all inline-flex items-center gap-2"
          >
            See the full list of languages supported by Shunya Labs
            <ChevronRight className="text-xl no-underline" />
          </a>
        </div>
      </div>
    </div>
  );
};
