import { Controller, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, CheckParam } from '../core/dtos';
import { UserUseCases } from '../use-cases/user/user.use-case';
import { ApiParam, ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
//import { response } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ 
    description: 'Successful operation',
    content: {
      'application/json':
      {
        schema: {
          type: 'array',
        }
      }

    }  
  })
  getAll() {
    return this.userUseCases.getAllUsers();
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  })
  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json':
      {
        schema: {
          type: 'object',
        }
      }

    }  
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. id must be a UUID',
  })
  @ApiResponse({
    status: 404,
    description: 'User was not found',
  })
  getById(@Param() param: CheckParam) {
    return this.userUseCases.getUserById(param.id as unknown as string);
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    content: {
      'application/json':
      {
        schema: {
          type: 'object',
        }
      }

    }  
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Body does not contain required fields',
  })  
  createUser(@Body() userDto: CreateUserDto) {
    return this.userUseCases.createUser(userDto);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  })
  @Put(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json':
      {
        schema: {
          type: 'object',
        }
      }

    }  
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Body does not contain required fields',
  })
  @ApiResponse({
    status: 403,
    description: 'oldPassword is wrong',
  })
  @ApiResponse({
    status: 404,
    description: 'Record with id === userId does not exist',
  })
  updateUser(
    @Param() param: CheckParam,
    @Body() updateUserDto: UpdateUserDto,
  ) {
  
    return this.userUseCases.updateUser(param.id as unknown as string, updateUserDto)
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  })
  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Record is found and deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'User was not found',
  })
  deleteAlbum(
    @Param() param: CheckParam,
  ) {
    return this.userUseCases.deleteUser(param.id as unknown as string);
  }

}