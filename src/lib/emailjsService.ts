import emailjs from '@emailjs/browser';

// EmailJS service IDs - using exact ID from dashboard
const SERVICE_ID = 'service_cocz9ba';  // Updated service ID
const TEMPLATE_ID_RECEIPT = 'template_jdr26xg';  // Updated receipt template ID
const TEMPLATE_ID_ACCOUNT = 'template_account_confirmation';  // Will be updated later
const PUBLIC_KEY = 'CPyRF5r0wTwGwC_27';  // Updated public key

// Debug function to safely log data with sensitive information masked
export const debugLog = (message: string, data: any = {}) => {
  // Create a safe copy of the data for logging
  const safeData = { ...data };
  
  // Mask sensitive fields if they exist
  if (safeData.email) safeData.email = safeData.email.substring(0, 3) + '***@***' + safeData.email.split('@')[1];
  if (safeData.to_email) safeData.to_email = safeData.to_email.substring(0, 3) + '***@***' + safeData.to_email.split('@')[1];
  if (safeData.phone) safeData.phone = '***' + safeData.phone.substring(safeData.phone.length - 4);
  
  // Log with timestamp
  console.log(`[EmailJS ${new Date().toISOString()}] ${message}`, safeData);
};

// Initialize EmailJS
export const initEmailJS = () => {
  try {
    debugLog('Initializing EmailJS', {
      publicKey: PUBLIC_KEY.substring(0, 4) + '***',
      serviceId: SERVICE_ID,
      templateId: TEMPLATE_ID_RECEIPT
    });
    
    emailjs.init(PUBLIC_KEY);
    debugLog('EmailJS initialized successfully');
    return true;
  } catch (error) {
    debugLog('EmailJS initialization failed', { error });
    return false;
  }
};

/**
 * Send receipt email to customer using EmailJS
 * @param data Form data and receipt information
 * @returns Promise that resolves when email is sent
 */
export const sendReceiptEmail = async (data: any): Promise<{success: boolean; message?: string}> => {
  try {
    debugLog('Preparing to send receipt email', { 
      name: data.fullName, 
      destination: data.destination,
      serviceId: SERVICE_ID,
      templateId: TEMPLATE_ID_RECEIPT
    });
    
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
    
    debugLog('Email template parameters prepared', {
      to: templateParams.to_email,
      subject: `Visa Application for ${templateParams.destination}`,
      templateId: TEMPLATE_ID_RECEIPT
    });
    
    // Track retries
    let retries = 0;
    const maxRetries = 2;
    
    const sendWithRetry = async (): Promise<{ success: boolean; message?: string }> => {
      try {
        debugLog(`Sending email attempt ${retries + 1}/${maxRetries + 1}`);
        
        // Re-initialize EmailJS before each send attempt to ensure the connection is fresh
        initEmailJS();
        
        // Send email with EmailJS
        const response = await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID_RECEIPT,
          templateParams
        );
        
        debugLog('EmailJS Success', { status: response.status, text: response.text });
        return { 
          success: true, 
          message: `Email sent successfully (Status: ${response.status})`
        };
      } catch (error) {
        debugLog(`Email attempt ${retries + 1} failed`, { error });
        
        if (retries < maxRetries) {
          retries++;
          debugLog(`Retrying email send (${retries}/${maxRetries})...`);
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
          return sendWithRetry();
        }
        throw error;
      }
    };
    
    return await sendWithRetry();
  } catch (error) {
    debugLog('Error sending email', { error });
    let errorMessage = 'Unknown error';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      debugLog('Error details', { stack: error.stack });
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (typeof error === 'object' && error !== null) {
      errorMessage = JSON.stringify(error);
    }
    
    // Store email debug data in localStorage for troubleshooting
    if (typeof window !== 'undefined') {
      const debugData = {
        timestamp: new Date().toISOString(),
        error: errorMessage,
        serviceId: SERVICE_ID,
        templateId: TEMPLATE_ID_RECEIPT
      };
      localStorage.setItem('emailjs_debug', JSON.stringify(debugData));
    }
    
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
    debugLog('Sending account confirmation email', {
      name: `${data.firstName} ${data.lastName}`,
      templateId: TEMPLATE_ID_ACCOUNT
    });
    
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
    
    debugLog('Account email sent successfully', { status: response.status });
    return { 
      success: true, 
      message: `Email sent successfully (Status: ${response.status})` 
    };
  } catch (error) {
    debugLog('Error sending account confirmation email', { error });
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
    debugLog('Sending test email', { to, templateId });
    
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
    
    // Re-initialize EmailJS before sending
    initEmailJS();
    
    // Send email with EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      templateId,
      templateParams
    );
    
    debugLog('Test email sent successfully', { status: response.status, text: response.text });
    return { 
      success: true, 
      message: `Test email sent successfully (Status: ${response.status})` 
    };
  } catch (error) {
    debugLog('Error sending test email', { error });
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 