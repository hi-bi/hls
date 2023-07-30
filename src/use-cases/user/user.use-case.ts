import { Injectable } from '@nestjs/common';
import { User } from '../../core/entities';
import { IDataServices } from '../../core/abstracts';
import { CreateUserDto, UpdateUserDto } from '../../core/dtos';
import { UserFactoryService } from './user-factory.service';

@Injectable()
export class UserUseCases {
  constructor(
    private dataServices: IDataServices,
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
  ): Promise<User> {
    return new Promise ((resolve, reject) => {
      resolve(this.dataServices.user.delete(userId));
    })
  }

}