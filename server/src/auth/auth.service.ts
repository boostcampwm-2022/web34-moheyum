import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential-dto';
import { UserCreateDto } from './dto/user-create-dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userCreateDto: UserCreateDto): Promise<void> {
    // TODO : hash iteration을 별도의 config로 분리
    userCreateDto.password = await bcrypt.hash(userCreateDto.password, 10);
    return this.userRepository.createUser(userCreateDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userid, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ userid });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userid };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else throw new UnauthorizedException('login failed');
  }
}
