'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { AUTH_API, useFallbackApi, useMockAuth } from '@/config/api';
import { mockLogin } from '@/lib/mockAuthService';

// Translations for the login page
const translations = {
  en: {
    pageTitle: "Login to Your Account",
    pageSubtitle: "Welcome back! Please enter your details",
    email: "Email address",
    password: "Password",
    signIn: "Sign in",
    signingIn: "Signing in...",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    createAccount: "Create an account",
    emailPlaceholder: "your@email.com",
    passwordPlaceholder: "••••••••",
    errorInvalidCredentials: "Invalid email or password. Please try again.",
    errorNetwork: "Network error: Failed to connect to the server. Please check your internet connection and try again.",
    errorServerUnavailable: "The server is currently unavailable. Please try again later.",
    errorInvalidResponse: "The server returned an invalid response format. Please try again later.",
    errorGeneric: "An error occurred during login"
  },
  fr: {
    pageTitle: "Connectez-vous à Votre Compte",
    pageSubtitle: "Bienvenue ! Veuillez entrer vos informations",
    email: "Adresse e-mail",
    password: "Mot de passe",
    signIn: "Se connecter",
    signingIn: "Connexion en cours...",
    forgotPassword: "Mot de passe oublié ?",
    noAccount: "Vous n'avez pas de compte ?",
    createAccount: "Créer un compte",
    emailPlaceholder: "votre@email.com",
    passwordPlaceholder: "••••••••",
    errorInvalidCredentials: "Email ou mot de passe invalide. Veuillez réessayer.",
    errorNetwork: "Erreur réseau : Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet et réessayer.",
    errorServerUnavailable: "Le serveur est actuellement indisponible. Veuillez réessayer plus tard.",
    errorInvalidResponse: "Le serveur a renvoyé un format de réponse invalide. Veuillez réessayer plus tard.",
    errorGeneric: "Une erreur s'est produite lors de la connexion"
  },
  ar: {
    pageTitle: "تسجيل الدخول إلى حسابك",
    pageSubtitle: "مرحبًا بعودتك! يرجى إدخال التفاصيل الخاصة بك",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    signIn: "تسجيل الدخول",
    signingIn: "جاري تسجيل الدخول...",
    forgotPassword: "نسيت كلمة المرور؟",
    noAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب",
    emailPlaceholder: "بريدك@الالكتروني.كوم",
    passwordPlaceholder: "••••••••",
    errorInvalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صالحة. يرجى المحاولة مرة أخرى.",
    errorNetwork: "خطأ في الشبكة: فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت لديك وحاول مرة أخرى.",
    errorServerUnavailable: "الخادم غير متاح حاليًا. يرجى المحاولة مرة أخرى لاحقًا.",
    errorInvalidResponse: "أعاد الخادم تنسيق استجابة غير صالح. يرجى المحاولة مرة أخرى لاحقًا.",
    errorGeneric: "حدث خطأ أثناء تسجيل الدخول"
  }
};

// Define valid language types
type LanguageKey = 'en' | 'fr' | 'ar';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<LanguageKey>('fr');
  
  // Get translated content
  const t = translations[language] || translations.fr;
  
  // Handle language changes from the Header component
  const handleLanguageChange = (lang: string) => {
    if (lang === 'en' || lang === 'fr' || lang === 'ar') {
      setLanguage(lang as LanguageKey);
    }
  };
  
  // Get language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'fr', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage as LanguageKey);
    }
  }, []);
  
  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user is typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const { email, password } = formData;

    try {
      // Check if we should use mock authentication
      if (useMockAuth) {
        console.log('Using mock authentication');
        
        try {
          const { token } = await mockLogin(email, password);
          // Store token in localStorage
          localStorage.setItem('token', token);
          console.log('Token stored:', token.substring(0, 10) + '...');
          
          // Trigger a storage event for Header component to detect login
          window.dispatchEvent(new Event('storage'));
          
          // Add small delay before redirect to ensure token is properly stored
          setTimeout(() => {
            router.push('/');
          }, 300);
          
          return;
        } catch (mockError: any) {
          throw new Error(mockError.message || t.errorGeneric);
        }
      }
      
      console.log('Attempting to login with backend API');
      // Use a more direct approach with error handling
      let response;
      let usedFallback = false;
      
      try {
        // Try primary API endpoint
        response = await fetch(AUTH_API.LOGIN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          mode: 'cors',
        });
        
        console.log('Primary login response status:', response.status);
      } catch (fetchError) {
        console.error('Primary fetch error:', fetchError);
        
        // Try fallback API URL if primary fails
        try {
          const fallbackUrl = useFallbackApi() + '/api/auth/login';
          console.log('Using fallback URL:', fallbackUrl);
          
          response = await fetch(fallbackUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            mode: 'cors',
          });
          
          usedFallback = true;
          console.log('Fallback response status:', response.status);
        } catch (fallbackError) {
          console.error('Fallback fetch error:', fallbackError);
          throw new Error(t.errorNetwork);
        }
      }

      // Get the response text
      let textResponse;
      try {
        textResponse = await response.text();
        console.log('Response text:', textResponse);
      } catch (textError) {
        console.error('Error reading response text:', textError);
        throw new Error('Error reading server response');
      }
      
      // Try to parse as JSON if there's content
      let data = {};
      if (textResponse) {
        try {
          data = JSON.parse(textResponse);
          console.log('Parsed response data:', data);
        } catch (parseError) {
          console.error('Invalid JSON response:', textResponse);
          
          // If response contains HTML (like Cloudflare error pages)
          if (textResponse.includes('<html') || textResponse.includes('<!DOCTYPE')) {
            throw new Error(t.errorServerUnavailable);
          }
          
          throw new Error(t.errorInvalidResponse);
        }
      }

      if (!response.ok) {
        // Handle 401 and other specific errors
        if (response.status === 401) {
          throw new Error(t.errorInvalidCredentials);
        }
        
        throw new Error((data as any).error || (data as any).message || t.errorGeneric);
      }

      // Store the token
      if ((data as any).token) {
        localStorage.setItem('token', (data as any).token);
        console.log('Token stored in localStorage');
        
        // Trigger a storage event for Header component to detect login
        window.dispatchEvent(new Event('storage'));
        
        // Add small delay before redirect to ensure token is properly stored
        setTimeout(() => {
          router.push('/');
        }, 300);
      } else {
        throw new Error('Login successful but no authentication token received');
      }
      
    } catch (err: any) {
      setError(err.message || t.errorGeneric);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} setLanguage={handleLanguageChange} />
      
      <div className="pt-16">
        {/* Hero Banner */}
        <div className="relative h-64 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-800/90 to-primary-600/80 z-10"></div>
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1587614313085-5da51cebd8ac?q=80&w=2000"
              alt="Background"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white z-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{t.pageTitle}</h1>
            <p className="text-lg md:text-xl">{t.pageSubtitle}</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t.email}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t.password}
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                    type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                    placeholder={t.passwordPlaceholder}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm pr-10"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="button"
                    className={`absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  )}
                  </button>
                </div>
                <div className="flex items-center justify-end mt-2">
                  <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                      {t.forgotPassword}
                    </Link>
              </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                      <svg className={`animate-spin ${language === 'ar' ? 'ml-3 -mr-1' : '-ml-1 mr-3'} h-5 w-5 text-white`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                      {t.signingIn}
                  </span>
                  ) : (
                    t.signIn
                  )}
              </button>
            </div>
          </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.noAccount}{' '}
                <Link href="/create-account" className="font-medium text-primary-600 hover:text-primary-500">
                  {t.createAccount}
              </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 