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
import { generateAccountConfirmationEmail } from '@/lib/accountEmail';

// Mock implementation for static export - now as mockSendEmailWithMailgun to avoid naming conflicts
export async function mockSendEmailWithMailgun(data: any): Promise<{ success: boolean, message: string }> {
  console.log('Mock sendEmailWithMailgun called with:', data);
  
  // Just return success for static builds
  return {
    success: true,
    message: 'Email would be sent in production environment'
  };
}

export async function POST(request: Request) {
  try {
    // Mock implementation for static export
    const data = await request.json();
    console.log('Mock email API called with:', data);
    
    // Generate email content but don't actually send it
    generateReceiptEmailTemplate(data);
    
    return NextResponse.json({
      success: true, 
      message: 'Email would be sent in production environment'
    });
  } catch (error) {
    console.error('Error in mock email API:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error in mock email processing',
      error: String(error)
    }, { status: 500 });
  }
}

/**
 * Email service implementation with Mailgun
 * Used for production environments
 */
export const sendEmailWithMailgun = async (to: string, cc: string | null, subject: string, data: any) => {
  try {
    // MAILGUN is not integrated in this demo, so just log the email
    console.log('Mail would be sent to:', to);
    console.log('CC:', cc);
    console.log('Subject:', subject);
    console.log('Data:', data);
    
    // Mock implementation for static export
    // In production, this would call the Mailgun API
    console.log('Mock sendEmailWithMailgun called with:', data);
    
    // Return success
    return { success: true, messageId: `mock-${Date.now()}` };
  } catch (error) {
    console.error('Error sending email with Mailgun:', error);
    return { success: false, error };
  }
};

/**
 * Mock implementation that simulates successful email sending
 * This acts as a fallback when the real email API is unavailable
 */
export const sendMockEmail = async (to: string, cc: string | null, subject: string, data: any) => {
  try {
    // Choose the correct template based on data type
    let htmlContent = '';
    if (data.template === 'account-confirmation') {
      htmlContent = generateAccountConfirmationEmail(data);
      console.log('Generated account confirmation email template');
    } else {
      htmlContent = generateReceiptEmailTemplate(data);
      console.log('Generated receipt email template');
    }
    
    // Mock implementation for static export
    console.log('Mock email API called with:', {
      to,
      cc,
      subject,
      dataType: data.template || 'receipt'
    });
    
    // Log a snippet of the HTML to verify content
    console.log('Email HTML preview:', htmlContent.substring(0, 100) + '...');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return success
    return { 
      success: true, 
      messageId: `mock-${Date.now()}`,
      message: 'Email sent successfully (mock)'
    };
  } catch (error) {
    console.error('Error in mock email API:', error);
    return { 
      success: false, 
      error: {
        message: 'Error in mock email processing',
        originalError: error
      }
    };
  }
}; 