'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import img1 from '../../../assets/images/By default.png'
import img2 from '../../../assets/images/Custom models.png'
import img3 from '../../../assets/images/Intelligence layer.png'
import img4 from '../../../assets/images/Orchestration Framework.png'
import img5 from '../../../assets/images/Channel Integrations.png'
import img6 from '../../../assets/images/Analytics and Observability.png'

export default function ModularVoiceSection() {

  const images = [img1, img2, img3, img4, img5, img6]

  const timelineData = [
    {
      title: "Custom Models",
      desc: "STT, TTS, and SLMs built for specific use cases."
    },
    {
      title: "Intelligence Layer",
      desc: "SLMs for intent recognition, entity extraction, and sentiment analysis."
    },
    {
      title: "Orchestration Framework",
      desc: "Easy to configure business rules, prompts, and conversation flows."
    },
    {
      title: "Channel Integrations",
      desc: "Telephony, web, mobile, and messaging connections."
    },
    {
      title: "Analytics and Observability",
      desc: "Performance tracking, debugging, and optimization."
    }
  ]

  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const sectionRef = useRef<HTMLDivElement>(null)

  // 🔥 Click outside → unlock + reset everything
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
        setSelectedIndex(null)
        setHoverIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Hover has priority over selected
  const currentIndex =
    hoverIndex !== null ? hoverIndex : selectedIndex

  return (
    <section
      ref={sectionRef}
      className="bg-[#0B0B0F] md:bg-transparent text-white py-32 px-6"
    >

      <div className="max-w-[1300px] mx-auto">

        {/* Small Label */}
        {/* <p className="text-center text-xs tracking-widest text-white/40 mb-6">
          HOW IT WORKS
        </p> */}

        {/* Heading */}
        <h2 className="text-center text-3xl mb-16 mx-auto md:mt-[150px] font-semibold">
          Custom Models for Modular Voice Agents
        </h2>

        <div className="grid lg:grid-cols-2 items-center">

          {/* LEFT SIDE */}
          <div
            className="relative pl-16"
            onMouseLeave={() => setHoverIndex(null)} // reset only when leaving full timeline
          >

            <div className="absolute left-10 top-0 bottom-0 w-px bg-white/15" />

            {timelineData.map((item, index) => {

              const isActive = currentIndex === index

              return (
                <div
                  key={index}
                  className="relative mb-14 cursor-pointer"
                  onMouseEnter={() => setHoverIndex(index)} // only enter
                  onClick={() =>
                    setSelectedIndex(prev =>
                      prev === index ? null : index
                    )
                  }
                >

                  {/* Dot */}
                  <div
                    className={`absolute -left-[30px] top-1 w-4 h-4 rounded-full transition-all duration-300
          ${isActive
                        ? "bg-[#00DFFA] scale-125"
                        : "bg-white border border-white/40"
                      }`}
                  />

                  <h3
                    className={`text-lg font-medium transition-colors duration-300
          ${isActive ? "text-[#00DFFA]" : "text-white"}
          `}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm leading-relaxed max-w-md transition-colors duration-300
          ${isActive ? "text-white" : "text-white/60"}
          `}
                  >
                    {item.desc}
                  </p>

                </div>
              )
            })}
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative w-full h-[300px] md:h-[600px] flex items-center md:ml-6">

            <div className="relative w-[140%] lg:-ml-36 h-full">

              {/* Default Image */}
              <Image
                src={images[0]}
                alt="Default Architecture"
                fill
                priority
                className={`object-contain transition-opacity duration-500 ease-in-out ${currentIndex === null ? "opacity-100" : "opacity-0"
                  }`}
              />

              {/* Active Image */}
              {currentIndex !== null && (
                <Image
                  src={images[currentIndex + 1]}
                  alt="Modular Voice Architecture"
                  fill
                  priority
                  className="object-contain transition-opacity duration-500 ease-in-out opacity-100"
                />
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}