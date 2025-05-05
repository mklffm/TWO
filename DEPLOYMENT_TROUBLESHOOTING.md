# Mira Booking Deployment Troubleshooting Guide

This guide will help you resolve common issues with the Cloudflare Workers deployment for Mira Booking.

## Checking Your Environment

First, verify your environment is properly set up:

```bash
# On Windows Powershell
$env:CLOUDFLARE_API_TOKEN="your_token_here"
$env:CF_ACCOUNT_ID="your_account_id_here"

# Run the token checker
npm run check:token
```

## Common Issues and Solutions

### 1. Changes Not Appearing on Live Site

**Possible causes:**

- **Incorrect API Token Permissions**: Your token might not have the right permissions to deploy Workers.
- **Cloudflare Cache**: Cloudflare might be caching old content.
- **Wrong Branch in GitHub Actions**: Ensure GitHub Actions is set to deploy from the correct branch.
- **Wrong Worker Configuration**: The wrangler.toml file might have configuration issues.

**Solutions:**

1. **Verify API Token**:
   ```bash
   npm run check:token
   ```

2. **Clear Cloudflare Cache**:
   - Go to your Cloudflare dashboard
   - Navigate to the "Caching" section
   - Click "Purge Everything"

3. **Manual Deployment**:
   ```bash
   npm run deploy:manual
   ```

4. **Check Deployment Logs**:
   ```bash
   npx wrangler deployments list
   ```

### 2. Authentication Error with Cloudflare API

If you see errors like "A request to the Cloudflare API failed" or "Unable to authenticate request", check:

1. **API Token Setup**:
   - Ensure you've created a token with "Edit Cloudflare Workers" permissions
   - Verify the token is set correctly in environment variables
   - Follow the instructions in CLOUDFLARE_TOKEN_SETUP.md

2. **Environment Variables**:
   - Use CLOUDFLARE_API_TOKEN instead of CF_API_TOKEN (both will work, but Cloudflare prefers the former)
   ```bash
   $env:CLOUDFLARE_API_TOKEN="your_token_here"
   ```

### 3. GitHub Actions Workflow Failing

**Possible causes:**

- Missing secrets in GitHub repository
- Wrong branch configuration
- Build errors

**Solutions:**

1. **Check GitHub Secrets**:
   - Go to your repository Settings > Secrets > Actions
   - Ensure `CF_API_TOKEN` and `CF_ACCOUNT_ID` are correctly set

2. **Verify Workflow File**:
   - Ensure `.github/workflows/deploy.yml` is targeting the correct branch
   - Check that build and deploy commands are correct

3. **Run a manual workflow**:
   - Go to Actions tab in your repository
   - Select the "Deploy to Cloudflare Workers" workflow
   - Click "Run workflow"

### 4. Mixed Page/Worker Configuration Issues

If your app has both static and dynamic components, ensure:

1. **Correct wrangler.toml setup**:
   - Properly configure the `site` section for static assets
   - Set `main` to point to your backend worker entry point

2. **Verify build output**:
   - Ensure the build creates the expected output directories
   - Check that static assets are in the correct location

## Testing Real-Time Deployment

To test the real-time deployment:

```bash
# Run the real-time deployment watcher
npm run deploy:watch
```

Make a small change to a file and save it. The deployment should happen automatically.

## Getting Support

If you're still having issues:

1. Check the Cloudflare Workers documentation: https://developers.cloudflare.com/workers/
2. Review wrangler logs: `npx wrangler tail`
3. Check for Cloudflare status issues: https://www.cloudflarestatus.com/ 