import React from 'react';
import Introduction from '../components/Introduction';
import Login from '../components/Login';
import Frame from '../styles/frame';

export default function login() {
  return (
    <Frame>
      <Introduction></Introduction>
      <Login></Login>
    </Frame>
  );
}
