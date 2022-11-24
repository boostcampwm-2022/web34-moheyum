import styled from '@emotion/styled';
import COLORS from '../../styles/color';

export const Wrapper = styled.div`
  width: ${({ theme }) => theme.mainSection.width};
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const TopButtonConatiner = styled.div`
  width: 100%;
  // border-bottom: 2px solid ${COLORS.GRAY1};
  padding: 15px;
  display: flex;
  flex-direction: row;
  & > h1 {
    flex: 1;
    font-size: 24px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding-left: 15px;
  }
  & > div {
    width: 30px;
    height: 30px;
  }
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

export const TopFollowContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid ${COLORS.GRAY3};
  padding: 15px;
  display: flex;
  flex-direction: row;
`;

export const TopFollowActivated = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  flex:1;
`

export const TopFollowDeactivated = styled.div`
  text-align: center;
  color: ${COLORS.GRAY2};
  font-size: 24px;
  flex: 1;
`

export const TopFollowUnderline = styled.div`
  position: absolute;
  bottom: 0px;
`

export const FollowContainer = styled.div`
  overflow-y: scroll;
`