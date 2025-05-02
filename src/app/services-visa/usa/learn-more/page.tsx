"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function USAVisaLearnMore() {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    // Get language preference from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/services-visa/usa" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back' : language === 'fr' ? 'Retour' : 'رجوع'}
          </Link>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-6 pb-3 border-b border-blue-100">
              Qu'est-ce que le visa américain?
            </h1>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              Le visa américain est une autorisation d'entrée aux États-Unis délivrée aux ressortissants étrangers pour diverses raisons comme le tourisme, les affaires, les études ou le travail. Le type de visa détermine la durée du séjour autorisée et les activités permises sur le territoire américain.
            </p>

            <h2 className="text-xl font-semibold text-blue-600 mt-8 mb-4">
              Types de visas américains
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Visa B-1/B-2 (Tourisme/Affaires)</h3>
                <p>Pour les voyages temporaires aux États-Unis à des fins touristiques ou d'affaires. Valable généralement pour une période allant jusqu'à 10 ans avec des séjours autorisés de 6 mois maximum par visite.</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Visa F-1 (Étudiant)</h3>
                <p>Pour les étudiants internationaux inscrits dans des établissements d'enseignement américains. Permet de rester aux États-Unis pendant toute la durée du programme d'études.</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Visa J-1 (Échange)</h3>
                <p>Pour les participants à des programmes d'échange approuvés par le Département d'État américain, comme les stages, les programmes Work and Travel, ou les échanges universitaires.</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Visa H-1B (Travail)</h3>
                <p>Pour les professionnels hautement qualifiés travaillant dans des domaines spécialisés. Nécessite un sponsor employeur aux États-Unis.</p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-blue-600 mt-8 mb-4">
              Processus de demande de visa américain
            </h2>
            
            <ol className="list-decimal pl-5 space-y-3 text-gray-700 mb-8">
              <li>Remplir le formulaire DS-160 en ligne</li>
              <li>Payer les frais de demande de visa</li>
              <li>Prendre rendez-vous pour un entretien au consulat ou à l'ambassade des États-Unis</li>
              <li>Préparer les documents nécessaires (passeport, photo, confirmation DS-160, reçu de paiement, documents justificatifs)</li>
              <li>Se présenter à l'entretien au consulat</li>
              <li>Attendre la décision concernant votre visa</li>
            </ol>
            
            <h2 className="text-xl font-semibold text-blue-600 mt-8 mb-4">
              Notre pack visa américain
            </h2>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
              <p className="font-medium text-blue-800 mb-4">Nous vous proposons un Pack complet pour votre demande de visa américain :</p>
              
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                <li className="font-medium">Assistance complète pour remplir le formulaire DS-160</li>
                <li className="font-medium">Prise de rendez-vous au consulat américain</li>
                <li className="font-medium">Préparation à l'entretien consulaire avec simulation</li>
                <li className="font-medium">Vérification complète de votre dossier</li>
                <li className="font-medium">Lettre d'invitation professionnelle (si nécessaire)</li>
                <li className="font-medium">Traduction de documents</li>
                <li className="font-medium">Suivi personnalisé de votre demande jusqu'à l'obtention du visa</li>
              </ol>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <Link
                href="/demande-visa?type=usa"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md inline-block transition-colors"
              >
                {language === 'en' ? 'Apply for USA Visa' : language === 'fr' ? 'Demander un visa USA' : 'التقدم للحصول على تأشيرة أمريكا'}
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </>
  );
} 