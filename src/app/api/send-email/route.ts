/**
 * Simple email implementation that logs to console and saves in memory
 * Great for development and testing without any external dependencies
 */

import { NextResponse } from 'next/server';
import { generateReceiptEmailTemplate } from '../../../lib/emailTemplates';
import { generateAccountConfirmationEmail } from '../../../lib/accountEmail';
import { Resend } from 'resend';

// Create Resend instance
// Resend is much more reliable than direct SMTP and has a generous free tier
// Get an API key at https://resend.com/
const RESEND_API_KEY = 're_fKbXbHZe_ECNfgPmqXnKXvSM9pQhN9zPc'; // Updated to a fresh API key
const resend = new Resend(RESEND_API_KEY);

// Use Resend's default domain - no verification needed
const FROM_EMAIL = 'onboarding@resend.dev'; // This works immediately without verification
const FROM_NAME = 'Mira Booking';
const AGENCY_EMAIL = 'mira.booking.visa@gmail.com';

// Function to send email using Resend
const sendEmail = async (to: string, cc: string, subject: string, data: any) => {
  try {
    // Generate HTML email content based on template type
    let htmlContent;
    if (data.template === 'account-confirmation') {
      htmlContent = generateAccountConfirmationEmail(data);
    } else {
      htmlContent = generateReceiptEmailTemplate(data);
    }
    
    console.log('Attempting to send email to:', to);
    console.log('CC:', cc);
    console.log('Template type:', data.template || 'receipt');
    
    // Implement retry logic for reliability
    let lastError: any = null;
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 1) {
          console.log(`Retrying email send attempt ${attempt}/${maxRetries}...`);
        }
        
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
          lastError = result.error;
          // Continue to next retry attempt
        } else {
          console.log('Email sent successfully with Resend:', result.data?.id);
          return { success: true, messageId: result.data?.id };
        }
      } catch (resendError) {
        console.warn(`Resend API attempt ${attempt} failed:`, resendError);
        lastError = resendError;
        // Continue to next retry attempt
      }
      
      // Wait before retrying (increasing delay)
      if (attempt < maxRetries) {
        const delayMs = 1000 * attempt; // Increasing delay: 1s, 2s, 3s
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    
    // After all retries failed, return an error
    console.error('All Resend API attempts failed');
    throw new Error('Failed to send email after multiple attempts');
  } catch (error) {
    console.error('Email sending error:', error);
    throw error; // Let the caller handle the error
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