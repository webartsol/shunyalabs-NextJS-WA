import ModelOverviewSection from "@/app/Layouts/ModelOverviewSection";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import { FaBolt, FaGlobe, FaWifi, FaShieldAlt } from "react-icons/fa";
import WhyChooseSection from "@/app/Layouts/WhyChooseSection";
import { FaPhoneAlt, FaHeartbeat, FaBuilding, FaHeadphones } from "react-icons/fa";
import UseCasesSection from "@/app/Layouts/UseCasesSection";
import HowItWorksSection from "@/app/Layouts/HowItWorksSection";
import SecurityFeatureCard from "@/app/Layouts/SecurityFeatureCard";
import { LanguageRegions } from "@/app/Layouts/LanguageRegions";
import MainFooter from "@/app/Layouts/MainFooter";
import { Metadata } from "next";
import Head from "next/head";


export default function V1() {

    const features = [
        { icon: <FaBolt />, title: "Ultra-fast transcription", subtitle: "Near-real-time on ordinary CPUs" },
        { icon: <FaGlobe />, title: "216 languages & accents", subtitle: "Global language compatibility" },
        { icon: <FaWifi />, title: "Works completely offline", subtitle: "Perfect for privacy-focused environments" },
        { icon: <FaShieldAlt />, title: "No internet? No problem", subtitle: "Ideal for on-premise, edge, or secure setups" },
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


    const steps = [
        { number: 1, text: "Integrate our SDK or REST API" },
        { number: 2, text: "Send your audio stream" },
        { number: 3, text: "Get back fully transcribed text—quickly and privately" },
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

                <ModelOverviewSection
                    title="Zero STT"
                    description="Our local, offline speech-to-text engine. No cloud needed—everything runs on your device."
                    theme="blue"
                    features={features}
                    tab={'stt'}
                />
            </div>
            <WhyChooseSection
                title="Why Choose Zero STT?"
                theme="blue"
                points={v1points}
            />

            <UseCasesSection
                columns={{ heading1: "Scenario", heading2: "Zero STT Features" }}
                cases={pingalaCases}
            />

            <HowItWorksSection steps={steps} tab={'stt'} />

            <SecurityFeatureCard
                icon={<FaShieldAlt />}
                title="Built for Secure Use"
                description="Run everything on your own machines—no cloud service means no third-party data access."
                theme="blue"
            />

            <LanguageRegions />

            <Footer text="Experience the power of ZERO STT transcription" />
            <MainFooter/>
        </>
    );
}