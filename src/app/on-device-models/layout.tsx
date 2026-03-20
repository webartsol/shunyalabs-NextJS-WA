import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "On-Device Speech Recognition Models | Edge AI – Shunya Labs",
    description: "Deploy lightweight speech-to-text models directly on iOS, Android, Linux, and embedded systems. Offline-ready AI for edge devices with high transcription accuracy",
    alternates: {
        canonical: "https://www.shunyalabs.ai/on-device-models",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "On-Device Speech Recognition Models | Edge AI – Shunya Labs",
    description:
      "Deploy lightweight speech-to-text models directly on iOS, Android, Linux, and embedded systems. Offline-ready AI for edge devices with high transcription accuracy",
    url: "https://www.shunyalabs.ai/on-device-models",
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
    title: "On-Device Speech Recognition Models | Edge AI – Shunya Labs",
    description:
      "Deploy lightweight speech-to-text models directly on iOS, Android, Linux, and embedded systems. Offline-ready AI for edge devices with high transcription accuracy",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
