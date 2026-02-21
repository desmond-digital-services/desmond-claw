# Lead Capture Skill

## Overview
Capture leads from web forms, conversations, and convert to CRM contacts.

## Features

### Collection Methods
- Web form integration
- Conversational capture
- QR code scanning
- Social media monitoring

### Qualification
- Basic qualification questions
- Budget assessment
- Timeline evaluation
- Need identification

### Routing
- Auto-assign to sales rep
- Route by region/industry
- Priority scoring
- Follow-up scheduling

## Configuration

```yaml
name: lead_capture
version: 1.0.0
qualification:
  questions:
    - name: budget
      label: What's your budget?
      type: select
      options: ["Under $1K", "$1K-5K", "$5K-10K", "$10K+"]
    - name: timeline
      label: When do you need this?
      type: select
      options: ["ASAP", "1-3 months", "3-6 months", "Just researching"]
    - name: need
      label: How can we help?
      type: text
routing:
  assign_by: region  # region, industry, round_robin
  auto_follow_up: true
  follow_up_delay: 1  # hours
```

## Web Form Embed

```html
<!-- Add to your website -->
<script src="https://your-agent.com/lead-capture.js" 
        data-agent="your-agent-id"></script>

<div id="lead-capture-widget"></div>
```

## Qualification Flow

```
1. Lead enters site
2. Widget activates (on scroll/time)
3. Questions asked conversationally
4. Responses scored
5. If qualified → CRM + alert
6. If unqualified → Nurture sequence
```

## Lead Scoring

| Criteria | Points |
|----------|--------|
| Budget defined | +20 |
| Timeline < 3 months | +20 |
| Clear need stated | +20 |
| Contact info complete | +10 |
| Previous customer | +30 |
| Referral | +25 |

## Lead Status

| Status | Score Range | Action |
|--------|-------------|--------|
| Hot | 80+ | Immediate call |
| Warm | 50-79 | Call within 2 hrs |
| Cool | 20-49 | Nurture sequence |
| Cold | 0-19 | General follow-up |

## Integration Points

| Service | Integration | Status |
|---------|------------|--------|
| HubSpot | Forms, CRM | Ready |
| Salesforce | Web-to-Lead | Ready |
| ConvertKit | Email | Ready |
| Mailchimp | Email | Ready |
| Slack | Alerts | Ready |
| Zapier | Automation | Ready |

---

*Part of Desmond Agent Platform - Business Skills*
