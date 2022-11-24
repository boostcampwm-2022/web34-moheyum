import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { randomBytes } from 'node:crypto';

@Injectable()
export class NcloudService {
  private readonly ncloudRepository: AWS.S3;
  private readonly BUCKET: string;

  constructor(private readonly configService: ConfigService) {
    const ACCESS_KEY = 'NCLOUD_ACCESS_KEY';
    const SECRET_KEY = 'NCLOUD_SECRET_KEY';
    const REGION = 'NCLOUD_REGION';
    const BUCKET = 'NCLOUD_BUCKET';
    console.log(AWS);
    this.ncloudRepository = new AWS.S3({
      credentials: {
        accessKeyId: this.configService.get(ACCESS_KEY),
        secretAccessKey: this.configService.get(SECRET_KEY),
      },
      region: this.configService.get(REGION),
      endpoint: 'https://kr.object.ncloudstorage.com',
    });

    this.BUCKET = this.configService.get(BUCKET);
  }

  private createHash() {
    return randomBytes(64).toString('hex');
  }

  async upload(file: Express.Multer.File) {
    const Key = `${this.createHash()}.png`;
    await this.ncloudRepository
      .putObject({
        Bucket: this.BUCKET,
        Key,
        ACL: 'public-read',
        Body: file.buffer,
        ContentType: 'image/png',
      })
      .promise();

    return {
      imageLink: `https://kr.object.ncloudstorage.com/${this.BUCKET}/${Key}`,
    };
  }
}
