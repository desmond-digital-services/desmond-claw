---
name: payments
description: Complete payment integration for Stripe and PayPal. Generate payment links, checkout buttons, embed payment forms, query transactions, handle refunds, and manage subscriptions.
version: 1.0.0
author: Desmond Digital Services
tags:
  - payments
  - stripe
  - paypal
  - checkout
  - subscriptions
  - billing
  - invoices
triggers:
  - payment
  - stripe
  - paypal
  - checkout
  - invoice
  - refund
  - subscription
  - billing
  - charge
  - "payment link"
  - "buy now"
recommended_tools:
  - http
  - message
  - email
---

# Payments Skill

Complete payment integration for businesses. Generate Stripe and PayPal payments, handle subscriptions, process refunds, and manage billing.

## Status

✅ **Stripe**: Working - Tested and creating payment links  
✅ **PayPal**: Working - Tested and creating orders

## Quick Start

### 1. Configure Credentials

Copy the template and add your credentials:

```bash
cp skills/payments/.env.example skills/payments/.env
# Edit .env with your Stripe and PayPal API keys
```

### 2. Get Your API Keys

**Stripe:**

- Sign up at https://stripe.com
- Get keys from: https://dashboard.stripe.com/test/apikeys
- Use test keys (sk_test_xxx) for development

**PayPal:**

- Sign up at https://developer.paypal.com
- Get credentials from: https://developer.paypal.com/dashboard/applications/sandbox

## Features

### Stripe Integration

- Generate payment links (no server needed)
- Create checkout sessions
- Embed Stripe Elements
- Query transactions
- Process refunds
- Manage customers
- Handle subscriptions
- Webhook handling

### PayPal Integration

- Generate payment buttons
- Create orders
- Capture payments
- Process refunds
- Subscription management

## Usage Examples

### Create Stripe Payment Link

```bash
# Single product payment link
node scripts/stripe-payment-link.js --name "Consultation" --price 15000 --currency usd
# Creates: https://buy.stripe.com/test_xxx
```

### Create PayPal Button

```bash
# Generate PayPal button HTML
node scripts/paypal-button.js --name "Premium Plan" --price 29.99
```

### Check Payment Status

```bash
# Query a payment
node scripts/check-payment.js --provider stripe --payment-id pi_xxx
```

### Process Refund

```bash
# Full or partial refund
node scripts/refund.js --provider stripe --charge-id ch_xxx --amount 5000
```

## File Structure

```
payments/
├── SKILL.md           # This file
├── .env.example       # Template for credentials
├── .env               # Your actual credentials (git-ignored)
├── scripts/
│   ├── stripe-checkout.js      # Create Stripe checkout sessions
│   ├── stripe-payment-link.js  # Generate payment links
│   ├── stripe-webhook.js       # Handle Stripe webhooks
│   ├── paypal-order.js         # Create PayPal orders
│   ├── paypal-button.js        # Generate PayPal buttons
│   ├── check-payment.js        # Query payment status
│   └── refund.js               # Process refunds
├── examples/
│   ├── single-product/         # Simple buy button
│   ├── subscription/           # Recurring billing
│   ├── donation/               # Tip/donation
│   └── pdf-delivery/          # File delivery after payment
└── README.md                   # Detailed documentation
```
