"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import DestinationCard from '@/components/DestinationCard';

// Page title translations
const pageTitles = {
  en: "Mira Booking - Hassle-Free Visa Processing",
  fr: "Mira Booking - Traitement de Visa Sans Tracas",
  ar: "ميرا بوكينج - معالجة التأشيرة بدون متاعب"
};

// Sample visa service data
const visaServices = [
  {
    id: 'schengen',
    name: 'Schengen Visa',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1000',
    description: 'Travel to 26 European countries with a single visa. Ideal for tourism, business, or family visits to Europe.',
    price: 25000,
    rating: 4.8,
  },
  {
    id: 'usa-canada',
    name: 'USA & Canada Visa',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000',
    description: 'Visit the United States and Canada for tourism, business meetings, or to meet family and friends.',
    price: 45000,
    rating: 4.7,
  },
  {
    id: 'student',
    name: 'Student Visa',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000',
    description: 'Study abroad in Turkey or France with our specialized student visa processing service.',
    price: 30000,
    rating: 4.9,
  },
];

// Sample service benefits
const serviceBenefits = [
  {
    id: 'expert',
    icon: '👨‍💼',
    title: 'Expert Guidance',
    description: 'Our visa specialists have years of experience with various visa types and country requirements.'
  },
  {
    id: 'fast',
    icon: '⚡',
    title: 'Fast Processing',
    description: 'We expedite your visa application to ensure you get your visa in the shortest time possible.'
  },
  {
    id: 'docs',
    icon: '📄',
    title: 'Document Support',
    description: 'We provide a customized checklist and review all your documents to ensure they meet requirements.'
  },
  {
    id: 'track',
    icon: '🔍',
    title: 'Application Tracking',
    description: 'Track your visa application status in real-time through our online portal.'
  },
];

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    quote: 'The visa application process was so simple with Mira Booking. I got my Schengen visa in just 5 days!',
    rating: 5
  },
  {
    id: 2,
    name: 'Ahmed Hassan',
    location: 'Cairo, Egypt',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    quote: 'I was worried about my UK visa application, but the team made it stress-free and successful.',
    rating: 5
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    location: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
    quote: 'Their document checklist service saved me so much time. My USA visa was approved on the first try!',
    rating: 4
  }
];

// Text translations
const translations = {
  en: {
    heroTitle: "Hassle-Free Visa Processing",
    heroSubtitle: "Get your visa processed quickly and efficiently with our expert application service",
    howItWorksTitle: "How Our Visa Processing Works",
    howItWorksSubtitle: "A simple 4-step process to get your visa quickly and efficiently",
    step1Title: "Submit Application",
    step1Text: "Fill out our form and upload your passport scan to get started",
    step2Title: "Document Review",
    step2Text: "Our experts review your documents and provide a customized checklist",
    step3Title: "Submit Application",
    step3Text: "We prepare and submit your application to the embassy or consulate",
    step4Title: "Visa Approval",
    step4Text: "Receive your visa and prepare for your trip with confidence",
    servicesTitle: "Popular Visa Services",
    servicesSubtitle: "We process visa applications for countries worldwide",
    viewAllServices: "View All Visa Services",
    whyChooseTitle: "Why Choose Our Visa Services",
    whyChooseSubtitle: "We make the visa application process simpler and more efficient",
    statsTitle: "Our Success Speaks for Itself",
    statsSubtitle: "We've helped thousands of clients get their visas",
    approvalRate: "Visa Approval Rate",
    applicationsProcessed: "Applications Processed",
    countriesCovered: "Countries Covered",
    testimonialsTitle: "What Our Clients Say",
    testimonialsSubtitle: "Read testimonials from our satisfied visa applicants",
    ctaTitle: "Ready to Apply for Your Visa?",
    ctaSubtitle: "Get a personalized quote for your visa application today!",
    startApplication: "Start My Application",
    schengenVisa: "Schengen Visa",
    schengenDesc: "Travel to 26 European countries with a single visa. Ideal for tourism, business, or family visits to Europe.",
    usaCanadaVisa: "USA & Canada Visa",
    usaCanadaDesc: "Visit the United States and Canada for tourism, business meetings, or to meet family and friends.",
    studentVisa: "Student Visa",
    studentDesc: "Study abroad in Turkey or France with our specialized student visa processing service.",
    currencyCode: "DZD",
    currencyName: "Algerian Dinar",
  },
  fr: {
    heroTitle: "Traitement de Visa Sans Tracas",
    heroSubtitle: "Obtenez votre visa traité rapidement et efficacement grâce à notre service de demande expert",
    howItWorksTitle: "Comment Fonctionne Notre Traitement de Visa",
    howItWorksSubtitle: "Un processus simple en 4 étapes pour obtenir votre visa rapidement et efficacement",
    step1Title: "Soumettre la Demande",
    step1Text: "Remplissez notre formulaire et téléchargez votre scan de passeport pour commencer",
    step2Title: "Examen des Documents",
    step2Text: "Nos experts examinent vos documents et fournissent une liste personnalisée",
    step3Title: "Dépôt de la Demande",
    step3Text: "Nous préparons et soumettons votre demande à l'ambassade ou au consulat",
    step4Title: "Approbation du Visa",
    step4Text: "Recevez votre visa et préparez votre voyage en toute confiance",
    servicesTitle: "Services de Visa Populaires",
    servicesSubtitle: "Nous traitons les demandes de visa pour des pays du monde entier",
    viewAllServices: "Voir Tous les Services de Visa",
    whyChooseTitle: "Pourquoi Choisir Nos Services de Visa",
    whyChooseSubtitle: "Nous rendons le processus de demande de visa plus simple et plus efficace",
    statsTitle: "Notre Succès Parle de Lui-même",
    statsSubtitle: "Nous avons aidé des milliers de clients à obtenir leur visa",
    approvalRate: "Taux d'Approbation des Visas",
    applicationsProcessed: "Demandes Traitées",
    countriesCovered: "Pays Couverts",
    testimonialsTitle: "Ce Que Disent Nos Clients",
    testimonialsSubtitle: "Lisez les témoignages de nos demandeurs de visa satisfaits",
    ctaTitle: "Prêt à Faire Votre Demande de Visa?",
    ctaSubtitle: "Obtenez un devis personnalisé pour votre demande de visa aujourd'hui!",
    startApplication: "Commencer Ma Demande",
    schengenVisa: "Visa Schengen",
    schengenDesc: "Voyagez dans 26 pays européens avec un seul visa. Idéal pour le tourisme, les affaires ou les visites familiales en Europe.",
    usaCanadaVisa: "Visa USA & Canada",
    usaCanadaDesc: "Visitez les États-Unis et le Canada pour le tourisme, les réunions d'affaires ou pour rencontrer famille et amis.",
    studentVisa: "Visa Étudiant",
    studentDesc: "Étudiez à l'étranger en Turquie ou en France avec notre service spécialisé de traitement des visas étudiants.",
    currencyCode: "DA",
    currencyName: "Dinar Algérien",
  },
  ar: {
    heroTitle: "معالجة التأشيرة بدون متاعب",
    heroSubtitle: "احصل على تأشيرتك بسرعة وكفاءة مع خدمة التقديم المتخصصة لدينا",
    howItWorksTitle: "كيف تعمل خدمة معالجة التأشيرات لدينا",
    howItWorksSubtitle: "عملية بسيطة من 4 خطوات للحصول على تأشيرتك بسرعة وكفاءة",
    step1Title: "تقديم الطلب",
    step1Text: "املأ النموذج وقم بتحميل صورة جواز سفرك للبدء",
    step2Title: "مراجعة المستندات",
    step2Text: "يقوم خبراؤنا بمراجعة مستنداتك وتقديم قائمة مخصصة",
    step3Title: "تقديم الطلب",
    step3Text: "نقوم بإعداد وتقديم طلبك إلى السفارة أو القنصلية",
    step4Title: "الموافقة على التأشيرة",
    step4Text: "استلم تأشيرتك واستعد لرحلتك بثقة",
    servicesTitle: "خدمات التأشيرات الشائعة",
    servicesSubtitle: "نقدم خدمات معالجة طلبات التأشيرة للدول في جميع أنحاء العالم",
    viewAllServices: "عرض جميع خدمات التأشيرة",
    whyChooseTitle: "لماذا تختار خدمات التأشيرة لدينا",
    whyChooseSubtitle: "نجعل عملية طلب التأشيرة أبسط وأكثر كفاءة",
    statsTitle: "نجاحنا يتحدث عن نفسه",
    statsSubtitle: "لقد ساعدنا آلاف العملاء في الحصول على تأشيراتهم",
    approvalRate: "معدل الموافقة على التأشيرات",
    applicationsProcessed: "الطلبات المعالجة",
    countriesCovered: "الدول المشمولة",
    testimonialsTitle: "ماذا يقول عملاؤنا",
    testimonialsSubtitle: "اقرأ شهادات من مقدمي طلبات التأشيرة الراضين",
    ctaTitle: "هل أنت مستعد لتقديم طلب الحصول على تأشيرتك؟",
    ctaSubtitle: "احصل على عرض سعر مخصص لطلب التأشيرة الخاص بك اليوم!",
    startApplication: "ابدأ طلبي",
    schengenVisa: "تأشيرة شنغن",
    schengenDesc: "سافر إلى 26 دولة أوروبية بتأشيرة واحدة. مثالية للسياحة والأعمال أو زيارات العائلة في أوروبا.",
    usaCanadaVisa: "تأشيرة الولايات المتحدة وكندا",
    usaCanadaDesc: "زيارة الولايات المتحدة وكندا للسياحة واجتماعات العمل أو لقاء العائلة والأصدقاء.",
    studentVisa: "تأشيرة طالب",
    studentDesc: "ادرس في الخارج في تركيا أو فرنسا مع خدمة معالجة تأشيرات الطلاب المتخصصة لدينا.",
    currencyCode: "د.ج",
    currencyName: "دينار جزائري",
  }
};

// Define valid language types
type LanguageKey = 'en' | 'fr' | 'ar';

export default function HomePage() {
  // Initialize with null to detect if we've loaded from localStorage yet
  const [language, setLanguage] = useState<LanguageKey | null>(null);
  const t = language ? translations[language] : translations.fr;
  
  // Load saved language preference on initial client-side render
  useEffect(() => {
    // Function to get and set the language
    function initLanguage() {
      try {
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
          const savedLanguage = localStorage.getItem('language');
          if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
            setLanguage(savedLanguage as LanguageKey);
          } else {
            // Default to French if no language is set
            setLanguage('fr');
          }
        }
      } catch (e) {
        // Fallback if localStorage fails
        console.error('Error accessing localStorage:', e);
        setLanguage('fr');
      }
    }
    
    // Initialize language
    initLanguage();
    
    // Listen for storage events (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && e.newValue) {
        if (['en', 'fr', 'ar'].includes(e.newValue)) {
          setLanguage(e.newValue as LanguageKey);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
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
      // Force reload on language change
      localStorage.setItem('language', lang);
      window.location.reload();
    }
  };
  
  // Don't render content until language is loaded from localStorage
  if (language === null) {
    return <div className="min-h-screen"></div>; // Empty container while loading
  }
  
  return (
    <div className={language === 'ar' ? 'min-h-screen rtl' : 'min-h-screen ltr'}>
      <Header language={language} setLanguage={handleLanguageChange} />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[650px] overflow-hidden pt-24">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/80 z-10"></div>
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000"
              alt="Airplane flying over beautiful landscape"
              fill
              priority
              className="object-cover animate-slow-zoom"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white z-10"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white z-20">
            <div className="inline-block mb-6 rounded-full bg-primary-500/30 p-2 backdrop-blur-sm fade-in">
              <div className="rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 px-4 py-2 text-sm font-medium animate-pulse-slow">
                {language === 'en' ? 'Trusted Visa Processing Agency' : 
                 language === 'fr' ? 'Agence de Traitement de Visa de Confiance' : 
                 'وكالة معالجة تأشيرات موثوقة'}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight text-shadow-lg slide-in-left">
              {language === 'ar' ? (
                <div className="inline-block">
                  <span className="text-gradient bg-gradient-to-r from-primary-300 to-secondary-300">
                    معالجة
                  </span>{' '}
                  <span>
                    التأشيرة
                  </span>{' '}
                  <span className="text-gradient bg-gradient-to-r from-primary-300 to-secondary-300">
                    بدون
                  </span>{' '}
                  <span>
                    متاعب
                  </span>
                </div>
              ) : (
                t.heroTitle.split(' ').map((word, i) => (
                  <span key={i} className={`inline-block ${i % 2 === 0 ? '' : 'text-gradient bg-gradient-to-r from-primary-300 to-secondary-300'}`}>
                    {word}{' '}
                  </span>
                ))
              )}
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl text-gray-100 text-shadow slide-in-right delay-200">
              {t.heroSubtitle}
            </p>
            <div className="fade-in delay-400">
              <Link href="/#booking-form" className="btn bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-primary-600/30 transform hover:scale-105 transition-all duration-300">
                {t.startApplication}
              </Link>
            </div>
          </div>
        </section>
        
        {/* Booking Form Section */}
        <section className="py-16 bg-white" id="booking-form">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
                {language === 'en' ? 'VISA APPLICATION' : 
                 language === 'fr' ? 'DEMANDE DE VISA' : 
                 'طلب تأشيرة'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {language === 'en' ? 'Start Your Visa Process' : 
                 language === 'fr' ? 'Commencez Votre Processus de Visa' : 
                 'ابدأ عملية التأشيرة الخاصة بك'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {language === 'en' ? 'Choose individual application or bulk processing for travel agencies' : 
                 language === 'fr' ? 'Choisissez une demande individuelle ou un traitement en masse pour les agences de voyage' : 
                 'اختر التقديم الفردي أو المعالجة الجماعية لوكالات السفر'}
              </p>
            </div>
            <div className="max-w-4xl mx-auto -mt-4 relative z-10 scale-in">
              <SearchForm language={language} />
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-20 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 slide-in-bottom">
              <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
                {language === 'en' ? 'SIMPLE PROCESS' : 
                 language === 'fr' ? 'PROCESSUS SIMPLE' : 
                 'عملية بسيطة'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.howItWorksTitle}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.howItWorksSubtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-[100px] left-[180px] right-[180px] h-0.5 bg-gradient-to-r from-primary-400 to-secondary-500 z-0"></div>
              
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-xl shadow-xl z-10 hover-lift">
                <div className="relative">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-2xl font-bold mb-4 float">1</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t.step1Title}</h3>
                  <p className="text-gray-600">{t.step1Text}</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white p-6 rounded-xl shadow-xl z-10 hover-lift">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-2xl font-bold mb-4 float">2</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.step2Title}</h3>
                <p className="text-gray-600">{t.step2Text}</p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white p-6 rounded-xl shadow-xl z-10 hover-lift">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-2xl font-bold mb-4 float">3</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.step3Title}</h3>
                <p className="text-gray-600">{t.step3Text}</p>
              </div>
              
              {/* Step 4 */}
              <div className="bg-white p-6 rounded-xl shadow-xl z-10 hover-lift">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-secondary-600 to-primary-500 text-white text-2xl font-bold mb-4 float">4</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.step4Title}</h3>
                <p className="text-gray-600">{t.step4Text}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Popular Visa Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 slide-in-bottom">
              <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
                {language === 'en' ? 'POPULAR CHOICES' : 
                 language === 'fr' ? 'CHOIX POPULAIRES' : 
                 'الخيارات الشائعة'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.servicesTitle}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.servicesSubtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visaServices.map((service, index) => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover-lift service-card"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image 
                      src={service.image} 
                      alt={service.id === 'schengen' ? t.schengenVisa : 
                           service.id === 'usa-canada' ? t.usaCanadaVisa : t.studentVisa} 
                      fill 
                      className="object-cover transition-transform duration-700 hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                        {service.price.toLocaleString()} {t.currencyCode}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-white text-sm">{service.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.id === 'schengen' ? t.schengenVisa : 
                       service.id === 'usa-canada' ? t.usaCanadaVisa : t.studentVisa}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.id === 'schengen' ? t.schengenDesc : 
                       service.id === 'usa-canada' ? t.usaCanadaDesc : t.studentDesc}
                    </p>
                    <Link href={`/services/${service.id}`} className="text-primary-600 font-medium hover:text-secondary-600 inline-flex items-center learn-more">
                      {language === 'en' ? 'Learn More' : 
                       language === 'fr' ? 'En Savoir Plus' : 
                       'معرفة المزيد'}
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/services" 
                className="btn btn-outline hover-lift inline-flex items-center"
              >
                {t.viewAllServices}
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Service Features */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 slide-in-bottom">
              <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
                {language === 'en' ? 'WHY CHOOSE US' : 
                 language === 'fr' ? 'POURQUOI NOUS CHOISIR' : 
                 'لماذا تختارنا'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.whyChooseTitle}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.whyChooseSubtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviceBenefits.map((benefit, index) => (
                <div 
                  key={benefit.id} 
                  className="bg-white p-6 rounded-xl shadow-xl flex items-start transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-600 h-16 w-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {benefit.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Success Rate Stats */}
        <section className="py-20 bg-gradient-to-r from-primary-700 to-secondary-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/world-map-dots.svg')] opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4 backdrop-blur-sm">
                {language === 'en' ? 'PROVEN SUCCESS' : 
                 language === 'fr' ? 'SUCCÈS PROUVÉ' : 
                 'نجاح مثبت'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shadow-lg">{t.statsTitle}</h2>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">{t.statsSubtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:translate-y-[-10px]">
                <div className="text-5xl md:text-6xl font-bold mb-2 text-shadow-lg">98%</div>
                <p className="text-xl">{t.approvalRate}</p>
              </div>
              
              <div className="p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:translate-y-[-10px]">
                <div className="text-5xl md:text-6xl font-bold mb-2 text-shadow-lg">5,000+</div>
                <p className="text-xl">{t.applicationsProcessed}</p>
              </div>
              
              <div className="p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transform transition-all duration-300 hover:translate-y-[-10px]">
                <div className="text-5xl md:text-6xl font-bold mb-2 text-shadow-lg">50+</div>
                <p className="text-xl">{t.countriesCovered}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 slide-in-bottom">
              <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
                {language === 'en' ? 'TESTIMONIALS' : 
                 language === 'fr' ? 'TÉMOIGNAGES' : 
                 'الشهادات'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.testimonialsTitle}</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.testimonialsSubtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="bg-gray-50 p-8 rounded-xl shadow-xl relative group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-400 to-secondary-500 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></div>
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-full overflow-hidden mr-4 ring-4 ring-primary-100">
                      <Image src={testimonial.image} alt={testimonial.name} width={64} height={64} className="object-cover h-full w-full" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                  <svg className="h-8 w-8 text-primary-200 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-600 mb-6 italic">"{ testimonial.quote }"</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary-700 to-secondary-600 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-shadow-lg">{t.ctaTitle}</h2>
              <p className="text-xl mb-10 text-primary-100">{t.ctaSubtitle}</p>
              <Link 
                href="/#booking-form" 
                className="btn bg-white text-primary-600 hover:bg-gray-100 text-lg px-10 py-4 rounded-full inline-flex items-center font-medium shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
              >
                {t.startApplication}
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        
        <Footer language={language} />
      </main>
    </div>
  );
} 