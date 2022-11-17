import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

const jwtOptions: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('secret'),
    signOptions: {
      expiresIn: 3600,
    },
  }),
  inject: [ConfigService],
};

export { jwtOptions };
