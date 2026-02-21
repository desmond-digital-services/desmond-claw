#!/usr/bin/env node
/**
 * Payment Status Checker
 * Query payment status from Stripe or PayPal
 *
 * Usage:
 *   node check-payment.js --provider stripe --payment-id pi_xxx
 *   node check-payment.js --provider paypal --payment-id xxx
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

async function checkStripePayment(paymentId) {
  if (!STRIPE_SECRET) {
    console.error("ERROR: STRIPE_SECRET_KEY not found");
    process.exit(1);
  }

  // Try as payment intent first
  let response = await fetch(`https://api.stripe.com/v1/payment_intents/${paymentId}`, {
    headers: { Authorization: `Bearer ${STRIPE_SECRET}` },
  });

  if (response.status === 200) {
    const payment = await response.json();
    console.log("\n=== Stripe Payment Intent ===");
    console.log(`ID: ${payment.id}`);
    console.log(`Amount: $${(payment.amount / 100).toFixed(2)} ${payment.currency.toUpperCase()}`);
    console.log(`Status: ${payment.status}`);
    console.log(`Created: ${new Date(payment.created * 1000).toISOString()}`);
    if (payment.customer) console.log(`Customer: ${payment.customer}`);
    if (payment.description) console.log(`Description: ${payment.description}`);
    console.log("==============================\n");
    return payment;
  }

  // Try as charge
  response = await fetch(`https://api.stripe.com/v1/charges/${paymentId}`, {
    headers: { Authorization: `Bearer ${STRIPE_SECRET}` },
  });

  if (response.status === 200) {
    const charge = await response.json();
    console.log("\n=== Stripe Charge ===");
    console.log(`ID: ${charge.id}`);
    console.log(`Amount: $${(charge.amount / 100).toFixed(2)} ${charge.currency.toUpperCase()}`);
    console.log(`Status: ${charge.status}`);
    console.log(`Created: ${new Date(charge.created * 1000).toISOString()}`);
    console.log("======================\n");
    return charge;
  }

  console.error("Payment not found");
  process.exit(1);
}

async function checkPayPalPayment(orderId) {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    console.error("ERROR: PayPal credentials not found");
    process.exit(1);
  }

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");

  const tokenResponse = await fetch(`${BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const { access_token } = await tokenResponse.json();

  const response = await fetch(`${BASE_URL}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (response.status === 200) {
    const order = await response.json();
    const purchaseUnit = order.purchase_units[0];
    const amount = purchaseUnit.amount;

    console.log("\n=== PayPal Order ===");
    console.log(`ID: ${order.id}`);
    console.log(`Status: ${order.status}`);
    console.log(`Amount: ${amount.currency_code} ${amount.value}`);
    console.log(`Description: ${purchaseUnit.description}`);
    if (order.create_time) console.log(`Created: ${order.create_time}`);
    console.log("====================\n");
    return order;
  }

  console.error("Order not found");
  process.exit(1);
}

// Parse args
const args = process.argv.slice(2);
const params = {};
for (let i = 0; i < args.length; i += 2) {
  params[args[i].replace("--", "")] = args[i + 1];
}

if (!params.provider || !params["payment-id"]) {
  console.log("Usage: node check-payment.js --provider stripe --payment-id pi_xxx");
  console.log("       node check-payment.js --provider paypal --payment-id XXX");
  console.log("");
  console.log("Options:");
  console.log("  --provider    stripe or paypal");
  console.log("  --payment-id  The payment/order ID to check");
  process.exit(1);
}

if (params.provider === "stripe") {
  checkStripePayment(params["payment-id"]);
} else if (params.provider === "paypal") {
  checkPayPalPayment(params["payment-id"]);
} else {
  console.error("Unknown provider. Use: stripe or paypal");
  process.exit(1);
}
