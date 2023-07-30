import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {

    @ApiProperty({
        type: String,
        description: 'Track name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Artist id',
    })
    artistId?: string; // refers to Artist

    @ApiProperty({
        type: String,
        description: 'Album id',
    })
    albumId?: string; // refers to Album

    @ApiProperty({
        type: Number,
        description: 'Track duration',
      })
    @IsNumber()
    @IsNotEmpty()
    duration: number; // integer number
}

export class UpdateTrackDto {

    @ApiProperty({
        type: String,
        description: 'Track name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: String,
        description: 'Artist id',
    })
    artistId?: string; // refers to Artist

    @ApiProperty({
        type: String,
        description: 'Album id',
    })
    albumId?: string; // refers to Album

    @ApiProperty({
        type: Number,
        description: 'Track duration',
      })
    @IsNumber()
    @IsNotEmpty()
    duration: number; // integer number
}
