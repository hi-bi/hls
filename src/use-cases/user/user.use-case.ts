import { Injectable } from '@nestjs/common';
import { PrismaDataServices } from 'src/frameworks/data-services/prisma/prisma-data-services.service';
import { CreateUserDto, UpdateUserDto } from '../../core/dtos';
import { UserFactoryService } from './user-factory.service';
import { User } from '@prisma/client';

@Injectable()
export class UserUseCases {
  constructor(
    private dataServices: PrismaDataServices,
    private userFactoryService: UserFactoryService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.user.getAll()); 
    })
  }

  getUserById(id: string): Promise<User> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.user.get(id)); 
    })
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return new Promise ((resolve, reject) => {
      const user = this.userFactoryService.createNewUser(createUserDto);
      resolve( this.dataServices.user.create(user));
    })
  }

  updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return new Promise ((resolve, reject) => {
      const user = this.userFactoryService.updateUser(updateUserDto);
      resolve( this.dataServices.user.update(userId, user));
    })
  }

  deleteUser(
    userId: string,
  ): Promise<unknown> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.user.delete(userId));
    })
  }

}