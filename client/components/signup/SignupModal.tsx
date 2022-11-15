import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import COLORS from '../../styles/color';

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

  return (
    <ModalWrapper>
      <ModalHeader>회원가입</ModalHeader>
      <SignupForm>
        <SignupRow>
          <FieldName>아이디: </FieldName>
          <FieldContent>
            <MoheyumInputText type="text" name="id" placeholder="아이디" onChange={onChangeFields} />
          </FieldContent>
        </SignupRow>
        {errorMessages.id && <SighupRowMessage>{errorMessages.id}</SighupRowMessage>}
        <SignupRow>
          <FieldName>비밀번호: </FieldName>
          <FieldContent>
            <MoheyumInputText type="password" name="password" placeholder="비밀번호" onChange={onChangeFields} />
          </FieldContent>
        </SignupRow>
        {errorMessages.password && <SighupRowMessage>{errorMessages.password}</SighupRowMessage>}
        <SignupRow>
          <FieldName>비밀번호 확인: </FieldName>
          <FieldContent>
            <MoheyumInputText
              type="password"
              name="passwordConfirm"
              placeholder="비밀번호 다시 입력"
              onChange={onChangeFields}
            />
          </FieldContent>
        </SignupRow>
        {errorMessages.password_confirm && <SighupRowMessage>{errorMessages.password_confirm}</SighupRowMessage>}
        <SignupRow>
          <FieldName>닉네임: </FieldName>
          <FieldContent>
            <MoheyumInputText type="text" name="name" placeholder="닉네임" onChange={onChangeFields} />
          </FieldContent>
        </SignupRow>
        {errorMessages.name && <SighupRowMessage>{errorMessages.name}</SighupRowMessage>}
        <SignupRow>
          <FieldName>이메일: </FieldName>
          <FieldContent>
            <MoheyumInputText type="text" name="email" placeholder="이메일" onChange={onChangeFields} />
            <MoheyumButton type="button" width={60}>
              인증
            </MoheyumButton>
          </FieldContent>
        </SignupRow>
        {errorMessages.email && <SighupRowMessage>{errorMessages.email}</SighupRowMessage>}
        <SignupRow>
          <FieldName>&nbsp;</FieldName>
          <FieldContent>
            <MoheyumInputText type="text" name="verify" placeholder="인증코드" onChange={onChangeFields} />
            <MoheyumButton type="button" width={60}>
              확인
            </MoheyumButton>
          </FieldContent>
        </SignupRow>
        {errorMessages.verify && <SighupRowMessage>{errorMessages.verify}</SighupRowMessage>}
      </SignupForm>
      <SignupSubmitContainer>
        <MoheyumButton type="button">회원가입</MoheyumButton>
      </SignupSubmitContainer>
    </ModalWrapper>
  );
}

const ModalHeader = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const ModalWrapper = styled.div`
  width: 488px;
  /* height: 606px; */
  background-color: ${COLORS.OFF_WHITE};
  border: 3px solid ${COLORS.PRIMARY_DARK};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const SignupForm = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const SignupRow = styled.li`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15px 0;
`;

const SighupRowMessage = styled.li`
  margin-top: -2px;
  margin-bottom: 10px;
  list-style: none;
  text-align: center;
  font-size: 12px;
  color: ${COLORS.RED};
  font-weight: 600;
`;

const FieldName = styled.div`
  width: 25%;
  text-align: right;
  /* margin-right: 7px; */
`;

const FieldContent = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  padding: 0px 10px;
`;

interface sizeProps {
  width?: number;
  height?: number;
}

const MoheyumInputText = styled.input<sizeProps>`
  box-sizing: border-box;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  ${(props) => props.height && `height: ${props.height}px;`}
  padding: 12px;
  background-color: ${COLORS.WHITE};
  border: 2px solid ${COLORS.PRIMARY_DARK};
  border-radius: 7px;
  transition: all 0.2s ease;
  &:focus {
    outline: 1px solid ${COLORS.PRIMARY_DARK};
  }
  &:placeholder-shown {
    color: ${COLORS.GRAY2};
  }
`;

const MoheyumButton = styled.button<sizeProps>`
  box-sizing: border-box;
  background-color: ${COLORS.PRIMARY};
  border-radius: 5px;
  border: none;
  color: ${COLORS.WHITE};
  margin: 0 10px;
  padding: 10px 0;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  ${(props) => props.height && `height: ${props.height}px;`}

  &:hover {
    background-color: ${COLORS.PRIMARY_DARK};
  }
`;

const SignupSubmitContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
`;
