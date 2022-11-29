import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Put,
  HttpCode,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user-Update-dto';
import { UpdateAuthGuard } from 'src/common/guard/update-user.guard';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/search')
  async searchUser(@Query('keyword') keyword: string, @Query('next') next:string) {
    if (!(/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\d_]{1,16}$/.test(keyword)))
      throw new BadRequestException();
    console.log(keyword);
    return {
      message: 'success',
      data: await this.userService.searchUser(keyword, next)
    }
  }

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


}
