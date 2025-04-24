"use client";

import { useEffect } from 'react';

// This component uses direct URL manipulation for maximum compatibility
export default function LanguageSwitcher() {
  // Force reload the page with the selected language
  const forceSwitchLanguage = (lang: string) => {
    // Set the language in localStorage
    localStorage.setItem('language', lang);
    
    // Create a new URL with the lang parameter
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    
    // Hard redirect to the new URL
    window.location.href = url.toString();
  };

  // Close the language modal
  const closeModal = () => {
    // Find and remove the modal from the DOM completely
    const modal = document.querySelector('.language-modal');
    if (modal) {
      modal.remove();
    }
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="language-modal fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={closeModal}
      ></div>
      
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-xl w-80 max-w-full relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-medium text-right w-full">اللغة</h3>
          <button 
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Language options */}
        <div className="p-1">
          <button 
            onClick={() => forceSwitchLanguage('en')}
            className="flex items-center w-full text-left p-4 hover:bg-gray-50 border-b"
          >
            <span className="mr-3 text-2xl">🇬🇧</span>
            <span className="text-lg">English</span>
          </button>
          
          <button 
            onClick={() => forceSwitchLanguage('fr')}
            className="flex items-center w-full text-left p-4 hover:bg-gray-50 border-b"
          >
            <span className="mr-3 text-2xl">🇫🇷</span>
            <span className="text-lg">Français</span>
          </button>
          
          <button 
            onClick={() => forceSwitchLanguage('ar')}
            className="flex items-center w-full text-left p-4 hover:bg-gray-50"
          >
            <span className="mr-3 text-2xl">🇩🇿</span>
            <span className="text-lg">العربية</span>
          </button>
        </div>
      </div>
    </div>
  );
} 