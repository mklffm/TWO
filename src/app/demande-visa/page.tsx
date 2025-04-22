"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Page title translations
const pageTitles = {
  en: "Visa Application - Mira Booking",
  fr: "Demande de Visa - Mira Booking",
  ar: "طلب تأشيرة - ميرا بوكينج"
};

// Text translations
const translations = {
  en: {
    title: "Visa Application",
    subtitle: "Fill out our form to apply for a visa",
    description: "Start your visa process quickly and easily with our online application form. We'll guide you through each step of the process.",
    nextSteps: 'Next Steps',
    step1: 'Check your email for the receipt and confirmation details',
    step2: 'Send the required documents to support@mira.dz',
    step3: 'Include your receipt number in the email subject line',
    step4: 'Our team will process your application within the timeframe you selected',
    questions: 'If you have any questions, please contact us at:',
    backHome: 'Back to Home',
    dashboard: 'Track Your Application',
    emailSent: 'Application received. Check your email for confirmation.'
  },
  fr: {
    title: "Demande de Visa",
    subtitle: "Remplissez notre formulaire pour demander un visa",
    description: "Commencez votre processus de visa rapidement et facilement avec notre formulaire de demande en ligne. Nous vous guiderons à chaque étape du processus.",
    nextSteps: 'Prochaines Étapes',
    step1: 'Vérifiez votre email pour le reçu et les détails de confirmation',
    step2: 'Envoyez les documents requis à support@mira.dz',
    step3: 'Incluez votre numéro de reçu dans l\'objet de l\'email',
    step4: 'Notre équipe traitera votre demande dans le délai que vous avez sélectionné',
    questions: 'Si vous avez des questions, veuillez nous contacter à :',
    backHome: 'Retour à l\'Accueil',
    dashboard: 'Suivre Votre Demande',
    emailSent: 'Demande reçue. Vérifiez votre email pour la confirmation.'
  },
  ar: {
    title: "طلب تأشيرة",
    subtitle: "املأ نموذجنا للتقدم بطلب للحصول على تأشيرة",
    description: "ابدأ عملية التأشيرة الخاصة بك بسرعة وسهولة باستخدام نموذج الطلب عبر الإنترنت. سنرشدك خلال كل خطوة من خطوات العملية.",
    nextSteps: 'الخطوات التالية',
    step1: 'تحقق من بريدك الإلكتروني للحصول على الإيصال وتفاصيل التأكيد',
    step2: 'أرسل المستندات المطلوبة إلى support@mira.dz',
    step3: 'قم بتضمين رقم الإيصال الخاص بك في سطر موضوع البريد الإلكتروني',
    step4: 'سيعالج فريقنا طلبك خلال الإطار الزمني الذي حددته',
    questions: 'إذا كانت لديك أي أسئلة، يرجى الاتصال بنا على:',
    backHome: 'العودة إلى الصفحة الرئيسية',
    dashboard: 'تتبع طلبك',
    emailSent: 'تم استلام الطلب. تحقق من بريدك الإلكتروني للتأكيد.'
  }
};

// Define valid language types
type LanguageKey = 'en' | 'fr' | 'ar';

export default function VisaApplicationPage() {
  // Use explicit type with null for initial state
  const [language, setLanguage] = useState<LanguageKey | null>(null);
  const t = language ? translations[language] : translations.fr;
  const router = useRouter();
  
  // Update page title when language changes
  useEffect(() => {
    if (!language) return; // Skip if language hasn't been initialized yet
    
    const pageTitle = pageTitles[language] || pageTitles.en;
    document.title = pageTitle;
    
    // Set RTL direction for Arabic language
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl');
    }
  }, [language]);
  
  // Function to handle language changes from the Header component
  const handleLanguageChange = (lang: string) => {
    if (lang === 'en' || lang === 'fr' || lang === 'ar') {
      setLanguage(lang);
    }
  };
  
  // Load saved language preference on initial load
  useEffect(() => {
    // First check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam && ['en', 'fr', 'ar'].includes(langParam)) {
      // Update localStorage and state if URL param exists
      localStorage.setItem('language', langParam);
      setLanguage(langParam as LanguageKey);
      
      // Clean the URL parameter
      if (window.history.replaceState) {
        const newUrl = window.location.pathname;
        window.history.replaceState({path: newUrl}, '', newUrl);
      }
    } else {
      // Otherwise check localStorage
      const savedLanguage = localStorage.getItem('language') as LanguageKey;
      if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      } else {
        setLanguage('fr'); // Default to French if no saved preference
      }
    }
  }, []);
  
  // Don't render content until language is loaded from localStorage
  if (language === null) {
    return <div className="min-h-screen"></div>; // Empty container while loading
  }
  
  return (
    <div className={language === 'ar' ? 'min-h-screen rtl' : 'min-h-screen ltr'}>
      <Header language={language} setLanguage={handleLanguageChange} />
      
      <main className="pt-32">
        <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">{t.subtitle}</p>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.description}</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <SearchForm language={language} />
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
}

export function ApplicationSuccessPage() {
  const [language, setLanguage] = useState<LanguageKey | null>(null);
  const router = useRouter();
  const t = language ? translations[language] : translations.fr;
  
  // Animation control
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Check if we came from the form (in a real app would verify session/state)
    // For demo, just show animation
    setShowContent(true);
    
    // Get language preference from localStorage if available
    const savedLanguage = localStorage.getItem('language') as LanguageKey;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      setLanguage('fr');
    }
  }, []);

  // Don't render content until language is loaded from localStorage
  if (language === null) {
    return <div className="min-h-screen"></div>; // Empty container while loading
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-3xl mx-auto transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-90"></div>
            <div className="relative px-8 py-16 sm:px-16 sm:py-24 text-center">
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-white shadow-md mb-8">
                <svg className="h-16 w-16 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-white">{t.title}</h1>
              <p className="mt-2 text-lg text-primary-100">{t.subtitle}</p>
              <p className="mt-4 text-primary-200">{t.emailSent}</p>
            </div>
          </div>
          
          <div className="px-8 py-12 sm:px-16">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.nextSteps}</h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-base text-gray-700">{t.step1}</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-base text-gray-700">{t.step2}</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-base text-gray-700">{t.step3}</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 text-primary-600">
                    4
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-base text-gray-700">{t.step4}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 border-t border-gray-200 pt-8">
              <p className="text-base text-gray-600">{t.questions}</p>
              <p className="mt-2 text-base font-medium text-primary-600">support@mira.dz</p>
              <p className="mt-1 text-base font-medium text-primary-600">+213 123 456 789</p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4">
              <Link href="/" className="w-full sm:w-auto mb-3 sm:mb-0 inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                {t.backHome}
              </Link>
              <Link href="/application-status" className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                {t.dashboard}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 