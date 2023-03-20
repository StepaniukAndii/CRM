import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/users/dto/sign.up.dto';
import { SignInDto } from '../users/dto/sign.in.dto';

@Controller('api/v1')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() loginDto: SignInDto) {
    return this.authService.login(loginDto);
  }

  @Post('sign-up')
  @HttpCode(201)
  async signUp(@Body() registerDto: SignUpDto) {
    return this.authService.register(registerDto);
  }
}
