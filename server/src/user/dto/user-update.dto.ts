import {
  IsString,
  MaxLength,
  IsNotEmpty,
  Matches,
  IsByteLength,
  IsOptional,
} from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @MaxLength(500)
  bio: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\d_]{1,16}$/)
  @IsByteLength(1, 16)
  nickname: string;
}
