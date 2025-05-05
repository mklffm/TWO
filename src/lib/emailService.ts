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
    
    // Call the email API with retry mechanism
    let retries = 0;
    const maxRetries = 2;
    
    while (retries <= maxRetries) {
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: data.email,
            cc: 'mira.booking.dz@gmail.com', // Agency email updated
            subject: `Visa Application Receipt for ${data.fullName}`,
            data: emailData,
          }),
        });
  
        // Parse the response
        const result = await response.json();
        
        if (!response.ok) {
          console.error('API Error:', result);
          throw new Error(result.error || 'Failed to send email');
        }
  
        console.log('Email sent successfully!');
        return {
          success: true,
          message: 'Email sent successfully'
        };
      } catch (fetchError) {
        retries++;
        if (retries > maxRetries) {
          throw fetchError;
        }
        console.warn(`Email sending attempt ${retries}/${maxRetries} failed. Retrying...`);
        // Wait before retrying
        await new Promise(r => setTimeout(r, 1000));
      }
    }
    
    // This should never be reached due to the throw in the catch block above
    throw new Error('Failed to send email after retries');
    
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 