import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "General RAIL-M License for AI Models | Shunya Labs",
    description: "Read the Shunya Labs General RAIL-M License governing the use, reproduction, and distribution of AI models, including speech recognition, language models, and voice AI technologies with responsible usage guidelines.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/general-rail-m-license",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "General RAIL-M License for AI Models | Shunya Labs",
    description:
      "Read the Shunya Labs General RAIL-M License governing the use, reproduction, and distribution of AI models, including speech recognition, language models, and voice AI technologies with responsible usage guidelines.",
    url: "https://www.shunyalabs.ai/general-rail-m-license",
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
    title: "General RAIL-M License for AI Models | Shunya Labs",
    description:
      "Read the Shunya Labs General RAIL-M License governing the use, reproduction, and distribution of AI models, including speech recognition, language models, and voice AI technologies with responsible usage guidelines.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
