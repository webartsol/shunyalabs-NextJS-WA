"use client";

import { Download } from "lucide-react";

export default function TechnicalRelease() {
    return (
        <section className="w-full bg-black text-white py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">

                {/* Small Label */}
                <p className="text-gray-500 text-sm font-semibold tracking-widest uppercase mb-6">
                    Documentation
                </p>

                {/* Main Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Technical Release
                </h2>

                {/* Description */}
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Complete model specifications,<span className="text-white font-semibold"> BLEU scores for all <br/> 55 languages</span>, and quick start integration guide.
                </p>

                {/* Download Button */}
                <a
                    href="/vak_translate_release.pdf"
                    download
                    className="inline-flex items-center gap-3 border border-white/30 hover:border-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:bg-white hover:text-black"
                >
                    Download Vāḳ Translate Release PDF
                    <Download size={18} />
                </a>

            </div>
        </section>
    );
}
