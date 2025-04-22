import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mira Booking',
  description: 'Visa processing service for global travelers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
} 