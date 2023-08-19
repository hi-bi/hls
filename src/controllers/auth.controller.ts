import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth-services.service';
import { CheckAuthDto } from 'src/core/dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: CheckAuthDto) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }
}