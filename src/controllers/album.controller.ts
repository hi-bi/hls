import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from '../core/dtos';
import { AlbumUseCases } from '../use-cases/album/album.use-case';

@Controller('api/album')
export class AlbumController {
  constructor(private albumUseCases: AlbumUseCases) {}

  @Get()
  async getAll() {
    return this.albumUseCases.getAllAlbums();
  }

  @Get(':id')
  async getById(@Param('id') albumId: string) {
    return this.albumUseCases.getAlbumById(albumId);
  }

  @Post()
  createAlbum(@Body() albumDto: CreateAlbumDto) {
    return this.albumUseCases.createAlbum(albumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param('id') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumUseCases.updateAlbum(albumId, updateAlbumDto);
  }
}