"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// UK Visa page component
export default function UKVisaPage() {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    // Get language preference from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Get current language content
  const t = {
    en: {
      title: 'UK Visa',
      subtitle: 'Visit the United Kingdom for tourism, business, or family visits',
      description: 'The UK visa is an authorization to enter the United Kingdom for various purposes including tourism, business meetings, studying, or visiting friends and family.',
      learnMore: 'Learn more about UK visa',
      applyNow: 'Apply Now',
      back: 'Back'
    },
    fr: {
      title: 'Visa Royaume-Uni',
      subtitle: 'Visitez le Royaume-Uni pour le tourisme, les affaires ou visites familiales',
      description: 'Le visa britannique est une autorisation d\'entrée au Royaume-Uni pour diverses raisons, notamment le tourisme, les réunions d\'affaires, les études ou les visites à des amis et à la famille.',
      learnMore: 'En savoir plus sur le visa Royaume-Uni',
      applyNow: 'Commencer la Demande de Visa',
      back: 'Retour'
    },
    ar: {
      title: 'تأشيرة المملكة المتحدة',
      subtitle: 'زيارة المملكة المتحدة للسياحة أو الأعمال أو الزيارات العائلية',
      description: 'تأشيرة المملكة المتحدة هي تصريح للدخول إلى المملكة المتحدة لأغراض مختلفة بما في ذلك السياحة واجتماعات الأعمال أو الدراسة أو زيارة الأصدقاء والعائلة.',
      learnMore: 'معرفة المزيد عن تأشيرة المملكة المتحدة',
      applyNow: 'تقدم الآن',
      back: 'رجوع'
    }
  };

  const content = t[language as keyof typeof t];

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
                <h2 className="text-xl md:text-2xl text-gray-600 mb-6">{content.subtitle}</h2>
                <p className="text-gray-700 mb-6">{content.description}</p>
                
                {/* Apply Now button */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/demande-visa?type=uk"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-md shadow-md transition-all duration-300"
                  >
                    {content.applyNow}
                  </Link>
                  
                  <Link
                    href="/services-visa/uk/learn-more"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center"
                  >
                    {content.learnMore}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/images/uk-visa.jpg"
                    alt="UK Visa"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of UK Visas Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Types of UK Visas</h2>
              
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Standard Visitor Visa</h3>
                  <p className="text-gray-700 mb-3">For tourism, visiting family, attending business meetings, or short study periods.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Valid for up to 6 months</li>
                    <li>Can apply for 2, 5, or 10-year multiple entry visas</li>
                    <li>Cannot work or study for longer than 30 days</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Student Visa</h3>
                  <p className="text-gray-700 mb-3">For students who have been offered a place at a UK educational institution.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Valid for the duration of your course plus additional time</li>
                    <li>Requires sponsorship from a licensed institution</li>
                    <li>Allows part-time work during term-time and full-time during holidays</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Skilled Worker Visa</h3>
                  <p className="text-gray-700 mb-3">For skilled professionals who have a job offer from a UK employer.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Valid for up to 5 years, can lead to settlement</li>
                    <li>Requires sponsorship from a licensed UK employer</li>
                    <li>Minimum salary and skill level requirements apply</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Family Visa</h3>
                  <p className="text-gray-700 mb-3">For partners, children, parents, and relatives of British citizens or settled persons.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Various length options depending on relationship</li>
                    <li>Financial and accommodation requirements apply</li>
                    <li>Can lead to settlement after qualifying period</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Link
                  href="/demande-visa?type=uk"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
                >
                  {content.applyNow}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </>
  );
} 