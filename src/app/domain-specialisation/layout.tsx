import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Domain-Specialized Speech-to-Text Models | Shunya Labs",
    description: "Domain-tuned speech-to-text models trained on industry terminology and accents. Improve transcription accuracy for healthcare, support, and enterprise workflows.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/domain-specialisation",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Domain-Specialized Speech-to-Text Models | Shunya Labs",
    description:
      "Domain-tuned speech-to-text models trained on industry terminology and accents. Improve transcription accuracy for healthcare, support, and enterprise workflows.",
    url: "https://www.shunyalabs.ai/domain-specialisation",
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
    title: "Domain-Specialized Speech-to-Text Models | Shunya Labs",
    description:
      "Domain-tuned speech-to-text models trained on industry terminology and accents. Improve transcription accuracy for healthcare, support, and enterprise workflows.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
