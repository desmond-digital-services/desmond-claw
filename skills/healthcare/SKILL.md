# Healthcare Skill

## Overview
AI assistant skills for healthcare practices, clinics, and medical offices.

## ⚠️ Important Compliance Notice
This skill is for administrative support only. It does not provide medical advice, diagnose conditions, or recommend treatments. All clinical questions must be directed to healthcare providers.

## Capabilities

### Scheduling
- Appointment booking
- Appointment reminders
- Rescheduling/cancellation
- New patient intake

### Patient Communication
- Pre-visit instructions
- Post-visit follow-up
- Medication reminders
- Bill pay reminders

### Administrative
- Insurance verification request
- Form submission reminders
- Referral tracking
- Prescription refill requests

### Triage (Non-Clinical)
- Office hours inquiry
- Direction/location info
- Accepted insurance list
- General FAQs

## Configuration

```yaml
name: healthcare
version: 1.0.0
industry: healthcare
features:
  - scheduling
  - patient_communication
  - administrative
  - reminders
compliance:
  - hipaa: required
  - phi_protection: required
```

## Appointment Types

| Type | Duration | Preparation |
|------|----------|-------------|
| New Patient | 30-45 min | Bring ID, insurance, meds list |
| Follow-up | 15-20 min | Bring questions, changes |
| Annual Physical | 30-45 min | Fasting if required |
| Sick Visit | 15 min | List symptoms, duration |
| Telehealth | 15 min | Stable internet, camera |

## Templates

### Appointment Reminder (48 hours)
```
Hi {{patient_name}},

Reminder: You have an appointment coming up!

📅 {{date}}
🕐 {{time}}
🏥 {{practice_name}}
📍 {{location}}

Provider: {{provider_name}}

Before your visit:
- Bring insurance card and photo ID
- List current medications
- Arrive 15 min early for paperwork

Questions? Call {{phone}}

Reply:
- ❌ Need to cancel
- ➡️ Need to reschedule
```

### Pre-Visit Instructions
```
Hi {{patient_name}},

Your appointment is coming up! Here's how to prepare:

📅 {{date}} at {{time}}
👨‍⚕️ {{provider_name}}

Instructions:
{{instructions}}

Things to bring:
- Photo ID
- Insurance card
- List of current medications
- Copay (if applicable)

Questions? Call {{office_phone}}

See you soon!
```

### Post-Visit Follow-Up
```
Hi {{patient_name}},

Thank you for visiting {{practice_name}}!

Your visit summary:
- Provider: {{provider_name}}
- Date: {{date}}
- Next steps: {{next_steps}}

{{#if prescriptions}}
Prescriptions have been sent to your pharmacy.
{{/if}}

{{#if follow_up_needed}}
Follow-up appointment: {{follow_up_date}}
Schedule: {{scheduling_link}} or call {{phone}}
{{/if}}

Questions about your visit? Message us or call {{phone}}.

- The {{practice_name}} Team
```

### Prescription Refill Request
```
Hi {{patient_name}},

We received your refill request for {{medication_name}}.

Status: {{status}}

{{#if approved}}
Your prescription is ready for pickup!
Pharmacy: {{pharmacy_name}}
Address: {{pharmacy_address}}
{{/if}}

{{#if pending}}
We're processing your request. You'll receive a notification when it's ready.
{{/if}}

{{#if needs_appointment}}
A visit may be required for this refill. Would you like to schedule one?
{{/if}}

Questions? Call {{phone}}
```

## Compliance Features (HIPAA)

- No PHI in messages without consent
- Secure message delivery
- Access audit logging
- Auto-response with portal info
- BAA-ready integrations

## Integration Points

| Service | Integration | Status |
|---------|------------|--------|
| Epic | EHR | Planned |
| AthenaHealth | EHR | Planned |
| DrChrono | EHR | Planned |
| Kareo | EHR | Planned |
| Stripe | Payments | Ready |
| Twilio | SMS (HIPAA BAA) | Ready |

---

*Part of Desmond Agent Platform - Industry Templates*
*Disclaimer: Administrative support only. Not medical advice.*
