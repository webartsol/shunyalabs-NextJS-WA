import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Supported Languages & Codes for Speech-to-Text API | Shunya Labs",
    description: "View the complete list of languages supported by Shunya Labs speech-to-text API. Explore language codes for 200+ languages including Hindi, English, Tamil, Urdu, and more.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/documentation/languages",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Supported Languages & Codes for Speech-to-Text API | Shunya Labs",
    description:
      "View the complete list of languages supported by Shunya Labs speech-to-text API. Explore language codes for 200+ languages including Hindi, English, Tamil, Urdu, and more.",
    url: "https://www.shunyalabs.ai/documentation/languages",
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
    title: "Supported Languages & Codes for Speech-to-Text API | Shunya Labs",
    description:
      "View the complete list of languages supported by Shunya Labs speech-to-text API. Explore language codes for 200+ languages including Hindi, English, Tamil, Urdu, and more.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
