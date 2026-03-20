import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Multilingual Language Models for Voice AI | Shunya Labs",
    description: "Build global voice applications with Shunya Labs language models. Real-time transcription, code-switching support, and speech recognition across 200+ languages.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/language-models",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Multilingual Language Models for Voice AI | Shunya Labs",
    description:
      "Build global voice applications with Shunya Labs language models. Real-time transcription, code-switching support, and speech recognition across 200+ languages.",
    url: "https://www.shunyalabs.ai/language-models",
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
    title: "Multilingual Language Models for Voice AI | Shunya Labs",
    description:
      "Build global voice applications with Shunya Labs language models. Real-time transcription, code-switching support, and speech recognition across 200+ languages.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
