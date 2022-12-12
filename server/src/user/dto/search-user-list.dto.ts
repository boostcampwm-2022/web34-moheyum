import { IsOptional, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
export class SearchUserListDto {
  @IsString()
  keyword = '';

  @IsString()
  @IsOptional()
  next = '';
}
