import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class FollowerPostDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsOptional()
  limit: number = 10;
}
