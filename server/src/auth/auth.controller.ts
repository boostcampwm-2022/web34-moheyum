import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  Get,
  HttpCode,
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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(200)
  @Post('/signup')
  async signUp(@Body() userCreateDto: UserCreateDto) {
    console.log(await this.authService.signUp(userCreateDto));
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
    console.log(accessToken);
    console.log(refreshToken);
    res.json({
      message: 'success',
      data: {},
    });
  }
  // @Get('/:userid')
  // async getUserInfo(@Param('userid') userid: string) {
  //   this.authService.findUser(userid);
  // }
}
