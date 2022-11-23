import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  Matches,
  IsByteLength,
} from 'class-validator';

export class FindPwDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\d_]{4,16}$/)
  @IsByteLength(4, 16)
  userid: string;
}
