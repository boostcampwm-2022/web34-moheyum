import { Body, Controller, Post, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { UserCreateDto } from './dto/user-create-dto';
import { GetUser } from '../common/decorator/get-user.decorator';
import { User } from '../common/database/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Get } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { JwtRefreshGuard } from 'src/common/guard/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/signup')
  signUp(@Body() userCreateDto: UserCreateDto): Promise<void> {
    return this.authService.signUp(userCreateDto);
  }

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

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(@GetUser() user: User, @Res() res: Response) {
    // TODO db상에서 가져와야함
    res.cookie(
      'a_t',
      this.authService.createAccessToken(user.userid),
      this.authService.getAccessOptions(),
    );
    res.json({
      message: 'success',
      data: {},
    });
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
