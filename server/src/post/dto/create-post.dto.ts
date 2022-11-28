import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  description: string;

  @IsOptional()
  parentPost: string;

  @IsOptional()
  childPost: string[];
}
