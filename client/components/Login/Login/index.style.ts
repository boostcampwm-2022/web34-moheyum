import styled from '@emotion/styled';
import { displayCenter, boxStyle, displayColumn } from '../../../styles/mixin';
import COLORS from '../../../styles/color';

export const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  ${displayColumn}
  align-items: left;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: 400px;
    align-items: center;
  }
`;

export const Box = styled.div`
  width: 400px;
  height: 337px;
  ${boxStyle}
  input {
    margin-bottom: 15px;
    width: 75%;
    height: 33px;
  }
  button {
    margin-bottom: 15px;
    width: 75%;
    height: 33px;
  }
`;

export const Title = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
`;

export const FindAccount = styled.div`
  ${displayCenter}
  font-size: 14px;
  a {
    margin: 10px;
    text-decoration: none;
    color: ${COLORS.BLACK};
    &:focus-within {
      font-weight: bold;
    }
  }
`;

export const SignUp = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  div {
    margin: 10px;
  }
  a {
    text-decoration: none;
    color: ${COLORS.BLACK};
    &:focus-within {
      font-weight: bold;
    }
  }
`;
