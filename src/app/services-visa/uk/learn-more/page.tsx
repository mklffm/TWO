"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UKVisaLearnMore() {
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
            href="/services-visa/uk" 
            className="inline-flex items-center text-red-600 hover:text-red-800 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back' : language === 'fr' ? 'Retour' : 'رجوع'}
          </Link>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-red-700 mb-6 pb-3 border-b border-red-100">
              Qu'est-ce que le visa britannique?
            </h1>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              Le visa britannique est un document officiel qui autorise les ressortissants étrangers à entrer au Royaume-Uni pour différentes raisons, notamment le tourisme, les études, le travail ou l'immigration. Selon votre nationalité, votre objectif de voyage et la durée de votre séjour, vous devrez faire une demande pour un type spécifique de visa britannique.
            </p>

            <h2 className="text-xl font-semibold text-red-600 mt-8 mb-4">
              Types de visas britanniques
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Visa de visiteur standard</h3>
                <p>Pour les voyages de courte durée au Royaume-Uni (jusqu'à 6 mois) à des fins touristiques, pour rendre visite à des amis ou à la famille, ou pour des activités professionnelles limitées.</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Visa étudiant</h3>
                <p>Pour les personnes souhaitant suivre des études dans un établissement d'enseignement britannique. Nécessite un parrainage de l'établissement et des preuves de ressources financières suffisantes.</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Visa Skilled Worker</h3>
                <p>Pour les personnes ayant une offre d'emploi d'un employeur britannique agréé. Le poste doit correspondre à un certain niveau de compétence et de salaire, et l'employeur doit fournir un certificat de parrainage.</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Visa familial</h3>
                <p>Pour les conjoints, partenaires civils, fiancé(e)s, enfants et autres personnes à charge de citoyens britanniques ou de résidents permanents. Nécessite des preuves de relation authentique et de moyens financiers suffisants.</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Visa Innovator</h3>
                <p>Pour les entrepreneurs qui souhaitent créer une entreprise innovante au Royaume-Uni. Nécessite l'approbation d'un organisme de soutien agréé et un investissement minimum.</p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-red-600 mt-8 mb-4">
              Processus de demande de visa britannique
            </h2>
            
            <ol className="list-decimal pl-5 space-y-3 text-gray-700 mb-8">
              <li>Déterminer le type de visa approprié pour votre situation</li>
              <li>Créer un compte sur le site gov.uk et remplir le formulaire de demande en ligne</li>
              <li>Payer les frais de demande et la surcharge de santé pour l'immigration (IHS) si applicable</li>
              <li>Prendre rendez-vous dans un centre de demande de visa pour fournir vos données biométriques</li>
              <li>Soumettre les documents justificatifs requis (passeport, photos, preuves financières, etc.)</li>
              <li>Passer un test d'anglais si nécessaire pour certains types de visa</li>
              <li>Attendre la décision concernant votre demande de visa</li>
            </ol>
            
            <h2 className="text-xl font-semibold text-red-600 mt-8 mb-4">
              Notre pack visa britannique
            </h2>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-100 mb-8">
              <p className="font-medium text-red-800 mb-4">Nous vous proposons un Pack complet pour votre demande de visa britannique :</p>
              
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                <li className="font-medium">Évaluation personnalisée de votre éligibilité et conseil sur le type de visa le plus adapté</li>
                <li className="font-medium">Assistance pour la création de votre compte en ligne et la soumission de votre demande</li>
                <li className="font-medium">Aide complète pour remplir correctement tous les formulaires</li>
                <li className="font-medium">Vérification minutieuse de tous vos documents</li>
                <li className="font-medium">Préparation des documents supplémentaires (lettre de motivation, preuves financières, etc.)</li>
                <li className="font-medium">Préparation pour l'entretien au centre de demande de visa si nécessaire</li>
                <li className="font-medium">Suivi de votre demande jusqu'à l'obtention du visa</li>
                <li className="font-medium">Conseils pour la préparation de votre arrivée au Royaume-Uni</li>
              </ol>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <Link
                href="/demande-visa?type=uk"
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md inline-block transition-colors"
              >
                {language === 'en' ? 'Apply for UK Visa' : language === 'fr' ? 'Demander un visa Royaume-Uni' : 'التقدم للحصول على تأشيرة المملكة المتحدة'}
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </>
  );
} 