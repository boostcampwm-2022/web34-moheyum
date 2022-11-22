import { IsString, IsNotEmpty } from 'class-validator';

export class FollowCreateDto {
  @IsString()
  @IsNotEmpty()
  userid: string;

  @IsString()
  @IsNotEmpty()
  targetid: string;
}
