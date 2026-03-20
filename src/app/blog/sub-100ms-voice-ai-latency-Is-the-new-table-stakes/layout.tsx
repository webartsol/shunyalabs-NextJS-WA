import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why Sub-100ms Voice AI Latency Is the New Table Stakes",
    description: "Voice AI latency below 500ms is no longer a differentiator. It is the baseline expectation. Here is where the time goes, why pipelines break, and how to fix each layer.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/sub-100ms-voice-ai-latency-Is-the-new-table-stakes",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
