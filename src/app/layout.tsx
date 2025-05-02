import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mira Booking',
  description: 'Visa processing service for global travelers',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" 
          rel="stylesheet"
        />
        <Script id="language-handler" strategy="beforeInteractive">
          {`
            (function() {
              try {
                // Check URL parameters first
                const urlParams = new URLSearchParams(window.location.search);
                const langParam = urlParams.get('lang');
                
                if (langParam && ['en', 'fr', 'ar'].includes(langParam)) {
                  // Set language from URL param
                  localStorage.setItem('language', langParam);
                  
                  // Handle RTL for Arabic - ONLY for Arabic
                  if (langParam === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.documentElement.classList.add('rtl');
                  } else {
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.documentElement.classList.remove('rtl');
                  }
                } else {
                  // Check localStorage
                  const savedLanguage = localStorage.getItem('language');
                  // Only set RTL for Arabic
                  if (savedLanguage === 'ar') {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.documentElement.classList.add('rtl');
                  } else {
                    // Ensure LTR for non-Arabic languages
                    document.documentElement.setAttribute('dir', 'ltr');
                    document.documentElement.classList.remove('rtl');
                  }
                }
              } catch (e) {
                console.error('Error in language initialization:', e);
              }
            })();
          `}
        </Script>
        <Script id="language-switcher" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `
          // Language switcher that will definitely work
          window.switchLanguage = function(lang) {
            console.log('Switching language to:', lang);
            localStorage.setItem('language', lang);
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            window.location.href = url.toString();
          }

          // Check for lang parameter on page load
          document.addEventListener('DOMContentLoaded', function() {
            const url = new URL(window.location.href);
            const langParam = url.searchParams.get('lang');
            if (langParam && ['en', 'fr', 'ar'].includes(langParam)) {
              localStorage.setItem('language', langParam);
            }
          });
        `}} />
      </head>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
} 