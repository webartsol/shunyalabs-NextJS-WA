import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voice AI Use Cases – Contact Centers, Healthcare & Automation | Shunya Labs",
    description: "Discover real-world voice AI use cases with Shunya Labs including voice agents, medical documentation, contact center intelligence, and meeting transcription.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/use-cases",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Voice AI Use Cases – Contact Centers, Healthcare & Automation | Shunya Labs",
    description:
      "Discover real-world voice AI use cases with Shunya Labs including voice agents, medical documentation, contact center intelligence, and meeting transcription.",
    url: "https://www.shunyalabs.ai/use-cases",
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
    title: "Voice AI Use Cases – Contact Centers, Healthcare & Automation | Shunya Labs",
    description:
      "Discover real-world voice AI use cases with Shunya Labs including voice agents, medical documentation, contact center intelligence, and meeting transcription.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
