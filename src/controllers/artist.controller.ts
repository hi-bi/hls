import { Controller, Get, Param, Post, Body, Put, HttpCode } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from '../core/dtos';
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
  async getById(@Param('id') artistId: string) {
    return this.artistUseCases.getArtistById(artistId);
  }

  @Post()
  @HttpCode(201)
  createArtist(@Body() artistDto: CreateArtistDto) {
    return this.artistUseCases.createArtist(artistDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtist(
    @Param('id') artistId: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistUseCases.updateArtist(artistId, updateArtistDto);
  }
}