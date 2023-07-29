import { Controller, Get, Param, Post, Body, Put, HttpCode } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, CheckParam } from '../core/dtos';
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
  async getById(@Param() param: CheckParam) {
    return this.userUseCases.getUserById(param as unknown as string);
  }

  @HttpCode(201)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userUseCases.createUser(userDto);
  }

  @HttpCode(200)
  @Put(':id')
  updateUser(
    @Param() param: CheckParam,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userUseCases.updateUser(param as unknown as string, updateUserDto);
  }
}