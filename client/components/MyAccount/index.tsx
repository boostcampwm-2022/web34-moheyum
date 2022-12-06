import React, { FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import Router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { buttonStyle, inputStyle, mainSectionStyle } from '../../styles/mixin';
import { TopBar, ButtonBack } from '../../styles/common';
import COLORS from '../../styles/color';
import { httpPut } from '../../utils/http';

const goBack = () => {
  Router.back();
};

const schema = yup.object().shape({
  prevPassword: yup
    .string()
    .required('이전 비밀번호를 입력하세요.')
    .min(6, '6글자 이상 입력하세요.')
    .max(16, '16자 이내로 입력하세요.'),
  newPassword: yup
    .string()
    .required('새 비밀번호를 입력하세요.')
    .min(6, '6글자 이상 입력하세요.')
    .max(16, '16자 이내로 입력하세요.'),
  confirm: yup
    .string()
    .required('새 비밀번호를 한번 더 입력하세요.')
    .oneOf([yup.ref('newPassword'), null], '새 비밀번호를 정확히 입력하세요.'),
});

export default function MyAccount() {
  const [formInput, setFormInput] = useState({
    prevPassword: '',
    newPassword: '',
    confirm: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const inputHandler = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    setFormInput({
      ...formInput,
      [target.name]: target.value,
    });
  };

  const pwSubmit = async () => {
    const result = await httpPut(`/user/password`, formInput);
    if (result.success === 'false') {
      setErrorMessage(result.message);
      return;
    }
    Router.push('/');
  };

  return (
    <Wrapper>
      <TopBar>
        <div>
          <ButtonBack type="button" onClick={goBack} />
        </div>
        <h1>내 계정</h1>
      </TopBar>
      <ContentBox>
        <ChangePasswordForm onSubmit={handleSubmit(pwSubmit)}>
          <FormField>
            <FormRow>
              <div>현재 비밀번호 : </div>
              <PasswordInput type="password" {...register('prevPassword')} onInput={inputHandler} />
            </FormRow>
            <ErrorMessage>&nbsp;{errors.prevPassword?.message as string}</ErrorMessage>
          </FormField>
          <FormField>
            <FormRow>
              <div>새 비밀번호 : </div>
              <PasswordInput type="password" {...register('newPassword')} onInput={inputHandler} />
            </FormRow>
            <ErrorMessage>&nbsp;{errors.newPassword?.message as string}</ErrorMessage>
          </FormField>
          <FormField>
            <FormRow>
              <div>새 비밀번호 확인 : </div>
              <PasswordInput type="password" {...register('confirm')} onInput={inputHandler} />
            </FormRow>
            <ErrorMessage>&nbsp;{errors.confirm?.message as string}</ErrorMessage>
          </FormField>
          <ButtonRow>
            <span>&nbsp;{errorMessage}</span>
            <SubmitPassword type="submit">변경</SubmitPassword>
          </ButtonRow>
        </ChangePasswordForm>
      </ContentBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${mainSectionStyle}
`;

const ContentBox = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px;
  display: flex;
`;

const ChangePasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  flex: 1;
`;

const FormField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 0;
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  & > div {
    margin-right: 20px;
    width: 25%;
    text-align: right;
  }
`;

const PasswordInput = styled.input`
  ${inputStyle}
  width: 60%;
`;

const ErrorMessage = styled.div`
  width: 100%;
  padding-left: calc(25% + 20px);
  color: ${COLORS.RED};
  font-size: 14px;
  font-weight: 500;
  text-align: left;
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  & > span {
    color: ${COLORS.RED};
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    margin-right: 10px;
  }
`;

const SubmitPassword = styled.button`
  ${buttonStyle}
`;
