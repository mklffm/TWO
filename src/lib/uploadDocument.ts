/**
 * Utility function to upload documents
 */

import { API_BASE_URL } from '@/config/api';

// Client information needed for document uploads
export interface ClientInfo {
  fullName: string;
  nationality: string;
  destination: string;
  travelDate: string;
  visaType: string;
  processingTime: string;
  receiptNumber: string;
}

// Response from the upload API
interface UploadResponse {
  success: boolean;
  message: string;
  documentInfo?: {
    name: string;
    size: number;
    type: string;
  };
}

/**
 * Upload documents to the server
 */
export const uploadDocument = async (
  file: File,
  clientInfo: ClientInfo
): Promise<UploadResponse> => {
  try {
    console.log('Uploading document:', file.name);
    
    const formData = new FormData();
    
    // Add file to form data
    formData.append('file', file);
    
    // Add client info
    formData.append('clientName', clientInfo.fullName);
    formData.append('visaType', clientInfo.visaType);
    formData.append('receiptNumber', clientInfo.receiptNumber);
    formData.append('nationality', clientInfo.nationality);
    formData.append('destination', clientInfo.destination);
    formData.append('travelDate', clientInfo.travelDate);
    formData.append('processingTime', clientInfo.processingTime);
    
    // Upload to our API endpoint
    const response = await fetch(`${API_BASE_URL}/api/upload-document`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload document');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading document:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}; 