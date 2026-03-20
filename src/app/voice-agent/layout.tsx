import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voice Agent Platform for Conversational AI | Shunya Labs",
    description: "Build intelligent voice agents with Shunya Labs. Integrate speech-to-text, LLM orchestration, and text-to-speech in a single API for real-time conversational AI.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/voice-agent",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Voice Agent Platform for Conversational AI | Shunya Labs",
    description:
      "Build intelligent voice agents with Shunya Labs. Integrate speech-to-text, LLM orchestration, and text-to-speech in a single API for real-time conversational AI.",
    url: "https://www.shunyalabs.ai/voice-agent",
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
    title: "Voice Agent Platform for Conversational AI | Shunya Labs",
    description:
      "Build intelligent voice agents with Shunya Labs. Integrate speech-to-text, LLM orchestration, and text-to-speech in a single API for real-time conversational AI.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
