import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserRepository } from '../common/database/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CookieOptions } from 'express';
import { User } from 'src/common/database/user.schema';
import { RedisService } from 'src/redis/redis.service';
import { EmailDto } from './dto/email.dto';
import { EmailCheckDto } from './dto/email-check.dto';
import { FindPwDto } from './dto/find-pw-dto';
import * as generator from 'generate-password';
import { UserException } from 'src/common/exeception/user.exception';
import { CommonException } from 'src/common/exeception/common.exception';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
  ) {}

  /**
   * @description 회원가입
   * @param userCreateDto
   * @returns Promise<User>
   */
  async signUp(userCreateDto: UserCreateDto): Promise<User> {
    userCreateDto.password = await bcrypt.hash(
      userCreateDto.password,
      +this.configService.get('saltOrRounds'),
    );
    return this.userRepository.createUser(userCreateDto);
  }

  /**
   * @description 액세스 토큰 생성
   * @param payload
   * @returns string
   */
  public createAccessToken(payload) {
    const expiresIn = `${this.configService.get(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    )}s`;
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn,
    });
  }
  /**
   * @description 리프레시 토큰 레디스 설정
   * @param refreshToken
   * @param userid
   */
  private setRefreshTokenInRedis(refreshToken: string, userid: string) {
    this.redisService.set(
      userid,
      refreshToken,
      +this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') + 60,
    );
  }
  /**
   * @description 리프레시 토큰 생성
   * @param payload
   * @returns string
   */
  public async createRefreshToken(payload: { userid: string }) {
    const expiresIn = `${this.configService.get(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    )}s`;
    const jwt = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn,
    });
    await this.setRefreshTokenInRedis(jwt, payload.userid);
    return jwt;
  }

  /**
   * @description 리프레시 토큰 검증
   * @param refreshToken
   * @param userid
   * @returns Promise<boolean>
   */
  public async checkRefreshTokenValidation(
    refreshToken: string,
    userid: string,
  ): Promise<boolean> {
    const hashedRefreshToken = await this.redisService.get(userid);
    const isValidate: boolean = refreshToken === hashedRefreshToken;
    return isValidate;
  }
  /**
   * @description Redis에서 리프레시 토큰 제거
   * @param userid
   */
  public removeRefeshTokenfromRedis(userid) {
    this.redisService.del(userid);
  }
  /**
   * @description Access토큰 옵션 설정
   * @returns CookieOptions
   */
  public getAccessOptions(): CookieOptions {
    return {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge:
        +this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') * 1000,
    };
  }

  /**
   * @description 리프레시 토큰 쿠키 설정
   * @returns CookieOptions
   */
  public getRefreshOptions(): CookieOptions {
    return {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge:
        +this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 1000,
    };
  }

  /**
   * @description 이메일 옵션 설정
   * @returns CookieOptions
   */
  public getEmailOptions(): CookieOptions {
    return {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      expires: new Date(Date.now() + 300000),
    };
  }

  /**
   * @description 쿠키제거
   * @Creturns CookieOptions
   */
  public deleteCookieOption(): CookieOptions {
    return {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 0,
    };
  }
  /**
   * @description 로그인
   * @param authCredentialsDto
   * @returns Promise<{ accessToken: string; refreshToken: string }>
   */
  public async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { userid, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ userid });
    if (!user.state) throw UserException.userStateFalse();
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userid };
      const accessToken = this.createAccessToken(payload);
      const refreshToken = await this.createRefreshToken(payload);
      return { accessToken, refreshToken };
    } else throw UserException.userUnAuthorized();
  }

  /**
   * @description 이메일 보내기 기능
   * @param email
   * @returns Promise<string>
   */
  private async emailSend(
    email: string,
    subject: string,
    html: string,
  ): Promise<boolean> {
    try {
      await this.mailService.sendEmail({
        title: subject,
        body: html,
        senderName: this.configService.get('NAVER_EMAIL_ID'),
        recipients: [{ address: email, type: 'R' }],
      });
      return true;
    } catch (e) {
      throw CommonException.commonMailerFail();
    }
  }

  async sendEmailCode(email: EmailDto) {
    try {
      // 숫자 고르기
      const number: string = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
      await this.emailSend(
        email.email,
        '이메일 인증 요청 코드입니다',
        `인증 코드 : <b> ${number} </b>`,
      );
      const authNum: string = await bcrypt.hash(
        number,
        parseInt(this.configService.get('saltOrRounds')),
      );
      return authNum;
    } catch (e) {
      throw CommonException.commonCreateCodeError();
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
        throw CommonException.commonCheckCodeFail();
      }
    } catch (e) {
      throw CommonException.commonReCheck();
    }
  }
  /**
   * @description 아이디 찾기
   * @param findIdDTO
   * @returns Promise<string>
   */
  async findId(emailDTO: EmailDto): Promise<string> {
    const { email } = emailDTO;
    const user = await this.userRepository.findOne({
      email: email,
    });

    if (user) {
      const userid = `${user.userid.slice(0, -3)}***`;
      return userid;
    }
    throw UserException.userNotFound();
  }

  async findPw(findPwDTO: FindPwDto) {
    const { userid, email } = findPwDTO;
    const user = await this.userRepository.findOne({
      userid: userid,
      email: email,
    });
    if (user) {
      const pw = generator.generate({
        length: 12,
        numbers: true,
      });
      const hashPw = await bcrypt.hash(
        pw,
        +this.configService.get('saltOrRounds'),
      );
      await this.userRepository.findOneAndUpdatePW(
        {
          userid: userid,
        },
        {
          password: hashPw,
        },
      );
      await this.emailSend(
        email,
        '임시 비밀번호 발급',
        `임시 비밀번호 : <b> ${pw} </b>`,
      );
      return true;
    }
    throw UserException.userNotFound();
  }

  async checkUserAuthData(userid: string) {
    const { nickname, profileimg } = await this.userRepository.findOne({
      userid,
    });
    return { userid, nickname, profileimg };
  }
  deleteUserWithState(userid: string) {
    return this.userRepository.findOneAndUpdate(
      { userid: userid },
      { state: false },
    );
  }
}
