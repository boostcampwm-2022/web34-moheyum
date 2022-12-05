import React from 'react';
import AuthGuard from '../components/AuthGuard';
import EditorWrapper from '../components/Write';

export default function write() {
  return (
    <AuthGuard>
      <EditorWrapper postData={{ _id: '' }} />
    </AuthGuard>
  );
}
