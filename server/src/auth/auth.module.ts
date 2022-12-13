import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStartegy } from './strategies/jwt.strategy';
import { UserRepository } from '../common/database/user.repository';
import { User, UserSchema } from '../common/database/user.schema';
import { jwtOptions } from 'src/common/config/jwtConfig';
import { DatabaseModule } from 'src/common/database/database.module';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { RedisModule } from 'src/redis/redis.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtOptions),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DatabaseModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStartegy, RefreshTokenStrategy],
  exports: [JwtStartegy, PassportModule],
})
export class AuthModule {}
