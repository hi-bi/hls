import { Controller, Get, Param, Post, Body, Put, HttpCode } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto } from '../core/dtos';
import { AlbumUseCases } from '../use-cases/album/album.use-case';

@Controller('album')
export class AlbumController {
  constructor(private albumUseCases: AlbumUseCases) {}

  @Get()
  @HttpCode(200)
  async getAll() {
    return this.albumUseCases.getAllAlbums();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') albumId: string) {
    return this.albumUseCases.getAlbumById(albumId);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() albumDto: CreateAlbumDto) {
    return this.albumUseCases.createAlbum(albumDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateAlbum(
    @Param('id') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumUseCases.updateAlbum(albumId, updateAlbumDto);
  }
}