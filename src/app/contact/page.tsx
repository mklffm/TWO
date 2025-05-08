"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Page title translations
const pageTitles = {
  en: "Contact Us - Mira Booking",
  fr: "Contactez-Nous - Mira Booking",
  ar: "اتصل بنا - ميرا بوكينج"
};

// Text translations
const translations = {
  en: {
    pageTitle: "Contact Us",
    subtitle: "We're here to help",
    name: "Name",
    email: "Email",
    phone: "Phone",
    subject: "Subject",
    message: "Message",
    send: "Send",
    address: "Constantine, Algeria",
    emailAddress: "mira.booking.visa@gmail.com",
    phoneNumber: "+213 660 885 339 / +213 654 729 019",
    officeHours: "Office Hours: Mon-Fri 9:00 AM - 6:00 PM",
    contactInfo: "Contact Information",
    formTitle: "Send us a message",
    formSubtitle: "We'll respond as soon as possible",
    namePlaceholder: "Enter your full name",
    emailPlaceholder: "Enter your email address",
    phonePlaceholder: "Enter your phone number",
    subjectPlaceholder: "What is your message about?",
    messagePlaceholder: "How can we help you?",
    whatsappMessage: "Chat with us on WhatsApp",
    whatsappButton: "WhatsApp Us"
  },
  fr: {
    pageTitle: "Contactez-Nous",
    subtitle: "Nous sommes là pour vous aider",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    subject: "Sujet",
    message: "Message",
    send: "Envoyer",
    address: "Constantine, Algérie",
    emailAddress: "mira.booking.visa@gmail.com",
    phoneNumber: "+213 660 885 339 / +213 654 729 019",
    officeHours: "Heures d'ouverture: Lun-Ven 9:00 - 18:00",
    contactInfo: "Informations de contact",
    formTitle: "Envoyez-nous un message",
    formSubtitle: "Nous vous répondrons dans les plus brefs délais",
    namePlaceholder: "Entrez votre nom complet",
    emailPlaceholder: "Entrez votre adresse email",
    phonePlaceholder: "Entrez votre numéro de téléphone",
    subjectPlaceholder: "Quel est le sujet de votre message?",
    messagePlaceholder: "Comment pouvons-nous vous aider?",
    whatsappMessage: "Discutez avec nous sur WhatsApp",
    whatsappButton: "WhatsApp"
  },
  ar: {
    pageTitle: "اتصل بنا",
    subtitle: "نحن هنا للمساعدة",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    subject: "الموضوع",
    message: "الرسالة",
    send: "إرسال",
    address: "قسنطينة، الجزائر",
    emailAddress: "mira.booking.visa@gmail.com",
    phoneNumber: "٢١٣٦٦٠٨٨٥٣٣٩+ / ٢١٣٦٥٤٧٢٩٠١٩+",
    officeHours: "ساعات العمل: الاثنين-الجمعة ٩:٠٠ - ١٨:٠٠",
    contactInfo: "معلومات الاتصال",
    formTitle: "أرسل لنا رسالة",
    formSubtitle: "سنرد عليك في أقرب وقت ممكن",
    namePlaceholder: "أدخل اسمك الكامل",
    emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
    phonePlaceholder: "أدخل رقم هاتفك",
    subjectPlaceholder: "ما هو موضوع رسالتك؟",
    messagePlaceholder: "كيف يمكننا مساعدتك؟",
    whatsappMessage: "تحدث معنا على واتساب",
    whatsappButton: "تواصل عبر واتساب"
  }
};

// Google Maps Component
const GoogleMapComponent = () => {
  return (
    <div className="w-full h-[300px] rounded-lg overflow-hidden shadow-md">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102682.55040633759!2d6.5345053!3d36.3654624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f17717c4785627%3A0xc87c8afd8166fb38!2sConstantine%2C%20Algeria!5e0!3m2!1sen!2sus!4v1715015479913!5m2!1sen!2sus" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={false} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location"
        className="rounded-lg"
      ></iframe>
    </div>
  );
};

export default function ContactPage() {
  // Define valid language types
  type LanguageKey = 'en' | 'fr' | 'ar';
  
  // Initialize with null to detect if we've loaded from localStorage yet
  const [language, setLanguage] = useState<LanguageKey | null>(null);
  const t = language ? translations[language] : translations.fr;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
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
  
  // Handle language change from Header component
  const handleLanguageChange = (lang: string) => {
    if (lang === 'en' || lang === 'fr' || lang === 'ar') {
      setLanguage(lang);
    }
  };
  
  // Don't render content until language is loaded from localStorage
  if (language === null) {
    return <div className="min-h-screen"></div>; // Empty container while loading
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would submit the form data to your backend
    console.log('Form submitted:', formData);
    // Show success message
    setFormSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{t.formTitle}</h2>
            <p className="text-gray-600 mb-6">{t.formSubtitle}</p>
            
            {formSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                Your message has been sent. We'll get back to you soon!
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t.name}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{t.phone}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.phonePlaceholder}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">{t.subject}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.subjectPlaceholder}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t.message}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-green-400 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                {t.send}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-600 to-green-400 p-8 rounded-xl text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-6">{t.contactInfo}</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div>
                  <p>{t.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4">
                  <FiMail className="w-6 h-6" />
                </div>
                <div>
                  <p>{t.emailAddress}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div>
                  <p>{t.phoneNumber}</p>
                  <p className="mt-1 text-sm opacity-80">{t.officeHours}</p>
                </div>
              </div>
              
              {/* WhatsApp Button */}
              <div className="pt-4">
                <p className="mb-3 text-sm opacity-90">{t.whatsappMessage}</p>
                <a 
                  href="https://wa.me/213660885339" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>{t.whatsappButton}</span>
                </a>
              </div>
            </div>
            
            <div className="mt-12">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <GoogleMapComponent />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer language={language} />
    </div>
  );
} 