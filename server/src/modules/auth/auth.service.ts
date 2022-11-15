import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from './auth.repository';
import { SignUpDTO } from './dto/signUp.dto';
import { NormalAuthService } from './normal.auth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly normalAuthService: NormalAuthService,
    private readonly authRepository: AuthRepository,
  ) {}

  public async signUp(signUpDTO: SignUpDTO) {
    await this.checkDuplicateID(signUpDTO);
    await this.checkDuplicateNickname(signUpDTO);
    await this.normalAuthService.insertUser(signUpDTO);
  }

  private async checkDuplicateID(signUpDTO: SignUpDTO) {
    return await this.normalAuthService.checkDuplicateID(signUpDTO.userId);
  }

  /**
   * @description 닉네임 중복검사
   * @description oAuth에서도 사용해야 해서 공용 service에 배치
   * @param signUpDTO
   * @returns Promise<{ success: boolean; message: string }>
   */
  public async checkDuplicateNickname(
    signUpDTO: SignUpDTO,
  ): Promise<{ success: boolean; message: string }> {
    const nickName: string = signUpDTO.nickname;
    const isUser = await this.authRepository.findOne({
      nickname: nickName,
    });
    if (isUser)
      throw new HttpException(
        {
          message: '중복된 닉네임 입력',
        },
        HttpStatus.FORBIDDEN,
      );
    return { success: true, message: 'success' };
  }
}
