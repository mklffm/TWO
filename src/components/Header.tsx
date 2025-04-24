"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Add type declaration for window.switchLanguage
declare global {
  interface Window {
    switchLanguage: (lang: string) => void;
  }
}

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
    try {
      // First check URL parameters (highest priority)
      const url = new URL(window.location.href);
      const urlLang = url.searchParams.get('lang');
      
      if (urlLang && (urlLang === 'en' || urlLang === 'fr' || urlLang === 'ar')) {
        console.log('Using language from URL parameter:', urlLang);
        setLanguage(urlLang);
        // Save to localStorage for future visits
        localStorage.setItem('language', urlLang);
        return;
      }
      
      // Then check localStorage for saved language preference
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr' || savedLanguage === 'ar')) {
        // Only update if different from current to avoid unnecessary renders
        if (savedLanguage !== language) {
          console.log('Using language from localStorage:', savedLanguage);
          setLanguage(savedLanguage);
        }
      }
    } catch (error) {
      console.error('Error setting initial language:', error);
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
    // Debug log
    console.log('Changing language to:', lang, 'from:', language);
    
    // Save language preference to localStorage for persistence
    localStorage.setItem('language', lang);
    
    // Update the language in the application
    setLanguage(lang);
    
    // Close dropdowns
    setIsLanguageDropdownOpen(false);
    setIsMenuOpen(false);
    
    // Force page rerender with a more reliable approach
    // This helps ensure the change is applied in mobile views
    try {
      // Dispatch storage event for cross-component communication
      window.dispatchEvent(new Event('storage'));
      
      // If we're on a production build (static export), sometimes a reload is needed
      // to ensure all components pick up the language change
      if (window.location.hostname !== 'localhost') {
        // Add lang parameter to URL to ensure reload picks up new language
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        
        // Short timeout to allow state updates to complete
        setTimeout(() => {
          window.location.href = url.toString();
        }, 100);
      }
    } catch (error) {
      console.error('Error applying language change:', error);
    }
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
                        onClick={() => window.switchLanguage('en')}
                        className={`flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left ${language === 'en' ? 'font-bold' : ''}`}
                      >
                        <span className="mr-2">🇬🇧</span> English
                      </button>
                      <button 
                        onClick={() => window.switchLanguage('fr')}
                        className={`flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left ${language === 'fr' ? 'font-bold' : ''}`}
                      >
                        <span className="mr-2">🇫🇷</span> Français
                      </button>
                      <button 
                        onClick={() => window.switchLanguage('ar')}
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
            {/* GUARANTEED TO WORK language switcher */}
            <div className="flex rounded overflow-hidden mr-4 border border-gray-200">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('language', 'en');
                    window.location.href = window.location.pathname + '?lang=en';
                  }
                }}
                className={`px-2 py-1 text-xs font-bold ${language === 'en' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                EN
              </button>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('language', 'fr');
                    window.location.href = window.location.pathname + '?lang=fr';
                  }
                }}
                className={`px-2 py-1 text-xs font-bold ${language === 'fr' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                FR
              </button>
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('language', 'ar');
                    window.location.href = window.location.pathname + '?lang=ar';
                  }
                }}
                className={`px-2 py-1 text-xs font-bold ${language === 'ar' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800'}`}
              >
                AR
              </button>
            </div>
            
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