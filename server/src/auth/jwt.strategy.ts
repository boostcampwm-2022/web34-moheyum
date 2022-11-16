import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      secretOrKey:
        'secret- 절대 소스코드 노출시키지 마세요~~ 배포 전에 환경 변수나 secrets로 따로 뺄것',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
