import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { buttonStyle, inputStyle, mainSectionStyle } from '../../styles/mixin';

export const Wrapper = styled.div`
  ${mainSectionStyle}
`;

export const ProfileAndImgContainer = styled.div`
  display: flex;
  margin: 20px;
  justify-content: center;
`;

export const Avatar = styled('div')(({ src }: { src: string }) => ({
  backgroundImage: `url(${src})`,
  width: '146px',
  height: '146px',
  borderRadius: '146px',
  backgroundColor: `${COLORS.GRAY3}`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  margin: '10px',
  aspectRatio: '1/1',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}));

export const ProfileArea = styled.div`
  margin: 30px 20px;
`;

export const ProfileUserid = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 10px 0;
`;
export const ProfileEmail = styled.div`
  color: ${COLORS.GRAY1};
  margin: 10px 0;
`;

export const ChangeAvatarButton = styled.button`
  ${buttonStyle}
  width: fit-content;
`;

export const InputsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProfileImageInput = styled.input`
  display: none;
`;

export const NicknameEditArea = styled.div`
  margin: 10px;
`;

export const BioEditArea = styled.div`
  margin: 10px;
  margin-top: 30px;
`;

export const SubmitButton = styled.button`
  ${buttonStyle}
  width: fit-content;
  margin-left: 45px;
`;

export const NicknameInput = styled.input`
  ${inputStyle}
`;

export const BioInput = styled.input`
  ${inputStyle}
  width: 400px;
  height: 200px;
`;

export const ErrorMessage = styled.li`
  list-style: none;
  width: 60%;
  height: 0;
  display: flex;
  font-size: 12px;
  margin-left: 35px;
  margin-top: 10px;
  color: ${COLORS.RED};
  font-weight: 600;
`;

export const ChangeImageButton = styled.button`
  border: 0px solid;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:active {
    filter: brightness(0.7);
  }
`;

export const UpdateIcon = styled.div`
  position: relative;
  display: 'flex';
  justify-content: 'space-between';
  align-items: 'right';
`;
