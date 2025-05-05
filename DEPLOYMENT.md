# Mira Booking Deployment Guide

This guide provides comprehensive instructions for deploying the Mira Booking application to Cloudflare Pages.

## Prerequisites

- **Cloudflare Account**: Access to the Cloudflare account (khalfaouimanar28@gmail.com)
- **Node.js**: Version 20 or higher installed
- **Git**: For version control and pushing changes

## Deployment Options

There are several ways to deploy the Mira Booking application:

### Option 1: Simple Deployment Script

We've created a simplified deployment script that handles the entire process:

```bash
# Run the deployment script
node deploy-to-cloudflare.js

# To skip the build step (if you've already built)
node deploy-to-cloudflare.js --skip-build
```

### Option 2: Manual Deployment Steps

If you prefer to run the commands manually:

1. **Build the application**:
   ```bash
   npm run build:cloudflare
   ```

2. **Deploy to Cloudflare Pages**:
   ```bash
   npx wrangler pages deploy out --project-name=mira-booking --branch=main
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

These are configured in the `wrangler.toml` file.

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