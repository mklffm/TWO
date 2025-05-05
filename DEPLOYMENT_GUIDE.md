# Mira Booking Deployment Guide

This guide provides step-by-step instructions for deploying the Mira Booking application to Cloudflare Workers.

## Setup Requirements

1. **Cloudflare Account**: You need a Cloudflare account with Workers enabled
2. **API Token**: You need a Cloudflare API token with "Edit Workers" permissions
3. **Node.js & npm**: You need Node.js installed (version 18 or higher)

## Step 1: Set Up Cloudflare Credentials

First, create a Cloudflare API token:

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to My Profile > API Tokens
3. Click "Create Token"
4. Select the "Edit Cloudflare Workers" template
5. Set the Account Resources to your account
6. Click "Create Token" and copy the generated token

Next, set up the environment variables in your terminal:

```powershell
# Windows PowerShell
$env:CLOUDFLARE_API_TOKEN="your_copied_token"

# Verify the token works and get your account ID
npm run check:token

# Set your account ID (from the output above)
$env:CF_ACCOUNT_ID="your_account_id"
```

## Step 2: Configure Your Deployment

The main configuration file is `wrangler.toml`. Make sure it contains:

1. Correct domain settings in the `routes` section
2. Proper database bindings if you're using Cloudflare D1
3. Appropriate KV namespace bindings
4. Correct environment variables

## Step 3: Manual Deployment

To test if everything is set up correctly, run a manual deployment:

```powershell
npm run build:cloudflare
npm run deploy:manual
```

This will build your Next.js application and deploy it to Cloudflare Workers.

## Step 4: Set Up Real-Time Deployment

For continuous development, you can use the real-time deployment script:

```powershell
npm run deploy:watch
```

This will:
1. Monitor your files for changes
2. Automatically rebuild and deploy whenever a change is detected
3. Show deployment status in the console

## Step 5: Set Up GitHub Actions (CI/CD)

For automated deployments from GitHub:

1. Go to your GitHub repository Settings > Secrets > Actions
2. Add these secrets:
   - `CF_API_TOKEN`: Your Cloudflare API token
   - `CF_ACCOUNT_ID`: Your Cloudflare account ID
3. Ensure your `.github/workflows/deploy.yml` file is properly configured
4. Push changes to the `master` branch to trigger automatic deployments

## Troubleshooting

If you encounter deployment issues:

1. Check `DEPLOYMENT_TROUBLESHOOTING.md` for common issues and solutions
2. Verify your API token has the correct permissions
3. Check if your wrangler.toml configuration is valid

## Maintenance

To check deployment status and logs:

```powershell
# List recent deployments
npx wrangler deployments list

# View logs from your Worker
npx wrangler tail
```

For additional help, refer to the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/). 