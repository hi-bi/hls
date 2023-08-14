import { Controller, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto, CheckParam } from '../core/dtos';
import { TrackUseCases } from '../use-cases/track/track.use-case';
import { ApiParam, ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private trackUseCases: TrackUseCases) {}

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
    return this.trackUseCases.getAllTracks();
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
    description: 'Track was not found',
  })
  getById(@Param() param: CheckParam) {
    return this.trackUseCases.getTrackById(param.id as unknown as string);
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
    description: 'Bad request. Body does not contain required fields or Artist or Album were not found',
  })
  createTrack(@Body() trackDto: CreateTrackDto) {

    return this.trackUseCases.createTrack(trackDto);
  
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
    description: 'Bad request. Body does not contain required fields or Artist or Album were not found',
  })
  @ApiResponse({
    status: 404,
    description: 'Record with id === trackId does not exist',
  })
  updateTrack(
    @Param() param: CheckParam,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackUseCases.updateTrack(param.id as unknown as string, updateTrackDto);
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
    description: 'Track was not found',
  })
  deleteAlbum(
    @Param() param: CheckParam,
  ) {
    return this.trackUseCases.deleteTrack(param.id as unknown as string);
  }

}