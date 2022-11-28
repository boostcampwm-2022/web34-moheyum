import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  description: string;

  parentPost?: string = '';

  childPost?: string[] = [] as string[];
}
