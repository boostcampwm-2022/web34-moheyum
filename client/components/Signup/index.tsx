import React, { ChangeEvent, useEffect, useState } from 'react';
import Router from 'next/router';
import { httpPost } from '../../utils/http';
import {
  ButtonBack,
  FieldContent,
  FieldName,
  ModalHeader,
  ModalWrapper,
  MoheyumButton,
  MoheyumInputText,
  SignupForm,
  SignupRow,
  SignupRowMessage,
  SignupSubmitContainer,
} from './index.style';

export default function SignupModal() {
  const [errorMessages, setErrorMessages] = useState({
    id: '',
    password: '',
    password_confirm: '',
    name: '',
    email: '',
    verify: '',
  });
  const [formValues, setFormValues] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    verify: '',
  });

  const [startVerify, setStartVerify] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(-1);

  const goBack = () => {
    Router.back();
  };

  const onChangeFields = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    if (formValues.passwordConfirm === formValues.password)
      setErrorMessages({ ...errorMessages, password_confirm: '' });
    else setErrorMessages({ ...errorMessages, password_confirm: '비밀번호가 일치하지 않습니다.' });
  }, [formValues]);

  const sendEmailCode = () => {
    if (!formValues.email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]+$/i)) {
      setErrorMessages({ ...errorMessages, email: '유효하지 않은 이메일입니다.' });
      return;
    }
    // 인증 메일을 보내는 로직
    setStartVerify(true);
    setErrorMessages({ ...errorMessages, email: '', verify: '' });
    setTimer(180);
  };

  // 타이머 구현을 위한 코드들

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer < 0) {
        clearInterval(interval);
        return;
      }
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const secToTime = (time: number): string => {
    const minute = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    return `${minute}:${(time % 60).toString().padStart(2, '0')}`;
  };

  // ===========================================================

  const verifyEmail = () => {
    // 이메일 인증 로직
    if (timer < 0) {
      setErrorMessages({
        ...errorMessages,
        verify: '인증 시간이 초과되었습니다.',
      });
      return;
    }
    setTimer(-1);
    setStartVerify(false);
    setErrorMessages({
      ...errorMessages,
      verify: '',
    });
    setVerified(true);
  };

  const submitSignup = async () => {
    if (!validateForm()) return;
    setErrorMessages({ id: '', password: '', password_confirm: '', name: '', email: '', verify: '' });
    // do Signup
    const response = await httpPost('/api/auth/signup', {
      userid: formValues.id,
      nickname: formValues.name,
      email: formValues.email,
      password: formValues.password,
    });
    console.log(response);
    Router.push('/main');
  };

  const validateForm = (): boolean => {
    const newErrorMessage = { id: '', password: '', password_confirm: '', name: '', email: '' };
    let flag = true;
    if (formValues.id === '') {
      newErrorMessage.id = '아이디를 입력해주세요.';
      flag = false;
    } else if (formValues.id.match(/[^a-z_0-9]/i) || formValues.id.length < 4) {
      newErrorMessage.id = '4~16글자의 영어, 숫자와 _만 가능합니다.';
      flag = false;
    }
    if (formValues.password === '') {
      newErrorMessage.password = '비밀번호를 입력해주세요.';
      flag = false;
    } else if (formValues.password !== formValues.passwordConfirm) {
      newErrorMessage.password_confirm = '비밀번호가 일치하지 않습니다.';
      flag = false;
    }
    if (formValues.name === '') {
      newErrorMessage.name = '닉네임을 입력해주세요.';
      flag = false;
    }
    if (formValues.name.match(/[^a-z_0-9가-힣ㄱ-ㅎㅏ-ㅣ]/i) || getByteLength(formValues.name) > 16) {
      newErrorMessage.name = '16바이트 이내의 영어, 숫자, 한글만 가능합니다.';
    }
    if (formValues.email === '') {
      newErrorMessage.email = '이메일을 입력해주세요.';
      flag = false;
    } else if (!verified) {
      newErrorMessage.email = '이메일 인증을 진행해주세요.';
      flag = false;
    }
    if (!flag) setErrorMessages({ ...errorMessages, ...newErrorMessage });
    return flag;
  };

  const getByteLength = (s: string): number => {
    // 문제 : UTF-8 기준 한글 한 자가 사실은 3바이트였음
    const stringByteLength = s.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1$2').length;
    return stringByteLength;
  };

  return (
    <ModalWrapper>
      <ButtonBack onClick={goBack} />
      <ModalHeader>회원가입</ModalHeader>
      <SignupForm>
        <SignupRow>
          <FieldName>아이디: </FieldName>
          <FieldContent>
            <MoheyumInputText type="text" name="id" placeholder="아이디" onChange={onChangeFields} maxLength={16} />
          </FieldContent>
        </SignupRow>
        {errorMessages.id && <SignupRowMessage>{errorMessages.id}</SignupRowMessage>}
        <SignupRow>
          <FieldName>비밀번호: </FieldName>
          <FieldContent>
            <MoheyumInputText
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={onChangeFields}
              maxLength={16}
            />
          </FieldContent>
        </SignupRow>
        {errorMessages.password && <SignupRowMessage>{errorMessages.password}</SignupRowMessage>}
        <SignupRow>
          <FieldName>비밀번호 확인: </FieldName>
          <FieldContent>
            <MoheyumInputText
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호 다시 입력"
              onChange={onChangeFields}
              maxLength={16}
            />
          </FieldContent>
        </SignupRow>
        {errorMessages.password_confirm && <SignupRowMessage>{errorMessages.password_confirm}</SignupRowMessage>}
        <SignupRow>
          <FieldName>닉네임: </FieldName>
          <FieldContent>
            <MoheyumInputText type="text" name="name" placeholder="닉네임" onChange={onChangeFields} maxLength={16} />
          </FieldContent>
        </SignupRow>
        {errorMessages.name && <SignupRowMessage>{errorMessages.name}</SignupRowMessage>}
        <SignupRow>
          <FieldName>이메일: </FieldName>
          <FieldContent>
            <MoheyumInputText
              type="text"
              name="email"
              placeholder="이메일"
              onChange={onChangeFields}
              disabled={verified}
            />
            <MoheyumButton type="button" width={60} onClick={sendEmailCode}>
              인증
            </MoheyumButton>
          </FieldContent>
        </SignupRow>
        {errorMessages.email && <SignupRowMessage>{errorMessages.email}</SignupRowMessage>}
        <SignupRow hidden={!startVerify}>
          <FieldName>&nbsp;</FieldName>
          <FieldContent>
            <MoheyumInputText type="text" name="verify" placeholder="인증코드" onChange={onChangeFields} />
            <MoheyumButton type="button" width={60} onClick={verifyEmail}>
              확인
            </MoheyumButton>
          </FieldContent>
        </SignupRow>
        {timer > -1 && startVerify && <SignupRowMessage>{secToTime(timer)}</SignupRowMessage>}
        {errorMessages.verify && startVerify && <SignupRowMessage>{errorMessages.verify}</SignupRowMessage>}
      </SignupForm>
      <SignupSubmitContainer>
        <MoheyumButton type="button" onClick={submitSignup}>
          회원가입
        </MoheyumButton>
      </SignupSubmitContainer>
    </ModalWrapper>
  );
}
