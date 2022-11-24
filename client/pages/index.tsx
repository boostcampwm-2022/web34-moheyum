import React from 'react';
import Frame from '../styles/frame';
import SideBar from '../components/Main/SideBar';
import MainSection from '../components/Main/Mainsection';
import AuthGuard from '../components/AuthGuard';

export default function Home() {
  return (
    <AuthGuard>
      <Frame>
        <SideBar />
        <MainSection />
      </Frame>
    </AuthGuard>
  );
}
