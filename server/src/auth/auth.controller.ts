import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  Get,
  HttpCode,
  Query,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { UserCreateDto } from './dto/user-create-dto';
// import { GetUser } from '../common/decorator/get-user.decorator';
// import { User } from '../common/database/user.schema';
import { Response } from 'express';
import { JwtRefreshGuard } from 'src/common/guard/jwt-refresh.guard';
import { GetPayload } from 'src/common/decorator/get-jwt-data.decorator';
import { EmailRequestDto } from './dto/email-request-dto';
import { EmailCheckDto } from './dto/email-check-dto';
import { Cookies } from 'src/common/decorator/cookie.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(200)
  @Post('/signup')
  async signUp(@Body() userCreateDto: UserCreateDto) {
    await this.authService.signUp(userCreateDto);
    return {
      message: 'success',
      data: {},
    };
  }

  @HttpCode(200)
  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      authCredentialsDto,
    );
    res.cookie('a_t', accessToken, this.authService.getAccessOptions());
    res.cookie('r_t', refreshToken, this.authService.getRefreshOptions());
    res.json({
      message: 'success',
      data: {},
    });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@GetPayload() userid: string, @Res() res: Response) {
    // TODO db상에서 가져와야함
    const payload = { userid };
    const accessToken = await this.authService.createAccessToken(payload);
    const refreshToken = await this.authService.createRefreshToken(payload);
    res.cookie('a_t', accessToken, this.authService.getAccessOptions());
    res.cookie('r_t', refreshToken, this.authService.getRefreshOptions());
    res.json({
      message: 'success',
      data: {},
    });
  }

  @HttpCode(200)
  @Post('email-verification')
  async sendEmailCode(
    @Body() emailCheckDto: EmailRequestDto,
    @Res() res: Response,
  ) {
    const authNum: string = await this.authService.emailSend(emailCheckDto);
    res.cookie('authNum', authNum, this.authService.getEmailOptions());
    return res.send({
      message: 'success',
      data: {},
    });
  }

  @Get('email-verification')
  async checkEmailCode(
    @Query() emailCheckDto: EmailCheckDto,
    @Cookies('authNum') authNum: string,
    @Res() res: Response,
  ) {
    await this.authService.checkEmailCode(emailCheckDto, authNum);
    res.cookie('authNum', '', this.authService.deleteCookie());
    return res.send({
      message: 'success',
      data: {},
    });
  }

  // @Get('/:userid')
  // async getUserInfo(@Param('userid') userid: string) {
  //   this.authService.findUser(userid);
  // }
}
