// app/zero-stt/page.tsx
import React from "react";
import Navbar from "@/app/Layouts/Navbar";
import MainFooter from "@/app/Layouts/MainFooter";
import icon1 from "../../../assets/icons/Vector.png";
import icon2 from "../../../assets/icons/Vector (1).png";
import icon3 from "../../../assets/icons/monitor-smartphone.png";
import img1 from "../../../assets/images/Screenshot 2025-11-24 at 3.47.58 PM 1.png";
import Image from "next/image";
import SecurityStandardsSection from "../Layouts/SecurityStandardsSection";
import HomeFooter from "../Layouts/HomeFooter";
import FeatureQuadrant2 from "../components/FeatureQuadrant-2";
import Link from "next/link";
import CardSwap, { Card } from "../components/CardSwap";
import { IoChevronForward } from "react-icons/io5";

const featureCards = [
  {
    title: "Languages",
    description:
      "Global coverage across 200+ languages and state-of-the-art Indic and code-switch models for exceptional accuracy.",
    icon: icon1,
    href: '/language-models'
  },
  {
    title: "Domain specialisation",
    description:
      "Models that understand your use case for transcribing specialised terminology, proper nouns and acronyms.",
    icon: icon2,
    href: '/domain-specialisation'
  },
  {
    title: "On device deployment",
    description:
      "Lightweight, superfast models that run on your phone without compromising accuracy.",
    icon: icon3,
    href: '/on-device-models'
  },
];

const useCases = [
  {
    title: "Media & Content",
    body: "Turn live and recorded audio into structured, searchable text with our speech-to-text ASR. Power real-time captions, subtitles and podcasts.",
    link: "/media-entertainment"
  },
  {
    title: "Healthcare",
    body: "Capture clinical conversations with medical ASR that understands accents, background noise and clinical jargon. Generate notes, summaries and structured fields from doctor–patient conversations.",
    link: "/healthcare"
  },
  {
    title: "Contact Centers",
    body: "Transform every call into insight with contact center speech-to-text. Run real-time transcription for agents, power voice agents and IVR, and analyze calls later with high-accuracy ASR.",
    link: "/contact-centers"
  },
];

export default function SttModel() {
  return (
    <div className="min-h-screen bg-[#050608] text-white">
      {/* Navbar */}
        <Navbar />
   
      {/* Main content */}
      <main className="pt-24 lg:pt-28">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute -top-40 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <h1 className="text-3xl sm:text-4xl max-w-2xl md:text-5xl font-bold leading-tight m-auto">
                Speech to Text transcription for real world audio
              </h1>
              <h2 className="mt-6 text-lg md:text-xl text-gray-300">
                Leading speech to text models for true global language coverage
                with unmatched accuracy, ultra-low latency, and enterprise
                scalability.
              </h2>
            </div>

            {/* Top feature cards */}
            <div className="mt-20 grid gap-20 sm:grid-cols-3">
              {featureCards.map((card) => (
                <Link key={card.title} href={card.href || "#"}>
                  <div
                    className="group rounded-xl border border-white/5 bg-gradient-to-b from-black to-[#181133] px-5 py-6 text-left transition duration-200 
        hover:border-cyan-400/70 hover:bg-[#161322] flex flex-col items-center 
        h-[300px] justify-between cursor-pointer"
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-4 h-16 w-16 rounded-full flex items-center justify-center">
                        <Image
                          src={card.icon}
                          alt={card.title}
                          className="h-10 w-10 object-contain"
                        />
                      </div>

                      <h3 className="text-base md:text-lg font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                        {card.title}
                      </h3>

                      <p className="text-gray-400 md:text-base text-sm leading-relaxed mb-2 text-center">
                        {card.description}
                      </p>
                    </div>

                    <Link href={card.href} className="p-2 bg-[#221555] mt-2 rounded-full">
                      <span className="text-white">
                        <IoChevronForward />
                      </span>
                    </Link>


                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FeatureQuadrant2
          heading="Accurate, fast and scalable speech to text API"
          subheading=""
          rows={[
            {
              leftHeading: "Industry leading accuracy",
              leftText:
                "Trained on noisy, real-world audio so your transcripts stay reliable in production, even in messy environments.",
              rightTitle: "3.10% WER",
              learnmoreLeft: "Learn more",
              link: "#",
            },
            {
              leftTitle: "100 MS latency",
              rightHeading: "Ultra fast transcription",
              rightText: `Streaming partials in milliseconds and full transcripts in seconds—for live captions and real-time voice experiences.`,
              learnmoreRight: "Learn more",
              link: "#",
            },
            {
              leftHeading: "Run directly on your device",
              leftText: `Our ultra-compact ONNX model runs fully on-device, transcribing real-world English audio in real time—no GPUs, no cloud round-trips, just fast, private speech-to-text wherever you deploy it.`,
              rightTitle: "On Prem Deployment",
              learnmoreLeft: "Learn more",
              link: "#",
            },
          ]}
        />

        {/* Use cases section */}
        <section className="border-t border-white/5 bg-[#050608]">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-center text-white font-semibold text-2xl mb-[70px]">
              Speech AI that fits your real-world use cases
            </h2>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <div className="space-y-12 group/card-list">
                {useCases.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex group/item cursor-pointer"
                  >
                    {/* Line Logic */}
                    <div
                      className={`
            w-2 rounded-full transition-all duration-300 origin-top
            bg-gradient-to-b from-blue-500 to-purple-500

            ${index === 0
                          ? // FIRST CARD:
                          // Default visible, but hide when hovering any OTHER card
                          "scale-y-100 group-hover/card-list:scale-y-0 group-hover/item:scale-y-100"
                          : // OTHER CARDS:
                          // Default hidden, show on hover of itself
                          "scale-y-0 group-hover/item:scale-y-100"
                        }
          `}
                    ></div>

                    <div className="ml-5">
                      <p className="text-2xl font-semibold text-white mb-2">
                        {item.title}
                      </p>

                      <p className="text-gray-300 leading-relaxed w-[70%]">
                        {item.body}
                      </p>

                      <div className="pt-3">
                        <Link
                          href={item.link}
                          className="text-blue-500 hover:text-blue-400 font-medium"
                        >
                          Learn more
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


              <div className="relative">
                <div className="w-[350px] h-[320px] md:w-[420px] md:h-[380px] relative">
                  <CardSwap
                    width={350}
                    height={260}
                    cardDistance={70}
                    verticalDistance={50}
                    delay={3000}
                    easing="elastic"
                    pauseOnHover={true}
                  >
                    <Card customClass="p-6 text-white bg-neutral-900/70 border border-gray-700 rounded-xl">
                      <p className="text-lg font-semibold mb-2">Media & Content</p>
                    </Card>

                    <Card customClass="p-6 text-white bg-neutral-900/70 border border-gray-700 rounded-xl">
                      <p className="text-lg font-semibold mb-2">Healthcare</p>
                    </Card>

                    <Card customClass="p-6 text-white bg-neutral-900/70 border border-gray-700 rounded-xl">
                      <p className="text-lg font-semibold mb-2">
                        Contact Centers
                      </p>
                    </Card>
                  </CardSwap>
                </div>
              </div>
            </div>


          </div>
        </section>
      </main>
      <SecurityStandardsSection />
      <HomeFooter />
      <MainFooter />
    </div>
  );
}
