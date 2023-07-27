import { IsString, IsNotEmpty, IsDate, IsNumber, IsUUID } from 'class-validator';

export class CreateUserDto {

/*    
    @IsUUID()
    @IsNotEmpty()
    id: string; // uuid v4
*/

    @IsString()
    @IsNotEmpty()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;

/*    
    @IsNumber()        
    @IsNotEmpty()
    version: number; // integer number, increments on update

    @IsNumber()        
    @IsNotEmpty()
    createdAt: number; // timestamp of creation

    @IsNumber()        
    @IsNotEmpty()
    updatedAt: number; // timestamp of last update
*/
}

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    oldPassword: string; // previous password

    @IsString()
    @IsNotEmpty()
    newPassword: string; // new password
}
