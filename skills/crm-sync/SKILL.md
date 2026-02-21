# CRM Sync Skill

## Overview
Bidirectional sync between AI agent and CRM systems.

## Supported CRMs

| CRM | Status | Features |
|-----|--------|----------|
| HubSpot | ✅ Ready | Contacts, Deals, Notes |
| Salesforce | ✅ Ready | Contacts, Leads, Tasks |
| Pipedrive | ✅ Ready | Deals, Activities |
| Zoho | 🔄 Planned | TBD |
| Notion | ✅ Ready | Databases, Pages |
| Airtable | ✅ Ready | Bases, Records |

## Configuration

```yaml
name: crm_sync
version: 1.0.0
sync:
  direction: bidirectional  # inbound, outbound, bidirectional
  interval: 5  # minutes
  retry_failed: true
  max_retries: 3
```

## Features

### Contact Sync
- Create contacts from conversations
- Update contact info
- Add conversation summaries
- Tag contacts by source

### Deal/Opportunity Sync
- Create deals from qualified leads
- Update deal stages
- Sync deal amounts
- Close deals when confirmed

### Activity Logging
- Log calls to CRM
- Log meetings
- Add notes from conversations
- Create follow-up tasks

## Usage

```bash
# Configure CRM
crm config --provider hubspot
crm config --api-key YOUR_API_KEY

# Manual sync
crm sync now

# View sync status
crm status
```

## Data Mapping

| Agent Data | HubSpot | Salesforce | Pipedrive |
|------------|---------|------------|-----------|
| contact:new | Contact | Lead | Person |
| contact:update | Contact | Contact | Person |
| deal:create | Deal | Opportunity | Deal |
| deal:stage | Deal Stage | Stage | Stage |
| note:create | Note | Note | Activity |

---

*Part of Desmond Agent Platform - Business Skills*
