"use client";

import Link from 'next/link';

interface FooterProps {
  language: string;
}

// Footer translations
const translations = {
  en: {
    companyDesc: "Your trusted partner for memorable travel experiences. We provide the best deals on flights, hotels, and visa services.",
    quickLinks: "Quick Links",
    home: "Home",
    requirements: "Requirements",
    services: "Services",
    applyVisa: "Apply for Visa",
    ourServices: "Our Services",
    visaProcessing: "Visa Processing",
    flightBooking: "Flight Booking",
    hotelBooking: "Hotel Booking",
    travelPackages: "Travel Packages",
    airportTransfers: "Airport Transfers",
    contactInfo: "Contact Info",
    address: "123 Travel Street, Algiers",
    phone: "Phone: +213 660 885 339",
    email: "Email: mira.booking.dz@gmail.com",
    rights: "All rights reserved."
  },
  fr: {
    companyDesc: "Votre partenaire de confiance pour des expériences de voyage mémorables. Nous proposons les meilleures offres sur les vols, hôtels et services de visa.",
    quickLinks: "Liens Rapides",
    home: "Accueil",
    requirements: "Conditions",
    services: "Services",
    applyVisa: "Demande de Visa",
    ourServices: "Nos Services",
    visaProcessing: "Traitement des Visas",
    flightBooking: "Réservation de Vols",
    hotelBooking: "Réservation d'Hôtel",
    travelPackages: "Forfaits Voyage",
    airportTransfers: "Transferts Aéroport",
    contactInfo: "Coordonnées",
    address: "123 Rue du Voyage, Alger",
    phone: "Téléphone: +213 660 885 339",
    email: "Email: mira.booking.dz@gmail.com",
    rights: "Tous droits réservés."
  },
  ar: {
    companyDesc: "شريكك الموثوق لتجارب سفر لا تُنسى. نقدم أفضل العروض على الرحلات الجوية والفنادق وخدمات التأشيرات.",
    quickLinks: "روابط سريعة",
    home: "الرئيسية",
    requirements: "المتطلبات",
    services: "الخدمات",
    applyVisa: "تقديم طلب تأشيرة",
    ourServices: "خدماتنا",
    visaProcessing: "معالجة التأشيرات",
    flightBooking: "حجز الطيران",
    hotelBooking: "حجز الفنادق",
    travelPackages: "باقات السفر",
    airportTransfers: "خدمة توصيل المطار",
    contactInfo: "معلومات الاتصال",
    address: "١٢٣ شارع السفر، الجزائر",
    phone: "هاتف: ٢١٣٦٦٠٨٨٥٣٣٩+",
    email: "البريد الإلكتروني: mira.booking.dz@gmail.com",
    rights: "جميع الحقوق محفوظة."
  }
};

const Footer = ({ language = 'en' }: FooterProps) => {
  const t = translations[language as keyof typeof translations] || translations.en;
  const isRTL = language === 'ar';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className={`container mx-auto px-4 py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Link href="/" className="flex items-start">
                <span className="text-2xl font-bold">
                  <span className="text-primary-500">Mira</span>
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text"> Booking</span>
                </span>
              </Link>
            </div>
            <p className="text-gray-400 mb-6">{t.companyDesc}</p>
            <div className="flex items-center">
              <a href="https://www.instagram.com/mira_booking_dz/" className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white p-3 rounded-full transition-all hover:shadow-lg flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span className={`${isRTL ? 'mr-1' : 'ml-1'} text-sm font-medium`}>@mira_booking_dz</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white border-b border-gray-800 pb-2">{t.quickLinks}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.requirements}
                </Link>
              </li>
              <li>
                <Link href="/services-visa" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.services}
                </Link>
              </li>
              <li>
                <Link href="/demande-visa" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.applyVisa}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white border-b border-gray-800 pb-2">{t.ourServices}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services-visa?tab=visa" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.visaProcessing}
                </Link>
              </li>
              <li>
                <Link href="/services-visa?tab=travel#flights" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.flightBooking}
                </Link>
              </li>
              <li>
                <Link href="/services-visa?tab=travel#hotels" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.hotelBooking}
                </Link>
              </li>
              <li>
                <Link href="/services-visa?tab=travel#packages" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.travelPackages}
                </Link>
              </li>
              <li>
                <Link href="/services-visa?tab=travel#transfers" className="text-gray-400 hover:text-primary-400 transition-colors flex items-center">
                  <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {t.airportTransfers}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white border-b border-gray-800 pb-2">{t.contactInfo}</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start group">
                <div className="bg-gray-800 p-2 rounded-lg mr-3 group-hover:bg-primary-600 transition-all">
                  <svg className="h-5 w-5 text-primary-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="pt-1.5">{t.address}</span>
              </li>
              <li className="flex items-start group">
                <div className="bg-gray-800 p-2 rounded-lg mr-3 group-hover:bg-primary-600 transition-all">
                  <svg className="h-5 w-5 text-primary-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="pt-1.5">{t.phone}</span>
              </li>
              <li className="flex items-start group">
                <div className="bg-gray-800 p-2 rounded-lg mr-3 group-hover:bg-primary-600 transition-all">
                  <svg className="h-5 w-5 text-primary-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="pt-1.5">{t.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800 text-gray-500 text-sm text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
              <Link href="/" className="hover:text-primary-400 transition-colors">{t.home}</Link>
              <Link href="/conditions" className="hover:text-primary-400 transition-colors">{t.requirements}</Link>
              <Link href="/services-visa" className="hover:text-primary-400 transition-colors">{t.services}</Link>
              <Link href="/demande-visa" className="hover:text-primary-400 transition-colors">{t.applyVisa}</Link>
            </div>
            <p>&copy; {currentYear} Mira Booking. {t.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;