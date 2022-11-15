import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { NormalAuthService } from './normal.auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schema/user.shema';
import { Model } from 'mongoose';
describe('AuthService', () => {
  let service: AuthService;
  let repository: AuthRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        AuthService,
        ConfigService,
        NormalAuthService,
        AuthRepository,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<AuthRepository>(AuthRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // describe('유저 추가', () => {
  //   it('중복 유저 추가안되는지 확인',async () =>{
  //     jest.spyOn(service, 'signUp')
  //     .mockResolvedValue(Promise.resolve())
  //   })
  // });
});
