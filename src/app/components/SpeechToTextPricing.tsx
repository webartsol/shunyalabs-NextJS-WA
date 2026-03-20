'use client';
import React, { useState } from 'react';

interface STTModel {
    id: string;
    name: string;
    description: string;
    batchPayAsYouGoPrice: number;
    batchVolumePrice: number;
    realtimePayAsYouGoPrice: number;
    realtimeVolumePrice: number;
}

const STT_MODELS: STTModel[] = [
    {
        id: "zero-stt",
        name: "Zero STT",
        description: "Supports 200+ languages",
        batchPayAsYouGoPrice: 0.0039,
        batchVolumePrice: 0.0035,
        realtimePayAsYouGoPrice: 0.0045,
        realtimeVolumePrice: 0.0040
    },
    {
        id: "zero-stt-indic",
        name: "Zero STT Indic",
        description: "Superior accuracy for Indic languages",
        batchPayAsYouGoPrice: 0.0045,
        batchVolumePrice: 0.0040,
        realtimePayAsYouGoPrice: 0.0050,
        realtimeVolumePrice: 0.0045
    },
    {
        id: "zero-stt-codeswitch",
        name: "Zero STT Codeswitch",
        description: "Native codeswitch model for multilingual speech",
        batchPayAsYouGoPrice: 0.0050,
        batchVolumePrice: 0.0045,
        realtimePayAsYouGoPrice: 0.0055,
        realtimeVolumePrice: 0.0050
    },
    {
        id: "zero-stt-med",
        name: "Zero STT Med",
        description: "Specialised model for healthcare transcriptions",
        batchPayAsYouGoPrice: 0.0050,
        batchVolumePrice: 0.0045,
        realtimePayAsYouGoPrice: 0.0055,
        realtimeVolumePrice: 0.0050
    },
    {
        id: "zero-stt-numerical",
        name: "Zero STT Numerical",
        description: "Specialised model for transcripts containing numerical values",
        batchPayAsYouGoPrice: 0.0050,
        batchVolumePrice: 0.0045,
        realtimePayAsYouGoPrice: 0.0055,
        realtimeVolumePrice: 0.0050
    },
    // {
    //     id: "zero-stt-tiny-onnx",
    //     name: "Zero STT Tiny ONNX",
    //     description: "",
    //     batchPrice: 0.003,
    //     realtimePrice: 0.0039,
    //     volumePrice: 0.0035
    // }
];

export default function SpeechToTextPricing() {
    const [mode, setMode] = useState<'batch' | 'realtime'>('batch');

    return (
        <div className="w-full max-w-[1330px] mx-auto py-20 px-6">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Speech to Text
                </h2>
                <p className="text-gray-400 text-lg">
                    Industry-best speech to text foundation models for superior performance.
                </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex justify-center gap-3 mb-8">
                <button
                    onClick={() => setMode('batch')}
                    className={`px-8 py-3 rounded-lg font-medium transition-all ${mode === 'batch'
                        ? 'bg-white text-black'
                        : 'bg-transparent text-gray-400 hover:text-white border border-gray-700'
                        }`}
                >
                    Batch
                </button>
                <button
                    onClick={() => setMode('realtime')}
                    className={`px-8 py-3 rounded-lg font-medium transition-all ${mode === 'realtime'
                        ? 'bg-white text-black'
                        : 'bg-transparent text-gray-400 hover:text-white border border-gray-700'
                        }`}
                >
                    Realtime
                </button>
            </div>

            {/* Pricing Table */}
            <div className="border border-blue-500/30 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[3fr_1fr_1fr] bg-gradient-to-r from-blue-900/30 to-slate-800/30 border-b border-blue-500/30">
                    <div className="px-8 py-4">
                        <h3 className="text-white font-semibold text-lg">Model</h3>
                    </div>
                    <div className="px-8 py-4 text-center">
                        <h3 className="text-white font-semibold text-lg">
                            Pay as you go
                            <span className="block text-xs text-gray-400 font-normal mt-1">(USD/min)</span>
                        </h3>
                    </div>
                    <div className="px-8 py-4 text-right">
                        <h3 className="text-white font-semibold text-lg">Volume
                            <span className="block text-xs text-gray-400 font-normal mt-1">(USD/min)</span>
                        </h3>
                    </div>
                </div>

                {/* Table Rows */}
                <div>
                    {STT_MODELS.map((model, index) => (
                        <div
                            key={model.id}
                            className={`grid grid-cols-[3fr_1fr_1fr] border-b border-gray-800/50 last:border-b-0 ${index % 2 === 0 ? 'bg-black/40' : 'bg-slate-900/20'
                                } hover:bg-blue-900/10 transition-colors`}
                        >
                            <div className="px-8 py-6">
                                <h4 className="text-white font-medium text-base mb-1">
                                    {model.name}
                                </h4>
                                {model.description && (
                                    <p className="text-gray-400 text-sm">
                                        {model.description}
                                    </p>
                                )}
                            </div>
                            <div className="px-8 py-6 text-center flex items-center justify-center">
                                <span className="text-white font-semibold text-xl">
                                    ${mode === 'batch' ? model.batchPayAsYouGoPrice.toFixed(4) : model.realtimePayAsYouGoPrice.toFixed(4)}
                                </span>
                            </div>
                            <div className="px-8 py-6 text-right flex items-center justify-end">
                                <span className="text-white font-semibold text-xl">
                                    ${mode === 'batch' ? model.batchVolumePrice.toFixed(4) : model.realtimeVolumePrice.toFixed(4)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Sales Button */}
            <div className="flex justify-center mt-8">
                <a href="/contact" className="bg-white hover:bg-gray-100 text-black px-10 py-4 rounded-full font-semibold text-base transition-all active:scale-95 shadow-lg">
                    Contact Sales
                </a>
            </div>
        </div>
    );
}
