#!/usr/bin/env node
/**
 * PayPal Button & Order Generator
 * Creates PayPal buttons and processes orders
 *
 * Usage:
 *   node scripts/paypal-button.js --name "Product" --price 29.99
 *   node scripts/paypal-order.js --order-id XXX
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

const PAYPAL_CLIENT_ID = env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = env.PAYPAL_CLIENT_SECRET;
const TEST_MODE = env.TEST_MODE !== "false";

const BASE_URL = TEST_MODE ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";

async function getAccessToken() {
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

async function createOrder({ name, price, currency = "USD" }) {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
    console.error("ERROR: PayPal credentials not found");
    console.log("Set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in skills/payments/.env");
    process.exit(1);
  }

  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_URL}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: "default",
          description: name,
          amount: {
            currency_code: currency,
            value: price.toString(),
          },
        },
      ],
    }),
  });

  const order = await response.json();

  if (order.error) {
    console.error("PayPal Error:", order.error);
    process.exit(1);
  }

  // Generate button HTML
  const approveUrl = order.links.find((l) => l.rel === "approve").href;

  console.log("\n=== PayPal Order Created ===");
  console.log(`Product: ${name}`);
  console.log(`Price: $${price} ${currency}`);
  console.log(`Order ID: ${order.id}`);
  console.log(`\nApproval Link: ${approveUrl}`);
  console.log(`\n--- Button HTML ---`);
  console.log(generateButtonHTML(order.id, name, price, currency));
  console.log("====================\n");

  return order;
}

function generateButtonHTML(orderId, name, price, currency) {
  return `<!-- PayPal Button -->
<script src="https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${currency}"></script>
<div id="paypal-button-container-${orderId.slice(0, 8)}"></div>
<script>
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          reference_id: '${orderId}',
          description: '${name}',
          amount: { currency_code: '${currency}', value: '${price}' }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Payment completed by ' + details.payer.name.given_name);
        // TODO: Handle successful payment
      });
    }
  }).render('#paypal-button-container-${orderId.slice(0, 8)}');
</script>`;
}

// Parse args
const args = process.argv.slice(2);
const params = {};
for (let i = 0; i < args.length; i += 2) {
  params[args[i].replace("--", "")] = args[i + 1];
}

if (!params.name || !params.price) {
  console.log('Usage: node paypal-button.js --name "Product Name" --price 29.99');
  console.log("");
  console.log("Options:");
  console.log("  --name     Product name");
  console.log("  --price    Price (e.g., 29.99)");
  console.log("  --currency Currency code (default: USD)");
  process.exit(1);
}

createOrder({
  name: params.name,
  price: params.price,
  currency: params.currency || "USD",
});
