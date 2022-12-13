import { ModuleMetadata, Type } from '@nestjs/common';

export interface MailModuleOptions {
  apiKey: string;
  secret: string;
  senderAddress: string;
  language: string;
  isGlobal?: boolean;
}

export interface MailOptionsFactory {
  createMailOptions(): Promise<MailModuleOptions> | MailModuleOptions;
}

export interface MailModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<MailOptionsFactory>;
  useClass?: Type<MailOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<MailModuleOptions> | MailModuleOptions;
  inject?: any[];
  isGlobal?: boolean;
}
