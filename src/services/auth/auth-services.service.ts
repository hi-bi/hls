import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/frameworks/data-services/prisma/prisma-client.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    ) {}

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.prisma.dbUser.findFirst({
        where: {
            login: login,
        }
    });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}