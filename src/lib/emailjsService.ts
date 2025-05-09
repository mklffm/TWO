import emailjs from '@emailjs/browser';

// EmailJS configuration constants
const SERVICE_ID = 'service_b4815mv';  // Correct service ID
const TEMPLATE_ID_VISA_APPLICATION = 'template_ercos5w';  // Correct template ID
const PUBLIC_KEY = 'CPyRF5r0wTwGwC_27';  // Correct public key

/**
 * Initialize EmailJS with public key
 * Should be called on component mount in client side only
 */
export const initEmailJS = (): void => {
  emailjs.init({
    publicKey: PUBLIC_KEY,
  });
  console.log('EmailJS initialized with correct service ID and template');
};

/**
 * Send visa application email using EmailJS
 * @param formData The form data to send
 * @returns Promise with the response from EmailJS
 */
export const sendVisaApplicationEmail = async (formData: any): Promise<any> => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_VISA_APPLICATION,
      {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        destination: formData.destination,
        travel_date: formData.travelDate,
        visa_type: formData.visaType,
        processing_time: formData.processingTime,
        ...(formData.usaCity && { usa_city: formData.usaCity }),
        ...(formData.canadaCity && { canada_city: formData.canadaCity }),
        reference_number: formData.referenceNumber || `VISA-${Date.now()}`
      }
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
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID_VISA_APPLICATION,
      {
        company_name: formData.agencyName,
        email: formData.email,
        phone: formData.phone,
        agency_id: formData.agencyId || 'New Agency',
        destination: formData.destination,
        client_number: formData.clientNumber,
        reference_number: `BULK-${Date.now()}`
      }
    );
    
    console.log('Bulk email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending bulk email:', error);
    return { success: false, error };
  }
}; 