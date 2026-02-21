#!/usr/bin/env node
/**
 * Refund Processor
 * Process refunds for Stripe and PayPal
 *
 * Usage:
 *   node refund.js --provider stripe --payment-id ch_xxx --amount 1000
 *   node refund.js --provider paypal --order-id xxx --amount 10.00
 */

import "dotenv/config";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  const envPath = join(__dirname, "..", ".env");
  try {
    const envContent = readFileSync(envPath, "utf-8");
    const envVars = {};
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        envVars[match[1].trim()] = match[2].trim();
      }
    });
    return envVars;
  } catch (e) {
    return process.env;
  }
}

const env = loadEnv();

const STRIPE_SECRET = env.STRIPE_SECRET_KEY;
const PAYPAL_CLIENT_ID = env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = env.PAYPAL_CLIENT_SECRET;

const BASE_URL =
  env.TEST_MODE !== "false" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";

async function stripeRefund({ paymentId, amount, reason }) {
  if (!STRIPE_SECRET) {
    console.error("ERROR: STRIPE_SECRET_KEY not found");
    process.exit(1);
  }

  let body = "";
  if (amount) {
    body = `amount=${amount}&reason=${reason || "requested_by_customer"}`;
  } else {
    body = `reason=${reason || "requested_by_customer"}`;
  }

  const response = await fetch(`https://api.stripe.com/v1/refunds`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const refund = await response.json();

  if (refund.error) {
    console.error("Stripe Error:", refund.error);
    process.exit(1);
  }

  console.log("\n=== Refund Created ===");
  console.log(`Refund ID: ${refund.id}`);
  console.log(`Amount: $${(refund.amount / 100).toFixed(2)} ${refund.currency.toUpperCase()}`);
  console.log(`Status: ${refund.status}`);
  console.log(`Payment: ${refund.payment_intent || refund.charge}`);
  console.log("========================\n");

  return refund;
}

async function getPayPalAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");

  const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

async function paypalRefund({ orderId, amount, reason }) {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    console.error("ERROR: PayPal credentials not found");
    process.exit(1);
  }

  const accessToken = await getPayPalAccessToken();

  // First get the capture ID from the order
  const orderResponse = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const order = await orderResponse.json();

  // Find the capture
  const purchaseUnit = order.purchase_units?.[0];
  const captureId = purchaseUnit?.payments?.captures?.[0]?.id;

  if (!captureId) {
    console.error("No capture found - order may not be completed");
    process.exit(1);
  }

  const refundBody = {
    amount: {
      value: amount.toString(),
      currency_code: purchaseUnit.amount.currency_code,
    },
  };

  if (reason) {
    refundBody.note_to_payer = reason;
  }

  const response = await fetch(`${BASE_URL}/v2/payments/captures/${captureId}/refund`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(refundBody),
  });

  const refund = await response.json();

  if (refund.error) {
    console.error("PayPal Error:", refund.error);
    process.exit(1);
  }

  console.log("\n=== Refund Created ===");
  console.log(`Refund ID: ${refund.id}`);
  console.log(`Amount: ${refund.amount?.value} ${refund.amount?.currency_code}`);
  console.log(`Status: ${refund.status}`);
  console.log(`Order: ${orderId}`);
  console.log("========================\n");

  return refund;
}

// Parse args
const args = process.argv.slice(2);
const params = {};
for (let i = 0; i < args.length; i += 2) {
  params[args[i].replace("--", "")] = args[i + 1];
}

if (!params.provider) {
  console.log("Usage:");
  console.log("  Stripe: node refund.js --provider stripe --payment-id ch_xxx --amount 1000");
  console.log("  PayPal: node refund.js --provider paypal --order-id xxx --amount 10.00");
  console.log("");
  console.log("Options:");
  console.log("  --provider    stripe or paypal");
  console.log("  --payment-id  Stripe charge/payment intent ID");
  console.log("  --order-id    PayPal order ID");
  console.log("  --amount     Amount to refund in cents (Stripe) or dollars (PayPal)");
  console.log("  --reason     Refund reason (optional)");
  process.exit(1);
}

if (params.provider === "stripe") {
  if (!params["payment-id"]) {
    console.error("Error: --payment-id required for Stripe");
    process.exit(1);
  }
  stripeRefund({
    paymentId: params["payment-id"],
    amount: params.amount,
    reason: params.reason,
  });
} else if (params.provider === "paypal") {
  if (!params["order-id"]) {
    console.error("Error: --order-id required for PayPal");
    process.exit(1);
  }
  paypalRefund({
    orderId: params["order-id"],
    amount: params.amount ? parseFloat(params.amount) : null,
    reason: params.reason,
  });
} else {
  console.error("Unknown provider. Use: stripe or paypal");
  process.exit(1);
}
