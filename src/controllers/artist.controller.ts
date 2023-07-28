import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from '../core/dtos';
import { ArtistUseCases } from '../use-cases/artist/artist.use-case';

@Controller('artist')
export class ArtistController {
  constructor(private artistUseCases: ArtistUseCases) {}

  @Get()
  async getAll() {
    return this.artistUseCases.getAllArtists();
  }

  @Get(':id')
  async getById(@Param('id') artistId: string) {
    return this.artistUseCases.getArtistById(artistId);
  }

  @Post()
  createArtist(@Body() artistDto: CreateArtistDto) {
    return this.artistUseCases.createArtist(artistDto);
  }

  @Put(':id')
  updateArtist(
    @Param('id') artistId: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistUseCases.updateArtist(artistId, updateArtistDto);
  }
}