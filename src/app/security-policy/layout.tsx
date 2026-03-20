import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Security Policy | Shunya Labs",
    description: "Learn how Shunya Labs ensures the confidentiality, integrity, and availability of your data. Our Security Policy outlines encryption standards, access controls, and best practices for safeguarding your information.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/security-policy",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Security Policy | Shunya Labs",
    description:
      "Learn how Shunya Labs ensures the confidentiality, integrity, and availability of your data. Our Security Policy outlines encryption standards, access controls, and best practices for safeguarding your information.",
    url: "https://www.shunyalabs.ai/security-policy",
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
    title: "Security Policy | Shunya Labs",
    description:
      "Learn how Shunya Labs ensures the confidentiality, integrity, and availability of your data. Our Security Policy outlines encryption standards, access controls, and best practices for safeguarding your information.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function SecurityPolicy({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
