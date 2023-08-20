import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth-services.service';
import { CheckAuthDto } from 'src/core/dtos';
import { ApiParam, ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/services/auth/auth-services.constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ 
    description: 'Successful operation',
    content: {
      'application/json':
      {
        schema: {
          type: 'object',
        }
      }

    }  
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. No login or password, or they are not a strings',
  })
  @ApiResponse({
    status: 403,
    description: 'Authentication failed (no user with such login, password does not match actual one',
  })
  signIn(@Body() signInDto: CheckAuthDto) {
    return this.authService.signIn(signInDto.login, signInDto.password);
  }
}