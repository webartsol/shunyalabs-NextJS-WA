import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Speech Technology for Studios, Broadcasters & Media Platforms | Shunya Labs",
    description: "Accelerate content creation with Shunya Labs’ AI-powered speech recognition and dubbing technology. Transcribe, subtitle, and localize videos in 216+ languages for global media distribution.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/media-entertainment",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "AI Speech Technology for Studios, Broadcasters & Media Platforms | Shunya Labs",
    description:
      "Accelerate content creation with Shunya Labs’ AI-powered speech recognition and dubbing technology. Transcribe, subtitle, and localize videos in 216+ languages for global media distribution.",
    url: "https://www.shunyalabs.ai/media-entertainment",
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
    title: "AI Speech Technology for Studios, Broadcasters & Media Platforms | Shunya Labs",
    description:
      "Accelerate content creation with Shunya Labs’ AI-powered speech recognition and dubbing technology. Transcribe, subtitle, and localize videos in 216+ languages for global media distribution.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function MediaEntertainment({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
