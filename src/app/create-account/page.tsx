'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { sendAccountConfirmationEmail, initEmailJS } from '@/lib/emailjsService';
import { AUTH_API, useFallbackApi, useMockAuth } from '@/config/api';
import { mockRegister } from '@/lib/mockAuthService';

// Translations for the create account page
const translations = {
  en: {
    pageTitle: "Create Your Account",
    pageSubtitle: "Join us to start booking your visa services",
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    password: "Password",
    confirmPassword: "Confirm password",
    signUp: "Sign up",
    signingUp: "Signing up...",
    haveAccount: "Already have an account?",
    signIn: "Sign in",
    firstNamePlaceholder: "John",
    lastNamePlaceholder: "Doe",
    emailPlaceholder: "your@email.com",
    passwordPlaceholder: "••••••••",
    confirmPlaceholder: "••••••••",
    passwordRequirements: "Password must be at least 6 characters long",
    errorPasswordMatch: "Passwords do not match",
    errorPasswordLength: "Password must be at least 6 characters long",
    errorEmailUsed: "This email is already registered. Please try logging in or use a different email.",
    errorNetwork: "Network error: Failed to connect to the server. Please check your internet connection and try again.",
    errorServerUnavailable: "The server is currently unavailable. Please try again later.",
    errorInvalidResponse: "The server returned an invalid response format. Please try again later.",
    errorGeneric: "An error occurred during registration"
  },
  fr: {
    pageTitle: "Créez Votre Compte",
    pageSubtitle: "Rejoignez-nous pour commencer à réserver vos services de visa",
    firstName: "Prénom",
    lastName: "Nom",
    email: "Adresse e-mail",
    password: "Mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    signUp: "S'inscrire",
    signingUp: "Inscription en cours...",
    haveAccount: "Vous avez déjà un compte ?",
    signIn: "Se connecter",
    firstNamePlaceholder: "John",
    lastNamePlaceholder: "Doe",
    emailPlaceholder: "votre@email.com",
    passwordPlaceholder: "••••••••",
    confirmPlaceholder: "••••••••",
    passwordRequirements: "Le mot de passe doit contenir au moins 6 caractères",
    errorPasswordMatch: "Les mots de passe ne correspondent pas",
    errorPasswordLength: "Le mot de passe doit contenir au moins 6 caractères",
    errorEmailUsed: "Cet e-mail est déjà enregistré. Veuillez vous connecter ou utiliser un autre e-mail.",
    errorNetwork: "Erreur réseau : Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet et réessayer.",
    errorServerUnavailable: "Le serveur est actuellement indisponible. Veuillez réessayer plus tard.",
    errorInvalidResponse: "Le serveur a renvoyé un format de réponse invalide. Veuillez réessayer plus tard.",
    errorGeneric: "Une erreur s'est produite lors de l'inscription"
  },
  ar: {
    pageTitle: "إنشاء حسابك",
    pageSubtitle: "انضم إلينا لبدء حجز خدمات التأشيرة الخاصة بك",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    signUp: "التسجيل",
    signingUp: "جاري التسجيل...",
    haveAccount: "هل لديك حساب بالفعل؟",
    signIn: "تسجيل الدخول",
    firstNamePlaceholder: "John",
    lastNamePlaceholder: "Doe",
    emailPlaceholder: "بريدك@الالكتروني.كوم",
    passwordPlaceholder: "••••••••",
    confirmPlaceholder: "••••••••",
    passwordRequirements: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
    errorPasswordMatch: "كلمات المرور غير متطابقة",
    errorPasswordLength: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
    errorEmailUsed: "هذا البريد الإلكتروني مسجل بالفعل. يرجى محاولة تسجيل الدخول أو استخدام بريد إلكتروني مختلف.",
    errorNetwork: "خطأ في الشبكة: فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت لديك وحاول مرة أخرى.",
    errorServerUnavailable: "الخادم غير متاح حاليًا. يرجى المحاولة مرة أخرى لاحقًا.",
    errorInvalidResponse: "أعاد الخادم تنسيق استجابة غير صالح. يرجى المحاولة مرة أخرى لاحقًا.",
    errorGeneric: "حدث خطأ أثناء التسجيل"
  }
};

// Define valid language types
type LanguageKey = 'en' | 'fr' | 'ar';

export default function CreateAccount() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  // Initialize EmailJS when component mounts
  useEffect(() => {
    initEmailJS();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing again
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError(t.errorPasswordMatch);
      setLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError(t.errorPasswordLength);
      setLoading(false);
      return;
    }

    try {
      // Check if we should use mock auth
      if (useMockAuth) {
        console.log('Using mock authentication for registration');
        try {
          const { token } = await mockRegister(
            formData.firstName,
            formData.lastName,
            formData.email,
            formData.password
          );
          
          // Store token in localStorage
          localStorage.setItem('token', token);
          console.log('Token stored in localStorage');
          
          // Send confirmation email
          try {
            await sendAccountConfirmationEmail({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              timestamp: new Date().toISOString()
            });
            console.log('Confirmation email sent');
          } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            // Don't fail registration if email fails
          }
          
          // Trigger a storage event for Header component to detect login
          window.dispatchEvent(new Event('storage'));
          console.log('Storage event dispatched');
          
          // Add small delay before redirect to ensure token is properly stored
          setTimeout(() => {
            console.log('Redirecting to dashboard...');
            router.push('/');
          }, 300);
          
          return;
        } catch (mockError: any) {
          throw new Error(mockError.message || t.errorGeneric);
        }
      }
    
      console.log('Attempting to register user with backend API...');
      // Use a more direct approach with error handling
      let response;
      let usedFallback = false;
      
      try {
        // Add retry logic and better error handling
        console.log('Making registration request to:', AUTH_API.REGISTER);
        response = await fetch(AUTH_API.REGISTER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),
          // Don't use credentials:include when dealing with CORS on different domains
          // as it requires additional server configuration
          mode: 'cors',
        });
        console.log('Fetch response received:', response.status, response.statusText);
      } catch (fetchError) {
        console.error('Primary fetch error:', fetchError);
        
        // Try fallback API URL if primary fails
        try {
          console.log('Attempting fallback API');
          const fallbackUrl = useFallbackApi() + '/api/auth/register';
          console.log('Using fallback URL:', fallbackUrl);
          
          response = await fetch(fallbackUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              password: formData.password,
            }),
            mode: 'cors',
          });
          
          usedFallback = true;
          console.log('Fallback response received:', response.status, response.statusText);
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
        // Handle specific error cases
        if ((data as any).error === 'Email already registered') {
          throw new Error(t.errorEmailUsed);
        }
        throw new Error((data as any).error || (data as any).message || t.errorGeneric);
      }

      // Store the token
      if ((data as any).token) {
        localStorage.setItem('token', (data as any).token);
        console.log('Token stored in localStorage:', (data as any).token.substring(0, 10) + '...');
        
        // Send confirmation email
        try {
          await sendAccountConfirmationEmail({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            timestamp: new Date().toISOString()
          });
          console.log('Confirmation email sent');
        } catch (emailError) {
          console.error('Error sending confirmation email:', emailError);
          // Don't fail registration if email fails
        }
        
        // Trigger a storage event for Header component to detect login
        window.dispatchEvent(new Event('storage'));
        console.log('Storage event dispatched');
        
        // Add small delay before redirect to ensure token is properly stored
        setTimeout(() => {
          console.log('Redirecting to dashboard...');
          router.push('/');
        }, 300);
      } else {
        throw new Error('Registration successful but authentication failed. Please try logging in.');
      }
    } catch (err: any) {
      setError(err.message || t.errorGeneric);
      console.error('Registration error:', err);
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
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2000"
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
              <div className={`grid grid-cols-2 gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    {t.firstName}
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                      autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                      placeholder={t.firstNamePlaceholder}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    {t.lastName}
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                      autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                      placeholder={t.lastNamePlaceholder}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>
            </div>

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
                  autoComplete="new-password"
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
                <p className="mt-1 text-xs text-gray-500">{t.passwordRequirements}</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  {t.confirmPassword}
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                    placeholder={t.confirmPlaceholder}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm pr-10"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="button"
                    className={`absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
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
                      {t.signingUp}
                  </span>
                  ) : (
                    t.signUp
                  )}
              </button>
            </div>
          </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t.haveAccount}{' '}
                <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  {t.signIn}
              </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}