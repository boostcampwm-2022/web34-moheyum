import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class Recipients {
  @IsString()
  address: string;
  //   @IsString()
  //   name: string; => 받는 사람 이름
  @IsString()
  type: string;
}

export class SendEmailRequestDto {
  @IsString()
  senderName: string;
  @IsString()
  title: string;
  @IsString()
  body: string;
  @ValidateNested({ each: true })
  @Type(() => Recipients)
  recipients: Recipients[];
}

// export class SendEmailResponseDto {
//   @IsBoolean()
//   status: boolean;
//   @IsOptional()
//   @IsString()
//   error?: string;
//   @IsOptional()
//   @IsString()
//   message?: string;
//   @IsOptional()
//   @IsString()
//   requestId?: string;
//   @IsOptional()
//   @IsString()
//   count?: number;
// }
