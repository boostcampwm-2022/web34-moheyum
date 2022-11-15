import React from 'react';
import styled from '@emotion/styled';
import { displayCenter, inputStyle, boxStyle } from '../styles/mixin';
import COLORS from '../styles/color';

export default function Login() {
  return (
    <Wrapper>
      <Box>
        <Title>로그인</Title>
        <input type="text" placeholder="아이디를 입력하세요" />
        <input type="password" placeholder="비밀번호를 입력하세요" />
        <button>로그인</button>
        <button style={{ backgroundColor: COLORS.BLACK }}>LOGIN WITH GITHUB</button>
        <FindAccount>
          <div tabIndex={0}>아이디 찾기</div>
          <div>|</div>
          <div tabIndex={0}>비밀번호 찾기</div>
        </FindAccount>
      </Box>
      <Signin>
        <div>계정이 없으신가요?</div>
        <div tabIndex={0}>회원가입</div>
      </Signin>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: left;
`;

const Box = styled.div`
  width: 90%;
  height: 337px;
  ${boxStyle}
  input {
    margin-bottom: 15px;
    width: 70%;
    height: 10%;
    font-size: 15px;
  }
  button {
    margin-bottom: 15px;
    width: 73%;
    height: 12%;
    font-size: 16px;
  }
`;

const Title = styled.div`
  font-size: 36px;
  margin-top: 8%;
  margin-bottom: 1%;
`;

const FindAccount = styled.div`
  ${displayCenter}
  div {
    margin: 5px;
  }
  margin-bottom: 5%;
`;

const Signin = styled.div`
  width: 80%;
  margin: 5%;
  display: flex;
  justify-content: space-evenly;
`;
