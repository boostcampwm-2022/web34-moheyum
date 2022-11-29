import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/database/user.schema';
import { UserUpdateDto } from './dto/user-Update-dto';
import { UpdateAuthGuard } from 'src/common/guard/update-user.guard';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('mentionlist')
  async getMentionList(@GetUser() user: User) {
    const data = await this.userService.getMentionList(user.userid);
    return {
      message: 'success',
      data: data,
    };
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
