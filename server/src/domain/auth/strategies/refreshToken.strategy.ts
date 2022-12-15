import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { UserUnAuthorizedTokenException } from 'src/exeception/user.exception';
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.r_t;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }
  async validate(request: Request, payload) {
    const { userid } = payload;
    const refreshToken = request?.cookies?.r_t;
    const isValidate = await this.authService.checkRefreshTokenValidation(
      refreshToken,
      userid,
    );
    // const user: User = await this.userRepository.findOne({ userid });
    if (!isValidate) {
      throw new UserUnAuthorizedTokenException();
    }

    return userid;
  }
}
