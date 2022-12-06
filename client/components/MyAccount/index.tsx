import React, { FormEvent, useState } from 'react';
import Router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';
import { TopBar, ButtonBack } from '../../styles/common';
import { httpDelete, httpPut } from '../../utils/http';
import {
  ButtonRow,
  ChangePasswordForm,
  ContentBox,
  DeleteAccountButton,
  ErrorMessage,
  FormField,
  FormRow,
  PasswordInput,
  SubmitPassword,
  Wrapper,
} from './index.style';

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

  const deleteAccount = async () => {
    // 이 부분 UI를 어떻게 해야 할까?
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm('회원 탈퇴를 하시겠습니까?\n삭제된 계정은 복구할 수 없습니다.');
    if (confirmed) {
      await httpDelete(`/auth`);
      alert(`탈퇴가 완료되었습니다.\n이용해주셔서 감사합니다.`);
      Router.push('/');
    }
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
            <DeleteAccountButton>
              <button type="button" onClick={deleteAccount}>
                회원 탈퇴
              </button>
            </DeleteAccountButton>
            <span>&nbsp;{errorMessage}</span>
            <SubmitPassword type="submit">변경</SubmitPassword>
          </ButtonRow>
        </ChangePasswordForm>
      </ContentBox>
    </Wrapper>
  );
}
