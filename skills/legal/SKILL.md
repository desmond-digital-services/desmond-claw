# Legal Skill

## Overview
AI assistant skills for law firms and legal practices.

## ⚠️ Important Disclaimer
This skill provides administrative support only. It does not provide legal advice. All substantive legal questions should be routed to a licensed attorney.

## Capabilities

### Client Intake
- New client onboarding
- Case evaluation forms
- Document collection
- Conflict check (future)

### Scheduling
- Consultation bookings
- Court date reminders
- Deposition scheduling
- Attorney availability

### Document Prep
- Client intake forms
- Demand letters
- Settlement demands
- General correspondence

### Communication
- Case status updates
- Appointment reminders
- Payment reminders
- Firm announcements

## Configuration

```yaml
name: legal
version: 1.0.0
industry: legal
features:
  - client_intake
  - scheduling
  - document_prep
  - communication
  - billing
compliance:
  - hipaa: optional
  - attorney_client_privilege: required
```

## Practice Areas

| Area | Code | Common Services |
|------|------|-----------------|
| Family Law | FAM | Divorce, custody, support |
| Criminal Defense | CRIM | DUI, traffic, criminal |
| Personal Injury | PI | Auto accidents, slip & fall |
| Real Estate | RE | Closings, disputes |
| Estate Planning | EST | Wills, trusts, probate |
| Business | BIZ | LLC, contracts |

## Templates

### New Client Intake
```
Welcome to {{firm_name}}!

Thank you for contacting us. To get started, please provide:

1. Full Legal Name:
2. Date of Birth:
3. Contact Phone:
4. Email Address:
5. Brief Description of Your Legal Matter:
6. How Did You Hear About Us:

We'll review your information and contact you within 24 hours.

IMPORTANT: This is for case evaluation only. Do not share sensitive details until you've spoken with an attorney.

Reply with your information or call {{phone}} to speak with our intake team.
```

### Consultation Confirmation
```
Your consultation is confirmed!

Date: {{date}}
Time: {{time}}
Location: {{location}}

What to bring:
- Photo ID
- Any relevant documents
- List of questions

Arrival: Please arrive 10 minutes early to complete paperwork.

Questions? Call {{phone}}

{{firm_name}} - {{tagline}}
```

### Case Status Update
```
Hi {{client_name}},

Here's your case status update:

Case: {{case_type}}
Status: {{status}}
Next Action: {{next_action}}
Date: {{date}}

Questions? Don't hesitate to reach out.

Remember: {{attorney_name}} is here to help!

Reply to this message or call {{phone}}.
```

## Compliance Features

- No substantive legal advice
- Privileged communication warnings
- Document retention policies
- Conflict of interest checks
- Fee agreement confirmations

## Integration Points

| Service | Integration | Status |
|---------|------------|--------|
| Clio | API | Planned |
| MyCase | API | Planned |
| LawPay | Payments | Ready |
| Stripe | Payments | Ready |
| Google Calendar | Scheduling | Ready |

---

*Part of Desmond Agent Platform - Industry Templates*
*Disclaimer: Administrative support only. Not legal advice.*
