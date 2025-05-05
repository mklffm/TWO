# Cloudflare API Token Setup Guide

## Step 1: Create a Cloudflare API Token

1. Log in to your Cloudflare dashboard at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click on your profile icon in the top-right corner
3. Select "My Profile"
4. Click on "API Tokens" in the left sidebar
5. Click "Create Token"

## Step 2: Use the Edit Workers Template

1. Under API token templates, find and select "Edit Cloudflare Workers"
2. This template includes the necessary permissions for deploying and managing Workers
3. Under Account Resources:
   - Select "Include" > "Specific account" > Choose your Mira Booking account
4. Under Zone Resources:
   - Select "Include" > "All zones" (or select specific zones if needed)
5. Click "Continue to summary"
6. Review permissions and click "Create Token"
7. **IMPORTANT**: Copy your token immediately - it will only be shown once!

## Step 3: Set Up Environment Variables

In your PowerShell terminal, set the environment variables:

```powershell
$env:CLOUDFLARE_API_TOKEN="your_token_from_step_2"
```

To check if your token is valid:

```powershell
npm run check:token
```

This should show your account details and confirm your permissions.

## Step 4: Get Your Account ID

After setting up your token and running the check command, note the Account ID that appears.

```powershell
$env:CF_ACCOUNT_ID="your_account_id"
```

## Step 5: Deploy

Now you can deploy your application:

```powershell
npm run deploy:manual
```

Or start the real-time deployment watcher:

```powershell
npm run deploy:watch
``` 