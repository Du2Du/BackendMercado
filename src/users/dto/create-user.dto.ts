import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsDateString()
    birth_date: Date;
    @IsNotEmpty()
    @IsString()
    cpf: string;
}
