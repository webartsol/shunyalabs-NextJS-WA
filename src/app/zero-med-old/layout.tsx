import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Real-Time Medical Documentation AI Zero STT Med By Shubyalabs ",
    description: "Transforming clinical conversations into precise, structured records in real time, With HIPAA, SOC2 & ISO 27001 compliance, it’s designed for secure and privacy-first deployment (cloud, on-premise, or edge).",
    alternates: {
        canonical: "https://www.shunyalabs.ai/zero-med",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Real-Time Medical Documentation AI Zero STT Med By Shubyalabs",
    description:
      "Transforming clinical conversations into precise, structured records in real time, With HIPAA, SOC2 & ISO 27001 compliance, it’s designed for secure and privacy-first deployment (cloud, on-premise, or edge).",
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
    title: "Real-Time Medical Documentation AI Zero STT Med By Shubyalabs",
    description:
      "Transforming clinical conversations into precise, structured records in real time, With HIPAA, SOC2 & ISO 27001 compliance, it’s designed for secure and privacy-first deployment (cloud, on-premise, or edge).",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroMed({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
