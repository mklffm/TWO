# Manual Deployment to Friend's Cloudflare Account

This guide explains how to manually deploy the Mira Booking application to your friend's Cloudflare account (khalfaouimanar28@gmail.com).

## Prerequisites

1. Node.js installed on your computer
2. Cloudflare API Token from your friend's account
3. Cloudflare Account ID from your friend's account

## Deployment Steps

### 1. Get the Required Credentials

Ask your friend for:

- **Cloudflare API Token**: They need to create this with Workers permissions in their account
- **Cloudflare Account ID**: This is visible in their Cloudflare dashboard URL `https://dash.cloudflare.com/<account-id>/workers`

### 2. Run the Deployment Script

Use the provided script to deploy directly to your friend's account:

```bash
node deploy-to-friend.js <API_TOKEN> <ACCOUNT_ID>
```

Replace:
- `<API_TOKEN>` with the API token from your friend's account
- `<ACCOUNT_ID>` with the account ID from your friend's account

For example:
```bash
node deploy-to-friend.js abcdef123456 c3a38c538e41a3c681cf1c38a8fe447f
```

### 3. Verify Deployment

After the deployment completes, ask your friend to check their Cloudflare dashboard to confirm that the application has been updated.

## Troubleshooting

If you encounter any errors:

1. **Authentication Error**: Make sure the API token has the correct permissions (Workers, KV, D1)
2. **Account ID Error**: Double-check that you're using the correct account ID
3. **Build Errors**: Check the console output for build-related issues

## Important Notes

- Do not commit the API token or share it publicly
- The API token is sensitive information - treat it like a password
- This method bypasses your own Cloudflare account settings and uses your friend's account directly 