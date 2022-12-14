import React, { ChangeEvent, useEffect, useState } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { httpGet, httpPost } from '../../utils/http';
import getByteLength from '../../utils/getByteLength';
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
  SignupVerifyMessage,
  SubmitButton,
} from './index.style';
import useToast from '../../hooks/useToast';

// 페이지 변경되거나 추가되면 여기도 업데이트 필요.
const urlList = ['signup', 'post', 'notification', 'login', 'myAccount', 'search', 'write', 'idinquiry', 'pwinquiry'];

const schema = yup.object().shape({
  id: yup
    .string()
    .required('아이디를 입력하세요.')
    .matches(/^[a-z|A-Z|0-9|]+$/i, '영어, 숫자만 가능합니다.')
    .max(16, '16자 이내로 입력하세요.')
    .min(4, '4 글자 이상 입력하세요.')
    .test({
      message: '사용할 수 없는 아이디 입니다.',
      test: (value) => urlList.filter((x) => x === value).length === 0,
    }),
  password: yup
    .string()
    .required('비밀번호를 입력하세요.')
    .min(6, '6글자 이상 입력하세요.')
    .max(16, '16자 이내로 입력하세요.'),
  password_confirm: yup
    .string()
    .required('비밀번호 확인을 입력하세요.')
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),

  name: yup
    .string()
    .required('닉네임을 입력하세요.')
    .matches(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/i, '영어, 숫자, 한글만 가능합니다.')
    .test({
      message: '16바이트 이내로 입력 가능합니다.',
      test: (value) => getByteLength(value as string) <= 16,
    }),
});

export default function SignupModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [errorMessages, setErrorMessages] = useState({
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

  const toast = useToast();
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
    if (target.name === 'email') {
      if (timer > 0 || verified) {
        toast.addMessage('이메일이 변경되어 재인증이 필요합니다.');
        setTimer(1);
        setVerified(false);
      }
    }
  };

  const sendEmailCode = async () => {
    if (timer > 0) {
      toast.addMessage('이미 인증이 진행중입니다.');
      return;
    }
    if (verified) {
      toast.addMessage('이미 인증이 완료되었습니다.');
      return;
    }
    if (!formValues.email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]+$/i)) {
      setErrorMessages({ ...errorMessages, email: '유효하지 않은 이메일입니다.' });
      return;
    }
    // 인증 메일을 보내는 로직
    const emailRequestResult = await httpPost('/auth/email-verification', { email: formValues.email });
    if (emailRequestResult.statusCode !== 200) {
      setErrorMessages({ ...errorMessages, email: emailRequestResult.message });
      return;
    }
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

  const verifyEmail = async () => {
    // 이메일 인증 로직
    if (timer < 0) {
      setErrorMessages({
        ...errorMessages,
        verify: '인증 시간이 초과되었습니다.',
      });
      return;
    }
    const emailVerificationResponse = await httpGet(`/auth/email-verification?code=${formValues.verify}`);
    if (emailVerificationResponse.statusCode === 200) {
      setTimer(-1);
      setErrorMessages({
        ...errorMessages,
        email: '',
        verify: '',
      });
      setVerified(true);
    } else {
      setErrorMessages({
        ...errorMessages,
        verify: emailVerificationResponse.message,
      });
    }
  };

  const submitSignup = async () => {
    if (!validateForm()) return;
    setErrorMessages({ email: '', verify: '' });
    // do Signup
    const response = await httpPost('/auth/signup', {
      userid: formValues.id,
      nickname: formValues.name,
      email: formValues.email,
      password: formValues.password,
    });
    if (response.statusCode !== 200) {
      toast.addMessage(
        `오류가 발생했습니다.\nERROR statusCode: ${response.statusCode}\nERROR message: ${response.message}`
      );
      setVerified(false);
      return;
    }
    const signinResponse = await httpPost('/auth/signin', {
      userid: formValues.id,
      password: formValues.password,
    });
    if (signinResponse.statusCode !== 200) {
      toast.addMessage(
        `회원 가입에 성공했으나 로그인에 실패했습니다.\nERROR statusCode: ${signinResponse.statusCode}\nERROR message: ${signinResponse.message}`
      );
      return;
    }
    Router.push('/');
  };

  const validateForm = (): boolean => {
    const newErrorMessage = { email: '' };
    let flag = true;
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

  return (
    <ModalWrapper>
      <ButtonBack onClick={goBack} />
      <ModalHeader>회원가입</ModalHeader>
      <SignupForm onSubmit={handleSubmit(submitSignup)}>
        <SignupRow>
          <FieldName>아이디: </FieldName>
          <FieldContent>
            <MoheyumInputText
              type="text"
              {...register('id')}
              placeholder="아이디"
              onChange={onChangeFields}
              maxLength={16}
            />
          </FieldContent>
        </SignupRow>
        {errors.id && <SignupRowMessage>{errors.id.message as string}</SignupRowMessage>}
        <SignupRow>
          <FieldName>비밀번호: </FieldName>
          <FieldContent>
            <MoheyumInputText
              type="password"
              {...register('password')}
              placeholder="비밀번호"
              onChange={onChangeFields}
              maxLength={16}
            />
          </FieldContent>
        </SignupRow>
        {errors.password && <SignupRowMessage>{errors.password.message as string}</SignupRowMessage>}
        <SignupRow>
          <FieldName>비밀번호 확인: </FieldName>
          <FieldContent>
            <MoheyumInputText
              type="password"
              {...register('password_confirm')}
              placeholder="비밀번호 다시 입력"
              onChange={onChangeFields}
              maxLength={16}
            />
          </FieldContent>
        </SignupRow>
        {errors.password_confirm && <SignupRowMessage>{errors.password_confirm.message as string}</SignupRowMessage>}
        <SignupRow>
          <FieldName>닉네임: </FieldName>
          <FieldContent>
            <MoheyumInputText
              type="text"
              {...register('name')}
              placeholder="닉네임"
              onChange={onChangeFields}
              maxLength={16}
            />
          </FieldContent>
        </SignupRow>
        {errors.name && <SignupRowMessage>{errors.name.message as string}</SignupRowMessage>}
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
        <SignupRow hidden={timer < 0}>
          <FieldName>&nbsp;</FieldName>
          <FieldContent>
            <MoheyumInputText type="text" name="verify" placeholder="인증코드" onChange={onChangeFields} />
            <MoheyumButton type="button" width={60} onClick={verifyEmail}>
              확인
            </MoheyumButton>
          </FieldContent>
        </SignupRow>
        {timer > -1 && <SignupRowMessage>{secToTime(timer)}</SignupRowMessage>}
        {errorMessages.verify && timer > -1 && <SignupVerifyMessage>{errorMessages.verify}</SignupVerifyMessage>}
        <SignupSubmitContainer>
          <SubmitButton type="submit">회원가입</SubmitButton>
        </SignupSubmitContainer>
      </SignupForm>
    </ModalWrapper>
  );
}
