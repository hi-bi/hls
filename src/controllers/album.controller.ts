import { Controller, Get, Param, Post, Body, Put, HttpCode, Delete, UseGuards } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto, CheckParam } from '../core/dtos';
import { AlbumUseCases } from '../use-cases/album/album.use-case';
import { ApiParam, ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/services/auth/auth-services.guard';

@ApiTags('album')
@Controller('album')
//@Public()
@UseGuards(AuthGuard)
export class AlbumController {
  constructor(private albumUseCases: AlbumUseCases) {}

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
    return this.albumUseCases.getAllAlbums();
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
    description: 'Album was not found',
  })
  getById(@Param() param: CheckParam) {
    return this.albumUseCases.getAlbumById(param.id as unknown as string);
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
    description: 'Bad request. Body does not contain required fields or Artist was not found',
  })
  createAlbum(@Body() albumDto: CreateAlbumDto) {
    return this.albumUseCases.createAlbum(albumDto);
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
    description: 'Bad request. Body does not contain required fields or Artist was not found',
  })
  @ApiResponse({
    status: 404,
    description: 'Record with id === albumId does not exist',
  })
  updateAlbum(
    @Param() param: CheckParam,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumUseCases.updateAlbum(param.id as unknown as string, updateAlbumDto);
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
    description: 'Album was not found',
  })
  deleteAlbum(
    @Param() param: CheckParam,
  ) {
    return this.albumUseCases.deleteAlbum(param.id as unknown as string);
  }

}