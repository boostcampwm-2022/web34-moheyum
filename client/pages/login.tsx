import React from 'react';
import Introduction from '../components/login/Introduction';
import Login from '../components/login/Login';
import Frame from '../styles/frame';

export default function login() {
  return (
    <Frame>
      <Introduction />
      <Login />
    </Frame>
  );
}
