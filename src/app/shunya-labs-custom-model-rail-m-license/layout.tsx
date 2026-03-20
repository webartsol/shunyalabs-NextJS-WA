import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shunya Labs Custom Model RAIL-M License | AI Model Licensing",
    description: "Understand the terms for using Shunya Labs custom AI models, including licensing scope, restrictions, deployment rights, and compliance requirements.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/shunya-labs-custom-model-rail-m-license",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Shunya Labs Custom Model RAIL-M License | AI Model Licensing",
    description:
      "Understand the terms for using Shunya Labs custom AI models, including licensing scope, restrictions, deployment rights, and compliance requirements.",
    url: "https://www.shunyalabs.ai/shunya-labs-custom-model-rail-m-license",
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
    title: "Shunya Labs Custom Model RAIL-M License | AI Model Licensing",
    description:
      "Understand the terms for using Shunya Labs custom AI models, including licensing scope, restrictions, deployment rights, and compliance requirements.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
