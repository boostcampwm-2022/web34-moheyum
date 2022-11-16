import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
