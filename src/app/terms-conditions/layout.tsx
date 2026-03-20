import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions | Shunya Labs Legal Policy",
    description: "Review the terms and conditions governing your use of Shunya Labs’ website, products, and AI services. Understand your rights, responsibilities, and our commitment to transparency and compliance.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/terms-conditions",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Terms & Conditions | Shunya Labs Legal Policy",
    description:
      "Review the terms and conditions governing your use of Shunya Labs’ website, products, and AI services. Understand your rights, responsibilities, and our commitment to transparency and compliance.",
    url: "https://www.shunyalabs.ai/terms-conditions",
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
    title: "Terms & Conditions | Shunya Labs Legal Policy",
    description:
      "Review the terms and conditions governing your use of Shunya Labs’ website, products, and AI services. Understand your rights, responsibilities, and our commitment to transparency and compliance.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function TermsConditions({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
