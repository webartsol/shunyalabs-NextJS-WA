import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why Multilingual ASR Fails on Real-World Audio, and How Shunya Labs Fixed It",
    description: "Most multilingual ASR systems crumble on real-world audio, especially with Hindi-English code-switching. Learn how Shunya Labs’ Zero STT cracked 200+ languages with production-grade speed and accuracy.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/why-multilingual-voice-ai-fails-on-real-world-audio-and-how-we-fixed-it",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
