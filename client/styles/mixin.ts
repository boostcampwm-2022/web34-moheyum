import { css } from '@emotion/react';
import COLORS from './color';

export const displayCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const inputStyle = css`
  border-radius: 5px;
  border-color: ${COLORS.GRAY3};
  color: ${COLORS.GRAY1};
  padding-left: 10px;
`;

export const buttonStyle = css`
  border-radius: 5px;
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  text-align: center;
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
  color: ${COLORS.LIGHT_BLACK};
  button {
    ${buttonStyle}
  }
`;
