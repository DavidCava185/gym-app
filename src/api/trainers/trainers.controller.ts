import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { AssignTrainerActivitiesDto } from './dto/assign-trainer-activity.dto';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Post()
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainersService.create(createTrainerDto);
  }

  @Get()
  findAll() {
    return this.trainersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainersService.findOne({ where: {id: +id}});
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainersService.update(+id, undefined, updateTrainerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainersService.remove(+id);
  }

  @Post(':id/assign-activities')
  assignActivities(@Param('id') id: string, @Body() assignTrainerActivitiesDto: AssignTrainerActivitiesDto) {
    return this.trainersService.assignActivities(+id, assignTrainerActivitiesDto);
  }
}
