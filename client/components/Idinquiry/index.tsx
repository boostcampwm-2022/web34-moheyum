import React from 'react';
import Router from 'next/router';
import { Wrapper, Box, Title, ButtonBack, IdInquiryButton, Description, EmailInput } from './index.style';

export default function Idinquiry() {
  const goBack = () => {
    Router.back();
  };
  return (
    <Wrapper>
      <Box>
        <ButtonBack onClick={goBack} />
        <Title>아이디 찾기</Title>
        <Description>가입할 때 입력했던 이메일 주소를 입력해주세요.</Description>
        <EmailInput placeholder="이메일 주소"></EmailInput>
        <IdInquiryButton>아이디 찾기</IdInquiryButton>
      </Box>
    </Wrapper>
  );
}
