import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
export class FollowerPostDto {
  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  next = '';
}
