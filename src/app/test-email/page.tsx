"use client";

import { useState } from 'react';
import { sendReceiptEmail } from '@/lib/emailService';
import Link from 'next/link';

export default function TestEmailPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      alert('Please enter an email address');
      return;
    }
    
    setStatus('sending');
    
    try {
      // Create test data
      const testData = {
        fullName: 'Test User',
        email: email,
        phone: '+213 555 123 456',
        nationality: 'Algerian',
        destination: 'France',
        travelDate: new Date().toISOString().split('T')[0],
        visaType: 'tourist',
        processingTime: 'standard',
        accountType: 'b2c',
        price: 7500,
        formattedPrice: '7,500 DZD',
      };
      
      // Send test email
      const response = await sendReceiptEmail(testData);
      
      // Update result
      setResult(response);
      setStatus(response.success ? 'success' : 'error');
    } catch (error) {
      console.error('Error sending test email:', error);
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
      setStatus('error');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Email Testing Page</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              This will send a test receipt email to the address above and CC to agency (sitekdigital@gmail.com).
            </p>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Test Email'}
            </button>
          </div>
        </form>
        
        {status !== 'idle' && (
          <div className={`mt-6 p-4 rounded-md ${status === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
            <h2 className={`text-lg font-medium ${status === 'success' ? 'text-green-800' : 'text-red-800'}`}>
              {status === 'success' ? 'Email Sent Successfully' : 'Error Sending Email'}
            </h2>
            <pre className="mt-2 text-xs whitespace-pre-wrap overflow-auto max-h-60 bg-white p-2 rounded border">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link 
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 