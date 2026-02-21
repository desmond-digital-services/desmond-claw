# Appointment Scheduler Skill

## Overview
Manage calendar appointments, bookings, and availability.

## Features

### Booking
- Check availability
- Find open slots
- Book appointments
- Confirm bookings

### Management
- Reschedule
- Cancel
- Buffer time between appointments
- Working hours configuration

### Reminders
- 24-hour reminder
- 1-hour reminder
- Custom timing
- Multiple channels (SMS, email)

## Configuration

```yaml
name: appointment_scheduler
version: 1.0.0
settings:
  working_hours:
    monday: [9:00, 17:00]
    tuesday: [9:00, 17:00]
    wednesday: [9:00, 17:00]
    thursday: [9:00, 17:00]
    friday: [9:00, 15:00]
  slot_duration: 30  # minutes
  buffer_time: 15    # minutes between
  timezone: America/Chicago
  max_advance_booking: 30  # days
  min_notice: 24  # hours
```

## Booking Flow

```
1. User requests appointment
2. Agent checks availability
3. Agent shows available slots
4. User selects slot
5. Agent confirms + adds to calendar
6. Reminders scheduled
7. Follow-up after appointment
```

## Example

```
User: I need to schedule a consultation

Agent: I'd be happy to help! What type of consultation?

User: Marketing strategy review

Agent: Great! Here are my available times this week:

📅 Wednesday, Feb 26
• 9:00 AM
• 10:30 AM
• 2:00 PM
• 3:30 PM

📅 Thursday, Feb 27
• 9:00 AM
• 11:00 AM
• 2:00 PM

Which works for you? (Just reply with your choice)
```

## Reminder Templates

### 24-Hour Reminder
```
Hi {{name}}!

Reminder: Your appointment is tomorrow!

📅 {{date}}
🕐 {{time}}
📍 {{location}}

Anything you want to prepare or bring?

Reply to confirm or reschedule.
```

### 1-Hour Reminder
```
Hi {{name}}!

Your appointment is in 1 hour!

🕐 {{time}}
📍 {{location}}

See you soon!
```

## Integration Points

| Service | Integration | Status |
|---------|------------|--------|
| Google Calendar | API | Ready |
| Outlook | API | Ready |
| Cal.com | API | Ready |
| Calendly | API | Planned |
| Twilio | SMS Reminders | Ready |
| SendGrid | Email Reminders | Ready |

---

*Part of Desmond Agent Platform - Business Skills*
