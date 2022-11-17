import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../../common/database/user.repository';
import { User } from '../../common/database/user.schema';
import { Request } from 'express';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.a_t;
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
