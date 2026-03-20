import ModelOverviewSection from "@/app/Layouts/ModelOverviewSection";
import Footer from "../Layouts/Footer";
import Navbar from '../Layouts/Navbar'
import { DOCS_URL } from '../utils/constants';
import { FaBolt, FaGlobe, FaWifi, FaShieldAlt } from "react-icons/fa";
import WhyChooseSection from "@/app/Layouts/WhyChooseSection";
import {
  FaPhoneAlt,
  FaHeartbeat,
  FaBuilding,
  FaHeadphones,
} from "react-icons/fa";
import UseCasesSection from "@/app/Layouts/UseCasesSection";
import HowItWorksSection from "@/app/Layouts/HowItWorksSection";
import SecurityFeatureCard from "@/app/Layouts/SecurityFeatureCard";
import { LanguageRegions } from "@/app/Layouts/LanguageRegions";
import MainFooter from "@/app/Layouts/MainFooter";
import { Metadata } from "next";
import Head from "next/head";
import Link from "next/link";

interface LanguageItem {
  language: string;
  color: string;
  asr: string;
  description: string;
  hours: string;
  link: string;
}

export default function ZeroIndic() {
  const features = [
    {
      icon: <FaBolt />,
      title: "Ultra-fast transcription",
      subtitle: "Near-real-time on ordinary CPUs",
    },
    {
      icon: <FaGlobe />,
      title: "216 languages & accents",
      subtitle: "Global language compatibility",
    },
    {
      icon: <FaWifi />,
      title: "Works completely offline",
      subtitle: "Perfect for privacy-focused environments",
    },
    {
      icon: <FaShieldAlt />,
      title: "No internet? No problem",
      subtitle: "Ideal for on-premise, edge, or secure setups",
    },
  ];

  const v1points = [
    "Lightning speed on commodity hardware",
    "Zero data leaks – your audio never leaves your device",
    "Wide language compatibility – global ready",
    "Built for privacy – HIPAA, SOC 2, and ISO 27001 compliant",
  ];

  const pingalaCases = [
    {
      icon: <FaPhoneAlt className="text-white text-lg" />,
      title: "Call centres",
      feature: "Real-time, on-site transcription",
    },
    {
      icon: <FaHeartbeat className="text-white text-lg" />,
      title: "Healthcare settings",
      feature: "Privacy-safe, compliant processing",
    },
    {
      icon: <FaBuilding className="text-white text-lg" />,
      title: "Government / security",
      feature: "Cloud-free for maximum confidentiality",
    },
    {
      icon: <FaHeadphones className="text-white text-lg" />,
      title: "Media & accessibility",
      feature: "Fast subtitles, multilingual support",
    },
  ];

  const languageData: LanguageItem[] = [
    {
      language: "Hindi",
      color: "text-cyan-400",
      asr: "Hindi ASR built for 350M+ native speakers",
      description:
        "Trained on 430.6 hours of real-world audio from OpenSLR, Gramvaani, Shrutilipi, Kathbath, Vaani, and proprietary data in just 35.9 hours on dual A100 GPUs.",
      hours: "",
      link: "#",
    },
    {
      language: "Telugu",
      color: "text-cyan-400",
      asr: "Telugu ASR built for 80M+ native speakers",
      description:
        "Trained on 110.6 hours of real-world audio from Kathbath and Google Fleurs in just 13.43 hours on dual A100 GPUs.",
      hours: "",
      link: "#",
    },
    {
      language: "Kannada",
      color: "text-cyan-400",
      asr: "Kannada ASR built for 40M+ native speakers",
      description:
        "Trained on 90.6 hours of real-world audio from OpenSLR, Kathbath, and Vaani in just 9.9 hours on dual A100 GPUs.",
      hours: "",
      link: "#",
    },
    {
      language: "Bengali",
      color: "text-cyan-400",
      asr: "Bengali ASR built for 230M+ native speakers",
      description:
        "Trained on 110.6 hours of real-world audio from OpenSLR, Kathbath, Vaani, and Shrutilipi in just 12.9 hours on dual A100 GPUs.",
      hours: "",
      link: "#",
    },
  ];

  return (
    <>
      <Head>
        <Head>
          {/* preload ensures early fetch */}
          <link
            rel="preload"
            as="image"
            href="../../assets/images/product-bg1.png"
            type="image/png"
          />
          {/* optional prefetch for re-visits */}
          <link
            rel="prefetch"
            as="image"
            href="../../assets/images/product-bg1.png"
          />
        </Head>
      </Head>
      <div className="product-bg1 pt-20">
        <Navbar />
        <div>
          <section className="bg-black text-white py-20 px-6">
            <div className="max-w-6xl mx-auto">
              {" "}
              {/* ← CENTERED WIDTH FIX */}
              {/* Heading */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Indic language transcription backed by data
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  Get world-class speed and accuracy for major Indian languages,
                  so your users experience natural, reliable transcription in
                  the languages they actually speak.
                </p>
              </div>
              {/* GRID */}
              <div className="w-full">
                {languageData.map((item, index) => (
                  <div key={index}>
                    {/* TOP BORDER — ONLY IF NOT FIRST ROW */}
                    {index !== 0 && (
                      <div className="h-px bg-gradient-to-r from-black via-white to-black opacity-30"></div>
                    )}

                    {/* MAIN ROW */}
                    <div className="grid grid-cols-12">
                      {/* LEFT COLUMN */}
                      <div
                        className="
                            col-span-12 md:col-span-4
                            flex items-center justify-start md:justify-center
                            py-20 px-6"
                      >
                        <h3 className="text-[40px] font-semibold mb-2 bg-gradient-to-r from-blue-700 to-purple-400 bg-clip-text text-transparent w-60 text-center">
                          {item.language}
                        </h3>
                      </div>

                      {/* RIGHT COLUMN */}
                      <div className="col-span-12 md:col-span-8 py-10 px-10">
                        <p className="text-xl font-bold mb-6">{item.asr}</p>

                        <p className="text-gray-400 text-lg max-w-xl leading-relaxed mb-8">
                          {item.description}
                        </p>
                        <div className="w-full flex justify-end mt-6 pr-10">
                          {/* <a
                            href={item.link}
                            className="text-sm text-gray-400 hover:text-white transition"
                          >
                            Try Now →
                          </a> */}
                        </div>
                      </div>
                    </div>

                    {/* BOTTOM BORDER — ONLY IF NOT LAST ROW */}
                    {/* {index !== languageData.length - 1 && (
                      <div className="border-t border-gray-700"></div>
                    )} */}
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <Link
                  href={`${DOCS_URL}/models/language`} target="_blank" rel="noopener noreferrer"
                  className="px-10 py-3 mt-12 rounded-full text-white text-base font-medium 
             bg-gradient-to-r from-[#361D83] to-[#145AE8]
             hover:opacity-90 transition duration-300"
                >
                  Try now
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer text="One platform for speech in and speech out—secure by design, built to scale." title="The fastest way to add voice AI to your products" />
      <MainFooter />
    </>
  );
}
