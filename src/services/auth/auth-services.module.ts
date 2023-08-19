import { Module } from '@nestjs/common';
import { AuthService } from './auth-services.service';
import { PrismaService } from 'src/frameworks/data-services/prisma/prisma-client.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth-services.constants';

@Module({
  imports: [
    PrismaService,
    JwtModule.register({
//      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}