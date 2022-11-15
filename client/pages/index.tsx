import React from 'react';
import Introduction from '../components/Introduction';
import router from 'next/router';
import Login from '../components/Login';
import styled from '@emotion/styled';

const Frame = styled.div`
  background-color: grey;
  width: 1024px;
  height: 100%;
`;
// <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
export default function Home() {
  const isLogin = true;
  if (!isLogin) {
    router.push('/login');
  }
  return (
    // 로그인 여부 체크
    // 로그인 되어 있다면
    // 메인 페이지 라우트
    // 로그인 안되어 있다면
    // 로그인 페이지 라우트
    // 닉네임: 1글자 이상 영어 16글자 특수문자 x
    // 아이디: 4글자 16글자 특수문자 x
    // 비밀번호: 8글자 16글자 특수문자 o
    <Frame></Frame>
  );
}
