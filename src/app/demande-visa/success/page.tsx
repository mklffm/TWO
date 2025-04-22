"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Translation object
const translations = {
  en: {
    title: 'Visa Application Submitted',
    subtitle: 'Thank you for your application!',
    emailSent: 'We have sent a receipt to your email address.',
    nextSteps: 'Next Steps',
    step1: 'Check your email for the receipt and confirmation details',
    step2: 'Send the required documents to support@mira.dz',
    step3: 'Include your receipt number in the email subject line',
    step4: 'Our team will process your application within the timeframe you selected',
    questions: 'If you have any questions, please contact us at:',
    backHome: 'Back to Home',
    dashboard: 'Track Your Application'
  },
  fr: {
    title: 'Demande de Visa Soumise',
    subtitle: 'Merci pour votre demande !',
    emailSent: 'Nous avons envoyé un reçu à votre adresse e-mail.',
    nextSteps: 'Prochaines Étapes',
    step1: 'Vérifiez votre email pour le reçu et les détails de confirmation',
    step2: 'Envoyez les documents requis à support@mira.dz',
    step3: 'Incluez votre numéro de reçu dans l\'objet de l\'email',
    step4: 'Notre équipe traitera votre demande dans le délai que vous avez sélectionné',
    questions: 'Si vous avez des questions, veuillez nous contacter à :',
    backHome: 'Retour à l\'Accueil',
    dashboard: 'Suivre Votre Demande'
  },
  ar: {
    title: 'تم تقديم طلب التأشيرة',
    subtitle: 'شكرا لطلبك!',
    emailSent: 'لقد أرسلنا إيصالًا إلى عنوان بريدك الإلكتروني.',
    nextSteps: 'الخطوات التالية',
    step1: 'تحقق من بريدك الإلكتروني للحصول على الإيصال وتفاصيل التأكيد',
    step2: 'أرسل المستندات المطلوبة إلى support@mira.dz',
    step3: 'قم بتضمين رقم الإيصال الخاص بك في سطر موضوع البريد الإلكتروني',
    step4: 'سيعالج فريقنا طلبك خلال الإطار الزمني الذي حددته',
    questions: 'إذا كانت لديك أي أسئلة، يرجى الاتصال بنا على:',
    backHome: 'العودة إلى الصفحة الرئيسية',
    dashboard: 'تتبع طلبك'
  }
};

type TranslationLanguage = 'en' | 'fr' | 'ar';

export default function ApplicationSuccessPage() {
  const [language, setLanguage] = useState<TranslationLanguage>('en');
  const [showDebug, setShowDebug] = useState(false);
  const [emailInfo, setEmailInfo] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = translations[language];
  
  // Animation control
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    // Check if we came from the form (in a real app would verify session/state)
    // For demo, just show animation
    setShowContent(true);
    
    // Get language preference from localStorage if available
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage as TranslationLanguage);
    }
    
    // Get email debugging info if available
    const emailStatus = localStorage.getItem('emailSendStatus');
    if (emailStatus) {
      try {
        setEmailInfo(JSON.parse(emailStatus));
      } catch (e) {
        console.error('Failed to parse email status:', e);
      }
    }
  }, []);
  
  // Show debug panel on key sequence (press 'd' 5 times)
  useEffect(() => {
    let count = 0;
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'd') {
        count++;
        if (count >= 5) {
          setShowDebug(true);
          count = 0;
        }
        // Reset after 2 seconds
        setTimeout(() => {
          count = 0;
        }, 2000);
      }
    };
    
    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, []);
  
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
          
          {/* Add the debug panel */}
          {showDebug && emailInfo && (
            <div className="px-8 py-6 bg-gray-100 border-t border-gray-200 text-xs font-mono">
              <h3 className="text-sm font-bold mb-2">Email Debugging Information</h3>
              <pre className="whitespace-pre-wrap overflow-auto max-h-40">
                {JSON.stringify(emailInfo, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 