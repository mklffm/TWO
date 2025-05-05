"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Page title translations
const pageTitles = {
  en: "About Us - Mira Booking",
  fr: "À Propos de Nous - Mira Booking",
  ar: "معلومات عنا - ميرا بوكينج"
};

// Text translations
const translations = {
  en: {
    pageTitle: "About Us",
    subtitle: "Your Trusted Travel Partner",
    ourStory: "Our Story",
    storyContent: "Founded in 2020, Mira Booking has quickly established itself as a leading visa processing and travel services provider. Our journey began with a simple mission: to make international travel accessible and hassle-free for everyone.",
    ourMission: "Our Mission",
    missionContent: "We are dedicated to simplifying the complex world of visa applications and travel arrangements. By combining technology with personalized service, we ensure that our clients receive the most efficient and reliable assistance for their travel needs.",
    ourValues: "Our Values",
    value1Title: "Excellence",
    value1Content: "We strive for excellence in every service we provide, ensuring the highest quality support for all your travel needs.",
    value2Title: "Integrity",
    value2Content: "We operate with complete transparency and honesty, building trust with our clients through every interaction.",
    value3Title: "Innovation",
    value3Content: "We continuously improve our services through technological advancements and creative solutions to meet evolving travel requirements.",
    whyChooseUs: "Why Choose Mira Booking",
    reason1Title: "Expert Guidance",
    reason1Content: "Our team of visa specialists has extensive experience with various visa types and country-specific requirements.",
    reason2Title: "Personalized Service",
    reason2Content: "We provide tailored support for each client, considering their unique travel circumstances and needs.",
    reason3Title: "Time Efficiency",
    reason3Content: "Our streamlined processes ensure your visa application is completed and submitted in the shortest possible time.",
    ourTeam: "Our Team",
    teamContent: "Behind Mira Booking is a dedicated team of travel enthusiasts and visa experts who are passionate about making your travel dreams a reality. Our multilingual staff is equipped to assist clients from diverse backgrounds.",
    contactUs: "Ready to start your journey? Contact us today!"
  },
  fr: {
    pageTitle: "À Propos de Nous",
    subtitle: "Votre Partenaire de Voyage de Confiance",
    ourStory: "Notre Histoire",
    storyContent: "Fondée en 2020, Mira Booking s'est rapidement imposée comme un fournisseur de premier plan de services de traitement de visa et de voyages. Notre parcours a commencé avec une mission simple : rendre les voyages internationaux accessibles et sans tracas pour tous.",
    ourMission: "Notre Mission",
    missionContent: "Nous nous consacrons à simplifier le monde complexe des demandes de visa et des arrangements de voyage. En combinant la technologie avec un service personnalisé, nous veillons à ce que nos clients reçoivent l'assistance la plus efficace et la plus fiable pour leurs besoins de voyage.",
    ourValues: "Nos Valeurs",
    value1Title: "Excellence",
    value1Content: "Nous visons l'excellence dans chaque service que nous fournissons, assurant un support de la plus haute qualité pour tous vos besoins de voyage.",
    value2Title: "Intégrité",
    value2Content: "Nous opérons avec une transparence et une honnêteté totales, établissant la confiance avec nos clients à travers chaque interaction.",
    value3Title: "Innovation",
    value3Content: "Nous améliorons continuellement nos services grâce à des avancées technologiques et des solutions créatives pour répondre aux exigences de voyage en évolution.",
    whyChooseUs: "Pourquoi Choisir Mira Booking",
    reason1Title: "Conseils d'Experts",
    reason1Content: "Notre équipe de spécialistes des visas possède une vaste expérience avec différents types de visas et les exigences spécifiques à chaque pays.",
    reason2Title: "Service Personnalisé",
    reason2Content: "Nous fournissons un soutien sur mesure pour chaque client, en tenant compte de leurs circonstances et besoins de voyage uniques.",
    reason3Title: "Efficacité Temporelle",
    reason3Content: "Nos processus rationalisés garantissent que votre demande de visa est complétée et soumise dans les plus brefs délais.",
    ourTeam: "Notre Équipe",
    teamContent: "Derrière Mira Booking se trouve une équipe dévouée d'enthousiastes du voyage et d'experts en visa qui sont passionnés par la réalisation de vos rêves de voyage. Notre personnel multilingue est équipé pour aider des clients d'origines diverses.",
    contactUs: "Prêt à commencer votre voyage ? Contactez-nous dès aujourd'hui !"
  },
  ar: {
    pageTitle: "معلومات عنا",
    subtitle: "شريك السفر الموثوق به",
    ourStory: "قصتنا",
    storyContent: "تأسست ميرا بوكينج في عام 2020، وسرعان ما أصبحت مؤسسة رائدة في مجال معالجة التأشيرات وخدمات السفر. بدأت رحلتنا بمهمة بسيطة: جعل السفر الدولي متاحًا وخاليًا من المتاعب للجميع.",
    ourMission: "مهمتنا",
    missionContent: "نحن مكرسون لتبسيط عالم طلبات التأشيرة وترتيبات السفر المعقدة. من خلال الجمع بين التكنولوجيا والخدمة الشخصية، نضمن حصول عملائنا على المساعدة الأكثر كفاءة وموثوقية لاحتياجاتهم في السفر.",
    ourValues: "قيمنا",
    value1Title: "التميز",
    value1Content: "نسعى جاهدين لتحقيق التميز في كل خدمة نقدمها، مما يضمن الدعم عالي الجودة لجميع احتياجات السفر الخاصة بك.",
    value2Title: "النزاهة",
    value2Content: "نعمل بشفافية وصدق كاملين، وبناء الثقة مع عملائنا من خلال كل تفاعل.",
    value3Title: "الابتكار",
    value3Content: "نعمل باستمرار على تحسين خدماتنا من خلال التطورات التكنولوجية والحلول الإبداعية لتلبية متطلبات السفر المتطورة.",
    whyChooseUs: "لماذا تختار ميرا بوكينج",
    reason1Title: "إرشاد الخبراء",
    reason1Content: "فريقنا من متخصصي التأشيرات لديه خبرة واسعة في مختلف أنواع التأشيرات والمتطلبات الخاصة بكل بلد.",
    reason2Title: "خدمة شخصية",
    reason2Content: "نقدم دعمًا مخصصًا لكل عميل، مع مراعاة ظروف واحتياجات السفر الفريدة.",
    reason3Title: "كفاءة الوقت",
    reason3Content: "تضمن عملياتنا المبسطة إكمال طلب التأشيرة الخاص بك وتقديمه في أقصر وقت ممكن.",
    ourTeam: "فريقنا",
    teamContent: "يقف وراء ميرا بوكينج فريق متفاني من عشاق السفر وخبراء التأشيرات المتحمسين لتحقيق أحلام السفر الخاصة بك. موظفونا متعددو اللغات مجهزون لمساعدة العملاء من خلفيات متنوعة.",
    contactUs: "هل أنت مستعد لبدء رحلتك؟ اتصل بنا اليوم!"
  }
};

export default function AboutPage() {
  // Define valid language types
  type LanguageKey = 'en' | 'fr' | 'ar';
  
  // Initialize with null to detect if we've loaded from localStorage yet
  const [language, setLanguage] = useState<LanguageKey | null>(null);
  const t = language ? translations[language] : translations.fr;
  
  // Load saved language preference on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageKey;
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      setLanguage('fr'); // Default to French if no saved preference
    }
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
  
  // Don't render content until language is loaded from localStorage
  if (language === null) {
    return <div className="min-h-screen"></div>; // Empty container while loading
  }
  
  // Handle language change from Header component
  const handleLanguageChange = (lang: string) => {
    if (lang === 'en' || lang === 'fr' || lang === 'ar') {
      setLanguage(lang);
    }
  };
  
  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Header language={language} setLanguage={handleLanguageChange} />
      
      <main className="container mx-auto px-4 py-12 pt-28">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-400 bg-clip-text text-transparent">
            {t.pageTitle}
          </h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>
        
        {/* Our Story Section */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">{t.ourStory}</h2>
                <p className="text-gray-600 mb-6">{t.storyContent}</p>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{t.ourMission}</h3>
                <p className="text-gray-600">{t.missionContent}</p>
              </div>
              <div className="relative min-h-[300px] lg:min-h-full">
                <Image 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000" 
                  alt="About Mira Booking" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">{t.ourValues}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">{t.value1Title}</h3>
              <p className="text-gray-600 text-center">{t.value1Content}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">{t.value2Title}</h3>
              <p className="text-gray-600 text-center">{t.value2Content}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6 mx-auto">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-center text-gray-800">{t.value3Title}</h3>
              <p className="text-gray-600 text-center">{t.value3Content}</p>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-400 rounded-xl shadow-lg overflow-hidden text-white">
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-10 text-center">{t.whyChooseUs}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{t.reason1Title}</h3>
                  <p className="text-white/80 text-center">{t.reason1Content}</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 mb-4 mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{t.reason2Title}</h3>
                  <p className="text-white/80 text-center">{t.reason2Content}</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-600 mb-4 mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{t.reason3Title}</h3>
                  <p className="text-white/80 text-center">{t.reason3Content}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="text-center mb-8">
          <p className="text-xl mb-6">{t.contactUs}</p>
          <a 
            href="/contact" 
            className="inline-block bg-gradient-to-r from-blue-600 to-green-400 text-white px-8 py-3 rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            {translations.en.contactUs.split('?')[0]}?
          </a>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
} 