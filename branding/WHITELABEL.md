# White-Label Branding Toolkit

## Overview
Customize the Desmond Agent Platform with your company branding.

## What's Customizable

| Element | Supported | File |
|---------|-----------|------|
| Logo | ✅ PNG, SVG | `branding/logo.svg` |
| Colors | ✅ Primary, accent | `branding/colors.json` |
| App Name | ✅ | `branding/config.json` |
| Tagline | ✅ | `branding/config.json` |
| Favicon | ✅ | `branding/favicon.svg` |
| Email Templates | ✅ | `branding/templates/` |

## Quick Start

```bash
# 1. Create branding directory
mkdir -p branding

# 2. Add your logo
cp your-logo.svg branding/logo.svg

# 3. Configure colors
cat > branding/colors.json <<EOF
{
  "primary": "#FF6B35",
  "secondary": "#004E89",
  "accent": "#FFFFFF",
  "background": "#F7F7F7",
  "text": "#333333"
}
EOF

# 4. Apply branding
desmond-claw branding --apply ./branding

# 5. Rebuild UI
pnpm ui:build
```

## Configuration Files

### colors.json
```json
{
  "primary": "#FF6B35",
  "secondary": "#004E89", 
  "accent": "#FFFFFF",
  "background": "#F7F7F7",
  "text": "#333333",
  "success": "#28A745",
  "warning": "#FFC107",
  "error": "#DC3545"
}
```

### config.json
```json
{
  "name": "Your Company",
  "tagline": "Your tagline here",
  "supportEmail": "support@yourcompany.com",
  "website": "https://yourcompany.com",
  "privacyPolicy": "https://yourcompany.com/privacy",
  "termsOfService": "https://yourcompany.com/terms"
}
```

## Logo Guidelines

### Requirements
- Format: SVG preferred, PNG accepted
- Size: 512x512px minimum
- Background: Transparent or matching brand color

### Naming
- Main logo: `logo.svg` or `logo.png`
- Dark variant: `logo-dark.svg` (for light backgrounds)
- Icon: `icon.svg` (for favicon, app icon)

## Email Templates

Customize email templates in `branding/templates/`:

| Template | Default File |
|----------|--------------|
| Welcome | `welcome.html` |
| Invoice | `invoice.html` |
| Appointment | `appointment.html` |
| Support | `support.html` |

Use `{{variable}}` for dynamic content:
- `{{customer_name}}`
- `{{company_name}}`
- `{{link}}`
- `{{date}}`

## Export Package

Share your branding with clients:

```bash
desmond-claw branding --export my-company-branding.zip
```

This creates a zip file with all branding assets that can be imported on other installations.

## CLI Reference

```bash
# Apply branding
desmond-claw branding --apply ./branding

# Export branding package
desmond-claw branding --export my-brand.zip

# Import branding package
desmond-claw branding --import client-brand.zip

# Reset to default
desmond-claw branding --reset
```

## Examples

### Orange & Black (HVAC)
```json
{
  "primary": "#FF6B00",
  "secondary": "#1A1A1A",
  "accent": "#FFB800"
}
```

### Blue & White (Legal)
```json
{
  "primary": "#1E3A5F",
  "secondary": "#2C5282",
  "accent": "#C53030"
}
```

### Green & Cream (Real Estate)
```json
{
  "primary": "#2F855A",
  "secondary": "#276749",
  "accent": "#F6E05E"
}
```

---

*Part of Desmond Agent Platform - White-Label Toolkit*
