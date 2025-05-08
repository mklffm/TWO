import React from 'react';

interface DocumentUploaderProps {
  clientName: string;
  clientEmail: string;
  visaType: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  clientName,
  clientEmail,
  visaType,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-lg p-6 border border-gray-300 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Envoi de documents par email
        </h3>
        
        <div className="mt-4 text-sm text-gray-600">
          <p className="mb-3">
            Pour soumettre vos documents, veuillez les envoyer directement par email à:
          </p>
          <a 
            href={`mailto:sitekdigital@gmail.com?subject=Documents pour ${visaType}: ${clientName}&body=Nom: ${clientName}%0AEmail: ${clientEmail}%0AType de Visa: ${visaType}%0A%0AMerci de joindre vos documents à cet email.`} 
            className="text-blue-600 font-semibold hover:underline"
          >
            sitekdigital@gmail.com
          </a>
          
          <p className="mt-4">
            Veuillez inclure les informations suivantes dans votre email:
          </p>
          <ul className="mt-2 text-left list-disc list-inside">
            <li>Votre nom complet: <span className="font-medium">{clientName || "Veuillez remplir votre nom"}</span></li>
            <li>Votre email: <span className="font-medium">{clientEmail || "Veuillez remplir votre email"}</span></li>
            <li>Type de visa: <span className="font-medium">{visaType}</span></li>
          </ul>
        </div>
        
        <div className="mt-6">
          <a
            href={`mailto:sitekdigital@gmail.com?subject=Documents pour ${visaType}: ${clientName}&body=Nom: ${clientName}%0AEmail: ${clientEmail}%0AType de Visa: ${visaType}%0A%0AMerci de joindre vos documents à cet email.`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Ouvrir mon application email
          </a>
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          <p>
            Veuillez joindre tous les documents nécessaires pour le traitement de votre visa directement à votre email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader; 