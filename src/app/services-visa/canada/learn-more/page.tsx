"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CanadaVisaLearnMore() {
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
            href="/services-visa/canada" 
            className="inline-flex items-center text-red-600 hover:text-red-800 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'en' ? 'Back' : language === 'fr' ? 'Retour' : 'رجوع'}
          </Link>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-red-700 mb-6 pb-3 border-b border-red-100">
              Qu'est-ce que le visa canadien?
            </h1>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              Le visa canadien est une autorisation officielle qui permet aux ressortissants étrangers d'entrer au Canada pour diverses raisons, notamment le tourisme, les études, le travail ou l'immigration permanente. Selon votre nationalité, vous pourriez avoir besoin d'un visa de visiteur (Visa de Résident Temporaire ou VRT) ou simplement d'une Autorisation de Voyage Électronique (AVE).
            </p>

            <h2 className="text-xl font-semibold text-red-600 mt-8 mb-4">
              Types de visas canadiens
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Visa de visiteur/touriste</h3>
                <p>Pour les voyages temporaires au Canada à des fins touristiques, pour rendre visite à des amis ou à la famille, ou pour des voyages d'affaires. Généralement valable pour une période allant jusqu'à 6 mois.</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Permis d'études</h3>
                <p>Pour les étudiants internationaux qui souhaitent étudier dans un établissement d'enseignement désigné au Canada. Valable pour la durée du programme d'études plus 90 jours.</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Permis de travail</h3>
                <p>Pour les étrangers qui souhaitent travailler temporairement au Canada. Peut être lié à un employeur spécifique ou être un permis de travail ouvert. Nécessite généralement une étude d'impact sur le marché du travail (EIMT).</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Autorisation de Voyage Électronique (AVE)</h3>
                <p>Obligatoire pour les ressortissants de pays dispensés de visa qui voyagent au Canada par avion. Liée électroniquement au passeport et valide pendant 5 ans ou jusqu'à l'expiration du passeport.</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-bold text-lg">Résidence permanente</h3>
                <p>Pour les personnes qui souhaitent s'installer définitivement au Canada. Plusieurs programmes d'immigration sont disponibles, notamment Entrée express, Programme des candidats des provinces, et Regroupement familial.</p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-red-600 mt-8 mb-4">
              Processus de demande de visa canadien
            </h2>
            
            <ol className="list-decimal pl-5 space-y-3 text-gray-700 mb-8">
              <li>Déterminer le type de visa dont vous avez besoin</li>
              <li>Créer un compte en ligne sur le site d'Immigration, Réfugiés et Citoyenneté Canada (IRCC)</li>
              <li>Remplir les formulaires de demande en ligne</li>
              <li>Payer les frais de traitement et, le cas échéant, fournir vos données biométriques</li>
              <li>Soumettre les documents justificatifs (passeport, photos, preuve de moyens financiers, etc.)</li>
              <li>Passer un examen médical si nécessaire</li>
              <li>Attendre la décision concernant votre demande</li>
            </ol>
            
            <h2 className="text-xl font-semibold text-red-600 mt-8 mb-4">
              Notre pack visa canadien
            </h2>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-100 mb-8">
              <p className="font-medium text-red-800 mb-4">Nous vous proposons un Pack complet pour votre demande de visa canadien :</p>
              
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                <li className="font-medium">Évaluation de l'éligibilité et conseil sur le type de visa approprié</li>
                <li className="font-medium">Assistance pour la création de votre compte IRCC</li>
                <li className="font-medium">Aide complète pour remplir les formulaires de demande</li>
                <li className="font-medium">Vérification exhaustive de tous vos documents</li>
                <li className="font-medium">Préparation des documents supplémentaires (lettre de motivation, plan d'études, etc.)</li>
                <li className="font-medium">Orientation pour les rendez-vous de collecte des données biométriques</li>
                <li className="font-medium">Suivi de votre demande jusqu'à l'obtention du visa</li>
                <li className="font-medium">Conseils pour la préparation de l'arrivée au Canada</li>
              </ol>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <Link
                href="/demande-visa?type=canada"
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md inline-block transition-colors"
              >
                {language === 'en' ? 'Apply for Canada Visa' : language === 'fr' ? 'Demander un visa Canada' : 'التقدم للحصول على تأشيرة كندا'}
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </>
  );
} 