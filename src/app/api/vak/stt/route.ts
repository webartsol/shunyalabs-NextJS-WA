import { NextResponse } from "next/server";
import { getServerToken } from "../serverToken";

export const runtime = "nodejs";

function getFormString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" ? value : null;
}

export async function POST(request: Request) {
  try {
    const sttApiUrl = process.env.STT_API_URL?.trim();
    if (!sttApiUrl) {
      return NextResponse.json({ detail: "STT_API_URL is not configured" }, { status: 500 });
    }

    // Use client token if provided, otherwise fetch server-side
    const sessionToken = request.headers.get("X-Session-Token")?.trim() || await getServerToken();
    if (!sessionToken) {
      return NextResponse.json({ detail: "Could not obtain session token" }, { status: 401 });
    }

    const incoming = await request.formData();
    const file = incoming.get("file") || incoming.get("audio");
    if (!(file instanceof File)) {
      return NextResponse.json({ detail: "file (or audio) is required" }, { status: 400 });
    }

    const model = getFormString(incoming, "model") || process.env.STT_MODEL || "zero-indic";
    const language = getFormString(incoming, "language") || "";
    const languageCode = getFormString(incoming, "language_code") || process.env.STT_LANGUAGE_CODE || "auto";
    const enableDiarization = getFormString(incoming, "enable_diarization") || "false";
    const task = getFormString(incoming, "task") || "transcribe";
    const outputScript = getFormString(incoming, "output_script") || "auto";

    const formData = new FormData();
    formData.append("file", file, file.name || "recording.webm");
    formData.append("model", model);
    formData.append("language_code", languageCode);
    if (language.trim()) {
      formData.append("language", language.trim());
    }
    formData.append("enable_diarization", enableDiarization);
    formData.append("task", task);
    formData.append("output_script", outputScript);
    formData.append("use_vad_chunking", "true");
    formData.append("response_format", "verbose_json");
    formData.append("enable_profanity_hashing", "false");

    const response = await fetch(sttApiUrl, {
      method: "POST",
      headers: { "api-key": sessionToken },
      body: formData,
      cache: "no-store",
    });

    const isJson = (response.headers.get("content-type") || "").includes("application/json");

    if (!response.ok) {
      const detail = isJson
        ? await response.json().catch(() => null)
        : await response.text().catch(() => "");
      const message = typeof detail === "string" ? detail : (detail?.detail || "STT request failed");
      return NextResponse.json({ detail: message }, { status: response.status });
    }

    if (isJson) {
      const payload = await response.json();
      return NextResponse.json(payload, { status: 200 });
    }

    const text = await response.text();
    return NextResponse.json({ text }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Unexpected STT error" },
      { status: 500 }
    );
  }
}
