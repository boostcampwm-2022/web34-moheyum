import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from 'src/common/database/user.repository';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { User } from 'src/common/database/user.schema';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.r_t;
        },
      ]),
    });
  }
  async validate(payload) {
    const { userid } = payload;
    const user: User = await this.userRepository.findOne({ userid });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
