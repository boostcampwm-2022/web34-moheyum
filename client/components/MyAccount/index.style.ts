import styled from '@emotion/styled';
import COLORS from '../../styles/color';
import { buttonStyle, inputStyle } from '../../styles/mixin';

export const Wrapper = styled.div`
  width: ${({ theme }) => theme.mainSection.width};
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

export const TopButtonConatiner = styled.div`
  width: 100%;
  border-bottom: 2px solid ${COLORS.GRAY3};
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

export const ProfileAndImgContainer = styled.div`
  display: flex;
  margin: 20px;
  justify-content: center;
`

export const Avatar = styled("div")(({ src }: {src: string}) => ({
  backgroundImage: `url(${src})`,
  width: "146px",
  height: "146px",
  borderRadius: "146px",
  backgroundColor: `${COLORS.GRAY3}`,
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  margin: "10px",
  aspectRatio: "1/1",
}) );

export const ProfileArea = styled.div`
  margin: 30px 20px;
`

export const ProfileUserid = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 10px 0;
`
export const ProfileEmail = styled.div`
  color: ${COLORS.GRAY1};
  margin: 10px 0;
`

export const ChangeAvatarButton = styled.button`
  ${buttonStyle}
  width: fit-content;
`

export const InputsContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const NicknameEditArea = styled.div`
  margin: 10px;
`

export const BioEditArea = styled.div`
  margin: 10px;
`

export const SubmitButton = styled.button`
  ${buttonStyle}
  width: fit-content;
  margin-left: 45px;
`

export const NicknameInput = styled.input`
  ${inputStyle}
`

export const BioInput = styled.input`
  ${inputStyle}
  width: 400px;
  height: 200px;
`