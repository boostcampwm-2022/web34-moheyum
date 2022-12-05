import React from 'react';
import Frame from '../styles/frame';
import SideBar from '../components/Main/SideBar';
import AuthGuard from '../components/AuthGuard';
import SearchSection from '../components/Search';

export default function search() {
  return (
    <AuthGuard noRedirect>
      <Frame>
        <SideBar />
        <SearchSection />
      </Frame>
    </AuthGuard>
  );
}
