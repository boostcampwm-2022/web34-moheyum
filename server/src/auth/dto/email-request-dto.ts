import { IsString, IsNotEmpty, IsEmail, MaxLength } from 'class-validator';

export class EmailRequestDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  email: string;
}
