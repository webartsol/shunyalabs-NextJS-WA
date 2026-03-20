import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speech AI in 2026: What It Is and How Real-Time Voice is Changing Every Industry",
    description: "Speech AI went from experiment to infrastructure in 2026. Here is what it actually is, what drove the explosion, and how real-time voice is already reshaping India across every industry.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/speech-ai-in-2026",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
