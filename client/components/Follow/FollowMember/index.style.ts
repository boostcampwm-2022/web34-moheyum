import styled from '@emotion/styled';
import COLORS from '../../../styles/color';
import { buttonStyle } from '../../../styles/mixin';

export const Container = styled.div`
  display: flex;
`;

export const Avatar = styled('div')(({ src }: { src: string }) => ({
  backgroundImage: `url(${src})`,
  width: '67px',
  height: '67px',
  borderRadius: '67px',
  backgroundColor: `${COLORS.GRAY3}`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  margin: '5px',
  aspectRatio: '1/1',
}));

export const Information = styled.div`
  flex: 1;
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ButtonArea = styled.div`
  display: flex;
  align-items: center;
`;

export const Button = styled.button`
  ${buttonStyle}
  width: 82px;
  height: 28px;
  margin: 5px;
`;

export const UserNickname = styled.div`
  font-weight: 700;
`;

export const UserId = styled.div`
  color: ${COLORS.GRAY1};
  &:before {
    content: '@';
  }
`;

export const UserBio = styled.div`
  font-size: 0.8em;
  margin-top: 10px;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 250px;
`;
