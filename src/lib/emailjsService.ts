import emailjs from '@emailjs/browser';

// EmailJS service IDs - using new account with mira.booking.visa@gmail.com
const SERVICE_ID = 'service_b4815mv';  // Updated to the correct service ID connected to mira.booking.visa@gmail.com
const TEMPLATE_ID_RECEIPT = 'template_7uftslu';  // New receipt template ID
const TEMPLATE_ID_ACCOUNT = 'template_7uftslu';  // Using the same template for now (can be updated later)
const PUBLIC_KEY = 'CPyRF5r0wTwGwC_27';  // New public key

// Initialize EmailJS
export const initEmailJS = () => {
  console.log('Initializing EmailJS with public key:', PUBLIC_KEY);
  emailjs.init(PUBLIC_KEY);
};

/**
 * Send receipt email to customer using EmailJS
 * @param data Form data and receipt information
 * @returns Promise that resolves when email is sent
 */
export const sendReceiptEmail = async (data: any): Promise<{success: boolean; message?: string}> => {
  try {
    console.log('Preparing to send receipt email for:', data.fullName);
    console.log('Using SERVICE_ID:', SERVICE_ID);
    console.log('Using TEMPLATE_ID_RECEIPT:', TEMPLATE_ID_RECEIPT);
    
    // Add timestamp if not present
    const emailData = {
      ...data,
      timestamp: data.timestamp || new Date().toISOString(),
    };
    
    // Create a properly formatted template object for EmailJS
    const templateParams = {
      to_name: data.fullName || 'Valued Customer',
      to_email: data.email,
      from_name: 'Mira Booking',
      destination: data.destination,
      visa_type: data.visaType,
      processing_time: data.processingTime,
      price: data.price,
      formatted_price: data.formattedPrice || `${data.price} ${data.currency || 'DZD'}`,
      travel_date: data.travelDate,
      cc_email: 'mira.booking.visa@gmail.com',
      reply_to: 'mira.booking.visa@gmail.com',
      date: new Date().toLocaleDateString(),
      ...emailData
    };
    
    console.log('Email template parameters:', JSON.stringify(templateParams, null, 2));
    
    // Track retries
    let retries = 0;
    const maxRetries = 2;
    
    const sendWithRetry = async (): Promise<{ success: boolean; message?: string }> => {
      try {
        console.log(`Sending email attempt ${retries + 1}/${maxRetries + 1}`);
        
        // Send email with EmailJS - add debug info
        console.log('Full EmailJS parameters:', {
          serviceId: SERVICE_ID,
          templateId: TEMPLATE_ID_RECEIPT,
          publicKey: PUBLIC_KEY.substring(0, 4) + '...'
        });
        
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
    let errorMessage = 'Unknown error';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error details:', error.stack);
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (typeof error === 'object' && error !== null) {
      errorMessage = JSON.stringify(error);
    }
    
    // Log error to console in a format that's easy to read
    console.error('EMAILJS ERROR DETAILS:');
    console.error('- Message:', errorMessage);
    console.error('- Type:', typeof error);
    
    return {
      success: false,
      message: errorMessage
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
      from_name: 'Mira Booking',
      cc_email: 'mira.booking.visa@gmail.com',
      reply_to: 'mira.booking.visa@gmail.com',
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
      from_name: 'Mira Booking',
      cc_email: 'mira.booking.visa@gmail.com',
      reply_to: 'mira.booking.visa@gmail.com',
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