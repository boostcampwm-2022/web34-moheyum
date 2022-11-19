import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { UserCreateDto } from './dto/user-create-dto';
import { UserRepository } from '../common/database/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import { User } from 'src/common/database/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(userCreateDto: UserCreateDto): Promise<User> {
    userCreateDto.password = await bcrypt.hash(userCreateDto.password, 10);
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
  private async createRefreshToken(payload) {
    const expiresIn = `${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}s`;
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn,
    });
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
