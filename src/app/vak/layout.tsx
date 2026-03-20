import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Vāķ – Real-Time Speech-to-Speech Translation for 55 Indian Languages | Shunya Labs",
    description: "Vāķ by Shunya Labs enables real-time speech-to-speech translation across 55 Indian languages. Build multilingual voice agents, voice apps, and AI communication systems.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/vak",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Vāķ – Real-Time Speech-to-Speech Translation for 55 Indian Languages | Shunya Labs",
    description:
      "Vāķ by Shunya Labs enables real-time speech-to-speech translation across 55 Indian languages. Build multilingual voice agents, voice apps, and AI communication systems.",
    url: "https://www.shunyalabs.ai/vak",
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
    title: "Vāķ – Real-Time Speech-to-Speech Translation for 55 Indian Languages | Shunya Labs",
    description:
      "Vāķ by Shunya Labs enables real-time speech-to-speech translation across 55 Indian languages. Build multilingual voice agents, voice apps, and AI communication systems.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
