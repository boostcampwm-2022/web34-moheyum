import React, { useState, ChangeEvent } from 'react';
import Router from 'next/router';
import { Wrapper, Box, Title, ButtonBack, IdInquiryButton, Description, Input, Top } from './index.style';

export default function Pwinquiry() {
  const goBack = () => {
    Router.back();
  };
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
  });
  const [sendSuccess, setSendSuccess] = useState(false);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleInpuiry = async () => {
    if (!userInfo.email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]+$/i)) {
      alert('이메일 형식에 맞지 않습니다.');
      return;
    }
    const response = await fetch('/api/auth/password-inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: userInfo.email, userid: userInfo.id }),
    });
    switch (response.status) {
      case 422:
        alert(`없는 아이디입니다.${response.status}: ${response.statusText}`);
        break;
      case 404:
        alert(`없는 이메일입니다.${response.status}: ${response.statusText}`);
        break;
      case 200:
        setSendSuccess(true);
        break;
      default:
        alert(`서버 오류. ${response.status}: ${response.statusText}`);
    }
  };
  return (
    <Wrapper>
      <Box>
        <Top>
          <ButtonBack onClick={goBack} />
        </Top>
        {sendSuccess ? (
          <>
            <div style={{ height: '75px' }}>&nbsp;</div>
            <Title>비밀번호 찾기</Title>
            <Description>임시비밀번호를 메일로 전송하였습니다.</Description>
            <div style={{ height: '75px' }}>&nbsp;</div>
          </>
        ) : (
          <>
            <Title>비밀번호 찾기</Title>
            <Description>가입할 때 입력했던 아이디와 이메일 주소를 입력해주세요.</Description>
            <Input placeholder="아이디" name="id" onChange={onChangeInput} />
            <Input placeholder="이메일 주소" name="email" onChange={onChangeInput} />
            <IdInquiryButton onClick={handleInpuiry}>비밀번호 찾기</IdInquiryButton>
          </>
        )}
      </Box>
    </Wrapper>
  );
}
