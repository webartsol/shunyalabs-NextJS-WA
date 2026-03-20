import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voice AI Deployment Options – Cloud, On-Prem & Edge | Shunya Labs",
    description: "Deploy Shunya Labs Voice AI on cloud, on-premise, or edge infrastructure. Flexible, secure, and enterprise-ready deployment for speech-to-text and voice AI applications.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/deployment",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Voice AI Deployment Options – Cloud, On-Prem & Edge | Shunya Labs",
    description:
      "Deploy Shunya Labs Voice AI on cloud, on-premise, or edge infrastructure. Flexible, secure, and enterprise-ready deployment for speech-to-text and voice AI applications.",
    url: "https://www.shunyalabs.ai/deployment",
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
    title: "Voice AI Deployment Options – Cloud, On-Prem & Edge | Shunya Labs",
    description:
      "Deploy Shunya Labs Voice AI on cloud, on-premise, or edge infrastructure. Flexible, secure, and enterprise-ready deployment for speech-to-text and voice AI applications.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
