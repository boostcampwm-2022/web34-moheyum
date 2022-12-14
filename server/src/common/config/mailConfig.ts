import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModuleAsyncOptions } from 'src/mail/mail.interface';

const mailAsyncOptions: MailModuleAsyncOptions = {
  imports: [ConfigModule],
  isGlobal: true,
  useFactory: async (configService: ConfigService) => ({
    apiKey: configService.get('NCLOUD_ACCESS_KEY'),
    secret: configService.get('NCLOUD_SECRET_KEY'),
    senderAddress: configService.get('NAVER_EMAIL_ID'),
    language: 'ko-KR', //한국어
  }),
  inject: [ConfigService],
};
export { mailAsyncOptions };
