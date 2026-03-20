'use client';
import React, { useEffect, useRef, useState } from 'react';

interface MilestonesProps {
  backgroundClass?: string; // for section background (default black)
  showGlow?: boolean;       // toggle glowing circles
  glowColor?: string;       // customize glow color (Tailwind class)
}

const useCounterOnScroll = (target: number, duration = 1500) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const isDecimal = target % 1 !== 0;
    const steps = isDecimal ? 100 : target;
    const increment = target / steps;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return { count, ref };
};

export default function Milestones({
  backgroundClass = 'bg-[#0B0B0F]',
  showGlow = true,
  glowColor = 'bg-blue-600/40',
}: MilestonesProps) {
  const latency = useCounterOnScroll(200);
  const languages = useCounterOnScroll(216);
  const gpu = useCounterOnScroll(85);
  const cpu = useCounterOnScroll(3.1);

  return (
    <section
      className={`relative z-0 overflow-hidden text-white py-16 px-6 md:px-10 ${backgroundClass}`}
    >
      {/* ✅ Optional Glowing Layer */}
      {showGlow && (
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div
            className={`absolute top-[100px] left-[50px] w-[300px] h-[300px] ${glowColor} rounded-full blur-[120px]`}
          ></div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-3xl font-semibold mb-12">Milestones</h2>

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-5 mb-5">
          <div
            ref={latency.ref}
            className="md:col-span-7 bg-white rounded-xl px-12 py-10 flex flex-col justify-center"
          >
            <p className="text-6xl font-bold mb-2">
              <span className="bg-gradient-to-r from-[#7F00FF] to-[#3A7BD5] bg-clip-text text-transparent">
                {Math.round(latency.count)}
              </span>
              <span className="text-gray-600 text-3xl font-medium ml-1">ms</span>
            </p>
            <p className="text-gray-600 text-sm">
              round-trip latency in production
            </p>
          </div>

          <div
            ref={languages.ref}
            className="md:col-span-3 bg-gradient-to-br from-[#7F00FF] to-[#3A7BD5] rounded-xl px-12 py-10 flex flex-col justify-center"
          >
            <p className="text-5xl font-bold mb-1">{Math.round(languages.count)}</p>
            <p className="text-white/90 text-sm">languages & dialects</p>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            ref={gpu.ref}
            className="bg-gradient-to-br from-[#6A11CB] to-[#2575FC] rounded-xl px-12 py-10 flex flex-col justify-center"
          >
            <p className="text-5xl font-bold mb-1">{Math.round(gpu.count)}%</p>
            <p className="text-white/90 text-sm">
              GPU cost saved for a Fortune 100 logistics client
            </p>
          </div>

          <div
            ref={cpu.ref}
            className="bg-white rounded-xl px-12 py-10 flex flex-col justify-center"
          >
            <p className="text-5xl font-bold mb-1">
              <span className="bg-gradient-to-r from-[#3A7BD5] to-[#7F00FF] bg-clip-text text-transparent">
                {cpu.count.toFixed(2)}%
              </span>
            </p>
            <p className="text-gray-600 text-sm">Word error rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
