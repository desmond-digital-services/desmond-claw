# Restaurant Skill

## Overview
AI assistant skills for restaurants, cafes, and food service businesses.

## Capabilities

### Reservations
- Table booking
- Party size management
- Special occasion tracking
- Waitlist management

### Takeout & Delivery
- Order taking
- Menu questions
- Dietary restrictions
- Order status updates

### Customer Relations
- Feedback collection
- Review responses
- Loyalty programs
- Re-engagement campaigns

### Operations
- Inventory alerts (future)
- Staff scheduling hints
- Peak hour insights
- Event catering inquiries

## Configuration

```yaml
name: restaurant
version: 1.0.0
industry: restaurant
features:
  - reservations
  - takeout_orders
  - customer_feedback
  - loyalty_program
  - catering
```

## Reservation Rules

| Party Size | Table Type | Avg Duration |
|------------|-----------|---------------|
| 1-2 | Small | 45 min |
| 3-4 | Medium | 60 min |
| 5-6 | Large | 75 min |
| 7+ | Private/Group | 90+ min |

## Templates

### Reservation Confirmation
```
Hi {{name}}!

Your table is confirmed! 🎉

📅 {{date}}
🕐 {{time}}
👥 {{party_size}} guests
📍 {{restaurant_name}}
{{address}}

Reply with:
- ❌ Cancel
- ➡️ Reschedule
- ✏️ Modify

See you soon!
```

### Takeout Order Confirmation
```
Order #{{order_id}} confirmed! 🍕

{{items}}

Subtotal: ${{subtotal}}
Tax: ${{tax}}
Total: ${{total}}

Pickup time: {{pickup_time}}

When you arrive:
- Park in designated pickup spots
- Text "here" when you arrive
- We'll bring it out!

Questions? Call {{phone}}
```

### Review Response (Positive)
```
Thank you so much for the kind words, {{name}}! 🌟

We're thrilled to hear you enjoyed your experience with us.

We can't wait to see you again soon!

- The {{restaurant_name}} Team

P.S. Follow us on social for exclusive offers!
```

### Review Response (Negative)
```
Hi {{name}},

Thank you for your feedback. We're sorry to hear your experience wasn't perfect.

We take this seriously and would like to make things right.

Please contact us directly at {{phone}} so we can discuss this further.

We value your business and hope to restore your trust.

- The {{restaurant_name}} Team
```

## Integration Points

| Service | Integration | Status |
|---------|------------|--------|
| Toast | POS | Planned |
| Square | POS | Ready |
| DoorDash | Delivery | Ready |
| Uber Eats | Delivery | Ready |
| Grubhub | Delivery | Ready |
| Stripe | Payments | Ready |
| Google Reviews | Reviews | Ready |

---

*Part of Desmond Agent Platform - Industry Templates*
