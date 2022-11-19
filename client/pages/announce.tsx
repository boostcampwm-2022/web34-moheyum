import React from 'react';
import Frame from '../styles/frame';
import MainSection from '../components/main/MainSection';
import SideBar from '../components/main/SideBar';

export default function announce() {
  return (
    <Frame>
      <SideBar />
      <MainSection />
    </Frame>
  );
}
