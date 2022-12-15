import { DynamicModule, Module, Provider } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/constants/mail.constants';
import {
  MailModuleOptions,
  MailModuleAsyncOptions,
  MailOptionsFactory,
} from './mail.interface';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {
  static forRoot(options: MailModuleOptions): DynamicModule {
    //forRoot정의해주자 => 동적 모듈이니
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      global: options.isGlobal,
      exports: [],
    };
  }
  static forRootAsync(options: MailModuleAsyncOptions): DynamicModule {
    return {
      module: MailModule,
      global: options.isGlobal,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
    };
  }

  private static createAsyncProviders(
    options: MailModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }
  private static createAsyncOptionsProvider(
    options: MailModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: CONFIG_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: CONFIG_OPTIONS,
      useFactory: async (optionsFactory: MailOptionsFactory) =>
        await optionsFactory.createMailOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
