import React, { useState } from 'react';
import DocumentUploader from './DocumentUploader';

// Example component showing how to use the DocumentUploader
const DocumentUploaderExample: React.FC = () => {
  const [visaType, setVisaType] = useState('Tourist Visa');
  const [clientName, setClientName] = useState('');
  const [nationality, setNationality] = useState('');
  const [destination, setDestination] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('VISA-' + Math.floor(Math.random() * 1000000));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Document Upload</h1>
      
      {/* Form for client information */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Client Information</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your nationality"
              required
            />
          </div>
          
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your destination country"
              required
            />
          </div>
          
          <div>
            <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 mb-1">
              Visa Type
            </label>
            <select
              id="visaType"
              value={visaType}
              onChange={(e) => setVisaType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Tourist Visa">Tourist Visa</option>
              <option value="Business Visa">Business Visa</option>
              <option value="Student Visa">Student Visa</option>
              <option value="Work Visa">Work Visa</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="receiptNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Reference Number
            </label>
            <input
              type="text"
              id="receiptNumber"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Receipt number"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Automatically generated reference number</p>
          </div>
        </div>
      </div>
      
      {/* Document upload component */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Passport Documents</h2>
        
        <DocumentUploader
          clientName={clientName}
          clientEmail="" // Keeping for backward compatibility
          visaType={visaType}
          nationality={nationality}
          destination={destination}
          receiptNumber={receiptNumber}
          travelDate={new Date().toISOString().split('T')[0]}
          processingTime="Standard"
        />
        
        <div className="mt-6 text-sm text-gray-600">
          <p>
            <strong>Note:</strong> All documents will be processed by our team. You can check the status of your application using your reference number.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploaderExample; 