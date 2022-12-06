import React from 'react';
import AuthGuard from '../../components/AuthGuard';
import ProfileEditSection from '../../components/ProfileEdit';

export default function profileEdit() {
  return (
    <AuthGuard>
      <ProfileEditSection />
    </AuthGuard>
  );
}
