import { MinLength, IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class SigninDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}