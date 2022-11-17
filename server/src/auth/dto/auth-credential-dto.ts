import { IsString, IsNotEmpty, Matches, IsByteLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\d_]{4,16}$/)
  @IsByteLength(4, 16)
  userid: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\d!@#$%^&*()-_=+]{6,16}$/)
  password: string;
}
