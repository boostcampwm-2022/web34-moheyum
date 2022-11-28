import { Allow, IsNotEmpty, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  parentPost?: string = '';

  childPost?: string[] = [] as string[];
}
