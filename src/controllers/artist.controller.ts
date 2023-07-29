import { Controller, Get, Param, Post, Body, Put, HttpCode } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto, CheckParam } from '../core/dtos';
import { ArtistUseCases } from '../use-cases/artist/artist.use-case';

@Controller('artist')
export class ArtistController {
  constructor(private artistUseCases: ArtistUseCases) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    return this.artistUseCases.getAllArtists();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param() param: CheckParam) {
    return this.artistUseCases.getArtistById(param as unknown as string);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() artistDto: CreateArtistDto) {
    return this.artistUseCases.createArtist(artistDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtist(
    @Param() param: CheckParam,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistUseCases.updateArtist(param as unknown as string, updateArtistDto);
  }
}