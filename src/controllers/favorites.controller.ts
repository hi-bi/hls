import { Controller, Get, Param, Post, Body, Put, HttpCode, Delete, Req } from '@nestjs/common';
import { CheckParam } from '../core/dtos';
import { FavoritesUseCases } from '../use-cases/favorites/favorites.use-case';
import { ApiParam, ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@ApiTags('favs')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesUseCases: FavoritesUseCases) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({ 
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
  async getAll() {
    return this.favoritesUseCases.getAllFavorites();
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  })
  @Post('track/:id')
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
    description: 'Bad request. id must be a UUID',
  })
  @ApiResponse({
    status: 422,
    description: 'Track was not found',
  })
  async addFavsTrack(@Param() param: CheckParam) {
    return this.favoritesUseCases.addFavsTrack(param.id as unknown as string);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  })
  @Delete('track/:id')
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
    description: 'Track was not found',
  })
  async deleteFavsTrack(
    @Param() param: CheckParam,
  ) {
    return this.favoritesUseCases.deleteFavsTrack(param.id as unknown as string);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  })
  @Post('album/:id')
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
    description: 'Bad request. id must be a UUID',
  })
  @ApiResponse({
    status: 422,
    description: 'Album was not found',
  })
  async addFavsAlbum(@Param() param: CheckParam) {
    return this.favoritesUseCases.addFavsAlbum(param.id as unknown as string);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  })
  @Delete('track/:id')
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
  async deleteFavsAlbum(
    @Param() param: CheckParam,
  ) {
    return this.favoritesUseCases.deleteFavsAlbum(param.id as unknown as string);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  })
  @Post('artist/:id')
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
    description: 'Bad request. id must be a UUID',
  })
  @ApiResponse({
    status: 422,
    description: 'Artist was not found',
  })
  async addFavsArtist(@Param() param: CheckParam) {
    return this.favoritesUseCases.addFavsArtist(param.id as unknown as string);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    schema: { type: 'string', format: 'uuid' },
  })
  @Delete('artist/:id')
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
    description: 'Artist was not found',
  })
  async deleteFavsArtist(
    @Param() param: CheckParam,
  ) {
    return this.favoritesUseCases.deleteFavsArtist(param.id as unknown as string);
  }

}