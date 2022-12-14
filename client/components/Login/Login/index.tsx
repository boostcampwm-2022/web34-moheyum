import React, { useState, useRef, ChangeEvent, RefObject, KeyboardEvent } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { httpPost } from '../../../utils/http';
import { Box, FindAccount, SignUp, Wrapper, Title } from './index.style';
import COLORS from '../../../styles/color';
import useToast from '../../../hooks/useToast';

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
  const toast = useToast();
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === 'Enter') {
      doLogin();
    }
  };

  const doLogin = async () => {
    if (!isInputExist(inputIdRef, inputPwRef, account.id, account.pw)) {
      return;
    }
    try {
      const response = await httpPost('/auth/signin', { userid: account.id, password: account.pw });
      if (response.message === 'success') {
        let returnUrl = Router.query.returnUrl || '/';
        if (Array.isArray(returnUrl)) [returnUrl] = [...returnUrl];
        Router.push(returnUrl);
        return;
      }
      switch (response.statusCode) {
        case 401:
          toast.addMessage('????????? ?????? ??????????????? ?????? ??????????????????.\n???????????? ????????? ?????? ??????????????????.');
          break;
        case 422:
          toast.addMessage('???????????? ????????? ?????? ????????????.\n?????????: ??????,??????,_ ?????? 4~16??????');
          break;
        default:
          toast.addMessage(`????????? ERROR statusCode: ${response.statusCode}\nERROR message: ${response.message}`);
      }
    } catch (err) {
      toast.addMessage(`????????? ?????? ERROR message: ${err as string}`);
      Router.push('/login');
    }
  };

  return (
    <Wrapper>
      <Box>
        <Title>?????????</Title>
        <input type="text" placeholder="???????????? ???????????????" name="id" ref={inputIdRef} onChange={onChangeAccount} />
        <input
          type="password"
          placeholder="??????????????? ???????????????"
          name="pw"
          ref={inputPwRef}
          onChange={onChangeAccount}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" onClick={doLogin}>
          ?????????
        </button>
        <FindAccount>
          <Link href="/idinquiry">????????? ??????</Link>
          <div>|</div>
          <Link href="/pwinquiry">???????????? ??????</Link>
        </FindAccount>
      </Box>
      <SignUp>
        <div>????????? ????????????????</div>
        <div>
          <Link href="/signup">????????????</Link>
        </div>
      </SignUp>
    </Wrapper>
  );
}
