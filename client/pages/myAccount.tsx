import React from 'react';
import Frame from '../styles/frame';
import SideBar from '../components/Main/SideBar';
import AuthGuard from '../components/AuthGuard';
import MyAccountSection from '../components/MyAccount';

export default function myAccount() {
  return (
    <AuthGuard>
      <Frame>
        <SideBar />
        <MyAccountSection />
      </Frame>
    </AuthGuard>
  );
}
