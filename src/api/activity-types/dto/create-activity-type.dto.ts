import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateActivityTypeDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}
    