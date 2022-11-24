import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
export class FollowListDto {
  @IsString()
  @IsOptional()
  next = '';

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  limit = 2;
}
