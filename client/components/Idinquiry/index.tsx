import React, { useState, ChangeEvent } from 'react';
import Router from 'next/router';
import { Wrapper, Box, Title, ButtonBack, IdInquiryButton, Description, EmailInput, Top } from './index.style';

export default function Idinquiry() {
  const goBack = () => {
    Router.back();
  };
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserEmail(e.target.value);
  };
  const handleInpuiry = async () => {
    if (!userEmail.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]+$/i)) {
      alert('이메일 형식에 맞지 않습니다.');
      return;
    }
    const response = await fetch('/api/auth/id-inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email: userEmail }),
    });
    const userData = await response.json();
    if (userData.message !== 'success') {
      alert('아이디를 찾을 수 없습니다.');
      return;
    }
    setUserId(userData.data);
  };
  return (
    <Wrapper>
      <Box>
        <Top>
          <ButtonBack onClick={goBack} />
        </Top>
        {userId ? (
          <>
            <div style={{ height: '50px' }}>&nbsp;</div>
            <Title>아이디 찾기</Title>
            <Description>
              가입하신 아이디는 <span>{userId}입니다.</span>
            </Description>
            <div style={{ height: '50px' }}>&nbsp;</div>
          </>
        ) : (
          <>
            <Title>아이디 찾기</Title>
            <Description>가입할 때 입력했던 이메일 주소를 입력해주세요.</Description>
            <EmailInput placeholder="이메일 주소" name="userEmail" onChange={onChangeEmail} />
            <IdInquiryButton onClick={handleInpuiry}>아이디 찾기</IdInquiryButton>
          </>
        )}
      </Box>
    </Wrapper>
  );
}
