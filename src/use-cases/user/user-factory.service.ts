import { Injectable, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { User } from '../../core/entities';
import { CreateUserDto, UpdateUserDto } from '../../core/dtos';
import { Prisma } from '@prisma/client';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class UserFactoryService {
  createNewUser(createUserDto: CreateUserDto) {
    const createdDate = new Date().getTime(); 
    const newUser = new User({
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: createdDate,
      updatedAt: createdDate,
    });

    return newUser;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  updateUser(updateUserDto: UpdateUserDto) {
    const newUser = new User({
      password: updateUserDto.newPassword + ' ' + updateUserDto.oldPassword,
      updatedAt: new Date().getTime(),
    });

    return newUser;
  }
}