import "server-only";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

// ── Config parsers ──────────────────────────────────────────────

export function parseBoolean(value?: string): boolean {
  return value === "true";
}

export function parseEmailList(value?: string): string[] {
  if (!value) return [];
  return [...new Set(value.split(",").map((e) => e.trim()).filter(Boolean))];
}

// ── Escape / sanitize ───────────────────────────────────────────

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n\t]/g, "").trim();
}

// ── IDs ─────────────────────────────────────────────────────────_

let counter = 0;
export function createInquiryId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const seq = String(++counter).padStart(3, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `INQ-${date}-${seq}${rand}`;
}

// ── SMTP Config ─────────────────────────────────────────────────

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
}

export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  return {
    host,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: parseBoolean(process.env.SMTP_SECURE),
    user,
    pass,
    fromName: process.env.SMTP_FROM_NAME || "Qiangtai Website",
  };
}

export function createTransporter(config: SmtpConfig, options?: { altPort?: number }): Transporter {
  const port = options?.altPort || config.port;
  const isSecure = port === 465;

  return nodemailer.createTransport({
    host: config.host,
    port,
    secure: isSecure,
    auth: { user: config.user, pass: config.pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
    debug: true,
    logger: true,
    tls: {
      rejectUnauthorized: false,
      minVersion: "TLSv1.2" as const,
    },
  });
}

export async function verifySmtpConnection(transporter: Transporter): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch {
    return false;
  }
}

// ── Inquiry data ─────────────────────────────────────────────────

export interface InquiryData {
  inquiryId: string;
  receivedAt: string;
  locale: string;
  localeLabel: string;
  fullName: string;
  companyName: string;
  country: string;
  email: string;
  phone: string;
  productCategory: string;
  productName: string;
  quantity: string;
  material: string;
  size: string;
  message: string;
  pageUrl: string;
  privacyAccepted: boolean;
}

// ── Subject ──────────────────────────────────────────────────────

export function createInquirySubject(inquiry: InquiryData): string {
  const id = inquiry.inquiryId;
  let product = inquiry.productName || inquiry.productCategory || "";
  product = sanitizeHeaderValue(product);
  const from = sanitizeHeaderValue(inquiry.companyName || inquiry.fullName);
  if (product) {
    return `[${id}] New Inquiry: ${product} — from ${from}`;
  }
  return `[${id}] New Inquiry — from ${from}`;
}

// ── Email text ───────────────────────────────────────────────────

export function createInquiryText(inquiry: InquiryData): string {
  const na = "Not provided";
  const s = inquiry;
  return `New Inquiry from Qiangtai Website

Inquiry ID:       ${s.inquiryId}
Submission Time:  ${s.receivedAt}
Website Language: ${s.localeLabel} (${s.locale})

Full Name:          ${s.fullName}
Company Name:       ${s.companyName || na}
Country / Region:   ${s.country || na}
Email:              ${s.email}
WhatsApp / Phone:   ${s.phone || na}
Product Category:   ${s.productCategory || na}
Product Name:       ${s.productName || na}
Estimated Quantity: ${s.quantity || na}
Material:           ${s.material || na}
Size / Spec:        ${s.size || na}

Message:
${s.message}

Submitted Page: ${s.pageUrl || na}

Reply to this email to contact the customer.
Sent from the Qiangtai website inquiry form.`;
}

// ── Email HTML ───────────────────────────────────────────────────

export function createInquiryHtml(inquiry: InquiryData): string {
  const na = '<span style="color:#999;">Not provided</span>';
  const s = inquiry;
  const esc = {
    fullName: escapeHtml(s.fullName),
    companyName: s.companyName ? escapeHtml(s.companyName) : na,
    country: s.country ? escapeHtml(s.country) : na,
    email: escapeHtml(s.email),
    phone: s.phone ? escapeHtml(s.phone) : na,
    productCategory: s.productCategory ? escapeHtml(s.productCategory) : na,
    productName: s.productName ? escapeHtml(s.productName) : na,
    quantity: s.quantity ? escapeHtml(s.quantity) : na,
    material: s.material ? escapeHtml(s.material) : na,
    size: s.size ? escapeHtml(s.size) : na,
    message: escapeHtml(s.message),
    pageUrl: s.pageUrl ? escapeHtml(s.pageUrl) : na,
  };

  const tdLeft = 'padding:10px 12px;font-weight:600;color:#0B4F8A;width:180px;background:#f8fafc;border-bottom:1px solid #e5e7eb;vertical-align:top;';
  const tdRight = 'padding:10px 12px;border-bottom:1px solid #e5e7eb;vertical-align:top;line-height:1.6;';

  const phoneLink = s.phone ? `<a href="tel:${escapeHtml(s.phone)}" style="color:#087ea4;text-decoration:underline;">${esc.phone}</a>` : na;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 0;">
<tr><td align="center">
<table width="760" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;max-width:760px;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#071B33,#087EA4);padding:28px 32px;">
    <p style="margin:0;font-size:20px;font-weight:700;color:#fff;">Qiangtai Pipe Fitting &amp; Valve</p>
    <p style="margin:10px 0 0;font-size:14px;color:#18C7B7;">New Inquiry from Qiangtai Website</p>
  </td></tr>

  <!-- Info banner -->
  <tr><td style="padding:20px 32px 12px;font-size:13px;color:#666;line-height:1.7;">
    A visitor has submitted an inquiry through the website contact form.
    <strong>Reply directly to this email</strong> to contact the customer — the reply address is set to the customer&rsquo;s email.
  </td></tr>

  <!-- Table -->
  <tr><td style="padding:0 32px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;font-size:14px;">

      <tr>
        <td style="${tdLeft}">Inquiry ID</td>
        <td style="${tdRight}font-family:monospace;">${s.inquiryId}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Submission Time</td>
        <td style="${tdRight}">${s.receivedAt}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Website Language</td>
        <td style="${tdRight}">${s.localeLabel} (${s.locale})</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Full Name</td>
        <td style="${tdRight}font-weight:600;">${esc.fullName}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Company Name</td>
        <td style="${tdRight}">${esc.companyName}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Country / Region</td>
        <td style="${tdRight}">${esc.country}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Email</td>
        <td style="${tdRight}"><a href="mailto:${esc.email}" style="color:#087ea4;text-decoration:underline;">${esc.email}</a></td>
      </tr>
      <tr>
        <td style="${tdLeft}">WhatsApp / Phone</td>
        <td style="${tdRight}">${phoneLink}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Product Category</td>
        <td style="${tdRight}">${esc.productCategory}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Product Name</td>
        <td style="${tdRight}">${esc.productName}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Estimated Quantity</td>
        <td style="${tdRight}">${esc.quantity}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Material Requirement</td>
        <td style="${tdRight}">${esc.material}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Size / Specification</td>
        <td style="${tdRight}">${esc.size}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Message</td>
        <td style="${tdRight}white-space:pre-wrap;word-break:break-word;">${esc.message}</td>
      </tr>
      <tr>
        <td style="${tdLeft}">Submitted Page</td>
        <td style="${tdRight}font-size:12px;">${esc.pageUrl}</td>
      </tr>
    </table>
  </td></tr>

  <!-- Reply note -->
  <tr><td style="padding:0 32px 20px;font-size:13px;color:#666;line-height:1.7;border-top:1px solid #e5e7eb;padding-top:16px;">
    💬 <strong>Reply directly to this email</strong> to contact the customer.<br>
    The reply-to address is set to <a href="mailto:${esc.email}" style="color:#087ea4;">${esc.email}</a>.
  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f9fafb;padding:16px 32px;font-size:11px;color:#999;text-align:center;">
    ${s.inquiryId} &mdash; Sent from the Qiangtai website inquiry form.
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ── Send ─────────────────────────────────────────────────────────

export async function sendInquiryEmail(inquiry: InquiryData): Promise<{
  success: boolean;
  messageId?: string;
  accepted?: string[];
  rejected?: string[];
  error?: string;
}> {
  // Vercel-safe debug logging (never log passwords)
  console.log(`[SMTP] SMTP_HOST=${process.env.SMTP_HOST || "MISSING"}`);
  console.log(`[SMTP] SMTP_PORT=${process.env.SMTP_PORT || "MISSING"}`);
  console.log(`[SMTP] SMTP_USER=${process.env.SMTP_USER ? "SET" : "MISSING"}`);
  console.log(`[SMTP] SMTP_PASS=${(process.env.SMTP_PASSWORD || process.env.SMTP_PASS) ? "SET" : "MISSING"}`);
  console.log(`[SMTP] RECIPIENT_EMAILS=${process.env.RECIPIENT_EMAILS || "MISSING"}`);
  console.log(`[SMTP] EMAIL_DRY_RUN=${process.env.EMAIL_DRY_RUN || "unset"}`);

  const config = getSmtpConfig();
  if (!config) {
    return { success: false, error: "SMTP not configured — check SMTP_HOST, SMTP_USER, SMTP_PASS" };
  }

  const recipients = parseEmailList(process.env.RECIPIENT_EMAILS);
  if (recipients.length === 0) {
    return { success: false, error: "No recipients configured (RECIPIENT_EMAILS)" };
  }

  const transporter = createTransporter(config);

  // Step 1: TCP + TLS connection
  console.log(`[SMTP] → Step 1: Connecting to ${config.host}:${config.port} (SSL)...`);
  try {
    const verifyOk = await verifySmtpConnection(transporter);
    if (!verifyOk) {
      console.error(`[SMTP]   ❌ Connection FAILED`);
      return { success: false, error: "SMTP connection failed" };
    }
    console.log(`[SMTP]   ✅ Connection SUCCESS`);
  } catch (err) {
    const e = err as Error & { code?: string };
    console.error(`[SMTP]   ❌ Connection ERROR: ${e.message} (code: ${e.code || "N/A"})`);
    return { success: false, error: `Connection failed: ${e.message}` };
  }

  // Step 2: AUTH + send
  console.log(`[SMTP] → Step 2: Sending mail to [${recipients.join(", ")}]...`);
  try {
    const info = await transporter.sendMail({
      from: { name: config.fromName, address: config.user },
      to: recipients,
      replyTo: { name: inquiry.fullName, address: inquiry.email },
      subject: createInquirySubject(inquiry),
      text: createInquiryText(inquiry),
      html: createInquiryHtml(inquiry),
    });

    console.log(`[SMTP]   ✅ Send SUCCESS`);
    console.log(`[SMTP]   MessageId: ${info.messageId}`);
    console.log(`[SMTP]   Accepted:  [${(info.accepted || []).join(", ")}]`);
    console.log(`[SMTP]   Rejected:  [${(info.rejected || []).join(", ")}]`);
    console.log(`[SMTP]   Response:  ${info.response}`);
    return {
      success: true,
      messageId: info.messageId,
      accepted: info.accepted as string[],
      rejected: info.rejected as string[],
    };
  } catch (err) {
    const e = err as Error & { code?: string; command?: string; response?: string; responseCode?: number; stack?: string };
    console.error(`[SMTP]   ❌ Send FAILED`);
    console.error(`[SMTP]   message:      ${e.message}`);
    console.error(`[SMTP]   code:         ${e.code || "N/A"}`);
    console.error(`[SMTP]   command:      ${e.command || "N/A"}`);
    console.error(`[SMTP]   response:     ${e.response || "N/A"}`);
    console.error(`[SMTP]   responseCode: ${e.responseCode ?? "N/A"}`);
    if (e.stack) {
      console.error(`[SMTP]   stack:        ${e.stack.split("\n").slice(0, 2).join(" | ")}`);
    }
    return { success: false, error: `Send failed: ${e.message}` };
  }
}
