import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AssignUserActivitiesDto {
    @IsNotEmpty()
    @IsArray()
    activityIds: number[];
}
    