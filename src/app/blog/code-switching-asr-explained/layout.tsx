import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Getting Started with ASR APIs | Python Quickstart Guide",
    description: "Most voice technology was built for clean, single-language speech and struggles the moment someone mixes Hindi and English or any other language",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/code-switching-asr-explained",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
