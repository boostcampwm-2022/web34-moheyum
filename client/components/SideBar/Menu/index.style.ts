import styled from '@emotion/styled';
import { displayCenter } from '../../../styles/mixin';
import COLORS from '../../../styles/color';

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
  
  &:hover {
    font-weight: 600;
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
`;

export const Item = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: left;
  margin-bottom: 10px;
`;

export const BorderBottom = styled.span`
  width: 85%;
  border-bottom: 1px solid ${COLORS.PRIMARY};
  transition: all 0.3s ease;
`;

export const ImageBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  ${displayCenter}
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: 100%;
  }
  .avatarBox {
    border-radius: 40px;
    background-color: ${COLORS.WHITE};
    border: 1px solid ${COLORS.PRIMARY};
  }
`;

export const Text = styled.div`
  width: 65%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    display: none;
  }
`;

export const NewNoti = styled.div`
  position: absolute;
  width: 5px;
  height: 5px;
  margin: 10px;
  border-radius: 5px;
  background-color: ${COLORS.RED};
`;
