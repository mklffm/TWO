/**
 * Simple email implementation that logs to console and saves to localStorage
 * Great for development and testing without any external dependencies
 * 
 * To use this implementation:
 * 1. Rename this file to route.ts (replacing the Nodemailer implementation)
 */

import { NextResponse } from 'next/server';
import { generateReceiptEmailTemplate } from '@/lib/emailTemplates';

// Email configuration
const FROM_EMAIL = process.env.EMAIL_FROM || 'mira.booking.dz@gmail.com';
const AGENCY_EMAIL = process.env.AGENCY_EMAIL || 'mira.booking.dz@gmail.com';

// In memory email storage (will be lost after server restart)
const emailStorage: any[] = [];

// Function to "send" email by logging it to the console and storing in memory
const sendEmail = async (to: string, cc: string, subject: string, data: any) => {
  try {
    // Generate HTML email content
    const htmlContent = generateReceiptEmailTemplate(data);
    
    // Create email message
    const message = {
      from: FROM_EMAIL,
      to,
      cc,
      subject,
      html: htmlContent,
      timestamp: new Date().toISOString(),
    };
    
    // Store for reference
    emailStorage.push(message);
    
    // Log the email details
    console.log('📧 Email would be sent:');
    console.log('From:', message.from);
    console.log('To:', message.to);
    console.log('CC:', message.cc);
    console.log('Subject:', message.subject);
    console.log('Time:', message.timestamp);
    console.log('----------------------------------------');
    
    // Generate a fake message ID
    const messageId = `fake-email-${Date.now()}@mira.dz`;
    
    return { 
      success: true, 
      messageId, 
      mode: 'development',
      emailCount: emailStorage.length
    };
  } catch (error) {
    console.error('Email simulation error:', error);
    return { success: false, error };
  }
};

// API route handler
export async function POST(request: Request) {
  console.log('📧 Simple Email API called');
  
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
    
    console.log('📧 Processing simulated email...');
    const result = await sendEmail(to, cc || AGENCY_EMAIL, subject, data);
    
    console.log('✅ Email simulation successful:', result);
    return NextResponse.json({ 
      success: true, 
      result,
      message: "This is a simulated email for development. In production, replace with a real email service."
    });
  } catch (error) {
    console.error('❌ Error in simple email API route:', error);
    return NextResponse.json(
      { error: 'Failed to process email', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Extra API endpoint for viewing sent emails (helpful for testing)
export async function GET() {
  return NextResponse.json({ 
    count: emailStorage.length,
    emails: emailStorage
  });
} 