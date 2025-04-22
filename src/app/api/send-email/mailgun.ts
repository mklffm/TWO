/**
 * Optional Mailgun implementation for sending emails
 * 
 * To use this implementation:
 * 1. Install Mailgun: npm install mailgun.js form-data
 * 2. Rename this file to route.ts (replacing the Nodemailer implementation)
 * 3. Update the .env.local file with your Mailgun credentials
 */

import { NextResponse } from 'next/server';
import { generateReceiptEmailTemplate } from '@/lib/emailTemplates';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

// Email configuration
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || '';
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || '';
const FROM_EMAIL = process.env.EMAIL_FROM || 'support@mira.dz';
const AGENCY_EMAIL = process.env.AGENCY_EMAIL || 'sitekdigital@gmail.com';

// Initialize Mailgun
const mailgun = new Mailgun(formData);
const mg = MAILGUN_API_KEY ? mailgun.client({ username: 'api', key: MAILGUN_API_KEY }) : null;

// Function to send email using Mailgun
const sendEmail = async (to: string, cc: string, subject: string, data: any) => {
  try {
    // Generate HTML email content
    const htmlContent = generateReceiptEmailTemplate(data);
    
    // Check if Mailgun is configured
    if (!mg || !MAILGUN_DOMAIN) {
      console.log('⚠️ DEVELOPMENT MODE: Email not sent. Mailgun not configured properly.');
      console.log('To:', to);
      console.log('CC:', cc);
      console.log('Subject:', subject);
      console.log('----------------------------------------');
      return { success: true, mode: 'development' };
    }
    
    // Send email
    console.log('Attempting to send email to:', to);
    console.log('CC:', cc);
    
    // Send the email
    const result = await mg.messages.create(MAILGUN_DOMAIN, {
      from: FROM_EMAIL,
      to: [to],
      cc: [cc],
      subject: subject,
      html: htmlContent,
    });
    
    console.log('Email sent:', result.id);
    return { success: true, messageId: result.id };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
};

// API route handler
export async function POST(request: Request) {
  console.log('📧 Email API called');
  
  try {
    const body = await request.json();
    const { to, cc, subject, data } = body;
    
    console.log('📧 Email request received:', { to, cc, subject });
    
    if (!to || !subject || !data) {
      console.error('❌ Missing required fields:', { to, subject, hasData: !!data });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    console.log('📧 Sending email with Mailgun...');
    const result = await sendEmail(to, cc || AGENCY_EMAIL, subject, data);
    
    if (result.success === false) {
      console.error('❌ Email error:', result.error);
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
    
    console.log('✅ Email sent successfully:', result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('❌ Error in email API route:', error);
    return NextResponse.json(
      { error: 'Failed to send email', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 