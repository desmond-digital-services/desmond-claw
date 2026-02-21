# Support Ticket Skill

## Overview
Manage customer support tickets directly through the AI agent.

## Features

### Ticket Creation
- From any channel (chat, email, form)
- Auto-categorize issues
- Priority assignment
- Assign to team member

### Ticket Management
- Status tracking
- Escalation rules
- SLA monitoring
- Resolution tracking

### Communication
- Status updates to customers
- Internal notes
- Resolution summaries
- Satisfaction surveys

## Ticket Lifecycle

```
New → In Progress → Pending → Resolved → Closed
              ↓
         Escalated
```

## Configuration

```yaml
name: support_ticket
version: 1.0.0
settings:
  auto_assign: true
  escalation_threshold: 24  # hours
  priority_levels:
    - critical: 1hr response
    - high: 4hr response
    - medium: 24hr response
    - low: 72hr response
  categories:
    - billing
    - technical
    - account
    - sales
    - other
```

## Example Conversation

```
User: I can't log into my account!

Agent: I'm sorry to hear that! Let me help you.

1. Can you tell me what happens when you try to login?
   - Error message?
   - Nothing happens?
   - Wrong password reset email?

2. What email did you use to sign up?

Once I have these details, I can either:
- Reset your password
- Check your account status
- Create a support ticket for our tech team
```

## Ticket Fields

| Field | Required | Description |
|-------|----------|-------------|
| subject | Yes | Brief issue summary |
| description | Yes | Full details |
| category | Yes | billing, technical, etc |
| priority | Auto | Based on keywords |
| customer_email | Yes | For updates |
| channel | Auto | Where it came from |

## Templates

### Ticket Confirmation
```
Hi {{customer_name}},

Your support ticket has been created! 🎫

Ticket #: {{ticket_id}}
Subject: {{subject}}
Priority: {{priority}}
Category: {{category}}

We'll get back to you within {{response_time}}.

Track your ticket: {{ticket_url}}

Thank you for reaching out!
```

### Ticket Resolution
```
Hi {{customer_name}},

Great news! Your issue has been resolved. ✅

Ticket #: {{ticket_id}}
Subject: {{subject}}

Resolution: {{resolution}}

Was this helpful? Please rate your experience:
👍 Resolved
👎 Still need help

Thank you for your patience!

- Support Team
```

### Escalation Alert (Internal)
```
🚨 TICKET ESCALATED

Ticket: #{{ticket_id}}
Customer: {{customer_email}}
Priority: {{priority}}
Time Open: {{hours}} hours

Subject: {{subject}}
Latest Update: {{last_message}}

Assigned to: {{assignee}}
```

## Integration Points

| Service | Integration | Status |
|---------|------------|--------|
| Zendesk | API | Planned |
| Freshdesk | API | Ready |
| HelpScout | API | Planned |
| Intercom | API | Ready |
| Slack | Notifications | Ready |
| Jira | Escalation | Planned |

---

*Part of Desmond Agent Platform - Business Skills*
