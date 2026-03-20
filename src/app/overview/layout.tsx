import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shunya Labs Voice AI Platform Overview | Speech-to-Text & Voice Agents",
    description: "Explore the Shunya Labs voice AI platform—foundation models, speech-to-text, orchestration intelligence, and text-to-speech to build real-time voice agents.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/overview",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Shunya Labs Voice AI Platform Overview | Speech-to-Text & Voice Agents",
    description:
      "Explore the Shunya Labs voice AI platform—foundation models, speech-to-text, orchestration intelligence, and text-to-speech to build real-time voice agents.",
    url: "https://www.shunyalabs.ai/overview",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/logo-light.png",
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
    title: "Shunya Labs Voice AI Platform Overview | Speech-to-Text & Voice Agents",
    description:
      "Explore the Shunya Labs voice AI platform—foundation models, speech-to-text, orchestration intelligence, and text-to-speech to build real-time voice agents.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
