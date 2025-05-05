# Real-Time Deployment Setup for Mira Booking

This guide explains how to set up automatic real-time deployments using Cloudflare API tokens.

## Creating a Cloudflare API Token (Simplified Method)

1. Log in to your Cloudflare dashboard at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Profile** > **API Tokens** (in the top-right user menu)
3. Click **Create Token**
4. Under **API token templates**, find and select **Edit Cloudflare Workers**
   ![Cloudflare API Token Templates](https://developers.cloudflare.com/assets/edit-workers-token-b09b8eb7.png)
5. You'll see the preset permissions which include everything needed for deploying Workers

6. Under **Account Resources**:
   - Select **Include** > **Specific account** > Choose your account
   
7. Under **Zone Resources**:
   - Select **Include** > **All zones** (or specific zones if needed)
   
8. You can leave all other settings as they are
   
9. Click **Continue to summary**, then **Create Token**

10. **IMPORTANT**: Copy your token immediately and store it safely. You will not be able to see it again.

## Setting Up Fast Auto-Deployments

### Step 1: Set the API Token as Environment Variable

```bash
# On Windows CMD
set CF_API_TOKEN=your_token_here

# On Windows PowerShell
$env:CF_API_TOKEN="your_token_here"

# On Linux/Mac
export CF_API_TOKEN=your_token_here
```

### Step 2: Set Your Account ID

```bash
# Get your account ID first
npx wrangler whoami

# Then set it as environment variable
# On Windows CMD
set CF_ACCOUNT_ID=your_account_id

# On Windows PowerShell
$env:CF_ACCOUNT_ID="your_account_id"

# On Linux/Mac
export CF_ACCOUNT_ID=your_account_id
```

### Step 3: Run the Real-Time Deployment Watcher

```bash
npm run deploy:watch
```

This will monitor your files and deploy changes every 1 second for instant updates.

## Setting Up GitHub Actions (CI/CD)

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Add two secrets:
   - Name: `CF_API_TOKEN` | Value: Your copied token
   - Name: `CF_ACCOUNT_ID` | Value: Your Cloudflare account ID

The GitHub Action workflow will now automatically deploy changes on every push to the main branch.

## Instant Deployments

For zero-wait deployments without the 1-second polling:

```bash
npm run deploy:instant
```

## Troubleshooting

If you encounter issues:

1. Verify the API token is correct and not expired
2. Make sure you've selected the correct account
3. Test a basic deployment using:
   ```bash
   CF_API_TOKEN=your_token wrangler deploy
   ```
4. Check your token has the correct permissions by running:
   ```bash
   CF_API_TOKEN=your_token wrangler whoami
   ```

## Security Notes

- Never commit your API token to version control
- Consider setting a TTL (expiration) on your token for better security
- Use IP restrictions when possible to limit where the token can be used from 