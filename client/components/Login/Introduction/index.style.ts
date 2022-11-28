import styled from '@emotion/styled';
import { displayCenter, displayColumn } from '../../../styles/mixin';
import COLORS from '../../../styles/color';

export const Highlight = styled.span`
  color: ${COLORS.PRIMARY_DARK};
`;

export const Wrapper = styled.div`
  width: 50%;
  height: 100%;
  ${displayCenter}
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
    display: none;
  }
`;

export const IntroBox = styled.div`
  width: 400px;
  height: 337px;
  ${displayColumn}
  align-items: left;
  margin-bottom: 40px;
  user-select: none;
`;

export const Text = styled.div`
  margin: 15px;
  margin-left: 20px;
  font-size: 22px;
  line-height: 40px;
`;
