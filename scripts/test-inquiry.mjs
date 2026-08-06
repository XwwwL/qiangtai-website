#!/usr/bin/env node

/**
 * Inquiry API Test
 * Usage: node scripts/test-inquiry.mjs  or  npm run test:inquiry
 */

const BASE = process.env.TEST_BASE_URL || "http://localhost:3000";
const API = `${BASE}/api/quote`;

const testPayload = {
  locale: "en",
  fullName: "Website Test Buyer",
  companyName: "Test Import Company",
  country: "United States",
  email: "buyer-test@example.com",
  phone: "+1 000 000 0000",
  productCategory: "camlockCouplings",
  productName: "Type C Camlock Coupling",
  quantity: "1000 pcs",
  material: "Stainless Steel",
  size: "2 inch",
  message: "This is a controlled website inquiry test. No quotation is required.",
  pageUrl: `${BASE}/en/contact`,
  privacyAccepted: true,
  website: "",
};

async function main() {
  console.log("╔══════════════════════════════════════╗");
  console.log("║   Qiangtai Inquiry API Test          ║");
  console.log("╚══════════════════════════════════════╝\n");
  console.log(`  POST ${API}\n`);

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testPayload),
    });
    const data = await res.json();

    console.log(`  HTTP Status:  ${res.status}`);
    console.log(`  Code:         ${data.code}`);
    console.log(`  Inquiry ID:   ${data.inquiryId || "N/A"}`);
    console.log(`  Success:      ${data.success ? "YES ✅" : "NO ❌"}`);

    if (!data.success && data.errors) {
      console.log(`  Errors:       ${JSON.stringify(data.errors)}`);
    }

    if (data.code === "INQUIRY_SENT" || data.code === "INQUIRY_DRY_RUN") {
      console.log("\n  ✅ Inquiry API test passed.");
    } else {
      console.log("\n  ⚠ Unexpected response code.");
    }
  } catch (err) {
    console.error(`\n  ❌ Request failed: ${err.message}`);
    console.error("  Make sure the dev server is running: npm run dev");
    process.exit(1);
  }
}

main();
