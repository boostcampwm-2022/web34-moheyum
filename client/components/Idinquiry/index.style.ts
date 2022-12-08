import styled from '@emotion/styled';
import { inputStyle, buttonStyle } from '../../styles/mixin';
import COLORS from '../../styles/color';

export const Wrapper = styled.div`
  width: 488px;
  height: 350px;
  background-color: ${COLORS.OFF_WHITE};
  border: 3px solid ${COLORS.PRIMARY_DARK};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Box = styled.div`
  width: 100%;
  margin-top: 10px;
  transition: all 0.3s ease;
`;

export const Top = styled.div`
  width: 100%;
  height: 50px;
`;

export const IdInquiryForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const IdBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 50px;
`;

export const Description = styled.div`
  width: 80%;
  height: 40px;
  font-size: 16px;
  text-align: center;
`;

export const EmailInput = styled.input`
  width: 80%;
  height: 33px;
  ${inputStyle}
  margin-bottom: 20px;
`;

export const EmailRowMessage = styled.div`
  list-style: none;
  width: 75%;
  height: 0;
  display: flex;
  align-items: flex-end;
  margin-left: 0px;
  font-size: 12px;
  color: ${COLORS.RED};
  font-weight: 600;
`;

export const IdInquiryButton = styled.button`
  ${buttonStyle}
  width: 80%;
  height: 33px;
  margin: 20px 0px;
`;
