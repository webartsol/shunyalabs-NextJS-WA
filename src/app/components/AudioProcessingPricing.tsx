'use client';
import React from 'react';

interface AudioProduct {
    id: string;
    name: string;
    payAsYouGoPrice: number;
    volumePrice: number;
}

const AUDIO_PRODUCTS: AudioProduct[] = [
    {
        id: "denoiser",
        name: "Denoiser",
        payAsYouGoPrice: 0.0039,
        volumePrice: 0.0034
    },
    {
        id: "enhancer",
        name: "Enhancer",
        payAsYouGoPrice: 0.0039,
        volumePrice: 0.0034
    }
];

export default function AudioProcessingPricing() {
    return (
        <div className="w-full max-w-[1330px] mx-auto py-20 px-6">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Audio Processing
                </h2>
                <p className="text-gray-400 text-lg">
                    Get better transcripts with cleaner audio.
                </p>
            </div>

            {/* Pricing Table */}
            <div className="border border-gray-700 rounded-2xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-[3fr_1fr_1fr] bg-gradient-to-r from-gray-800/50 to-gray-700/30 border-b border-gray-700">
                    <div className="px-8 py-4">
                        <h3 className="text-white font-semibold text-lg">Product</h3>
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
                    {AUDIO_PRODUCTS.map((product, index) => (
                        <div
                            key={product.id}
                            className={`grid grid-cols-[3fr_1fr_1fr] ${index < AUDIO_PRODUCTS.length - 1 ? 'border-b border-gray-800/50' : ''
                                } bg-black/60 hover:bg-gray-900/40 transition-colors`}
                        >
                            <div className="px-8 py-6">
                                <h4 className="text-white font-medium text-base">
                                    {product.name}
                                </h4>
                            </div>
                            <div className="px-8 py-6 text-center flex items-center justify-center">
                                <span className="text-white font-semibold text-xl">
                                    ${product.payAsYouGoPrice.toFixed(4)}
                                </span>
                            </div>
                            <div className="px-8 py-6 text-right flex items-center justify-end">
                                <span className="text-white font-semibold text-xl">
                                    ${product.volumePrice.toFixed(4)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
