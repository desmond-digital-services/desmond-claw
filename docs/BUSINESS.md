# Business Deployment Guide

## Overview

The Desmond Agent Platform is designed for businesses that need:
- Custom AI agents for their operations
- White-label solutions for clients
- Industry-specific configurations
- Flexible hosting options

## Quick Start

```bash
# Install the platform
npm install -g desmond-claw@latest

# Initialize for your business
desmond-claw init --business

# Configure your industry
desmond-claw config --industry retail

# Start the gateway
desmond-claw gateway --port 18789
```

## Deployment Options

### 1. Local Deployment
Run entirely on your premises - maximum data privacy.

### 2. Cloud Deployment
Deploy to AWS, GCP, Azure, DigitalOcean, etc.

### 3. Hybrid
Local processing with cloud sync.

### 4. Client VPS
Deploy isolated instances per client.

## Multi-Tenant Support

Coming soon: Built-in multi-tenant management for service providers.

## Upstream Sync

This fork tracks OpenClaw upstream. To sync:

```bash
git remote add upstream https://github.com/openclaw/openclaw.git
git fetch upstream
git merge upstream/main
```

## License

MIT - See LICENSE file.
