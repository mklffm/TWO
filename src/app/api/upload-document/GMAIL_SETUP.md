# Setting up Gmail for Document Uploads

This guide will show you how to configure your Gmail account to send document uploads as email attachments.

## Why You Need an App Password

Google requires a special "App Password" instead of your regular Gmail password for non-Google apps to connect to your account. This is more secure than using your main password.

## Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Scroll down to "How you sign in to Google"
4. Click on "2-Step Verification"
5. Follow the steps to turn on 2-Step Verification (if not already enabled)

## Step 2: Create an App Password

1. Go back to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Scroll down to "How you sign in to Google" 
4. Click on "2-Step Verification"
5. Scroll to the bottom and click on "App passwords"
6. Select "Mail" from the "Select app" dropdown
7. Select "Other (Custom name)" from the "Select device" dropdown
8. Enter "Mira Booking" as the name
9. Click "Generate"
10. Google will display a 16-character password - **COPY THIS PASSWORD**
11. Click "Done"

## Step 3: Update Your Environment Variables

1. Open the `.env.local` file in the root of your project
2. Look for the line: `EMAIL_PASSWORD=your_app_password_here`
3. Replace `your_app_password_here` with the 16-character App Password you copied
4. Save the file

The complete line should look like: `EMAIL_PASSWORD=abcd efgh ijkl mnop` (but with your actual password)

## Step 4: Restart Your Server

1. Stop your application (press Ctrl+C in the terminal)
2. Start it again with: `npm run dev`

## Troubleshooting

- **Error: "Invalid login"**: Make sure you're using the App Password, not your regular Gmail password
- **Error: "Less secure app access required"**: You don't need this setting when using App Passwords 
- **Error: "Username and Password not accepted"**: Double-check that you've entered the correct email and App Password 