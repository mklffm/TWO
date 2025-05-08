# Setting up Email for Mira Booking

This guide walks you through setting up email sending for the Mira Booking application.

## Option 1: Gmail SMTP (Recommended for small volumes)

1. **Create or use an existing Gmail account**
   - Sign in to the Gmail account you want to use for sending emails

2. **Set up App Password (required if you have 2-Factor Authentication)**
   - Go to your Google Account: https://myaccount.google.com/
   - Select "Security" from the left menu
   - Under "Signing in to Google," select "2-Step Verification" (turn it on if not already)
   - At the bottom of the page, select "App passwords"
   - Select "Mail" as the app and "Other" as the device (name it "Mira Booking")
   - Click "Generate"
   - Google will display a 16-character password - **copy this password**

3. **Update your .env.local file**
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your.gmail.account@gmail.com
   EMAIL_PASS=your-16-character-app-password
   EMAIL_FROM=your.gmail.account@gmail.com
   AGENCY_EMAIL=mira.booking.visa@gmail.com
   ```

4. **Restart your application**
   - Stop and restart your Next.js server

## Option 2: Mailgun (Better for production/higher volumes)

1. **Sign up for Mailgun**
   - Create an account at https://www.mailgun.com/
   - Verify your domain or use Mailgun's sandbox domain for testing

2. **Get your API key and domain**
   - Go to the Mailgun dashboard
   - Find your API key and domain details

3. **Install the required packages**
   ```bash
   npm install mailgun.js form-data
   ```

4. **Replace the email implementation**
   - Rename `mailgun.ts` to `route.ts` (replacing the current Nodemailer implementation)

5. **Update your .env.local file**
   ```
   MAILGUN_API_KEY=your-mailgun-api-key
   MAILGUN_DOMAIN=your-mailgun-domain
   EMAIL_FROM=support@your-domain.com
   AGENCY_EMAIL=mira.booking.visa@gmail.com
   ```

6. **Restart your application**
   - Stop and restart your Next.js server

## Option 3: Simple Email (Development Only)

If you just want to simulate email sending during development without sending actual emails:

1. **Replace the email implementation**
   - Rename `simpleemail.ts` to `route.ts` (replacing the current implementation)

2. **View sent emails**
   - Go to `/api/send-email` in your browser to view all simulated emails

## Testing Email Setup

1. **Go to the test page**
   - Visit http://localhost:3000/test-email
   - Enter a valid email address and submit the form

2. **Check the console logs**
   - Look at the server console output to verify the email is being processed correctly

3. **Check your inbox**
   - If using a real email provider (Gmail or Mailgun), check your email inbox
   - Check spam folder if needed

## Troubleshooting

- **Gmail SMTP issues**
  - Make sure "Less secure app access" is turned ON (if not using App Passwords)
  - If using App Passwords, ensure you've copied the entire 16-character password
  - Try using port 465 with secure:true instead of port 587

- **Email not being sent**
  - Check server logs for detailed error messages
  - Verify your credentials in .env.local
  - Make sure your network allows outbound SMTP traffic

- **Emails going to spam**
  - Configure SPF and DKIM records for your domain (more important for production)
  - Use a consistent sender address
  - Use a properly formatted HTML email 