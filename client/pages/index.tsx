import React from 'react';
import MainSection from '../components/MainSection';
import AuthGuard from '../components/AuthGuard';

export default function Home() {
  return (
    <AuthGuard>
      <MainSection />
    </AuthGuard>
  );
}
