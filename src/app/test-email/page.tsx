"use client";

import Link from 'next/link';

export default function EmailFeatureRemovedPage() {
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Email Functionality Removed</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-lg mb-4">The email functionality has been removed from this application.</p>
          <p className="text-gray-600 mb-6">
            All EmailJS integration and email sending capabilities have been disabled as requested.
          </p>
        </div>
        
        <div className="text-center">
          <Link href="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
} 