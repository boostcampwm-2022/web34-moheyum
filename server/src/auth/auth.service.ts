import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { UserCreateDto } from './dto/user-create-dto';
import { UserRepository } from '../common/database/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import { User } from 'src/common/database/user.schema';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async signUp(userCreateDto: UserCreateDto): Promise<User> {
    userCreateDto.password = await bcrypt.hash(
      userCreateDto.password,
      +this.configService.get('saltOrRounds'),
    );
    return this.userRepository.createUser(userCreateDto);
  }

  public async createAccessToken(payload) {
    const expiresIn = `${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}s`;
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn,
    });
  }

  private async setRefreshTokenInRedis(refreshToken: string, userid: string) {
    const hashedToken = await bcrypt.hash(
      refreshToken,
      +this.configService.get('saltOrRounds'),
    );
    await this.redisService.set(
      userid,
      hashedToken,
      +this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 60,
    );
  }

  public async createRefreshToken(payload: { userid: string }) {
    const expiresIn = `${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}s`;
    const jwt = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn,
    });
    this.setRefreshTokenInRedis(jwt, payload.userid);
    return jwt;
  }

  public async checkRefreshTokenValidation(
    refreshToken: string,
    userid: string,
  ) {
    const hashedRefreshToken = await this.redisService.get(userid);
    const isValidate = await bcrypt.compare(refreshToken, hashedRefreshToken);
    if (isValidate) return true;
    return false;
  }

  public async removeRefeshTokenfromRedis(userid) {
    await this.redisService.del(userid);
  }

  public getAccessOptions(): CookieOptions {
    return {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 3000,
    };
  }
  public getRefreshOptions(): CookieOptions {
    return {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge:
        Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) *
        1000,
    };
  }
  public async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { userid, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ userid });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userid };
      const accessToken = await this.createAccessToken(payload);
      const refreshToken = await this.createRefreshToken(payload);
      return { accessToken, refreshToken };
    } else throw new UnauthorizedException('login failed');
  }

  public async findUser(userid: string) {
    const user = await this.userRepository.findOne({ userid });
    console.log(user._id);
    console.log(user['createdAt']);
    console.log(user['_id'].toString());
  }
}
