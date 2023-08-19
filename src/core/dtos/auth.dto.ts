import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckAuthDto {

    @ApiProperty({
        type: String,
        description: 'User login',
    })
    @IsString()
    @IsNotEmpty()
    login: string;

    @ApiProperty({
        type: String,
        description: 'User password',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
