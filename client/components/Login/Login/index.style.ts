import styled from '@emotion/styled';
import { displayCenter, boxStyle, displayColumn } from '../../../styles/mixin';
import COLORS from '../../../styles/color';

export const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  ${displayColumn}
  align-items: left;
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
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
  }
  button {
    margin-bottom: 15px;
    width: 75%;
  }
`;

export const Title = styled.div`
  font-size: 28px;
  margin-bottom: 20px;
`;

export const FindAccount = styled.div`
  ${displayCenter}
  a {
    margin: 5px;
    text-decoration: none;
    color: ${COLORS.BLACK};
    &:focus-within {
      font-weight: bold;
    }
  }
`;

export const SignUp = styled.div`
  width: 80%;
  margin: 5%;
  display: flex;
  justify-content: space-evenly;
  a {
    text-decoration: none;
    color: ${COLORS.BLACK};
    &:focus-within {
      font-weight: bold;
    }
  }
`;
