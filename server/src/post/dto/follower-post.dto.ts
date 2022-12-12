import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
export class FollowerPostDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  limit = 20;

  // @IsNotEmpty()
  @IsString()
  @IsOptional()
  next = '';
}
