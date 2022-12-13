import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from '../common/database/database-test.module';
import { FollowRepository } from '../common/database/follow.repository';
import { Follow, FollowSchema } from '../common/database/follow.schema';
import { UserRepository } from '../common/database/user.repository';
import { User, UserSchema } from '../common/database/user.schema';
import { UserService } from './user.service';

describe('User Service', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  const mockConfigService = {};

  const users = [
    {
      userid: 'KIMGANE',
      nickname: '김가네',
      email: 'kimim@email.com',
      password: 'nohashed',
      profileimg: '',
      bio: '',
    },
    {
      userid: 'TestUser',
      nickname: '테스트유저',
      email: 'test@email.com',
      password: 'nohashed',
      profileimg: '',
      bio: '',
    },
  ];
  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([
          { name: Follow.name, schema: FollowSchema },
        ]),
      ],
      providers: [
        UserService,
        UserRepository,
        FollowRepository,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();
    userService = testingModule.get<UserService>(UserService);
    userRepository = testingModule.get<UserRepository>(UserRepository);

    await userRepository.createUser(users[0]);
    await userRepository.createUser(users[1]);
  });

  it('getUserData Correct', async () => {
    const result = await userService.getUserData(users[0].userid);
    delete users[0].password;
    expect(result).toMatchObject(users[0]);
  });
});
