# Hosting Options

## Overview

The Desmond Agent Platform can be deployed in multiple environments to suit your business needs.

## Options Matrix

| Option | Best For | Setup Complexity | Data Privacy |
|--------|----------|------------------|--------------|
| Local (Mac/PC) | Development, small business | Low | Highest |
| VPS (Cloud) | Production, remote teams | Medium | High |
| Docker | Scalability, CI/CD | Medium | High |
| Kubernetes | Enterprise, multi-tenant | High | High |

## Local Deployment

### macOS
```bash
desmond-claw onboard --install-daemon
```

### Linux
```bash
desmond-claw onboard --install-daemon
```

### Windows (WSL2 recommended)
```bash
# Install WSL2 first, then:
desmond-claw onboard --install-daemon
```

## VPS Deployment

### DigitalOcean
```bash
# One-click droplet coming soon
# Or use our setup script:
curl -sL https://desmond-digital.com/install.sh | bash
```

### AWS EC2
```bash
# Use our CloudFormation template
aws cloudformation create-stack --stack-name desmond-agent --template-body file://cf-template.yaml
```

## Docker Deployment

```bash
# Pull the image
docker pull desmonddigital/desmond-claw:latest

# Run
docker run -d \
  --name desmond-agent \
  -p 18789:18789 \
  -v ~/.desmond:/home/node/.desmond \
  desmonddigital/desmond-claw:latest
```

See `docker-compose.yml` for full production setup.

## Kubernetes

For enterprise deployments, we provide Kubernetes manifests. Contact info@desmond-digital.com for support.

## Security Considerations

- Always use HTTPS in production
- Configure firewall rules
- Use strong API keys
- Enable encryption at rest
- Regular security updates
