# HVAC Skill

## Overview
AI assistant skills for HVAC (Heating, Ventilation, Air Conditioning) service businesses.

## Capabilities

### Scheduling & Dispatch
- Appointment booking
- Service call scheduling
- Technician dispatch
- Route optimization (future)

### Customer Communication
- Service reminders
- Appointment confirmations
- Follow-up after service
- Emergency dispatch

### Estimates & Quotes
- Generate estimates
- Price lookup by service
- Part pricing
- Labor cost calculation

### Service Types
- AC repair
- Heating repair
- Installation
- Maintenance plans
- Emergency service
- Inspection

## Configuration

```yaml
name: hvac
version: 1.0.0
industry: hvac
features:
  - scheduling
  - dispatch
  - estimates
  - maintenance_plans
  - emergency_response
```

## Service Codes

| Code | Service | Base Price |
|------|---------|-------------|
| HVAC-AC-REPAIR | AC Repair | $150+ |
| HVAC-HEAT-REPAIR | Heating Repair | $150+ |
| HVAC-INSTALL | New Installation | $3000+ |
| HVAC-MAINT | Maintenance Plan | $99-199/yr |
| HVAC-INSPECT | Inspection | $75-150 |
| HVAC-EMERGENCY | Emergency (24/7) | 1.5x rate |

## Templates

### Appointment Confirmation
```
Hi {{customer_name}},

Your service appointment is confirmed!

Date: {{date}}
Time: {{time_window}}
Technician: {{tech_name}}
Service: {{service_type}}

What to expect:
- {{tech_name}} will arrive within your time window
- We'll call 15-30 minutes before arrival

Questions? Reply or call {{phone}}
```

### Service Reminder
```
Hi {{customer_name}},

Reminder: Your {{service_type}} is scheduled for {{date}}.

Don't forget:
- 🏠 Ensure someone 18+ is home
- 🔑 Provide gate codes if needed
- 🐕 Secure pets

Need to reschedule? Call {{phone}} or reply here.

Thank you for choosing {{company_name}}!
```

### Post-Service Follow-up
```
Hi {{customer_name}},

Thank you for choosing {{company_name}}!

Your {{service_type}} service is complete.

Invoice: {{invoice_url}}
Amount: ${{total}}

Was everything satisfactory? Reply with:
✅ Everything great
⚠️ Had an issue

Leave a review: {{review_link}}

Questions? Reply anytime!
```

## Integration Points

| Service | Integration | Status |
|---------|------------|--------|
| Housecall Pro | API | Ready |
| ServiceTitan | API | Planned |
| FieldPulse | API | Planned |
| QuickBooks | Accounting | Ready |
| Stripe | Payments | Ready |

---

*Part of Desmond Agent Platform - Industry Templates*
