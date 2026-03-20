"use client";

import { useEffect } from "react";
import Navbar from "./Layouts/Navbar";
import ModelsSection from "./Layouts/ModelsSection";
import WhyShunyaLabsSection from "./Layouts/WhyShunyaLabsSection";
import SecurityStandardsSection from "./Layouts/SecurityStandardsSection";
import LanguageCoverageSection from "./Layouts/LanguageCoverageSection";
import { LanguageRegions } from "./Layouts/LanguageRegions";
import HomeFooter from "./Layouts/HomeFooter";
import MainFooter from "./Layouts/MainFooter";
import { WidgetPage } from "./modules/widget/pages/WidgetPage";
import HomePageButtons from "./modules/widget/components/HomePageButtons";
import ModularVoiceSection from "./components/ModularVoiceSection";
import VAKSection from "./components/VAKSection";

export default function Home() {
  useEffect(() => {

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const innertab = params.get("innertab");

      if (innertab === "mt") {
        const scrollToWidget = () => {
          const el = document.getElementById("HomePageWidget");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        scrollToWidget();
        const timer = setTimeout(scrollToWidget, 800);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <>
      <div className="relative z-[99] min-h-screen bg-[#0B0B0F] overflow-hidden text-white home-page">
        <Navbar />
        <section className="relative text-white md:py-16 py-12 mt-[90px] md:mt-[110px] mb-[40px] text-center">
          <div className="max-w-4xl mx-auto px-6">
            {/* Title */}
            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              Voice AI on your terms
            </h1>

            {/* Subtitle */}
            <h2 className="mt-6 text-lg md:text-2xl text-gray-300">
              Foundation models to voice agents, complete voice AI stack.{" "}
            </h2>
            <span className="mt-6 text-lg md:text-2xl text-blue-300">Built for developers.</span>
            <span className="mt-6 text-lg md:text-2xl text-purple-300"> Ready for enterprises.</span>
          </div>
        </section>

        <div id="HomePageWidget">
          <WidgetPage />
        </div>

        <div className="pt-10 pb-5">
          <HomePageButtons />
        </div>

        <ModularVoiceSection />

        <VAKSection />

        {/* <ModelsSection /> */}
      </div>

      {/* <WhyShunyaLabsSection /> */}
      <LanguageCoverageSection />
      <SecurityStandardsSection />
      <LanguageRegions />
      <HomeFooter />
      <MainFooter />
    </>
  );
}
