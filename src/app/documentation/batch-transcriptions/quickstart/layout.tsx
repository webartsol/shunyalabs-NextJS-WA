import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Developer Quickstart |  Shunya Labs Documentation",
    description: "Learn how to make your first Shunya Labs API request.",
    alternates: {
        canonical: "https://shunyalabs-next-js.vercel.app/documentation/batch-transcriptions/quickstart",
    },
  };

export default function CodeBlock({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
