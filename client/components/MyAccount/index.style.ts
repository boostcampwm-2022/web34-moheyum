import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { buttonStyle, inputStyle, mainSectionStyle } from '../../styles/mixin';

export const Wrapper = styled.div`
  ${mainSectionStyle}
`;

export const ContentBox = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px;
  display: flex;
`;

export const ChangePasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  flex: 1;
  user-select: none;
`;

export const FormField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 0;
`;

export const FormRow = styled.div`
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

export const PasswordInput = styled.input`
  ${inputStyle}
  width: 60%;
`;

export const ErrorMessage = styled.div`
  width: 100%;
  padding-left: calc(25% + 20px);
  color: ${COLORS.RED};
  font-size: 14px;
  font-weight: 500;
  text-align: left;
`;

export const ButtonRow = styled.div`
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

export const DeleteAccountButton = styled.div`
  flex: 1;
  & > button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: ${COLORS.GRAY2};
  }
`;

export const SubmitPassword = styled.button`
  ${buttonStyle}
`;
