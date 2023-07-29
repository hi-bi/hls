import { Controller, Get, Param, Post, Body, Put, HttpCode } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from '../core/dtos';
import { TrackUseCases } from '../use-cases/track/track.use-case';

@Controller('track')
export class TrackController {
  constructor(private trackUseCases: TrackUseCases) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    return this.trackUseCases.getAllTracks();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') trackId: string) {
    return this.trackUseCases.getTrackById(trackId);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() trackDto: CreateTrackDto) {
    return this.trackUseCases.createTrack(trackDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(
    @Param('id') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackUseCases.updateTrack(trackId, updateTrackDto);
  }
}