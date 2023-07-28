import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto } from '../core/dtos';
import { TrackUseCases } from '../use-cases/track/track.use-case';

@Controller('track')
export class TrackController {
  constructor(private trackUseCases: TrackUseCases) {}

  @Get()
  async getAll() {
    return this.trackUseCases.getAllTracks();
  }

  @Get(':id')
  async getById(@Param('id') trackId: string) {
    return this.trackUseCases.getTrackById(trackId);
  }

  @Post()
  createTrack(@Body() trackDto: CreateTrackDto) {
    return this.trackUseCases.createTrack(trackDto);
  }

  @Put(':id')
  updateTrack(
    @Param('id') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackUseCases.updateTrack(trackId, updateTrackDto);
  }
}