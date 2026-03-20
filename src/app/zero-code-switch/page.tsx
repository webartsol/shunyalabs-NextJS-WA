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
import MainFooter from "@/app/Layouts/MainFooter";
import { Metadata } from "next";
import { WidgetPage } from "../modules/widget/pages/WidgetPage";
import CardSwap, { Card } from "../components/CardSwap";
import FeatureQuadrant from "../components/FeatureQuadrant";
import Link from "next/link";

// For App Router - export metadata instead of using Head
export const metadata: Metadata = {
  title: "Zero Indic - Hinglish ASR",
  description: "Capture code-switching in conversations like never before",
};

interface HinglishFeature {
  title: string;
  description: string;
}

export default function ZeroIndic() {
  // These are defined but not used - either use them or remove them
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

  const hinglishData = [
    {
      desc: `Zero Hinglish is a true Hinglish model,\ngenerating tokens directly in mixed\nHindi–English instead of forcing\neverything into a single language.`,
      title: "Hinglish output",
    },
    {
      title: "Sentence-level context",
      desc: `Trained on genuine Hinglish, the model\nunderstands the entire sentence,\ndelivering far more accurate\ntranscripts in real time.`,
    },
    {
      desc: `A novel architecture keeps layers\nminimal while handling code-switched\nspeech, so you get low-latency,\nproduction-ready Hinglish transcription.`,
      title: "Faster than ever",
    },
  ];

  const mediaUseCases = [
    {
      title: "Podcasts",
      body: "Capture every nuance in conversations held in the comfort of Hinglish.",
    },
    {
      title: "Interviews",
      body: "Livestream or post-process episodes with native Hinglish transcripts.",
    },
    {
      title: "News & talk shows",
      body: "Real-time, mixed-language captions for broadcast and digital.",
    },
  ];


  return (
    <>
      <div className="product-bg1 pt-20">
        <Navbar />
        <div>
          <section className="bg-black text-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Heading */}
              <div className="text-center mb-16">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Capture code-switching in conversations like never before
                </h1>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  The only ASR to transcribe Hinglish like its actually spoken,
                  our breakthrough code-switching STT generates mixed Hinglish
                  outputs.
                </p>
              </div>
              <div id="HomePageWidget">
                <WidgetPage showHeaderTabs={false} showLanguageDropdown={true} fromPage="zero-code-switch" defaultdHeaderTab="zero-code-switch" />
              </div>
              <div className="flex justify-center">
                <Link
                  href={`${DOCS_URL}/models/language`} target="_blank" rel="noopener noreferrer"
                  className="px-12 py-3 mt-6 rounded-lg text-white text-base font-medium bg-blue-800
                  hover:opacity-90 transition duration-300"
                >
                  Get Hinglish API now

                </Link>
              </div>
              {/* GRID */}
              <div className="w-full">
                <FeatureQuadrant
                  heading="A first of its kind Hinglish model"
                  subheading=" "
                  rows={hinglishData}
                />
              </div>
            </div>
          </section>

          <section className="bg-black text-white py-24 px-6">
            <div className="max-w-6xl mx-auto">
              {/* Heading */}
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  ASR that transcribes like India speaks
                </h2>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  Our breakthrough innovation means Zero Hinglish stays as fast
                  and fluid as the code switch in the conversation itself.
                </p>
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* LEFT SIDE */}
                <div className="space-y-14 group/media">
                  {mediaUseCases.map((item, index) => (
                    <div
                      key={item.title}
                      className="relative pl-6 cursor-pointer group/item"
                    >
                      {/* Gradient line */}
                      <div
                        className={`
                        absolute left-0 top-0 h-full w-1 rounded-full
                        bg-gradient-to-b from-blue-500 to-purple-500
                        transform origin-top transition-transform duration-300
                        ${index === 0
                            ? // first item: visible by default, hide when any item hovered,
                            // but stay visible when this item itself is hovered
                            "scale-y-100 group-hover/media:scale-y-0 group-hover/item:scale-y-100"
                            : // other items: hidden by default, visible only on own hover
                            "scale-y-0 group-hover/item:scale-y-100"
                          }
                      `}
                      />

                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>

                {/* RIGHT SIDE (CardSwap) */}
                <div className="margin-issue-cards relative flex justify-center items-center mb-20 md:mb-32">
                  <div className="w-[350px] h-[320px] md:w-[420px] md:h-[380px] 
                    relative flex justify-center items-center">

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
                        <p className="text-lg font-semibold mb-2">Podcasts</p>
                      </Card>

                      <Card customClass="p-6 text-white bg-neutral-900/70 border border-gray-700 rounded-xl">
                        <p className="text-lg font-semibold mb-2">Interviews</p>
                      </Card>

                      <Card customClass="p-6 text-white bg-neutral-900/70 border border-gray-700 rounded-xl">
                        <p className="text-lg font-semibold mb-2">News & talk shows</p>
                      </Card>
                    </CardSwap>

                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer
        text="One platform for speech in and speech out—secure by design, built to scale."
        title="The fastest way to add voice AI to your products"
      />
      <MainFooter />
    </>
  );
}