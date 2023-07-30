import { IsString, IsNotEmpty, IsDate, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

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

export class UpdateUserDto {

    @ApiProperty({
        type: String,
        description: 'previous password',
    })
    @IsString()
    @IsNotEmpty()
    oldPassword: string; // previous password

    @ApiProperty({
        type: String,
        description: 'new password',
    })
    @IsString()
    @IsNotEmpty()
    newPassword: string; // new password
}
