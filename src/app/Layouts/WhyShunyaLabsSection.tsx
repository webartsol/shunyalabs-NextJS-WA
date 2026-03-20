import React from 'react';
import { Shield, Cpu, Zap, Lock, Code } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "CPU-compatible Architecture",
      badge: "Deploy anywhere, anytime",
      description: "Runs fast on standard servers—no GPUs required, no vendor lock-in",
      position: "left"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Built for accurate performance",
      badge: "Under-3% WER",
      description: "Very low error rates and strong noise handling—call floors, street audio, you name it",
      position: "top"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Blazing fast",
      badge: "Sub-100 ms latency",
      description: "Sub-100 ms latency end to end—responsive captions and prompts that stay smooth under bursty traffic",
      position: "right"
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Privacy by design",
      badge: "Your data stays yours",
      description: "Keeps data on your own systems. Air-gap friendly with enterprise compliance (HIPAA, SOC 2)",
      position: "bottom-left"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Open & Portable",
      badge: "No platform prison",
      description: "Standard APIs, multiple SDKs, container-ready. Integrate with your existing stack in minutes",
      position: "bottom-right"
    }
  ];

  const FeatureCard = ({ feature }:any) => (
    <div className="bg-gradient-to-r from-[#F0EAFF] to-[#FFFFFF] rounded-xl p-3 shadow-lg w-full max-w-[350px] mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="w-9 h-9 bg-gradient-to-r from-[#A477FD] to-[#624797] rounded-full flex items-center justify-center mb-3 text-white">
          {feature.icon}
        </div>
        <h3 className="text-gray-900 font-semibold text-base mb-1.5">
          {feature.title}
        </h3>
        <div className="bg-gray-100 border border-[#9064E9] rounded-full px-2.5  mb-2">
          <span className="text-gray-700 text-xs font-medium">
            {feature.badge}
          </span>
        </div>
        <p className="text-gray-600 text-xs leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#0B0B0F] py-10 px-4  flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-3">
            Why Shunya Labs?
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            We solve the fundamental problems that make voice AI expensive, slow, and insecure.
          </p>
        </div>

        {/* Mobile Layout - Stacked Cards */}
        <div className="lg:hidden flex flex-col gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* Desktop Layout - Circular Positioning */}
        <div className="hidden lg:block relative mx-auto circle-bg" style={{ maxWidth: '1000px' }}>
          {/* Top Card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <FeatureCard feature={features[1]} />
          </div>

          {/* Left Card */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2">
            <FeatureCard feature={features[0]} />
          </div>

          {/* Right Card */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <FeatureCard feature={features[2]} />
          </div>

          {/* Bottom Left Card */}
          <div className="absolute bottom-0 left-1/4 -translate-x-1/2">
            <FeatureCard feature={features[3]} />
          </div>

          {/* Bottom Right Card */}
          <div className="absolute bottom-0 right-1/4 translate-x-1/2">
            <FeatureCard feature={features[4]} />
          </div>

          {/* Compact Spacer for layout */}
          <div className="h-[600px]"></div>
        </div>
      </div>
    </div>
  );
}
