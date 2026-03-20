import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Zero Med – Medical Speech-to-Text AI for Healthcare | Shunya Labs",
    description: "Zero Med by Shunya Labs converts clinical conversations into accurate medical transcripts using domain-trained speech-to-text AI built for healthcare workflows.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/zero-med",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Zero Med – Medical Speech-to-Text AI for Healthcare | Shunya Labs",
    description:
      "Zero Med by Shunya Labs converts clinical conversations into accurate medical transcripts using domain-trained speech-to-text AI built for healthcare workflows.",
    url: "https://www.shunyalabs.ai/zero-med",
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
    title: "Zero Med – Medical Speech-to-Text AI for Healthcare | Shunya Labs",
    description:
      "Zero Med by Shunya Labs converts clinical conversations into accurate medical transcripts using domain-trained speech-to-text AI built for healthcare workflows.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
