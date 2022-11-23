import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FollowerPostDto {
  @IsNumber()
  @IsOptional()
  limit = 10;

  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  next = '';
}
