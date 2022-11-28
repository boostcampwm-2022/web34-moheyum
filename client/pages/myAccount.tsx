import React from 'react';
import Frame from '../styles/frame';
import SideBar from '../components/Main/SideBar';
import AuthGuard from '../components/AuthGuard';

export default function myAccount() {
  return (
    <AuthGuard>
      <Frame>
        <SideBar />
        <div>내 계정 정보</div>
      </Frame>
    </AuthGuard>
  );
}
