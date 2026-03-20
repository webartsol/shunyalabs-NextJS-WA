import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voice AI, Text to Speech & Type to Speech: The Technologies Quietly Changing How We Communicate",
    description: "Understand the real difference between Voice AI, Text to Speech, and Type to Speech. Learn how Shunya Labs is building the tools that make spoken communication smarter, faster, and more human.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/voice-ai-text-to-speech-type-to-speech",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
