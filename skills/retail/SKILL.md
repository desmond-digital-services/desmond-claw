# Retail Skill

## Overview
AI assistant skills for retail and e-commerce businesses.

## Capabilities

### Customer Service
- Answer product questions
- Order status lookup
- Return/refund processing
- Size and fit assistance

### Inventory Management
- Stock level queries
- Restock alerts
- Product availability check
- SKU lookup

### Order Processing
- Order creation
- Order modification
- Order cancellation
- Tracking number lookup

### Marketing
- Promotion information
- Loyalty program details
- Gift card inquiries
- Newsletter signup

## Configuration

```yaml
name: retail
version: 1.0.0
industry: retail
channels:
  - telegram
  - whatsapp
  - discord
features:
  - order_lookup
  - inventory_check
  - customer_support
  - marketing
```

## Integration Points

| Service | Integration | Status |
|---------|------------|--------|
| Shopify | REST API | Ready |
| WooCommerce | REST API | Ready |
| Square | API | Planned |
| Stripe | Payments | Ready |

## Usage

```bash
# Configure for your store
retail config --shopify-store YOUR_STORE.myshopify.com
retail config --api-key YOUR_API_KEY

# Enable features
retail enable order_tracking
retail enable inventory_alerts
```

## Templates

### Order Confirmation
```
Dear {{customer_name}},

Your order #{{order_id}} has been confirmed!

Items:
{{items}}

Total: ${{total}}
Shipping to: {{address}}

Track your order: {{tracking_url}}
```

### Abandoned Cart
```
Hi {{customer_name}}!

You left something behind!

{{abandoned_items}}

Complete your purchase: {{checkout_url}}
```

---

*Part of Desmond Agent Platform - Industry Templates*
