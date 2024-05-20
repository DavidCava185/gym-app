import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateActivityDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    surname?: string;

    @IsOptional()
    @IsString()
    estimatedDuration?: string;

    @IsOptional()
    @IsString()
    startDatetime?: Date;

    @IsOptional()
    @IsString()
    finishDatetime?: Date;

    @IsOptional()
    @IsNumber()
    roomId: number;

    @IsOptional()
    @IsNumber()
    activityTypeId: number;

    @IsNotEmpty()
    trainerId: number;
}
    