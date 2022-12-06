import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  Get,
  HttpCode,
  Query,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { Response } from 'express';
import { JwtRefreshGuard } from 'src/common/guard/jwt-refresh.guard';
import { GetPayload } from 'src/common/decorator/get-jwt-data.decorator';
import { EmailDto } from './dto/email.dto';
import { EmailCheckDto } from './dto/email-check.dto';
import { Cookies } from 'src/common/decorator/cookie.decorator';
import { FindPwDto } from './dto/find-pw-dto';
import { JwtAuthGuard } from 'src/common/guard/jwt-auth.guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { User } from 'src/common/database/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * @description 회원 탈퇴
   */
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@GetUser() user: User, @Res() res: Response) {
    await this.authService.deleteUserWithState(user.userid);
    //logout절차
    await this.authService.removeRefeshTokenfromRedis(user.userid);
    res.cookie('a_t', '', this.authService.deleteCookieOption());
    res.cookie('r_t', '', this.authService.deleteCookieOption());
    return res.send({
      message: 'success',
      data: {},
    });
  }

  @HttpCode(200)
  @Post('/signup')
  async signUp(@Body() userCreateDto: UserCreateDto) {
    await this.authService.signUp(userCreateDto);
    return {};
  }

  @HttpCode(200)
  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      authCredentialsDto,
    );
    res.cookie('a_t', accessToken, this.authService.getAccessOptions());
    res.cookie('r_t', refreshToken, this.authService.getRefreshOptions());
    return {};
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(
    @GetPayload() userid: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    // TODO db상에서 가져와야함
    const payload = { userid };
    const data = await this.authService.checkUserAuthData(userid);
    const accessToken = await this.authService.createAccessToken(payload);
    const refreshToken = await this.authService.createRefreshToken(payload);
    res.cookie('a_t', accessToken, this.authService.getAccessOptions());
    res.cookie('r_t', refreshToken, this.authService.getRefreshOptions());
    return data;
  }

  @HttpCode(200)
  @Post('email-verification')
  async sendEmailCode(
    @Body() emailCheckDto: EmailDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authNum: string = await this.authService.sendEmailCode(emailCheckDto);
    res.cookie('authNum', authNum, this.authService.getEmailOptions());
    return {};
  }

  @Get('email-verification')
  async checkEmailCode(
    @Query() emailCheckDto: EmailCheckDto,
    @Cookies('authNum') authNum: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.checkEmailCode(emailCheckDto, authNum);
    res.cookie('authNum', '', this.authService.deleteCookieOption());
    return {};
  }

  @HttpCode(200)
  @Post('id-inquiry')
  async findId(@Body() emailDTO: EmailDto) {
    const userid = await this.authService.findId(emailDTO);
    return userid;
  }

  @HttpCode(200)
  @Post('password-inquiry')
  async findPw(@Body() findPwDTO: FindPwDto) {
    if (await this.authService.findPw(findPwDTO)) {
      return {};
    }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@GetUser() user: User, @Res() res: Response) {
    await this.authService.removeRefeshTokenfromRedis(user.userid);
    res.cookie('a_t', '', this.authService.deleteCookieOption());
    res.cookie('r_t', '', this.authService.deleteCookieOption());

    return res.send({
      message: 'success',
      data: {},
    });
  }
}
