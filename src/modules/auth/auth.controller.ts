import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../user/dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    const { password, ...res } = user as any;
    return res;
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
