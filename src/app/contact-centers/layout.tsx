import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Speech Analytics & Voice Intelligence for Contact Centers | Shunya Labs",
    description: "Empower your contact center with AI-driven speech recognition and real-time analytics from Shunya Labs. Boost agent performance, enhance CX, and uncover customer insights with 216+ language support.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/contact-centers",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "AI Speech Analytics & Voice Intelligence for Contact Centers | Shunya Labs",
    description:
      "Empower your contact center with AI-driven speech recognition and real-time analytics from Shunya Labs. Boost agent performance, enhance CX, and uncover customer insights with 216+ language support.",
    url: "https://www.shunyalabs.ai/contact-centers",
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
    title: "AI Speech Analytics & Voice Intelligence for Contact Centers | Shunya Labs",
    description:
      "Empower your contact center with AI-driven speech recognition and real-time analytics from Shunya Labs. Boost agent performance, enhance CX, and uncover customer insights with 216+ language support.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ContactCenters({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
