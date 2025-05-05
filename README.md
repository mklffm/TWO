# Mira Booking

A multilingual booking application for visa services with support for English, French, and Arabic.

## Features

- Multilingual support (English, French, Arabic)
- Fully responsive design
- Visa application form with dynamic requirements
- Email notification system
- Mobile-friendly language selector
- RTL support for Arabic language

## Technology Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- React Hooks

## Deployment Setup

This project uses GitHub Actions for automated deployment to Cloudflare Workers. To set up the deployment pipeline, you need to configure the following GitHub secrets:

### Required Secrets

1. **CF_API_TOKEN**: Your Cloudflare API token with Workers permissions
2. **CF_ACCOUNT_ID**: Your Cloudflare account ID
3. **JWT_SECRET**: A secret key for JWT authentication (optional, a default will be used if not provided)

### Setting Up GitHub Secrets

1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click on "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each of the required secrets:

#### Creating a Cloudflare API Token

1. Log in to your Cloudflare dashboard: https://dash.cloudflare.com/
2. Click on your profile icon in the top right corner, then "My Profile"
3. Select the "API Tokens" tab
4. Click "Create Token"
5. Choose the "Edit Cloudflare Workers" template
6. Set the permissions:
   - Account > Cloudflare Workers > Edit
   - Account > Workers KV Storage > Edit
   - Account > Workers R2 Storage > Edit (if using R2)
   - Account > Workers D1 Database > Edit (if using D1)
7. Set the account resources to include your specific account
8. Create the token and copy it
9. Add it as the `CF_API_TOKEN` secret in GitHub

#### Finding Your Cloudflare Account ID

1. Log in to your Cloudflare dashboard
2. Your account ID is visible in the URL: 
   `https://dash.cloudflare.com/<account-id>/workers`
3. Copy this ID and add it as the `CF_ACCOUNT_ID` secret in GitHub

## Development

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

### Building for Production

```bash
npm run build:cloudflare
```

### Manual Deployment

```bash
# Set environment variables first
$env:CLOUDFLARE_API_TOKEN="your-api-token"
$env:CF_ACCOUNT_ID="your-account-id"

# Then deploy
npm run deploy
```

## Project Structure

- `src/`: Application source code
  - `app/`: Next.js App Router pages
  - `api/`: API routes and backend logic
  - `components/`: React components
  - `middleware/`: Authentication and request middleware
- `backend-worker/`: Cloudflare Worker specific code
- `public/`: Static assets

## License

This project is private and confidential. Unauthorized use or distribution is prohibited. 