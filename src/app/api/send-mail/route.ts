
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

// 🚦 Step 1: Simple in-memory rate limiter (3 requests/min per IP)
const rateLimiter = new RateLimiterMemory({
  points: 3, // allowed requests
  duration: 60, // per 60 seconds
});

export async function POST(request: Request) {
  try {
    // 🧠 Step 2: Rate limit per IP
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("cf-connecting-ip") ||
      "unknown";

    try {
      await rateLimiter.consume(ip);
    } catch {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please wait and try again." },
        { status: 429 }
      );
    }

    // 🧩 Step 3: Parse body & validate
    const body = await request.json();
    const { name, email, phone, message, token } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // 🧱 Step 4: Verify reCAPTCHA token with Google
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

    const captchaRes = await fetch(verifyUrl, { method: "POST" });
    const captchaData = await captchaRes.json();

    if (!captchaData.success || captchaData.score < 0.5) {
      console.warn("⚠️ reCAPTCHA failed:", captchaData);
      return NextResponse.json(
        { success: false, message: "reCAPTCHA verification failed." },
        { status: 403 }
      );
    }

    // ✅ Step 5: Setup email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ Step 6: Email to internal team
    const internalMail = {
      from: `"Shunya Labs Contact" <${process.env.SMTP_USER}>`,
      to: "0@shunyalabs.ai",
      cc: "arti@shunyalabs.ai",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>📬 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // ✅ Step 7: Auto-reply to user
    const userReplyMail = {
      from: `"Shunya Labs" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for contacting Shunya Labs",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h3>Hi ${name || "there"},</h3>
          <p>Thanks for getting in touch with <strong>Shunya Labs</strong>.</p>
          <p>Our team has received your message and will get back to you within 1 business day.</p>
          <p>Best,<br/><strong>Team Shunya Labs</strong></p>
          <hr style="border:none;border-top:1px solid #ddd;margin:20px 0;" />
          <p>🌐 <a href="https://www.shunyalabs.ai" target="_blank">www.shunyalabs.ai</a><br/>
          ✉ <a href="mailto:0@shunyalabs.ai">0@shunyalabs.ai</a></p>
        </div>
      `,
    };

    // ✅ Step 8: Send both mails
    await Promise.all([
      transporter.sendMail(internalMail),
      transporter.sendMail(userReplyMail),
    ]);

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully!",
    });
  } catch (error: any) {
    console.error("❌ Email send error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
