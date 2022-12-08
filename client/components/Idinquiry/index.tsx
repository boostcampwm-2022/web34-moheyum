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
  EmailInput,
  Top,
  IdInquiryForm,
  EmailRowMessage,
  CompleteBox,
} from './index.style';

const schema = yup.object().shape({
  email: yup.string().required('이메일을 입력하세요.').email('이메일 형식에 맞지 않습니다.'),
});

export default function Idinquiry() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const goBack = () => {
    Router.back();
  };
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserEmail(e.target.value);
  };
  const handleInpuiry = async () => {
    const response = await httpPost('/auth/id-inquiry', { email: userEmail });
    if (response.message !== 'success') {
      alert('아이디를 찾을 수 없습니다.');
      return;
    }
    setUserId(response.data);
  };
  return (
    <Wrapper>
      <Box>
        <Top>
          <ButtonBack onClick={goBack} />
        </Top>
        {userId ? (
          <CompleteBox>
            <Title>아이디</Title>
            <Description>
              가입하신 아이디는 <span>{userId}</span>입니다.
            </Description>
          </CompleteBox>
        ) : (
          <IdInquiryForm onSubmit={handleSubmit(handleInpuiry)}>
            <Title>아이디 찾기</Title>
            <Description>가입할 때 입력했던 이메일 주소를 입력해주세요.</Description>
            <EmailInput placeholder="이메일 주소" {...register('email')} onChange={onChangeEmail} />
            {errors.email && <EmailRowMessage>{errors.email.message as string}</EmailRowMessage>}
            <IdInquiryButton type="submit">아이디 찾기</IdInquiryButton>
          </IdInquiryForm>
        )}
      </Box>
    </Wrapper>
  );
}
