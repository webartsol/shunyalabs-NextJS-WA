import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why Multilingual ASR Fails on Real-World Audio, and How Shunya Labs Fixed It",
    description: "Most multilingual ASR systems crumble on real-world audio, especially with Hindi-English code-switching. Learn how Shunya Labs’ Zero STT cracked 200+ languages with production-grade speed and accuracy.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/why-multilingual-voice-ai-fails-on-real-world-audio-and-how-we-fixed-it",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Why Multilingual ASR Fails on Real-World Audio, and How Shunya Labs Fixed It",
    description: "Most multilingual ASR systems crumble on real-world audio, especially with Hindi-English code-switching. Learn how Shunya Labs’ Zero STT cracked 200+ languages with production-grade speed and accuracy.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/Why-multilingual.png",
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
    title: "Why Multilingual ASR Fails on Real-World Audio, and How Shunya Labs Fixed It",
    description: "Most multilingual ASR systems crumble on real-world audio, especially with Hindi-English code-switching. Learn how Shunya Labs’ Zero STT cracked 200+ languages with production-grade speed and accuracy.",
    images: ["/assets/blog/Why-multilingual.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
