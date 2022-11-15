import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filter/execption.filter';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signUp')
  @UsePipes(ValidationPipe)
  async signUpUser(@Body() signUpDTO: SignUpDTO) {
    const { success, msg } = await this.authService.signUp(signUpDTO);
    if (!success)
      throw new HttpException(
        {
          message: msg,
        },
        HttpStatus.FORBIDDEN,
      );
  }
}
