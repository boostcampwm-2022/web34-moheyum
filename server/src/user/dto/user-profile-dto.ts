import {
  IsString,
  MaxLength,
  IsNotEmpty,
  Matches,
  IsByteLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

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
  password: string;

  @IsNotEmpty()
  @IsString()
  profileimg: string = '';

  @IsNotEmpty()
  @IsString()
  bio: string = '';

  @IsNotEmpty()
  @IsString()
  postcount: number;

  @IsNotEmpty()
  @IsString()
  follower: number;

  @IsNotEmpty()
  @IsString()
  following: number;

  @IsNotEmpty()
  @IsString()
  state: boolean;
}
