"use client";
import { useEffect, useRef, useState } from "react";

export default function LanguageCoverageSection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [languageCount, setLanguageCount] = useState(0);
  const [populationCoverage, setPopulationCoverage] = useState(0);
  const [nativeSpeakers, setNativeSpeakers] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.4 } // trigger when 40% of section visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    // 1️⃣ Language Supported (0 → 216)
    let langStart = 0;
    const langInterval = setInterval(() => {
      langStart += 1;
      if (langStart >= 216) {
        langStart = 216;
        clearInterval(langInterval);
      }
      setLanguageCount(langStart);
    }, 10);

    // 2️⃣ Global Population Coverage (0 → 96.8)
    let popStart = 0;
    const popInterval = setInterval(() => {
      popStart += 1;
      if (popStart >= 97) {
        popStart = 96.8;
        clearInterval(popInterval);
      }
      setPopulationCoverage(popStart);
    }, 15);

    // 3️⃣ Minimum Native Speakers (0 → 1M+, step 5K)
    let speakerStart = 0;
    const speakerInterval = setInterval(() => {
      speakerStart += 5000;
      if (speakerStart >= 1000000) {
        speakerStart = 1000000;
        clearInterval(speakerInterval);
      }
      setNativeSpeakers(speakerStart);
    }, 2);

    return () => {
      clearInterval(langInterval);
      clearInterval(popInterval);
      clearInterval(speakerInterval);
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0e1656] text-white md:py-20 py-10 text-center"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-semibold mb-3 md:mb-6">
          Understand Everyone. Speak to Anyone
        </h2>
        <p className="text-gray-400 max-w-3xl text-lg mx-auto mb-16">
          We solve the fundamental problems that make voice AI expensive, slow, and insecure.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* 1️⃣ Language Supported */}
          <div className="bg-white/95 text-[#0e1656] rounded-xl py-6 md:py-10 md:px-6 shadow-sm hover:shadow-md transition-all duration-300">
            <p className="text-2xl md:text-3xl font-bold mb-2">{languageCount}</p>
            <p className="text-gray-600 text-sm md:text-base">Language Supported</p>
          </div>

          {/* 2️⃣ Global Population Coverage */}
          <div className="bg-white/95 text-[#0e1656] rounded-xl py-6 md:py-10 md:px-6 shadow-sm hover:shadow-md transition-all duration-300">
            <p className="text-2xl md:text-3xl font-bold mb-2">
              {populationCoverage.toFixed(1)}%
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              Global Population Coverage
            </p>
          </div>

          {/* 3️⃣ Minimum Native Speakers */}
          <div className="bg-white/95 text-[#0e1656] rounded-xl py-6 md:py-10 md:px-6 shadow-sm hover:shadow-md transition-all duration-300">
            <p className="text-2xl md:text-3xl font-bold mb-2">
              {nativeSpeakers >= 1000000
                ? "1M+"
                : `${Math.floor(nativeSpeakers / 1000)}K`}
            </p>
            <p className="text-gray-600 text-sm md:text-base">
              Minimum Native Speakers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
