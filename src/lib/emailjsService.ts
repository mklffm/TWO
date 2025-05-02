import emailjs from '@emailjs/browser';

// EmailJS service IDs
const SERVICE_ID = 'service_mira_booking';  // Replace with your actual EmailJS service ID
const TEMPLATE_ID_RECEIPT = 'template_receipt';  // Replace with your actual template ID for receipts
const TEMPLATE_ID_ACCOUNT = 'template_account_confirmation';  // Replace with your actual template ID for account confirmations
const PUBLIC_KEY = 'rPcGG-LPTqO6DvaTg';  // Replace with your actual EmailJS public key

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(PUBLIC_KEY);
};

/**
 * Send receipt email to customer using EmailJS
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
      cc_agency: 'khalfaouimanar28@gmail.com',  // Agency email always gets a copy
    };
    
    // Create a properly formatted template object for EmailJS
    const templateParams = {
      to_name: data.fullName || 'Valued Customer',
      to_email: data.email,
      destination: data.destination,
      visa_type: data.visaType,
      processing_time: data.processingTime,
      price: data.price,
      formatted_price: data.formattedPrice || `${data.price} ${data.currency || 'USD'}`,
      travel_date: data.travelDate,
      agency_email: 'khalfaouimanar28@gmail.com',
      cc_email: 'khalfaouimanar28@gmail.com',
      reply_to: 'khalfaouimanar28@gmail.com',
      date: new Date().toLocaleDateString(),
      ...emailData
    };
    
    // Track retries
    let retries = 0;
    const maxRetries = 2;
    
    const sendWithRetry = async (): Promise<{ success: boolean; message?: string }> => {
      try {
        // Send email with EmailJS
        const response = await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID_RECEIPT,
          templateParams
        );
        
        console.log('EmailJS Success:', response.status, response.text);
        return { 
          success: true, 
          message: `Email sent successfully (Status: ${response.status})`
        };
      } catch (error) {
        console.error(`Email attempt ${retries + 1} failed:`, error);
        if (retries < maxRetries) {
          retries++;
          console.log(`Retrying email send (${retries}/${maxRetries})...`);
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
          return sendWithRetry();
        }
        throw error;
      }
    };
    
    return await sendWithRetry();
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Send account confirmation email using EmailJS
 * @param data User registration data
 * @returns Promise that resolves when email is sent
 */
export const sendAccountConfirmationEmail = async (data: any): Promise<{success: boolean; message?: string}> => {
  try {
    console.log('Sending account confirmation email for:', data.firstName, data.lastName);
    
    // Create a properly formatted template object for EmailJS
    const templateParams = {
      to_name: `${data.firstName} ${data.lastName}`,
      to_email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      agency_email: 'khalfaouimanar28@gmail.com',
      cc_email: 'khalfaouimanar28@gmail.com',
      reply_to: 'khalfaouimanar28@gmail.com',
      date: new Date().toLocaleDateString(),
      user_email: data.email,
      ...data
    };
    
    // Send email with EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_ACCOUNT,
      templateParams
    );
    
    console.log('EmailJS Success:', response.status, response.text);
    return { 
      success: true, 
      message: `Email sent successfully (Status: ${response.status})` 
    };
  } catch (error) {
    console.error('Error sending account confirmation email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Send a generic test email using EmailJS
 * @param to Email address to send to
 * @param templateId EmailJS template ID to use
 * @param data Data to include in the email
 * @returns Promise that resolves when email is sent
 */
export const sendTestEmail = async (
  to: string, 
  templateId: string = TEMPLATE_ID_RECEIPT,
  data: any
): Promise<{success: boolean; message?: string}> => {
  try {
    console.log('Sending test email to:', to);
    
    // Create template parameters
    const templateParams = {
      to_name: data.fullName || 'Test User',
      to_email: to,
      agency_email: 'khalfaouimanar28@gmail.com',
      cc_email: 'khalfaouimanar28@gmail.com',
      reply_to: 'khalfaouimanar28@gmail.com',
      date: new Date().toLocaleDateString(),
      ...data
    };
    
    // Send email with EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      templateId,
      templateParams
    );
    
    console.log('EmailJS Test Success:', response.status, response.text);
    return { 
      success: true, 
      message: `Test email sent successfully (Status: ${response.status})` 
    };
  } catch (error) {
    console.error('Error sending test email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 