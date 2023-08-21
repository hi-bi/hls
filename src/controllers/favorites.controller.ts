import { Controller, Get, Param, Res, Post, HttpCode, Delete, HttpStatus, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CheckParam } from '../core/dtos';
import { FavoritesUseCases } from '../use-cases/favorites/favorites.use-case';
import { ApiParam, ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/services/auth/auth-services.guard';

@ApiTags('favs')
@Controller('favs')
@UseGuards(AuthGuard)
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
  getAll() {
    return this.favoritesUseCases.getAllFavorites();
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
  addFavsArtist(@Param() param: CheckParam) {
    return this.favoritesUseCases.addFavsArtist(param.id as unknown as string);
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
  addFavsAlbum(@Param() param: CheckParam) {
    return this.favoritesUseCases.addFavsAlbum(param.id as unknown as string);
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
  //addFavsTrack(@Param() param: CheckParam, @Res() response: Response) {
  addFavsTrack(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Res() response: Response) {
//  addFavsTrack(@Param() param1, @Res() response: Response) {
    
    this.favoritesUseCases.addFavsTrack( id as unknown as string)
    .then( (res) => {

      response
        .status(HttpStatus.CREATED)
        .send(JSON.stringify(''));
      
    })
    .catch( (error) => {

      response
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(JSON.stringify('Track with id === trackId does not exist'));
    })
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
  deleteFavsTrack(
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
  @Delete('album/:id')
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
  deleteFavsAlbum(
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