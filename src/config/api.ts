/**
 * API Configuration for Mira Booking
 * 
 * This file provides centralized API endpoint configuration with environment detection
 */

// Determine if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Determine the current environment
const isProduction = isBrowser && (
  window.location.hostname === 'www.mirabooking.com' || 
  window.location.hostname === 'mirabooking.com' ||
  window.location.hostname.endsWith('mira-booking.pages.dev')
);

// Primary and fallback API URLs
const PRIMARY_PRODUCTION_API = 'https://mira-booking-backend.khalfaouimanar28.workers.dev';
const FALLBACK_PRODUCTION_API = 'https://mira-backend.pages.dev'; // Add a fallback if you have one

// Set API base URLs based on environment
export const API_BASE_URL = isProduction 
  ? PRIMARY_PRODUCTION_API
  : 'http://127.0.0.1:8787';

// Helper function to switch to fallback API if primary fails
export const useFallbackApi = () => {
  if (isProduction && API_BASE_URL === PRIMARY_PRODUCTION_API) {
    console.log('Switching to fallback API URL');
    return FALLBACK_PRODUCTION_API;
  }
  return API_BASE_URL;
};

// Auth endpoints
export const AUTH_API = {
  BASE: `${API_BASE_URL}/api/auth`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  PROFILE: `${API_BASE_URL}/api/auth/profile`,
};

// Booking endpoints
export const BOOKING_API = {
  BASE: `${API_BASE_URL}/api/bookings`,
  LIST: `${API_BASE_URL}/api/bookings`,
  CREATE: `${API_BASE_URL}/api/bookings/create`,
  DETAILS: (id: string) => `${API_BASE_URL}/api/bookings/${id}`,
  UPDATE: (id: string) => `${API_BASE_URL}/api/bookings/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/api/bookings/${id}`,
};

export default {
  API_BASE_URL,
  AUTH_API,
  BOOKING_API,
  useFallbackApi
}; 