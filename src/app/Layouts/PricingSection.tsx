'use client';
import React from 'react';
import { IoMdCheckmarkCircle, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { LuSnowflake } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import offerImg from '../../../assets/icons/new-year-offer.svg'
import Image from 'next/image';

export default function PricingSection() {
  const router = useRouter();
  const plans = [
    {
      title: "Pay as you go",
      price: "Free",
      priceDetail: "$200",
      priceSubtext: "of Credit",
      subtitle: "Then pay-as-you-go. No minimums. No expiration. No credit card required.",
      buttonText: "Start for free",
      features: [
        "Industry leading speech to text foundation models",
        "Advanced intelligence features",
        "Custom voice agent orchestrations",
      ],
      buttonStyle: "bg-white text-black hover:bg-gray-100 font-medium",
      bg: "bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] backdrop-blur-sm border border-blue-500/30",
      glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.35)]",
      text: "text-white",
      buttonLink: "https://console.shunyalabs.ai/dashboard",
    },
    {
      title: "Volume",
      price: "$500",
      subtitle: "Prepaid credits for the year with up to 10% lower rates on all services. Credits are redeemed against actual usage.",
      buttonText: "Buy Now",
      features: [
        "Industry leading speech to text foundation models",
        "Advanced intelligence features",
        "Custom voice agent orchestrations",
      ],
      highlight: true,
      newYearOffer: true,
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white font-medium",
      bg: "bg-[#0f0f1e]",
      text: "text-white",
      border: "border border-blue-500/50",
      glow: "hover:shadow-[0_0_60px_rgba(59,130,246,0.45)]",
      buttonLink: "https://console.shunyalabs.ai/billing",
    },
    {
      title: "Enterprise",
      price: "Custom pricing",
      subtitle: "For businesses with large volumes, data or deployment requirements, or support needs.",
      buttonText: "Contact Sales",
      features: [
        "Access all models with our best discounts",
        "Access to custom-trained speech-to-text models and intelligence features",
        "Highest concurrency support",
        "Self-hosted deployment options",
        "Dedicated SLAs and support",
      ],
      buttonStyle: "bg-white text-black hover:bg-gray-100 font-medium",
      bg: "bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1e] backdrop-blur-sm border border-purple-500/30",
      glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]",
      text: "text-white",
      buttonLink: "/contact",
    },
  ];

  return (
    <section className="relative text-white py-12 md:py-20 px-6">
      <div className="max-w-[1330px] mx-auto grid md:grid-cols-3 gap-4 md:gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`mt-12 md:mt-0 relative rounded-2xl transition-all duration-500 ease-out ${plan.glow} ${plan.highlight ? 'scale-105' : ''} ${!plan.newYearOffer ? plan.bg : ''}`}
          >
            {plan.newYearOffer ? (
              <>
                {/* Subtle blue strip behind card top */}
                <div className="absolute left-0 right-0 h-[50px] bg-gradient-to-r from-[#1266ED] to-[#9064E8] rounded-t-3xl -z-10 border-t border-x border-blue-500/30 -top-[30px]">
                </div>

                <div className="relative h-full flex flex-col rounded-2xl border border-blue-500/50 overflow-visible bg-[#0f0f1e]">


                  {/* Header with Background Gradient */}

                  {/* Card Body */}
                  <div className="p-6 md:p-8 bg-[#0f0f1e] rounded-2xl flex-1 flex flex-col relative z-20">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 relative z-10">{plan.title}</h3>
                    <div className="relative z-10">
                      <p className="text-5xl md:text-6xl font-bold text-white mb-4">{plan.price}</p>
                    </div>
                    <p className="text-sm text-white/90 relative z-10 mb-6">{plan.subtitle}</p>
                    <ul className="space-y-4 text-sm mb-8 flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <span className="mt-0.5 relative">
                            <div className="absolute inset-x-[2px] inset-y-[2px] bg-white rounded-full"></div>
                            <IoMdCheckmarkCircle className='text-[22px] text-blue-500 relative z-10' />
                          </span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button onClick={() => { router.push(plan.buttonLink) }}
                      className={`w-full text-base py-3 rounded-full transition-all duration-300 ${plan.buttonStyle}`}
                    >
                      {plan.buttonText}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full p-6 md:p-8 flex flex-col border border-gray-700/40 rounded-2xl bg-[#0f0f1e]/40 backdrop-blur-sm">
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-3 mt-2">{plan.title}</h3>

                <div className="mb-4">
                  {plan.priceDetail ? (
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl md:text-5xl font-bold">{plan.price}</p>
                      <p className="text-2xl font-bold text-gray-400">{plan.priceDetail}</p>
                      <p className="text-xs text-gray-500">{plan.priceSubtext}</p>
                    </div>
                  ) : (
                    <p className="text-3xl md:text-4xl font-bold">{plan.price}</p>
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-6">{plan.subtitle}</p>



                <ul className="space-y-3 text-sm flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="mt-0.5 text-blue-400">
                        <IoMdCheckmarkCircleOutline className='text-[20px]' />
                      </span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button onClick={() => { router.push(plan.buttonLink) }}
                  className={`w-full text-sm md:text-base py-2.5 rounded-full transition-all duration-300 ${plan.buttonStyle} mt-6`}
                >
                  {plan.buttonText}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>


    </section>
  );
}
