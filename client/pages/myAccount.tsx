import React from 'react';
import Frame from '../styles/frame';
import MainSection from '../components/main/mainsection';
import SideBar from '../components/main/sidebar';

export default function myAccount() {
  return (
    <Frame>
      <SideBar />
      <MainSection />
    </Frame>
  );
}
