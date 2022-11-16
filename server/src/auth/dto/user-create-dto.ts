import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  userid: string;

  @IsString()
  @MaxLength(20)
  nickname: string;

  @IsString()
  @MaxLength(255) // TODO : @Matches() 로 정규식 이메일 검사도 할 필요 있음
  email: string;

  @IsString()
  password: string;
}
