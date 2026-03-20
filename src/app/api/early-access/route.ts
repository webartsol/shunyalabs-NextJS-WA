import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

// 🚦 Same rate limit (3 requests/min per IP)
const rateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60,
});

export async function POST(request: Request) {
  try {
    // 🧠 Rate limit logic erly access
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("cf-connecting-ip") ||
      "unknown";

    try {
      await rateLimiter.consume(ip);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please wait a moment and try again.",
        },
        { status: 429 },
      );
    }

    // 🧩 Parse & validate
    const body = await request.json();
    const { name, email, company, country, revenue, newsletter, token } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email are required." },
        { status: 400 },
      );
    }

    // 🧱 reCAPTCHA verification
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

    const captchaRes = await fetch(verifyUrl, { method: "POST" });
    const captchaData = await captchaRes.json();

    if (!captchaData.success || captchaData.score < 0.5) {
      console.warn("⚠️ reCAPTCHA failed:", captchaData);
      return NextResponse.json(
        { success: false, message: "reCAPTCHA verification failed." },
        { status: 403 },
      );
    }

    // 💌 SMTP setup (same as contact form)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 📥 Email sent to internal team
    const internalMail = {
      from: `"Shunya Labs - Early Access" <${process.env.SMTP_USER}>`,
      to: "0@shunyalabs.ai",
      cc: "arti@shunyalabs.ai",
      subject: `🧪 Early Access Request from ${name}`,
      html: `
        <h2>🧪 New Early Access Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "-"}</p>
        <p><strong>Country:</strong> ${country || "-"}</p>
        <p><strong>Revenue:</strong> ${revenue || "-"}</p>
        <p><strong>Newsletter Opt-in:</strong> ${newsletter === "yes" ? "Yes" : "No"}</p>
      `,
    };

    // 📤 Auto-reply email
    const userReplyMail = {
      from: `"Shunya Labs" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "You're on the Early Access Waitlist 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h3>Hi ${name},</h3>
          <p>Thank you for requesting <strong>Early Access</strong> to our upcoming systems.</p>
          <p>You're now officially on our exclusive early adopter waitlist.</p>
          <p>Our team will review your request and contact you shortly.</p>
          <p>Best,<br/>Team Shunya Labs</p>
          <hr style="border:none;border-top:1px solid #ccc;margin:20px 0;" />
          <p>🌐 <a href="https://www.shunyalabs.ai" target="_blank">www.shunyalabs.ai</a></p>
        </div>
      `,
    };

    // ✉️ Send emails
    await Promise.all([
      transporter.sendMail(internalMail),
      transporter.sendMail(userReplyMail),
    ]);

    return NextResponse.json({
      success: true,
      message: "Early Access request submitted successfully!",
    });
  } catch (error: any) {
    console.error("❌ Early Access API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
