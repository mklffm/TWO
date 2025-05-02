"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SchengenVisaLearnMore() {
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
            href="/services-visa/schengen" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back' : language === 'fr' ? 'Retour' : 'رجوع'}
          </Link>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-700 mb-6 pb-3 border-b border-blue-100">
              Qu'est-ce que le visa Schengen?
            </h1>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              Le visa Schengen est une autorisation d'entrée de courte durée ou de durée provisoire dans le pays pour faire une visite d'un maximum de 90 jours sur une période de 180 jours. Un visa Schengen donne le droit de voyager dans tous les pays de l'espace Schengen, mais il doit être demandé auprès du pays principal du séjour. Si vous voyagez dans plusieurs pays Schengen, et qu'aucun de ces pays n'est le pays principal de visite, faites votre demande de visa auprès du pays où vous arrivez en premier.
            </p>

            <h2 className="text-xl font-semibold text-blue-600 mt-8 mb-4">
              Pays membres de l'espace Schengen
            </h2>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              Allemagne, Autriche, Belgique, Bulgarie, Croatie, Danemark, Estonie, Finlande, France, Grèce, Hongrie, Islande, Italie, Lettonie, Liechtenstein, Lituanie, Luxemburg, Malte, Norvège, Pays-Bas, Pologne, Portugal, Roumanie, Slovaquie, Slovénie, Suède, Suisse et Tchéquie.
            </p>

            <h2 className="text-xl font-semibold text-blue-600 mt-8 mb-4">
              Conditions d'obtention
            </h2>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              La condition d'octroi du visa est que vous quittiez l'espace Schengen avant l'expiration du visa. De plus, vous devez avoir suffisamment d'argent pour couvrir les frais de votre séjour et pour faire les démarches relatives au visa.
            </p>
            
            <h2 className="text-xl font-semibold text-blue-600 mt-8 mb-4">
              Notre pack visa Schengen
            </h2>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-8">
              <p className="font-medium text-blue-800 mb-4">Nous vous proposons un Pack complet pour votre dossier de Visa Schengen :</p>
              
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                <li className="font-medium">Un rendez-vous (BLS/VFS/Capago/consulaire) confirmé</li>
                
                <li className="font-medium">Formulaire dûment remplie complètement</li>
                
                <li className="font-medium">Réservation d'hôtel confirmée</li>
                
                <li className="font-medium">Lettre justificatif de but de voyage :
                  <ul className="list-disc pl-5 mt-2 space-y-1 font-normal">
                    <li><strong>Pour tourisme :</strong> planification détaillée des activités prévues pour chaque jour du séjour.</li>
                    <li><strong>Pour affaires :</strong> Lettre d'invitation du fournisseur.</li>
                  </ul>
                </li>
                
                <li className="font-medium">Réservation de vol</li>
                
                <li className="font-medium">Assurance voyage couvrant les éventuels frais de rapatriement pour raison médicale, de soins médicaux d'urgence et/ou de soins hospitaliers d'urgence durant le séjour sur le territoire des états membres de l'espace Schengen. Cette assurance doit couvrir un montant de 30.000 €</li>
              </ol>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <Link
                href="/demande-visa?type=schengen"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md inline-block transition-colors"
              >
                {language === 'en' ? 'Apply for Schengen Visa' : language === 'fr' ? 'Demander un visa Schengen' : 'التقدم للحصول على تأشيرة شنغن'}
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </>
  );
} 