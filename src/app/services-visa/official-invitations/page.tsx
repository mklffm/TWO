"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Page title translations
const pageTitles = {
  en: "Official Invitations - Mira Booking",
  fr: "Invitations Officielles - Mira Booking",
  ar: "الدعوات الرسمية - ميرا بوكينج"
};

// Text translations
const translations = {
  en: {
    title: "Official Invitation Letters",
    subtitle: "Professional invitation services for various destinations",
    description: "Our official invitation service helps facilitate visa application processes for business visitors, family members, and official delegations. We provide legally valid invitation letters that meet the requirements of embassies and consulates.",
    applyNow: "Apply Now",
    learnMore: "Learn More",
    availableFor: "Available for the following destinations:",
    belarus: "Belarus",
    moldova: "Moldova",
    schengen: "Professional Invitations for Schengen States",
    belarusDesc: "Business and professional invitation letters for Belarus that comply with all requirements of the Belarusian immigration authorities.",
    moldovaDesc: "Official invitation letters for Moldova that make your visa application process easier and faster.",
    schengenDesc: "Professional invitation letters for Schengen countries that meet all requirements for business visa applications.",
    documents: "Required Documents",
    documentsList: [
      "Valid passport (minimum 6 months validity)",
      "Passport-sized photo with white background",
      "Information about the invitee (full name, date of birth, passport details)",
      "Purpose of visit",
      "Duration of the intended stay",
      "Information about the host (personal or company)"
    ],
    process: "Process",
    processList: [
      "Submit your application with all required information",
      "We prepare the official invitation letter",
      "The invitation letter is verified and authenticated",
      "You receive the invitation letter via email and physical copy if needed",
      "Use the invitation letter for your visa application"
    ]
  },
  fr: {
    title: "Lettres d'Invitation Officielles",
    subtitle: "Services d'invitation professionnels pour diverses destinations",
    description: "Notre service d'invitation officielle aide à faciliter les processus de demande de visa pour les visiteurs professionnels, les membres de la famille et les délégations officielles. Nous fournissons des lettres d'invitation légalement valides qui répondent aux exigences des ambassades et consulats.",
    applyNow: "Faire une Demande",
    learnMore: "En Savoir Plus",
    availableFor: "Disponible pour les destinations suivantes :",
    belarus: "Biélorussie",
    moldova: "Moldavie",
    schengen: "Invitations Professionnelles pour États Schengen",
    belarusDesc: "Lettres d'invitation professionnelles pour la Biélorussie conformes à toutes les exigences des autorités d'immigration biélorusses.",
    moldovaDesc: "Lettres d'invitation officielles pour la Moldavie qui facilitent et accélèrent votre processus de demande de visa.",
    schengenDesc: "Lettres d'invitation professionnelles pour les pays Schengen qui répondent à toutes les exigences des demandes de visa d'affaires.",
    documents: "Documents Requis",
    documentsList: [
      "Passeport valide (validité minimum 6 mois)",
      "Photo format passeport sur fond blanc",
      "Informations sur l'invité (nom complet, date de naissance, détails du passeport)",
      "Objet de la visite",
      "Durée du séjour prévu",
      "Informations sur l'hôte (personnel ou entreprise)"
    ],
    process: "Processus",
    processList: [
      "Soumettez votre demande avec toutes les informations requises",
      "Nous préparons la lettre d'invitation officielle",
      "La lettre d'invitation est vérifiée et authentifiée",
      "Vous recevez la lettre d'invitation par email et une copie physique si nécessaire",
      "Utilisez la lettre d'invitation pour votre demande de visa"
    ]
  },
  ar: {
    title: "رسائل الدعوة الرسمية",
    subtitle: "خدمات الدعوة المهنية لمختلف الوجهات",
    description: "تساعد خدمة الدعوة الرسمية الخاصة بنا على تسهيل عمليات طلب التأشيرة للزوار التجاريين وأفراد العائلة والوفود الرسمية. نحن نقدم خطابات دعوة صالحة قانونيًا تلبي متطلبات السفارات والقنصليات.",
    applyNow: "تقديم طلب",
    learnMore: "معرفة المزيد",
    availableFor: "متاحة للوجهات التالية:",
    belarus: "بيلاروسيا",
    moldova: "مولدوفا",
    schengen: "دعوات مهنية لدول شنغن",
    belarusDesc: "خطابات دعوة تجارية ومهنية لبيلاروسيا تتوافق مع جميع متطلبات سلطات الهجرة البيلاروسية.",
    moldovaDesc: "خطابات دعوة رسمية لمولدوفا تجعل عملية طلب التأشيرة الخاصة بك أسهل وأسرع.",
    schengenDesc: "خطابات دعوة مهنية لدول شنغن تلبي جميع متطلبات طلبات تأشيرة الأعمال.",
    documents: "المستندات المطلوبة",
    documentsList: [
      "جواز سفر ساري المفعول (صلاحية 6 أشهر كحد أدنى)",
      "صورة بحجم جواز السفر على خلفية بيضاء",
      "معلومات عن المدعو (الاسم الكامل، تاريخ الميلاد، تفاصيل جواز السفر)",
      "الغرض من الزيارة",
      "مدة الإقامة المقصودة",
      "معلومات عن المضيف (شخصي أو شركة)"
    ],
    process: "العملية",
    processList: [
      "قدم طلبك مع جميع المعلومات المطلوبة",
      "نقوم بإعداد خطاب الدعوة الرسمي",
      "يتم التحقق من خطاب الدعوة وتوثيقه",
      "تتلقى خطاب الدعوة عبر البريد الإلكتروني ونسخة مادية إذا لزم الأمر",
      "استخدم خطاب الدعوة لطلب التأشيرة الخاص بك"
    ]
  }
};

export default function OfficialInvitationsPage() {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    // Get language preference from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update page title when language changes
  useEffect(() => {
    const pageTitle = pageTitles[language as keyof typeof pageTitles] || pageTitles.en;
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

  const t = translations[language as keyof typeof translations];
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header language={language} setLanguage={setLanguage} />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-800/90 to-primary-600/80 z-10"></div>
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000"
              alt="Official invitation letter with a stamp"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white z-10"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white z-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.title}</h1>
            <p className="text-xl md:text-2xl max-w-3xl">{t.subtitle}</p>
          </div>
        </section>
        
        {/* Main content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {t.description}
              </p>
              
              <h2 className="text-2xl font-bold text-primary-700 mb-6">{t.availableFor}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* Belarus */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1601469696842-1f7316f6661a?q=80&w=800" 
                      alt="Belarus" 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{t.belarus}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-4">{t.belarusDesc}</p>
                    <div className="flex justify-between">
                      <Link href="/demande-visa?type=official-invitations&country=belarus" className="text-primary-600 font-semibold hover:text-primary-800">
                        {t.applyNow}
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Moldova */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1618849516104-987dc52f959e?q=80&w=800" 
                      alt="Moldova" 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{t.moldova}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-4">{t.moldovaDesc}</p>
                    <div className="flex justify-between">
                      <Link href="/demande-visa?type=official-invitations&country=moldova" className="text-primary-600 font-semibold hover:text-primary-800">
                        {t.applyNow}
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Schengen */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="h-48 relative overflow-hidden">
                    <Image 
                      src="https://images.unsplash.com/photo-1562883676-8c7feb83f09b?q=80&w=800" 
                      alt="Schengen States" 
                      fill 
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{t.schengen}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-4">{t.schengenDesc}</p>
                    <div className="flex justify-between">
                      <Link href="/demande-visa?type=official-invitations&country=schengen" className="text-primary-600 font-semibold hover:text-primary-800">
                        {t.applyNow}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Requirements and Process */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-primary-700 mb-4">{t.documents}</h2>
                  <ul className="space-y-2">
                    {t.documentsList.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center mt-1 mr-3">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-primary-700 mb-4">{t.process}</h2>
                  <ol className="space-y-2 list-decimal list-inside pl-2">
                    {t.processList.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
                  </ol>
                </div>
              </div>
              
              {/* CTA */}
              <div className="bg-primary-50 p-8 rounded-lg mt-12 text-center">
                <h2 className="text-2xl font-bold text-primary-700 mb-4">
                  {language === 'en' ? 'Get Your Official Invitation Letter Today' : 
                   language === 'fr' ? 'Obtenez Votre Lettre d\'Invitation Officielle Aujourd\'hui' : 
                   'احصل على خطاب الدعوة الرسمي الخاص بك اليوم'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {language === 'en' ? 'Ensure your visa application has the best chance of success with our professional invitation letter service.' : 
                   language === 'fr' ? 'Assurez-vous que votre demande de visa a les meilleures chances de succès avec notre service de lettre d\'invitation professionnelle.' : 
                   'تأكد من أن طلب التأشيرة الخاص بك لديه أفضل فرصة للنجاح مع خدمة خطاب الدعوة المهنية لدينا.'}
                </p>
                <Link 
                  href="/demande-visa?type=official-invitations" 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg inline-block font-medium"
                >
                  {t.applyNow}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
} 