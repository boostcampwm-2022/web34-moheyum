import React from 'react';
import Frame from '../../styles/frame';
import SideBar from '../../components/Main/SideBar';
import AuthGuard from '../../components/AuthGuard';
import ProfileEditSection from '../../components/ProfileEdit';

export default function profileEdit() {
  return (
    <AuthGuard>
      <Frame>
        <SideBar />
        <ProfileEditSection />
      </Frame>
    </AuthGuard>
  );
}
