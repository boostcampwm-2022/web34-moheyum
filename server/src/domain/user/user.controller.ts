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
  CacheTTL,
  CacheInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/database/user.schema';
import { UserUpdateDto } from './dto/user-update.dto';
import { UpdateAuthGuard } from 'src/guard/update-user.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { GetUser } from 'src/decorator/get-user.decorator';
import { NcloudService } from 'src/domain/ncloud/ncloud.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUserUpdatePasswordDto } from './dto/get-update-password.dto';
import { MoheyumInterceptor } from 'src/cache/cache.interceptor';
import { CacheEvict } from 'src/cache/cache-evict.decorator';
import { CacheIndividual } from 'src/cache/cahce-individual.decorator';
import { CachePagination } from 'src/cache/cache-next-ttl.decorator';
import { SearchUserListDto } from './dto/search-user-list.dto';

@Controller('user')
@UseInterceptors(MoheyumInterceptor)
export class UserController {
  constructor(
    private userService: UserService,
    private ncloudServie: NcloudService,
  ) {}

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @CacheIndividual('userid')
  @CacheTTL(60 * 10)
  @Get('mentionlist')
  async getMentionList(@GetUser() user: User) {
    const data = await this.userService.getMentionList(user.userid);
    return data;
  }

  @CachePagination(true)
  @CacheTTL(20)
  @Get('/search')
  async searchUser(@Query() searchUserListDto: SearchUserListDto) {
    if (!/^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\d_]{1,16}$/.test(searchUserListDto.keyword))
      throw new BadRequestException();
    return await this.userService.searchUser(searchUserListDto);
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

  @CacheTTL(1800)
  @Get('/:userid')
  async getUserProfile(@Param('userid') userid: string) {
    return await this.userService.getUserData(userid);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard, UpdateAuthGuard)
  @CacheEvict()
  @Put('/:userid')
  async updateUserProfile(
    @Param('userid') userid: string,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return await this.userService.updateUserProfile(userid, userUpdateDto);
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard, UpdateAuthGuard)
  @CacheIndividual('avatar')
  @CacheEvict('')
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
