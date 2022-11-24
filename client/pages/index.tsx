import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { httpGet } from '../utils/http';
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
