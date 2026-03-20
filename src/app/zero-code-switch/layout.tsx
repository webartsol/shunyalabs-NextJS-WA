import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Zero Code Switch AI | Multilingual Speech Recognition for Hinglish & Mixed Languages",
    description: "Zero Code Switch by Shunya Labs enables accurate speech recognition for real-world multilingual conversations like Hinglish. Built to handle code-switching across 200+ languages with high accuracy, low latency, and enterprise-ready deployment.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/zero-code-switch",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Zero Code Switch AI | Multilingual Speech Recognition for Hinglish & Mixed Languages",
    description:
      "Zero Code Switch by Shunya Labs enables accurate speech recognition for real-world multilingual conversations like Hinglish. Built to handle code-switching across 200+ languages with high accuracy, low latency, and enterprise-ready deployment.",
    url: "https://www.shunyalabs.ai/zero-code-switch",
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
    title: "Zero Code Switch AI | Multilingual Speech Recognition for Hinglish & Mixed Languages",
    description:
      "Zero Code Switch by Shunya Labs enables accurate speech recognition for real-world multilingual conversations like Hinglish. Built to handle code-switching across 200+ languages with high accuracy, low latency, and enterprise-ready deployment.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
