import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Choose a Speech AI Platform for Indian Enterprise in 2026",
    description: "Not all speech AI platforms work for your language, your audio, or your compliance needs. Here is a practical evaluation framework with the six criteria that actually matter in 2026.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/how-to-choose-a-speech-ai-platform",
    },

};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
