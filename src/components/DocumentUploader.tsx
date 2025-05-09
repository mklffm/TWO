import React, { useState } from 'react';
import { uploadDocument } from '@/lib/uploadDocument';

interface DocumentUploaderProps {
  clientName: string;
  clientEmail: string;
  visaType: string;
  receiptNumber?: string;
  nationality?: string;
  destination?: string;
  travelDate?: string;
  processingTime?: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  clientName,
  visaType,
  receiptNumber = 'VISA-000',
  nationality = 'Not specified',
  destination = 'Not specified',
  travelDate = 'Not specified',
  processingTime = 'Standard',
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{success: boolean; message: string} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadResult({
        success: false,
        message: 'Please select a file to upload.'
      });
      return;
    }

    setUploading(true);
    setUploadResult(null);

    try {
      const result = await uploadDocument(file, {
        fullName: clientName,
        visaType,
        receiptNumber,
        nationality,
        destination,
        travelDate,
        processingTime
      });

      setUploadResult(result);
    } catch (error) {
      setUploadResult({
        success: false,
        message: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-lg p-6 border border-gray-300">
        <div className="text-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Upload Your Documents
          </h3>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select document to upload
          </label>
          
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, JPG, PNG up to 10MB
              </p>
            </div>
          </div>
        </div>

        {file && (
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{file.name} ({Math.round(file.size / 1024)} KB)</span>
          </div>
        )}
        
        {uploadResult && (
          <div className={`mt-4 p-3 rounded-md ${uploadResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {uploadResult.message}
          </div>
        )}

        <div className="mt-6">
          <button
            type="button"
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : 'Upload Document'}
          </button>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-2">Application Details:</h4>
          <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Full Name: <span className="font-medium">{clientName}</span></li>
            <li>Visa Type: <span className="font-medium">{visaType}</span></li>
            <li>Reference: <span className="font-medium">{receiptNumber}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader; 