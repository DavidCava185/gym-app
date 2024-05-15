import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}
    