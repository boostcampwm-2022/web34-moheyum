import styled from '@emotion/styled';
import { mainSectionStyle } from '../../styles/mixin';
import COLORS from '../../styles/color';

export const Wrapper = styled.div`
  ${mainSectionStyle}
  flex: 1;
  overflow-y: scroll;
`;
export const ErrorMessage = styled.span`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: ${COLORS.GRAY2};
`;
