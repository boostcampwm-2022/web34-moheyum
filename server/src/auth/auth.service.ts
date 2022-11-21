import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { UserCreateDto } from './dto/user-create-dto';
import { UserRepository } from '../common/database/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import { User } from 'src/common/database/user.schema';
import { RedisService } from 'src/redis/redis.service';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailRequestDto } from './dto/email-request-dto';
import { EmailCheckDto } from './dto/email-check-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly mailService: MailerService,
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
      maxAge:
        +this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') * 1000,
    };
  }
  public getRefreshOptions(): CookieOptions {
    return {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge:
        +this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 1000,
    };
  }
  public getEmailOptions(): CookieOptions {
    return {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      expires: new Date(Date.now() + 300000),
    };
  }
  public deleteCookie(): CookieOptions {
    return {
      maxAge: 0,
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

  /**
   * @description 이메일 보내기 기능
   * @param email
   * @returns Promise<string>
   */

  public async emailSend(email: EmailRequestDto): Promise<string> {
    try {
      // 숫자 고르기
      const number: string = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();

      await this.mailService.sendMail({
        to: email.email,
        from: this.configService.get('NAVER_EMAIL_ID'),
        subject: '이메일 인증 요청 코드입니다',
        html: `인증 코드 : <b> ${number} </b>`,
      });
      /* authNum을 return해 쿠키에 가지게 한다 */
      const authNum: string = await bcrypt.hash(
        number,
        parseInt(this.configService.get('saltOrRounds')),
      );
      return authNum;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Message 인증 코드 생성 에러 발생',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @descripton 이메일 검증 절차
   * @param code
   * @param authNum
   * @returns Promise<boolean>
   */
  public async checkEmailCode(
    code: EmailCheckDto,
    authNum: string,
  ): Promise<boolean> {
    try {
      const rightNum = await bcrypt.compare(code.code, authNum);
      if (rightNum) {
        return true;
      } else {
        throw new HttpException(
          '인증코드가 일치하지 않습니다',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(
        '다시 요청해 주시기 바랍니다',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
