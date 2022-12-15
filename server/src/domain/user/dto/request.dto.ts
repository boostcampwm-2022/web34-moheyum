import {
  IsString,
  MaxLength,
  IsNotEmpty,
  Matches,
  IsByteLength,
  IsOptional,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @MaxLength(500)
  bio: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\d_]{1,16}$/)
  @IsByteLength(1, 16)
  nickname: string;
}
export class UserProfileDto {
  @IsNotEmpty()
  @IsString()
  userid: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  profileimg = '';

  @IsNotEmpty()
  @IsString()
  bio = '';

  @IsNotEmpty()
  @IsNumber()
  postcount: number;

  @IsNotEmpty()
  @IsNumber()
  follower: number;

  @IsNotEmpty()
  @IsNumber()
  following: number;

  @IsNotEmpty()
  state: boolean;
}
export class SearchUserListDto {
  @IsString()
  keyword = '';

  @IsString()
  @IsOptional()
  next = '';
}
export class GetUserUpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\d!@#$%^&*()-_=+]{6,16}$/)
  prevPassword: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\d!@#$%^&*()-_=+]{6,16}$/)
  newPassword: string;
}
