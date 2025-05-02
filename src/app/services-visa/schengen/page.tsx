"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SchengenVisaPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/services-visa/schengen/learn-more');
  }, [router]);
  
  return null;
} 