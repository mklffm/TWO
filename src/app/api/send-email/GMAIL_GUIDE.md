# Setting up Gmail to Send Emails from mira.booking.dz@gmail.com

This guide will walk you through the exact steps needed to configure your Gmail account to send emails through the Mira Booking application.

## Step 1: Enable 2-Step Verification for your Gmail account

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Scroll down to "How you sign in to Google"
4. Click on "2-Step Verification"
5. Follow the steps to turn on 2-Step Verification

## Step 2: Create an App Password

1. Go back to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Scroll down to "How you sign in to Google" 
4. Click on "2-Step Verification"
5. Scroll to the bottom and click on "App passwords"
6. In the "Select app" dropdown, choose "Mail"
7. In the "Select device" dropdown, choose "Other (Custom name)"
8. Enter "Mira Booking" as the name
9. Click "Generate"
10. **You will see a 16-character password - COPY THIS PASSWORD**
11. Click "Done"

## Step 3: Update the Email Configuration

1. Open the file `src/app/api/send-email/route.ts`
2. Locate this section near the top:

```javascript
// Email configuration
const EMAIL_HOST = 'smtp.gmail.com';
const EMAIL_PORT = 587;
const EMAIL_USER = 'mira.booking.dz@gmail.com'; // Agency email
const EMAIL_PASS = ''; // You'll need to add an app password here
const FROM_EMAIL = 'mira.booking.dz@gmail.com';
const AGENCY_EMAIL = 'mira.booking.dz@gmail.com';
```

3. Replace the empty string for `EMAIL_PASS` with your generated App Password:

```javascript
const EMAIL_PASS = 'your16characterpassword'; // Replace with your actual app password
```

4. Save the file

## Step 4: Restart the Server

1. Stop your application server (press Ctrl+C in the terminal)
2. Start it again: `npm run dev`

## Step 5: Test Sending an Email

1. Go to http://localhost:3000/test-email
2. Enter an email address and click "Send Test Email"
3. Check the server console for logs to confirm the email was sent
4. Check the recipient's inbox for the email (also check spam folder)

## Troubleshooting

If emails are not being sent, check the following:

1. **Wrong App Password**: Make sure you copied the full 16-character App Password exactly as shown
2. **Network Issues**: Make sure your server can make outgoing connections on port 587
3. **Gmail Limits**: Gmail has sending limits (up to 500 emails per day)
4. **Check Console**: Look at the server console for specific error messages

## Additional Security Notes

- Keep your App Password secure; anyone with this password can send emails from your account
- If needed, you can revoke the App Password at any time from your Google Account
- Consider using a dedicated email service for production environments 