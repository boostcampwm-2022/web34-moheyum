import { Body, Controller, Post, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { UserCreateDto } from './dto/user-create-dto';
import { GetUser } from '../common/decorator/get-user.decorator';
import { User } from '../common/database/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

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
    const token = await this.authService.signIn(authCredentialsDto);
    res.cookie('a_t', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 3000,
    });
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
