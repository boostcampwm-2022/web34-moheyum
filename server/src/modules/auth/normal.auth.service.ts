import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDTO } from './dto/signUp.dto';

@Injectable()
export class NormalAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  public async signUp(signUpDTO: SignUpDTO) {
    if (await this.checkDuplicateID(signUpDTO.userId)) {
      /* 중복 아이디 없는 case */
      return { success: false, msg: '중복된 아이디 입력' };
    } else {
      /* 중복인 아이디가 있는 case */
      return { success: false, msg: '중복된 아이디 입력' };
    }
    return { success: true };
  }

  /**
   * 아이디 중복검사
   * @param userId
   * @returns Promise<boolean>
   */
  private async checkDuplicateID(userId: string): Promise<boolean> {
    console.log(this.configService.get('DATABASE_URL'));
    const isUser = await this.prismaService.user.findFirst({
      where: { userId },
    });
    console.log(isUser);
    if (isUser) return false;
    return true;
  }
}
