# Enterprise Team Setup Guide

_Set up hierarchical inter-agent communication in 10 minutes_

---

## What We're Building

```
Manager (1 instance)
    │
    ├── Employee 1 (HVAC Tech)
    ├── Employee 2 (Driver)
    └── Employee 3 (Sales)
```

Each person gets their own Desmond-Claw instance. The manager can send tasks to employees. Employees can report back to manager.

---

## Step 1: Prepare Your Team Directory

Create a simple mapping:

| Role    | Label           | Telegram ID | Purpose      |
| ------- | --------------- | ----------- | ------------ |
| Manager | manager-dallas  | 111111111   | Supervisor   |
| Tech 1  | tech-dallas-1   | 222222222   | HVAC repairs |
| Tech 2  | tech-dallas-2   | 333333333   | HVAC repairs |
| Driver  | driver-dallas-1 | 444444444   | Deliveries   |

---

## Step 2: Configure Manager Instance

1. Copy the template:

   ```bash
   cp config-templates/manager.template.yml ~/.clawdbot/config.yml
   ```

2. Edit with your values:

   ```yaml
   session:
     label: "manager-dallas"
     agentId: "manager-dallas"

   channels:
     telegram:
       chatIds:
         - 111111111

   teamDirectory:
     "tech-dallas-1": { name: "John", role: "HVAC" }
     "tech-dallas-2": { name: "Sarah", role: "HVAC" }
     "driver-dallas-1": { name: "Mike", role: "Driver" }
   ```

3. Start the manager instance

---

## Step 3: Configure Employee Instances

For each employee, repeat:

1. Copy the template:

   ```bash
   cp config-templates/employee.template.yml ~/.clawdbot/config.yml
   ```

2. Edit with their values:

   ```yaml
   session:
     label: "tech-dallas-1"
     agentId: "tech-dallas-1"

   channels:
     telegram:
       chatIds:
         - 222222222

   manager:
     label: "manager-dallas"
     telegramId: 111111111
   ```

3. Start their instance

---

## Step 4: Test Communication

### Manager → Employee

From manager's chat:

```
Send to tech-dallas-1: "Hey, we have a new AC call at 123 Main St. Can you take it?"
```

### Employee → Manager

From employee's chat:

```
Send to manager: "Got it, heading there now. ETA 20 min."
```

### Check Who's Online

```
List sessions
```

---

## Step 5: Set Up Automated Flows (Optional)

### Daily Standup

Manager config - add cron:

```yaml
crons:
  dailyStandup:
    schedule: { kind: "cron", expr: "0 8 * * 1-5" }
    payload:
      kind: "agentTurn"
      message: "Morning! What's today's plan?"
      sessionTarget: "isolated"
```

### Auto-Report

Employee config - add cron:

```yaml
crons:
  endOfDay:
    schedule: { kind: "cron", expr: "0 17 * * 1-5" }
    payload:
      kind: "agentTurn"
      message: "Daily report: What did you accomplish today?"
      sessionTarget: "isolated"
    delivery:
      mode: "announce"
      channel: "telegram"
      to: "manager-dallas"
```

---

## Troubleshooting

| Problem                | Fix                                 |
| ---------------------- | ----------------------------------- |
| "Session not found"    | Check the label matches exactly     |
| "Permission denied"    | Employee needs manager in allowlist |
| Not receiving messages | Check Telegram chat ID is correct   |

---

## Security Notes

- Each instance should have **unique credentials**
- Manager can see all team sessions (visibility: "tree")
- Employees can only see manager + team (restricted allowlist)
- No cross-team communication by default

---

## Next Steps

- Add more team members
- Integrate with your CRM
- Set up lead distribution
- Connect to scheduling system
