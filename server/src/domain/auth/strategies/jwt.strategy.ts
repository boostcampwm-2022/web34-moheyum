import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../../../database/user.repository';
import { User } from '../../../database/user.schema';
import { Request } from 'express';
import { UserUnAuthorizedTokenException } from 'src/exeception/user.exception';

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
      throw new UserUnAuthorizedTokenException();
    }
    return user;
  }
}
