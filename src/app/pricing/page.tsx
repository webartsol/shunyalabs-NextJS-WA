'use client';
import AudioProcessingPricing from "../components/AudioProcessingPricing";
import SpeechIntelligenceFeatures from "../components/SpeechIntelligenceFeatures";
import SpeechToTextPricing from "../components/SpeechToTextPricing";
import VoiceAgentCalculator from "../components/VoiceAgentCalculator";
import MainFooter from "../Layouts/MainFooter";
import Navbar from "../Layouts/Navbar";
import PricingSection from "../Layouts/PricingSection";
import FAQSection from "../components/FAQSection";
import type { Metadata } from "next";


export default function PricingPage() {

  return (
    <>
      <div className="relative z-0 min-h-screen bg-[#0B0B0F] overflow-hidden text-white pt-20">
        <div className="absolute inset-0 pointer-events-none -z-10">

          <div className="absolute top-[500px] left-[200px] w-[100px] h-[500px] bg-purple-700/90 rounded-full blur-[110px]"></div>

          <div className="absolute top-[600px] left-[300px] w-[200px] h-[150px] bg-blue-500/90 rounded-full blur-[80px]"></div>

          <div className="absolute top-[800px] left-[1550px] w-[200px] h-[400px] bg-purple-700/90 rounded-full blur-[150px]"></div>

          <div className="absolute top-[500px] left-[1550px] w-[200px] h-[300px] bg-blue-600/90 rounded-full blur-[150px]"></div>

        </div>
        <Navbar />

        <section className="relative text-white md:pt-24 md:pb-12 pt-12 pb-6 text-center">
          <div className="max-w-4xl mx-auto px-6">

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Shunya Labs Plans
            </h1>
            {/* Subtitle */}
            <h2 className="text-lg md:text-2xl text-gray-400 mt-2">
              Flexible pricing for every scenario
            </h2>
          </div>

        </section>
        <PricingSection />
        <VoiceAgentCalculator />
        <SpeechToTextPricing />
        <AudioProcessingPricing />
        <SpeechIntelligenceFeatures />
        <FAQSection />
        <MainFooter />
      </div>
    </>
  );
}
