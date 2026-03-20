import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Code-Switching ASR Explained: Why Hinglish Breaks Every Standard Model",
    description: "Explore how to use Automatic Speech Recognition (ASR) APIs in Python. Follow this quickstart to transcribe audio to text and create powerful voice-enabled applications.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/getting-started-with-asr-apis-python-quickstart",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
