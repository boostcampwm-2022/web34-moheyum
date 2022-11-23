import React from 'react';
import Frame from '../styles/frame';
import MainSection from '../components/Main/Mainsection';
import SideBar from '../components/Main/SideBar';
import AuthGuard from '../components/AuthGuard';

export default function myAccount() {
  return (
    <AuthGuard>
      <Frame>
        <SideBar />
        <MainSection />
      </Frame>
    </AuthGuard>
  );
}
