import React from 'react';
import SignupModal from '../components/Signup';
import { SignFrame } from '../styles/frame';

export default function Signup() {
  return (
    <SignFrame>
      <SignupModal />
    </SignFrame>
  );
}
