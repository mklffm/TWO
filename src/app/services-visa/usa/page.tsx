"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function USAVisaPage() {
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
      title: 'USA Visa',
      subtitle: 'Visit the United States for tourism, business, or family visits',
      description: 'The US visa is an authorization to enter the United States for various purposes including tourism, business meetings, or visiting friends and family.',
      learnMore: 'Learn more about USA visa',
      applyNow: 'Apply Now',
      back: 'Back'
    },
    fr: {
      title: 'Visa USA',
      subtitle: 'Visitez les États-Unis pour le tourisme, les affaires ou visites familiales',
      description: 'Le visa américain est une autorisation d\'entrée aux États-Unis pour diverses raisons, notamment le tourisme, les réunions d\'affaires ou les visites à des amis et à la famille.',
      learnMore: 'En savoir plus sur le visa USA',
      applyNow: 'Commencer la Demande de Visa',
      back: 'Retour'
    },
    ar: {
      title: 'تأشيرة الولايات المتحدة',
      subtitle: 'زيارة الولايات المتحدة للسياحة أو الأعمال أو الزيارات العائلية',
      description: 'تأشيرة الولايات المتحدة هي تصريح للدخول إلى الولايات المتحدة لأغراض مختلفة بما في ذلك السياحة واجتماعات الأعمال أو زيارة الأصدقاء والعائلة.',
      learnMore: 'معرفة المزيد عن تأشيرة الولايات المتحدة',
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
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
                <h2 className="text-xl md:text-2xl text-gray-600 mb-6">{content.subtitle}</h2>
                <p className="text-gray-700 mb-6">{content.description}</p>
                
                {/* Apply Now button */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/demande-visa?type=usa"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition-all duration-300"
                  >
                    {content.applyNow}
                  </Link>
                  
                  <Link
                    href="/services-visa/usa/learn-more"
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
                    src="/images/usa-visa.jpg"
                    alt="USA Visa"
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
              <h2 className="text-3xl font-bold text-center mb-12">Types of US Visas</h2>
              
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">B-1/B-2 Tourist and Business Visa</h3>
                  <p className="text-gray-700 mb-3">For temporary visits for tourism, pleasure, or business purposes.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Valid for up to 10 years (multiple entry)</li>
                    <li>Allows stays up to 6 months per visit</li>
                    <li>Used for tourism, visiting family, or business meetings</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">F-1 Student Visa</h3>
                  <p className="text-gray-700 mb-3">For academic students enrolled in US schools, colleges, and universities.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Valid for duration of your academic program</li>
                    <li>Requires acceptance at a SEVP-approved school</li>
                    <li>Allows for certain types of on-campus employment</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">J-1 Exchange Visitor Visa</h3>
                  <p className="text-gray-700 mb-3">For participants in exchange programs recognized by the US State Department.</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>For cultural exchange, training, research, or educational programs</li>
                    <li>Requires sponsorship by an approved organization</li>
                    <li>Duration varies by program type</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Link
                  href="/demande-visa?type=usa"
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