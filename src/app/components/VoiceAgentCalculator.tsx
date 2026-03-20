'use client';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { LuBrainCircuit, LuMic, LuVolume2, LuChevronDown } from "react-icons/lu";

interface Model {
  id: string;
  name: string;
  pricePerMin: number;
  description?: string;
}

interface Provider {
  id: string;
  name: string;
  models: Model[];
}

const DATA = {
  stt: [
    {
      id: "shunya",
      name: "Shunya Labs",
      models: [
        { id: "zero-stt", name: "Zero STT", pricePerMin: 0.0045, description: "Supports 200+ languages" },
        { id: "zero-stt-indic", name: "Zero STT Indic", pricePerMin: 0.0050, description: "Superior accuracy for Indic languages" },
        { id: "zero-stt-codeswitch", name: "Zero STT Codeswitch", pricePerMin: 0.0055, description: "Native codeswitch model for multilingual speech" },
        { id: "zero-stt-med", name: "Zero STT Med", pricePerMin: 0.0055, description: "Specialised model for healthcare transcriptions" },
        { id: "zero-stt-numerical", name: "Zero STT Numerical", pricePerMin: 0.0055, description: "Specialised model for transcripts containing numerical values" },
      ]
    },
    {
      id: "deepgram",
      name: "Deepgram",
      models: [
        { id: "whisper-medium", name: "Whisper medium", pricePerMin: 0.0055, description: "Balanced accuracy and speed" },
        { id: "whisper-large", name: "Whisper large", pricePerMin: 0.0055, description: "High accuracy transcription" },
        { id: "whisper-cloud", name: "Whisper cloud", pricePerMin: 0.0055, description: "Cloud-optimized Whisper" },
        { id: "nova-2-general", name: "nova-2-general", pricePerMin: 0.0055, description: "General purpose transcription" },
        { id: "nova-2-conversationalai", name: "nova-2-conversationalai", pricePerMin: 0.0055, description: "Optimized for conversational AI" },
        { id: "nova-2-phonecall", name: "nova-2-phonecall", pricePerMin: 0.0055, description: "Specialized for phone calls" },
        { id: "nova-2-meeting", name: "nova-2-meeting", pricePerMin: 0.0055, description: "Meeting transcription" },
        { id: "nova-2-finance", name: "nova-2-finance", pricePerMin: 0.0055, description: "Financial domain accuracy" },
        { id: "nova-2-medical", name: "nova-2-medical", pricePerMin: 0.0055, description: "Medical terminology support" },
      ]
    },
    {
      id: "cartesia",
      name: "Cartesia",
      models: [
        { id: "ink-whisper", name: "ink-whisper", pricePerMin: 0.004, description: "Fast and accurate transcription" },
      ]
    },
    {
      id: "openai",
      name: "Open AI",
      models: [
        { id: "whisper-1", name: "Whisper-1", pricePerMin: 0.004, description: "Multilingual support" },
      ]
    }
  ],
  llm: [
    {
      id: "openai",
      name: "Open AI",
      models: [
        { id: "gpt-4o-mini", name: "gpt-4o-mini", pricePerMin: 0.0034, description: "Fast & cost-efficient" },
        { id: "gpt-4o", name: "gpt-4o", pricePerMin: 0.056, description: "Most capable model" },
        { id: "gpt-4-turbo", name: "gpt-4-turbo", pricePerMin: 0.056, description: "High performance" },
        { id: "gpt-4", name: "gpt-4", pricePerMin: 0.64, description: "Advanced reasoning" },
        { id: "gpt-3.5-turbo", name: "gpt-3.5-turbo", pricePerMin: 0.004, description: "Fast and affordable" },
      ]
    },
    {
      id: "groq",
      name: "Groq",
      models: [
        { id: "llama-3.1-70b-versatile", name: "llama-3.1-70b-versatile", pricePerMin: 0.004, description: "Versatile large model" },
        { id: "llama-3.1-8b-instant", name: "llama-3.1-8b-instant", pricePerMin: 0.004, description: "Fast inference" },
        { id: "llama-3-70b-8192", name: "llama-3-70b-8192", pricePerMin: 0.004, description: "Extended context" },
      ]
    }
  ],
  tts: [
    {
      id: "openai",
      name: "Open AI",
      models: [
        { id: "alloy", name: "alloy", pricePerMin: 0.0075, description: "Natural & clear" },
        { id: "echo", name: "echo", pricePerMin: 0.0075, description: "Warm and engaging" },
        { id: "fable", name: "fable", pricePerMin: 0.0075, description: "Expressive storytelling" },
        { id: "onyx", name: "onyx", pricePerMin: 0.0075, description: "Deep and authoritative" },
        { id: "nova", name: "nova", pricePerMin: 0.0075, description: "Bright and energetic" },
        { id: "shimmer", name: "shimmer", pricePerMin: 0.0075, description: "Soft and soothing" },
      ]
    },
    {
      id: "cartesia",
      name: "Cartesia",
      models: [
        { id: "barbershop-man", name: "Barbershop Man (English)", pricePerMin: 0.032, description: "Professional male voice" },
        { id: "classy-british-man", name: "Classy British Man (English)", pricePerMin: 0.032, description: "Refined British accent" },
        { id: "calm-lady", name: "Calm Lady (English)", pricePerMin: 0.032, description: "Soothing female voice" },
        { id: "newslady", name: "Newslady (English)", pricePerMin: 0.032, description: "Professional news anchor" },
        { id: "movieman", name: "Movieman (English)", pricePerMin: 0.032, description: "Cinematic narrator" },
      ]
    }
  ]
};

export default function VoiceAgentCalculator() {
  const [selections, setSelections] = useState({
    sttProvider: "shunya",
    sttModel: "zero-stt",
    llmProvider: "openai",
    llmModel: "gpt-4o-mini",
    ttsProvider: "openai",
    ttsModel: "alloy",
  });

  // kis dropdown ko open rakhna hai: e.g. 'stt-provider', 'stt-model', 'llm-provider'...
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // outside click ke liye wrapper ref
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sliderIntervals = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500];
  const [sliderIndex, setSliderIndex] = useState(1);
  const hours = sliderIntervals[sliderIndex];

  const costs = useMemo(() => {
    const stt =
      DATA.stt.find(p => p.id === selections.sttProvider)?.models.find(m => m.id === selections.sttModel)?.pricePerMin || 0;
    const llm =
      DATA.llm.find(p => p.id === selections.llmProvider)?.models.find(m => m.id === selections.llmModel)?.pricePerMin || 0;
    const tts =
      DATA.tts.find(p => p.id === selections.ttsProvider)?.models.find(m => m.id === selections.ttsModel)?.pricePerMin || 0;
    const total = stt + llm + tts;
    return { stt, llm, tts, total };
  }, [selections]);

  const monthlyTotal = useMemo(() => costs.total * 60 * hours, [costs.total, hours]);

  const handleChange = (type: string, field: string, value: string) => {
    setSelections(prev => {
      const next: any = { ...prev, [`${type}${field}`]: value };
      if (field === "Provider") {
        const firstModel = (DATA as any)[type].find((p: any) => p.id === value)?.models[0]?.id;
        next[`${type}Model`] = firstModel;
      }
      return next;
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="w-full max-w-[1330px] px-4 md:px-0 mx-auto mt-32 p-1 relative z-10"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Voice Agents</h2>
        <p className="text-gray-400 text-lg">Calculate your per minute cost for voice agents.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Column */}
        <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-8 md:p-12 space-y-12 relative z-20">
          <Section
            icon={<LuMic className="text-blue-400" />}
            title="Speech to text"
            type="stt"
            providers={DATA.stt}
            selections={selections}
            onChange={handleChange}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <Section
            icon={<LuBrainCircuit className="text-purple-400" />}
            title="LLM"
            type="llm"
            providers={DATA.llm}
            selections={selections}
            onChange={handleChange}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <Section
            icon={<LuVolume2 className="text-cyan-400" />}
            title="Text to Speech"
            type="tts"
            providers={DATA.tts}
            selections={selections}
            onChange={handleChange}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </div>

        {/* Right Column - Summary Panel */}
        <div className="bg-[#0b0b0e] border border-gray-800 rounded-2xl p-8 md:p-10 flex flex-col h-full">
          <h3 className="text-gray-300 font-semibold mb-6">Estimated cost/minute</h3>
          <div className="text-5xl font-bold text-white mb-12">${costs.total.toFixed(4)}</div>

          <div className="relative w-full aspect-square max-w-[280px] mx-auto mb-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {(() => {
                const circumference = 2 * Math.PI * 40;
                const total = costs.total || 0.0001;
                const sttPercent = costs.stt / total;
                const llmPercent = costs.llm / total;
                const ttsPercent = costs.tts / total;

                const sttLength = sttPercent * circumference;
                const llmLength = llmPercent * circumference;
                const ttsLength = ttsPercent * circumference;

                return (
                  <>
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#3B82F6"
                      strokeWidth="12"
                      strokeDasharray={`${sttLength} ${circumference}`}
                      strokeDashoffset="0"
                      className="transition-all duration-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#A855F7"
                      strokeWidth="12"
                      strokeDasharray={`${llmLength} ${circumference}`}
                      strokeDashoffset={`-${sttLength}`}
                      className="transition-all duration-700"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#06B6D4"
                      strokeWidth="12"
                      strokeDasharray={`${ttsLength} ${circumference}`}
                      strokeDashoffset={`-${sttLength + llmLength}`}
                      className="transition-all duration-700"
                    />
                  </>
                );
              })()}
            </svg>
          </div>

          <div className="space-y-4">
            <LegendItem color="bg-blue-500" label="Speech to text" cost={costs.stt} />
            <LegendItem color="bg-purple-500" label="LLM" cost={costs.llm} />
            <LegendItem color="bg-cyan-500" label="Text to Speech" cost={costs.tts} />
          </div>
        </div>
      </div>

      {/* Monthly Custom Plan Estimator */}
      <div className="mt-12 space-y-8 flex flex-col items-center">
        <div className="w-full bg-[#0b0b0e] border border-blue-500/40 rounded-2xl p-5 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h4 className="text-lg md:text-xl font-semibold text-white">
              Estimate your monthly custom plan for voice agents:
            </h4>
            <div className="md:text-right">
              <div className="text-4xl font-bold text-white">$ {monthlyTotal.toFixed(2)}</div>
            </div>
          </div>

          <div className="relative px-5 pt-5 pb-3 rounded-xl bg-[#001224] border border-[#0a488763]">
            <input
              type="range"
              min="0"
              max="13"
              value={sliderIndex}
              onChange={(e) => setSliderIndex(Number(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-600 outline-none
                        [&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:-mt-[9px]
                        [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(255,255,255,0.5)] [&::-webkit-slider-thumb]:cursor-grab 
                        [&::-webkit-slider-thumb]:active:cursor-grabbing transition"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${(sliderIndex / 13) * 100}%, rgba(255,255,255,0.2) ${(sliderIndex / 13) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            <div className='flex justify-between text-gray-500 md:hidden text-lg'>
              <span>10</span>
              <span>500</span>
            </div>

            <div className="relative ms-3 w-[98.2%] mt-2 h-8 hidden md:block">
              {sliderIntervals.map((value, index) => (
                <div
                  key={value}
                  className="absolute flex flex-col items-center transform -translate-x-1/2"
                  style={{ left: `${(index / 13) * 100}%` }}
                >
                  <div className="w-px h-2 bg-gray-600 mb-1"></div>
                  <span className="text-base font-medium text-gray-500 whitespace-nowrap">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs md:text-right text-gray-500 mt-4 uppercase tracking-widest">
            Hours required per month
          </div>
        </div>

        <a
          href="/contact"
          className="bg-[#0070f3] hover:bg-[#0060df] text-white px-10 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-95 shadow-[0_0_30px_rgba(0,112,243,0.3)]"
        >
          Add ${Math.round(monthlyTotal)} to wallet
        </a>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  type,
  providers,
  selections,
  onChange,
  openDropdown,
  setOpenDropdown,
}: any) {
  const currentProvider = providers.find(
    (p: any) => p.id === (selections as any)[`${type}Provider`]
  );
  const currentModel = currentProvider?.models.find(
    (m: any) => m.id === (selections as any)[`${type}Model`]
  );

  const providerKey = `${type}-provider`;
  const modelKey = `${type}-model`;

  const providerOpen = openDropdown === providerKey;
  const modelOpen = openDropdown === modelKey;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center text-2xl shadow-inner">
          {icon}
        </div>
        <h4 className="text-xl font-bold text-white">{title}</h4>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Provider Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-widest px-1">
            Provider
          </label>
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(providerOpen ? null : providerKey)
              }
              className="w-full h-[60px] bg-[#0d1117] border border-gray-800 hover:border-blue-500/50 text-white rounded-xl px-5 transition cursor-pointer outline-none shadow-lg flex items-center justify-between"
            >
              <span>{currentProvider?.name}</span>
              <LuChevronDown
                className={`text-gray-500 transition-transform ${providerOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {providerOpen && (
              <div className="absolute z-50 w-full mt-2 bg-[#0d1117] border border-blue-500/50 rounded-xl shadow-2xl overflow-hidden">
                {providers.map((p: any) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onChange(type, "Provider", p.id);
                      setOpenDropdown(null);
                    }}
                    className={`px-5 py-3 cursor-pointer transition-colors ${
                      p.id === currentProvider?.id
                        ? 'bg-white text-black'
                        : 'hover:bg-gray-800/50 text-white'
                    }`}
                  >
                    {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Model Dropdown */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-widest px-1">
            Model
          </label>
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(modelOpen ? null : modelKey)
              }
              className="w-full h-[60px] bg-[#0d1117] border border-gray-800 hover:border-blue-500/50 text-white rounded-xl px-5 transition cursor-pointer outline-none shadow-lg flex items-center justify-between"
            >
              <span className="font-medium text-left">{currentModel?.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-purple-400 text-sm font-semibold">
                  ${currentModel?.pricePerMin}/min
                </span>
                <LuChevronDown
                  className={`text-gray-500 transition-transform ${modelOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>
            {modelOpen && (
              <div
                className="absolute z-50 w-full mt-2 bg-[#0d1117] border border-blue-500/50 rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto
                  [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:bg-gray-800/50
                  [&::-webkit-scrollbar-track]:rounded-full
                  [&::-webkit-scrollbar-thumb]:bg-blue-500/50
                  [&::-webkit-scrollbar-thumb]:rounded-full
                  [&::-webkit-scrollbar-thumb]:hover:bg-blue-500/70
                  scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-blue-500/50"
              >
                {currentProvider?.models.map((m: any) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      onChange(type, "Model", m.id);
                      setOpenDropdown(null);
                    }}
                    className={`px-5 py-4 cursor-pointer transition-colors border-b border-gray-800/50 last:border-b-0 ${
                      m.id === currentModel?.id
                        ? 'bg-white/10'
                        : 'hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{m.name}</span>
                        {m.description && (
                          <span className="text-xs text-gray-400 mt-1">
                            {m.description}
                          </span>
                        )}
                      </div>
                      <span className="text-purple-400 text-sm font-semibold ml-4">
                        ${m.pricePerMin}/min
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label, cost }: { color: string; label: string; cost: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-3">
        <div className={`w-1 h-4 ${color} rounded-full`} />
        <span className="text-gray-400">{label}</span>
      </div>
      <span className="text-white font-bold">$ {cost.toFixed(4)}</span>
    </div>
  );
}
