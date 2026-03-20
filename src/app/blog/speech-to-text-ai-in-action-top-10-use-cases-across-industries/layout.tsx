import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speech-to-Text AI Applications: Top 10 Industry Use Cases",
    description: "Discover how speech-to-text AI transforms healthcare, education, finance, and more. Explore 10 real-world use cases driving innovation across industries.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/speech-to-text-ai-in-action-top-10-use-cases-across-industries",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
