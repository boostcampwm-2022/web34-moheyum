import { SetMetadata } from '@nestjs/common';

export const Authorization = (...authorizes: string[]) =>
  SetMetadata('authorizes', authorizes);
