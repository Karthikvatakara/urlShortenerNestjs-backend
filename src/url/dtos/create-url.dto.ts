import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateUrlDto {
    @IsNotEmpty({ message:"the url field cannot be empty"})
    @IsUrl({},{message: "invalid url format"})
    originalUrl: string;
}