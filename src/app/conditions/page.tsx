"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Page title translations
const pageTitles = {
  en: "Visa Requirements - Mira Booking",
  fr: "Conditions de Visa - Mira Booking",
  ar: "متطلبات التأشيرة - ميرا بوكينج"
};

// Text translations
const translations = {
  en: {
    title: "Visa Requirements",
    subtitle: "Essential documents and conditions for visa applications",
    description: "Each country has specific visa requirements. Below is a guide for our most popular visa services.",
    generalRequirements: "General Requirements",
    generalRequirementsList: [
      "Valid passport with at least 6 months validity beyond intended stay",
      "Completed visa application form",
      "Recent passport-sized photos with specific dimensions",
      "Proof of travel insurance (where applicable)",
      "Proof of accommodation for your stay",
      "Proof of sufficient financial means",
      "Flight itinerary or travel plans",
      "Supporting documents based on the purpose of your visit"
    ],
    schengenRequirements: "Schengen Visa Requirements",
    schengenRequirementsList: [
      "Valid passport with at least 6 months validity",
      "Completed visa application form",
      "Recent passport-sized photos (35mm x 45mm)",
      "Travel insurance with minimum coverage of €30,000",
      "Proof of accommodation",
      "Flight itinerary (round-trip)",
      "Proof of financial means",
      "Employment verification letter"
    ],
    usaCanadaRequirements: "USA & Canada Visa Requirements",
    usaCanadaRequirementsList: [
      "Valid passport with at least 6 months validity",
      "Completed visa application form",
      "Recent passport-sized photos",
      "Interview appointment confirmation (for USA)",
      "Proof of ties to your home country",
      "Proof of financial means",
      "Travel itinerary",
      "Letter of invitation (if applicable)"
    ],
    studentRequirements: "Student Visa Requirements",
    studentRequirementsList: [
      "Valid passport with at least 6 months validity",
      "Acceptance letter from educational institution",
      "Proof of payment of tuition fees (if applicable)",
      "Proof of financial means to cover studies and living expenses",
      "Academic records and certificates",
      "Language proficiency test results (if applicable)",
      "Health/medical insurance",
      "Accommodation details"
    ],
    processingTimes: "Processing Times",
    processingTimesDesc: "Processing times vary by country and visa type:",
    processingTimesList: [
      "Standard Processing: 15 working days",
      "Expedited Processing: 7 working days",
      "Urgent Processing: 3 working days"
    ],
    fees: "Fees and Payments",
    feesDesc: "All fees are in Algerian Dinars (DZD) and include our service fee plus embassy fees:",
    feesList: [
      "Schengen Visa: 25,000 DA",
      "USA & Canada Visa: 45,000 DA",
      "Student Visa: 30,000 DA"
    ],
    contactUs: "Contact Us",
    contactUsDesc: "If you have specific questions about visa requirements for your situation, please don't hesitate to contact our visa experts.",
    emailUs: "Email Us"
  },
  fr: {
    title: "Conditions de Visa",
    subtitle: "Documents essentiels et conditions pour les demandes de visa",
    description: "Chaque pays a des exigences spécifiques en matière de visa. Voici un guide pour nos services de visa les plus populaires.",
    generalRequirements: "Conditions Générales",
    generalRequirementsList: [
      "Passeport valide avec au moins 6 mois de validité au-delà du séjour prévu",
      "Formulaire de demande de visa dûment rempli",
      "Photos récentes format passeport avec dimensions spécifiques",
      "Preuve d'assurance voyage (selon les cas)",
      "Justificatif d'hébergement pour votre séjour",
      "Preuve de moyens financiers suffisants",
      "Itinéraire de vol ou plans de voyage",
      "Documents justificatifs selon l'objet de votre visite"
    ],
    schengenRequirements: "Conditions pour Visa Schengen",
    schengenRequirementsList: [
      "Passeport valide avec au moins 6 mois de validité",
      "Formulaire de demande de visa rempli",
      "Photos récentes format passeport (35mm x 45mm)",
      "Assurance voyage avec couverture minimale de 30 000 €",
      "Justificatif d'hébergement",
      "Itinéraire de vol (aller-retour)",
      "Preuve de moyens financiers",
      "Attestation d'emploi"
    ],
    usaCanadaRequirements: "Conditions pour Visa USA & Canada",
    usaCanadaRequirementsList: [
      "Passeport valide avec au moins 6 mois de validité",
      "Formulaire de demande de visa rempli",
      "Photos récentes format passeport",
      "Confirmation de rendez-vous d'entretien (pour les USA)",
      "Preuve de liens avec votre pays d'origine",
      "Preuve de moyens financiers",
      "Itinéraire de voyage",
      "Lettre d'invitation (le cas échéant)"
    ],
    studentRequirements: "Conditions pour Visa Étudiant",
    studentRequirementsList: [
      "Passeport valide avec au moins 6 mois de validité",
      "Lettre d'acceptation de l'établissement d'enseignement",
      "Preuve de paiement des frais de scolarité (le cas échéant)",
      "Preuve de moyens financiers pour couvrir les études et les frais de subsistance",
      "Relevés et certificats académiques",
      "Résultats des tests de compétence linguistique (le cas échéant)",
      "Assurance santé/médicale",
      "Détails d'hébergement"
    ],
    processingTimes: "Délais de Traitement",
    processingTimesDesc: "Les délais de traitement varient selon le pays et le type de visa :",
    processingTimesList: [
      "Traitement standard : 15 jours ouvrables",
      "Traitement accéléré : 7 jours ouvrables",
      "Traitement urgent : 3 jours ouvrables"
    ],
    fees: "Frais et Paiements",
    feesDesc: "Tous les frais sont en Dinars Algériens (DA) et comprennent nos frais de service plus les frais d'ambassade :",
    feesList: [
      "Visa Schengen : 25 000 DA",
      "Visa USA & Canada : 45 000 DA",
      "Visa Étudiant : 30 000 DA"
    ],
    contactUs: "Contactez-Nous",
    contactUsDesc: "Si vous avez des questions spécifiques sur les conditions de visa pour votre situation, n'hésitez pas à contacter nos experts en visa.",
    emailUs: "Envoyez-nous un Email"
  },
  ar: {
    title: "متطلبات التأشيرة",
    subtitle: "المستندات والشروط الأساسية لطلبات التأشيرة",
    description: "لكل بلد متطلبات محددة للتأشيرة. فيما يلي دليل لخدمات التأشيرة الأكثر شعبية لدينا.",
    generalRequirements: "المتطلبات العامة",
    generalRequirementsList: [
      "جواز سفر ساري المفعول مع صلاحية لا تقل عن 6 أشهر بعد الإقامة المقصودة",
      "استمارة طلب التأشيرة مكتملة",
      "صور حديثة بحجم جواز السفر بأبعاد محددة",
      "إثبات التأمين على السفر (عند الاقتضاء)",
      "إثبات الإقامة خلال فترة إقامتك",
      "إثبات وجود وسائل مالية كافية",
      "جدول الرحلات الجوية أو خطط السفر",
      "وثائق داعمة بناءً على الغرض من زيارتك"
    ],
    schengenRequirements: "متطلبات تأشيرة شنغن",
    schengenRequirementsList: [
      "جواز سفر ساري المفعول مع صلاحية لا تقل عن 6 أشهر",
      "استمارة طلب التأشيرة مكتملة",
      "صور حديثة بحجم جواز السفر (35 مم × 45 مم)",
      "تأمين سفر بتغطية لا تقل عن 30,000 يورو",
      "إثبات الإقامة",
      "جدول الرحلة الجوية (ذهاب وعودة)",
      "إثبات الوسائل المالية",
      "خطاب تحقق من العمل"
    ],
    usaCanadaRequirements: "متطلبات تأشيرة الولايات المتحدة وكندا",
    usaCanadaRequirementsList: [
      "جواز سفر ساري المفعول مع صلاحية لا تقل عن 6 أشهر",
      "استمارة طلب التأشيرة مكتملة",
      "صور حديثة بحجم جواز السفر",
      "تأكيد موعد المقابلة (للولايات المتحدة)",
      "إثبات الروابط مع بلدك الأم",
      "إثبات الوسائل المالية",
      "جدول السفر",
      "خطاب دعوة (إن وجد)"
    ],
    studentRequirements: "متطلبات تأشيرة الطالب",
    studentRequirementsList: [
      "جواز سفر ساري المفعول مع صلاحية لا تقل عن 6 أشهر",
      "خطاب قبول من المؤسسة التعليمية",
      "إثبات دفع الرسوم الدراسية (إن وجد)",
      "إثبات الوسائل المالية لتغطية الدراسة ونفقات المعيشة",
      "السجلات والشهادات الأكاديمية",
      "نتائج اختبار الكفاءة اللغوية (إن وجد)",
      "تأمين صحي/طبي",
      "تفاصيل الإقامة"
    ],
    processingTimes: "مواعيد المعالجة",
    processingTimesDesc: "تختلف أوقات المعالجة حسب البلد ونوع التأشيرة:",
    processingTimesList: [
      "المعالجة القياسية: 15 يوم عمل",
      "المعالجة المعجلة: 7 أيام عمل",
      "المعالجة العاجلة: 3 أيام عمل"
    ],
    fees: "الرسوم والمدفوعات",
    feesDesc: "جميع الرسوم بالدينار الجزائري (د.ج) وتشمل رسوم خدمتنا بالإضافة إلى رسوم السفارة:",
    feesList: [
      "تأشيرة شنغن: 25,000 د.ج",
      "تأشيرة الولايات المتحدة وكندا: 45,000 د.ج",
      "تأشيرة الطالب: 30,000 د.ج"
    ],
    contactUs: "اتصل بنا",
    contactUsDesc: "إذا كانت لديك أسئلة محددة حول متطلبات التأشيرة لحالتك، فلا تتردد في الاتصال بخبراء التأشيرات لدينا.",
    emailUs: "راسلنا عبر البريد الإلكتروني"
  }
};

export default function RequirementsPage() {
  // Define valid language types
  type LanguageKey = 'en' | 'fr' | 'ar';
  
  // Initialize with null to detect if we've loaded from localStorage yet
  const [language, setLanguage] = useState<LanguageKey | null>(null);
  const t = language ? translations[language] : translations.fr;
  
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
  
  // Load saved language preference on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageKey;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      setLanguage('fr'); // Default to French if no saved preference
    }
  }, []);
  
  // Function to handle language changes from the Header component
  const handleLanguageChange = (lang: string) => {
    if (lang === 'en' || lang === 'fr' || lang === 'ar') {
      setLanguage(lang);
    }
  };
  
  // Don't render content until language is loaded from localStorage
  if (language === null) {
    return <div className="min-h-screen"></div>; // Empty container while loading
  }
  
  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* General Requirements */}
              <div className="bg-white p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 border-primary-100">{t.generalRequirements}</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {t.generalRequirementsList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* Processing Times */}
              <div className="bg-white p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 border-primary-100">{t.processingTimes}</h2>
                <p className="mb-4 text-gray-700">{t.processingTimesDesc}</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {t.processingTimesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2 border-primary-100">{t.fees}</h2>
                <p className="mb-4 text-gray-700">{t.feesDesc}</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {t.feesList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* Schengen Requirements */}
              <div className="bg-white p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 border-primary-100">{t.schengenRequirements}</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {t.schengenRequirementsList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* USA & Canada Requirements */}
              <div className="bg-white p-6 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 border-primary-100">{t.usaCanadaRequirements}</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {t.usaCanadaRequirementsList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* Student Visa Requirements */}
              <div className="bg-white p-6 rounded-xl shadow-xl lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2 border-primary-100">{t.studentRequirements}</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 lg:columns-2">
                  {t.studentRequirementsList.map((item, index) => (
                    <li key={index} className="break-inside-avoid">{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* Contact Us */}
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-xl shadow-xl lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.contactUs}</h2>
                <p className="mb-6 text-gray-700">{t.contactUsDesc}</p>
                <a 
                  href="mailto:mira.booking.dz@gmail.com" 
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {t.emailUs}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
} 