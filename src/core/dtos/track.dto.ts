import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsUUID } from 'class-validator';

export class CreateTrackDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    artistId: string | null; // refers to Artist
    
    @IsUUID()
    albumId: string | null; // refers to Album

    @IsNumber()
    @IsNotEmpty()
    duration: number; // integer number
}

export class UpdateTrackDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    artistId: string | null; // refers to Artist
    
    @IsUUID()
    albumId: string | null; // refers to Album

    @IsNumber()
    @IsNotEmpty()
    duration: number; // integer number
}
