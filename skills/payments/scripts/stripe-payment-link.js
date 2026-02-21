#!/usr/bin/env node
/**
 * Stripe Payment Link Generator
 * Creates payment links via Stripe API
 *
 * Usage: node scripts/stripe-payment-link.js --name "Product" --price 2999 --currency usd
 */

import "dotenv/config";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load env from skill directory
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
const TEST_MODE = env.TEST_MODE !== "false";

async function createPaymentLink({ name, price, currency = "usd", quantity = 1 }) {
  if (!STRIPE_SECRET) {
    console.error("ERROR: STRIPE_SECRET_KEY not found");
    console.log("Set it in skills/payments/.env or as environment variable");
    process.exit(1);
  }

  const priceInCents = typeof price === "string" ? parseInt(price) : price;

  // Create product and price via Stripe API
  const productResponse = await fetch("https://api.stripe.com/v1/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `name=${encodeURIComponent(name)}`,
  });

  const product = await productResponse.json();

  const priceResponse = await fetch("https://api.stripe.com/v1/prices", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `product=${product.id}&unit_amount=${priceInCents}&currency=${currency}`,
  });

  const priceObj = await priceResponse.json();

  // Create payment link
  const linkResponse = await fetch("https://api.stripe.com/v1/payment_links", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `line_items[0][price]=${priceObj.id}&line_items[0][quantity]=${quantity}`,
  });

  const paymentLink = await linkResponse.json();

  if (paymentLink.error) {
    console.error("Stripe Error:", paymentLink.error);
    process.exit(1);
  }

  console.log("\n=== Payment Link Created ===");
  console.log(`Product: ${name}`);
  console.log(`Price: $${(priceInCents / 100).toFixed(2)} ${currency.toUpperCase()}`);
  console.log(`Payment Link: ${paymentLink.url}`);
  console.log("================================\n");

  return paymentLink;
}

// Parse command line args
const args = process.argv.slice(2);
const params = {};
for (let i = 0; i < args.length; i += 2) {
  params[args[i].replace("--", "")] = args[i + 1];
}

if (!params.name || !params.price) {
  console.log(
    'Usage: node stripe-payment-link.js --name "Product Name" --price 2999 --currency usd',
  );
  console.log("");
  console.log("Options:");
  console.log("  --name     Product name");
  console.log("  --price    Price in cents (e.g., 2999 for $29.99)");
  console.log("  --currency Currency code (default: usd)");
  console.log("  --quantity Number of items (default: 1)");
  process.exit(1);
}

createPaymentLink({
  name: params.name,
  price: params.price,
  currency: params.currency || "usd",
  quantity: parseInt(params.quantity) || 1,
});
