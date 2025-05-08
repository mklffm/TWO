"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define valid language types
type LanguageKey = 'en' | 'fr' | 'ar';

// Text translations
const translations = {
  en: {
    title: "Visa Application",
    subtitle: "Fill out our form to apply for a visa",
    description: "Start your visa process quickly and easily with our online application form. We'll guide you through each step of the process.",
    nextSteps: 'Next Steps',
    step4: 'Our team will process your application within the timeframe you selected and we\'ll contact you soon',
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
    step4: 'Notre équipe traitera votre demande dans le délai que vous avez sélectionné et nous vous contacterons bientôt',
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
    step4: 'سيعالج فريقنا طلبك خلال الإطار الزمني الذي حددته وسنتصل بك قريبًا',
    questions: 'إذا كانت لديك أي أسئلة، يرجى الاتصال بنا على:',
    backHome: 'العودة إلى الصفحة الرئيسية',
    dashboard: 'تتبع طلبك',
    emailSent: 'تم استلام الطلب. تحقق من بريدك الإلكتروني للتأكيد.'
  }
};

export default function ApplicationSuccessPage() {
  const [language, setLanguage] = useState<LanguageKey | null>(null);
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
                  <p className="text-base text-gray-700">{t.step4}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 border-t border-gray-200 pt-8">
              <p className="text-base text-gray-600">{t.questions}</p>
              <p className="mt-2 text-base font-medium text-primary-600">mira.booking.visa@gmail.com</p>
              <p className="mt-1 text-base font-medium text-primary-600">+213 660 885 339</p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4">
              <Link href="/" className="w-full sm:w-auto mb-3 sm:mb-0 inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                {t.backHome}
              </Link>
              <Link href="/login" className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                {t.dashboard}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 