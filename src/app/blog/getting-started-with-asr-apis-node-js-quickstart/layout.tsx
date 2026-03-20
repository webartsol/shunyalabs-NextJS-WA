import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Getting Started with ASR APIs: A Node.js Quickstart Guide for Developers",
    description: " Discover how Automatic Speech Recognition (ASR) APIs work and learn how to integrate voice-to-text technology into your Node.js apps. Follow this quickstart to build smarter, voice-enabled solutions.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/getting-started-with-asr-apis-node-js-quickstart",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
