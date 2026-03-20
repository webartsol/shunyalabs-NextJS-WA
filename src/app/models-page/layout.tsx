import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voice AI Models for Speech-to-Text & Multilingual AI | Shunya Labs",
    description: "Explore Shunya Labs voice AI models built for speech-to-text, multilingual transcription, and domain-specific applications across 200+ languages.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/models-page",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Voice AI Models for Speech-to-Text & Multilingual AI | Shunya Labs",
    description:
      "Explore Shunya Labs voice AI models built for speech-to-text, multilingual transcription, and domain-specific applications across 200+ languages.",
    url: "https://www.shunyalabs.ai/models-page",
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
    title: "Voice AI Models for Speech-to-Text & Multilingual AI | Shunya Labs",
    description:
      "Explore Shunya Labs voice AI models built for speech-to-text, multilingual transcription, and domain-specific applications across 200+ languages.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
