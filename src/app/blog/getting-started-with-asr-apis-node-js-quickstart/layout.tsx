import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Getting Started with ASR APIs: A Node.js Quickstart Guide for Developers",
    description: " Discover how Automatic Speech Recognition (ASR) APIs work and learn how to integrate voice-to-text technology into your Node.js apps. Follow this quickstart to build smarter, voice-enabled solutions.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/getting-started-with-asr-apis-node-js-quickstart",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Getting Started with ASR APIs: A Node.js Quickstart Guide for Developers",
    description: " Discover how Automatic Speech Recognition (ASR) APIs work and learn how to integrate voice-to-text technology into your Node.js apps. Follow this quickstart to build smarter, voice-enabled solutions.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/Build-and-Learn-1.png",
        width: 1200,
        height: 630,
        alt: "Shunya Labs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Getting Started with ASR APIs: A Node.js Quickstart Guide for Developers",
    description: " Discover how Automatic Speech Recognition (ASR) APIs work and learn how to integrate voice-to-text technology into your Node.js apps. Follow this quickstart to build smarter, voice-enabled solutions.",
    images: ["/assets/blog/Build-and-Learn-1.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
