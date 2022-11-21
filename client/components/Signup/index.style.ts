import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { buttonStyle, inputStyle } from '../../styles/mixin';

export const ModalWrapper = styled.div`
  width: 488px;
  background-color: ${COLORS.OFF_WHITE};
  border: 3px solid ${COLORS.PRIMARY_DARK};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const ModalHeader = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 30px;
  transition: all 0.3s ease;
`;

export const SignupForm = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  margin: 0;
  width: 100%;
`;

interface hideable {
  hidden?: boolean;
}

export const SignupRow = styled.li<hideable>`
  list-style: none;
  display: flex;
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

export const SignupRowMessage = styled.li`
  list-style: none;
  width: 60%;
  height: 0;
  display: flex;
  align-items: flex-end;
  margin-left: calc(25% + 30px);
  font-size: 12px;
  color: ${COLORS.RED};
  font-weight: 600;
`;

export const FieldName = styled.div`
  width: 25%;
  text-align: right;
`;

export const FieldContent = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  padding: 0px 10px;
`;

interface sizeProps {
  width?: number;
  height?: number;
}

export const MoheyumInputText = styled.input<sizeProps>`
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  ${(props) => props.height && `height: ${props.height}px;`}
  ${inputStyle}

&:-webkit-autofill,
&:-webkit-autofill:hover,
&:-webkit-autofill:focus,
&:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${COLORS.WHITE} inset;
    box-shadow: 0 0 0 30px ${COLORS.WHITE} inset !important;
    &:disabled {
      -webkit-box-shadow: 0 0 0 30px ${COLORS.GRAY3} inset;
      box-shadow: 0 0 0 30px ${COLORS.GRAY3} inset !important;
    }
  }
`;

export const MoheyumButton = styled.button<sizeProps>`
  margin: 0 10px;
  padding: 10px 0;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  ${(props) => props.height && `height: ${props.height}px;`}
  ${buttonStyle}
`;

export const SignupSubmitContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
`;

export const ButtonBack = styled.button`
  border: none;
  background-color: transparent;
  align-self: flex-start;
  width: 15px;
  height: 15px;
  margin: 15px 15px;
  background-image: url('/ico_chveron_left.svg');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;
