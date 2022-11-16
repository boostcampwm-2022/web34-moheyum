import {
  IsNotEmpty,
  IsString,
  Matches,
  IsByteLength,
  IsEmail,
} from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\d_]{4,16}$/)
  @IsByteLength(4, 16)
  userId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\d!@#$%^&*()-_=+]{6,16}$/)
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]{1,16}$/)
  @IsByteLength(1, 16)
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
