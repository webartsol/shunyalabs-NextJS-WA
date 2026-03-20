import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shunya Labs Blog | Voice AI, Speech Recognition & AI Technology Insights",
    description: "Explore the Shunya Labs Blog for expert insights on Voice AI, speech recognition, multilingual ASR, and real-world AI applications across industries like healthcare, media, and contact centers.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
