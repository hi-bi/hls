import { Controller, Get, Param, Post, Body, Put, HttpCode } from '@nestjs/common';
import { CreateAlbumDto, UpdateAlbumDto, CheckParam } from '../core/dtos';
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
  async getById(@Param() param: CheckParam) {
    return this.albumUseCases.getAlbumById(param as unknown as string);
  }

  @Post()
  @HttpCode(201)
  createAlbum(@Body() albumDto: CreateAlbumDto) {
    return this.albumUseCases.createAlbum(albumDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateAlbum(
    @Param() param: CheckParam,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumUseCases.updateAlbum(param as unknown as string, updateAlbumDto);
  }
}