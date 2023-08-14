import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {

    @ApiProperty({
        type: String,
        description: 'Artist name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({
        type: Boolean,
        description: 'Grammy',
    })
    @IsBoolean()
    @IsNotEmpty()
    grammy: boolean;
}

export class UpdateArtistDto {

    @ApiProperty({
        type: String,
        description: 'Artist name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({
        type: Boolean,
        description: 'Grammy',
    })
    @IsBoolean()
    @IsNotEmpty()
    grammy: boolean;
}
