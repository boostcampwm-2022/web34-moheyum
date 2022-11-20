import React, { useState, useRef, ChangeEvent, RefObject } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { httpPost } from '../../../utils/http';
import { Box, FindAccount, SignUp, Wrapper, Title } from './index.style';
import COLORS from '../../../styles/color';

function changeBorder(inputRef: RefObject<HTMLInputElement>, color: string) {
  const { current } = inputRef;
  if (current !== null) {
    current.style.borderColor = color;
    current.style.borderWidth = '2px';
  }
}

function isInputExist(
  inputIdRef: RefObject<HTMLInputElement>,
  inputPwRef: RefObject<HTMLInputElement>,
  id: string,
  pw: string
): boolean {
  if (!id) {
    changeBorder(inputIdRef, COLORS.RED);
    return false;
  }
  if (!pw) {
    changeBorder(inputPwRef, COLORS.RED);
    return false;
  }
  return true;
}

export default function Login() {
  const [account, setAccount] = useState({
    id: '',
    pw: '',
  });
  const inputIdRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const inputPwRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
  const onChangeAccount = (e: ChangeEvent<HTMLInputElement>): void => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const doLogin = async () => {
    if (!isInputExist(inputIdRef, inputPwRef, account.id, account.pw)) {
      return;
    }
    try {
      const response = await httpPost('/auth/signin', { userid: account.id, password: account.pw });
      if (response.accessToken) {
        Router.push('/');
      }
      switch (response.statusCode) {
        case 401:
          alert('아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.');
          break;
        case 422:
          alert('입력하신 형식이 맞지 않습니다.\n아이디: 영어,숫자,_ 포함 4~16글자');
          break;
        default:
          alert(`로그인 ERROR statusCode: ${response.statusCode}\nERROR message: ${response.message}`);
      }
    } catch (err) {
      alert(`로그인 실패 ERROR message: ${err as string}`);
      Router.push('/login');
    }
  };

  return (
    <Wrapper>
      <Box>
        <Title>로그인</Title>
        <input type="text" placeholder="아이디를 입력하세요" name="id" ref={inputIdRef} onChange={onChangeAccount} />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          name="pw"
          ref={inputPwRef}
          onChange={onChangeAccount}
        />
        <button type="submit" onClick={doLogin}>
          로그인
        </button>
        <FindAccount>
          <Link href="/idinquiry">아이디 찾기</Link>
          <div>|</div>
          <Link href="/pwinquiry">비밀번호 찾기</Link>
        </FindAccount>
      </Box>
      <SignUp>
        <div>계정이 없으신가요?</div>
        <Link href="/signup">회원가입</Link>
      </SignUp>
    </Wrapper>
  );
}
