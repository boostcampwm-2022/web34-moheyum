import { css } from '@emotion/react';
import COLORS from './color';

export const displayCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const displayColumn = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const inputStyle = css`
  border-radius: 5px;
  border: 1px solid ${COLORS.PRIMARY_LIGHT};
  color: ${COLORS.BLACK};
  padding: 5px 10px;
  &:focus {
    outline-color: ${COLORS.PRIMARY};
  }
  &:placeholder-shown {
    user-select: none;
  }
`;

export const buttonStyle = css`
  border-radius: 5px;
  border: 0px solid;
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  padding: 5px 10px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${COLORS.PRIMARY_DARK};
  }
`;

export const boxStyle = css`
  background-color: ${COLORS.OFF_WHITE};
  border: 3px solid ${COLORS.PRIMARY_DARK};
  border-radius: 10px;
  ${displayCenter}
  flex-direction: column;
  input {
    ${inputStyle}
  }
  color: ${COLORS.BLACK};
  button {
    ${buttonStyle}
  }
`;
