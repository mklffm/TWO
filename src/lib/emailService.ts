// Email service for sending receipts and notifications

/**
 * Send receipt email to customer and agency
 * @param data Form data and receipt information
 * @returns Promise that resolves when email is sent
 */
export const sendReceiptEmail = async (data: any): Promise<{success: boolean; message?: string}> => {
  try {
    console.log('Sending receipt email for:', data.fullName);
    
    // Add timestamp if not present
    const emailData = {
      ...data,
      timestamp: data.timestamp || new Date().toISOString(),
    };
    
    // Call the email API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: data.email,
        cc: 'sitekdigital@gmail.com', // Agency email
        subject: `Visa Application Receipt for ${data.fullName}`,
        data: emailData,
      }),
    });

    // Parse the response
    const result = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', result);
      return {
        success: false,
        message: result.error || 'Failed to send email'
      };
    }

    console.log('Email sent successfully!');
    return {
      success: true,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 