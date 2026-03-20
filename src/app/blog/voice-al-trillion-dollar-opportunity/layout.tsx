import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why Voice AI Isn’t Just Automation, It’s the Next Trillion-Dollar Enterprise Platform",
    description: "Voice AI is entering its breakthrough moment. Explore how capturing signals, commitments, and decisions from conversations could create the next trillion-dollar enterprise platform.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/voice-al-trillion-dollar-opportunity",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
