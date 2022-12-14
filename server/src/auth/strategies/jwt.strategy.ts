import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../../common/database/user.repository';
import { User } from '../../common/database/user.schema';
import { Request } from 'express';
import { UserException } from 'src/common/exeception/user.exception';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.a_t;
        },
      ]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload) {
    const { userid } = payload;
    const user: User = await this.userRepository.findOne({ userid });
    if (!user) {
      throw UserException.userUnAuthorizedToken();
    }

    return user;
  }
}
