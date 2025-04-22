"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesRedirect() {
  const router = useRouter();
  const [language, setLanguage] = useState('fr');
  
  useEffect(() => {
    // Set a timeout for a smoother transition
    const redirectTimer = setTimeout(() => {
      router.replace('/services-visa');
    }, 1500);
    
    return () => clearTimeout(redirectTimer);
  }, [router]);
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };
  
  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header language={language} setLanguage={handleLanguageChange} />
      
      <main className="pt-32 flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-primary-600">Redirecting...</h1>
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </main>
      
      <Footer language={language} />
    </div>
  );
} 