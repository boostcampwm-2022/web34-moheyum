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
  padding: 7px 10px;
  font-size: 14px;
  &:focus {
    outline-color: ${COLORS.PRIMARY};
  }
  &:placeholder-shown {
    user-select: none;
  }
  &:disabled {
    background-color: ${COLORS.GRAY3};
    -webkit-box-shadow: 0 0 0 30px ${COLORS.GRAY3} inset !important;
    box-shadow: 0 0 0 30px ${COLORS.GRAY3} inset !important;
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
  padding: 7px 10px;
  font-size: 14px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${COLORS.PRIMARY_DARK};
  }
  &:active {
    filter: brightness(0.7);
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
