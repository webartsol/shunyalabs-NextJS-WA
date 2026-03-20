import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Shunya Labs",
    description: "Shunya Labs builds real-time, privacy-first AI infrastructure for voice, language & reasoning rooted in healthcare, designed for global, on-prem deployments.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/about",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "About Shunya Labs",
    description:
      "Shunya Labs builds real-time, privacy-first AI infrastructure for voice, language & reasoning rooted in healthcare, designed for global, on-prem deployments.",
    url: "https://www.shunyalabs.ai/about",
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
    title: "About Shunya Labs",
    description:
      "Shunya Labs builds real-time, privacy-first AI infrastructure for voice, language & reasoning rooted in healthcare, designed for global, on-prem deployments.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function About({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
