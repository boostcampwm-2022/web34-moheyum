import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NormalAuthService } from './normal.auth.service';
import { ConfigModule } from '@nestjs/config';
// import { PrismaModule } from '../prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.shema';
import { AuthRepository } from './auth.repository';
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, NormalAuthService, AuthRepository],
})
export class AuthModule {}
