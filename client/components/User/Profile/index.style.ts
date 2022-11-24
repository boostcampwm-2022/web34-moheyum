import styled from '@emotion/styled';
import COLORS from '../../../styles/color';

export const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`;

export const ProfileAvatar = styled('div')(({ src }: { src: string }) => ({
  backgroundImage: `url(${src})`,
  width: '190px',
  height: '190px',
  borderRadius: '190px',
  backgroundColor: `${COLORS.GRAY3}`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  margin: '50px',
  aspectRatio: '1/1',
}));

export const ProfileDetail = styled.div`
  width: 500px;
`;

export const ProfileNames = styled.div`
  margin: 20px 0;
`;

export const ProfileNickname = styled.div`
  font-size: 32px;
`;

export const ProfileUserid = styled.div`
  &:before {
    content: '@';
  }
`;

export const ProfileCounters = styled.div`
  margin: 20px 0;
  display: flex;
`;

export const ProfileBio = styled.div`
  margin: 20px 0;
`;

export const ProfileEditButton = styled.a`
  background-color: ${COLORS.PRIMARY};
  border-radius: 4px;
  border: none;
  font-size: 16px;
  padding: 4px 8px;
  color: ${COLORS.WHITE};
  text-decoration: none;
  &:hover {
    color: white;
    text-decoration: none;
  }
  margin-left: 20px;
`;
