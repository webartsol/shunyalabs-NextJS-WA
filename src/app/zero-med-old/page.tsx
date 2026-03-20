import ModelOverviewSection from "@/app/Layouts/ModelOverviewSection";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import {  FaGlobe, FaShieldAlt,FaStethoscope  } from "react-icons/fa";
import WhyChooseSection from "@/app/Layouts/WhyChooseSection";
import UseCasesSection from "@/app/Layouts/UseCasesSection";
import HowItWorksSection from "@/app/Layouts/HowItWorksSection";
import SecurityFeatureCard from "@/app/Layouts/SecurityFeatureCard";
import { FaAward } from "react-icons/fa";
import { MdSignalWifiOff } from "react-icons/md";
import { CgNotes } from "react-icons/cg";
import { IoHeartHalfOutline } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import MainFooter from "@/app/Layouts/MainFooter";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import Head from "next/head";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function MA1() {

    const features = [
        { icon: <FaAward />, title: "High accuracy", subtitle: "Best in class transcriptions." },
        { icon: <FaGlobe />, title: "English speech", subtitle: "Other languages coming soon." },
        { icon: <FaShieldAlt />, title: "HIPAA & SOC2 compliant", subtitle: "Secure infrastructure complying with industry regulations to safeguard patient data." },
        { icon: <MdSignalWifiOff />, title: "Works offline", subtitle: "Ideal for on-premise, CPU or edge applications." },
    ];

    const v1points = [
        "Trained on a comprehensive dataset including ICD-10, MIMS-India, and the FDA websites.",
        "Less than <1s latency on CPU installations.",
        "Best in class accuracy ensured by training on 5,486 hours of labelled medical audio.",
        "Built for privacy – HIPAA, SOC 2, and ISO 27001 compliant.",
    ];

    const pingalaCases = [
        {
            icon: <FaStethoscope  className="text-white text-lg" />,
            title: "Ambient Listening",
            feature: "Allowing doctors to focus on patient care.",
        },
        {
            icon: <CgNotes className="text-white text-lg" />,
            title: "Prescription",
            feature: "Generate accurate prescription automatically.",
        },
        {
            icon: <IoHeartHalfOutline className="text-white text-lg" />,
            title: "Insurance Assessment",
            feature: "High quality assessment of pre-existing diseases.",
        },
        {
            icon: <HiUsers className="text-white text-lg" />,
            title: "Live Doctor's Assist ",
            feature: "Assist doctor in real time in diagnosis and treatment.",
        },
    ];


    const steps = [
        { number: 1, text: "Ambient Listening" },
        { number: 2, text: "Prescription" },
        { number: 3, text: "Insurance Assessment" },
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
                    title="Zero STT Med"
                    description="Transforms complex clinical conversations into precise, structured documentation in real time, reducing administrative burden, improving accuracy, and enabling healthcare professionals to focus more on patient care."
                    theme="purple"
                    features={features}
                    tab={'mt'}
                />
            </div>
            <WhyChooseSection
                title="Why Choose Zero STT Med?"
                theme="purple"
                points={v1points}
            />

            <UseCasesSection
                columns={{ heading1: "Scenario", heading2: "Zero STT Med Features" }}
                cases={pingalaCases}
            />

            <HowItWorksSection steps={steps} tab={'mt'} />

            <SecurityFeatureCard
                icon={<FaShieldAlt />}
                title="Built for Secure Use"
                description="HIPAA & SOC2 compliant – Secure infrastructure complying with industry regulations to
 safeguard patient data."
                theme="purple"
            />


            <Footer text="Experience the power of Zero STT Med AI transcription"/>
            <MainFooter/>
        </>
    );
}