// middleware.ts (root folder mein banao)
import { NextResponse } from "next/server";
import { DOCS_URL } from "./app/utils/constants";
import type { NextRequest } from "next/server";
// import { clerkMiddleware } from '@clerk/nextjs/server';

const REDIRECT_RULES = [
  { from: "/api", to: "/" },
  { from: "/legal/terms", to: "/terms-conditions" },
  { from: "/feed", to: "/" },
  { from: "/m1", to: "/zero-med" },
  { from: "/security", to: "/security-policy" },
  { from: "/legal/security", to: "/terms-conditions" },
  { from: "/resources/media", to: "/media" },
  { from: "/pr-news", to: "/media" },
  { from: "/solutions/healthcare", to: "/healthcare" },
  { from: "/legal/privacy", to: "/privacy-policy" },
  { from: "/product/zero-stt", to: "/zero-stt" },
  {
    from: "/developer-documentation",
    to: `${DOCS_URL}/overview`,
  },
  { from: "/product/zero-med", to: "/zero-med" },
  { from: "/comments/feed", to: "/api" },
  { from: "/solutions/media-entertainment", to: "/media-entertainment" },
  { from: "/home/feed", to: "/" },
  { from: "/about-us", to: "/about" },
  { from: "/solutions/contact-centers", to: "/contact-centers" },
  { from: "/pingala/", to: "/zero-stt" },
  { from: "/pingala", to: "/zero-stt" },
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 🔍 Find matching redirect rule
  const redirectRule = REDIRECT_RULES.find((rule) => rule.from === pathname);

  if (redirectRule) {
    // ✅ 301 Permanent Redirect
    return NextResponse.redirect(new URL(redirectRule.to, request.url), {
      status: 301,
    });
  }

  return NextResponse.next();
}

// ⚙️ Configure which routes to check
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};
