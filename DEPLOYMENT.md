# Mira Booking Deployment Guide

This guide provides comprehensive instructions for deploying the Mira Booking application to Cloudflare Pages.

## Prerequisites

- **Cloudflare Account**: Access to the Cloudflare account (khalfaouimanar28@gmail.com)
- **Node.js**: Version 20 or higher installed
- **Git**: For version control and pushing changes

## Configuration Files

The project uses two separate configuration files:

1. **wrangler.toml** - Used for Cloudflare Workers development
2. **wrangler.pages.toml** - Used for Cloudflare Pages deployments

When deploying to Cloudflare Pages, make sure to use the Pages-specific configuration.

## Deployment Options

There are several ways to deploy the Mira Booking application:

### Option 1: Simple Deployment Script (Recommended)

We've created a simplified deployment script that handles the entire process:

```bash
# Run the deployment script
node deploy-to-cloudflare.js

# To skip the build step (if you've already built)
node deploy-to-cloudflare.js --skip-build
```

This script automatically:
- Checks for authentication with Cloudflare
- Builds the project (unless skipped)
- Deploys using the Pages-specific configuration

### Option 2: Manual Deployment Steps

If you prefer to run the commands manually:

1. **Build the application**:
   ```bash
   npm run build:cloudflare
   ```

2. **Deploy to Cloudflare Pages**:
   ```bash
   npx wrangler pages deploy out --project-name=mira-booking --branch=main --config=wrangler.pages.toml
   ```

### Option 3: GitHub Actions (Automated CI/CD)

The repository is configured with GitHub Actions for automatic deployment when changes are pushed to the `master` branch.

The workflow file is located at `.github/workflows/deploy.yml`.

## Authentication with Cloudflare

Before deploying, make sure you're authenticated with Cloudflare:

```bash
# Login to Cloudflare (opens browser window)
npx wrangler login

# Verify your login
npx wrangler whoami
```

## Environment Variables

The application requires the following environment variables:

- `JWT_SECRET`: Used for authentication (a default is provided if not set)
- `CF_ACCOUNT_ID`: The Cloudflare account ID (e3a38c538e41a3c681cf1c38a8fe447f)

For local development or manual deployment, set these in PowerShell:

```powershell
$env:CF_ACCOUNT_ID = "e3a38c538e41a3c681cf1c38a8fe447f"
$env:JWT_SECRET = "your-secret-here"
```

For GitHub Actions, these are set as repository secrets.

## Domain Configuration

The application is configured to be deployed to the following domains:

- Primary domain: mirabooking.com
- Secondary domain: www.mirabooking.com

These are configured in the wrangler configuration files.

## DNS Propagation and Custom Domains

After deploying your site to Cloudflare Pages, you might notice that the changes appear on the *.pages.dev URL but not on your custom domain (www.mirabooking.com). This is often due to DNS propagation delays.

### Understanding DNS Propagation

DNS propagation is the time it takes for DNS changes to spread across the internet. When you update your DNS records or deploy a new version of your site, it can take anywhere from a few minutes to 48 hours for those changes to be visible to all users globally. This happens because:

1. DNS records are cached by various servers along the path from a user to your website
2. Different DNS servers have different cache expiration times (TTL - Time To Live)
3. Some ISPs might ignore TTL settings and cache DNS records for longer periods

### Troubleshooting Custom Domain Issues

If your site is working at https://mira-booking.pages.dev but not at www.mirabooking.com, try these steps:

1. **Clear your browser cache**: This ensures you're not viewing a cached version of the site
   ```
   Chrome: Ctrl+Shift+Delete → Select "Cached images and files" → Clear data
   Firefox: Ctrl+Shift+Delete → Select "Cache" → Clear
   ```

2. **Check DNS records**: Verify that your DNS records are correctly pointing to Cloudflare
   ```bash
   # View your current deployments
   npx wrangler pages deployment list --project-name=mira-booking
   
   # Check that your custom domains are set up
   npx wrangler pages project list
   ```

3. **Use alternative DNS servers**: Try accessing your site using a different DNS resolver
   ```
   Add 1.1.1.1 (Cloudflare's DNS) to your network settings temporarily
   ```

4. **Check from different networks**: Try accessing your site from a mobile device using cellular data

5. **Wait for propagation**: In some cases, you simply need to wait for DNS changes to propagate fully

### Verifying Custom Domain Setup

To make sure your custom domain is properly set up in Cloudflare Pages:

1. Go to the Cloudflare Dashboard (https://dash.cloudflare.com)
2. Navigate to Workers & Pages → Pages → mira-booking
3. Click on "Custom domains" and verify that www.mirabooking.com is listed
4. Check the DNS tab to ensure the CNAME record for www points to mira-booking.pages.dev

## Troubleshooting

If you encounter issues during deployment:

1. **Authentication Issues**:
   - Make sure you're logged in (`npx wrangler login`)
   - Check that your account has the necessary permissions

2. **Build Issues**:
   - Check for TypeScript errors: `npx tsc --noEmit`
   - Try the build without TypeScript checks: `npm run build:no-ts`

3. **Deployment Errors**:
   - Verify that the `out` directory exists and contains the build files
   - Check the Cloudflare Pages dashboard for specific error messages
   - Make sure you're using the correct configuration file (wrangler.pages.toml for Pages deployments)
   - Ensure there are no conflicting settings between Workers and Pages configurations

## Maintenance

To check the deployment status or view logs:

```bash
# List deployments
npx wrangler pages deployment list --project-name=mira-booking

# View logs (if available)
npx wrangler pages deployment tail <deployment-id>
```

## Updating the Website

To update the website with new changes:

1. Make your code changes
2. Test locally with `npm run dev`
3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. Push to GitHub:
   ```bash
   git push origin master
   ```
5. The GitHub Actions workflow will automatically deploy the changes
   (or use the manual deployment options described above)

## Backup and Recovery

- The codebase is backed up in the GitHub repository
- Cloudflare maintains previous deployments that can be rolled back if needed
- To create a rollback, you can redeploy a previous version from the Cloudflare dashboard 