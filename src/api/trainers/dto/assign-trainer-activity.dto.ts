import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AssignTrainerActivitiesDto {
    @IsNotEmpty()
    @IsArray()
    activityIds: number[];
}
    