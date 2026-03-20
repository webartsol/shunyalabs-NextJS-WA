import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Top 10 AI Transcription Tools in 2025 | Simple Comparison Guide",
    description:
        "Discover the top 10 AI transcription tools of 2025. Compare accuracy, pricing, and features to find the best speech-to-text software for your needs.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/top-10-ai-transcription-tools-a-simple-comparison",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
