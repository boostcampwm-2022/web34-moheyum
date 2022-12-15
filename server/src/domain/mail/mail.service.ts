import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { createHmac } from 'crypto';
import { CONFIG_OPTIONS } from 'src/constants/mail.constants';
import { CommonMailerFail } from 'src/exeception/common.exception';
import { SendEmailRequestDto } from './dto/send-email.dto';
import { MailModuleOptions } from './mail.interface';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(reqData: SendEmailRequestDto) {
    const url = `/api/v1/mails`;
    const method = `POST`;
    try {
      await axios.post<{ requestId: string; count: number }>(
        `${this.configService.get('NCLOUD_MAIL_API_DOMAIN')}${url}`,
        {
          senderAddress: this.options.senderAddress,
          ...reqData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ncp-apigw-timestamp': new Date().getTime().toString(10),
            'x-ncp-iam-access-key': this.options.apiKey,
            'x-ncp-apigw-signature-v2': this.makeSignature(
              method,
              url,
              new Date().getTime().toString(),
              this.options.apiKey,
              this.options.secret,
            ),
            'x-ncp-lang': this.options.language,
          },
        },
      );
    } catch (error) {
      throw new CommonMailerFail();
    }
  }

  private makeSignature(
    method: string,
    url: string,
    timestamp: string,
    accessKey: string,
    secretKey: string,
  ): string {
    const space = ' '; // 공백
    const newLine = '\n'; // 줄바꿈

    const hmac = createHmac('sha256', secretKey);

    hmac.write(method);
    hmac.write(space);
    hmac.write(url);
    hmac.write(newLine);
    hmac.write(timestamp);
    hmac.write(newLine);
    hmac.write(accessKey);

    hmac.end();

    return Buffer.from(hmac.read()).toString('base64');
  }
}
