import React, { useEffect } from 'react';
import Router from 'next/router';

export default function Home() {
  useEffect(() => {
    const isLogin = false;
    if (isLogin) {
      Router.push({ pathname: '/main' });
    } else {
      Router.push({ pathname: '/login' });
    }
  }, []);
  return <div />;
}
