import { css } from '@emotion/react';
import COLORS from './color';

export const mainSectionStyle = css`
  width: 100%;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.WHITE};
`;

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

export const markdownStyle = css`
  padding: 10px;
  font-size: 16px;
  white-space: normal;
  line-height: 16px;
  min-height: 12px;

  & * {
    margin-bottom: 16px;
  }

  & h1,
  h2 {
    border-bottom: 1px solid ${COLORS.GRAY4};
  }

  & h1 {
    margin-top: 24px;
    padding-bottom: 8px;
    line-height: 1.25;
    font-size: 30px;
    font-weight: 700;
  }

  & h2 {
    margin-top: 20px;
    padding-bottom: 6px;
    line-height: 1.25;
    font-size: 22px;
    font-weight: 600;
  }

  & h3 {
    line-height: 1.25;
    font-size: 18px;
    font-weight: 500;
  }

  & code {
    padding: 2px 4px;
    background-color: ${COLORS.GRAY3};
    border-radius: 6px;
    font-size: 85%;
  }

  & pre {
    background-color: ${COLORS.GRAY5};
    border-radius: 6px;
    padding: 16px;
    overflow-x: hidden;
    word-wrap: break-word;
    white-space: nowrap;
    & > div {
      white-space: pre-wrap;
    }
  }
  & blockquote {
    border-left: 4px solid ${COLORS.GRAY3};
    padding: 6px 10px;
  }

  & b {
    font-weight: 700;
  }

  & i {
    font-style: italic;
  }
`;
