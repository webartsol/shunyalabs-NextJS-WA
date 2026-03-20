import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Zero STT - Real-Time Speech-to-Text AI for 200+ Languages | Shunya Labs",
    description: "Zero STT by Shunya Labs delivers fast and accurate speech-to-text for 200+ languages. Build real-time transcription, voice agents, and multilingual AI applications.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/zero-stt",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Zero STT - Real-Time Speech-to-Text AI for 200+ Languages | Shunya Labs",
    description:
      "Zero STT by Shunya Labs delivers cutting-edge, on-device speech recognition that works entirely offline — ensuring unmatched privacy, speed, and control. Designed for enterprises, developers, and institutions that handle sensitive data, Zero STT removes the dependency on cloud APIs without sacrificing accuracy.",
    url: "https://www.shunyalabs.ai/zero-stt",
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
    title: "Zero STT - Real-Time Speech-to-Text AI for 200+ Languages | Shunya Labs",
    description:
      "Zero STT by Shunya Labs delivers cutting-edge, on-device speech recognition that works entirely offline — ensuring unmatched privacy, speed, and control. Designed for enterprises, developers, and institutions that handle sensitive data, Zero STT removes the dependency on cloud APIs without sacrificing accuracy.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
