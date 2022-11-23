import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

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
  profileimg: string = '';

  @IsNotEmpty()
  @IsString()
  bio: string = '';

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  postcount: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  follower: number;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  following: number;

  @IsNotEmpty()
  state: boolean;
}
