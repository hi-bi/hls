import { Controller, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto, CheckParam } from '../core/dtos';
import { ArtistUseCases } from '../use-cases/artist/artist.use-case';
import { ApiParam, ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private artistUseCases: ArtistUseCases) {}

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
  async getAll() {
    return this.artistUseCases.getAllArtists();
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
    description: 'Artist was not found',
  })
  async getById(@Param() param: CheckParam) {
    return this.artistUseCases.getArtistById(param.id as unknown as string);
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
  createArtist(@Body() artistDto: CreateArtistDto) {
    return this.artistUseCases.createArtist(artistDto);
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
    status: 404,
    description: 'Record with id === artistId does not exist',
  })
  updateArtist(
    @Param() param: CheckParam,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistUseCases.updateArtist(param.id as unknown as string, updateArtistDto);
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
    description: 'Artist was not found',
  })
  deleteArtist(
    @Param() param: CheckParam,
  ) {
    return this.artistUseCases.deleteArtist(param.id as unknown as string);
  }
}