import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtOptions),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStartegy],
  exports: [JwtStartegy, PassportModule],
})
export class AuthModule {}
