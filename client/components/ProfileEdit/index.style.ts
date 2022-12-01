import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { buttonStyle, inputStyle, mainSectionStyle } from '../../styles/mixin';

export const Wrapper = styled.div`
  ${mainSectionStyle}
`;

export const ProfileAndImgContainer = styled.div`
  display: flex;
  margin: 20px;
  justify-content: space-around;
  width: 80%;
`;

interface avatarProps {
  src: string;
}

export const Avatar = styled.div<avatarProps>`
  ${(props) => props.src && `background-image: url(${props.src});`}
  width: 146px;
  height: 146px;
  border-radius: 146px;
  background-color: ${COLORS.GRAY3};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 10px;
  aspect-ratio: 1;
  display: flex;
  justify-content: space-between;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    filter: brightness(0.7);
    outline: ${COLORS.PRIMARY} solid 3px;
  }
`;

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

export const ProfileImgForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EditSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const InputsContainer = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  & span {
    margin: 0 20px;
    user-select: none;
    white-space: nowrap;
  }
`;

export const ProfileImageInput = styled.input`
  display: none;
`;

export const NicknameEditArea = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BioEditArea = styled.div`
  margin: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

export const SubmitButton = styled.button`
  ${buttonStyle}
  width: fit-content;
  margin: 0 45px;
  align-self: flex-end;
`;

export const NicknameInput = styled.input`
  ${inputStyle}
`;

export const BioInput = styled.textarea`
  ${inputStyle}
  width: 400px;
  height: 200px;
  resize: none;
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
