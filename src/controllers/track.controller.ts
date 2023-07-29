import { Controller, Get, Param, Post, Body, Put, HttpCode } from '@nestjs/common';
import { CreateTrackDto, UpdateTrackDto, CheckParam } from '../core/dtos';
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
  async getById(@Param() param: CheckParam) {
    return this.trackUseCases.getTrackById(param as unknown as string);
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() trackDto: CreateTrackDto) {
    return this.trackUseCases.createTrack(trackDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(
    @Param() param: CheckParam,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackUseCases.updateTrack(param as unknown as string, updateTrackDto);
  }
}