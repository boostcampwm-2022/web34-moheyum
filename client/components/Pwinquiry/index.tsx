import React, { useState, ChangeEvent } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { httpPost } from '../../utils/http';
import {
  Wrapper,
  Box,
  Title,
  ButtonBack,
  IdInquiryButton,
  Description,
  Input,
  Top,
  PwInquiryForm,
  IdRowMessage,
  EmailRowMessage,
  CompleteBox,
} from './index.style';
import useToast from '../../hooks/useToast';

const schema = yup.object().shape({
  id: yup
    .string()
    .required('아이디를 입력하세요.')
    .matches(/^[a-z|A-Z|0-9|]+$/i, '영어, 숫자만 가능합니다.')
    .max(16, '16자 이내로 입력하세요.')
    .min(4, '4 글자 이상 입력하세요.'),
  email: yup.string().required('이메일을 입력하세요.').email('이메일 형식에 맞지 않습니다.'),
});

export default function Pwinquiry() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const toast = useToast();

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
    const response = await httpPost('/auth/password-inquiry', { email: userInfo.email, userid: userInfo.id });
    switch (response.statusCode) {
      case 422:
        toast.addMessage(`없는 아이디입니다.${response.statusCode}: ${response.message}`);
        break;
      case 404:
        toast.addMessage(`없는 이메일입니다.${response.statusCode}: ${response.message}`);
        break;
      case 200:
        setSendSuccess(true);
        break;
      default:
        toast.addMessage(`서버 오류. ${response.statusCode}: ${response.message}`);
    }
  };
  return (
    <Wrapper>
      <Box>
        <Top>
          <ButtonBack onClick={goBack} />
        </Top>
        {sendSuccess ? (
          <CompleteBox>
            <Title>임시 비밀번호 발급</Title>
            <Description>임시비밀번호를 메일로 전송하였습니다.</Description>
          </CompleteBox>
        ) : (
          <PwInquiryForm onSubmit={handleSubmit(handleInpuiry)}>
            <Title>비밀번호 찾기</Title>
            <Description>가입할 때 입력했던 아이디와 이메일 주소를 입력해주세요.</Description>
            <Input placeholder="아이디" {...register('id')} onChange={onChangeInput} />
            {errors.id && <IdRowMessage>{errors.id.message as string}</IdRowMessage>}
            <Input placeholder="이메일 주소" {...register('email')} onChange={onChangeInput} />
            {errors.email && <EmailRowMessage>{errors.email.message as string}</EmailRowMessage>}
            <IdInquiryButton type="submit">비밀번호 찾기</IdInquiryButton>
          </PwInquiryForm>
        )}
      </Box>
    </Wrapper>
  );
}
