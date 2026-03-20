import { NextResponse } from "next/server";
import languagesCatalog from "@/languages.json";

export const runtime = "nodejs";

type TranslateRequestBody = {
  text?: string;
  source_lang?: string;
  target_lang?: string;
};

// Build a map of language code → full name from the shared catalog
const codeToName = new Map<string, string>();
for (const lang of (languagesCatalog as { languages: { code: string; name: string }[] }).languages || []) {
  codeToName.set(lang.code.toLowerCase(), lang.name);
}

// Map catalog names that differ from what the translate API accepts
const nameAliases: Record<string, string> = {
  "Indian English": "English",
  "Meitei (Manipuri)": "Manipuri",
};

/**
 * Resolve a language value to a full name the translate API accepts.
 * Accepts either a code ("en") or already a full name ("English").
 */
function resolveLanguageName(value: string): string {
  const trimmed = value.trim();
  const mapped = codeToName.get(trimmed.toLowerCase());
  const name = mapped || trimmed;
  return nameAliases[name] || name;
}

function isValidRequest(body: TranslateRequestBody): body is {
  text: string;
  source_lang: string;
  target_lang: string;
} {
  return (
    typeof body.text === "string" &&
    body.text.trim().length > 0 &&
    typeof body.source_lang === "string" &&
    body.source_lang.trim().length > 0 &&
    typeof body.target_lang === "string" &&
    body.target_lang.trim().length > 0
  );
}

export async function POST(request: Request) {
  try {
    const translateApiUrl = process.env.TRANSLATE_API_URL?.trim();
    if (!translateApiUrl) {
      return NextResponse.json(
        { detail: "TRANSLATE_API_URL is not configured" },
        { status: 500 }
      );
    }

    const translateApiKey = process.env.TRANSLATE_API_KEY?.trim();
    if (!translateApiKey) {
      return NextResponse.json(
        { detail: "TRANSLATE_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const body = (await request.json()) as TranslateRequestBody;

    if (!isValidRequest(body)) {
      return NextResponse.json(
        { detail: "text, source_lang and target_lang are required" },
        { status: 400 }
      );
    }

    const sourceLang = body.source_lang.trim();
    const targetLang = body.target_lang.trim();

    // Skip network call for same-language requests.
    if (sourceLang.toLowerCase() === targetLang.toLowerCase()) {
      return NextResponse.json({
        status: "ok",
        source_lang: sourceLang,
        target_lang: targetLang,
        source_text: body.text,
        translated_text: body.text,
        processing_time_ms: 0,
      });
    }

    const requestPayload = {
      text: body.text.trim(),
      source_language: resolveLanguageName(sourceLang),
      target_language: resolveLanguageName(targetLang),
    };

    const response = await fetch(translateApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": translateApiKey,
      },
      body: JSON.stringify(requestPayload),
      cache: "no-store",
    });

    const responseText = await response.text();
  

    if (!response.ok) {
      return new NextResponse(responseText || "Translate request failed", {
        status: response.status,
      });
    }

    let payload: { translation?: string; translated_text?: string } = {};
    if (responseText) {
      try {
        payload = JSON.parse(responseText) as {
          translation?: string;
          translated_text?: string;
        };
      } catch {
        payload = {};
      }
    }

    const translatedText = (
      payload.translated_text ||
      payload.translation ||
      ""
    ).trim();

    return NextResponse.json({
      status: "ok",
      source_lang: sourceLang,
      target_lang: targetLang,
      source_text: body.text,
      translated_text: translatedText || body.text,
      processing_time_ms: 0,
    });
  } catch (error) {
    return NextResponse.json(
      {
        detail:
          error instanceof Error ? error.message : "Unexpected translate error",
      },
      { status: 500 }
    );
  }
}
