import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignUpDTO } from './dto/signUp.dto';
import { NormalAuthService } from './normal.auth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly normalAuthService: NormalAuthService,
  ) {}

  async signUp(signUpDTO: SignUpDTO) {
    return await this.normalAuthService.signUp(signUpDTO);
  }
}
