import { IsString, MaxLength } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  profileimg: string;

  @IsString()
  @MaxLength(500)
  bio: string;
}
