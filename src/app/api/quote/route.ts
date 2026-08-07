import { NextRequest, NextResponse } from "next/server";
import {
  createInquiryId,
  parseBoolean,
  sendInquiryEmail,
  type InquiryData,
} from "@/lib/server/mailer";

// Vercel: Node.js runtime required for Nodemailer (not Edge)
export const runtime = "nodejs";
// Vercel Pro: extend to 60s; Hobby plan caps at 10s regardless
export const maxDuration = 30;

const MAX_FIELD_LENGTH = 2000;
const MAX_MESSAGE_LENGTH = 10000;

function sanitize(value: unknown, maxLen = MAX_FIELD_LENGTH): string {
  return String(value ?? "").trim().slice(0, maxLen);
}

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.json({ success: false, code: "METHOD_NOT_ALLOWED" }, { status: 405 });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ success: false, code: "INVALID_CONTENT_TYPE" }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch {
    return NextResponse.json({ success: false, code: "INVALID_JSON" }, { status: 400 });
  }

  // Honeypot — silently accept
  if (body.website || body._honey) {
    return NextResponse.json({ success: true, code: "INQUIRY_SENT", inquiryId: createInquiryId() }, { status: 200 });
  }

  // Extract
  const locale = sanitize(body.locale, 10) || "en";
  const fullName = sanitize(body.fullName);
  const companyName = sanitize(body.companyName);
  const country = sanitize(body.country);
  const email = sanitize(body.email, 320).toLowerCase();
  const phone = sanitize(body.phone);
  const productCategory = sanitize(body.productCategory);
  const productName = sanitize(body.productName);
  const quantity = sanitize(body.quantity);
  const material = sanitize(body.material);
  const size = sanitize(body.size);
  const message = sanitize(body.message, MAX_MESSAGE_LENGTH);
  const pageUrl = sanitize(body.pageUrl, 500);
  const privacyAccepted = Boolean(body.privacyAccepted ?? body.privacyAgreed);

  // Validate
  const errors: string[] = [];
  if (!fullName) errors.push("fullName required");
  if (!email) errors.push("email required");
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("invalid email");
  if (!message) errors.push("message required");
  if (!privacyAccepted) errors.push("privacyAccepted required");

  if (errors.length > 0) {
    return NextResponse.json({ success: false, code: "VALIDATION_ERROR", errors }, { status: 400 });
  }

  const inquiryId = createInquiryId();
  const receivedAt = new Date().toISOString().replace("T", " ").slice(0, 19);
  const localeLabel = locale === "zh" ? "Chinese" : locale === "ru" ? "Russian" : "English";

  const inquiry: InquiryData = {
    inquiryId,
    receivedAt,
    locale,
    localeLabel,
    fullName,
    companyName,
    country,
    email,
    phone,
    productCategory,
    productName,
    quantity,
    material,
    size,
    message,
    pageUrl,
    privacyAccepted,
  };

  const isDry = parseBoolean(process.env.EMAIL_DRY_RUN);
  if (isDry) {
    console.log(`\n[DRY-RUN] ${inquiryId} — ${fullName} (${email}) — ${productName || productCategory || "General"}\n`);
    return NextResponse.json({ success: true, code: "INQUIRY_DRY_RUN", inquiryId }, { status: 200 });
  }

  const result = await sendInquiryEmail(inquiry);
  if (!result.success) {
    console.error(`❌ Inquiry ${inquiryId} failed: ${result.error}`);
    return NextResponse.json({ success: false, code: "INQUIRY_EMAIL_FAILED", inquiryId }, { status: 502 });
  }

  console.log(`✅ ${inquiryId} sent — accepted: [${(result.accepted || []).join(", ")}] — rejected: [${(result.rejected || []).join(", ")}] — MessageId: ${result.messageId}`);
  return NextResponse.json({ success: true, code: "INQUIRY_SENT", inquiryId }, { status: 200 });
}
