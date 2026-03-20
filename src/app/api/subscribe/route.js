export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email required" });
    }

    const dir = path.join(process.cwd(), "data");
    const filePath = path.join(dir, "subscribers.json");

    // Ensure directory exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // If JSON doesn't exist → create new
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify({ subscribers: [] }, null, 2));
    }

    // SAFE JSON READ (fixes your error)
    let fileData;
    try {
      const raw = fs.readFileSync(filePath, "utf8").trim();
      fileData = raw ? JSON.parse(raw) : { subscribers: [] };
    } catch (err) {
      console.log("JSON CORRUPTED → RESETTING FILE");
      fileData = { subscribers: [] };
    }

    // Check duplicate email
    if (fileData.subscribers.includes(email)) {
      return NextResponse.json({
        success: false,
        message: "Email already subscribed",
      });
    }

    // Add new email
    fileData.subscribers.push(email);

    // Save file
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully!",
    });

  } catch (error) {
    console.log("API ERROR:", error);
    return NextResponse.json({
      success: false,
      message: "Error saving email",
    });
  }
}
