import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import RecaptchaProviderWrapper from "./components/RecaptchaProviderWrapper";
import GaEventBinder from "./modules/widget/components/GTagManager";
// import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voice AI Platform for Developers & Enterprises | Shunya Labs",
  description:
    "Build intelligent voice agents with Shunya Labs. A complete Voice AI stack including speech-to-text, LLM orchestration, and text-to-speech for real-time applications.",
  alternates: {
    canonical: "https://www.shunyalabs.ai/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Voice AI on your terms by Shunyalabs",
    description:
      "Foundation models to voice agents, complete voice AI stack.Built for developers. Ready for enterprises.",
    url: "https://www.shunyalabs.ai/",
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
    title: "Voice AI on your terms by Shunyalabs",
    description:
      "Foundation models to voice agents, complete voice AI stack.Built for developers. Ready for enterprises.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NODE_ENV === "production"
  if (isProd) {
    console.log = () => { }; // Disable logs
    console.warn = () => { }; // Disable warnings
    console.debug = () => { }; // Disable debug logs
  }
  return (
    // <ClerkProvider
    //   appearance={{
    //     variables: {
    //       colorBackground: "#0B0C10",
    //       colorInputBackground: "#1a1a1a",
    //       colorInputText: "#ffffff",
    //       colorText: "#ffffff",
    //       colorTextSecondary: "#9ca3af",
    //       colorPrimary: "#2563eb",
    //       colorDanger: "#ef4444",
    //       borderRadius: "0.5rem",
    //     },
    //     elements: {
    //       // Modal/Container
    //       rootBox: "bg-[#0B0C10]",
    //       modalBackdrop: "bg-black/80",
    //       modalContent: "bg-[#0B0C10] border-0 rounded-xl shadow-2xl",
    //       modalContentTitle: "text-white",
    //       modalContentSubtitle: "text-gray-300",
    //       card: "bg-[#0B0C10] border-0 rounded-xl",

    //       // Header
    //       headerTitle: "text-white",
    //       headerSubtitle: "text-gray-300",

    //       // Buttons
    //       formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg",
    //       formButtonSecondary: "bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white border-0 rounded-lg",
    //       socialButtonsBlockButton: "bg-[#1a1a1a] border-0 text-white hover:bg-[#2a2a2a] rounded-lg shadow-sm",
    //       socialButtonsBlockButtonText: "text-white",
    //       socialButtonsBlockButtonArrow: "text-white",

    //       // Form Fields
    //       formFieldInput: "bg-[#1a1a1a] border-0 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none",
    //       formFieldLabel: "text-gray-300",
    //       formFieldSuccessText: "text-green-400",
    //       formFieldErrorText: "text-red-400",
    //       formFieldInputShowPasswordButton: "text-gray-400 hover:text-white",

    //       // Links
    //       footerActionLink: "text-blue-400 hover:text-blue-300",
    //       footerActionText: "text-gray-400",
    //       identityPreviewText: "text-white",
    //       identityPreviewEditButton: "text-blue-400",

    //       // Dividers
    //       dividerLine: "bg-gray-700",
    //       dividerText: "text-gray-400",

    //       // Other elements
    //       formResendCodeLink: "text-blue-400",
    //       otpCodeFieldInput: "bg-[#1a1a1a] border-0 text-white rounded-lg focus:ring-2 focus:ring-blue-500",
    //       phoneInputBox: "bg-[#1a1a1a] border-0 text-white rounded-lg focus:ring-2 focus:ring-blue-500",
    //       selectButton: "bg-[#1a1a1a] border-0 text-white rounded-lg",
    //       selectOption: "bg-[#0B0C10] text-white hover:bg-[#1a1a1a] rounded-lg",
    //       alertText: "text-white",
    //       alertError: "bg-red-900/20 border-0 text-red-300 rounded-lg",
    //       alertSuccess: "bg-green-900/20 border-0 text-green-300 rounded-lg",
    //     },
    //   }}
    // >
    <html lang="en">
      <head>
        {/* ✅ Preload hero background image for faster first paint */}
        <link
          rel="preload"
          as="image"
          href="/assets/images/main-bg.png"
          type="image/png"
        />
        <link rel="prefetch" as="image" href="/assets/images/main-bg.png" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {/* ✅ GA4 Script Loader */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZECGVMXYLR"
          strategy="afterInteractive"
        />


        {/* ✅ GA4 Config */}
        <Script id="ga4-config" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZECGVMXYLR', {
                page_path: window.location.pathname,
              });
            `}
        </Script>

        <div>
          <RecaptchaProviderWrapper>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#1f2937",
                  color: "#fff",
                  zIndex: 999999, // 🔥 ensure it's above navbar
                  marginTop: "5rem", // 👇 push below navbar (adjust height)
                },
                success: {
                  iconTheme: { primary: "#3ca80d", secondary: "#fff" },
                },
              }}
            />

            <GaEventBinder />
          </RecaptchaProviderWrapper>
        </div>
      </body>
    </html>
    // </ClerkProvider >
  );
}
