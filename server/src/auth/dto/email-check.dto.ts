import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class EmailCheckDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  code: string;
}
