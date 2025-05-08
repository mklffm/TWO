import React, { useState } from 'react';
import DocumentUploader from './DocumentUploader';

// Example component showing how to use the DocumentUploader
const DocumentUploaderExample: React.FC = () => {
  const [visaType, setVisaType] = useState('Visa touristique');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Envoi de Documents</h1>
      
      {/* Form for client information */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Informations du Client</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entrez votre nom complet"
              required
            />
          </div>
          
          <div>
            <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="clientEmail"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="votre@email.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 mb-1">
              Type de Visa
            </label>
            <select
              id="visaType"
              value={visaType}
              onChange={(e) => setVisaType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Visa touristique">Visa touristique</option>
              <option value="Visa d'affaires">Visa d'affaires</option>
              <option value="Visa étudiant">Visa étudiant</option>
              <option value="Visa de travail">Visa de travail</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Email instructions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Documents de Passeport</h2>
        
        <DocumentUploader
          clientName={clientName}
          clientEmail={clientEmail}
          visaType={visaType}
        />
        
        <div className="mt-6 text-sm text-gray-600">
          <p>
            <strong>Note:</strong> Tous les documents envoyés seront traités par notre équipe. Vous recevrez une confirmation par email une fois que nos agents auront examiné vos documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploaderExample; 