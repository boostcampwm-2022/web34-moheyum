import { BadRequestException, PipeTransform } from '@nestjs/common';
import mongoose from 'mongoose';

export class PostIdValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestException(`${value} isn't a valid post id`);
    }
    return value;
  }
}
