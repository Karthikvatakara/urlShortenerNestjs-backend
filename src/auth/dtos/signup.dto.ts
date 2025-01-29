import { IsEmail, IsNotEmpty, IsString, isString, MinLength } from "class-validator";

export class SignupUserDto {

    @IsString()
    @IsNotEmpty({ message: "username is required"})
    @MinLength(4,{ message: "username must be 4 characters"})
    username: string;

    @IsString()
    @IsEmail({},{ message: "invalid email"})
    @IsNotEmpty({ message:"email is required"})
    email: string;

    @IsNotEmpty({ message: "password is required"})
    @MinLength(6,{ message: "password must be 6 characters" })
    password: string;
}