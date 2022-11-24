import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NcloudService } from './ncloud.service';

@Controller('image')
export class NcloudController {
  constructor(private readonly ncloudService: NcloudService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return await this.ncloudService.upload(file);
  }
}
