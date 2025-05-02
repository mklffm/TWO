"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from './Logo';

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
    contactUs: "Contact Us",
    login: "Login",
    createAccount: "Sign Up",
    myProfile: "My Profile",
    dashboard: "Dashboard",
    logout: "Logout"
  },
  fr: {
    language: "Langue",
    home: "Accueil",
    about: "Conditions",
    services: "Services",
    contact: "Demande",
    getStarted: "Commencer",
    aboutUs: "À Propos",
    contactUs: "Contact",
    login: "Connexion",
    createAccount: "Inscription",
    myProfile: "Mon Profil",
    dashboard: "Tableau de Bord",
    logout: "Déconnexion"
  },
  ar: {
    language: "اللغة",
    home: "الرئيسية",
    about: "المتطلبات",
    services: "الخدمات",
    contact: "تقديم طلب",
    getStarted: "ابدأ الآن",
    aboutUs: "من نحن",
    contactUs: "اتصل بنا",
    login: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    myProfile: "ملفي الشخصي",
    dashboard: "لوحة التحكم",
    logout: "تسجيل الخروج"
  }
};

const Header = ({ language, setLanguage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
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
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Parse the JWT token to get user info (simple approach, no validation)
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const payload = JSON.parse(window.atob(base64));
          
          // Set user name from token if available
          if (payload.firstName && payload.lastName) {
            setUserName(`${payload.firstName} ${payload.lastName}`);
          } else if (payload.email) {
            setUserName(payload.email.split('@')[0]);
          } else {
            setUserName('User');
          }
          
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Invalid token:', error);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkAuth();
    
    // Listen for storage events (for logout from other tabs)
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    // Close other dropdowns
    setIsLanguageDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    // Redirect to home page
    window.location.href = '/';
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
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'bg-white shadow-md' : 'bg-gradient-to-b from-black/50 to-transparent'}`}>
      <div className={`container mx-auto px-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <div className="flex-shrink-0 w-[120px]">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/mira-logo.png" 
                alt="Mira Booking Logo" 
                width={100} 
                height={35} 
                className="object-contain" 
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center space-x-6">
              <Link href="/" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors font-medium text-base`}>
                Accueil
              </Link>
              <Link href="/conditions" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors font-medium text-base`}>
                Conditions
              </Link>
              <Link href="/about" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors font-medium text-base`}>
                À Propos
              </Link>
              <Link href="/services-visa" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors font-medium text-base`}>
                Services
              </Link>
              <Link href="/contact" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors font-medium text-base`}>
                Contact
              </Link>
              <Link href="/demande-visa" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors font-medium text-base`}>
                Demande
              </Link>
              
              {/* Language Selector - Desktop */}
              <div className="relative ml-3" ref={languageDropdownRef}>
                <button 
                  onClick={toggleLanguageDropdown}
                  className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : ''} ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors font-medium`}
                >
                  <span className="mr-1">Langue</span>
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
            
            {/* Auth buttons or user menu */}
            <div className="ml-8">
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={toggleUserMenu}
                    className={`flex items-center gap-2 ${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors`}
                  >
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:inline">{userName}</span>
                    <svg className={`w-4 h-4 ${isUserMenuOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className={`absolute ${language === 'ar' ? 'right-0' : 'left-0'} mt-2 bg-white shadow-lg rounded-md overflow-hidden z-20 min-w-[200px]`}>
                      <div className="py-1">
                        <Link 
                          href="/profile" 
                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          Mon Profil
                        </Link>
                        <Link 
                          href="/dashboard" 
                          className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                          </svg>
                          Tableau de Bord
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                          </svg>
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary-600 transition-colors font-medium`}>
                    Connexion
                  </Link>
                  <Link 
                    href="/create-account" 
                    className="bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white px-5 py-2 rounded-full shadow-sm transition-all font-medium"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {/* Language switcher for mobile */}
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
              className={`${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'} p-2 rounded-md hover:bg-white/10`}
              aria-label="Toggle menu"
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
          <div className="absolute top-20 inset-x-0 bg-white shadow-lg rounded-b-lg z-30 md:hidden">
            <div className="py-2 divide-y divide-gray-100">
              <Link href="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                Accueil
              </Link>
              <Link href="/conditions" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                Conditions
              </Link>
              <Link href="/about" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                À Propos
              </Link>
              <Link href="/services-visa" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link href="/contact" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <Link href="/demande-visa" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                Demande
              </Link>
              
              {/* Mobile auth links */}
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                    Mon Profil
                  </Link>
                  <Link href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                    Tableau de Bord
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                    Connexion
                  </Link>
                  <Link href="/create-account" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                    Inscription
                  </Link>
                </>
              )}
              
              <div className="p-4">
                <Link 
                  href="/demande-visa" 
                  className="block w-full py-2 px-4 bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-center rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Commencer
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