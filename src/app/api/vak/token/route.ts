import { NextResponse } from "next/server";

export const runtime = "nodejs";

type TokenRequestBody = {
  browser_id?: string;
};

export async function POST(request: Request) {
  try {
    const backendUrl = process.env.BACKEND_API_URL?.trim();
    if (!backendUrl) {
      return NextResponse.json(
        { detail: "BACKEND_API_URL is not configured" },
        { status: 500 }
      );
    }

    const publicKey = process.env.VAK_PUBLIC_KEY?.trim();
    if (!publicKey) {
      return NextResponse.json(
        { detail: "VAK_PUBLIC_KEY is not configured" },
        { status: 500 }
      );
    }

    let body: TokenRequestBody = {};
    try {
      body = await request.json();
    } catch {
      // No body or invalid JSON — that's fine for first-time token requests
    }

    const headers: Record<string, string> = {
      accept: "application/json",
      Authorization: `Bearer ${publicKey}`,
    };

    // If browser_id is provided, pass it to reuse existing session
    if (body.browser_id) {
      headers["X-Browser-Id"] = body.browser_id;
    }

    const response = await fetch(`${backendUrl}/api/external/token`, {
      method: "POST",
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      return NextResponse.json(
        { detail: detail || "Token request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        detail:
          error instanceof Error ? error.message : "Unexpected token error",
      },
      { status: 500 }
    );
  }
}
