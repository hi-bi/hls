import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {

  @ApiProperty({
    type: String,
    description: 'Album name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Album year',
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;


  @ApiProperty({
    type: String,
    description: 'Artist id',
  })
  artistId?: string; // refers to Artist
}

export class UpdateAlbumDto {

  @ApiProperty({
    type: String,
    description: 'Album name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Album year',
  })
  @IsNumber()
  @IsNotEmpty() 
  year: number;

  @ApiProperty({
    type: String,
    description: 'Artist id',
  })
  artistId?: string; // refers to Artist
}
