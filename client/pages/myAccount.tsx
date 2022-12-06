import React from 'react';
import AuthGuard from '../components/AuthGuard';
import MyAccount from '../components/MyAccount';

export default function myAccount() {
  return (
    <AuthGuard>
      <MyAccount />
    </AuthGuard>
  );
}
