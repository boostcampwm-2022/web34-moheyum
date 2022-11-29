import styled from '@emotion/styled';
import { displayCenter } from '../../../../styles/mixin';
import COLORS from '../../../../styles/color';

export const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  padding: 0 10px;

  color: ${COLORS.BLACK};
  user-select: none;
  background-color: ${COLORS.PRIMARY_LIGHT};
  & > div {
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: left;
    margin-bottom: 10px;
  }
  & > span {
    width: 85%;
    border-bottom: 1px solid ${COLORS.PRIMARY};
    transition: all 0.3s ease;
  }

  &:hover > span {
    width: 100%;
  }

  &:active {
    color: ${COLORS.PRIMARY_DARK};
    font-weight: 600;
  }

  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: 80%;
    margin-left: 10%;
  }
  .imageBox {
    width: 35%;
    ${displayCenter}
    @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
      width: 100%;
    }
  }
  .avatarBox {
    width: 35px;
    height: 35px;
    border-radius: 40px;
    border: 2px solid ${COLORS.GRAY2};
    background-color: ${COLORS.GRAY3};
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .text {
    width: 65%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
      display: none;
    }
  }
`;
