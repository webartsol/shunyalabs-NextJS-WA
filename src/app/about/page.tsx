import React from 'react'
import Navbar from '../Layouts/Navbar'
import MainFooter from '../Layouts/MainFooter';
import { Library, Layers, Shield, Cpu, GitMerge, CirclePile, Waypoints, Layers2, LibraryBig } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import ParticleWaves from '../components/ParticleWaves';
import ritu from '../../../assets/images/Ritu-malhotra.jpg';
import sourav from '../../../assets/images/sourav-bandyopadhyay.jpg';
import abhishek from '../../../assets/images/abhishek-sharma.jpg';
import arti from '../../../assets/images/arti_khanijo.jpg';
import vivek from '../../../assets/images/vivek-jain.png';
import about from '../../../assets/images/about-us-bigger-image.jpg';
import Image from 'next/image';
import img1 from '../../../assets/images/import1.jpg';
import img2 from '../../../assets/images/import2.jpg';
import { FiArrowUpRight } from "react-icons/fi";
import Link from 'next/link';
import heathcare from '../../../assets/images/hcare.jpg';
import contactcenters from '../../../assets/images/ccenter.jpg';
import media from '../../../assets/images/mne.jpg'

function page() {

  const whatSetsUsApartData = [
    {
      icon: <LibraryBig className="w-8 h-8 text-white mb-6" strokeWidth={1.5} />,
      title: "First-principles research",
      description: "Proprietary training methodology, model architecture, and training data to improve baseline accuracy.",
      batch: "RESEARCH"
    },
    {
      icon: <Layers2 className="w-8 h-8 text-white mb-6" strokeWidth={1.5} />,
      title: "Foundation models",
      description: "We build foundation models for voice, including models that understand and produce state-of-the-art speech.",
      batch: "MODELS"
    },
    {
      icon: <Shield className="w-8 h-8 text-white mb-6" strokeWidth={1.5} />,
      title: "Privacy-first solutioning",
      description: "On-prem deployment and custom agent architectures for enterprise-grade security.",
      batch: "SECURITY"
    },
    {
      icon: <Cpu className="w-8 h-8 text-white mb-6" strokeWidth={1.5} />,
      title: "CPU-first architecture",
      description: "Lightweight models designed to run on a CPU for maximum accessibility.",
      batch: "DEPLOYMENT"
    },
    {
      icon: <Waypoints className="w-8 h-8 text-white mb-6" strokeWidth={1.5} />,
      title: "Full stack orchestration",
      description: "End-to-end platform for agent orchestration, with custom logic for enterprise workflows.",
      batch: "PLATFORM"
    },
    {
      icon: <CirclePile className="w-8 h-8 text-white mb-6" strokeWidth={1.5} />,
      title: "Open-source community",
      description: "Commitment to open models for the community on Hugging Face.",
      batch: "COMMUNITY"
    },
  ];

  const users = [
    {
      title: "Healthcare",
      desc: "Clinical documentation, transcription",
      image: heathcare,
      href: "/healthcare",
    },
    {
      title: "Contact Centers",
      desc: "Transcription, sentiment, agent intelligence",
      image: contactcenters,
      href: "/contact-centers",
    },
    {
      title: "Media & Entertainment",
      desc: "Dubbing, lipsync, 200+ languages",
      image: media,
      href: "/media-entertainment",
    },
  ];


  return (
    <>
      <div className='py-20 bg-[#0B0B0F] min-h-screen'>
        <Navbar />
        <section className="relative text-white md:py-24 py-16 text-center ">

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8"> About Shunya Labs</h1>
          </div>

          {/* Particle Waves - Widened to 100% */}
          <div className="relative w-full">
            <ParticleWaves />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <p className="mt-6 text-xl mx-auto text-gray-400">
              We’re a research-forward organization building <span className='text-[#00DFFA]'>custom voice models</span> for regional languages and mixed speech. Our goal is to make the voice interface of technology accessible to everyone.
            </p>
            <p className="mt-6 text-xl mx-auto text-gray-400">
              We started our journey with  <span className='text-[#00DFFA]'>Zero STT</span>, the world’s most accurate transcription model, and expanded into complete <span className='text-[#00DFFA]'>voice agents</span> that can be deployed in air-gapped environments.
            </p>
          </div>

        </section>

        <section className="py-16 text-white max-w-[1300px] mx-auto px-4">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-medium mb-12">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
              {whatSetsUsApartData.map((item, index) => (
                <div key={index} className="border border-[#686868] px-6 py-10 rounded-xl shadow-md hover:shadow-lg">
                  {item.icon}
                  <div className="text-xs mb-4 text-[#00DFFA] border border-[#00e1fab9] bg-[#0E2931] inline-block px-4 py-1 rounded-full">{item.batch}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className='text-gray-400 mt-4'>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="py-16 max-w-[1350px] mx-auto px-4">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-medium mb-12 text-white">Meet the Team</h2>
            <div className="space-y-4 md:space-y-8">
              {/* Profile 1 */}
              <ProfileCard
                profileImage={ritu}
                name="Ritu Mehrotra"
                role="Co-founder & CEO"
                about="2X founder. Booking.com, Zomato, Mahindra. Understands how AI fails in regulated environments, and how to make it work. MBA, IIFT Delhi."
                linkedinUrl="https://www.linkedin.com/in/ritu-mehrotra-4861043/"
                imagePosition="left"
              />

              <div className="w-full flex justify-center">
                <div className="h-[1px] w-full max-w-[900px]
                  bg-gradient-to-r
                  from-transparent
                  via-white
                  to-transparent
                  opacity-70">
                </div>
              </div>


              <ProfileCard
                profileImage={sourav}
                name="Sourav Bandyopadhyay"
                role="Co-Founder & Chief Scientist"
                about="PhD Scholar, IIT Kharagpur. Proven LLMs will always hallucinate (using Gödel's Incompleteness Theorem). 12 patents, 18 papers, 23 world records. Obsessed with correctness."
                linkedinUrl="https://www.linkedin.com/in/souravbandyo/"
                imagePosition="right"
              />

              <div className="w-full flex justify-center">
                <div className="h-[1px] w-full max-w-[900px]
                  bg-gradient-to-r
                  from-transparent
                  via-white
                  to-transparent
                  opacity-70">
                </div>
              </div>

              <ProfileCard
                profileImage={abhishek}
                name="Abhishek Sharma"
                role="Co-founder & CBO"
                about="Helped build TenMarks (acquired by Amazon) and Dineout (acquired by Swiggy) alongside incredible teams. Learned more from the journey than the outcomes. ISB’Hyderabad (PGPMAX)."
                linkedinUrl="https://www.linkedin.com/in/abhishek78/"
                imagePosition="left"
              />

              <div className="w-full flex justify-center">
                <div className="h-[1px] w-full max-w-[900px]
                  bg-gradient-to-r
                  from-transparent
                  via-white
                  to-transparent
                  opacity-70">
                </div>
              </div>

              <ProfileCard
                profileImage={arti}
                name="Arti Khanijo"
                role="Chief Product Officer"
                about="Worked with global brands like Airtel, ibibo, and Tencent with over 20 years of experience across wellness and consumer tech—known for building scalable, user-first products that create real human impact at the intersection of technology and purpose."
                linkedinUrl="https://www.linkedin.com/in/arti-khanijo-28697514/"
                imagePosition="right"
              />

              <div className="w-full flex justify-center">
                <div className="h-[1px] w-full max-w-[900px]
                  bg-gradient-to-r
                  from-transparent
                  via-white
                  to-transparent
                  opacity-70">
                </div>
              </div>

              <ProfileCard
                profileImage={vivek}
                name="Vivek Jain"
                role="Chief Technology Officer"
                about="Built large-scale data science solutions at Amazon. Expert at turning big ideas into small tasks and small problems into big insights. NIT Trichy."
                linkedinUrl="https://www.linkedin.com/in/vivekjain2/"
                imagePosition="left"
              />

            </div>
          </div>
        </section>

        <section className="w-full text-white py-20">
          <div className="max-w-[1100px] mx-auto px-4">

            {/* Heading */}
            <h2 className="text-3xl font-medium mb-12 text-center">
              Built by a Team of Iconoclastic Researchers and Engineers
            </h2>

            {/* Top Image */}
            <div className="rounded-2xl overflow-hidden mb-10">
              <Image
                src={about}
                alt="Research Team"
                width={1400}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            <div className="mx-auto">

              {/* MAIN GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_2.3fr] gap-6">

                <div className="relative rounded-xl overflow-hidden border border-white/10 p-8 flex flex-col justify-between">
                  {/* Background Image */}
                  <Image
                    src={img1}
                    alt="Patents background"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/60" />

                  {/* Content */}
                  <div className="relative z-10">
                    <h2 className="text-7xl font-bold text-white">12</h2>
                    <p className="text-gray-400 mt-2 ml-4">patents</p>
                  </div>
                </div>

                {/* RIGHT SIDE – 4 CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                  {/* 18+ */}
                  <div className="col-span-1 rounded-xl bg-white p-8 flex flex-col justify-center">
                    <h3 className="text-5xl font-bold text-black">18+</h3>
                    <p className="text-gray-500 mt-2 font-semibold">
                      peer-reviewed publications
                    </p>
                  </div>

                  {/* ZERO STT (WIDER) */}
                  <div className="col-span-1 sm:col-span-2 rounded-xl text-white bg-gradient-to-br from-[#00DFFA] to-[#008494] p-8">
                    <p className="text-sm font-medium ">Zero STT:</p>
                    <div className='flex align-center'>
                      <h3 className="text-5xl font-bold mt-2">
                        3.10%
                      </h3>
                      <span className="ml-4 mt-7 text-lg">
                        word error rate
                      </span>
                    </div>
                    <p className="text-sm mt-2 text-gray-200">
                      <span className="font-medium">best in the industry.</span>
                    </p>
                  </div>

                  {/* 23 WORLD RECORDS */}
                  <div className="col-span-1 relative rounded-xl overflow-hidden border border-white/10 p-8 flex flex-col justify-end">

                    <Image
                      src={img2}
                      alt="World records background"
                      fill
                      className="object-cover object-center scale-110"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/60" />

                    <div className="relative z-10">
                      <h3 className="text-5xl font-bold text-white">23</h3>
                      <p className="text-gray-300 mt-1">world records</p>
                    </div>
                  </div>

                  {/* TEXT CARD (WIDER) */}
                  <div className="col-span-1 sm:col-span-2 rounded-xl relative border border-white/10 bg-[#1B1B1B] p-8 flex items-center">

                    <div
                      className="absolute left-8 top-6 bottom-6 w-[3px] rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, #2FC8EB 0%, #1266ED 100%)',
                      }}
                    />

                    {/* TEXT */}
                    <p className="pl-6 text-[18px] leading-relaxed">
                      <span className="text-gray-400 font-semibold">Research </span>
                      <span className="text-white font-bold">informs</span><br />
                      <span className="text-gray-400 font-semibold"> production.</span>
                      <br />
                      <span className="text-gray-400 font-semibold">Production </span>
                      <span className="text-white font-bold">sharpens</span><br />
                      <span className="text-gray-400 font-semibold"> research.</span>
                    </p>
                  </div>

                </div>

              </div>

              {/* CTA */}
              <div className="flex justify-center mt-10">
                <Link href='https://www.shunyalabs.ai/patents' className="bg-blue-600 hover:bg-blue-500 transition text-sm text-white font-medium px-12 py-3 rounded-md">
                  Read our research
                </Link>
              </div>

            </div>

          </div>
        </section>


        <section className="relative py-20 bg-gradient-to-b text-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <h2 className="text-center text-3xl md:text-4xl font-semibold mb-12">
              Who Uses Shunya
            </h2>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {users.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden hover:border-white/20 transition"
                >
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.desc}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="shrink-0">
                      <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <FiArrowUpRight className="text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>




        <section className="md:py-24 py-12 ">
          <div className="max-w-[1220px] mx-auto px-4 md:px-0">
            {/* Gradient Border Wrapper */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[#A757ED] via-[#5B6CFF] to-[#43B0E8]">

              {/* Inner Box */}
              <div className="rounded-2xl px-6 md:px-[150px] bg-[#1D1D1D] py-16 text-center">

                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-semibold text-white md:px-24">
                  Join
                  <span className="text-[#37BFEB]"> Us</span>
                </h2>


                {/* Subtext */}
                <p className="mt-6 max-w-3xl mx-auto text-gray-400 text-lg md:text-2xl leading-relaxed">
                  We're building voice infrastructure for the next decade.
                </p>

                <p className="mt-4 text-gray-400 text-lg md:text-xl">
                  Hiring <span className='text-white text-semibold'>engineers, researchers</span> and <span className='text-white text-semibold'>linguists</span> who care about deployable intelligence.

                </p>

                {/* CTA Button */}
                <div className="mt-10">
                  <Link href='mailto:0@shunyalabs.ai' className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-6 py-2 text-white font-medium hover:bg-[#1d4ed8] transition">
                    careers@shunyalabs.ai
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
      <MainFooter />
    </>
  )
}

export default page