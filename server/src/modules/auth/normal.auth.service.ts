import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignUpDTO } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { AuthRepository } from './auth.repository';
@Injectable()
export class NormalAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly authRepository: AuthRepository,
  ) {}

  /**
   * @description 아이디 중복검사
   * @param userId
   * @returns Promise<{ success: boolean; message: string }>
   */
  public async checkDuplicateID(
    userId: string,
  ): Promise<{ success: boolean; message: string }> {
    console.log(this.configService.get('DATABASE_URL'));
    const isUser = await this.authRepository.findOne({
      userId: userId,
    });
    console.log(isUser);
    if (isUser)
      throw new HttpException(
        {
          message: '중복된 아이디 입력',
        },
        HttpStatus.FORBIDDEN,
      );
    return { success: true, message: 'success' };
  }

  private async hashPw(password: string): Promise<string> {
    const saltOrRounds = Number(this.configService.get('saltOrRounds'));
    return await bcrypt.hash(password, saltOrRounds);
  }

  public async insertUser(signUpDTO: SignUpDTO): Promise<boolean> {
    signUpDTO.password = await this.hashPw(signUpDTO.password);
    try {
      await this.authRepository.createSignUp(signUpDTO);
      return true;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          message: e as string,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
