import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { buttonStyle, inputStyle, mainSectionStyle } from '../../styles/mixin';

interface avatarProps {
  src: string;
}

export const Wrapper = styled.div`
  ${mainSectionStyle}
`;

export const EditSection = styled.div`
  width: 100%;
  flex: 1;
`;

export const InputsContainer = styled.form`
  display: flex;
  height: 700px;
  justify-content: center;
  flex-direction: column;
  align-items: left;
  margin: 0px 100px;
  & span {
    margin: 0 20px;
    user-select: none;
    white-space: nowrap;
  }
`;

export const ProfileAndImgContainer = styled.div`
  padding-left: 60px;
  display: flex;
  width: 100%;
`;

export const ProfileImage = styled.div`
  width: 250px;
`;

export const Avatar = styled.div<avatarProps>`
  ${(props) => props.src && `background-image: url(${props.src});`}
  width: 146px;
  height: 146px;
  border-radius: 146px;
  border: 2px solid ${COLORS.PRIMARY};
  background-color: ${COLORS.WHITE};
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

export const ProfileImageInput = styled.input`
  display: none;
`;

export const ProfileArea = styled.div`
  margin: 30px 20px;
  flex: 1;
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

export const NicknameEditArea = styled.div`
  height: 60px;
  margin-top: 60px;
  width: 100%;
  padding-left: 60px;
`;

export const BioEditArea = styled.div`
  padding-left: 60px;
  height: 160px;
  display: flex;
  flex-direction: row;
  span {
    margin-top: 5px;
  }
`;

export const ButtonBox = styled.div`
  padding-left: 60px;
  height: 60px;
  width: 100%;
  display: flex;
  margin-top: 20px;
`;

export const SubmitButton = styled.button`
  ${buttonStyle}
  margin-left: 80px;
  width: fit-content;
  height: 30px;
`;

export const NicknameInput = styled.input`
  ${inputStyle}
`;

export const BioInput = styled.textarea`
  ${inputStyle}
  width: 400px;
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
