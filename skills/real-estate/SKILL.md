# Real Estate Skill

## Overview
AI assistant skills for real estate agents, brokers, and property managers.

## Capabilities

### Lead Management
- Lead capture from websites
- Qualification questions
- Automated follow-ups
- CRM sync

### Property Information
- Listing details
- Showing scheduling
- Open house management
- Price comparisons

### Transaction Support
- Document requests
- Timeline reminders
- Inspection coordination
- Closing reminders

### Client Communication
- Market updates
- New listing alerts
- Showing feedback
- Anniversary greetings

## Configuration

```yaml
name: real_estate
version: 1.0.0
industry: real_estate
features:
  - lead_capture
  - showing_scheduling
  - transaction_support
  - client_communication
  - market_analysis
```

## Lead Qualification

| Stage | Qualification | Action |
|-------|--------------|--------|
| New Lead | Basic info | Send intro |
| Qualified | Budget + timeline | Schedule showing |
| Pre-Approved | Lender letter | Property search |
| Active Buyer | Showings | Offer preparation |
| Closed | Win! | Referral request |

## Templates

### New Lead Response
```
Hi {{name}}!

Thank you for reaching out about {{property_area}}!

I'm {{agent_name}} and I'll be happy to help you.

To get started, tell me:
1. What type of property are you looking for?
2. What's your budget range?
3. When are you looking to move?
4. Are you pre-approved for a mortgage?

I have access to exclusive listings and can schedule showings quickly.

Let's chat! Call me at {{phone}} or reply here.
```

### Showing Confirmation
```
Hi {{name}}!

Your showing is confirmed!

📍 {{address}}
📅 {{date}}
🕐 {{time}}

Property: {{property_name}}
Price: ${{price}}
Beds: {{beds}} | Baths: {{baths}} | Sqft: {{sqft}}

Before you go:
- Drive by the neighborhood first
- Bring ID for gated communities
- Allow 30-45 minutes

Questions? Call/text {{phone}} - {{agent_name}}
```

### Open House Follow-Up
```
Hi {{name}},

Thank you for stopping by the open house at {{address}}!

It was great meeting you. What did you think of the property?

I'd love to hear your feedback:
- 👍 Likes?
- 👎 Concerns?
- ❓ Questions?

If this isn't the right fit, I have other properties that might work!

Reply or call {{phone}} - {{agent_name}}
```

## Integration Points

| Service | Integration | Status |
|---------|------------|--------|
| MLS | API | Planned |
| Zillow | API | Planned |
| Realtor.com | API | Planned |
| HubSpot | CRM | Ready |
| Salesforce | CRM | Ready |
| DocuSign | E-signature | Ready |
| Stripe | Payments | Ready |

---

*Part of Desmond Agent Platform - Industry Templates*
