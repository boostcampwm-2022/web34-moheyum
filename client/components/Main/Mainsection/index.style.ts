import styled from '@emotion/styled';
import COLORS from '../../../styles/color';
import { buttonStyle } from '../../../styles/mixin';
import { mainSectionStyle } from '../../../styles/mixin';

export const Wrapper = styled.section`
  ${mainSectionStyle}
  @media only screen and (max-width: ${({ theme }) => theme.wideWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.maxWidth});
  }
  @media only screen and (max-width: ${({ theme }) => theme.smallWindow}) {
    width: calc(100% - ${({ theme }) => theme.sidebar.minWidth});
  }
`;

export const NewArticleSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 35px 30px 15px 30px;
  & > hr {
    margin-top: 20px;
    background-color: ${COLORS.GRAY4};
    height: 1px;
    border: none;
  }
  user-select: none;
  border-bottom: 2px solid ${COLORS.GRAY2};
`;

export const Placeholder = styled.div`
  color: ${COLORS.GRAY3};
  font-size: 24px;
`;

export const FakeButton = styled.button`
  ${buttonStyle}
  width: max-content;
  padding: 5px 10px;
  align-self: flex-end;
  margin: 10px 10px 0px 10px;
`;

export const ArticlesSection = styled.div`
  background-color: ${COLORS.OFF_WHITE};
  flex: 1;
  overflow-y: scroll;
`;
