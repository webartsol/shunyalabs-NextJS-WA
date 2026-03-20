'use client';
import React from 'react';

interface IntelligenceFeature {
    id: string;
    name: string;
    description: string;
    payAsYouGoPrice: number;
    volumePrice: number;
}

const INTELLIGENCE_FEATURES: IntelligenceFeature[] = [
    {
        id: "language-identification",
        name: "Language Identification",
        description: "Automatically detect the language in your audio files",
        payAsYouGoPrice: 0.0001,
        volumePrice: 0.00009
    },
    {
        id: "translation",
        name: "Translation",
        description: "Translate audio during or after transcription",
        payAsYouGoPrice: 0.0003,
        volumePrice: 0.00027
    },
    {
        id: "transliteration",
        name: "Transliteration",
        description: "Convert output to your preferred script",
        payAsYouGoPrice: 0.0003,
        volumePrice: 0.00027
    },
    {
        id: "speaker-diarization",
        name: "Speaker Diarization",
        description: "Separate transcripts by speaker automatically",
        payAsYouGoPrice: 0.0012,
        volumePrice: 0.001
    },
    {
        id: "speaker-identification",
        name: "Speaker Identification",
        description: "Customize speaker labels for personalized transcripts",
        payAsYouGoPrice: 0.0009,
        volumePrice: 0.0008
    },
    {
        id: "word-timestamps",
        name: "Word Timestamps",
        description: "Word-level timing for precise navigation",
        payAsYouGoPrice: 0.0012,
        volumePrice: 0.001
    },
    {
        id: "profanity-keyword-hashing",
        name: "Profanity and Keyword Hashing",
        description: "Filter and mask profanity or custom keywords",
        payAsYouGoPrice: 0.0003,
        volumePrice: 0.00027
    },
    {
        id: "intent-detection",
        name: "Intent Detection",
        description: "Understand the purpose behind every conversation",
        payAsYouGoPrice: 0.0003,
        volumePrice: 0.00027
    },
    {
        id: "sentiment-analysis",
        name: "Sentiment Analysis",
        description: "Track emotional tone across interactions",
        payAsYouGoPrice: 0.0003,
        volumePrice: 0.00027
    },
    {
        id: "emotion-diarization",
        name: "Emotion Diarization",
        description: "Get granular emotion tracking throughout conversations",
        payAsYouGoPrice: 0.0005,
        volumePrice: 0.00045
    },
    {
        id: "summarization",
        name: "Summarization",
        description: "Generate concise summaries from audio or text",
        payAsYouGoPrice: 0.0003,
        volumePrice: 0.00027
    },
    {
        id: "keyword-normalization",
        name: "Keyword Normalization",
        description: "Standardize brand names, acronyms, and custom terminology",
        payAsYouGoPrice: 0.0003,
        volumePrice: 0.00027
    },
    {
        id: "medical-keyterm-correction",
        name: "Medical Keyterm Correction",
        description: "Ensure accurate transcription of medical terminology",
        payAsYouGoPrice: 0.0003,
        volumePrice: 0.00027
    }
];

export default function SpeechIntelligenceFeatures() {
    return (
        <div className="w-full max-w-[1330px] mx-auto py-20 px-6">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Speech Intelligence Features
                </h2>
                <p className="text-gray-400 text-lg">
                    Get analytics directly from speech and formatted outputs for integration into your workflows.
                </p>
            </div>

            {/* Pricing Table */}
            <div className="border border-gray-700 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[3fr_1fr_1fr] bg-gradient-to-r from-gray-800/50 to-gray-700/30 border-b border-gray-700">
                    <div className="px-8 py-4">
                        <h3 className="text-white font-semibold text-lg">Feature</h3>
                    </div>
                    <div className="px-8 py-4 text-center">
                        <h3 className="text-white font-semibold text-lg">
                            Pay as you go
                            <span className="block text-xs text-gray-400 font-normal mt-1">(USD/min)</span>
                        </h3>
                    </div>
                    <div className="px-8 py-4 text-right">
                        <h3 className="text-white font-semibold text-lg">
                            Volume
                            <span className="block text-xs text-gray-400 font-normal mt-1">(USD/min)</span>
                        </h3>
                    </div>
                </div>

                {/* Table Rows */}
                <div>
                    {INTELLIGENCE_FEATURES.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={`grid grid-cols-[3fr_1fr_1fr] border-b border-gray-800/50 last:border-b-0 ${index % 2 === 0 ? 'bg-black/60' : 'bg-black/40'
                                } hover:bg-gray-900/40 transition-colors`}
                        >
                            <div className="px-8 py-6">
                                <h4 className="text-white font-medium text-base mb-1">
                                    {feature.name}
                                </h4>
                                <p className="text-gray-400 text-sm">
                                    {feature.description}
                                </p>
                            </div>
                            <div className="px-8 py-6 text-center flex items-center justify-center">
                                <span className="text-white font-semibold text-xl">
                                    ${feature.payAsYouGoPrice.toFixed(4)}
                                </span>
                            </div>
                            <div className="px-8 py-6 text-right flex items-center justify-end">
                                <span className="text-white font-semibold text-xl">
                                    ${feature.volumePrice.toFixed(5)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
