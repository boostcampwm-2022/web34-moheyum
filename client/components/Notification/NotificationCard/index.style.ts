import styled from '@emotion/styled';
import COLORS from '../../../styles/color';

export const Container = styled.div`
  display: flex;
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid ${COLORS.GRAY4};
  background-color: ${COLORS.WHITE};

  &:hover {
    filter: brightness(0.9);
  }
`;
export const Message = styled.div`
  display: flex;
  font-size: 1.2em;
  margin: 0 10px;
`;
export const NotificationAt = styled.div`
  display: flex;
  margin: 0 10px;
`;
