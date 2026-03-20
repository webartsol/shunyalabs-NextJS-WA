import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode and image optimization
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lsod.in",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "lsod.in",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.csv$/,
      use: "raw-loader",
    });
    return config;
  },

  async rewrites() {
    return [
      // Serve static HTML from public/saml/
      {
        source: "/saml",
        destination: "/saml/index.html",
      },
      {
        source: "/saml/:path(examples|faq|glossary|guidelines|integrations|tests|tools|training)",
        destination: "/saml/:path/index.html",
      },
      // Serve static HTML from public/2026/
      {
        source: "/2026/saml",
        destination: "/2026/saml/index.html",
      },
    ];
  },

  async headers() {
    return [
      {
        // Apply headers to all worklet files
        source: "/modules/realtime/lib/worklets/:path*",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
