"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
}

// Header translations
const translations = {
  en: {
    language: "Language",
    home: "Home",
    about: "Requirements",
    services: "Services",
    contact: "Apply",
    getStarted: "Get Started",
    aboutUs: "About Us",
    contactUs: "Contact Us"
  },
  fr: {
    language: "Langue",
    home: "Accueil",
    about: "Conditions",
    services: "Services",
    contact: "Demande",
    getStarted: "Commencer",
    aboutUs: "À Propos",
    contactUs: "Contact"
  },
  ar: {
    language: "اللغة",
    home: "الرئيسية",
    about: "المتطلبات",
    services: "الخدمات",
    contact: "تقديم طلب",
    getStarted: "ابدأ الآن",
    aboutUs: "من نحن",
    contactUs: "اتصل بنا"
  }
};

const Header = ({ language, setLanguage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Check if we're on the homepage
  const isHomePage = pathname === '/';
  
  const t = translations[language as keyof typeof translations] || translations.en;
  
  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Ensure language is properly set on initial load
  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr' || savedLanguage === 'ar')) {
      // Only update if different from current to avoid unnecessary renders
      if (savedLanguage !== language) {
        setLanguage(savedLanguage);
      }
    }
  }, [language, setLanguage]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Close language dropdown when opening menu
    if (!isMenuOpen) {
      setIsLanguageDropdownOpen(false);
    }
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    // Close mobile menu when opening language dropdown
    if (!isLanguageDropdownOpen) {
      setIsMenuOpen(false);
    }
  };

  const changeLanguage = (lang: string) => {
    // Ensure consistent behavior by forcing a specific implementation
    console.log('Changing language to:', lang);
    
    // Save language preference to localStorage for persistence
    localStorage.setItem('language', lang);
    
    // Update the language in the application
    setLanguage(lang);
    
    // Close dropdowns
    setIsLanguageDropdownOpen(false);
    setIsMenuOpen(false);
    
    // Force page rerender if needed
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className={`container mx-auto px-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="font-bold text-xl">
                <span className={`${isScrolled || !isHomePage ? 'text-primary-600' : 'text-white'}`}>Mira</span>
                <span className="bg-gradient-to-r from-primary-600 to-secondary-500 text-transparent bg-clip-text"> Booking</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className={`md:flex items-center ${language === 'ar' ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
              <Link href="/" className={`${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>
                {t.home}
              </Link>
              <Link href="/conditions" className={`${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>
                {t.about}
              </Link>
              <Link href="/about" className={`${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>
                {t.aboutUs}
              </Link>
              <Link href="/services-visa" className={`${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>
                {t.services}
              </Link>
              <Link href="/contact" className={`${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>
                {t.contactUs}
              </Link>
              <Link href="/demande-visa" className={`${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}>
                {t.contact}
              </Link>
              
              {/* Language Selector - Desktop */}
              <div className="relative" ref={languageDropdownRef}>
                <button 
                  onClick={toggleLanguageDropdown}
                  className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1'} ${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}
                >
                  <span>{t.language}</span>
                  <svg className={`w-4 h-4 ${isLanguageDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {isLanguageDropdownOpen && (
                  <div className={`absolute ${language === 'ar' ? 'right-0' : 'left-0'} mt-2 bg-white shadow-lg rounded-md overflow-hidden z-20 min-w-[150px]`}>
                    <div className="py-1">
                      <button 
                        onClick={() => changeLanguage('en')}
                        className={`flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left ${language === 'en' ? 'font-bold' : ''}`}
                      >
                        <span className="mr-2">🇬🇧</span> English
                      </button>
                      <button 
                        onClick={() => changeLanguage('fr')}
                        className={`flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left ${language === 'fr' ? 'font-bold' : ''}`}
                      >
                        <span className="mr-2">🇫🇷</span> Français
                      </button>
                      <button 
                        onClick={() => changeLanguage('ar')}
                        className={`flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left ${language === 'ar' ? 'font-bold' : ''}`}
                      >
                        <span className="mr-2">🇩🇿</span> العربية
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <Link 
              href="/demande-visa" 
              className="bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white px-6 py-2 rounded-full shadow-lg transition-all"
            >
              {t.getStarted}
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleLanguageDropdown}
              className={`${language === 'ar' ? 'ml-4' : 'mr-4'} ${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'} flex items-center`}
              aria-label="Language Selector"
            >
              <span className="mr-1 text-sm font-bold">{language.toUpperCase()}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"></path>
              </svg>
            </button>
            
            {/* Language Dropdown - Mobile - DIRECT LINKS */}
            {isLanguageDropdownOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setIsLanguageDropdownOpen(false)}>
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div 
                  className="bg-white rounded-lg w-64 max-w-full relative z-10"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">{t.language}</h3>
                      <button 
                        onClick={() => setIsLanguageDropdownOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    {/* Direct links with no JavaScript - guaranteed to work */}
                    <a 
                      href="?lang=en"
                      className={`block w-full text-left px-4 py-3 rounded-lg ${language === 'en' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">🇬🇧</span>
                        <span>English</span>
                      </div>
                    </a>
                    
                    <a 
                      href="?lang=fr"
                      className={`block w-full text-left px-4 py-3 rounded-lg ${language === 'fr' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">🇫🇷</span>
                        <span>Français</span>
                      </div>
                    </a>
                    
                    <a 
                      href="?lang=ar"
                      className={`block w-full text-left px-4 py-3 rounded-lg ${language === 'ar' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">🇩🇿</span>
                        <span>العربية</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            <button 
              onClick={toggleMenu}
              className={`${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 inset-x-0 bg-white shadow-lg rounded-b-lg z-30 md:hidden">
            <div className="py-2 divide-y divide-gray-100">
              <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                {t.home}
              </Link>
              <Link href="/conditions" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                {t.about}
              </Link>
              <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                {t.aboutUs}
              </Link>
              <Link href="/services-visa" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                {t.services}
              </Link>
              <Link href="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                {t.contactUs}
              </Link>
              <Link href="/demande-visa" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                {t.contact}
              </Link>
              <div className="p-4">
                <Link 
                  href="/demande-visa" 
                  className="block w-full py-2 px-4 bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-center rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t.getStarted}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 