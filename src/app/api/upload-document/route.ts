import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration for Gmail
const FROM_EMAIL = 'sitekdigital@gmail.com'; // Your email address
const FROM_NAME = 'Mira Booking';
const AGENCY_EMAIL = 'sitekdigital@gmail.com';

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: FROM_EMAIL,
    // Use an App Password, not your regular password
    // See: https://support.google.com/accounts/answer/185833
    pass: process.env.EMAIL_PASSWORD || '', // create an app password for Gmail
  },
});

// Define attachment type
type Attachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export async function POST(request: Request) {
  console.log('📄 Document upload API called');
  
  try {
    // Get the form data
    const formData = await request.formData();
    
    // Extract fields
    const clientName = formData.get('clientName') as string || 'Client';
    const clientEmail = formData.get('clientEmail') as string || 'N/A';
    const visaType = formData.get('visaType') as string || 'N/A';
    const receiptNumber = formData.get('receiptNumber') as string || 'N/A';
    const nationality = formData.get('nationality') as string || 'N/A';
    const destination = formData.get('destination') as string || 'N/A';
    const travelDate = formData.get('travelDate') as string || 'N/A';
    const processingTime = formData.get('processingTime') as string || 'N/A';
    
    // Get the file
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file found in the upload' },
        { status: 400 }
      );
    }
    
    console.log('📄 Form data received:');
    console.log('Fields:', { clientName, clientEmail, visaType, receiptNumber });
    console.log('File:', file.name, 'size:', file.size, 'type:', file.type);
    
    // Convert file to buffer
    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);
    
    // Prepare email attachments
    const attachments: Attachment[] = [{
      filename: file.name || 'document.pdf',
      content: fileBuffer,
      contentType: file.type || 'application/octet-stream',
    }];
    
    // Format email subject and content
    const subject = `New Document Upload: ${clientName} (${visaType}) - ${receiptNumber}`;
    const htmlContent = `
      <h1>New Document Upload</h1>
      <p>A client has uploaded documents for visa processing.</p>
      <h2>Client Information:</h2>
      <ul>
        <li><strong>Name:</strong> ${clientName}</li>
        <li><strong>Email:</strong> ${clientEmail}</li>
        <li><strong>Receipt Number:</strong> ${receiptNumber}</li>
        <li><strong>Visa Type:</strong> ${visaType}</li>
        <li><strong>Nationality:</strong> ${nationality}</li>
        <li><strong>Destination:</strong> ${destination}</li>
        <li><strong>Travel Date:</strong> ${travelDate}</li>
        <li><strong>Processing Time:</strong> ${processingTime}</li>
      </ul>
      <h2>Attachments:</h2>
      <p>${attachments.length} document(s) attached to this email.</p>
    `;
    
    // Send email using Nodemailer
    const mailOptions = {
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: AGENCY_EMAIL,
      subject,
      html: htmlContent,
      attachments,
      replyTo: clientEmail || FROM_EMAIL,
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email with document sent successfully:', result.messageId);
    return NextResponse.json({ 
      success: true, 
      message: 'Document uploaded and sent via email',
      emailId: result.messageId 
    });
  } catch (error) {
    console.error('❌ Error in document upload API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process document upload', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 