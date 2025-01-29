import { IsEmail, IsNotEmpty, IsString, isString, MinLength } from "class-validator";

export class LoginUserDto {
        @IsString()
        @IsEmail({},{ message: "invalid email"})
        @IsNotEmpty({ message:"email is required"})
        email: string;

        @IsString()
        @IsNotEmpty({ message: "password is required"})
        @MinLength(6,{ message: "password must be 6 characters" })
        password: string;
}