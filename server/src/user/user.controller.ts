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
  UploadedFile,
  UseInterceptors,
  Delete,
  Res,
  CacheKey,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/common/database/user.schema';
import { UserUpdateDto } from './dto/user-update.dto';
import { UpdateAuthGuard } from 'src/common/guard/update-user.guard';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { NcloudService } from 'src/ncloud/ncloud.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUserUpdatePasswordDto } from './dto/get-update-password.dto';
import { MoheyumInterceptor } from 'src/common/cache/cache.interceptor';
import { CacheEvict } from 'src/common/cache/cache-evict.decorator';

@Controller('user')
@UseInterceptors(MoheyumInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private ncloudServie: NcloudService,
  ) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @CacheKey('mention')
  @CacheTTL(300)
  @Get('mentionlist')
  async getMentionList(@GetUser() user: User) {
    const data = await this.userService.getMentionList(user.userid);
    return data;
  }

  @Get('/search')
  async searchUser(
    @Query('keyword') keyword: string,
    @Query('next') next: string,
  ) {
    if (!/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\d_]{1,16}$/.test(keyword))
      throw new BadRequestException();
    return await this.userService.searchUser(keyword, next);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Put('password')
  async changePassword(
    @GetUser() user: User,
    @Body() getUserUpdatePasswordDTO: GetUserUpdatePasswordDto,
  ) {
    await this.userService.changePassword(
      user.userid,
      getUserUpdatePasswordDTO,
    );
    return {
      message: 'success',
      data: {},
    };
  }
  @Get('/:userid')
  async getUserProfile(@Param('userid') userid: string) {
    return await this.userService.getUserData(userid);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard, UpdateAuthGuard)
  @CacheEvict('mention')
  @Put('/:userid')
  async updateUserProfile(
    @Param('userid') userid: string,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return await this.userService.updateUserProfile(userid, userUpdateDto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard, UpdateAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Put('/:userid/avatar')
  async uploadAvatar(
    @Param('userid') userid: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const url = await this.ncloudServie.upload(file);
    await this.userService.updateUserAvatar(userid, url.imageLink);
    return {
      profileimg: url.imageLink,
    };
  }
}
