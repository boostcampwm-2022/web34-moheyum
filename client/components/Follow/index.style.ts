import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { mainSectionStyle } from '../../styles/mixin';

export const Wrapper = styled.div`
  ${mainSectionStyle}
`;

export const TopFollowContainer = styled.div`
  width: 100%;
  height: 51px;
  border-bottom: 1px solid ${COLORS.GRAY4};
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const TopFollowActivated = styled.div`
  width: 50%;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  & > a {
    padding: 10px 15px;
    height: 100%;
    border-bottom: 3px solid ${COLORS.PRIMARY};
  }
`;

export const TopFollowDeactivated = styled.div`
  width: 50%;
  text-align: center;
  color: ${COLORS.GRAY2};
  font-size: 18px;
`;

export const TopFollowUnderline = styled.div`
  position: absolute;
  bottom: 0px;
`;

export const FollowContainer = styled.div`
  overflow-y: scroll;
  flex: 1;
`;

export const NoFollowersMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
