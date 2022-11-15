import { css } from '@emotion/react';
import COLORS from './color';

export const displayCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const inputStyle = css`
  border-radius: 5px;
  border: 1.5px solid ${COLORS.PRIMARY_LIGHT};
  color: ${COLORS.BLACK};
  padding-left: 10px;
  &:focus {
    outline-color: ${COLORS.PRIMARY};
  }
`;

export const buttonStyle = css`
  border-radius: 5px;
  border: 0px solid;
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  text-align: center;
  &:focus {
    outline: none;
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
