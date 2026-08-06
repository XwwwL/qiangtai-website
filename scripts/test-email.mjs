#!/usr/bin/env node

/**
 * SMTP Test — Dual Recipient
 * Usage: node scripts/test-email.mjs  or  npm run test:email
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// Load .env.local
function loadEnv() {
  const envPath = resolve(ROOT, ".env.local");
  if (!existsSync(envPath)) {
    console.log("⚠ .env.local not found.");
    return;
  }
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const idx = t.indexOf("=");
    if (idx === -1) continue;
    process.env[t.slice(0, idx).trim()] = t.slice(idx + 1).trim();
  }
}
loadEnv();

async function main() {
  const nodemailer = (await import("nodemailer")).default;

  console.log("╔══════════════════════════════════════════╗");
  console.log("║   Qiangtai SMTP Test — Dual Recipient   ║");
  console.log("╚══════════════════════════════════════════╝\n");

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const fromName = process.env.SMTP_FROM_NAME || "Qiangtai Website";
  const recipientsRaw = process.env.RECIPIENT_EMAILS || "";
  const recipients = [...new Set(recipientsRaw.split(",").map((e) => e.trim()).filter(Boolean))];

  if (!host || !user || !pass) {
    console.error("❌ SMTP not configured. Required: SMTP_HOST, SMTP_USER, SMTP_PASS");
    process.exit(1);
  }
  if (recipients.length === 0) {
    console.error("❌ No recipients. Set RECIPIENT_EMAILS=email1@x.com,email2@y.com");
    process.exit(1);
  }

  console.log(`  Host:      ${host}:${port} (secure: ${secure})`);
  console.log(`  From:      ${user}`);
  console.log(`  To:        ${recipients.join(", ")}\n`);

  const transporter = nodemailer.createTransport({
    host, port, secure,
    auth: { user, pass },
  });

  console.log("→ Verifying SMTP...");
  try {
    await transporter.verify();
    console.log("✅ SMTP verified.\n");
  } catch (err) {
    console.error(`❌ Verify failed: ${err.message}`);
    process.exit(1);
  }

  const now = new Date().toISOString().replace("T", " ").slice(0, 19);
  const text = `[QIANGTAI SMTP TEST] Dual-recipient inquiry test

This is an automated SMTP test from the Qiangtai website.
Timestamp: ${now}
Recipients: ${recipients.join(", ")}

No reply is required.`;

  const html = `<!DOCTYPE html>
<html><body style="font-family:Arial;padding:20px;">
<h2>Qiangtai SMTP Test</h2>
<p>This is an automated SMTP test — <strong>dual recipient</strong>.</p>
<table style="border-collapse:collapse;font-size:14px;">
<tr><td style="padding:6px 12px;font-weight:600;">Timestamp:</td><td>${now}</td></tr>
<tr><td style="padding:6px 12px;font-weight:600;">Recipients:</td><td>${recipients.join(", ")}</td></tr>
</table>
<p style="color:#999;margin-top:16px;">No reply required.</p>
</body></html>`;

  console.log("→ Sending test email...");
  try {
    const info = await transporter.sendMail({
      from: { name: fromName, address: user },
      to: recipients,
      subject: "[QIANGTAI SMTP TEST] Dual-recipient inquiry test",
      text,
      html,
    });

    console.log("✅ Test email accepted by SMTP.\n");
    console.log(`   Message ID:  ${info.messageId}`);
    console.log(`   Accepted:    [${(info.accepted || []).join(", ")}]`);
    console.log(`   Rejected:    [${(info.rejected || []).join(", ")}]`);
    console.log(`   SMTP Response: ${info.response}`);
    console.log(`\n   → Check inboxes: ${recipients.join(", ")}`);
  } catch (err) {
    console.error(`❌ Send failed: ${err.message}`);
    process.exit(1);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
