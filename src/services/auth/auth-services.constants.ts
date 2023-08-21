import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const jwtConstants = {
    salt: process.env.CRYPT_SALT,
    refreshSecret: process.env.JWT_SECRET_REFRESH_KEY, 
    refreshExpireTime: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    accessSecret: process.env.JWT_SECRET_KEY,
    accessExpireTime: process.env.TOKEN_EXPIRE_TIME,
  };