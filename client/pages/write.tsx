import React from 'react';
import AuthGuard from '../components/AuthGuard';
import SideBar from '../components/Main/SideBar';
import EditorWrapper from '../components/Write';
import Frame from '../styles/frame';

export default function write() {
  return (
    <AuthGuard>
      <Frame>
        <SideBar />
        <EditorWrapper />
      </Frame>
    </AuthGuard>
  );
}
