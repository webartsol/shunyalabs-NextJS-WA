import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Press Releases, News & Media Coverage | Shunya Labs",
    description: "Explore the latest news, press releases, and media features about Shunya Labs. Discover how our AI innovations are shaping the future of speech recognition and voice technology worldwide.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/media",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Press Releases, News & Media Coverage | Shunya Labs",
    description:
      "Explore the latest news, press releases, and media features about Shunya Labs. Discover how our AI innovations are shaping the future of speech recognition and voice technology worldwide.",
    url: "https://www.shunyalabs.ai/media",
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
    title: "Press Releases, News & Media Coverage | Shunya Labs",
    description:
      "Explore the latest news, press releases, and media features about Shunya Labs. Discover how our AI innovations are shaping the future of speech recognition and voice technology worldwide.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroMed({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
