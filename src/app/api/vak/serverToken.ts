/**
 * Server-side token management for VAK API routes.
 * Caches a session token in memory and auto-refreshes when expired.
 */

let cachedToken: string | null = null;
let cachedBrowserId: string | null = null;
let expiresAtMs: number = 0;

/**
 * Get a valid session token. Returns cached if still valid,
 * otherwise fetches a new one from the token API.
 */
export async function getServerToken(): Promise<string | null> {
  // Return cached token if still valid (with 2 min buffer)
  if (cachedToken && Date.now() < expiresAtMs - 2 * 60 * 1000) {
    return cachedToken;
  }

  const backendUrl = process.env.BACKEND_API_URL?.trim();
  const publicKey = process.env.VAK_PUBLIC_KEY?.trim();
  if (!backendUrl || !publicKey) return null;

  try {
    const headers: Record<string, string> = {
      accept: "application/json",
      Authorization: `Bearer ${publicKey}`,
    };

    if (cachedBrowserId) {
      headers["X-Browser-Id"] = cachedBrowserId;
    }

    const res = await fetch(`${backendUrl}/api/external/token`, {
      method: "POST",
      headers,
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    cachedToken = data.token;
    cachedBrowserId = data.browser_id;
    expiresAtMs = data.expires_at ? new Date(data.expires_at).getTime() : Date.now() + 55 * 60 * 1000;

    return cachedToken;
  } catch {
    return null;
  }
}
