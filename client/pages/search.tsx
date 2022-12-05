import React from 'react';
import AuthGuard from '../components/AuthGuard';
import SearchSection from '../components/Search';

export default function search() {
  return (
    <AuthGuard noRedirect>
      <SearchSection />
    </AuthGuard>
  );
}
