# Setting up Resend for Reliable Email Delivery

This guide will help you set up Resend, a reliable email delivery service that's much easier than configuring SMTP servers.

## Why Resend?

1. **Reliable Delivery**: Higher deliverability rates than direct SMTP
2. **Easy Setup**: No need for complex SMTP configuration
3. **Free Tier**: 100 emails/day (3,000/month) free
4. **Simple Integration**: Already integrated into Mira Booking

## Step 1: Create a Resend Account

1. Go to https://resend.com
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Log in to your Resend dashboard
2. Click on "API Keys" in the left sidebar
3. Click "Create API Key"
4. Give it a name like "Mira Booking"
5. Click "Create API Key"
6. **Copy your API key** - you'll only see it once!

## Step 3: Update Your Code

1. Open the file `src/app/api/send-email/route.ts`
2. Find this line:
   ```javascript
   const RESEND_API_KEY = 're_123456789'; // Replace with your actual API key from resend.com
   ```
3. Replace `'re_123456789'` with your actual API key (it should start with `re_`)
4. Save the file

## Step 4: Configure Sender Domain (Optional but Recommended)

For better deliverability:

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Follow the instructions to verify your domain
4. After verification, update the FROM_EMAIL in your code:
   ```javascript
   const FROM_EMAIL = 'receipts@yourdomain.com'; // Use your verified domain
   ```

## Step 5: Test Your Setup

1. Go to http://localhost:3000/test-email
2. Enter an email address and click "Send Test Email"
3. Check the recipient's inbox (and spam folder)

## Done!

Now your emails will be reliably delivered to clients with a professional look and great deliverability rates!

If you need more help, visit the Resend documentation: https://resend.com/docs 