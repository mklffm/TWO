"use client";

import { useState } from 'react';
import { sendReceiptEmail } from '@/lib/emailService';
import { sendAccountConfirmationEmail } from '@/lib/accountEmail';
import Link from 'next/link';

export default function TestEmailPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<any>(null);
  const [emailType, setEmailType] = useState<'receipt' | 'account'>('receipt');
  
  const handleSendTest = async () => {
    if (!email) {
      alert('Please enter an email address');
      return;
    }
    
    setStatus('loading');
    
    try {
      let response;
      
      if (emailType === 'receipt') {
        // Test receipt email
        const testData = {
          fullName: 'Test User',
          email: email,
          phone: '+12345678901',
          nationality: 'USA',
          destination: 'Canada',
          travelDate: '2023-12-25',
          visaType: 'tourist',
          processingTime: 'standard',
          price: 249.99,
          currency: 'USD',
          agencyId: 'TEST001',
          timestamp: new Date().toISOString()
        };
        
        response = await sendReceiptEmail(testData);
      } else {
        // Test account confirmation email
        const testData = {
          firstName: 'Test',
          lastName: 'User',
          email: email,
          timestamp: new Date().toISOString()
        };
        
        response = await sendAccountConfirmationEmail(testData);
      }
      
      setResponse(response);
      setStatus(response.success ? 'success' : 'error');
      
      // Log for debugging
      console.log('Email test response:', response);
      
    } catch (error) {
      console.error('Error testing email:', error);
      setStatus('error');
      setResponse(error instanceof Error ? { message: error.message } : { message: 'Unknown error' });
    }
  };
  
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Email Test Page</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <label className="block mb-2 font-medium">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email address"
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-medium">Email Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={emailType === 'receipt'}
                onChange={() => setEmailType('receipt')}
                className="mr-2"
              />
              Receipt Email
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={emailType === 'account'}
                onChange={() => setEmailType('account')}
                className="mr-2"
              />
              Account Confirmation
            </label>
          </div>
        </div>
        
        <button
          onClick={handleSendTest}
          disabled={status === 'loading'}
          className={`w-full py-3 rounded-lg font-medium ${
            status === 'loading'
              ? 'bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {status === 'loading' ? 'Sending...' : 'Send Test Email'}
        </button>
        
        {status === 'success' && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="font-medium">Email sent successfully!</p>
            <p className="text-sm mt-2">Check your inbox (and spam folder).</p>
            <pre className="mt-4 bg-gray-100 p-3 rounded text-xs overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
        
        {status === 'error' && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
            <p className="font-medium">Failed to send email</p>
            <p className="text-sm mt-2">{response?.message || 'Unknown error occurred'}</p>
            <pre className="mt-4 bg-gray-100 p-3 rounded text-xs overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting Guide</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Make sure you've entered a valid email address</li>
          <li>Check your browser console for detailed error messages</li>
          <li>If emails aren't arriving, check your spam/junk folder</li>
          <li>Verify the Resend API key in the environment variables</li>
          <li>Make sure the API implementation in <code className="bg-gray-200 px-1 rounded">src/app/api/send-email/route.ts</code> is correct</li>
        </ul>
      </div>
      
      <div className="mt-6 text-center">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
} 