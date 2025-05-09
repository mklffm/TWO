import emailjs from '@emailjs/browser';

// Updated EmailJS configuration
const SERVICE_ID = 'service_b4815mv';  // Service ID
const TEMPLATE_ID = 'template_ercos5w';  // Template ID
const PUBLIC_KEY = 'CPyRF5r0wTwGwC_27';  // Public key

// Define base template parameters type
type EmailTemplateParams = Record<string, unknown> & {
  // Sender information
  from_name: string;
  from_email: string;
  reply_to: string;
  to_email: string;
  
  // Application details
  full_name: string;
  email: string;
  phone: string;
  nationality: string;
  destination: string;
  travel_date: string;
  visa_type: string;
  processing_time: string;
  reference_number: string;
  
  // Optional fields
  usa_city?: string;
  canada_city?: string;
  
  // B2B specific fields
  company_name?: string;
  agency_id?: string;
  client_number?: string;
};

/**
 * Initialize EmailJS with public key
 * Should be called on component mount in client side only
 */
export const initEmailJS = (): void => {
  try {
    emailjs.init({
      publicKey: PUBLIC_KEY,
      blockHeadless: false, // Allow sending in development environments
      limitRate: {
        // Optional rate limiting
        id: 'app', 
        throttle: 10000,
      }
    });
    console.log('EmailJS initialized with service:', SERVICE_ID);
  } catch (error) {
    console.error('Error initializing EmailJS:', error);
  }
};

/**
 * Send visa application email using EmailJS
 * @param formData The form data to send
 * @returns Promise with the response from EmailJS
 */
export const sendVisaApplicationEmail = async (formData: any): Promise<any> => {
  try {
    // Create a template parameters object
    const templateParams: EmailTemplateParams = {
      // Sender information
      from_name: 'Mira Booking',
      from_email: 'mira.booking.visa@gmail.com',
      reply_to: 'mira.booking.visa@gmail.com',
      to_email: formData.email,
      
      // Application details
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      nationality: formData.nationality,
      destination: formData.destination,
      travel_date: formData.travelDate,
      visa_type: formData.visaType,
      processing_time: formData.processingTime,
      reference_number: formData.referenceNumber || `VISA-${Date.now()}`
    };
    
    // Add optional fields
    if (formData.usaCity) {
      templateParams.usa_city = formData.usaCity;
    }
    
    if (formData.canadaCity) {
      templateParams.canada_city = formData.canadaCity;
    }

    console.log('Sending email with params:', JSON.stringify(templateParams));
    
    // Send the email
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

/**
 * Send bulk visa application email for business clients
 * @param formData The form data for bulk applications
 * @returns Promise with the response from EmailJS
 */
export const sendBulkVisaApplicationEmail = async (formData: any): Promise<any> => {
  try {
    // Create a template parameters object
    const templateParams: EmailTemplateParams = {
      // Sender information
      from_name: 'Mira Booking',
      from_email: 'mira.booking.visa@gmail.com',
      reply_to: 'mira.booking.visa@gmail.com',
      to_email: formData.email,
      
      // Required fields that must be present in all templates
      full_name: formData.fullName || formData.agencyName,
      email: formData.email,
      phone: formData.phone,
      nationality: formData.nationality || 'N/A',
      destination: formData.destination,
      travel_date: formData.travelDate || new Date().toISOString().split('T')[0],
      visa_type: formData.visaType || 'business',
      processing_time: formData.processingTime || 'standard',
      reference_number: `BULK-${Date.now()}`,
      
      // B2B specific fields
      company_name: formData.agencyName,
      agency_id: formData.agencyId || 'New Agency',
      client_number: formData.clientNumber
    };
    
    console.log('Sending bulk email with params:', JSON.stringify(templateParams));
    
    // Send the email
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );
    
    console.log('Bulk email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending bulk email:', error);
    return { success: false, error };
  }
}; 