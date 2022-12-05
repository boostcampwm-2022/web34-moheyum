import React from 'react';
import MainSection from '../components/Main/Mainsection';
import AuthGuard from '../components/AuthGuard';

export default function Home() {
  return (
    <AuthGuard>
      <MainSection />
    </AuthGuard>
  );
}
