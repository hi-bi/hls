import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/frameworks/data-services/prisma/prisma-client.service';
import { Prisma } from '@prisma/client'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, CheckAuthDto } from 'src/core/dtos';
import * as bcryptjs from 'bcryptjs'
import { v4 } from 'uuid';
import { jwtConstants } from './auth-services.constants';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    ) {}

  async signUp(createUserDto: CreateUserDto): Promise<any> {

    const isUser = await this.prisma.dbUser.findFirst({
      where: {
          login: createUserDto.login,
      }
    });
    if (isUser) {
      throw new BadRequestException('User already exists')
    }

    const passwordHash = await this.hashData( createUserDto.password);
    const userId = v4();
    const createdAt = new Date().getTime();

    const newUser = await this.prisma.dbUser.create({
      data: {
        id: userId,
        login: createUserDto.login,
        password: passwordHash,
        version: 1,
        createdAt: new Prisma.Decimal(createdAt),
        updatedAt: new Prisma.Decimal(createdAt),
        refToken: '',
      }
    })

    const tokens = await this.getTokens(newUser.id, newUser.login); 
    
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return tokens;
  }

  async logIn(data: CheckAuthDto) {
    const user = await this.prisma.dbUser.findFirst({
      where: {
          login: data.login,
      }
    });
    if (user == null) {
      throw new ForbiddenException('Authentication failed. No user with such login.');
    }

    const compare = await bcryptjs.compare(data.password, user.password)

    if (!compare) {
      throw new ForbiddenException('Authentication failed. Password does not match actual one.');
    }

    const tokens = await this.getTokens(user.id, user.login);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    
    const user = await this.prisma.dbUser.findUnique({
      where: {
          id: userId,
      }
    })
    
    if (user == null || user.refToken == null) {
        throw new ForbiddenException('Authentication failed. No user with such login or token is undefined.');
    }

    const compare = await bcryptjs.compare(refreshToken, user.refToken);

    if (!compare) {
      throw new ForbiddenException('Authentication failed. Token does not match actual one.');
    }

    const tokens = await this.getTokens(user.id, user.login);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens
  }

  async signIn(login: string, pass: string): Promise<any> {
    const user = await this.prisma.dbUser.findFirst({
        where: {
            login: login,
        }
    });
    if (user == null) {
      throw new ForbiddenException('Authentication failed. No user with such login, password does not match actual one.');
    }
    if (user?.password !== pass) {
      throw new ForbiddenException('Authentication failed. No user with such login, password does not match actual one.');
    }
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async hashData(data: string) {
    const salt = parseInt(jwtConstants.salt);
    const saltHash = await bcryptjs.genSalt(salt);
    return await bcryptjs.hash(data, saltHash);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.prisma.dbUser.update({
      where: {
        id: userId
      },
      data: {
        refToken: hashedRefreshToken
      } 
    });
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.accessSecret,
          expiresIn: jwtConstants.accessExpireTime,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.refreshSecret,
          expiresIn: jwtConstants.refreshExpireTime,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

}