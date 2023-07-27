import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsUUID } from 'class-validator';

export class CreateAlbumDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

    @IsUUID()    
    artistId: string | null; // refers to Artist
}

export class UpdateAlbumDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

    @IsUUID()    
    artistId: string | null; // refers to Artist
}
