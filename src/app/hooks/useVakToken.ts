"use client";

import { useState, useLayoutEffect, useRef } from "react";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, expiresAt?: string) {
  let cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
  if (expiresAt) {
    cookie += `; expires=${new Date(expiresAt).toUTCString()}`;
  }
  document.cookie = cookie;
}

// Module-level singleton to prevent duplicate fetches
let tokenPromise: Promise<{ token: string; browser_id: string; expires_at: string }> | null = null;
let cachedToken: string | null = null;
let cachedExpiresAt: number | null = null;

function isTokenValid(): boolean {
  // Check in-memory cache first, then fall back to cookie
  if (cachedToken && cachedExpiresAt && Date.now() < cachedExpiresAt) return true;
  return !!getCookie("vak_token");
}

async function ensureToken(): Promise<{ token: string; browser_id: string; expires_at: string }> {
  // Return in-flight promise if one exists
  if (tokenPromise) return tokenPromise;

  const existingToken = getCookie("vak_token");
  const existingBrowserId = getCookie("vak_browser_id");

  // Token still valid — return immediately, no API call
  if (existingToken) {
    cachedToken = existingToken;
    return { token: existingToken, browser_id: existingBrowserId || "", expires_at: "" };
  }

  // Also check in-memory cache (cookie might not be readable yet)
  if (cachedToken && cachedExpiresAt && Date.now() < cachedExpiresAt) {
    return { token: cachedToken, browser_id: existingBrowserId || "", expires_at: "" };
  }

  // Token expired or missing — fetch new one
  tokenPromise = (async () => {
    try {
      const body = existingBrowserId
        ? JSON.stringify({ browser_id: existingBrowserId })
        : undefined;

      const res = await fetch("/api/vak/token", {
        method: "POST",
        ...(body ? { headers: { "Content-Type": "application/json" }, body } : {}),
      });

      if (res.ok) {
        const data = await res.json();
        setCookie("vak_token", data.token, data.expires_at);
        const oneYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
        setCookie("vak_browser_id", data.browser_id, oneYear);
        cachedToken = data.token;
        // Cache expiry in memory (subtract 60s buffer so we refresh before actual expiry)
        cachedExpiresAt = data.expires_at
          ? new Date(data.expires_at).getTime() - 60000
          : Date.now() + 55 * 60 * 1000; // default ~55 min
        return data;
      }
      throw new Error("Token fetch failed");
    } catch (err) {
      // On failure, clear the promise so next call retries
      tokenPromise = null;
      throw err;
    }
  })();

  return tokenPromise;
}

/**
 * Shared hook to fetch/refresh the VAK session token.
 * - Token cookie expires per API response (1 hour).
 * - Browser_id cookie persists for 1 year so it's reused across token refreshes.
 * - Only calls the API when token cookie is missing/expired.
 */
export function useVakToken() {
  const [token, setToken] = useState<string | null>(() => cachedToken || getCookie("vak_token"));
  const tokenRef = useRef<string | null>(token);
  tokenRef.current = token;

  useLayoutEffect(() => {
    let cancelled = false;

    ensureToken()
      .then((data) => {
        if (!cancelled) {
          setToken(data.token);
        }
      })
      .catch((err) => {
        console.error("[VAK] Token fetch error:", err);
      });

    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { token, tokenRef };
}
