# Inter-Agent Communication System

**Desmond-Claw Enterprise Feature Documentation**  
_For team hierarchies with deterministic message routing_

---

## Overview

Desmond-Claw includes a built-in inter-agent communication system that enables:

- **Hierarchical messaging** (manager → employee)
- **Session labels** for easy targeting
- **Policy-controlled visibility** (who can talk to whom)
- **Scheduled inter-agent tasks** via cron

This system is **already implemented** - no additional code required.

---

## Core Concepts

### Sessions

Every conversation is a "session" with a unique key:

- `main` - the primary session
- `isolated-{uuid}` - spawned sub-agent sessions
- Custom labels for team members

### Available Tools

| Tool               | Purpose                           |
| ------------------ | --------------------------------- |
| `sessions_send`    | Send a message to another session |
| `sessions_list`    | List all accessible sessions      |
| `sessions_history` | Read history from another session |

---

## Session Targeting

### By Session Key (Direct)

```
sessions_send(sessionKey="isolated-abc123", message="Complete the report")
```

### By Label (Recommended for Teams)

```
sessions_send(label="john-hvac", message="New lead at 123 Main St")
```

### By Agent ID

```
sessions_send(agentId="employee-2", message="Review this please")
```

---

## Policy Configuration

Control who can communicate with whom via config:

```typescript
// In your config
{
  tools: {
    sessions: {
      // "tree" = current session + spawned
      // "self" = only current
      // "agent" = any session in your agentId
      // "all" = any session
      visibility: "tree",

      // Allow/deny specific targets
      allowlist: ["manager", "team-*"],
      denylist: ["external-*"],
    }
  }
}
```

---

## Manager → Employee Communication

### Setup

1. **Assign labels to each employee's session**
   - Use `session_key` file or config
   - Example: `john-hvac`, `sarah-legal`, `mike-driver`

2. **Configure visibility policies**
   - Employees can see manager
   - Employees may or may not see each other

3. **Create communication patterns**

### Examples

#### Manager assigns task to employee:

```
Tool: sessions_send
label: john-hvac
message: New AC repair lead - 456 Oak Ave. Call them within 30 min.
```

#### Employee reports back:

```
Tool: sessions_send
label: manager
message: Completed the AC repair at 456 Oak Ave. Unit running fine.
```

#### Manager broadcasts to team:

```
Tool: sessions_send
label: all-technicians
message: Team meeting at 3pm today. Be there.
```

---

## Cron-Based Scheduling

Schedule inter-agent messages:

```json
{
  "schedule": { "kind": "cron", "expr": "0 9 * * 1-5" },
  "payload": {
    "kind": "agentTurn",
    "message": "Send daily summary to manager",
    "sessionTarget": "isolated"
  },
  "delivery": {
    "mode": "announce",
    "channel": "telegram",
    "to": "manager"
  }
}
```

---

## Reliability Features

### Delivery Confirmation

- Messages include runId for tracking
- Use `sessions_history` to verify delivery

### Idempotency

- Same message with same ID won't duplicate
- Safe to retry

### Visibility Guards

- Sessions only see what they're allowed to see
- No cross-team leaks by default

---

## Configuration Presets

### Manager Config

```yaml
session:
  label: "manager-office"

tools:
  sessions:
    visibility: "tree"
    allowlist: ["*"]
    # Can communicate with everyone
```

### Employee Config

```yaml
session:
  label: "employee-hvac-1"

tools:
  sessions:
    visibility: "tree"
    allowlist: ["manager", "team-hvac-*"]
    # Can only talk to manager and HVAC team
```

---

## Best Practices

1. **Use consistent labels** - `role-location-format` (e.g., `tech-dallas-1`)
2. **Set up visibility policies first** - prevent accidental leaks
3. **Test with dry runs** - use `sessions_list` to verify connectivity
4. **Document your hierarchy** - keep a team directory

---

## Troubleshooting

| Issue                  | Solution                                            |
| ---------------------- | --------------------------------------------------- |
| "Session not found"    | Check label is correct; verify visibility policy    |
| "Permission denied"    | Target session may be outside your visibility scope |
| "Message not received" | Check target's session is active                    |

---

_This system is part of the core Desmond-Claw distribution._
