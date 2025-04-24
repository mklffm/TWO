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

// Mock implementation for static export
export async function sendEmailWithMailgun(data: any): Promise<{ success: boolean, message: string }> {
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