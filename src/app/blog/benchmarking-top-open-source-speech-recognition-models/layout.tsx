import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Automatic Speech Recognition (ASR) & Speech to Text Explained | Complete Guide",
    description: "Discover how Automatic Speech Recognition (ASR) and speech-to-text technology work, their benefits, challenges, and future. Learn why ASR powers everything from Siri to smart devices.",
     alternates: {
        canonical: "https://www.shunyalabs.ai/blog/benchmarking-top-open-source-speech-recognition-models",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
