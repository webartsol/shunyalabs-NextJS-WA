import type { Metadata } from "next";
import React from "react";
import Navbar from "../../Layouts/Navbar";
import { FiTarget } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Image from "next/image";
import img from '../../../../assets/images/about-img.jpg'
import Milestones from "@/app/Layouts/Milestones";
import { FiZap, FiLock, FiBookOpen, FiPocket } from "react-icons/fi";
import { RiFunctionLine } from "react-icons/ri";
import HomeFooter from "@/app/Layouts/HomeFooter";
import MainFooter from "@/app/Layouts/MainFooter";

export const metadata: Metadata = {
    title: "About Shunya Labs",
    description: "Shunya Labs builds real-time, privacy-first AI infrastructure for voice, language & reasoning rooted in healthcare, designed for global, on-prem deployments.",
    alternates: {
        canonical: "https://shunyalabs-next-js.vercel.app/resources/about",
    },
  };

interface Belief {
  title: string;
  desc: string;
  icon: React.ReactElement;
}

const AboutUs: React.FC = () => {
 const coreBeliefs: Belief[] = [
  {
    title: "Own the Stack",
    desc: "CPUs first, clouds optional.",
    icon: <FiZap className="text-2xl text-gray-700" />,
  },
  {
    title: "Privacy > Hype",
    desc: "If data leaves the building, we failed.",
    icon: <FiLock className="text-2xl text-gray-700" />,
  },
  {
    title: "Math Wins",
    desc: "First principles beat brute force.",
    icon: <RiFunctionLine className="text-2xl text-gray-700" />,
  },
  {
    title: "Open by Default",
    desc: "Honest docs, clean APIs.",
    icon: <FiBookOpen className="text-2xl text-gray-700" />,
  },
  {
    title: "Ship Fast, Iterate Faster",
    desc: "Weekly releases or it didn’t happen.",
    icon: <FiPocket className="text-2xl text-gray-700" />,
  },
];
  return (
    <>
    <div className="min-h-screen main-bg text-white">
      <Navbar />
      {/* Hero Section */}

      <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
        <div className="max-w-5xl mx-auto px-6">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl max-w-2xl md:text-5xl font-bold leading-tight m-auto">
            We silence the static so every voice is heard.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-gray-300">
            A squad of first-principles engineers, math nerds, and privacy hawks, we rebuild speech tech from the silicon up—real-time, on-prem, and fearless. Zero noise, infinite voice: that’s not a slogan; it’s our daily sprint target.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10  px-4 sm:px-6 mb-0">
        <div className="bg-black/40 border-2 border-white/30 rounded-2xl p-8 shadow-lg w-full sm:w-[90%] md:w-[500px] h-auto md:h-[290px] flex flex-col items-center justify-center text-center">
          <div className="w-[70px] h-[70px] mx-auto bg-[#ffffff] rounded-full mb-4 flex items-center justify-center">
            <FiTarget className="text-purple-500 text-4xl" />
          </div>
          <h2 className="text-3xl font-semibold mb-5">Mission</h2>
          <p className="text-gray-400 text-lg">
            Put private, real-time voice intelligence on every device-no GPUs,
            no leaks, no excuses.
          </p>
        </div>
        <div className="bg-black/40 border-2 border-white/30 p-8 rounded-2xl shadow-lg w-full md:w-[500px] h-[290px] flex flex-col items-center justify-center text-center">
          <div className="w-[70px] h-[70px] mx-auto bg-[#ffffff] rounded-full mb-4 flex items-center justify-center">
            <MdOutlineRemoveRedEye className="text-purple-500 text-4xl" />
          </div>
          <h2 className="text-3xl font-semibold mb-5">Vision</h2>
          <p className="text-gray-400 text-lg">
            Machines that listen as clearly as humans without stealing the
            conversation.
          </p>
        </div>
      </div>

      {/* Our Origin */}

      <section className="relative text-white md:py-20 py-10 text-center px-4 sm:px-6">
        <div className="max-w-5xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-semibold leading-tight">
            Our Origin
          </h2>

          {/* Subtitle */}
          <p className="mt-6 text-base md:text-lg text-gray-300">
            When co-founders Ritu Mehrotra and Sourav Banerjee battled their own
            mental-health hurdles, they hit a broken system: scarce clinicians,
            sky-high costs, and black-box AI. So they built United We Care—a
            platform powered by a home-grown speech engine and the world’s
            largest clinical knowledge graph, proving precision doesn’t need
            Big-Tech budgets<br />
            That same CPU-first engine became Shunya Labs: a pure deep-tech
            spin-out focused on voice, language, and reasoning at the edge.
          </p>
        </div>
      </section>

      <div className="px-4 md:px-0">
      <div className="rounded-3xl overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] w-full sm:w-[90%] md:w-[700px] shadow-2xl mx-auto mb-16">
        <Image
          src={img}
          alt="Founders"
          width={700}
          height={1000}
          quality={100}
          className="rounded-2xl object-cover object-[50%_30%] w-full h-full"
          loading="lazy"
        />
      </div>
      </div>


      {/* Core Beliefs */}
      <section className="bg-white text-black py-16 px-6">
     <div className="max-w-6xl mx-auto text-center">
  <h2 className="text-4xl font-semibold mb-10">Core Beliefs</h2>

  <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6">
    {coreBeliefs.map((belief, i) => (
      <div
        key={i}
        className="bg-gray-100 rounded-xl py-5 px-4 border-2 border-gray-300 w-full sm:w-[280px] md:w-[300px] lg:w-[320px]"
      >
        <div className="w-14 h-14 mx-auto bg-gray-200 rounded-full mb-2 flex items-center justify-center">
          {belief.icon}
        </div>
        <h3 className="font-semibold text-xl">{belief.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{belief.desc}</p>
      </div>
    ))}
  </div>
</div>

    </section>
    </div>

    <Milestones />
    <HomeFooter/>
    <MainFooter/>
    </>
  );
};

export default AboutUs;