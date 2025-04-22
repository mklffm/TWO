/**
 * Simple email implementation that logs to console and saves in memory
 * Great for development and testing without any external dependencies
 */

import { NextResponse } from 'next/server';
import { generateReceiptEmailTemplate } from '@/lib/emailTemplates';
import { Resend } from 'resend';

// Create Resend instance
// Resend is much more reliable than direct SMTP and has a generous free tier
// Get an API key at https://resend.com/
const RESEND_API_KEY = 're_Qpq7qK6d_MnJCkjuvSADa64owMAUNYYW8'; // Working API key
const resend = new Resend(RESEND_API_KEY);

// Use Resend's default domain - no verification needed
const FROM_EMAIL = 'onboarding@resend.dev'; // This works immediately without verification
const FROM_NAME = 'Mira Booking';
const AGENCY_EMAIL = 'sitekdigital@gmail.com';

// Function to send email using Resend
const sendEmail = async (to: string, cc: string, subject: string, data: any) => {
  try {
    // Generate HTML email content
    const htmlContent = generateReceiptEmailTemplate(data);
    
    console.log('Attempting to send email to:', to);
    console.log('CC:', cc);
    
    // Send the email
    const result = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [to],
      cc: [cc],
      subject: subject,
      html: htmlContent,
      replyTo: AGENCY_EMAIL,
    });
    
    if (result.error) {
      console.error('Email sending error:', result.error);
      return { success: false, error: result.error };
    }
    
    console.log('Email sent successfully:', result.data?.id);
    return { success: true, messageId: result.data?.id };
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
    
    console.log('📧 Sending email with Resend...');
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