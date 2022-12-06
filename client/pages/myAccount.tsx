import React from 'react';
import AuthGuard from '../components/AuthGuard';

export default function myAccount() {
  return (
    <AuthGuard>
      <div>내 계정 정보</div>
    </AuthGuard>
  );
}
