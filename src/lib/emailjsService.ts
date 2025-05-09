/**
 * Placeholder file for email services
 * Email functionality has been temporarily removed and will be replaced with a different solution
 */

/**
 * Send receipt email to customer
 * @param data Form data and receipt information
 * @returns Promise that resolves when email is sent
 */
export const sendReceiptEmail = async (data: any): Promise<{success: boolean; message?: string}> => {
  console.log('Email functionality removed. Data that would have been sent:', data);
  return { 
    success: true, 
    message: 'Email functionality temporarily disabled'
  };
};

/**
 * Send account confirmation email
 * @param data User registration data
 * @returns Promise that resolves when email is sent
 */
export const sendAccountConfirmationEmail = async (data: any): Promise<{success: boolean; message?: string}> => {
  console.log('Email functionality removed. Data that would have been sent:', data);
  return { 
    success: true, 
    message: 'Email functionality temporarily disabled'
  };
};

/**
 * Send a test email
 * @param to Email address to send to
 * @param templateId Template ID (deprecated)
 * @param data Data to include in the email
 * @returns Promise that resolves when email is sent
 */
export const sendTestEmail = async (
  to: string,
  templateId: string = '',
  data: any
): Promise<{success: boolean; message?: string}> => {
  console.log('Email functionality removed. Would have sent to:', to, data);
  return {
    success: true,
    message: 'Email functionality temporarily disabled'
  };
};

/**
 * Initialize email service
 * @deprecated No longer needed
 */
export const initEmailJS = () => {
  console.log('Email service initialization bypassed');
}; 