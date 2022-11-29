import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  HttpCode,
  UseGuards,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user-Update-dto';
import { UpdateAuthGuard } from 'src/common/guard/update-user.guard';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { NcloudService } from 'src/ncloud/ncloud.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private ncloudServie: NcloudService) {}
  @Get('/:userid')
  async getUserProfile(@Param('userid') userid: string) {
    return {
      message: 'success',
      data: await this.userService.getUserData(userid),
    };
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard, UpdateAuthGuard)
  @Put('/:userid')
  async updateUserProfile(
    @Param('userid') userid: string,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return {
      message: 'success',
      data: await this.userService.updateUserProfile(userid, userUpdateDto),
    };
  }
  
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, UpdateAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put('/:userid/avatar')
  async uploadAvatar(@Param('userid') userid: string, @UploadedFile() file: Express.Multer.File) {
    const url = await this.ncloudServie.upload(file);
    await this.userService.updateUserAvatar(userid, url.imageLink);
    return {
      message: 'success',
      data: {
        profileimg: url.imageLink
      }
    }
  }
}
