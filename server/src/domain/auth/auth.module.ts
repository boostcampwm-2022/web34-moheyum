import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStartegy } from './strategies/jwt.strategy';
import { UserRepository } from '../../database/user.repository';
import { User, UserSchema } from '../../database/user.schema';
import { jwtOptions } from 'src/config/jwtConfig';
import { DatabaseModule } from 'src/database/database.module';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { RedisModule } from 'src/domain/redis/redis.module';

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
