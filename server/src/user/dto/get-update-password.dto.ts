import { IsNotEmpty, IsString, Matches } from 'class-validator';

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
