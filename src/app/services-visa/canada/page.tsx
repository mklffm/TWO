"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CanadaVisaPage() {
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
      title: 'Canada Visa',
      subtitle: 'Visit Canada for tourism, business, or family visits',
      description: 'The Canadian visa is an authorization to enter Canada for various purposes including tourism, business meetings, or visiting friends and family.',
      learnMore: 'Learn more about Canada visa',
      applyNow: 'Apply Now',
      back: 'Back'
    },
    fr: {
      title: 'Visa Canada',
      subtitle: 'Visitez le Canada pour le tourisme, les affaires ou visites familiales',
      description: 'Le visa canadien est une autorisation d\'entrée au Canada pour diverses raisons, notamment le tourisme, les réunions d\'affaires ou les visites à des amis et à la famille.',
      learnMore: 'En savoir plus sur le visa Canada',
      applyNow: 'Commencer la Demande de Visa',
      back: 'Retour'
    },
    ar: {
      title: 'تأشيرة كندا',
      subtitle: 'زيارة كندا للسياحة أو الأعمال أو الزيارات العائلية',
      description: 'تأشيرة كندا هي تصريح للدخول إلى كندا لأغراض مختلفة بما في ذلك السياحة واجتماعات الأعمال أو زيارة الأصدقاء والعائلة.',
      learnMore: 'معرفة المزيد عن تأشيرة كندا',
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
        <section className="bg-gradient-to-r from-red-50 to-red-100 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
                <h2 className="text-xl md:text-2xl text-gray-600 mb-6">{content.subtitle}</h2>
                <p className="text-gray-700 mb-6">{content.description}</p>
                
                {/* Apply Now button */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/demande-visa?type=canada"
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-md shadow-md transition-all duration-300"
                  >
                    {content.applyNow}
                  </Link>
                  
                  <Link
                    href="/services-visa/canada/learn-more"
                    className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold py-3 px-6 rounded-md transition-all duration-300 flex items-center"
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
                    src="/images/canada-visa.jpg"
                    alt="Canada Visa"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section - Can be expanded with more details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Types of Canadian Visas</h2>
              
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-red-700 mb-3">Visitor Visa (Temporary Resident Visa)</h3>
                  <p className="text-gray-700 mb-3">For temporary visits to Canada for tourism, family visits, or business.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Single or multiple entry options</li>
                    <li>Valid for up to 10 years or until passport expiry</li>
                    <li>Allows stays of up to 6 months per entry</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-red-700 mb-3">Study Permit</h3>
                  <p className="text-gray-700 mb-3">For international students enrolled in Canadian educational institutions.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Valid for the duration of your study program plus 90 days</li>
                    <li>Requires acceptance at a Designated Learning Institution</li>
                    <li>May allow for part-time work during studies</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-red-700 mb-3">Work Permit</h3>
                  <p className="text-gray-700 mb-3">For foreign nationals who wish to work temporarily in Canada.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Employer-specific or open work permits available</li>
                    <li>May require a Labor Market Impact Assessment (LMIA)</li>
                    <li>Valid for a specific period based on job offer</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-red-700 mb-3">Electronic Travel Authorization (eTA)</h3>
                  <p className="text-gray-700 mb-3">For visa-exempt foreign nationals flying to or transiting through Canada.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Valid for up to 5 years or until passport expiry</li>
                    <li>Linked electronically to your passport</li>
                    <li>Not required for U.S. citizens or travelers entering by land or sea</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Link
                  href="/demande-visa?type=canada"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
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