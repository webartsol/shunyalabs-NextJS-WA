import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why Indic Language Voice AI Is the Most Underserved AI Market",
    description: "Why do standard speech APIs fail for Hindi, Tamil & Marathi users? We break down the Indic voice AI gap, the technical reasons, and what production-grade looks like.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/indic-language-voice-ai-biggest-untapped-opportunity",
    },

};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
