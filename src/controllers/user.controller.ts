import { Controller, Get, Param, Post, Body, Put, HttpCode } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../core/dtos';
import { UserUseCases } from '../use-cases/user/user.use-case';

@Controller('user')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    return this.userUseCases.getAllUsers();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') userId: string) {
    return this.userUseCases.getUserById(userId);
  }

  @HttpCode(201)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userUseCases.createUser(userDto);
  }

  @HttpCode(200)
  @Put(':id')
  updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userUseCases.updateUser(userId, updateUserDto);
  }
}