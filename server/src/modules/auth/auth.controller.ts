import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signUp')
  @UsePipes(ValidationPipe)
  async signUpUser(@Body() signUpDTO: SignUpDTO) {
    this.authService.signUp(signUpDTO);
  }
}
