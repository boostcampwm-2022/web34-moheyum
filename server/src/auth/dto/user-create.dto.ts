import {
  IsString,
  MaxLength,
  IsNotEmpty,
  Matches,
  IsByteLength,
  IsEmail,
  IsOptional,
  IsNotIn,
} from 'class-validator';

// 페이지 변경되거나 추가되면 여기도 업데이트 필요.
const urlList = [
  'signup',
  'post',
  'notification',
  'login',
  'myAccount',
  'search',
  'write',
];

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\d_]{4,16}$/)
  @IsByteLength(4, 16)
  @IsNotIn(urlList)
  userid: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\d_]{1,16}$/)
  @IsByteLength(1, 16)
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255) // TODO : @Matches() 로 정규식 이메일 검사도 할 필요 있음
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\d!@#$%^&*()-_=+]{6,16}$/)
  password: string;

  @IsOptional()
  @IsString()
  profileimg = '';

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio = '';
}
