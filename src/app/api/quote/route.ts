import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const maxDuration = 30;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validate required fields
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const message = String(body.message || "").trim();

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Full name, email and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Honeypot
    if (body.website || body._honey) {
      return NextResponse.json({ success: true });
    }

    // Sanitize all fields
    const s = (v: unknown, max = 2000) => String(v ?? "").trim().slice(0, max);
    const companyName = s(body.companyName);
    const country = s(body.country);
    const phone = s(body.phone);
    const productCategory = s(body.productCategory);
    const productName = s(body.productName);
    const quantity = s(body.quantity);
    const material = s(body.material);
    const size = s(body.size);
    const receivedAt = new Date().toISOString().replace("T", " ").slice(0, 19);
    const locale = s(body.locale, 10) || "en";

    // 2. Read SMTP config
    const smtpHost = process.env.SMTP_HOST || "smtp.163.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER || "";
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || "";
    const fromName = process.env.SMTP_FROM_NAME || "Qiangtai Website";

    if (!smtpUser || !smtpPass) {
      console.error("SMTP not configured: missing SMTP_USER or SMTP_PASS");
      return NextResponse.json(
        { success: false, error: "Email service not configured." },
        { status: 503 }
      );
    }

    // Parse recipients
    const recipientsRaw = process.env.RECIPIENT_EMAILS || process.env.RECIPIENT_EMAIL || smtpUser;
    const recipients = recipientsRaw
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    if (recipients.length === 0) {
      console.error("No recipients configured");
      return NextResponse.json(
        { success: false, error: "Email recipients not configured." },
        { status: 503 }
      );
    }

    // 3. Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 4. Build HTML email
    const esc = {
      fullName: escapeHtml(fullName),
      companyName: escapeHtml(companyName),
      country: escapeHtml(country),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      productCategory: escapeHtml(productCategory),
      productName: escapeHtml(productName),
      quantity: escapeHtml(quantity),
      material: escapeHtml(material),
      size: escapeHtml(size),
      message: escapeHtml(message),
    };

    const tdL = 'style="padding:10px 12px;font-weight:600;color:#0B4F8A;width:180px;background:#f8fafc;border-bottom:1px solid #e5e7eb;"';
    const tdR = 'style="padding:10px 12px;border-bottom:1px solid #e5e7eb;"';
    const na = '<span style="color:#999">Not provided</span>';

    const mailHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
<tr><td align="center">
<table width="700" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;max-width:700px;">

<tr><td style="background:linear-gradient(135deg,#071B33,#087EA4);padding:28px 32px;">
  <p style="margin:0;font-size:20px;font-weight:700;color:#fff;">Qiangtai Pipe Fitting &amp; Valve</p>
  <p style="margin:8px 0 0;font-size:14px;color:#18C7B7;">New Inquiry from Qiangtai Website</p>
</td></tr>

<tr><td style="padding:20px 32px 12px;font-size:13px;color:#666;line-height:1.6;">
  <strong>Reply directly to this email</strong> to contact the customer.
</td></tr>

<tr><td style="padding:0 32px 32px;">
<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;font-size:14px;">
  <tr><td ${tdL}>Full Name</td><td ${tdR}>${esc.fullName}</td></tr>
  <tr><td ${tdL}>Company Name</td><td ${tdR}>${esc.companyName || na}</td></tr>
  <tr><td ${tdL}>Country / Region</td><td ${tdR}>${esc.country || na}</td></tr>
  <tr><td ${tdL}>Email</td><td ${tdR}><a href="mailto:${esc.email}" style="color:#087ea4;">${esc.email}</a></td></tr>
  <tr><td ${tdL}>WhatsApp / Phone</td><td ${tdR}>${esc.phone || na}</td></tr>
  <tr><td ${tdL}>Product Category</td><td ${tdR}>${esc.productCategory || na}</td></tr>
  <tr><td ${tdL}>Product Name</td><td ${tdR}>${esc.productName || na}</td></tr>
  <tr><td ${tdL}>Estimated Quantity</td><td ${tdR}>${esc.quantity || na}</td></tr>
  <tr><td ${tdL}>Material Requirement</td><td ${tdR}>${esc.material || na}</td></tr>
  <tr><td ${tdL}>Size / Specification</td><td ${tdR}>${esc.size || na}</td></tr>
  <tr><td ${tdL} style="vertical-align:top;">Message</td><td ${tdR} style="white-space:pre-wrap;word-break:break-word;">${esc.message}</td></tr>
</table>
</td></tr>

<tr><td style="background:#f9fafb;padding:16px 32px;font-size:11px;color:#999;text-align:center;">
  ${receivedAt} &mdash; Sent from Qiangtai website inquiry form.
</td></tr>

</table>
</td></tr>
</table>
</body></html>`;

    // 5. Send email
    const info = await transporter.sendMail({
      from: `"${fromName}" <${smtpUser}>`,
      to: recipients,
      subject: `New Inquiry: ${productName || productCategory || "General"} — from ${fullName}`,
      html: mailHtml,
      replyTo: email,
    });

    console.log(`✅ Email sent — accepted: [${(info.accepted || []).join(", ")}] — msgId: ${info.messageId}`);

    // 6. Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", (error as Error).message);
    return NextResponse.json(
      { success: false, error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
