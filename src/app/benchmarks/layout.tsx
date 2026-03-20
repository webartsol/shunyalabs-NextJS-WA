import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speech-to-Text AI Benchmarks & Accuracy Results | Shunya Labs",
    description: "See how Shunya Labs speech-to-text models perform on global benchmarks. Achieve higher word accuracy and up to 48% fewer transcription errors than competing models.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/benchmarks",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Speech-to-Text AI Benchmarks & Accuracy Results | Shunya Labs",
    description:
      "See how Shunya Labs speech-to-text models perform on global benchmarks. Achieve higher word accuracy and up to 48% fewer transcription errors than competing models.",
    url: "https://www.shunyalabs.ai/benchmarks",
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
    title: "Speech-to-Text AI Benchmarks & Accuracy Results | Shunya Labs",
    description:
      "See how Shunya Labs speech-to-text models perform on global benchmarks. Achieve higher word accuracy and up to 48% fewer transcription errors than competing models.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
