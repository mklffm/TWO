/**
 * Utility function to upload documents and send them as email attachments
 * 
 * This function handles:
 * 1. Creating a FormData object with the files and client information
 * 2. Sending the data to the API endpoint
 * 3. Handling success/error responses
 */

/**
 * Client information interface
 */
interface ClientInfo {
  name: string;
  email: string;
  visaType: string;
}

/**
 * Upload response interface
 */
interface UploadResponse {
  success: boolean;
  message: string;
  emailId?: string;
  error?: any;
}

/**
 * Upload documents and send them via email to the agency
 * @param files - The file(s) to upload (can be single file or array of files)
 * @param clientInfo - Client information
 * @returns Response with success/error information
 */
export async function uploadDocumentToAgency(
  files: File | File[],
  clientInfo: ClientInfo
): Promise<UploadResponse> {
  try {
    // Validate inputs
    if (!files || (Array.isArray(files) && files.length === 0)) {
      throw new Error('No files provided for upload');
    }
    
    // Create FormData
    const formData = new FormData();
    
    // Add client information
    formData.append('clientName', clientInfo.name || 'Unknown');
    formData.append('clientEmail', clientInfo.email || '');
    formData.append('visaType', clientInfo.visaType || 'Not specified');
    
    // Add file(s)
    if (Array.isArray(files)) {
      // Multiple files
      files.forEach((file, index) => {
        formData.append(`file${index}`, file, file.name);
      });
    } else {
      // Single file
      formData.append('file', files, files.name);
    }
    
    // Show upload in progress in console
    console.log('📤 Uploading document(s)...');
    
    // Send to API
    const response = await fetch('/api/upload-document', {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - browser will set it with boundary
    });
    
    // Parse response
    const result = await response.json();
    
    // Check for errors
    if (!response.ok) {
      console.error('Upload failed:', result);
      throw new Error(result.message || 'Document upload failed');
    }
    
    console.log('✅ Document uploaded successfully');
    return {
      success: true,
      message: 'Document uploaded and sent to agency',
      ...result
    };
  } catch (error: any) {
    console.error('Error uploading document:', error);
    return {
      success: false,
      message: error.message || 'Failed to upload document',
      error
    };
  }
} 