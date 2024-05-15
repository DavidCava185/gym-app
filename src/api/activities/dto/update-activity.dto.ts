import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}

export class InscribeActivityDto {
    @IsOptional()
    @IsNumber()
    trainerId?: number;

    @IsOptional()
    @IsNumber()
    userId?: number;

    @IsOptional()
    @IsNumber()
    userIds?: number[];

    @IsOptional()
    @IsNumber()
    trainerIds?: number[];
}
