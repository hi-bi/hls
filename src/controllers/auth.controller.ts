import { Body, Req, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/services/auth/auth-services.service';
import { CheckAuthDto, CreateUserDto } from 'src/core/dtos';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

export type Refresh = {
  sub: string,
  refreshToken: string
}
export interface RefreshRequest extends Request {
  user: Refresh
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
  })
  @ApiResponse({
    status: 400,
    description: 'No login or password, or they are not a strings.',
  })
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }

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
  logIn(@Body() logInDto: CheckAuthDto) {
    return this.authService.logIn(logInDto);
  }

  @Post('refresh')
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
    status: 401,
    description: 'Bad request. No login or password, or they are not a strings',
  })
  @ApiResponse({
    status: 403,
    description: 'Authentication failed. Wrong user or user token.',
  })
  refresh(@Req() req: RefreshRequest) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    
    return this.authService.refreshTokens(userId, refreshToken);
  }

}