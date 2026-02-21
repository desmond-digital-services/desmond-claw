# Invoice Generator Skill

## Overview
Create, send, and manage invoices directly from the agent.

## Features

### Invoice Creation
- Line items with descriptions
- Tax calculation
- Discounts (percentage or fixed)
- Multiple currencies
- Custom invoice numbers

### Sending
- Email delivery
- PDF attachment
- Payment link inclusion
- Reminder scheduling

### Tracking
- Payment status
- Due date reminders
- Partial payments
- Refund processing

## Configuration

```yaml
name: invoice_generator
version: 1.0.0
defaults:
  currency: USD
  payment_terms: net_30
  tax_rate: 0
  from_name: Your Business
  from_email: billing@yourbusiness.com
```

## Invoice Fields

| Field | Required | Description |
|-------|----------|-------------|
| customer_name | Yes | Client name |
| customer_email | Yes | Send invoice here |
| items | Yes | Line items array |
| due_date | No | Default: Net 30 |
| notes | No | Additional info |

## Example Usage

```
User: Create an invoice for Acme Corp

Agent: I'll create an invoice for Acme Corp. What should I include?

User: 
- 5 hours consulting at $150/hr
- $500 software license
- Due in 15 days

Agent: Here's your invoice:

=====================================
INVOICE #INV-0001
=====================================
From: Your Business
To: Acme Corp

Line Items:
1. Consulting (5 hrs @ $150)..... $750.00
2. Software License.............. $500.00
-------------------------------------
Subtotal: $1,250.00
Tax (0%): $0.00
=====================================
TOTAL: $1,250.00
=====================================

Due: March 8, 2026

Send to: billing@acmecorp.com?
```

## Templates

### Default Invoice Email
```
Subject: Invoice #{{invoice_number}} from {{from_name}}

Dear {{customer_name}},

Please find attached invoice #{{invoice_number}}.

Amount Due: ${{total}}
Due Date: {{due_date}}

Pay online: {{payment_link}}

Thank you for your business!

{{from_name}}
{{from_email}}
```

## Integration Points

| Service | Integration | Status |
|---------|------------|--------|
| Stripe | Payments | Ready |
| PayPal | Payments | Ready |
| QuickBooks | Accounting | Ready |
| FreshBooks | Accounting | Planned |
| Gmail | Email | Ready |
| SendGrid | Email | Ready |

---

*Part of Desmond Agent Platform - Business Skills*
