import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth-services.service';
import { PrismaService } from 'src/frameworks/data-services/prisma/prisma-client.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth-services.constants';
//import { AuthGuard } from './auth-services.guard';
//import { RolesGuard } from './auz-services.guard';
import { RefreshTokenStrategy } from './strategies/jwt-refresh.strategy'; 

@Module({
  imports: [
//    PrismaService,
    JwtModule.register({
//      global: true,
      secret: jwtConstants.accessSecret,
      signOptions: { expiresIn: jwtConstants.accessExpireTime },
    }),
  ],
  providers: [
//    {
//      provide: APP_GUARD,
//      useClass: AuthGuard,
//    },
//    {
//      provide: APP_GUARD,
//      useClass: RolesGuard,
//    },
    AuthService,
    PrismaService,
    RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}