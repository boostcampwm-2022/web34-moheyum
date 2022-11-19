import React from 'react';
import Frame from '../styles/frame';
import MainSection from '../components/Main/MainSection';
import SideBar from '../components/Main/SideBar';

export default function announce() {
  return (
    <Frame>
      <SideBar />
      <MainSection />
    </Frame>
  );
}
